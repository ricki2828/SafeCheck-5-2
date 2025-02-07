import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  Shield,
  Clock,
  Check,
  CheckCircle,
  MessageCircle,
  Info,
  FileText,
  Search,
  Mail,
  Menu,
  X
} from 'lucide-react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ProgressBar from "./components/ProgressBar";
import { StripePayment } from './components/StripePayment';
import Hero from "./components/Hero";
import HowItWorks from './components/HowItWorks';
import FAQ from './components/FAQ';
import { scrollToSection } from './utils/scroll';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface FormData {
  email: string;
  legalFirstName: string;
  legalLastName: string;
  legalMiddleName?: string;
  dateOfBirth: string;
  firstName: string;
  middleName: string;
  lastName: string;
  maidenName: string;
  sex: string;
  phoneNumber: string;
  streetAddress: string;
  unitNumber: string;
  city: string;
  province: string;
  postalCode: string;
}

const App = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    phoneNumber: '',
    dateOfBirth: '',
    streetAddress: '',
    city: '',
    province: '',
    postalCode: ''
  });
  const totalSteps = 5;
  const estimatedMinutes = 5;
  const price = 65;
  const [voucherCode, setVoucherCode] = useState('');
  const [isApplyingVoucher, setIsApplyingVoucher] = useState(false);
  const [appliedVoucher, setAppliedVoucher] = useState<string>();
  const [voucherError, setVoucherError] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(120);
  const [originalPrice] = useState(99.99);
  const [discountedPrice, setDiscountedPrice] = useState<number | null>(null);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setStep(2);
    }
  };

  const handlePersonalInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if required fields are filled
    if (
      formData.firstName &&
      formData.lastName &&
      formData.phoneNumber &&
      formData.dateOfBirth
    ) {
      setStep(3);
    }
  };

  const handlePaymentSuccess = () => {
    setStep(4);
    setRemainingSeconds(0);
  };

  const handleApplyVoucher = async () => {
    setIsApplyingVoucher(true);
    setVoucherError('');
    
    try {
      const response = await fetch('/.netlify/functions/validate-promotion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: voucherCode }),
      });
      
      const data = await response.json();
      console.log('Promotion code response:', data);
      
      if (data.valid) {
        setAppliedVoucher(data.promotion_code);
        if (data.coupon.percent_off) {
          setDiscountedPrice(originalPrice * (1 - data.coupon.percent_off / 100));
        } else if (data.coupon.amount_off) {
          setDiscountedPrice(originalPrice - (data.coupon.amount_off / 100));
        }
        setVoucherCode('');
      } else {
        setVoucherError(data.message || 'Invalid promotion code');
      }
    } catch (error) {
      console.error('Voucher error:', error);
      setVoucherError('Error applying promotion code. Please try again.');
    } finally {
      setIsApplyingVoucher(false);
    }
  };

  const handleRemoveVoucher = () => {
    setAppliedVoucher(undefined);
    setDiscountedPrice(null);
    setVoucherError('');
  };

  const progressBar = (
    <div className="space-y-2">
      <ProgressBar 
        currentStep={step}
        totalSteps={totalSteps}
        estimatedMinutes={estimatedMinutes}
      />
      <div className="text-sm text-gray-600">Step {step} of {totalSteps}</div>
    </div>
  );

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <Hero />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="max-w-3xl mx-auto space-y-8">
                <div className="text-center space-y-4">
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Background Check Process
                  </h2>
                  <p className="text-lg text-gray-600">
                    Complete your background check in three simple steps
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
                  <div className="relative p-6 bg-white shadow-sm rounded-lg border border-gray-200">
                    <div className="absolute -top-4 left-4 inline-block rounded-full bg-blue-600 p-2">
                      <Search className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-gray-900">Identity Verification</h3>
                    <p className="mt-2 text-gray-600">Securely verify your identity with basic information</p>
                  </div>

                  <div className="relative p-6 bg-white shadow-sm rounded-lg border border-gray-200">
                    <div className="absolute -top-4 left-4 inline-block rounded-full bg-blue-600 p-2">
                      <Info className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-gray-900">Background Check</h3>
                    <p className="mt-2 text-gray-600">We'll process your background check quickly and securely</p>
                  </div>

                  <div className="relative p-6 bg-white shadow-sm rounded-lg border border-gray-200">
                    <div className="absolute -top-4 left-4 inline-block rounded-full bg-blue-600 p-2">
                      <MessageCircle className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-gray-900">Results Delivery</h3>
                    <p className="mt-2 text-gray-600">Receive your results quickly and securely</p>
                  </div>
                </div>

                {progressBar}
                <form onSubmit={handleEmailSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={!email}
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                    >
                      Continue
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <HowItWorks />
            <FAQ />
          </>
        );

      case 2:
        return (
          <div className="space-y-6">
            {progressBar}
            <form onSubmit={handlePersonalInfoSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    required
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    required
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={!formData.firstName || !formData.lastName || !formData.phoneNumber || !formData.dateOfBirth}
                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            {progressBar}
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value)}
                  placeholder="Enter voucher code"
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  disabled={isApplyingVoucher || !!appliedVoucher}
                />
                <button
                  onClick={handleApplyVoucher}
                  disabled={isApplyingVoucher || !voucherCode || !!appliedVoucher}
                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                >
                  {isApplyingVoucher ? 'Applying...' : 'Apply'}
                </button>
              </div>
              {voucherError && (
                <p className="text-red-500 text-sm">{voucherError}</p>
              )}
              {renderPricing()}
            </div>
            <Elements stripe={stripePromise}>
              <StripePayment
                onSuccess={handlePaymentSuccess}
                onBack={() => setStep(2)}
                price={discountedPrice || originalPrice}
                promotionCode={appliedVoucher}
                formData={{
                  ...formData,
                  email
                }}
              />
            </Elements>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <div className="bg-primary/10 rounded-xl p-6 border border-primary/20">
              <div className="flex items-center space-x-3 text-primary mb-4">
                <CheckCircle className="h-6 w-6" />
                <h3 className="text-xl font-semibold">Payment Successful</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <p className="text-gray-800 mb-2">
                    Thank you for choosing SafeHire. Here's what happens next:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Mail className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">
                        Check your email for instructions from Certn to complete your verification
                      </span>
                    </li>
                    <li className="flex items-start">
                      <FileText className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">
                        Follow the link to provide your details securely in the Certn portal
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Clock className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">
                        Receive your criminal record check within 15 minutes
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-dark/5 rounded-lg p-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Important:</span> Your results will be delivered to the email address you provided ({email}). 
                    If you don't receive an email from Certn within 5 minutes, please check your spam folder.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => window.location.href = '/'}
                className="bg-primary hover:bg-opacity-90 text-white font-semibold py-4 px-8 rounded-xl inline-flex items-center justify-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <span>Return to Home</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderPricing = () => {
    return (
      <div className="mt-4 space-y-2">
        <div className="flex justify-between items-center">
          <span>Original Price:</span>
          <span>${originalPrice.toFixed(2)}</span>
        </div>
        
        {appliedVoucher && (
          <>
            <div className="flex justify-between items-center text-green-600">
              <span className="flex items-center">
                Applied Voucher
                <button
                  onClick={handleRemoveVoucher}
                  className="ml-2 text-red-500 hover:text-red-700"
                  title="Remove voucher"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </span>
              <span>-${(originalPrice - (discountedPrice || originalPrice)).toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center font-bold">
              <span>Final Price:</span>
              <span>${(discountedPrice || originalPrice).toFixed(2)}</span>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <main className="min-h-screen relative">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 -z-10 h-screen w-screen object-cover"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-dark to-dark/50" />
      
      <div className="relative">
        <header className="relative z-50">
          <div className="bg-dark/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="bg-dark p-2 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <Shield className="h-6 w-6 text-primary" />
                      <div className="flex flex-col">
                        <div className="flex items-baseline">
                          <span className="text-xl font-black tracking-tight leading-none text-primary">
                            SAFE<span className="text-white">hire</span>
                          </span>
                        </div>
                        <span className="text-xs text-gray-300 tracking-widest uppercase">.ca</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:hidden">
                  <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 rounded-lg text-white/70 hover:text-primary"
                  >
                    {isMobileMenuOpen ? (
                      <X className="h-5 w-5" />
                    ) : (
                      <Menu className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <nav className="hidden md:flex items-center">
                  <div className="flex items-center space-x-8">
                    <button 
                      onClick={() => scrollToSection('how-it-works')} 
                      className="text-white/70 hover:text-primary transition-colors"
                    >
                      How it Works
                    </button>
                    <button 
                      onClick={() => scrollToSection('faq')} 
                      className="text-white/70 hover:text-primary transition-colors"
                    >
                      FAQ
                    </button>
                  </div>
                </nav>
              </div>
            </div>
            <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
              <div className="px-4 pt-2 pb-6 space-y-4">
                <button 
                  onClick={() => {
                    scrollToSection('how-it-works');
                    setIsMobileMenuOpen(false);
                  }} 
                  className="block w-full text-left px-4 py-2 text-white/70 hover:text-primary transition-colors"
                >
                  How it Works
                </button>
                <button 
                  onClick={() => {
                    scrollToSection('faq');
                    setIsMobileMenuOpen(false);
                  }} 
                  className="block w-full text-left px-4 py-2 text-white/70 hover:text-primary transition-colors"
                >
                  FAQ
                </button>
              </div>
            </div>
          </div>
        </header>
        <main className="relative">
          <div className="relative pt-8 pb-20">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="hidden md:block absolute right-0 max-w-md" style={{ top: '0.5rem' }}>
                <div className="bg-dark/40 rounded-xl p-4 backdrop-blur-sm mx-4">
                  <div className="flex items-start gap-2">
                    <img 
                      src="/images/hockey-coach.png"
                      alt="Hockey Coach" 
                      className="w-10 h-10 rounded-full border-2 border-primary object-cover"
                    />
                    <div className="space-y-1">
                      <p className="text-white/90 text-sm italic">
                        "As a hockey coach, I need my background check done quickly. Got mine in minutes and was back on the ice the same day!"
                      </p>
                      <p className="text-primary text-sm font-semibold">Mike Thompson</p>
                      <p className="text-white/60 text-xs">Minor League Hockey Coach</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <div className="bg-white rounded-2xl shadow-2xl p-8 transform hover:scale-[1.02] transition-transform duration-300">
                    <h2 className="text-gray-800 text-2xl font-bold mb-6">
                      {step === 1
                        ? 'Get Your Background Check'
                        : step === 2
                        ? 'Important Information'
                        : step === 3
                        ? 'Payment Information'
                        : 'Review Information'}
                    </h2>
                    {renderStep()}
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="space-y-6 translate-y-0 md:translate-y-1/2">
                    <div className="bg-dark/40 backdrop-blur-sm rounded-xl p-6">
                      <h1 className="text-4xl font-bold text-white">
                        The fastest official criminal check in Canada
                      </h1>
                      <p className="text-xl text-white/80 mt-4">
                        Get your criminal record check in minutes, not weeks. Trusted by employers across Canada.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <div id="how-it-works" className="-mt-16 pt-16" />
      <HowItWorks />
      <div id="faq" className="-mt-16 pt-16" />
      <FAQ />
    </main>
  );
};

export default App;