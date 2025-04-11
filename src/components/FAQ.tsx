import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface FAQItemProps {
  question: string;
  answer: React.ReactNode;
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full py-6 flex justify-between items-center text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-semibold text-gray-900">{question}</span>
        {isOpen ? (
          <Minus className="h-5 w-5 text-primary flex-shrink-0" />
        ) : (
          <Plus className="h-5 w-5 text-primary flex-shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="pb-6">
          <div className="text-gray-600 space-y-4">
            {answer}
          </div>
        </div>
      )}
    </div>
  );
};

const FAQ = () => {
  const { t } = useTranslation();

  const faqItems = [
    { question: t('faq.q1.title'), answer: t('faq.q1.answer') },
    { question: t('faq.q2.title'), answer: t('faq.q2.answer') },
    { question: t('faq.q3.title'), answer: t('faq.q3.answer') },
    { question: t('faq.q4.title'), answer: t('faq.q4.answer') },
    { question: t('faq.q5.title'), answer: t('faq.q5.answer') },
    { question: t('faq.q6.title'), answer: t('faq.q6.answer') }
  ];

  return (
    <>
      <div className="h-1 bg-primary w-full" />
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('header.faq')}
            </h2>
          </div>

          <div className="max-w-3xl mx-auto divide-y divide-gray-200">
            {faqItems.map((item, index) => (
              <FAQItem
                key={index}
                question={item.question}
                answer={item.answer}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQ;