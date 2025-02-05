import { loadStripe } from '@stripe/stripe-js';

const stripeKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

if (!stripeKey) {
  throw new Error('Missing Stripe public key');
}

export const stripePromise = loadStripe(stripeKey);