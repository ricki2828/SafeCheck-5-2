import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Shield, Clock, CheckCircle, ArrowLeft } from 'lucide-react';
import Layout from '../../components/Layout';
import { provinces } from '../../types/provinces';
import type { ProvinceData, PoliceStation } from '../../types/provinces';

const ProvincePage = () => {
  const { province } = useParams<{ province: string }>();
  const provinceData: ProvinceData | undefined = provinces[province?.toLowerCase() ?? ''];
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Debug logging
  console.log('Province param:', province);
  console.log('Province data:', provinceData);

  const handleGetCheck = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const provinceBanners: Record<string, string> = {
    'alberta': 'https://images.unsplash.com/photo-1581092160562-40aa08e78837',
    'british_columbia': 'https://images.unsplash.com/photo-1508693926297-1d61ee3df82a',
    'manitoba': 'https://images.unsplash.com/photo-1629163955423-0aec4eca386c',
    'new_brunswick': 'https://images.unsplash.com/photo-1578505424774-e48aa22d9538',
    'newfoundland_and_labrador': 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce',
    'nova_scotia': 'https://images.unsplash.com/photo-1566147511915-0ce97d9ddaa0',
    'ontario': 'https://images.unsplash.com/photo-1603466182843-75f713fd0a7c',
    'prince_edward_island': 'https://images.unsplash.com/photo-1567599672391-17b31d92e431',
    'quebec': 'https://images.unsplash.com/photo-1565893708545-4972cdb49d6c',
    'saskatchewan': 'https://images.unsplash.com/photo-1508693926297-1d61ee3df82a'
  } as const;

  // Fallback gradient background if image fails
  const gradientStyle = {
    backgroundImage: 'linear-gradient(to right, #2c5282, #2b6cb0)',
  };

  // Debug logging for banner URL
  const bannerUrl = province ? provinceBanners[province.toLowerCase() as keyof typeof provinceBanners] : null;
  console.log('Banner URL:', bannerUrl);

  if (!provinceData) {
    return (
      <Layout>
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
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Banner Image */}
        <div 
          className="relative h-[300px] md:h-[400px] w-full bg-gray-900"
          style={imageError ? gradientStyle : undefined}
        >
          {bannerUrl && !imageError && (
            <img
              src={bannerUrl}
              alt={`${provinceData.name} landscape`}
              className={`
                absolute inset-0 w-full h-full object-cover
                ${imageLoaded ? 'opacity-100' : 'opacity-0'}
                transition-opacity duration-500
              `}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          )}
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-full flex items-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Criminal Record Checks in {provinceData.name}
              </h1>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <p className="text-lg text-gray-600 mb-8">{provinceData.description}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center mb-4">
                    <Clock className="w-6 h-6 text-primary mr-2" />
                    <h2 className="text-lg font-semibold">Processing Time</h2>
                  </div>
                  <p className="text-gray-600">{provinceData.processingTime}</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center mb-4">
                    <Shield className="w-6 h-6 text-primary mr-2" />
                    <h2 className="text-lg font-semibold">Requirements</h2>
                  </div>
                  <ul className="text-gray-600 list-disc list-inside">
                    {provinceData.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center mb-4">
                    <CheckCircle className="w-6 h-6 text-primary mr-2" />
                    <h2 className="text-lg font-semibold">Online Check</h2>
                  </div>
                  <p className="text-gray-600 mb-4">Start your criminal record check online today.</p>
                  <button
                    onClick={() => navigate('/apply')}
                    className="w-full bg-primary text-white px-4 py-2 rounded hover:bg-primary/80 transition-colors"
                  >
                    Start Your Check
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Police Stations in {provinceData.name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {provinceData.policeStations.map((station: PoliceStation, index: number) => (
                    <div key={index} className="border rounded p-4">
                      <h3 className="font-semibold mb-2">{station.name}</h3>
                      <p className="text-gray-600 mb-2">{station.address}</p>
                      <p className="text-gray-600">{station.phone}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProvincePage;