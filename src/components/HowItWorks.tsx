import { ClipboardCheck, Clock, Shield, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const HowItWorks = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="h-1 bg-primary w-full" />
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('header.howItWorks')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('howItWorks.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-primary transition-all duration-300">
              <div className="flex items-center space-x-3 text-primary mb-4">
                <ClipboardCheck className="h-8 w-8" />
                <span className="text-lg font-semibold">{t('howItWorks.step1.title')}</span>
              </div>
              <p className="text-gray-600">{t('howItWorks.step1.description')}</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-primary transition-all duration-300">
              <div className="flex items-center space-x-3 text-primary mb-4">
                <Shield className="h-8 w-8" />
                <span className="text-lg font-semibold">{t('howItWorks.step2.title')}</span>
              </div>
              <p className="text-gray-600">{t('howItWorks.step2.description')}</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-primary transition-all duration-300">
              <div className="flex items-center space-x-3 text-primary mb-4">
                <Clock className="h-8 w-8" />
                <span className="text-lg font-semibold">{t('howItWorks.step3.title')}</span>
              </div>
              <p className="text-gray-600">{t('howItWorks.step3.description')}</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-primary transition-all duration-300">
              <div className="flex items-center space-x-3 text-primary mb-4">
                <CheckCircle className="h-8 w-8" />
                <span className="text-lg font-semibold">{t('howItWorks.step4.title')}</span>
              </div>
              <p className="text-gray-600">{t('howItWorks.step4.description')}</p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex items-center justify-center space-x-2 bg-gray-50 rounded-xl p-4 border border-gray-200">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-gray-600">{t('howItWorks.trust')}</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HowItWorks;