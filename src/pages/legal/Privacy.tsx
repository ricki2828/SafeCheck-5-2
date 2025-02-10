import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Privacy() {
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
            Privacy Policy
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>

            <h2>Introduction</h2>
            <p>
              At SafeHire, we take your privacy seriously. This Privacy Policy explains how we collect, 
              use, disclose, and safeguard your information when you use our criminal record check service.
            </p>

            <h2>Information We Collect</h2>
            <h3>Personal Information</h3>
            <ul>
              <li>Full name</li>
              <li>Date of birth</li>
              <li>Current and previous addresses</li>
              <li>Government-issued identification details</li>
              <li>Contact information (email and phone)</li>
            </ul>

            <h3>Payment Information</h3>
            <p>
              Payment information is processed securely through our payment processor, Stripe. 
              We do not store your complete credit card information on our servers.
            </p>

            <h2>How We Use Your Information</h2>
            <ul>
              <li>To process your criminal record check request</li>
              <li>To verify your identity</li>
              <li>To communicate with you about your order</li>
              <li>To comply with legal obligations</li>
              <li>To improve our services</li>
            </ul>

            <h2>Information Sharing</h2>
            <p>
              We share your information only as necessary to provide our services:
            </p>
            <ul>
              <li>With law enforcement agencies to process your check</li>
              <li>With our payment processor for billing</li>
              <li>As required by law or legal process</li>
            </ul>

            <h2>Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information:
            </p>
            <ul>
              <li>Encryption in transit and at rest</li>
              <li>Access controls and authentication</li>
              <li>Regular security assessments</li>
              <li>Employee training on data protection</li>
            </ul>

            <h2>Your Rights</h2>
            <p>
              You have the right to:
            </p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Withdraw consent for future processing</li>
            </ul>

            <h2>Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or our practices, please contact us at:
            </p>
            <p>
              Email: privacy@safehire.ca<br />
              Phone: 1-800-555-0123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 