import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

const Footer = () => {
  const handleProvinceClick = (e: React.MouseEvent) => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const provinces = [
    { name: 'Alberta', path: '/provinces/alberta' },
    { name: 'British Columbia', path: '/provinces/british_columbia' },
    { name: 'Manitoba', path: '/provinces/manitoba' },
    { name: 'New Brunswick', path: '/provinces/new_brunswick' },
    { name: 'Newfoundland and Labrador', path: '/provinces/newfoundland_and_labrador' },
    { name: 'Nova Scotia', path: '/provinces/nova_scotia' },
    { name: 'Ontario', path: '/provinces/ontario' },
    { name: 'Prince Edward Island', path: '/provinces/prince_edward_island' },
    { name: 'Quebec', path: '/provinces/quebec' },
    { name: 'Saskatchewan', path: '/provinces/saskatchewan' }
  ];

  return (
    <footer className="bg-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-5 gap-8">
          <div className="col-span-2">
            <Link to="/" className="inline-block mb-6">
              <div className="flex items-center space-x-3">
                <div className="bg-dark/80 p-2 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-6 w-6 text-primary" />
                    <div className="flex flex-col">
                      <div className="flex items-baseline">
                        <span className="text-xl font-black tracking-tight leading-none text-primary">
                          SAFE<span className="text-white">hire</span>
                        </span>
                      </div>
                      <span className="text-xs text-gray-300 tracking-widest uppercase">.ca</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            <p className="text-white/60 text-sm">
              Fast, secure criminal record checks for Canadian employers and individuals.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/60 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <a href="#how-it-works" className="text-white/60 hover:text-white">
                  How It Works
                </a>
              </li>
              <li>
                <Link to="/blog" className="text-white/60 hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <a href="#faq" className="text-white/60 hover:text-white">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Provinces</h3>
            <ul className="space-y-2">
              {provinces.slice(0, 5).map((province) => (
                <li key={province.path}>
                  <Link
                    to={province.path}
                    onClick={handleProvinceClick}
                    className="text-white/80 hover:text-white"
                  >
                    {province.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">&nbsp;</h3>
            <ul className="space-y-2">
              {provinces.slice(5).map((province) => (
                <li key={province.path}>
                  <Link
                    to={province.path}
                    onClick={handleProvinceClick}
                    className="text-white/80 hover:text-white"
                  >
                    {province.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-white/60 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-white/60 hover:text-white">
                  Terms of Service
                </Link>
              </li>
            </ul>

            <h3 className="text-lg font-semibold mb-4 mt-8">Contact</h3>
            <ul className="space-y-2">
              <li className="text-white/60">
                Email: support@safehire.ca
              </li>
              <li className="text-white/60">
                Hours: Mon-Fri 9am-5pm EST
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="text-center text-white/60 text-sm">
            <p>© {new Date().getFullYear()} SafeHire. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 