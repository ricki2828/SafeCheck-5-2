import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Footer from '../components/Footer';

export default function Privacy() {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600">Last Updated: March 14, 2024</p>

            <h2>1. Introduction</h2>
            <p>SafeHire.ca ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our criminal record check service.</p>

            <h2>2. Information We Collect</h2>
            <h3>2.1 Personal Information</h3>
            <p>We collect the following personal information:</p>
            <ul>
              <li>Full legal name (first, middle, and last name)</li>
              <li>Date of birth</li>
              <li>Current and previous addresses</li>
              <li>Contact information (email, phone number)</li>
              <li>Government-issued identification details</li>
              <li>Employment information</li>
              <li>Criminal record information you choose to disclose</li>
              <li>Payment information</li>
            </ul>

            <h3>2.2 Automatically Collected Information</h3>
            <p>When you use our service, we automatically collect:</p>
            <ul>
              <li>Device information (IP address, browser type, operating system)</li>
              <li>Usage data (pages visited, time spent, interactions)</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>We use your information for the following purposes:</p>
            <ul>
              <li>Processing your criminal record check request</li>
              <li>Verifying your identity</li>
              <li>Communicating with you about your request</li>
              <li>Processing payments</li>
              <li>Compliance with legal obligations</li>
              <li>Improving our services</li>
              <li>Preventing fraud and ensuring security</li>
            </ul>

            <h2>4. Information Sharing and Disclosure</h2>
            <p>We share your information with:</p>
            <ul>
              <li>Official Canadian law enforcement agencies for criminal record checks</li>
              <li>Service providers who assist in operating our business</li>
              <li>Payment processors for transaction processing</li>
              <li>Law enforcement when required by law</li>
            </ul>

            <h2>5. Data Security</h2>
            <p>We implement industry-standard security measures to protect your information:</p>
            <ul>
              <li>256-bit SSL encryption for data transmission</li>
              <li>Secure data storage with regular backups</li>
              <li>Access controls and authentication</li>
              <li>Regular security audits and updates</li>
            </ul>

            <h2>6. Data Retention</h2>
            <p>We retain your information for:</p>
            <ul>
              <li>Criminal record check results: 7 years (as required by law)</li>
              <li>Payment information: As required by financial regulations</li>
              <li>Account information: Until you request deletion</li>
            </ul>

            <h2>7. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Object to processing of your information</li>
              <li>Withdraw consent</li>
              <li>Request data portability</li>
              <li>File a complaint with privacy authorities</li>
            </ul>

            <h2>8. International Data Transfers</h2>
            <p>Your information may be transferred to and processed in countries other than Canada. We ensure appropriate safeguards are in place for such transfers.</p>

            <h2>9. Children's Privacy</h2>
            <p>Our service is not intended for individuals under 18 years of age. We do not knowingly collect information from children.</p>

            <h2>10. Changes to This Policy</h2>
            <p>We may update this Privacy Policy periodically. We will notify you of any material changes by posting the new policy on this page and updating the "Last Updated" date.</p>

            <h2>11. Contact Us</h2>
            <p>For privacy-related inquiries, please contact us at:</p>
            <ul>
              <li>Email: privacy@safehire.ca</li>
              <li>Phone: 1-800-XXX-XXXX</li>
              <li>Address: [Your Business Address]</li>
            </ul>

            <h2>12. Compliance</h2>
            <p>We comply with:</p>
            <ul>
              <li>Personal Information Protection and Electronic Documents Act (PIPEDA)</li>
              <li>Provincial privacy laws where applicable</li>
              <li>Industry standards for data protection</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}