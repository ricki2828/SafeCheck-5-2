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
    <section id="faq" className="py-20 bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-white/80">
            Everything you need to know about our criminal record checks
          </p>
        </div>

        <div className="space-y-0">
          <FAQItem
            question="What type of background check do you provide?"
            answer={
              <p>
                We provide comprehensive criminal record checks through Certn, a leading Canadian background screening provider. 
                Our checks search the Canadian Police Information Centre (CPIC) database maintained by the RCMP, ensuring you get 
                official and accurate results.
              </p>
            }
          />

          <FAQItem
            question="How long does it take to get results?"
            answer={
              <p>
                Most results are available within 15 minutes. In some cases where additional review is needed, it may take up to 24 hours. 
                You'll receive an email notification as soon as your results are ready.
              </p>
            }
          />

          <FAQItem
            question="Are these checks accepted by employers?"
            answer={
              <p>
                Yes! Our criminal record checks are provided through Certn, a trusted name in background screening. They are widely 
                accepted by employers across Canada and comply with all relevant privacy and employment laws.
              </p>
            }
          />

          <FAQItem
            question="How do you verify my identity?"
            answer={
              <p>
                We use Certn's secure electronic identity verification system. This allows us to verify your identity remotely, 
                without requiring you to visit a police station or submit physical documents. The process is quick, secure, and 
                meets all Canadian legal requirements.
              </p>
            }
          />

          <FAQItem
            question="Is my information secure?"
            answer={
              <>
                <p>
                  Absolutely. We take security seriously and partner with Certn, which maintains bank-level security standards. 
                  Your information is:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Encrypted using industry-leading protocols</li>
                  <li>Stored securely in Canadian data centers</li>
                  <li>Protected according to PIPEDA privacy regulations</li>
                  <li>Never shared without your consent</li>
                </ul>
              </>
            }
          />

          <FAQItem
            question="What information do I need to provide?"
            answer={
              <>
                <p>To complete your criminal record check, you'll need to provide:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Full legal name</li>
                  <li>Date of birth</li>
                  <li>Current address</li>
                  <li>Email address</li>
                  <li>Valid government-issued ID (for identity verification)</li>
                </ul>
              </>
            }
          />

          <FAQItem
            question="Can I share my results with multiple employers?"
            answer={
              <p>
                Yes! Once you receive your results, you'll get a secure PDF certificate that you can download and share with 
                any employer. Your results will be available in your secure online account for 30 days.
              </p>
            }
          />
        </div>
      </div>
    </section>
  );
};

export default FAQ; 