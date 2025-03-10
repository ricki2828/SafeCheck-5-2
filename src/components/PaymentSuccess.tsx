import { CheckCircle, Mail, FileText, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

interface PaymentSuccessProps {
  email: string;
}

export default function PaymentSuccess({ email }: PaymentSuccessProps) {
  // Add error handling for Stripe analytics errors
  useEffect(() => {
    // Suppress Stripe analytics errors in the console
    const originalError = console.error;
    console.error = (...args) => {
      // Filter out Stripe-related errors
      if (
        typeof args[0] === 'string' && 
        (args[0].includes('r.stripe.com') || 
         args[0].includes('Failed to fetch') ||
         args[0].includes('ERR_BLOCKED_BY_CLIENT'))
      ) {
        return;
      }
      originalError(...args);
    };

    return () => {
      // Restore original console.error when component unmounts
      console.error = originalError;
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border-2 border-primary/20 p-6 space-y-6">
        <div className="flex items-center mb-4">
          <CheckCircle className="h-6 w-6 text-primary mr-2" />
          <span className="text-xl font-medium text-primary">Payment Successful</span>
        </div>
        
        <p className="text-gray-700 mb-6">
          Thank you for choosing SafeHire. Here's what happens next:
        </p>
        
        <ul className="space-y-4">
          <li className="flex">
            <Mail className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700">
              Check your email for instructions from Certn to complete your verification
            </span>
          </li>
          
          <li className="flex">
            <FileText className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700">
              Follow the link to provide your details securely in the Certn portal
            </span>
          </li>
          
          <li className="flex">
            <Clock className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700">
              Receive your criminal record check within 15 minutes
            </span>
          </li>
        </ul>
        
        <div className="mt-6 bg-gray-50 p-4 rounded-md">
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Important:</span> Your results will be delivered to {email}. If you don't receive an email from Certn within 5 minutes, please check your spam folder.
          </p>
        </div>
      </div>
      
      <Link 
        to="/" 
        className="inline-flex items-center justify-center w-full px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors"
      >
        Return to Home
      </Link>
    </div>
  );
}
