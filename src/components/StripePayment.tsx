import { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useErrorHandler } from '../hooks/useErrorHandler';
import { LoaderIcon } from 'lucide-react';

interface StripePaymentProps {
  onSuccess: () => void;
  onBack: () => void;
  price: number;
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
  appliedVoucher: string;
  discountPercent: number;
}

export default function StripePayment({ 
  onSuccess, 
  onBack, 
  price, 
  formData, 
  discountPercent 
}: StripePaymentProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const { error, handleError, clearError } = useErrorHandler();

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

      await response.json();
    } catch (err) {
      console.error('Background check error:', err);
      // Don't block the flow, just log the error
    }
  };

  const handlePaymentSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsProcessing(true);
    clearError();

    try {
      const { error: submitError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/success`,
        },
        redirect: 'always'
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
      setIsProcessing(false);
    }
  };

  const finalPrice = price * (1 - discountPercent / 100);

  return (
    <form onSubmit={handlePaymentSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4">
          {error.message}
        </div>
      )}
      
      {isProcessing && (
        <div className="flex items-center justify-center space-x-2 text-gray-600">
          <LoaderIcon className="animate-spin" />
          <span>Processing payment...</span>
        </div>
      )}
      
      <div className="space-y-4">
        <PaymentElement />
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={isProcessing}
          className="px-6 py-2 bg-primary text-white rounded-lg disabled:opacity-50"
        >
          {isProcessing ? 'Processing...' : `Pay $${finalPrice.toFixed(2)} CAD`}
        </button>
      </div>
    </form>
  );
}