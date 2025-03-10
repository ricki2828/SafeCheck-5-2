import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Footer from '../components/Footer';

export default function Terms() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 mb-8"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>{t('blog.backToHome')}</span>
        </Link>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">{t('terms.title')}</h1>
          
          <div className="prose prose-lg max-w-none">
            <p>{t('terms.lastUpdated', { date: 'March 14, 2024' })}</p>

            <h2>{t('terms.sections.acceptance.title')}</h2>
            <p>{t('terms.sections.acceptance.content')}</p>

            <h2>{t('terms.sections.description.title')}</h2>
            <p>{t('terms.sections.description.content')}</p>

            <h2>{t('terms.sections.responsibilities.title')}</h2>
            <ul>
              {t('terms.sections.responsibilities.items', { returnObjects: true }).map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <h2>{t('terms.sections.process.title')}</h2>
            <p>{t('terms.sections.process.content')}</p>

            <h2>{t('terms.sections.limitations.title')}</h2>
            <ul>
              {t('terms.sections.limitations.items', { returnObjects: true }).map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <h2>{t('terms.sections.refund.title')}</h2>
            <p>{t('terms.sections.refund.content')}</p>

            <h2>{t('terms.sections.privacy.title')}</h2>
            <p>{t('terms.sections.privacy.content')}</p>

            <h2>{t('terms.sections.modifications.title')}</h2>
            <p>{t('terms.sections.modifications.content')}</p>

            <h2>{t('terms.sections.governing.title')}</h2>
            <p>{t('terms.sections.governing.content')}</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}