import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';

interface FAQItemProps {
  question: string;
  answer: React.ReactNode;
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/10">
      <button
        className="w-full py-6 flex justify-between items-center text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-semibold text-white">{question}</span>
        {isOpen ? (
          <Minus className="h-5 w-5 text-primary flex-shrink-0" />
        ) : (
          <Plus className="h-5 w-5 text-primary flex-shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="pb-6">
          <div className="text-white/70 space-y-4">
            {answer}
          </div>
        </div>
      )}
    </div>
  );
};

const FAQ = () => {
  return (
    <section className="py-20 bg-dark/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-dark/40 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="text-xl font-semibold text-white mb-4">What information will my criminal record check show?</h3>
            <p className="text-white/70">
              Your criminal record check will show any criminal convictions, pending charges, and court orders registered in the RCMP National Repository of Criminal Records. This includes information from the Canadian Police Information Centre (CPIC) database.
            </p>
          </div>

          <div className="bg-dark/40 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="text-xl font-semibold text-white mb-4">What if I want to dispute my results?</h3>
            <p className="text-white/70">
              If you believe there are errors in your criminal record check results, you can submit a dispute. Contact us immediately and we'll guide you through the process of having your record reviewed and corrected if necessary.
            </p>
          </div>

          <div className="bg-dark/40 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="text-xl font-semibold text-white mb-4">I have old records. Can I get them pardoned?</h3>
            <p className="text-white/70">
              Yes, you may be eligible for a record suspension (pardon) for old criminal records. This is a separate process from a criminal record check. We recommend consulting with a legal professional or pardon service to understand your eligibility and the application process.
            </p>
          </div>

          <div className="bg-dark/40 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="text-xl font-semibold text-white mb-4">How long does it take?</h3>
            <p className="text-white/70">
              Most results are available within 15 minutes. In some cases, additional verification may be required which can take 24-48 hours.
            </p>
          </div>

          <div className="bg-dark/40 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="text-xl font-semibold text-white mb-4">Is it secure?</h3>
            <p className="text-white/70">
              Yes, we use bank-level encryption to protect your information. Our service is fully compliant with Canadian privacy laws and RCMP requirements.
            </p>
          </div>

          <div className="bg-dark/40 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="text-xl font-semibold text-white mb-4">Is it accepted by employers?</h3>
            <p className="text-white/70">
              Yes, our criminal record checks are accepted by employers across Canada. The results come directly from the RCMP's Canadian Police Information Centre.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ; 