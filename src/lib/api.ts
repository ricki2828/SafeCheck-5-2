import { z } from 'zod';

const paymentIntentResponseSchema = z.object({
  clientSecret: z.string(),
});

export type PaymentIntentResponse = z.infer<typeof paymentIntentResponseSchema>;

export async function createPaymentIntent(amount: number): Promise<PaymentIntentResponse> {
  const response = await fetch('/.netlify/functions/create-payment-intent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ amount }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Payment failed');
  }

  const data = await response.json();
  return paymentIntentResponseSchema.parse(data);
}