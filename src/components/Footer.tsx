import { Shield, Lock, CreditCard, CheckCircle } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { scrollToSection } from '../utils/scroll';

const Footer = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const handleFAQClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === '/') {
      scrollToSection('faq');
    } else {
      navigate('/?scrollTo=faq');
    }
  };

  return (
    <footer className="bg-dark/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link to="/" className="inline-flex items-center space-x-3 mb-6">
              <Shield className="h-8 w-8 text-primary" />
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight leading-none text-white">
                  SAFE<span className="text-primary">hire</span>
                </span>
                <span className="text-xs text-gray-400 tracking-widest uppercase">.ca</span>
              </div>
            </Link>
            <p className="text-gray-400 mb-6">
              {t('footer.description')}
            </p>
            <a href="mailto:info@safehire.ca" className="text-gray-400 hover:text-primary transition-colors">
              info@safehire.ca
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('footer.quickLinks.title')}</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/how-it-works" className="text-gray-400 hover:text-primary transition-colors">
                  {t('footer.quickLinks.howItWorks')}
                </Link>
              </li>
              <li>
                <a 
                  href="#faq"
                  onClick={handleFAQClick}
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  {t('footer.quickLinks.faq')}
                </a>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-primary transition-colors">
                  {t('footer.quickLinks.blog')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('footer.legal.title')}</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-primary transition-colors">
                  {t('footer.legal.privacy')}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-primary transition-colors">
                  {t('footer.legal.terms')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Demo Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Demo Pages</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/confirmation/individual" className="text-gray-400 hover:text-primary transition-colors">
                  Individual Confirmation
                </Link>
              </li>
              <li>
                <Link to="/confirmation/bulk" className="text-gray-400 hover:text-primary transition-colors">
                  Bulk Confirmation
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} SafeHire.ca. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <a href="https://twitter.com/safehireca" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/safehireca" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;