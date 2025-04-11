import { useState, useEffect } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useErrorHandler } from '../hooks/useErrorHandler';
import { LoaderIcon, Shield, Clock, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

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

interface PaymentStatus {
  status: 'idle' | 'processing' | 'succeeded' | 'requires_action' | 'error';
  message?: string;
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
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>({ status: 'idle' });
  const { error, handleError, clearError } = useErrorHandler();
  const { t } = useTranslation();
  const [isProcessingCertn, setIsProcessingCertn] = useState(false);

  // Check if the payment was successful on component mount (for redirect cases)
  useEffect(() => {
    if (!stripe) {
      return;
    }

    // Extract the client secret from the URL
    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      return;
    }

    setPaymentStatus({ status: 'processing', message: 'Verifying payment...' });

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case 'succeeded':
          setPaymentStatus({
            status: 'succeeded',
            message: 'Payment succeeded! Initiating your background check...'
          });
          setIsProcessingCertn(true);
          
          // Call a function to initiate Certn integration after 1 second
          // Note: In production, this would be done via the webhook
          setTimeout(() => {
            onSuccess();
          }, 1000);
          break;
          
        case 'processing':
          setPaymentStatus({
            status: 'processing',
            message: 'Your payment is processing...'
          });
          break;
          
        case 'requires_payment_method':
          setPaymentStatus({
            status: 'error',
            message: 'Your payment was not successful, please try again.'
          });
          break;
          
        default:
          setPaymentStatus({
            status: 'error',
            message: 'Something went wrong with your payment.'
          });
          break;
      }
    });
  }, [stripe, onSuccess]);

  const handlePaymentSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      handleError(new Error('Payment system not initialized'));
      return;
    }

    setPaymentStatus({ status: 'processing' });
    clearError();

    try {
      const { error: submitError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.href,
          payment_method_data: {
            billing_details: {
              name: `${formData.firstName} ${formData.lastName}`,
              email: formData.email,
              phone: formData.phoneNumber,
              address: {
                line1: formData.streetAddress,
                city: formData.city,
                state: formData.province,
                postal_code: formData.postalCode,
                country: 'CA',
              },
            },
          },
        },
        redirect: 'if_required'
      });

      if (submitError) {
        setPaymentStatus({ 
          status: 'error', 
          message: submitError.message || 'An error occurred during payment processing'
        });
        throw submitError;
      }

      // If we get here without a redirect, payment succeeded (rare case)
      setPaymentStatus({ 
        status: 'succeeded', 
        message: 'Payment successful! Initiating your background check...' 
      });
      
      // Wait a bit to show the success message before proceeding
      setTimeout(() => {
        onSuccess();
      }, 1000);
    } catch (err) {
      handleError(err);
      setPaymentStatus({ 
        status: 'error', 
        message: err instanceof Error ? err.message : 'An unexpected error occurred'
      });
    }
  };

  const finalPrice = price * (1 - discountPercent / 100);

  // Render different UI based on payment status
  const renderPaymentStatusContent = () => {
    switch (paymentStatus.status) {
      case 'succeeded':
        return (
          <div className="bg-green-50 p-6 rounded-lg flex items-center space-x-4">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <div>
              <h3 className="font-medium text-green-700">Payment Successful!</h3>
              <p className="text-green-600">{paymentStatus.message || 'Your payment has been processed successfully.'}</p>
            </div>
          </div>
        );
      case 'processing':
        return (
          <div className="bg-blue-50 p-6 rounded-lg flex items-center space-x-4">
            <LoaderIcon className="h-6 w-6 text-blue-600 animate-spin" />
            <div>
              <h3 className="font-medium text-blue-700">Processing Payment</h3>
              <p className="text-blue-600">{paymentStatus.message || 'Please wait while we process your payment...'}</p>
            </div>
          </div>
        );
      case 'error':
        return (
          <div className="bg-red-50 p-6 rounded-lg">
            <h3 className="font-medium text-red-700">Payment Error</h3>
            <p className="text-red-600">{paymentStatus.message || 'There was a problem processing your payment.'}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl border-2 border-primary/20 p-6 space-y-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Payment Details</h3>
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="text-sm text-gray-600">Secure Payment</span>
          </div>
        </div>

        {paymentStatus.status !== 'idle' && renderPaymentStatusContent()}

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4">
            {error.message}
          </div>
        )}

        {paymentStatus.status !== 'succeeded' && (
          <form onSubmit={handlePaymentSubmit} className="space-y-6">
            <div className="space-y-4">
              <PaymentElement />
            </div>

            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={onBack}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                disabled={paymentStatus.status === 'processing' || isProcessingCertn}
              >
                Back
              </button>
              <button
                type="submit"
                disabled={paymentStatus.status === 'processing' || !stripe || !elements || isProcessingCertn}
                className="px-6 py-3 bg-primary text-white rounded-lg disabled:opacity-50 hover:bg-primary/90 transition-all duration-200 flex items-center space-x-2"
              >
                {paymentStatus.status === 'processing' ? (
                  <>
                    <LoaderIcon className="animate-spin h-5 w-5" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Pay ${finalPrice.toFixed(2)} CAD</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-3 text-primary">
            <Clock className="h-5 w-5" />
            <span className="font-semibold">Results in 15 minutes</span>
          </div>
          <div className="flex items-center space-x-3">
            <Shield className="h-5 w-5 text-primary" />
            <span className="font-semibold">Officially Verified Results</span>
          </div>
        </div>
      </div>
    </div>
  );
}