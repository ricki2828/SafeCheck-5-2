import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Footer from '../components/Footer';

export default function Terms() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 mb-8"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>{t('blog.backToHome')}</span>
        </Link>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600">Last Updated: March 14, 2024</p>

            <h2>1. Agreement to Terms</h2>
            <p>By accessing or using SafeHire.ca ("the Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these Terms, you may not access the Service.</p>

            <h2>2. Description of Service</h2>
            <p>SafeHire.ca provides criminal record check services through official Canadian law enforcement databases. Our service facilitates the process of obtaining criminal record checks for employment and other legitimate purposes.</p>

            <h2>3. Eligibility</h2>
            <p>To use the Service, you must:</p>
            <ul>
              <li>Be at least 18 years of age</li>
              <li>Have the legal capacity to enter into these Terms</li>
              <li>Provide accurate and complete information</li>
              <li>Have a legitimate purpose for requesting a criminal record check</li>
            </ul>

            <h2>4. User Responsibilities</h2>
            <p>You agree to:</p>
            <ul>
              <li>Provide accurate and complete personal information</li>
              <li>Maintain the confidentiality of your account</li>
              <li>Notify us immediately of any unauthorized use</li>
              <li>Use the Service only for lawful purposes</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>

            <h2>5. Criminal Record Check Process</h2>
            <p>The Service searches for criminal records based on the personal information you provide. Important notes:</p>
            <ul>
              <li>This is NOT a Vulnerable Sector Check</li>
              <li>Results may not be suitable for immigration purposes</li>
              <li>We cannot provide criminal record details; we may only confirm convictions that have been accurately disclosed</li>
              <li>Processing times may vary based on verification requirements</li>
            </ul>

            <h2>6. Payment Terms</h2>
            <p>Payment terms include:</p>
            <ul>
              <li>All fees are in Canadian Dollars (CAD)</li>
              <li>Payment is required before processing your request</li>
              <li>Refunds are not provided once the check has been completed</li>
              <li>Additional fees may apply for expedited processing</li>
            </ul>

            <h2>7. Privacy and Data Protection</h2>
            <p>We handle your personal information in accordance with:</p>
            <ul>
              <li>Our Privacy Policy</li>
              <li>Personal Information Protection and Electronic Documents Act (PIPEDA)</li>
              <li>Provincial privacy laws where applicable</li>
            </ul>

            <h2>8. Limitations of Service</h2>
            <p>The Service has the following limitations:</p>
            <ul>
              <li>Results are based on available database information</li>
              <li>We cannot guarantee 100% accuracy of results</li>
              <li>The Service is not a substitute for legal advice</li>
              <li>We are not responsible for how employers use the results</li>
            </ul>

            <h2>9. Intellectual Property</h2>
            <p>All content, features, and functionality of the Service are owned by SafeHire.ca and are protected by international copyright, trademark, and other intellectual property laws.</p>

            <h2>10. Termination</h2>
            <p>We may terminate or suspend your access to the Service immediately, without prior notice, for:</p>
            <ul>
              <li>Breach of these Terms</li>
              <li>Fraudulent or illegal activity</li>
              <li>Non-payment of fees</li>
              <li>Any other reason we deem necessary</li>
            </ul>

            <h2>11. Disclaimer of Warranties</h2>
            <p>The Service is provided "as is" without any warranties, expressed or implied. We do not warrant that:</p>
            <ul>
              <li>The Service will be uninterrupted or error-free</li>
              <li>Results will be 100% accurate</li>
              <li>The Service will meet your specific requirements</li>
            </ul>

            <h2>12. Limitation of Liability</h2>
            <p>SafeHire.ca shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the Service.</p>

            <h2>13. Changes to Terms</h2>
            <p>We reserve the right to modify these Terms at any time. We will notify users of any material changes by posting the new Terms on this page.</p>

            <h2>14. Governing Law</h2>
            <p>These Terms shall be governed by and construed in accordance with the laws of Canada, without regard to its conflict of law provisions.</p>

            <h2>15. Contact Information</h2>
            <p>For questions about these Terms, please contact us at:</p>
            <ul>
              <li>Email: legal@safehire.ca</li>
              <li>Phone: 1-800-XXX-XXXX</li>
              <li>Address: [Your Business Address]</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}