import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Calendar, MapPin, Building2, Bookmark, CheckCircle2 } from 'lucide-react';
import { Opportunity, OpportunityType, Screen } from '../App';
import BottomNav from './BottomNav';

interface SavedProps {
  opportunities: Opportunity[];
  appliedOpportunities: string[];
  onNavigate: (screen: Screen) => void;
  onViewDetails: (opportunity: Opportunity) => void;
  onMarkApplied: (opportunityId: string) => void;
  onRemove: (opportunityId: string) => void;
}

const typeColors: Record<OpportunityType, string> = {
  internship: 'bg-blue-100 text-blue-700',
  scholarship: 'bg-green-100 text-green-700',
  research: 'bg-purple-100 text-purple-700',
  event: 'bg-orange-100 text-orange-700',
  fellowship: 'bg-pink-100 text-pink-700'
};

export default function Saved({ 
  opportunities, 
  appliedOpportunities,
  onNavigate, 
  onViewDetails,
  onMarkApplied,
  onRemove
}: SavedProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h2>Saved Opportunities</h2>
          <Badge variant="secondary" className="rounded-full">
            {opportunities.length} saved
          </Badge>
        </div>
      </div>

      <div className="flex-1 p-6 pb-24 space-y-4">
        {opportunities.length === 0 ? (
          <div className="flex items-center justify-center h-96">
            <div className="text-center space-y-4">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                <Bookmark className="w-12 h-12 text-gray-400" />
              </div>
              <h3>No saved opportunities yet</h3>
              <p className="text-gray-600 max-w-xs mx-auto">
                Swipe right on opportunities in your inbox to save them here
              </p>
              <Button 
                onClick={() => onNavigate('inbox')}
                className="rounded-full"
              >
                Go to Inbox
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid gap-4">
            {opportunities.map(opportunity => {
              const isApplied = appliedOpportunities.includes(opportunity.id);
              
              return (
                <div
                  key={opportunity.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div 
                    className="p-5 space-y-3 cursor-pointer"
                    onClick={() => onViewDetails(opportunity)}
                  >
                    <div className="flex items-start justify-between">
                      <Badge className={`rounded-full ${typeColors[opportunity.type]}`}>
                        {opportunity.type}
                      </Badge>
                      {isApplied && (
                        <Badge variant="outline" className="rounded-full bg-green-50 text-green-700 border-green-200">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Applied
                        </Badge>
                      )}
                      {!isApplied && (
                        <Badge variant="outline" className="rounded-full">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(opportunity.deadline).toLocaleDateString()}
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg">{opportunity.title}</h3>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Building2 className="w-4 h-4" />
                        <p className="text-sm">{opportunity.company}</p>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <p className="text-sm">{opportunity.location}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {opportunity.skillsMatch.slice(0, 3).map(skill => (
                        <Badge key={skill} variant="secondary" className="rounded-full text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="px-5 pb-4 flex gap-2">
                    {!isApplied && (
                      <Button 
                        onClick={() => onMarkApplied(opportunity.id)}
                        className="flex-1 rounded-full"
                        size="sm"
                      >
                        Mark as Applied
                      </Button>
                    )}
                    <Button 
                      onClick={() => onRemove(opportunity.id)}
                      variant="outline"
                      className="rounded-full"
                      size="sm"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <BottomNav currentScreen="saved" onNavigate={onNavigate} />
    </div>
  );
}
