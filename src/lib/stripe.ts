import { loadStripe } from '@stripe/stripe-js';

const stripeKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

if (!stripeKey) {
  throw new Error('Missing Stripe public key');
}

export const stripePromise = loadStripe(stripeKey);

export const appearance = {
  theme: 'stripe',
  variables: {
    colorPrimary: '#10B981',
    colorBackground: '#ffffff',
    colorText: '#1f2937',
    colorDanger: '#ef4444',
    fontFamily: 'Inter, system-ui, sans-serif',
    borderRadius: '8px',
    spacingUnit: '4px',
  },
  rules: {
    '.Input': {
      border: '2px solid #e5e7eb',
      boxShadow: 'none',
      padding: '8px 12px',
    },
    '.Input:focus': {
      border: '2px solid #10B981',
      boxShadow: '0 0 0 1px rgba(16, 185, 129, 0.1)',
    },
    '.Label': {
      fontWeight: '500',
      marginBottom: '4px',
    },
  },
};