import { Shield } from 'lucide-react';

export default function OfficialBadges() {
  return (
    <div className="flex items-center justify-center bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
      <div className="flex items-center space-x-4">
        <div className="bg-white/10 p-2 rounded-lg">
          <Shield className="h-8 w-8 text-primary" />
        </div>
        <div className="text-left">
          <p className="text-white font-semibold">RCMP Verified</p>
          <p className="text-white/70 text-sm">Official Police Check</p>
        </div>
      </div>
    </div>
  );
}