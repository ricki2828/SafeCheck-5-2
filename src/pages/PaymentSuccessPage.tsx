import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Footer from '../components/Footer';
import PaymentSuccess from '../components/PaymentSuccess';

export default function PaymentSuccessPage() {
  const { t } = useTranslation();
  
  return (
    <>
      <Helmet>
        <title>{t('success.title')} | SafeHire</title>
        <meta name="description" content={t('success.message')} />
      </Helmet>
      
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <PaymentSuccess email="trev@catchconsultants.com" />
      </main>
      
      <Footer />
    </>
  );
} 