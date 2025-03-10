import { CheckCircle, Mail, FileText, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PaymentSuccessProps {
  email?: string;
}

export default function PaymentSuccess({ email = 'trev@catchconsultants.com' }: PaymentSuccessProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">Review Information</h2>
      
      <div className="bg-accent rounded-lg p-6 mb-6">
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
        
        <div className="mt-6 bg-gray-light p-4 rounded-md">
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Important:</span> Your results will be delivered to the email address you provided ({email}). If you don't receive an email from Certn within 5 minutes, please check your spam folder.
          </p>
        </div>
      </div>
      
      <div className="text-center">
        <Link 
          to="/" 
          className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-light transition-colors"
        >
          <span>Return to Home</span>
          <ArrowRight className="h-5 w-5 ml-2" />
        </Link>
      </div>
    </div>
  );
} 