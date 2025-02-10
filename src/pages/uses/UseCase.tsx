import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Shield, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  DollarSign,
  FileText,
  HelpCircle
} from 'lucide-react';
import { useCases } from '../../types/uses';

export default function UseCase() {
  const { useCase } = useParams<{ useCase: string }>();
  const caseInfo = useCases[useCase?.toLowerCase() ?? ''];

  if (!caseInfo) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-2xl font-bold text-gray-900">Use Case Not Found</h1>
            <Link to="/" className="text-primary hover:text-primary/80">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-dark/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-white/80 hover:text-white mb-8"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>

          <h1 className="text-4xl font-bold text-white mb-4">
            {caseInfo.title}
          </h1>
          <p className="text-xl text-white/80 max-w-3xl">
            {caseInfo.description}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-3 text-primary mb-4">
                <Shield className="h-6 w-6" />
                <h2 className="text-xl font-semibold">Requirements</h2>
              </div>
              <ul className="space-y-3">
                {caseInfo.requirements.map((req, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-3 text-primary mb-4">
                <Clock className="h-6 w-6" />
                <h2 className="text-xl font-semibold">Processing Time</h2>
              </div>
              <p className="text-lg font-medium">{caseInfo.turnaroundTime}</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-3 text-primary mb-4">
                <DollarSign className="h-6 w-6" />
                <h2 className="text-xl font-semibold">Pricing</h2>
              </div>
              <p className="text-3xl font-bold text-gray-900">${caseInfo.price}</p>
              <p className="text-gray-600 mt-2">Includes digital delivery</p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-3 text-primary mb-4">
                <CheckCircle className="h-6 w-6" />
                <h2 className="text-xl font-semibold">Accepted By</h2>
              </div>
              <ul className="space-y-2">
                {caseInfo.acceptedBy.map((org, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <span>{org}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-primary/5 rounded-xl p-6">
              <div className="flex items-center space-x-3 text-primary mb-4">
                <FileText className="h-6 w-6" />
                <h2 className="text-xl font-semibold">Additional Information</h2>
              </div>
              <ul className="space-y-3">
                {caseInfo.additionalInfo.map((info, index) => (
                  <li key={index} className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{info}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-3 text-primary mb-4">
                <HelpCircle className="h-6 w-6" />
                <h2 className="text-xl font-semibold">Common Questions</h2>
              </div>
              <div className="space-y-6">
                {caseInfo.commonQuestions.map((qa, index) => (
                  <div key={index}>
                    <h3 className="font-medium text-gray-900 mb-2">{qa.question}</h3>
                    <p className="text-gray-600">{qa.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors"
          >
            Start Your Check Now
          </Link>
        </div>
      </div>
    </div>
  );
} 