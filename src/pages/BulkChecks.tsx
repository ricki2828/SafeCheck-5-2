import React, { useState, useEffect } from 'react';
import { ArrowLeft, Shield, Info, Package, Users, CreditCard, Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Footer from '../components/Footer';
import StripePayment from '../components/StripePayment';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function BulkChecks() {
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState(5);
  const [step, setStep] = useState(1);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const basePrice = 65;
  const navigate = useNavigate();
  
  // Calculate bulk discounts
  const getDiscount = (qty: number) => {
    if (qty >= 50) return 0.25; // 25% off for 50+ checks
    if (qty >= 20) return 0.20; // 20% off for 20-49 checks
    if (qty >= 10) return 0.15; // 15% off for 10-19 checks
    if (qty >= 5) return 0.10;  // 10% off for 5-9 checks
    return 0;
  };

  const discount = getDiscount(quantity);
  const pricePerCheck = basePrice * (1 - discount);
  const totalPrice = pricePerCheck * quantity;

  const createPaymentIntent = async () => {
    try {
      setError(null);
      const amountInCents = Math.round(totalPrice * 100); // Convert to cents
      console.log('Creating payment intent with amount:', amountInCents);

      const response = await fetch('/.netlify/functions/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amountInCents,
          packageId: 'bulk_checks',
          email: '', // Add email if needed
          quantity
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create payment intent');
      }

      const data = await response.json();
      if (!data.clientSecret) {
        throw new Error('No client secret received');
      }

      setClientSecret(data.clientSecret);
    } catch (err) {
      console.error('Error creating payment intent:', err);
      setError(err instanceof Error ? err.message : 'Failed to create payment intent');
    }
  };

  const handlePurchase = async () => {
    await createPaymentIntent();
    if (!error) {
      setStep(2);
    }
  };

  const handlePaymentSuccess = () => {
    navigate('/success/bulk');
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="bg-white rounded-xl border-2 border-primary/20 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Select Quantity
                </h3>
                <div className="text-sm text-gray-600">
                  ${basePrice.toFixed(2)} CAD per check
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Background Checks
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="number"
                      id="quantity"
                      min="1"
                      max="100"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-32 px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                    />
                    {discount > 0 && (
                      <span className="text-primary font-semibold">
                        {(discount * 100).toFixed(0)}% bulk discount applied!
                      </span>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Price per check:</span>
                    <span className="font-medium">${pricePerCheck.toFixed(2)} CAD</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total price:</span>
                    <span className="text-primary">${totalPrice.toFixed(2)} CAD</span>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 text-red-600 p-4 rounded-lg">
                    {error}
                  </div>
                )}

                <button
                  type="button"
                  onClick={handlePurchase}
                  className="w-full bg-primary text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center space-x-2 transition-all duration-300 shadow-lg hover:shadow-xl hover:bg-primary/90"
                >
                  <span>Purchase Background Checks</span>
                  <CreditCard className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Bulk Pricing Tiers
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="text-lg font-semibold mb-1">1-4 checks</div>
                  <div className="text-primary font-bold">${basePrice.toFixed(2)} CAD</div>
                  <div className="text-sm text-gray-600">per check</div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="text-lg font-semibold mb-1">5-9 checks</div>
                  <div className="text-primary font-bold">${(basePrice * 0.9).toFixed(2)} CAD</div>
                  <div className="text-sm text-gray-600">per check (10% off)</div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="text-lg font-semibold mb-1">10-19 checks</div>
                  <div className="text-primary font-bold">${(basePrice * 0.85).toFixed(2)} CAD</div>
                  <div className="text-sm text-gray-600">per check (15% off)</div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="text-lg font-semibold mb-1">20+ checks</div>
                  <div className="text-primary font-bold">${(basePrice * 0.8).toFixed(2)} CAD</div>
                  <div className="text-sm text-gray-600">per check (20% off)</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 border-2 border-primary/20">
              <div className="flex items-start space-x-6">
                <img
                  src="https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
                  alt="Bulk Background Checks"
                  className="w-24 h-24 rounded-full object-cover border-4 border-primary/20"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-lg text-gray-700 italic mb-4">
                    "Streamlined bulk background check process for organizations. Purchase multiple checks at once and distribute unique codes to individuals. Each person can complete their verification on their own schedule. Perfect for teams of any size."
                  </blockquote>
                  <div>
                    <p className="font-semibold text-gray-900">Bulk Processing</p>
                    <p className="text-gray-600">Efficient background checks for teams and organizations</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        );

      case 2:
        return clientSecret ? (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <StripePayment
              onSuccess={handlePaymentSuccess}
              onBack={() => setStep(1)}
              price={totalPrice}
              formData={{
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
                dateOfBirth: '',
                streetAddress: '',
                city: '',
                province: '',
                postalCode: '',
              }}
              appliedVoucher=""
              discountPercent={discount * 100}
            />
          </Elements>
        ) : (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="bg-primary/10 rounded-xl p-6 border border-primary/20">
              <div className="flex items-center space-x-3 text-primary mb-4">
                <Shield className="h-6 w-6" />
                <h3 className="text-xl font-semibold">Purchase Successful!</h3>
              </div>
              
              <div className="space-y-6">
                <p className="text-gray-800">
                  Your bulk purchase of {quantity} background checks has been confirmed. You will receive an email with:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Package className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Unique codes for each background check</span>
                  </li>
                  <li className="flex items-start">
                    <Info className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Instructions for distributing the codes</span>
                  </li>
                  <li className="flex items-start">
                    <Users className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Access to your bulk checks dashboard</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center">
              <Link
                to="/"
                className="bg-primary hover:bg-opacity-90 text-white font-semibold py-4 px-8 rounded-xl inline-flex items-center justify-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <span>Return to Home</span>
                <ArrowLeft className="h-5 w-5 rotate-180" />
              </Link>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/" className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-primary" />
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight leading-none text-gray-900">
                SAFE<span className="text-primary">hire</span>
              </span>
              <span className="text-xs text-gray-500 tracking-widest uppercase">.ca</span>
            </div>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 mb-8"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Home</span>
        </Link>

        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Buy Background Checks in Bulk
            </h1>
            <p className="text-lg text-gray-600">
              Need background checks for multiple people? Purchase pre-paid checks in bulk and share them when you're ready. Perfect for employers and organizations.
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              How Bulk Checks Work
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start space-x-3">
                <Package className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <p className="text-gray-600">Purchase the number of checks you need at a discounted rate</p>
              </div>
              <div className="flex items-start space-x-3">
                <Users className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <p className="text-gray-600">Receive unique codes for each background check</p>
              </div>
              <div className="flex items-start space-x-3">
                <Info className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <p className="text-gray-600">Share codes with individuals to complete their checks</p>
              </div>
            </div>
          </div>

          {renderStep()}
        </div>
      </main>
      <Footer />
    </div>
  );
}