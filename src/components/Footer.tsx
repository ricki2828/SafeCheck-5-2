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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
        </div>

        {/* Trust Badges */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <Shield className="h-12 w-12 mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium text-white">{t('footer.badges.rcmp.title')}</p>
              <p className="text-xs text-gray-400">{t('footer.badges.rcmp.description')}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <Lock className="h-12 w-12 mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium text-white">{t('footer.badges.security.title')}</p>
              <p className="text-xs text-gray-400">{t('footer.badges.security.description')}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <CreditCard className="h-12 w-12 mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium text-white">{t('footer.badges.payments.title')}</p>
              <p className="text-xs text-gray-400">{t('footer.badges.payments.description')}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <CheckCircle className="h-12 w-12 mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium text-white">{t('footer.badges.trusted.title')}</p>
              <p className="text-xs text-gray-400">{t('footer.badges.trusted.description')}</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400">
              {t('footer.copyright', { year: new Date().getFullYear() })}
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-gray-400 hover:text-primary transition-colors">
                {t('footer.legal.privacy')}
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-primary transition-colors">
                {t('footer.legal.terms')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;