import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-secondary py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 mb-8"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Home</span>
        </Link>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p>Last updated: March 14, 2024</p>

            <h2>1. Information We Collect</h2>
            <p>We collect personal information that you provide directly to us, including:</p>
            <ul>
              <li>Name and contact information</li>
              <li>Date of birth</li>
              <li>Government-issued identification</li>
              <li>Employment information</li>
              <li>Criminal record information you choose to disclose</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Process your criminal record check request</li>
              <li>Communicate with you about your request</li>
              <li>Verify your identity</li>
              <li>Comply with legal obligations</li>
              <li>Improve our services</li>
            </ul>

            <h2>3. Information Sharing</h2>
            <p>We share your information with:</p>
            <ul>
              <li>The Royal Canadian Mounted Police (RCMP) to process your criminal record check</li>
              <li>Service providers who assist in operating our business</li>
              <li>Law enforcement when required by law</li>
            </ul>

            <h2>4. Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>

            <h2>5. Data Retention</h2>
            <p>We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law.</p>

            <h2>6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Object to processing of your information</li>
              <li>Withdraw consent</li>
            </ul>

            <h2>7. Changes to Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>

            <h2>8. Contact Us</h2>
            <p>If you have questions about this Privacy Policy, please contact us at privacy@safehire.ca</p>
          </div>
        </div>
      </div>
    </div>
  );
}