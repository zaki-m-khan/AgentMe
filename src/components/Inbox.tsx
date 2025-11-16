import { useState, useEffect } from 'react';
import { Badge } from './ui/badge';
import { ChevronLeft, X, Heart, Calendar, MapPin, Building2 } from 'lucide-react';
import { Opportunity, OpportunityType, Screen } from '../App';
import BottomNav from './BottomNav';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';

interface InboxProps {
  onSave: (opportunity: Opportunity) => void;
  onNavigate: (screen: Screen) => void;
  onViewDetails: (opportunity: Opportunity) => void;
}

const mockOpportunities: Opportunity[] = [
  {
    id: '1',
    title: 'Software Engineering Intern',
    company: 'TechCorp',
    type: 'internship',
    description: 'Join our team to work on cutting-edge AI projects.',
    deadline: '2026-02-15',
    relevanceExplanation: 'Matches your CS major and Python skills',
    skillsMatch: ['Python', 'React', 'Machine Learning'],
    location: 'Remote',
    link: 'https://example.com/apply'
  },
  {
    id: '2',
    title: 'STEM Scholarship Program',
    company: 'National Science Foundation',
    type: 'scholarship',
    description: '$10,000 scholarship for CS students with research interests.',
    deadline: '2026-03-01',
    relevanceExplanation: 'Perfect match for your major and research interests',
    skillsMatch: ['Research', 'Computer Science'],
    location: 'N/A',
    link: 'https://example.com/apply'
  },
  {
    id: '3',
    title: 'ML Research Assistant',
    company: 'University AI Lab',
    type: 'research',
    description: 'Work with professors on machine learning research.',
    deadline: '2026-02-28',
    relevanceExplanation: 'Aligns with your ML skills and research goals',
    skillsMatch: ['Machine Learning', 'Python', 'Data Analysis'],
    location: 'On-campus',
    link: 'https://example.com/apply'
  },
  {
    id: '4',
    title: 'Product Manager Intern',
    company: 'StartupXYZ',
    type: 'internship',
    description: 'Shape product strategy for a fast-growing startup.',
    deadline: '2026-03-15',
    relevanceExplanation: 'Matches your product management interest',
    skillsMatch: ['Product Management', 'Leadership'],
    location: 'NYC',
    link: 'https://example.com/apply'
  }
];

const typeColors: Record<OpportunityType, string> = {
  internship: 'bg-blue-100 text-blue-700',
  scholarship: 'bg-green-100 text-green-700',
  research: 'bg-purple-100 text-purple-700',
  event: 'bg-orange-100 text-orange-700',
  fellowship: 'bg-pink-100 text-pink-700'
};

interface SwipeCardProps {
  opportunity: Opportunity;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onViewDetails: (opportunity: Opportunity) => void;
}

const SwipeableOpportunityCard = ({
  opportunity,
  onSwipeLeft,
  onSwipeRight,
  onViewDetails,
}: SwipeCardProps) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-15, 0, 15]);
  const likeOpacity = useTransform(x, [60, 160], [0, 1]);
  const nopeOpacity = useTransform(x, [-160, -60], [1, 0]);

  useEffect(() => {
    x.set(0);
  }, [opportunity.id, x]);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 140) {
      onSwipeRight();
    } else if (info.offset.x < -140) {
      onSwipeLeft();
    }
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      onTap={() => onViewDetails(opportunity)}
      style={{ x, rotate }}
      className="relative bg-white rounded-3xl shadow-xl w-full max-w-sm p-6 space-y-4 cursor-grab active:cursor-grabbing touch-none"
    >
      <motion.div
        className="pointer-events-none absolute top-6 right-6 px-3 py-1 rounded-full bg-emerald-500/90 text-white text-[11px] font-semibold tracking-widest uppercase"
        style={{ opacity: likeOpacity }}
      >
        Save
      </motion.div>
      <motion.div
        className="pointer-events-none absolute top-6 left-6 px-3 py-1 rounded-full bg-rose-500/90 text-white text-[11px] font-semibold tracking-widest uppercase"
        style={{ opacity: nopeOpacity }}
      >
        Pass
      </motion.div>

      <div className="flex items-start justify-between">
        <Badge className={`rounded-full ${typeColors[opportunity.type]}`}>
          {opportunity.type}
        </Badge>
        <Badge variant="outline" className="rounded-full">
          <Calendar className="w-3 h-3 mr-1" />
          {new Date(opportunity.deadline).toLocaleDateString()}
        </Badge>
      </div>

      <div className="space-y-2">
        <h3>{opportunity.title}</h3>
        <div className="flex items-center gap-2 text-gray-600">
          <Building2 className="w-4 h-4" />
          <p>{opportunity.company}</p>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="w-4 h-4" />
          <p className="text-sm">{opportunity.location}</p>
        </div>
      </div>

      <div className="bg-purple-50 rounded-2xl p-4 space-y-2">
        <p className="text-sm text-purple-900">
          <span>💡 Why this matches:</span>
        </p>
        <p className="text-sm text-gray-700">{opportunity.relevanceExplanation}</p>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-gray-600">Skills Match:</p>
        <div className="flex flex-wrap gap-2">
          {opportunity.skillsMatch.map((skill) => (
            <Badge key={skill} variant="secondary" className="rounded-full">
              {skill}
            </Badge>
          ))}
        </div>
      </div>

      <p className="text-sm text-gray-500 text-center pt-2">Tap for full details</p>
    </motion.div>
  );
};

