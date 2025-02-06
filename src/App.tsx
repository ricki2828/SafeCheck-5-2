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
import { StripePayment } from './components/StripePayment';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import FAQ from './components/FAQ';
import { scrollToSection } from './utils/scroll';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function App() {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1);
  const [consent, setConsent] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    maidenName: '',
    dateOfBirth: '',
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

  const handleStartCheck = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleConsent = (e: React.FormEvent) => {
    e.preventDefault();
    if (consent) setStep(3);
  };

  const handlePaymentSuccess = () => {
    setStep(4);
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(5);
  };

  const handleApplyVoucher = async () => {
    setIsApplyingVoucher(true);
    setVoucherError('');
    
    try {
      // Call your backend to validate the voucher with Stripe
      const response = await fetch('/api/validate-voucher', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: voucherCode }),
      });
      
      const data = await response.json();
      
      if (data.valid) {
        setAppliedVoucher(voucherCode);
        setVoucherCode(''); // Clear input after successful application
      } else {
        setVoucherError(data.message || 'Invalid voucher code');
      }
    } catch (error) {
      setVoucherError('Error applying voucher. Please try again.');
    } finally {
      setIsApplyingVoucher(false);
    }
  };

  const renderStep = () => {
    const progressBar = (
      <ProgressBar 
        currentStep={step} 
        totalSteps={totalSteps} 
        estimatedMinutes={estimatedMinutes} 
      />
    );

    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            {progressBar}
            <div className="relative border-2 border-gray-200 rounded-xl p-6 cursor-pointer group hover:border-primary transition-all duration-300">
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
                      placeholder="name@example.com"
                      required
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <div className="flex items-center justify-center w-8 h-6 bg-gray-100 rounded border border-gray-300 shadow-sm">
                        <ArrowRight className="h-3.5 w-3.5 text-gray-500" />
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
          <form onSubmit={handleConsent} className="space-y-6">
            {progressBar}
            <h3 className="font-semibold text-gray-800">Important Information</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-center">
                <Check className="h-4 w-4 text-primary mr-2" /> You must be at least 18 years old.
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-primary mr-2" /> You consent to the collection of your personal information.
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-primary mr-2" /> We can only confirm disclosed convictions.
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-primary mr-2" /> This is not a Vulnerable Sector Check.
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-primary mr-2" /> These checks may not suit immigration/VISA purposes.
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-primary mr-2" /> No refunds once completed.
              </li>
            </ul>
            <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-xl">
              <input
                id="consent"
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                required
              />
              <label htmlFor="consent" className="text-sm text-gray-600">
                I acknowledge that I have read, understood, and agree to all the terms.
              </label>
            </div>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 border-2 border-primary text-primary font-semibold py-4 px-6 rounded-xl transition-all duration-200 hover:bg-primary hover:text-white"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={!consent}
                className={`flex-1 font-semibold py-4 px-6 rounded-xl flex items-center justify-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl ${
                  consent 
                    ? 'bg-primary hover:bg-opacity-90 text-white' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <span>Continue</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </form>
        );

      case 3:
        return (
          <div className="space-y-6">
            {progressBar}
            <Elements stripe={stripePromise}>
              <StripePayment 
                onSuccess={handlePaymentSuccess} 
                price={price}
                voucherCode={appliedVoucher}
                formData={{
                  firstName: formData.firstName,
                  middleName: formData.middleName,
                  lastName: formData.lastName,
                  email: email,
                  phoneNumber: formData.phoneNumber,
                  dateOfBirth: formData.dateOfBirth,
                  streetAddress: formData.streetAddress,
                  city: formData.city,
                  province: formData.province,
                  postalCode: formData.postalCode
                }} 
              />
            </Elements>
            <div className="bg-primary/5 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">Have a voucher code?</h3>
                <span className="text-sm text-gray-600">Optional</span>
              </div>
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
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    !voucherCode || isApplyingVoucher
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-primary text-white hover:bg-primary/90'
                  }`}
                >
                  {isApplyingVoucher ? 'Applying...' : 'Apply'}
                </button>
              </div>
              {voucherError && (
                <p className="mt-2 text-sm text-red-600">{voucherError}</p>
              )}
              {appliedVoucher && (
                <div className="mt-2 flex items-center text-sm text-primary">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  <span>Voucher applied successfully!</span>
                </div>
              )}
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
                type="button"
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
    <main className="min-h-screen">
      <Hero />
      <div className="relative">
        <header className="relative z-50">
          <div className="bg-white/50 backdrop-blur-sm">
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
                    <button 
                      onClick={() => scrollToSection('help')} 
                      className="text-white/70 hover:text-primary transition-colors"
                    >
                      Help
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
                <button 
                  onClick={() => {
                    scrollToSection('help');
                    setIsMobileMenuOpen(false);
                  }} 
                  className="block w-full text-left px-4 py-2 text-white/70 hover:text-primary transition-colors"
                >
                  Help
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
                      src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop&auto=format" 
                      alt="Job Seeker" 
                      className="w-10 h-10 rounded-full border-2 border-primary object-cover"
                    />
                    <div className="space-y-1">
                      <p className="text-white/90 text-sm italic">
                        "I got my background check in minutes. Started my new job the next day!"
                      </p>
                      <p className="text-primary text-sm font-semibold">Emily Chen</p>
                      <p className="text-white/60 text-xs">Software Developer</p>
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
                  <div className="space-y-6">
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
      <HowItWorks />
      <FAQ />
    </main>
  );
}

export default App;