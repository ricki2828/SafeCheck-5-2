import { Handler } from '@netlify/functions';
import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not configured');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

export const handler: Handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

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
        body: JSON.stringify({ error: 'Request body is empty' }),
      };
    }

    let data;
    try {
      data = JSON.parse(event.body);
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid JSON in request body' }),
      };
    }

    const { amount, email, packageId, quantity, promotionCode } = data;

    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Amount is required and must be a positive number' }),
      };
    }

    console.log('Creating payment intent:', { amount, email, packageId, quantity });

    // Force rebuild test
    let finalAmount = amount;
    let discount = 0;
    
    if (promotionCode) {
      console.log(`Attempting to validate promotion code: ${promotionCode}`);
      try {
        const promotionCodeObj = await stripe.promotionCodes.list({
          code: promotionCode,
          active: true,
          limit: 1,
        });
        console.log('Stripe promotion code lookup result:', JSON.stringify(promotionCodeObj));

        if (!promotionCodeObj.data.length) {
          console.log('No active promotion code found matching the provided code.');
          throw new Error('Invalid promotion code');
        }

        const coupon = await stripe.coupons.retrieve(promotionCodeObj.data[0].coupon.id);
        console.log('Retrieved coupon details:', JSON.stringify(coupon));

        if (coupon.percent_off) {
          discount = coupon.percent_off;
          console.log(`Applying percentage discount: ${discount}%`);
          finalAmount = Math.round(amount * ((100 - discount) / 100));
        } else if (coupon.amount_off) {
          discount = coupon.amount_off;
          console.log(`Applying fixed discount: $${discount / 100}`);
          finalAmount = Math.max(0, amount - discount);
        } else {
           console.log('Coupon found, but has no percent_off or amount_off value.');
        }

        console.log('Original amount:', amount / 100);
      } catch (error: any) {
        console.error('Error processing promotion code:', error.message);
      }
    } else {
      console.log('No promotion code provided in the request.');
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(finalAmount),
      currency: 'cad',
      metadata: {
        packageId,
        email,
        quantity: quantity?.toString(),
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    console.log('Payment intent created:', paymentIntent.id);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        clientSecret: paymentIntent.client_secret,
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