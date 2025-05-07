import { Shield, Clock, CheckCircle, CreditCard } from 'lucide-react';

export default function TrustBadges() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white rounded-lg p-4 border border-primary/20 hover:border-primary transition-colors duration-300 shadow-sm">
        <div className="flex items-center space-x-2 text-primary mb-2">
          <Shield className="h-5 w-5" />
          <span className="font-semibold">10,000+</span>
        </div>
        <p className="text-sm text-gray-600 font-medium">Checks completed</p>
      </div>

      <div className="bg-white rounded-lg p-4 border border-primary/20 hover:border-primary transition-colors duration-300 shadow-sm">
        <div className="flex items-center space-x-2 text-primary mb-2">
          <CheckCircle className="h-5 w-5" />
          <span className="font-semibold">15 mins</span>
        </div>
        <p className="text-sm text-gray-600 font-medium">Average completion</p>
      </div>

      {/* Remove Secure Tile */}
      {/* 
      <div className="bg-white rounded-lg p-4 border border-primary/20 hover:border-primary transition-colors duration-300 shadow-sm">
        <div className="flex items-center space-x-2 text-primary mb-2">
          <CreditCard className="h-5 w-5" />
          <span className="font-semibold">Secure</span>
        </div>
        <p className="text-sm text-gray-600 font-medium">PCI DSS compliant</p>
      </div>
      */}
    </div>
  );
}