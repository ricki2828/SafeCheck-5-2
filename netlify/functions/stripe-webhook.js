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

async function createCertnOrder(packageId: string, email: string) {
  const response = await fetch('https://api.sandbox.certn.co/api/public/orders/', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.CERTN_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      package: packageId,
      email_address: email
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Certn API error: ${JSON.stringify(errorData)}`);
  }

  return await response.json();
}

export const handler: Handler = async (event) => {
  // Log incoming request
  console.log('Webhook received:', {
    method: event.httpMethod,
    headers: event.headers,
  });

  if (event.httpMethod !== 'POST') {
    console.log('Not a POST request:', event.httpMethod);
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  const sig = event.headers['stripe-signature'];
  console.log('Stripe signature present:', !!sig);

  try {
    const stripeEvent = stripe.webhooks.constructEvent(
      event.body!,
      sig!,
      webhookSecret
    );

    console.log('Stripe event type:', stripeEvent.type);

    // Handle the event
    switch (stripeEvent.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = stripeEvent.data.object as Stripe.PaymentIntent;
        console.log('Payment succeeded:', paymentIntent.id);
        
        // Get the package ID and email from the metadata
        const packageId = paymentIntent.metadata?.packageId;
        const email = paymentIntent.metadata?.email;

        if (!packageId || !email) {
          throw new Error('Missing required metadata: packageId or email');
        }

        // Create Certn order
        const certnOrder = await createCertnOrder(packageId, email);
        console.log('Certn order created:', certnOrder);
        break;
      }
      case 'payment_intent.payment_failed': {
        const paymentIntent = stripeEvent.data.object as Stripe.PaymentIntent;
        console.log('Payment failed:', paymentIntent.id);
        break;
      }
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