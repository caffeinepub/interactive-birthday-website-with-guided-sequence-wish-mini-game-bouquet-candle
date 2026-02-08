import { Check } from 'lucide-react';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  return (
    <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => {
        const isComplete = step < currentStep;
        const isCurrent = step === currentStep;
        
        return (
          <div key={step} className="flex items-center">
            <div
              className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all
                ${isComplete ? 'bg-celebration-accent text-white' : ''}
                ${isCurrent ? 'bg-celebration-primary text-white ring-4 ring-celebration-accent/30' : ''}
                ${!isComplete && !isCurrent ? 'bg-gray-200 text-gray-400' : ''}
              `}
            >
              {isComplete ? <Check className="w-4 h-4" /> : step}
            </div>
            
            {step < totalSteps && (
              <div
                className={`
                  w-8 h-1 mx-1 rounded-full transition-all
                  ${isComplete ? 'bg-celebration-accent' : 'bg-gray-200'}
                `}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
