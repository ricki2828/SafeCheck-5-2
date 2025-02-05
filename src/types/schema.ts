import { z } from 'zod';

// Payment status type
export const PaymentStatus = z.enum([
  'pending',
  'processing',
  'completed',
  'failed',
]);

export type PaymentStatus = z.infer<typeof PaymentStatus>;

// Payment intent response schema
export const paymentIntentResponseSchema = z.object({
  clientSecret: z.string(),
});

export type PaymentIntentResponse = z.infer<typeof paymentIntentResponseSchema>;

// Create payment request schema
export const createPaymentRequestSchema = z.object({
  amount: z.number().int().positive(),
});

export type CreatePaymentRequest = z.infer<typeof createPaymentRequestSchema>;