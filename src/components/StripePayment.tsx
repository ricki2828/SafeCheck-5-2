import { useState, useEffect } from 'react';
import { Elements, PaymentElement } from '@stripe/react-stripe-js';
import type { StripeElementsOptions } from '@stripe/stripe-js';
import { stripePromise } from '../lib/stripe';
import { BackgroundCheckResponse } from '../types/schema';
import { Stripe } from '@stripe/stripe-js';

interface StripePaymentProps {
  onSuccess: () => void;
  onBack: () => void;
  price: number;
  promotionCode?: string;
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

export const StripePayment: React.FC<StripePaymentProps> = ({ 
  onSuccess, 
  onBack,
  price, 
  promotionCode,
  formData 
}) => {
  const [clientSecret, setClientSecret] = useState<string>();

  useEffect(() => {
    const createIntent = async () => {
      try {
        const response = await fetch('/.netlify/functions/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: price * 100,
            promotion_code: promotionCode,
            metadata: formData
          }),
        });

        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error('Error creating payment intent:', error);
      }
    };

    createIntent();
  }, [price, promotionCode, formData]);

  if (!clientSecret) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
        >
          <svg 
            viewBox="0 0 24 24" 
            className="h-5 w-5 mr-1" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>
      </div>
      
      <Elements 
        stripe={stripePromise} 
        options={{
          clientSecret,
          appearance: {
            theme: 'flat',
            variables: {
              colorPrimary: '#0066FF',
            },
          },
          locale: 'en',
          defaultValues: {
            billingDetails: {
              address: {
                country: 'CA',
              }
            }
          }
        }}
      >
        <PaymentForm onSuccess={onSuccess} />
      </Elements>
    </div>
  );
};

const PaymentForm = ({ onSuccess }: { onSuccess: () => void }) => {
  return (
    <form>
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
      <button
        type="submit"
        className="mt-4 w-full inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Pay Now
      </button>
    </form>
  );
};