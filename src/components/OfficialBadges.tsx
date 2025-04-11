import { Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function OfficialBadges() {
  const { t } = useTranslation();
  
  return (
    <div className="flex items-center justify-center bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
      <div className="flex items-center space-x-4">
        <div className="bg-white/10 p-2 rounded-lg">
          <Shield className="h-8 w-8 text-primary" />
        </div>
        <div className="text-left">
          <p className="text-white font-semibold">{t('badge.title')}</p>
          <p className="text-white/70 text-sm">{t('badge.subtitle')}</p>
        </div>
      </div>
    </div>
  );
}