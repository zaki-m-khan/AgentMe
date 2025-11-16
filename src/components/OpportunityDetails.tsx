import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ChevronLeft, Calendar, MapPin, Building2, ExternalLink, Bookmark, CheckCircle2 } from 'lucide-react';
import { Opportunity, OpportunityType } from '../App';

interface OpportunityDetailsProps {
  opportunity: Opportunity;
  isSaved: boolean;
  isApplied: boolean;
  onSave: () => void;
  onRemove: () => void;
  onMarkApplied: () => void;
  onBack: () => void;
}

const typeColors: Record<OpportunityType, string> = {
  internship: 'bg-blue-100 text-blue-700',
  scholarship: 'bg-green-100 text-green-700',
  research: 'bg-purple-100 text-purple-700',
  event: 'bg-orange-100 text-orange-700',
  fellowship: 'bg-pink-100 text-pink-700'
};

export default function OpportunityDetails({ 
  opportunity, 
  isSaved,
  isApplied,
  onSave, 
  onRemove,
  onMarkApplied,
  onBack 
}: OpportunityDetailsProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="bg-white border-b border-gray-200 p-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 pb-32 space-y-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-3">
            <Badge className={`rounded-full ${typeColors[opportunity.type]}`}>
              {opportunity.type}
            </Badge>
            <Badge variant="outline" className="rounded-full">
              <Calendar className="w-3 h-3 mr-1" />
              Due {new Date(opportunity.deadline).toLocaleDateString()}
            </Badge>
          </div>

          <h1 className="text-2xl">{opportunity.title}</h1>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-600">
              <Building2 className="w-5 h-5" />
              <p>{opportunity.company}</p>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-5 h-5" />
              <p>{opportunity.location}</p>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 rounded-2xl p-5 space-y-2">
          <p className="text-purple-900">
            <span>💡 Why AgentMe recommended this:</span>
          </p>
          <p className="text-gray-700">{opportunity.relevanceExplanation}</p>
        </div>

        <div className="bg-white rounded-2xl p-5 space-y-3">
          <p className="text-gray-900">Skills Match</p>
          <div className="flex flex-wrap gap-2">
            {opportunity.skillsMatch.map(skill => (
              <Badge key={skill} variant="secondary" className="rounded-full">
                ✓ {skill}
              </Badge>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 space-y-3">
          <p className="text-gray-900">Description</p>
          <p className="text-gray-600 leading-relaxed">{opportunity.description}</p>
        </div>

        {isApplied && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
            <div className="flex items-center gap-2 text-green-900">
              <CheckCircle2 className="w-5 h-5" />
              <p>You've marked this as applied</p>
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="max-w-md mx-auto space-y-3">
          <Button 
            onClick={() => window.open(opportunity.link, '_blank')}
            className="w-full rounded-full py-6 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
          >
            <ExternalLink className="w-5 h-5 mr-2" />
            Apply Now
          </Button>
          
          <div className="flex gap-2">
            {!isApplied && (
              <Button
                onClick={onMarkApplied}
                variant="outline"
                className="flex-1 rounded-full"
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Mark as Applied
              </Button>
            )}
            <Button
              onClick={isSaved ? onRemove : onSave}
              variant="outline"
              className="flex-1 rounded-full"
            >
              <Bookmark className={`w-4 h-4 mr-2 ${isSaved ? 'fill-current' : ''}`} />
              {isSaved ? 'Saved' : 'Save'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
