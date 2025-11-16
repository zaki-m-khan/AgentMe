import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { UserProfile } from '../App';

interface ProfileSummaryProps {
  profile: UserProfile;
  onActivate: () => void;
}

export default function ProfileSummary({ profile, onActivate }: ProfileSummaryProps) {
  return (
    <div className="min-h-screen flex flex-col p-6">
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1 bg-purple-500 rounded-full" />
          <div className="flex-1 h-1 bg-purple-500 rounded-full" />
          <div className="flex-1 h-1 bg-purple-500 rounded-full" />
        </div>
        <p className="text-sm text-gray-500 mt-2">Step 3 of 3</p>
      </div>

      <div className="flex-1 space-y-6">
        <div className="space-y-2 text-center">
          <h2>Your AgentMe Profile</h2>
          <p className="text-gray-600">
            Review your profile before activation
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-3xl p-6 space-y-4">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-5xl shadow-lg mb-3">
              {profile.avatar}
            </div>
            <h3>{profile.name}</h3>
            <p className="text-gray-600">{profile.major}</p>
            <p className="text-sm text-gray-500">
              {profile.school} • Class of {profile.graduationYear}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-4 space-y-2">
            <p className="text-sm text-gray-500">Interests</p>
            <div className="flex flex-wrap gap-2">
              {profile.interests?.slice(0, 5).map(interest => (
                <Badge key={interest} variant="secondary" className="rounded-full">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-4 space-y-2">
            <p className="text-sm text-gray-500">Skills</p>
            <div className="flex flex-wrap gap-2">
              {profile.skills?.slice(0, 5).map(skill => (
                <Badge key={skill} variant="secondary" className="rounded-full">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-4 space-y-2">
            <p className="text-sm text-gray-500">Preferred Industries</p>
            <div className="flex flex-wrap gap-2">
              {profile.industries?.map(industry => (
                <Badge key={industry} variant="secondary" className="rounded-full">
                  {industry}
                </Badge>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-4 space-y-2">
            <p className="text-sm text-gray-500">Locations</p>
            <div className="flex flex-wrap gap-2">
              {profile.locations?.map(location => (
                <Badge key={location} variant="secondary" className="rounded-full">
                  {location}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="pt-6">
        <Button 
          onClick={onActivate}
          className="w-full rounded-full py-6 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
        >
          Activate My Agent
        </Button>
      </div>
    </div>
  );
}
