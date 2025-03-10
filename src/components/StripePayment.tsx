import { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useErrorHandler } from '../hooks/useErrorHandler';
import { LoaderIcon, Star, Shield, Clock } from 'lucide-react';

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

const testimonials = [
  {
    quote: "Got my background check in 12 minutes! Incredibly fast and professional service.",
    author: "Michael Chen",
    role: "Software Developer",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    rating: 5
  }
];

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

  const handlePaymentSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      handleError(new Error('Stripe not initialized'));
      return;
    }

    setIsProcessing(true);
    clearError();

    try {
      const { error: submitError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
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
      });

      if (submitError) {
        throw submitError;
      }

      onSuccess();
    } catch (err) {
      handleError(err);
      setIsProcessing(false);
    }
  };

  const finalPrice = price * (1 - discountPercent / 100);

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
        
        <form onSubmit={handlePaymentSubmit} className="space-y-6">
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
              disabled={isProcessing || !stripe || !elements}
              className="px-6 py-2 bg-primary text-white rounded-lg disabled:opacity-50 hover:bg-primary/90 transition-all duration-200"
            >
              {isProcessing ? 'Processing...' : `Pay $${finalPrice.toFixed(2)} CAD`}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-primary">
              <Clock className="h-5 w-5" />
              <span className="font-semibold">Results in 15 minutes</span>
            </div>
            <div className="flex items-center space-x-3 text-primary">
              <Shield className="h-5 w-5" />
              <span className="font-semibold">RCMP Verified Results</span>
            </div>
          </div>
          
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-start space-x-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm italic mb-2">{testimonial.quote}</p>
                  <p className="text-sm font-semibold">{testimonial.author}</p>
                  <p className="text-xs text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}