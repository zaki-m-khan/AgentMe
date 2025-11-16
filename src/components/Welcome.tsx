import { Button } from './ui/button';
import { Sparkles } from 'lucide-react';

interface WelcomeProps {
  onNext: () => void;
}

export default function Welcome({ onNext }: WelcomeProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-500 via-purple-500 to-teal-500">
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <div className="flex items-center justify-center">
            <Sparkles className="w-20 h-20 text-white" />
          </div>
          <h1 className="text-white text-5xl">AgentMe</h1>
          <p className="text-white/90 text-xl max-w-sm mx-auto">
            Your AI Doppelganger for College Opportunities
          </p>
        </div>

        <div className="space-y-4 pt-8">
          <p className="text-white/80 max-w-md mx-auto">
            Let your AI agent find internships, scholarships, research roles, and events tailored just for you
          </p>
          <Button 
            onClick={onNext}
            size="lg"
            className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-6 rounded-full"
          >
            Create My Agent
          </Button>
        </div>
      </div>
    </div>
  );
}
