import { createPaymentIntent } from './api';

export async function testPaymentFlow() {
  try {
    // Step 1: Create a payment intent
    console.log('1. Creating payment intent...');
    const { clientSecret } = await createPaymentIntent(6500); // $65.00
    console.log('Payment intent created');

    return {
      success: true,
      clientSecret,
    };
  } catch (error) {
    console.error('Test failed:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}