import React from 'react';
import Layout from '../components/Layout';

const FAQs = () => {
  const faqs = [
    {
      question: "What is SafeCheck?",
      answer: "SafeCheck is a platform that helps you verify the safety and compliance status of businesses and properties across Canada."
    },
    {
      question: "How does SafeCheck work?",
      answer: "We aggregate safety inspection data from various provincial and municipal sources, making it easy for you to access important safety information in one place."
    },
    {
      question: "Is the information up to date?",
      answer: "We regularly update our database with the latest information from official sources. Each record shows its last update date."
    },
    // Add more FAQs as needed
  ];

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h1>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default FAQs; 