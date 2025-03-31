import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Footer from '../components/Footer';

export default function Privacy() {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-6">{t('privacy.title')}</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600">{t('privacy.lastUpdated', { date: 'March 14, 2024' })}</p>

            <h2>{t('privacy.sections.infoCollect.title')}</h2>
            <p>{t('privacy.sections.infoCollect.content')}</p>
            <ul>
              {t('privacy.sections.infoCollect.items', { returnObjects: true }).map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <h2>{t('privacy.sections.infoUse.title')}</h2>
            <p>{t('privacy.sections.infoUse.content')}</p>
            <ul>
              {t('privacy.sections.infoUse.items', { returnObjects: true }).map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <h2>{t('privacy.sections.infoSharing.title')}</h2>
            <p>{t('privacy.sections.infoSharing.content')}</p>
            <ul>
              {t('privacy.sections.infoSharing.items', { returnObjects: true }).map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <h2>{t('privacy.sections.dataSecurity.title')}</h2>
            <p>{t('privacy.sections.dataSecurity.content')}</p>

            <h2>{t('privacy.sections.dataRetention.title')}</h2>
            <p>{t('privacy.sections.dataRetention.content')}</p>

            <h2>{t('privacy.sections.yourRights.title')}</h2>
            <p>{t('privacy.sections.yourRights.content')}</p>
            <ul>
              {t('privacy.sections.yourRights.items', { returnObjects: true }).map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <h2>{t('privacy.sections.changes.title')}</h2>
            <p>{t('privacy.sections.changes.content')}</p>

            <h2>{t('privacy.sections.contact.title')}</h2>
            <p>{t('privacy.sections.contact.content')}</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}