import React, { useEffect } from 'react';
import { Shield, Check, Mail, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

declare global {
  interface Window {
    dataLayer: any[];
  }
}

export default function BulkConfirmation() {
  useEffect(() => {
    // Push purchase event to dataLayer for GTM to handle
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'event': 'purchase',
      'transaction_id': new URLSearchParams(window.location.search).get('transaction_id') || 'unknown',
      'value': 65.00,
      'currency': 'CAD',
      'items': [{
        'item_name': 'Bulk Background Check',
        'price': 65.00,
        'quantity': 1
      }]
    });
    
    // Add console logging to help with debugging
    console.log('Conversion tracking fired', {
      transaction_id: new URLSearchParams(window.location.search).get('transaction_id') || 'unknown',
      value: 65.00
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center space-x-3 text-primary mb-6">
            <Shield className="h-8 w-8" />
            <h1 className="text-2xl font-bold">Thanks for your purchase. You're now ready to invite others to run a police check on themselves</h1>
          </div>

          <p className="text-gray-600 mb-12">
            You will have just received an email from us. In this email, there'll be a series of pre-paid police check vouchers. Simply pass on a voucher to whomever you'd like to complete a police check, and share the link to our police check platform, Certn, which was included in the email.
          </p>

          <div className="relative py-8">
            <div className="flex justify-between items-center mb-16">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center w-1/4 relative">
                <div className="relative">
                  <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mb-4">
                    <Check className="h-8 w-8" />
                  </div>
                  <div className="absolute -top-2 -left-2 w-6 h-6 bg-primary text-white text-sm font-bold rounded-full flex items-center justify-center">
                    1
                  </div>
                </div>
                <span className="text-sm font-medium max-w-[150px]">Confirm Payment</span>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center w-1/4 relative">
                <div className="relative">
                  <div className="w-16 h-16 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center mb-4">
                    <Users className="h-8 w-8" />
                  </div>
                  <div className="absolute -top-2 -left-2 w-6 h-6 bg-gray-500 text-white text-sm font-bold rounded-full flex items-center justify-center">
                    2
                  </div>
                </div>
                <span className="text-sm font-medium max-w-[150px]">Share the link and pre-paid vouchers with your colleagues</span>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center w-1/4 relative">
                <div className="relative">
                  <div className="w-16 h-16 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center mb-4">
                    <Mail className="h-8 w-8" />
                  </div>
                  <div className="absolute -top-2 -left-2 w-6 h-6 bg-gray-500 text-white text-sm font-bold rounded-full flex items-center justify-center">
                    3
                  </div>
                </div>
                <span className="text-sm font-medium max-w-[150px]">Individuals confirm identity and provide consent</span>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col items-center text-center w-1/4 relative">
                <div className="relative">
                  <div className="w-16 h-16 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center mb-4">
                    <Shield className="h-8 w-8" />
                  </div>
                  <div className="absolute -top-2 -left-2 w-6 h-6 bg-gray-500 text-white text-sm font-bold rounded-full flex items-center justify-center">
                    4
                  </div>
                </div>
                <span className="text-sm font-medium max-w-[150px]">Police check results delivered via email</span>
              </div>

              {/* Time indicator */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap">
                this typically takes 15 minutes or less
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              At any point if you need some help, please reach out to us on{' '}
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