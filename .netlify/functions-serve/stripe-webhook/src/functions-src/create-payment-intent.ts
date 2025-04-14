import { Handler } from '@netlify/functions';
import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not configured');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Accept',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json',
};

interface PaymentIntentMetadata {
  packageId: string;
  email: string;
  firstName: string;
  lastName: string;
  requiresCertnIntegration: string;
  promotionCode?: string;
}

export const handler: Handler = async (event) => {
  // Handle CORS preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'OK' }),
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    if (!event.body) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Request body is required' }),
      };
    }

    let data;
    try {
      data = JSON.parse(event.body);
    } catch (parseError) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid JSON in request body' }),
      };
    }

    const { amount, email, packageId = 'standard_check', formData = {}, promotionCode } = data;

    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Amount must be a positive number' }),
      };
    }

    console.log('Creating payment intent with amount:', amount);
    
    // Prepare customer data for potential future use with Certn
    const customerInfo = {
      email: email || '',
      name: formData.firstName && formData.lastName ? 
        `${formData.firstName} ${formData.lastName}` : '',
      phone: formData.phoneNumber || '',
    };
    
    // Create or retrieve a customer
    let customer;
    if (email) {
      const customers = await stripe.customers.list({
        email,
        limit: 1,
      });
      
      if (customers.data.length > 0) {
        customer = customers.data[0];
        // Update customer if we have new info
        if (customerInfo.name || customerInfo.phone) {
          customer = await stripe.customers.update(customer.id, {
            name: customerInfo.name || customer.name,
            phone: customerInfo.phone || customer.phone,
          });
        }
      } else {
        customer = await stripe.customers.create({
          email,
          name: customerInfo.name,
          phone: customerInfo.phone,
        });
      }
    }

    const paymentIntentData: Stripe.PaymentIntentCreateParams = {
      amount: Math.round(amount), // Amount is already in cents
      currency: 'cad',
      automatic_payment_methods: {
        enabled: true,
      },
      customer: customer?.id,
      receipt_email: typeof email === 'string' ? email : undefined,
      metadata: {
        packageId: packageId || '',
        email: email || '',
        firstName: formData.firstName || '',
        lastName: formData.lastName || '',
        requiresCertnIntegration: 'true',
      },
    };

    // Add promotion code if provided
    if (promotionCode) {
      const promotionCodes = await stripe.promotionCodes.list({
        code: promotionCode,
        active: true,
        limit: 1,
      });

      if (promotionCodes.data.length > 0) {
        const { coupon } = promotionCodes.data[0];
        paymentIntentData.metadata = {
          ...paymentIntentData.metadata,
          promotionCode,
          couponId: coupon.id
        };
        
        // Apply the coupon discount directly to the amount
        if (coupon.percent_off) {
          const discountAmount = Math.round(amount * (coupon.percent_off / 100));
          paymentIntentData.amount = Math.max(amount - discountAmount, 0);
        } else if (coupon.amount_off) {
          paymentIntentData.amount = Math.max(amount - coupon.amount_off, 0);
        }
      }
    }

    // For $0 payments (100% discount), create a $1 payment intent that will be fully discounted
    if (paymentIntentData.amount === 0) {
      paymentIntentData.amount = 100; // $1 in cents
    }

    const paymentIntent = await stripe.paymentIntents.create(paymentIntentData);

    console.log('Payment intent created:', paymentIntent.id);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        clientSecret: paymentIntent.client_secret,
        customerId: customer ? customer.id : null,
      }),
    };
  } catch (error) {
    console.error('Payment intent creation error:', error);
    
    if (error instanceof Stripe.errors.StripeError) {
      return {
        statusCode: error.statusCode || 400,
        headers,
        body: JSON.stringify({
          error: error.message,
          type: error.type,
        }),
      };
    }

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'An unexpected error occurred while processing your payment',
      }),
    };
  }
};