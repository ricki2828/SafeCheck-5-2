import React, { useEffect } from 'react';
import { Shield, Check, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export default function IndividualConfirmation() {
  useEffect(() => {
    // Push purchase event to dataLayer for GTM to handle
    window.dataLayer = window.dataLayer || [];
    const transactionId = new URLSearchParams(window.location.search).get('transaction_id') || 'unknown';
    
    // GA4 ecommerce data format
    const purchaseData = {
      'event': 'purchase',
      'ecommerce': {
        'transaction_id': transactionId,
        'value': 65.00,
        'currency': 'CAD',
        'items': [{
          'item_id': 'individual_check',
          'item_name': 'Individual Background Check',
          'price': 65.00,
          'quantity': 1
        }]
      }
    };
    
    // Push to dataLayer for GTM
    window.dataLayer.push({ ecommerce: null }); // Clear previous ecommerce object
    window.dataLayer.push(purchaseData);
    
    // Add detailed console logging for debugging
    console.log('GTM Debug - Purchase Event:', {
      dataLayer: window.dataLayer,
      purchaseData,
      transactionId,
      timestamp: new Date().toISOString()
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center space-x-3 text-primary mb-6">
            <Shield className="h-8 w-8" />
            <h1 className="text-2xl font-bold">Thanks for your purchase. Your official Canadian police check is only minutes away</h1>
          </div>

          <p className="text-gray-600 mb-12">
            You will have just received an email from our screening platform, Certn. In this email, there'll be a link to confirm your identity and consent to run a police check on yourself.
          </p>

          <div className="relative py-8">
            <div className="flex justify-between items-center mb-16">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center w-1/3 relative">
                <div className="relative">
                  <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mb-4">
                    <Check className="h-8 w-8" />
                  </div>
                  <div className="absolute -top-2 -left-2 w-6 h-6 bg-primary text-white text-sm font-bold rounded-full flex items-center justify-center">
                    1
                  </div>
                </div>
                <span className="text-sm font-medium">Confirm Payment</span>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center w-1/3 relative">
                <div className="relative">
                  <div className="w-16 h-16 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center mb-4">
                    <Mail className="h-8 w-8" />
                  </div>
                  <div className="absolute -top-2 -left-2 w-6 h-6 bg-gray-500 text-white text-sm font-bold rounded-full flex items-center justify-center">
                    2
                  </div>
                </div>
                <span className="text-sm font-medium max-w-[200px]">Identity verification and consent to run a police check</span>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center w-1/3 relative">
                <div className="relative">
                  <div className="w-16 h-16 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center mb-4">
                    <Shield className="h-8 w-8" />
                  </div>
                  <div className="absolute -top-2 -left-2 w-6 h-6 bg-gray-500 text-white text-sm font-bold rounded-full flex items-center justify-center">
                    3
                  </div>
                </div>
                <span className="text-sm font-medium max-w-[200px]">Your police check results delivered to your email</span>
              </div>

              {/* Time indicator */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap">
                this typically takes 15 minutes or less
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              For assistance, please contact{' '}
              <a href="mailto:info@safehire.ca" className="text-primary hover:underline">
                info@safehire.ca
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}