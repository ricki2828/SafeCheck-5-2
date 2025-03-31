import { z } from 'zod';

const paymentIntentResponseSchema = z.object({
  clientSecret: z.string(),
});

export type PaymentIntentResponse = z.infer<typeof paymentIntentResponseSchema>;

export async function createPaymentIntent(amount: number): Promise<PaymentIntentResponse> {
  try {
    if (!amount || amount <= 0) {
      throw new Error('Invalid amount');
    }

    const response = await fetch('/.netlify/functions/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ 
        amount: Math.round(amount * 100), // Convert to cents
        packageId: 'standard_check',
      }),
    });

    if (!response.ok) {
      let errorMessage = 'Payment failed';
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || `Payment failed with status: ${response.status}`;
      } catch (e) {
        errorMessage = `Payment failed with status: ${response.status}`;
      }
      throw new Error(errorMessage);
    }

    let data;
    try {
      data = await response.json();
    } catch (e) {
      throw new Error('Invalid response from server');
    }

    if (!data || !data.clientSecret) {
      throw new Error('Invalid response from server - missing client secret');
    }

    return paymentIntentResponseSchema.parse(data);
  } catch (error) {
    console.error('Payment intent creation error:', error);
    throw error instanceof Error ? error : new Error('Failed to create payment intent');
  }
}