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
  Mail
} from 'lucide-react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ProgressBar from './components/ProgressBar';
import { StripePayment } from './components/StripePayment';

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

  const addressInputRef = useRef<HTMLInputElement>(null);
  const [addressAutocomplete, setAddressAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    const initializeAutocomplete = async () => {
      if (
        step === 4 &&
        addressInputRef.current &&
        !addressAutocomplete &&
        typeof window.google !== 'undefined'
      ) {
        await google.maps.importLibrary("places");

        const autocomplete = new window.google.maps.places.Autocomplete(addressInputRef.current, {
          componentRestrictions: { country: 'ca' },
          fields: ['address_components', 'formatted_address'],
          types: ['address'],
        });
        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          if (place.address_components) {
            const getComponent = (type: string) => {
              const comp = place.address_components.find((c: any) => c.types[0] === type);
              return comp ? comp.long_name : '';
            };
            setFormData(prev => ({
              ...prev,
              streetAddress: `${getComponent('street_number')} ${getComponent('route')}`.trim(),
              city: getComponent('locality'),
              province: getComponent('administrative_area_level_1'),
              postalCode: getComponent('postal_code'),
            }));
          }
        });
        setAddressAutocomplete(autocomplete);
      }
    };
    initializeAutocomplete();
  }, [step, addressAutocomplete]);

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
          </div>
        );

      case 4:
        return (
          <form onSubmit={handleAddressSubmit} className="space-y-6">
            {progressBar}
            <h3 className="text-xl font-semibold text-gray-800">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Legal First Name"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200"
              />
              <input
                type="text"
                placeholder="Middle Name (Optional)"
                value={formData.middleName}
                onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Legal Last Name"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200"
              />
              <input
                type="text"
                placeholder="Maiden Name (if applicable)"
                value={formData.maidenName}
                onChange={(e) => setFormData({ ...formData, maidenName: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Date of Birth (MM-DD-YYYY)"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200"
              />
              <select
                value={formData.sex}
                onChange={(e) => setFormData({ ...formData, sex: e.target.value })}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200"
              >
                <option value="">Select Your Sex</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <input
              type="tel"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200"
            />
            <h3 className="text-xl font-semibold text-gray-800">Your Most Recent Address in Canada</h3>
            <input
              ref={addressInputRef}
              type="text"
              placeholder="Street Address"
              value={formData.streetAddress}
              onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200"
            />
            <input
              type="text"
              placeholder="Unit/Suite Number"
              value={formData.unitNumber}
              onChange={(e) => setFormData({ ...formData, unitNumber: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="City/Municipality"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200"
              />
              <select
                value={formData.province}
                onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200"
              >
                <option value="">Select Province</option>
                <option value="AB">Alberta</option>
                <option value="BC">British Columbia</option>
                <option value="MB">Manitoba</option>
                <option value="NB">New Brunswick</option>
                <option value="NL">Newfoundland and Labrador</option>
                <option value="NS">Nova Scotia</option>
                <option value="ON">Ontario</option>
                <option value="PE">Prince Edward Island</option>
                <option value="QC">Quebec</option>
                <option value="SK">Saskatchewan</option>
                <option value="NT">Northwest Territories</option>
                <option value="NU">Nunavut</option>
                <option value="YT">Yukon</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="Postal Code"
              value={formData.postalCode}
              onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200"
            />
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="flex-1 border-2 border-primary text-primary font-semibold py-4 px-6 rounded-xl transition-all duration-200 hover:bg-primary hover:text-white"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 bg-primary hover:bg-opacity-90 text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <span>Submit Application</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </form>
        );

      case 5:
        return (
          <div className="space-y-6">
            {progressBar}
            <div className="bg-primary/5 rounded-xl p-6 space-y-4">
              <div className="flex items-center space-x-3 text-primary">
                <CheckCircle className="h-6 w-6" />
                <h3 className="font-semibold">Application Submitted</h3>
              </div>
              <h3 className="font-semibold text-gray-800">Review Your Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">{email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-medium">{formData.firstName} {formData.lastName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium">{formData.phoneNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Address</p>
                  <p className="font-medium">
                    {formData.streetAddress}
                    {formData.unitNumber && `, Unit ${formData.unitNumber}`}
                    <br />
                    {formData.city}, {formData.province} {formData.postalCode}
                  </p>
                </div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Your background check application has been submitted. We'll contact you shortly with next steps.
              </p>
              <button
                type="button"
                onClick={() => (window.location.href = '/')}
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
    <div className="min-h-screen bg-secondary font-inter">
      <div className="relative">
        <div className="absolute inset-0 h-[100vh]">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80" 
            alt="Office background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/95 via-secondary/90 to-secondary"></div>
        </div>
        <header className="relative z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="bg-dark p-3 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-8 w-8 text-primary" />
                    <div className="flex flex-col">
                      <div className="flex items-baseline">
                        <span className="text-2xl font-black tracking-tight leading-none text-primary">
                          SAFE<span className="text-white">hire</span>
                        </span>
                      </div>
                      <span className="text-xs text-gray-300 tracking-widest uppercase">.ca</span>
                    </div>
                  </div>
                </div>
              </div>
              <nav className="hidden md:flex items-center space-x-8">
                <a href="#about" className="text-white/80 hover:text-primary transition-colors">About</a>
                <a href="#help" className="text-white/80 hover:text-primary transition-colors">Help</a>
                <a 
                  href="#login" 
                  className="px-4 py-2 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-all duration-300"
                >
                  Login
                </a>
              </nav>
            </div>
          </div>
        </header>
        <main className="relative">
          <div className="relative pt-16 pb-20">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="absolute top-0 right-0 max-w-md transform -translate-y-1/2">
                <div className="bg-dark/40 rounded-2xl p-8 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <img 
                      src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop&auto=format" 
                      alt="Job Seeker" 
                      className="w-12 h-12 rounded-full border-2 border-primary object-cover"
                    />
                    <div>
                      <p className="text-white/90 text-sm italic mb-2">
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
                        : step === 4
                        ? 'Personal Information'
                        : 'Review Information'}
                    </h2>
                    {renderStep()}
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="space-y-6">
                    <h1 className="text-4xl font-bold text-white">
                      The fastest official criminal check in Canada
                    </h1>
                    <p className="text-xl text-white/80">
                      Get your criminal record check in minutes, not weeks. Trusted by employers across Canada.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-dark/40 backdrop-blur-sm p-4 rounded-xl">
                        <div className="flex items-center space-x-3 text-primary mb-2">
                          <Clock className="h-5 w-5" />
                          <span className="font-semibold">Fast Results</span>
                        </div>
                        <p className="text-white/70 text-sm">
                          Most results available within 15 minutes
                        </p>
                      </div>
                      <div className="bg-dark/40 backdrop-blur-sm p-4 rounded-xl">
                        <div className="flex items-center space-x-3 text-primary mb-2">
                          <Shield className="h-5 w-5" />
                          <span className="font-semibold">Secure</span>
                        </div>
                        <p className="text-white/70 text-sm">
                          Bank-level encryption and security
                        </p>
                      </div>
                      <div className="bg-dark/40 backdrop-blur-sm p-4 rounded-xl">
                        <div className="flex items-center space-x-3 text-primary mb-2">
                          <CheckCircle className="h-5 w-5" />
                          <span className="font-semibold">Accepted</span>
                        </div>
                        <p className="text-white/70 text-sm">
                          Recognized by employers nationwide
                        </p>
                      </div>
                      <div className="bg-dark/40 backdrop-blur-sm p-4 rounded-xl">
                        <div className="flex items-center space-x-3 text-primary mb-2">
                          <MessageCircle className="h-5 w-5" />
                          <span className="font-semibold">Support</span>
                        </div>
                        <p className="text-white/70 text-sm">
                          24/7 customer service available
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;