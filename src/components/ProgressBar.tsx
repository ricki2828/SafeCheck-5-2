import React from 'react';
import { Clock } from 'lucide-react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  estimatedMinutes: number;
}

export default function ProgressBar({ currentStep, totalSteps, estimatedMinutes }: ProgressBarProps) {
  // Calculate remaining minutes by subtracting the progress from total time
  const remainingMinutes = Math.max(
    Math.ceil(estimatedMinutes * (1 - (currentStep / totalSteps))),
    0
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-gray-800">Background Check Progress</h2>
        <div className="flex items-center space-x-2 text-gray-600">
          <Clock className="h-5 w-5" />
          <span>{remainingMinutes} mins remaining</span>
        </div>
      </div>
      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary rounded-full transition-all duration-500 relative"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/30 to-primary/0 animate-shine"></div>
        </div>
      </div>
    </div>
  );
}