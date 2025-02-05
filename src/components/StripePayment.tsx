import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import {
  PaymentElement,
  useStripe,
  useElements,
  Elements,
} from '@stripe/react-stripe-js';
import { stripePromise } from '../lib/stripe';

interface StripePaymentProps {
  onSuccess: () => void;
  price: number;
}

function PaymentForm({ onSuccess, price }: StripePaymentProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    try {
      const { error: submitError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/success`,
        },
        redirect: 'if_required',
      });

      if (submitError) {
        setError(submitError.message || 'Payment failed');
      } else {
        onSuccess();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-primary/5 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Payment Details</h3>
          <div className="text-right">
            <p className="text-lg font-bold text-primary">${price} CAD</p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-4 border-2 border-gray-200">
            <PaymentElement />
          </div>
          {error && (
            <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}
          <div className="text-sm text-gray-600">
            <p>By proceeding with the payment, you agree to our terms and conditions.</p>
          </div>
        </div>
      </div>
      <div className="flex space-x-4">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="flex-1 border-2 border-primary text-primary font-semibold py-4 px-6 rounded-xl transition-all duration-200 hover:bg-primary hover:text-white"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={!stripe || processing}
          className="flex-1 bg-primary hover:bg-opacity-90 text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>{processing ? 'Processing...' : 'Pay Now'}</span>
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
}

export function StripePayment(props: StripePaymentProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const createIntent = async () => {
      try {
        // Determine the base URL based on environment
        const baseUrl = import.meta.env.DEV 
          ? 'http://localhost:8888' // Default Netlify Functions port
          : '';
        
        const response = await fetch(`${baseUrl}/.netlify/functions/create-payment-intent`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            amount: Math.round(props.price * 100)
          }),
        });

        console.log('Response status:', response.status);
        const responseText = await response.text();
        console.log('Response body:', responseText);

        if (responseText.trim().startsWith('{')) {
          const data = JSON.parse(responseText);
          if (!data.clientSecret) {
            throw new Error('No client secret received from payment service');
          }
          setClientSecret(data.clientSecret);
        } else {
          throw new Error('Received HTML instead of JSON response. Please ensure Netlify Functions are properly configured.');
        }
      } catch (err) {
        console.error('Error creating payment intent:', err);
        setError(
          err instanceof Error 
            ? `${err.message}. Please ensure you're running Netlify Functions locally or the site is properly deployed.` 
            : 'Payment initialization failed'
        );
      }
    };

    createIntent();
  }, [props.price]);

  if (error) {
    return (
      <div className="text-red-500 text-sm bg-red-50 p-4 rounded-lg">
        {error}
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="text-center p-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
          <div className="h-32 bg-gray-200 rounded mb-4"></div>
          <div className="h-10 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    );
  }

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#1DB954',
      },
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <PaymentForm {...props} />
    </Elements>
  );
}