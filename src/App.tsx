import React, { useState, useEffect } from 'react';
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
  X,
  MoveRight,
  Users,
} from 'lucide-react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ProgressBar from './components/ProgressBar';
import StripePayment from './components/StripePayment';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import TrustBadges from './components/TrustBadges';
// Temporarily removed testimonials - uncomment when ready to add back
// import Testimonials from './components/Testimonials';
import LanguageSwitcher from './components/LanguageSwitcher';
import { scrollToSection } from './utils/scroll';

// Determine active package based on environment variable
const activePackageMode = import.meta.env.VITE_ACTIVE_PACKAGE_MODE || 'standard';

const standardPackage = {
  id: import.meta.env.VITE_STANDARD_PACKAGE_ID || 'standard_check',
  price: parseFloat(import.meta.env.VITE_STANDARD_PACKAGE_PRICE || '65'),
};

const testPackage = {
  id: import.meta.env.VITE_TEST_PACKAGE_ID || 'test_check',
  price: parseFloat(import.meta.env.VITE_TEST_PACKAGE_PRICE || '0.01'),
};

const activePackage = activePackageMode === 'test' ? testPackage : standardPackage;

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const appearance = {
  theme: 'stripe' as const,
  variables: {
    colorPrimary: '#10B981',
    colorBackground: '#ffffff',
    colorText: '#1f2937',
    colorDanger: '#ef4444',
    fontFamily: 'Inter, system-ui, sans-serif',
    borderRadius: '8px',
    spacingUnit: '4px',
  },
  rules: {
    '.Input': {
      border: '2px solid #e5e7eb',
      boxShadow: 'none',
      padding: '8px 12px',
    },
    '.Input:focus': {
      border: '2px solid #10B981',
      boxShadow: '0 0 0 1px rgba(16, 185, 129, 0.1)',
    },
    '.Label': {
      fontWeight: '500',
      marginBottom: '4px',
    },
  },
};

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
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
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
  const [voucherCode, setVoucherCode] = useState('');
  const [isApplyingVoucher, setIsApplyingVoucher] = useState(false);
  const [appliedVoucher, setAppliedVoucher] = useState('');
  const [voucherError, setVoucherError] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(120);
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isSecondaryButtonHovered, setIsSecondaryButtonHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const price = activePackage.price;
  const [finalAmountFromBackend, setFinalAmountFromBackend] = useState<number | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const scrollTo = searchParams.get('scrollTo');
    if (scrollTo) {
      scrollToSection(scrollTo);
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, [location]);

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
    navigate('/success/individual');
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(5);
  };

  const handleApplyVoucher = async () => {
    setIsApplyingVoucher(true);
    setVoucherError('');

    try {
      const response = await fetch('/.netlify/functions/validate-promotions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: voucherCode }),
      });

      const data = await response.json();
      console.log('Voucher validation response:', data);

      if (data.valid) {
        setAppliedVoucher(voucherCode);
        // Handle both percent_off and amount_off
        if (data.coupon.percent_off) {
          console.log('Setting percent discount:', data.coupon.percent_off);
          setDiscountPercent(data.coupon.percent_off);
        } else if (data.coupon.amount_off) {
          // Convert amount_off from cents to percentage for display
          const amountOffDollars = data.coupon.amount_off / 100;
          console.log('Amount off in dollars:', amountOffDollars);
          const percentOff = (amountOffDollars / price) * 100;
          console.log('Setting percent discount from fixed amount:', percentOff);
          setDiscountPercent(percentOff);
        }
        // Recreate payment intent with new price
        // await createPaymentIntent(); // Remove this direct call
      } else {
        setVoucherError('Invalid promotion code');
        setVoucherCode('');
        setDiscountPercent(0);
      }
    } catch (error) {
      console.error('Error applying voucher:', error);
      setVoucherError('Error applying promotion code. Please try again.');
    } finally {
      setIsApplyingVoucher(false);
    }
  };

  const createPaymentIntent = async () => {
    // console.log('[createPaymentIntent] Starting. Applied voucher:', appliedVoucher);
    try {
      setError(null);
      // Send the original price; backend will calculate the discount
      const originalAmountInCents = Math.round(price * 100);
      console.log('Creating payment intent:', {
        amount: originalAmountInCents, // Use original amount
        package: activePackage.id,
        originalPrice: price,
      });

      const response = await fetch('/.netlify/functions/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: originalAmountInCents, // Send original amount
          email: formData.email || email,
          packageId: activePackage.id,
          quantity: 1,
          promotionCode: appliedVoucher,
          formData: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            middleName: formData.middleName,
            phoneNumber: formData.phoneNumber,
            dateOfBirth: formData.dateOfBirth,
            streetAddress: formData.streetAddress,
            city: formData.city,
            province: formData.province,
            postalCode: formData.postalCode
          }
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create payment intent');
      }

      const data = await response.json();
      console.log('Payment intent response:', data);
      setFinalAmountFromBackend(data.finalAmount || null);

      // Handle case where no payment is required (100% discount)
      if (data.skipPayment) {
        console.log('No payment required - proceeding to success');
        handlePaymentSuccess();
        return;
      }

      if (!data.clientSecret) {
        throw new Error('No client secret received');
      }

      console.log('Payment intent created successfully');
      setClientSecret(data.clientSecret);
    } catch (err) {
      console.error('Error creating payment intent:', err);
      setError(err instanceof Error ? err.message : 'Failed to create payment intent');
      setClientSecret(null);
    }
  };

  useEffect(() => {
    if (step === 3) {
      // console.log('[useEffect] Step 3 detected. Applied voucher state:', appliedVoucher, 'Discount:', discountPercent);
      createPaymentIntent();
    }
  }, [step, appliedVoucher]);

  const isEmailValid = email.match(/^[\s\S]*$/); // Simplified regex if needed, or keep original

  const handleBulkChecksClick = (e: React.MouseEvent) => {
    if (!isEmailValid) {
      e.preventDefault();
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 3000);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="relative border-2 border-gray-200 rounded-xl p-6 cursor-pointer group hover:border-primary transition-all duration-300">
              <div className="absolute -top-4 -right-4 bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                {t('results.timeframe')}
              </div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{t('check.title')}</h3>
                  <p className="text-sm text-gray-600">{t('check.subtitle')}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">${price.toFixed(2)}</p>
                  <p className="text-sm text-gray-500">CAD</p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <ul className="space-y-3">
                  {(t('check.features', { returnObjects: true }) as string[]).map((feature: string, index: number) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <form onSubmit={handleStartCheck} className="mt-6 space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      {t('form.email.label')}
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                        placeholder={t('form.email.placeholder')}
                        required
                      />
                      <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <button
                      type="submit"
                      className="group w-full bg-primary text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center space-x-2 transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden hover:bg-primary/90"
                    >
                      <span className="relative z-10 text-lg transition-transform group-hover:scale-105">
                        {t('form.startButton')}
                      </span>
                      <ArrowRight className="h-5 w-5 relative z-10 transition-all duration-300 transform group-hover:translate-x-1" />
                    </button>
                    <Link
                      to="/bulk-checks"
                      onClick={handleBulkChecksClick}
                      className="group w-full bg-white text-primary border-2 border-primary font-bold py-4 px-6 rounded-xl flex items-center justify-center space-x-2 transition-all duration-300 hover:bg-primary/5"
                    >
                      <div className="relative">
                        {showTooltip && !isEmailValid && (
                          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm py-2 px-3 rounded whitespace-nowrap animate-fade-in">
                            Please enter your email first
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800"></div>
                          </div>
                        )}
                        <span className="relative z-10 text-lg">
                          {t('form.buyForOthers')}
                        </span>
                      </div>
                      <Users className="h-5 w-5 relative z-10" />
                    </Link>

                    {/* Certn Integration - Subtle Version */}
                    <div className="flex items-center justify-center space-x-3 mt-6 pt-6 border-t border-gray-200">
                      <span className="text-sm text-gray-500">Powered by</span>
                      <a
                        href="https://certn.co"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center hover:opacity-80 transition-opacity"
                      >
                        <img
                          src="/images/certn-logo.svg"
                          alt="Certn"
                          className="h-6 w-auto"
                          style={{ minWidth: '80px' }}
                        />
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-lg space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="legalFirstName" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('form.legalFirstName.label')}
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
                    {t('form.legalMiddleName.label')}
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
                    {t('form.legalLastName.label')}
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
                    {t('form.dateOfBirth.label')}
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
                      <option value="">{t('form.dateOfBirth.month')}</option>
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
                      <option value="">{t('form.dateOfBirth.day')}</option>
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
                      <option value="">{t('form.dateOfBirth.year')}</option>
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
                  {t('form.back')}
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
                  {t('form.continue')}
                </button>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            {clientSecret && (
              <Elements key={clientSecret} stripe={stripePromise} options={{ clientSecret, appearance }}>
                <StripePayment
                  onBack={() => setStep(2)}
                  onSuccess={handlePaymentSuccess}
                  price={price}
                  formData={formData}
                  appliedVoucher={appliedVoucher}
                  discountPercent={discountPercent}
                  finalAmount={finalAmountFromBackend}
                />
              </Elements>
            )}

            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">{t('voucher.title')}</h3>
                <span className="text-sm text-gray-600">{t('voucher.optional')}</span>
              </div>
              <div className="space-y-4">
                {appliedVoucher ? (
                  <div className="bg-white rounded-lg p-4 border-2 border-primary/20">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{t('voucher.applied')}</p>
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
                        {t('voucher.remove')}
                      </button>
                    </div>
                    {/* Log the state right before rendering the price */}
                    {/* {console.log('[UI Render] finalAmountFromBackend:', finalAmountFromBackend, 'Original Price:', price)} */}
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">{t('voucher.originalPrice')}:</span>
                        <span className="line-through">${price.toFixed(2)} CAD</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">{t('voucher.discount')}:</span>
                        <span className="text-green-600">-${(price - (finalAmountFromBackend !== null ? finalAmountFromBackend / 100 : price)).toFixed(2)} CAD</span>
                      </div>
                      <div className="flex justify-between font-semibold mt-2">
                        <span>{t('voucher.finalPrice')}:</span>
                        <span className="text-primary">${(finalAmountFromBackend !== null ? finalAmountFromBackend / 100 : price).toFixed(2)} CAD</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder={t('voucher.placeholder')}
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
                      {isApplyingVoucher ? t('voucher.applying') : t('voucher.apply')}
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

      default:
        return null;
    }
  };

  return (
    <div>
      <main className="min-h-screen bg-white">
        <header className="relative z-50">
          <div className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
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

                <nav className="hidden md:flex items-center space-x-8">
                  <button
                    onClick={() => scrollToSection('how-it-works')}
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    {t('header.howItWorks')}
                  </button>
                  <button
                    onClick={() => scrollToSection('faq')}
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    {t('header.faq')}
                  </button>
                  <Link
                    to="/blog"
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    {t('header.blog')}
                  </Link>
                  <LanguageSwitcher />
                  <button
                    onClick={() => setStep(1)}
                    onMouseEnter={() => setIsButtonHovered(true)}
                    onMouseLeave={() => setIsButtonHovered(false)}
                    className="group bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="relative z-10">{t('header.getStarted')}</span>
                      <MoveRight className={`h-5 w-5 relative z-10 transition-all duration-300 transform ${isButtonHovered ? 'translate-x-1' : ''}`} />
                    </div>
                    <div
                      className={`absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0 transform transition-transform duration-1000 ${
                        isButtonHovered ? 'translate-x-full' : '-translate-x-full'
                      }`}
                    />
                  </button>
                </nav>

                <button
                  className="md:hidden text-gray-600"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>

            {isMobileMenuOpen && (
              <div className="md:hidden border-t border-gray-200">
                <div className="px-4 py-4 space-y-4">
                  <button
                    onClick={() => {
                      scrollToSection('how-it-works');
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-600 hover:text-primary transition-colors"
                  >
                    {t('header.howItWorks')}
                  </button>
                  <button
                    onClick={() => {
                      scrollToSection('faq');
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-600 hover:text-primary transition-colors"
                  >
                    {t('header.faq')}
                  </button>
                  <Link
                    to="/blog"
                    className="block w-full text-left px-4 py-2 text-gray-600 hover:text-primary transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t('header.blog')}
                  </Link>
                  <div className="px-4">
                    <LanguageSwitcher />
                  </div>
                  <button
                    onClick={() => {
                      setStep(1);
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all duration-200"
                  >
                    {t('header.getStarted')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </header>

        <div className="relative pt-8 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-gray-800 text-2xl font-bold mb-6">
                    {step === 1
                      ? t('steps.start.title')
                      : step === 2
                      ? t('steps.personal.title')
                      : step === 3
                      ? t('steps.payment.title')
                      : t('steps.confirmation.title')}
                  </h2>
                  {renderStep()}
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                      {t('hero.title')}
                    </h1>
                    <p className="text-xl text-gray-600 mb-6">
                      {t('hero.subtitle')}
                    </p>
                    <TrustBadges />
                  </div>

                  {/* Temporarily removed testimonials - uncomment when ready to add back
                  <Testimonials />
                  */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div id="how-it-works" className="-mt-4 pt-4" />
      <HowItWorks />
      <div id="faq" className="-mt-16 pt-16" />
      <FAQ />
      <Footer />
    </div>
  );
}

export default App;
