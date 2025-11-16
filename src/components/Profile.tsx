import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Edit, RefreshCw, LogOut, FileText, MapPin, Briefcase } from 'lucide-react';
import { UserProfile, Screen } from '../App';
import BottomNav from './BottomNav';

interface ProfileProps {
  profile: UserProfile;
  onNavigate: (screen: Screen) => void;
  onUpdateProfile: (data: Partial<UserProfile>) => void;
}

export default function Profile({ profile, onNavigate, onUpdateProfile }: ProfileProps) {
  const avatarSource = profile.avatar || profile.photoUrl;
  const isImageAvatar =
    !!avatarSource &&
    (avatarSource.startsWith('http') ||
      avatarSource.startsWith('blob:') ||
      avatarSource.startsWith('data:'));

  const handleRegenerateAvatar = () => {
    const avatarStyles = ['😊', '🎓', '💼', '🚀', '💡', '🎯', '⭐', '🌟'];
    const randomAvatar = avatarStyles[Math.floor(Math.random() * avatarStyles.length)];
    onUpdateProfile({ avatar: randomAvatar });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="bg-gradient-to-br from-purple-500 to-blue-500 p-6 pb-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center text-5xl shadow-lg overflow-hidden border-2 border-white/40">
              {isImageAvatar ? (
                <img
                  src={avatarSource}
                  alt="Profile avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>{profile.avatar || '🙂'}</span>
              )}
            </div>
            <button
              onClick={handleRegenerateAvatar}
              className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
            >
              <RefreshCw className="w-4 h-4 text-purple-600" />
            </button>
          </div>
          <div className="text-center">
            <h2 className="text-white text-2xl">{profile.name}</h2>
            <p className="text-white/90">{profile.major}</p>
            <p className="text-white/80 text-sm">
              {profile.school} • Class of {profile.graduationYear}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 -mt-4 p-6 pb-16 space-y-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-200 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-gray-600" />
              <p className="text-gray-900">Career Interests</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.interests?.map(interest => (
              <Badge key={interest} variant="secondary" className="rounded-full">
                {interest}
              </Badge>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-200 space-y-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-gray-600" />
            <p className="text-gray-900">Skills</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.skills?.map(skill => (
              <Badge key={skill} variant="secondary" className="rounded-full">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-200 space-y-4">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-gray-600" />
            <p className="text-gray-900">Preferred Industries</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.industries?.map(industry => (
              <Badge key={industry} variant="secondary" className="rounded-full">
                {industry}
              </Badge>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-200 space-y-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-gray-600" />
            <p className="text-gray-900">Preferred Locations</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.locations?.map(location => (
              <Badge key={location} variant="secondary" className="rounded-full">
                {location}
              </Badge>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-200 space-y-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-gray-600" />
            <p className="text-gray-900">Looking For</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.desiredOpportunities?.map(type => (
              <Badge key={type} variant="secondary" className="rounded-full capitalize">
                {type}s
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-3 pt-4">
          <Button 
            variant="outline"
            className="w-full rounded-full py-6"
          >
            <Edit className="w-5 h-5 mr-2" />
            Edit Profile
          </Button>
          
          <Button 
            variant="outline"
            className="w-full rounded-full py-6"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Retrain Agent
          </Button>
          
          <Button 
            variant="outline"
            className="w-full rounded-full py-6 text-red-600 border-red-200 hover:bg-red-50"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Log Out
          </Button>
        </div>
      </div>

      <BottomNav currentScreen="profile" onNavigate={onNavigate} />
    </div>
  );
}
