import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-dark/90">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-white/80 hover:text-white mb-8"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>

          <h1 className="text-4xl font-bold text-white">
            Terms of Service
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>

            <h2>1. Agreement to Terms</h2>
            <p>
              By accessing or using SafeHire's services, you agree to be bound by these Terms of Service 
              and our Privacy Policy. If you disagree with any part of these terms, you may not use our services.
            </p>

            <h2>2. Description of Services</h2>
            <p>
              SafeHire provides criminal record check services in Canada. Our service includes:
            </p>
            <ul>
              <li>Online criminal record check applications</li>
              <li>Identity verification</li>
              <li>Secure document delivery</li>
              <li>Customer support</li>
            </ul>

            <h2>3. User Responsibilities</h2>
            <p>You agree to:</p>
            <ul>
              <li>Provide accurate and complete information</li>
              <li>Maintain the confidentiality of your account</li>
              <li>Use the service only for lawful purposes</li>
              <li>Not misrepresent your identity</li>
            </ul>

            <h2>4. Payment Terms</h2>
            <p>
              Payment is required before we process your criminal record check. Our fees are non-refundable 
              once the check process has begun. All prices are in Canadian dollars and include applicable taxes.
            </p>

            <h2>5. Processing Time</h2>
            <p>
              While we strive to process requests quickly, processing times may vary. We do not guarantee 
              specific completion times as some factors are beyond our control.
            </p>

            <h2>6. Limitation of Liability</h2>
            <p>
              SafeHire is not liable for any indirect, incidental, special, consequential, or punitive 
              damages resulting from your use or inability to use our services.
            </p>

            <h2>7. Privacy and Data Protection</h2>
            <p>
              Your use of our services is also governed by our Privacy Policy. By using SafeHire, you 
              consent to our collection and use of your information as described there.
            </p>

            <h2>8. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. We will notify users of any material 
              changes via email or through our website.
            </p>

            <h2>9. Contact Information</h2>
            <p>
              For questions about these Terms of Service, please contact us at:
            </p>
            <p>
              Email: legal@safehire.ca<br />
              Phone: 1-800-555-0123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 