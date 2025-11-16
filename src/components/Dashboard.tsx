import { Button } from './ui/button';
import { Home, Inbox, Bookmark, Activity, User } from 'lucide-react';
import { UserProfile, Screen } from '../App';
import BottomNav from './BottomNav';

interface DashboardProps {
  profile: UserProfile;
  savedCount: number;
  onNavigate: (screen: Screen) => void;
}

export default function Dashboard({ profile, savedCount, onNavigate }: DashboardProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 p-6 pb-24 flex flex-col">
        {/* Top greeting */}
        <div className="text-center mb-8">
          <p className="text-sm text-gray-500">Welcome back,</p>
          <h3>{profile.name?.split(' ')[0]}</h3>
        </div>

        {/* Central avatar with orbiting stats */}
        <div className="flex-1 flex items-center justify-center relative min-h-[500px]">
          {/* Large central avatar */}
          <div className="relative z-10">
            <div className="w-40 h-40 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-7xl shadow-2xl relative">
              {profile.avatar}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full animate-pulse opacity-20" />
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white px-4 py-1 rounded-full shadow-md border border-gray-200 whitespace-nowrap">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <p className="text-xs text-gray-700">Agent Active</p>
              </div>
            </div>
          </div>

          {/* Orbiting stat cards */}
          {/* Top card - Opportunities Found */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4">
            <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-lg min-w-[140px]">
              <p className="text-3xl text-center">12</p>
              <p className="text-xs text-gray-600 text-center">Opportunities Found</p>
            </div>
          </div>

          {/* Right card - Inbox Count */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4">
            <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-lg min-w-[120px]">
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Inbox className="w-5 h-5 text-purple-600" />
                </div>
                <p className="text-2xl">8</p>
                <p className="text-xs text-gray-600 text-center">In Inbox</p>
              </div>
            </div>
          </div>

          {/* Bottom card - Matches Saved */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4">
            <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-lg min-w-[140px]">
              <p className="text-3xl text-center">{savedCount}</p>
              <p className="text-xs text-gray-600 text-center">Matches Saved</p>
            </div>
          </div>

          {/* Left card - Searching status */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4">
            <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl p-4 shadow-lg min-w-[120px]">
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center animate-pulse">
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                </div>
                <p className="text-xs text-gray-700 text-center">Searching</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA and tip */}
        <div className="space-y-4 mt-8">
          <Button 
            onClick={() => onNavigate('inbox')}
            className="w-full rounded-full py-6 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
          >
            Open My Inbox
          </Button>

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
            <p className="text-sm text-blue-900 text-center">
              💡 <span className="ml-1">Clear your inbox regularly to receive new opportunities</span>
            </p>
          </div>
        </div>
      </div>

      <BottomNav currentScreen="dashboard" onNavigate={onNavigate} />
    </div>
  );
}