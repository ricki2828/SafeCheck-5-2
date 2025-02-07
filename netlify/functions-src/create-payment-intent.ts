import { Handler } from '@netlify/functions';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    const { amount, promotion_code, metadata } = JSON.parse(event.body || '{}');

    const paymentIntentData: Stripe.PaymentIntentCreateParams = {
      amount,
      currency: 'cad',
      metadata,
      automatic_payment_methods: {
        enabled: true,
      }
    };

    // If there's a promotion code, add it to the payment intent via coupon
    if (promotion_code) {
      paymentIntentData.discounts = [{
        promotion_code: promotion_code
      }];
    }

    const paymentIntent = await stripe.paymentIntents.create(paymentIntentData);

    return {
      statusCode: 200,
      body: JSON.stringify({
        clientSecret: paymentIntent.client_secret,
      }),
    };
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error creating payment intent' }),
    };
  }
};

export { handler };