export default function Inbox({ onSave, onNavigate, onViewDetails }: InboxProps) {
  const [opportunities, setOpportunities] = useState<Opportunity[]>(mockOpportunities);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filter, setFilter] = useState<OpportunityType | 'all'>('all');

  const filteredOpportunities = filter === 'all' 
    ? opportunities 
    : opportunities.filter(o => o.type === filter);
  const currentOpportunity = filteredOpportunities[currentIndex];
  const maxInbox = 10;

  const handleFilterChange = (value: OpportunityType | 'all') => {
    setFilter(value);
    setCurrentIndex(0);
  };

  const advanceCard = () => {
    setCurrentIndex((prev) =>
      prev < filteredOpportunities.length - 1 ? prev + 1 : filteredOpportunities.length
    );
  };

  const handleSwipeLeft = () => {
    advanceCard();
  };

  const handleSwipeRight = () => {
    if (currentOpportunity) {
      onSave(currentOpportunity);
    }
    advanceCard();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="bg-white border-b border-gray-200 p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2>Opportunity Inbox</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">
              {opportunities.length}/{maxInbox}
            </span>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          <Badge
            variant={filter === 'all' ? 'default' : 'outline'}
            className="cursor-pointer rounded-full whitespace-nowrap"
            onClick={() => handleFilterChange('all')}
          >
            All
          </Badge>
          <Badge
            variant={filter === 'internship' ? 'default' : 'outline'}
            className="cursor-pointer rounded-full whitespace-nowrap"
            onClick={() => handleFilterChange('internship')}
          >
            Internships
          </Badge>
          <Badge
            variant={filter === 'scholarship' ? 'default' : 'outline'}
            className="cursor-pointer rounded-full whitespace-nowrap"
            onClick={() => handleFilterChange('scholarship')}
          >
            Scholarships
          </Badge>
          <Badge
            variant={filter === 'research' ? 'default' : 'outline'}
            className="cursor-pointer rounded-full whitespace-nowrap"
            onClick={() => handleFilterChange('research')}
          >
            Research
          </Badge>
        </div>
      </div>

      <div className="flex-1 flex flex-col p-6 pb-24">
        {currentOpportunity && currentIndex < filteredOpportunities.length ? (
          <div className="flex-1 flex flex-col">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3 mb-4">
              <p className="text-sm text-blue-900 text-center">
                ⬅️ Swipe left to skip • Swipe right to save ➡️
              </p>
            </div>

            <div className="flex-1 flex items-center justify-center">
              <SwipeableOpportunityCard
                opportunity={currentOpportunity}
                onSwipeLeft={handleSwipeLeft}
                onSwipeRight={handleSwipeRight}
                onViewDetails={onViewDetails}
              />
            </div>

            <div className="flex items-center justify-center gap-6 pt-6">
              <button
                onClick={handleSwipeLeft}
                className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors shadow-lg"
              >
                <X className="w-8 h-8 text-gray-600" />
              </button>
              <button
                onClick={handleSwipeRight}
                className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center hover:from-purple-600 hover:to-pink-600 transition-colors shadow-lg"
              >
                <Heart className="w-8 h-8 text-white" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                <Inbox className="w-12 h-12 text-gray-400" />
              </div>
              <h3>All caught up!</h3>
              <p className="text-gray-600 max-w-xs mx-auto">
                Your agent is finding more opportunities. Check back soon!
              </p>
            </div>
          </div>
        )}
      </div>

      <BottomNav currentScreen="inbox" onNavigate={onNavigate} />
    </div>
  );
}
