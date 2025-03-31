export interface PaymentIntent {
  clientSecret: string;
  paymentId: string;
}

export interface PaymentStatus {
  status: 'pending' | 'completed' | 'failed';
  error?: string;
}