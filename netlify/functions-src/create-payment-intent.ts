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
    
    // --- Add logging here ---
    console.log('create-payment-intent: Received data:', data);
    // ------------------------

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
            name: customerInfo.name || (customer.name ?? undefined),
            phone: customerInfo.phone || (customer.phone ?? undefined),
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

    let finalAmount = amount;
    let discount = 0;
    
    if (promotionCode) {
      console.log(`Attempting to validate promotion code: ${promotionCode}`); // Log received code
      try {
        const promotionCodeObj = await stripe.promotionCodes.list({
          code: promotionCode,
          active: true,
          limit: 1,
        });
        console.log('Stripe promotion code lookup result:', JSON.stringify(promotionCodeObj)); // Log lookup result

        if (!promotionCodeObj.data.length) {
          console.log('No active promotion code found matching the provided code.'); // Log specific failure reason
          throw new Error('Invalid promotion code');
        }

        const coupon = await stripe.coupons.retrieve(promotionCodeObj.data[0].coupon.id);
        console.log('Retrieved coupon details:', JSON.stringify(coupon)); // Log retrieved coupon

        if (coupon.percent_off) {
          discount = coupon.percent_off;
          console.log(`Applying percentage discount: ${discount}%`);
          finalAmount = Math.round(amount * ((100 - discount) / 100)); // Correct calculation
        } else if (coupon.amount_off) {
          // amount_off is in cents
          discount = coupon.amount_off;
          console.log(`Applying fixed discount: $${discount / 100}`);
          finalAmount = Math.max(0, amount - discount);
        } else {
           console.log('Coupon found, but has no percent_off or amount_off value.'); // Log if coupon has no discount
        }

        console.log('Original amount received:', amount / 100); // Log original amount received
        console.log('Calculated final amount:', finalAmount / 100); // Log calculated final amount

        // If amount is 0 after discount, skip payment
        if (finalAmount <= 0) {
          console.log('Amount is 0 or less after discount, skipping payment');
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ skipPayment: true })
          };
        }
      } catch (error: any) {
        console.error('Error processing promotion code:', error.message); // Log specific error message
        // Allow process to continue without discount if code is invalid
      }
    } else {
      console.log('No promotion code provided in the request.'); // Log if no code was sent
    }

    // Create payment intent with the potentially discounted amount
    console.log(`Creating payment intent with final amount: ${finalAmount}`);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(finalAmount), // Amount is already in cents
      currency: 'cad',
      automatic_payment_methods: {
        enabled: true,
      },
      customer: customer ? customer.id : undefined,
      receipt_email: email ?? null,
      metadata: {
        packageId,
        email: email || '',
        firstName: formData.firstName || '',
        lastName: formData.lastName || '',
        requiresCertnIntegration: 'true',
      },
    });

    // --- Add logging here ---
    console.log('create-payment-intent: Stripe metadata being set:', paymentIntent.metadata);
    // ------------------------

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