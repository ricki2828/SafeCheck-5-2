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
      case 'checkout.session.completed': {
        const session = stripeEvent.data.object as Stripe.Checkout.Session;
        console.log('Checkout completed:', session.id);
        
        // Get the package ID and email from the metadata
        const packageId = session.metadata?.packageId;
        const email = session.customer_email;

        if (!packageId || !email) {
          throw new Error('Missing required metadata: packageId or email');
        }

        // Create Certn order
        const certnOrder = await createCertnOrder(packageId, email);
        console.log('Certn order created:', certnOrder);
        break;
      }
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