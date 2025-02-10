import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Shield, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { provinces } from '../../types/provinces';

export default function ProvinceCheck() {
  const { province } = useParams<{ province: string }>();
  const provinceInfo = provinces[province?.toLowerCase() ?? ''];

  if (!provinceInfo) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-2xl font-bold text-gray-900">Province Not Found</h1>
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
            Criminal Record Check in {provinceInfo.name}
          </h1>
          <p className="text-xl text-white/80 max-w-3xl">
            {provinceInfo.description}
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
                {provinceInfo.requirements.map((req, index) => (
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
              <p className="text-lg font-medium">{provinceInfo.processingTime}</p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Accepted By</h2>
              <ul className="space-y-2">
                {provinceInfo.acceptedBy.map((org, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <span>{org}</span>
                  </li>
                ))}
              </ul>
            </div>

            {provinceInfo.specialNotes && (
              <div className="bg-primary/5 rounded-xl p-6">
                <div className="flex items-center space-x-3 text-primary mb-4">
                  <AlertTriangle className="h-6 w-6" />
                  <h2 className="text-xl font-semibold">Important Notes</h2>
                </div>
                <ul className="space-y-3">
                  {provinceInfo.specialNotes.map((note, index) => (
                    <li key={index} className="text-gray-700">{note}</li>
                  ))}
                </ul>
              </div>
            )}

            {provinceInfo.policeDepartments && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Local Police Services</h2>
                <ul className="space-y-3">
                  {provinceInfo.policeDepartments.map((dept, index) => (
                    <li key={index}>
                      <a 
                        href={dept.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80"
                      >
                        {dept.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 