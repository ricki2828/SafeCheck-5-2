import { Handler } from '@netlify/functions';
import Stripe from 'stripe';
import fetch from 'node-fetch';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

if (!webhookSecret) {
  throw new Error('STRIPE_WEBHOOK_SECRET is not configured');
}

interface PaymentIntent {
  id: string;
  metadata: {
    email?: string;
    firstName?: string;
    lastName?: string;
    requiresCertnIntegration?: string;
    packageId?: string;
    [key: string]: string | undefined;
  };
  customer?: string;
  amount: number;
  receipt_email?: string;
  status: string;
}

interface CertnResponse {
  id: string;
  status: string;
  estimated_completion_time?: string;
  created_at?: string;
  updated_at?: string;
  [key: string]: any;
}

const createCertnBackgroundCheck = async (paymentIntent: PaymentIntent) => {
  try {
    if (!process.env.CERTN_API_KEY) {
      throw new Error('CERTN_API_KEY is not configured');
    }

    if (!process.env.CERTN_API_URL) {
      throw new Error('CERTN_API_URL is not configured');
    }

    const { metadata } = paymentIntent;
    
    if (!metadata.email) {
      throw new Error('Email is required for Certn integration');
    }
    
    // Determine which Certn package ID to use based on Stripe metadata
    const standardCertnPackageId = process.env.STANDARD_CERTN_PACKAGE_ID;
    const testCertnPackageId = process.env.TEST_CERTN_PACKAGE_ID;
    
    if (!standardCertnPackageId || !testCertnPackageId) {
      throw new Error('Standard or Test Certn Package ID is not configured in environment variables');
    }
    
    // Compare against VITE_ environment variables (as these hold the IDs sent from frontend)
    const standardStripePackageId = process.env.VITE_STANDARD_PACKAGE_ID || 'standard_check';
    const testStripePackageId = process.env.VITE_TEST_PACKAGE_ID || 'test_check';
    
    let certnPackageIdToUse;
    if (metadata.packageId === testStripePackageId) {
        console.log(`Using TEST Certn package ID: ${testCertnPackageId}`);
        certnPackageIdToUse = testCertnPackageId;
    } else if (metadata.packageId === standardStripePackageId) {
        console.log(`Using STANDARD Certn package ID: ${standardCertnPackageId}`);
        certnPackageIdToUse = standardCertnPackageId;
    } else {
        console.warn(`Unknown packageId (${metadata.packageId}) in payment metadata. Defaulting to standard Certn package.`);
        certnPackageIdToUse = standardCertnPackageId;
    }

    // Get customer details if we have a customer ID
    let customerDetails = {};
    if (paymentIntent.customer) {
      const customer = await stripe.customers.retrieve(paymentIntent.customer);
      if (customer && !('deleted' in customer)) {
        customerDetails = {
          phone: customer.phone,
          // Add any other useful customer data
        };
      }
    }

    // Use the appropriate Certn API endpoint for creating a background check
    const certnUrl = `${process.env.CERTN_API_URL}/cases/order-package/`;

    const requestBody = {
      package: certnPackageIdToUse, // Use determined Certn package ID
      email_address: metadata.email,
      first_name: metadata.firstName || '',
      last_name: metadata.lastName || '',
      payment_reference: paymentIntent.id,
      ...customerDetails
    };

    console.log('Creating Certn background check:', requestBody);

    const response = await fetch(certnUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Api-Key ${process.env.CERTN_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Certn API error: ${response.status} - ${errorText}`);
    }

    const certnResponse = await response.json() as CertnResponse;
    console.log('Certn background check created:', certnResponse);

    // Store the Certn case ID in the Stripe payment intent metadata for reference
    await stripe.paymentIntents.update(paymentIntent.id, {
      metadata: { 
        ...metadata,
        certnCaseId: certnResponse.id,
        certnStatus: certnResponse.status,
        usedCertnPackage: certnPackageIdToUse // Store which Certn package was used
      }
    });

    return certnResponse;
  } catch (error) {
    console.error('Failed to create Certn background check:', error);
    throw error;
  }
};

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  const sig = event.headers['stripe-signature'];

  try {
    const stripeEvent = stripe.webhooks.constructEvent(
      event.body!,
      sig!,
      webhookSecret
    );

    // Handle the event
    switch (stripeEvent.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = stripeEvent.data.object as PaymentIntent;
        console.log('Payment succeeded:', paymentIntent.id);
        
        // Check if this payment requires Certn integration
        if (paymentIntent.metadata.requiresCertnIntegration === 'true') {
          try {
            await createCertnBackgroundCheck(paymentIntent);
          } catch (error) {
            console.error('Error creating Certn background check:', error);
            // We don't want to fail the webhook response, so just log the error
          }
        }
        break;
        
      case 'payment_intent.payment_failed':
        const failedPayment = stripeEvent.data.object;
        console.log('Payment failed:', failedPayment.id);
        break;
        
      default:
        console.log(`Unhandled event type ${stripeEvent.type}`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    };
  } catch (err: any) {
    console.error('Webhook Error:', err.message);
    return {
      statusCode: 400,
      body: `Webhook Error: ${err.message}`,
    };
  }
};