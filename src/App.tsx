import React, { useState } from 'react';
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
    <div className="min-h-screen bg-gradient-to-br from-[#e8f0ff] via-[#f3e6ff] to-[#dff8ff] py-4">
      <div className="max-w-md mx-auto min-h-[calc(100vh-32px)] relative overflow-hidden rounded-[36px] border border-white/40 shadow-[0_35px_120px_rgba(96,95,205,0.25)] bg-gradient-to-b from-white/85 via-white/70 to-white/60 backdrop-blur-2xl flex flex-col">
        <div className="absolute -top-24 -right-32 w-72 h-72 bg-[#c4b5fd]/40 blur-[140px]" aria-hidden="true" />
        <div className="absolute -bottom-32 -left-24 w-80 h-80 bg-[#fddde6]/50 blur-[160px]" aria-hidden="true" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.12),_transparent_55%)]" aria-hidden="true" />
        <div className="relative z-10">
          {renderScreen()}
        </div>
      </div>
    </div>
  );
}
