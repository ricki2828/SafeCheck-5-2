import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Terms() {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Use</h1>
          
          <div className="prose prose-lg max-w-none">
            <p>Last updated: March 14, 2024</p>

            <h2>1. Acceptance of Terms</h2>
            <p>By accessing and using SafeHire.ca ("the Service"), you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use the Service.</p>

            <h2>2. Description of Service</h2>
            <p>SafeHire.ca provides criminal record check services through the Royal Canadian Mounted Police (RCMP) Canadian Police Information Centre (CPIC). Our service facilitates the process of obtaining criminal record checks for employment and other purposes.</p>

            <h2>3. User Responsibilities</h2>
            <ul>
              <li>You must be at least 18 years of age to use the Service</li>
              <li>You must provide accurate and complete information</li>
              <li>You are responsible for maintaining the confidentiality of your account</li>
              <li>You agree not to use the Service for any unlawful purpose</li>
            </ul>

            <h2>4. Criminal Record Check Process</h2>
            <p>The Service searches for criminal records based on the personal information you provide. If a match is found, by law we cannot provide criminal record details, including conviction information; we may only confirm convictions that have been accurately disclosed.</p>

            <h2>5. Limitations</h2>
            <ul>
              <li>The criminal record check being conducted is NOT A VULNERABLE SECTOR CHECK and does NOT contain any Vulnerable Sector information</li>
              <li>These checks may not be suitable for immigration and VISA related purposes</li>
              <li>It is your responsibility to ensure that your employer accepts 3rd party background checks</li>
            </ul>

            <h2>6. Refund Policy</h2>
            <p>A refund will not be granted once the check has been completed and results have been received.</p>

            <h2>7. Privacy</h2>
            <p>Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your personal information.</p>

            <h2>8. Modifications to Service</h2>
            <p>We reserve the right to modify or discontinue the Service at any time without notice.</p>

            <h2>9. Governing Law</h2>
            <p>These Terms shall be governed by and construed in accordance with the laws of Canada.</p>
          </div>
        </div>
      </div>
    </div>
  );
}