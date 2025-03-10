import { Stethoscope, GraduationCap, Briefcase, Truck, Heart } from 'lucide-react';

export default function IndustryBadges() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {/* Healthcare */}
      <div className="bg-white rounded-lg p-4 border border-primary/20 hover:border-primary transition-colors duration-300 shadow-sm">
        <div className="flex items-center space-x-2 text-primary mb-2">
          <Stethoscope className="h-5 w-5" />
          <span className="font-semibold">Healthcare</span>
        </div>
        <p className="text-sm text-gray-600">Approved for medical professionals</p>
      </div>

      {/* Education */}
      <div className="bg-white rounded-lg p-4 border border-primary/20 hover:border-primary transition-colors duration-300 shadow-sm">
        <div className="flex items-center space-x-2 text-primary mb-2">
          <GraduationCap className="h-5 w-5" />
          <span className="font-semibold">Education</span>
        </div>
        <p className="text-sm text-gray-600">Accepted by school boards</p>
      </div>

      {/* Financial */}
      <div className="bg-white rounded-lg p-4 border border-primary/20 hover:border-primary transition-colors duration-300 shadow-sm">
        <div className="flex items-center space-x-2 text-primary mb-2">
          <Briefcase className="h-5 w-5" />
          <span className="font-semibold">Finance</span>
        </div>
        <p className="text-sm text-gray-600">Banking & FINTRAC compliant</p>
      </div>

      {/* Transportation */}
      <div className="bg-white rounded-lg p-4 border border-primary/20 hover:border-primary transition-colors duration-300 shadow-sm">
        <div className="flex items-center space-x-2 text-primary mb-2">
          <Truck className="h-5 w-5" />
          <span className="font-semibold">Transport</span>
        </div>
        <p className="text-sm text-gray-600">Transport Canada recognized</p>
      </div>

      {/* Childcare */}
      <div className="bg-white rounded-lg p-4 border border-primary/20 hover:border-primary transition-colors duration-300 shadow-sm">
        <div className="flex items-center space-x-2 text-primary mb-2">
          <Heart className="h-5 w-5" />
          <span className="font-semibold">Childcare</span>
        </div>
        <p className="text-sm text-gray-600">Licensed provider approved</p>
      </div>
    </div>
  );
}