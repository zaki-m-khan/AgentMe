import { Search, Filter, Target, CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import { Screen } from '../App';
import BottomNav from './BottomNav';

interface ActivityProps {
  onNavigate: (screen: Screen) => void;
}

interface ActivityItem {
  id: string;
  icon: any;
  action: string;
  timestamp: string;
  details?: string;
}

const activityLog: ActivityItem[] = [
  {
    id: '1',
    icon: Target,
    action: 'Found 3 strong matches',
    timestamp: '2 minutes ago',
    details: 'Based on your CS major and ML skills'
  },
  {
    id: '2',
    icon: Filter,
    action: 'Filtered 47 opportunities',
    timestamp: '5 minutes ago',
    details: 'Removed unrelated roles and expired deadlines'
  },
  {
    id: '3',
    icon: Search,
    action: 'Scanning scholarship databases',
    timestamp: '12 minutes ago',
    details: 'Checking NSF, Gates Foundation, and 12 other sources'
  },
  {
    id: '4',
    icon: CheckCircle2,
    action: 'Identified 8 new internships',
    timestamp: '25 minutes ago',
    details: 'In Tech, Finance, and Consulting industries'
  },
  {
    id: '5',
    icon: XCircle,
    action: 'Eliminated 14 unrelated roles',
    timestamp: '32 minutes ago',
    details: 'Outside preferred locations and industries'
  },
  {
    id: '6',
    icon: Search,
    action: 'Scanning research opportunity boards',
    timestamp: '1 hour ago',
    details: 'University labs and research institutes'
  },
  {
    id: '7',
    icon: Target,
    action: 'Updated matching algorithm',
    timestamp: '2 hours ago',
    details: 'Learning from your saved preferences'
  },
  {
    id: '8',
    icon: Sparkles,
    action: 'Daily scan completed',
    timestamp: '3 hours ago',
    details: 'Processed 142 new opportunities across all sources'
  }
];

export default function Activity({ onNavigate }: ActivityProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="space-y-2">
          <h2>Agent Activity</h2>
          <p className="text-sm text-gray-600">
            See what your AI agent is doing behind the scenes
          </p>
        </div>
      </div>

      <div className="flex-1 p-6 pb-24 space-y-6">
        <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center animate-pulse">
              <div className="w-3 h-3 bg-purple-500 rounded-full" />
            </div>
            <div className="flex-1">
              <p className="text-purple-900">Agent Status: Active</p>
              <p className="text-sm text-purple-700">Currently searching for new opportunities</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-gray-500">Recent Activity</p>
          
          <div className="space-y-3">
            {activityLog.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-4 border border-gray-200 space-y-2"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-900">{item.action}</p>
                      {item.details && (
                        <p className="text-sm text-gray-600 mt-1">{item.details}</p>
                      )}
                      <p className="text-xs text-gray-400 mt-2">{item.timestamp}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
          <p className="text-sm text-blue-900">
            💡 <span className="ml-1">Your agent runs 24/7, continuously finding opportunities that match your profile</span>
          </p>
        </div>
      </div>

      <BottomNav currentScreen="activity" onNavigate={onNavigate} />
    </div>
  );
}
