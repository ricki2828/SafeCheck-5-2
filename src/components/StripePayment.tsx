import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import {
  PaymentElement,
  useStripe,
  useElements,
  Elements,
} from '@stripe/react-stripe-js';
import type { StripeElementsOptions } from '@stripe/stripe-js';
import { stripePromise } from '../lib/stripe';
import { BackgroundCheckResponse } from '../types/schema';
import { useErrorHandler } from '../hooks/useErrorHandler';

interface StripePaymentProps {
  onSuccess: () => void;
  onBack: () => void;
  price: number;
  voucherCode?: string;
  appliedVoucher?: string;
  discountPercent?: number;
  formData: {
    firstName: string;
    middleName?: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string;
    streetAddress: string;
    city: string;
    province: string;
    postalCode: string;
  };
}

function PaymentForm({ onSuccess, onBack, price, voucherCode, appliedVoucher, discountPercent, formData }: StripePaymentProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const { error, handleError, clearError } = useErrorHandler();
  const [backgroundCheck, setBackgroundCheck] = useState<BackgroundCheckResponse | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      handleError(new Error('Stripe has not been properly initialized'));
      return;
    }

    setProcessing(true);
    clearError();

    try {
      const { error: submitError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/success`,
        },
        redirect: 'if_required',
      });

      if (submitError) {
        throw new Error(submitError.message || 'Payment failed');
      }

      // Payment successful
      onSuccess();
      
      // Create background check
      await createBackgroundCheck();
    } catch (err) {
      handleError(err);
    } finally {
      setProcessing(false);
    }
  };

  const createBackgroundCheck = async () => {
    try {
      const response = await fetch('/.netlify/functions/create-background-check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: formData.firstName,
          middle_name: formData.middleName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phoneNumber,
          date_of_birth: formData.dateOfBirth,
          address: {
            street_address: formData.streetAddress,
            city: formData.city,
            province: formData.province,
            postal_code: formData.postalCode,
            country: 'CA',
          },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Background check creation failed: ${errorText}`);
      }

      const data = await response.json();
      setBackgroundCheck(data);
    } catch (err) {
      // Log error but don't block the flow
      console.error('Background check error:', err);
    }
  };

  const renderStatus = () => {
    if (!backgroundCheck) return null;

    return (
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-lg mb-2">Background Check Status</h3>
        <div className="space-y-2">
          <p>Case ID: {backgroundCheck.caseId}</p>
          <p>Status: {backgroundCheck.status}</p>
          <p>Estimated Completion: {new Date(backgroundCheck.estimatedCompletionTime).toLocaleString()}</p>
        </div>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-primary/5 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Payment Details</h3>
          <div className="text-right">
            {appliedVoucher ? (
              <div>
                <p className="text-sm line-through text-gray-500">${price} CAD</p>
                <p className="text-lg font-bold text-primary">
                  ${(price * (1 - (discountPercent || 0) / 100)).toFixed(2)} CAD
                </p>
              </div>
            ) : (
              <p className="text-lg font-bold text-primary">${price} CAD</p>
            )}
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-4 border-2 border-gray-200">
            <PaymentElement 
              options={{
                defaultValues: {
                  billingDetails: {
                    address: {
                      country: 'CA',
                    }
                  }
                }
              }}
            />
          </div>
          {error && (
            <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
              {error.message}
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
          onClick={onBack}
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
      {renderStatus()}
    </form>
  );
}

export default function StripePayment({ onSuccess, onBack, price, voucherCode, appliedVoucher, discountPercent, formData }: StripePaymentProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const { error, handleError, clearError } = useErrorHandler();
  const [backgroundCheck, setBackgroundCheck] = useState<BackgroundCheckResponse | null>(null);

  useEffect(() => {
    const createIntent = async () => {
      try {
        const baseUrl = import.meta.env.DEV 
          ? 'http://localhost:8888' 
          : '';
        
        const response = await fetch(`${baseUrl}/.netlify/functions/create-payment-intent`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({ 
            amount: Math.round(price * 100),
            voucherCode,
          }),
        });

        console.log('Response status:', response.status);
        console.log('Response headers:', Object.fromEntries(response.headers.entries()));
        
        const responseText = await response.text();
        console.log('Raw response:', responseText);

        try {
          const data = JSON.parse(responseText);
          if (!data.clientSecret) {
            throw new Error('No client secret received from payment service');
          }
          stripe.confirmPayment({
            elements,
            clientSecret: data.clientSecret,
            confirmParams: {
              return_url: `${window.location.origin}/success`,
            },
            redirect: 'if_required',
          });
        } catch (parseError) {
          console.error('JSON Parse Error:', parseError);
          throw new Error(`Invalid JSON response: ${responseText.substring(0, 100)}...`);
        }
      } catch (err) {
        console.error('Error creating payment intent:', err);
        handleError(
          err instanceof Error 
            ? new Error(`${err.message}. Please ensure you're running Netlify Functions locally or the site is properly deployed.`)
            : new Error('Payment initialization failed')
        );
      }
    };

    createIntent();
  }, [price, voucherCode, stripe, elements]);

  if (error) {
    return (
      <div className="text-red-500 text-sm bg-red-50 p-4 rounded-lg">
        {error.message}
      </div>
    );
  }

  if (!stripe || !elements) {
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

  const options: StripeElementsOptions = {
    clientSecret: stripe.clientSecret,
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#0F766E',
      },
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <PaymentForm 
        price={price} 
        onSuccess={onSuccess} 
        onBack={onBack}
        voucherCode={voucherCode}
        appliedVoucher={appliedVoucher}
        discountPercent={discountPercent}
        formData={formData} 
      />
    </Elements>
  );
}