import { useState } from 'react';
import Welcome from './components/Welcome';
import UploadPhoto from './components/UploadPhoto';
import BasicInfo from './components/BasicInfo';
import GoalsInterests from './components/GoalsInterests';
import ProfileSummary from './components/ProfileSummary';
import AgentActivation from './components/AgentActivation';
import Dashboard from './components/Dashboard';
import Inbox from './components/Inbox';
import Saved from './components/Saved';
import Activity from './components/Activity';
import Profile from './components/Profile';
import OpportunityDetails from './components/OpportunityDetails';

export type OpportunityType = 'internship' | 'scholarship' | 'research' | 'event' | 'fellowship';

export interface Opportunity {
  id: string;
  title: string;
  company: string;
  type: OpportunityType;
  description: string;
  deadline: string;
  relevanceExplanation: string;
  skillsMatch: string[];
  location: string;
  link: string;
}

export interface UserProfile {
  name: string;
  major: string;
  graduationYear: string;
  school: string;
  resume?: File;
  interests: string[];
  skills: string[];
  industries: string[];
  locations: string[];
  desiredOpportunities: OpportunityType[];
  avatar?: string;
  photoUrl?: string;
}

export type Screen = 
  | 'welcome' 
  | 'upload-photo' 
  | 'basic-info' 
  | 'goals-interests' 
  | 'profile-summary' 
  | 'agent-activation' 
  | 'dashboard'
  | 'inbox'
  | 'saved'
  | 'activity'
  | 'profile'
  | 'opportunity-details';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [userProfile, setUserProfile] = useState<Partial<UserProfile>>({});
  const [savedOpportunities, setSavedOpportunities] = useState<Opportunity[]>([]);
  const [appliedOpportunities, setAppliedOpportunities] = useState<string[]>([]);
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...data }));
  };

  const saveOpportunity = (opportunity: Opportunity) => {
    setSavedOpportunities(prev => [...prev, opportunity]);
  };

  const removeSavedOpportunity = (opportunityId: string) => {
    setSavedOpportunities(prev => prev.filter(o => o.id !== opportunityId));
  };

  const markAsApplied = (opportunityId: string) => {
    setAppliedOpportunities(prev => [...prev, opportunityId]);
  };

  const viewOpportunityDetails = (opportunity: Opportunity) => {
    setSelectedOpportunity(opportunity);
    navigateTo('opportunity-details');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <Welcome onNext={() => navigateTo('upload-photo')} />;
      case 'upload-photo':
        return <UploadPhoto 
          onNext={(avatar, photoUrl) => {
            updateProfile({ avatar, photoUrl });
            navigateTo('basic-info');
          }} 
        />;
      case 'basic-info':
        return <BasicInfo 
          profile={userProfile}
          onNext={(data) => {
            updateProfile(data);
            navigateTo('goals-interests');
          }} 
        />;
      case 'goals-interests':
        return <GoalsInterests 
          profile={userProfile}
          onNext={(data) => {
            updateProfile(data);
            navigateTo('profile-summary');
          }} 
        />;
      case 'profile-summary':
        return <ProfileSummary 
          profile={userProfile as UserProfile}
          onActivate={() => navigateTo('agent-activation')} 
        />;
      case 'agent-activation':
        return <AgentActivation 
          onComplete={() => navigateTo('dashboard')} 
        />;
      case 'dashboard':
        return <Dashboard 
          profile={userProfile as UserProfile}
          savedCount={savedOpportunities.length}
          onNavigate={navigateTo}
        />;
      case 'inbox':
        return <Inbox 
          onSave={saveOpportunity}
          onNavigate={navigateTo}
          onViewDetails={viewOpportunityDetails}
        />;
      case 'saved':
        return <Saved 
          opportunities={savedOpportunities}
          appliedOpportunities={appliedOpportunities}
          onNavigate={navigateTo}
          onViewDetails={viewOpportunityDetails}
          onMarkApplied={markAsApplied}
          onRemove={removeSavedOpportunity}
        />;
      case 'activity':
        return <Activity onNavigate={navigateTo} />;
      case 'profile':
        return <Profile 
          profile={userProfile as UserProfile}
          onNavigate={navigateTo}
          onUpdateProfile={updateProfile}
        />;
      case 'opportunity-details':
        return <OpportunityDetails 
          opportunity={selectedOpportunity!}
          isSaved={savedOpportunities.some(o => o.id === selectedOpportunity?.id)}
          isApplied={appliedOpportunities.includes(selectedOpportunity?.id || '')}
          onSave={() => selectedOpportunity && saveOpportunity(selectedOpportunity)}
          onRemove={() => selectedOpportunity && removeSavedOpportunity(selectedOpportunity.id)}
          onMarkApplied={() => selectedOpportunity && markAsApplied(selectedOpportunity.id)}
          onBack={() => navigateTo('inbox')}
        />;
      default:
        return <Welcome onNext={() => navigateTo('upload-photo')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50">
      <div className="max-w-md mx-auto min-h-screen bg-white shadow-2xl relative">
        {renderScreen()}
      </div>
    </div>
  );
}
