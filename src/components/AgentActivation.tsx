import { useEffect, useState } from 'react';
import { Sparkles, Search, Filter, Target } from 'lucide-react';

interface AgentActivationProps {
  onComplete: () => void;
}

const loadingSteps = [
  { icon: Sparkles, text: 'Initializing your AI agent...' },
  { icon: Search, text: 'Learning your goals and preferences...' },
  { icon: Filter, text: 'Analyzing opportunity databases...' },
  { icon: Target, text: 'Finding personalized matches...' }
];

export default function AgentActivation({ onComplete }: AgentActivationProps) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= loadingSteps.length - 1) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [onComplete]);

  const CurrentIcon = loadingSteps[currentStep].icon;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-purple-500 via-blue-500 to-teal-500">
      <div className="text-center space-y-8">
        <div className="relative">
          <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mx-auto shadow-2xl">
            <CurrentIcon className="w-16 h-16 text-purple-500 animate-pulse" />
          </div>
          <div className="absolute inset-0 w-32 h-32 bg-white rounded-full mx-auto animate-ping opacity-20" />
        </div>

        <div className="space-y-4">
          <h2 className="text-white text-2xl">Activating Your Agent</h2>
          <p className="text-white/90 text-lg max-w-md mx-auto">
            {loadingSteps[currentStep].text}
          </p>
        </div>

        <div className="flex justify-center gap-2 pt-4">
          {loadingSteps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index <= currentStep ? 'bg-white' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
