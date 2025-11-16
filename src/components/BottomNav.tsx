import { Home, Inbox, Bookmark, Activity, User } from 'lucide-react';
import { Screen } from '../App';

interface BottomNavProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export default function BottomNav({ currentScreen, onNavigate }: BottomNavProps) {
  const navItems = [
    { screen: 'dashboard' as Screen, icon: Home, label: 'Home' },
    { screen: 'inbox' as Screen, icon: Inbox, label: 'Inbox' },
    { screen: 'saved' as Screen, icon: Bookmark, label: 'Saved' },
    { screen: 'activity' as Screen, icon: Activity, label: 'Activity' },
    { screen: 'profile' as Screen, icon: User, label: 'Profile' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-md mx-auto flex items-center justify-around py-3 px-4">
        {navItems.map(({ screen, icon: Icon, label }) => (
          <button
            key={screen}
            onClick={() => onNavigate(screen)}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-colors ${
              currentScreen === screen
                ? 'text-purple-600'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Icon className="w-6 h-6" />
            <span className="text-xs">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
