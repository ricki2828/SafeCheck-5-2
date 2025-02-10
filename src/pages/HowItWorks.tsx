import React from 'react';
import Layout from '../components/Layout';

const HowItWorks = () => {
  const steps = [
    {
      title: "Search for a Business",
      description: "Enter the name or address of any business or property in Canada."
    },
    {
      title: "View Safety Information",
      description: "Access comprehensive safety inspection reports, compliance status, and historical data."
    },
    {
      title: "Stay Informed",
      description: "Set up alerts to receive notifications about new inspections or changes in safety status."
    },
    {
      title: "Make Informed Decisions",
      description: "Use our detailed reports to make informed decisions about where to live, work, or do business."
    }
  ];

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">How SafeCheck Works</h1>
        <div className="space-y-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <h3 className="ml-4 text-lg font-medium text-gray-900">{step.title}</h3>
              </div>
              <p className="text-gray-600 ml-14">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default HowItWorks; 