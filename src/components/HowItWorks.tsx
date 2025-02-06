import { ClipboardCheck, Clock, Shield, CheckCircle } from 'lucide-react';

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-dark/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            How It Works
          </h2>
          <p className="text-lg text-white/80">
            Get your criminal record check in 4 simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Step 1 */}
          <div className="bg-dark/40 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center space-x-3 text-primary mb-4">
              <ClipboardCheck className="h-8 w-8" />
              <span className="text-lg font-semibold">1. Apply Online</span>
            </div>
            <p className="text-white/70">
              Fill out our secure online form with your basic information. No need to visit a police station.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-dark/40 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center space-x-3 text-primary mb-4">
              <Shield className="h-8 w-8" />
              <span className="text-lg font-semibold">2. Verify Identity</span>
            </div>
            <p className="text-white/70">
              We use secure electronic ID verification to confirm your identity, protecting you against fraud.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-dark/40 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center space-x-3 text-primary mb-4">
              <Clock className="h-8 w-8" />
              <span className="text-lg font-semibold">3. Quick Processing</span>
            </div>
            <p className="text-white/70">
              Most results are available within 15 minutes. We'll notify you as soon as your check is complete.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-dark/40 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center space-x-3 text-primary mb-4">
              <CheckCircle className="h-8 w-8" />
              <span className="text-lg font-semibold">4. Get Results</span>
            </div>
            <p className="text-white/70">
              Download your secure PDF certificate immediately. Share it directly with your employer.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center justify-center space-x-2 bg-dark/40 rounded-xl p-4 backdrop-blur-sm">
            <Shield className="h-5 w-5 text-primary" />
            <span className="text-white/70">
              Trusted by employers across Canada
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks; 