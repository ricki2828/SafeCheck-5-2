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
import ProgressBar from './components/ProgressBar';
import StripePayment from './components/StripePayment';
import Hero from './components/Hero';
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

function App() {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1);
  const [consent, setConsent] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    legalFirstName: '',
    legalLastName: '',
    legalMiddleName: '',
    dateOfBirth: '',
    firstName: '',
    middleName: '',
    lastName: '',
    maidenName: '',
    sex: '',
    phoneNumber: '',
    streetAddress: '',
    unitNumber: '',
    city: '',
    province: '',
    postalCode: '',
  });
  const totalSteps = 5;
  const estimatedMinutes = 5;
  const price = 65;
  const [voucherCode, setVoucherCode] = useState('');
  const [isApplyingVoucher, setIsApplyingVoucher] = useState(false);
  const [appliedVoucher, setAppliedVoucher] = useState('');
  const [voucherError, setVoucherError] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(120);
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const handleStartCheck = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    setRemainingSeconds(60);
  };

  const handleConsent = (e: React.FormEvent) => {
    e.preventDefault();
    if (consent) {
      setStep(3);
      setRemainingSeconds(60);
    }
  };

  const handlePaymentSuccess = () => {
    setStep(4);
    setRemainingSeconds(0);
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(5);
  };

  const handleApplyVoucher = async () => {
    setIsApplyingVoucher(true);
    setVoucherError('');
    
    try {
      const response = await fetch('/.netlify/functions/validate-promotions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code: voucherCode }),
        });
      
      const data = await response.json();
      
      if (data.valid) {
        setAppliedVoucher(voucherCode);
        setDiscountPercent(data.coupon.percentOff || 0);
      } else {
        setVoucherError('Invalid promotion code');
        setVoucherCode('');
      }
    } catch (error) {
      setVoucherError('Error applying promotion code. Please try again.');
    } finally {
      setIsApplyingVoucher(false);
    }
  };

  const createPaymentIntent = async () => {
    try {
      const response = await fetch('/.netlify/functions/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(price * (1 - discountPercent / 100) * 100),
          currency: 'cad',
        }),
      });

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setClientSecret(data.clientSecret);
    } catch (err) {
      console.error('Error creating payment intent:', err);
    }
  };

  useEffect(() => {
    if (step === 3) {
      createPaymentIntent();
    }
  }, [step, price, discountPercent]);

  const renderStep = () => {
    const progressBar = step < 4 ? (
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold text-gray-800">Order Progress</h2>
          <span className="text-sm text-gray-600 font-medium">
            {Math.ceil(remainingSeconds / 60)} min remaining
          </span>
        </div>
        <div className="h-3 bg-gray-200 rounded-full shadow-inner">
          <div
            className={`h-full bg-primary rounded-full transition-all duration-500 shadow-lg ${step === 1 ? 'animate-pulse w-[5%]' : ''}`}
            style={{ 
              width: step === 1 ? '5%' : 
                     step === 2 ? '40%' :
                     step === 3 ? '70%' : '100%'
            }}
          ></div>
        </div>
      </div>
    ) : null;

    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            {progressBar}
            <div className="relative border-2 border-gray-200 rounded-xl p-6 cursor-pointer group hover:border-primary transition-all duration-300">
              <img 
                src="/images/medal.svg" 
                alt="Trust Medal" 
                className="absolute -top-8 -right-8 w-32 h-32 z-10"
              />
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Criminal Record Check</h3>
                  <p className="text-sm text-gray-600">Comprehensive background verification</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-primary">${price}</p>
                </div>
              </div>
              <div className="bg-primary/5 rounded-xl p-4">
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                    <span className="text-sm">Searches the RCMP's Canadian Police Information Centre (CPIC)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                    <span className="text-sm">Results typically available within 15 minutes</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                    <span className="text-sm">Accepted by Canadian employers</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                    <span className="text-sm">Secure digital delivery</span>
                  </li>
                </ul>
                <form onSubmit={handleStartCheck} className="mt-6 space-y-6">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Your email address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 pr-14 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                      placeholder="name@example.ca"
                      required
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <div className="flex items-center justify-center w-8 h-6 bg-gray-100 rounded border border-gray-300 shadow-sm">
                        <svg 
                          viewBox="0 0 24 24" 
                          className="h-3.5 w-3.5 text-gray-500"
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2"
                        >
                          <path d="M20 4L20 10L8 10L8 6L3 12L8 18L8 14L20 14L20 20" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="group w-full bg-primary text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center space-x-2 transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden hover:bg-primary/90"
                  >
                    <span className="relative z-10 text-lg transition-transform group-hover:scale-105">
                      Start Background Check
                    </span>
                    <ArrowRight className="h-5 w-5 relative z-10 transition-all duration-300 transform group-hover:translate-x-1" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            {progressBar}
            <div className="bg-white rounded-xl p-6 shadow-lg space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="legalFirstName" className="block text-sm font-medium text-gray-700 mb-1">
                    Legal First Name
                  </label>
                  <input
                    type="text"
                    id="legalFirstName"
                    value={formData.legalFirstName}
                    onChange={(e) => setFormData({ ...formData, legalFirstName: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="legalMiddleName" className="block text-sm font-medium text-gray-700 mb-1">
                    Legal Middle Name (Optional)
                  </label>
                  <input
                    type="text"
                    id="legalMiddleName"
                    value={formData.legalMiddleName}
                    onChange={(e) => setFormData({ ...formData, legalMiddleName: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="legalLastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Legal Last Name
                  </label>
                  <input
                    type="text"
                    id="legalLastName"
                    value={formData.legalLastName}
                    onChange={(e) => setFormData({ ...formData, legalLastName: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <select
                      value={formData.dateOfBirth.split('-')[1] || ''}
                      onChange={(e) => {
                        const [year, _, day] = formData.dateOfBirth.split('-');
                        setFormData({
                          ...formData,
                          dateOfBirth: `${year || ''}-${e.target.value}-${day || ''}`
                        });
                      }}
                      className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                    >
                      <option value="">Month</option>
                      {Array.from({ length: 12 }, (_, i) => {
                        const month = i + 1;
                        return (
                          <option key={month} value={month.toString().padStart(2, '0')}>
                            {month.toString().padStart(2, '0')} - {new Date(2000, i).toLocaleString('default', { month: 'long' })}
                          </option>
                        );
                      })}
                    </select>

                    <select
                      value={formData.dateOfBirth.split('-')[2] || ''}
                      onChange={(e) => {
                        const [year, month, _] = formData.dateOfBirth.split('-');
                        setFormData({
                          ...formData,
                          dateOfBirth: `${year || ''}-${month || ''}-${e.target.value}`
                        });
                      }}
                      className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                    >
                      <option value="">Day</option>
                      {Array.from({ length: 31 }, (_, i) => {
                        const day = i + 1;
                        return (
                          <option key={day} value={day.toString().padStart(2, '0')}>
                            {day}
                          </option>
                        );
                      })}
                    </select>

                    <select
                      value={formData.dateOfBirth.split('-')[0] || ''}
                      onChange={(e) => {
                        const [_, month, day] = formData.dateOfBirth.split('-');
                        setFormData({
                          ...formData,
                          dateOfBirth: `${e.target.value}-${month || ''}-${day || ''}`
                        });
                      }}
                      className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                    >
                      <option value="">Year</option>
                      {Array.from({ length: 100 }, (_, i) => {
                        const year = new Date().getFullYear() - i - 16;
                        return (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => {
                    const [year, month, day] = formData.dateOfBirth.split('-');
                    const isDateComplete = Boolean(year && month && day);
                    if (formData.legalFirstName && formData.legalLastName && isDateComplete) {
                      setStep(step + 1);
                    }
                  }}
                  disabled={!formData.legalFirstName || !formData.legalLastName || !formData.dateOfBirth.split('-').every(Boolean)}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            {progressBar}
            {clientSecret && (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <StripePayment 
                  onBack={() => setStep(2)}
                  onSuccess={handlePaymentSuccess} 
                  price={price}
                  formData={formData}
                  appliedVoucher={appliedVoucher}
                  discountPercent={discountPercent}
                />
              </Elements>
            )}
            
            <div className="bg-primary/5 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">Have a voucher code?</h3>
                <span className="text-sm text-gray-600">Optional</span>
              </div>
              <div className="space-y-4">
                {appliedVoucher ? (
                  <div className="bg-white rounded-lg p-4 border-2 border-primary/20">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Applied Voucher</p>
                        <p className="text-lg font-semibold text-primary">{voucherCode}</p>
                      </div>
                      <button
                        onClick={() => {
                          setAppliedVoucher('');
                          setVoucherCode('');
                          setDiscountPercent(0);
                        }}
                        className="text-red-500 hover:text-red-600 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Original Price:</span>
                        <span className="line-through">${price.toFixed(2)} CAD</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Discount:</span>
                        <span className="text-green-600">-${(price * discountPercent / 100).toFixed(2)} CAD</span>
                      </div>
                      <div className="flex justify-between font-semibold mt-2">
                        <span>Final Price:</span>
                        <span className="text-primary">${(price * (1 - discountPercent / 100)).toFixed(2)} CAD</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Enter code"
                      className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 uppercase"
                      value={voucherCode}
                      onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
                    />
                    <button
                      onClick={handleApplyVoucher}
                      disabled={!voucherCode || isApplyingVoucher}
                      className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                        !voucherCode || isApplyingVoucher
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-primary text-white hover:bg-primary/90'
                      }`}
                    >
                      {isApplyingVoucher ? 'Applying...' : 'Apply'}
                    </button>
                  </div>
                )}
                {voucherError && (
                  <p className="text-sm text-red-600">{voucherError}</p>
                )}
              </div>
            </div>
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

  return (
    <div>
      <main className="min-h-screen relative">
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 right-0 h-full object-cover"
            style={{ width: '130%', objectPosition: 'right center' }}
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
        </div>
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
          <div className="relative">
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
          </div>
        </div>
      </main>
      <div id="how-it-works" className="-mt-16 pt-16" />
      <HowItWorks />
      <div id="faq" className="-mt-16 pt-16" />
      <FAQ />
    </div>
  );
}

export default App;