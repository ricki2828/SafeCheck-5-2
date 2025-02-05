import React, { useEffect, useState } from 'react';
import { testPaymentFlow } from '../lib/test-payment';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

export function TestPayment() {
  const stripe = useStripe();
  const elements = useElements();
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    async function runTest() {
      setStatus('testing');
      const result = await testPaymentFlow();
      
      if (result.success) {
        setClientSecret(result.clientSecret);
        setStatus('ready');
      } else {
        setError(result.error);
        setStatus('failed');
      }
    }

    runTest();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setStatus('processing');
    setError(null);

    const { error: paymentError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)!,
      },
    });

    if (paymentError) {
      setError(paymentError.message || 'Payment failed');
      setStatus('failed');
    } else {
      setStatus('completed');
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Test Status: {status}</h3>
        {error && (
          <p className="text-red-500">{error}</p>
        )}
      </div>

      {status === 'ready' && (
        <form onSubmit={handleSubmit}>
          <div className="bg-white p-4 rounded-lg border">
            <CardElement />
          </div>
          <button
            type="submit"
            disabled={!stripe}
            className="mt-4 bg-primary text-white px-4 py-2 rounded-lg"
          >
            Test Payment
          </button>
        </form>
      )}
    </div>
  );
}