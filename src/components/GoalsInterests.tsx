import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { X } from 'lucide-react';
import { UserProfile, OpportunityType } from '../App';

interface GoalsInterestsProps {
  profile: Partial<UserProfile>;
  onNext: (data: Partial<UserProfile>) => void;
}

const suggestedInterests = [
  'Software Engineering', 'Data Science', 'Product Management', 'UX Design',
  'Marketing', 'Finance', 'Consulting', 'Research', 'Entrepreneurship'
];

const suggestedSkills = [
  'Python', 'JavaScript', 'React', 'Machine Learning', 'Data Analysis',
  'SQL', 'Java', 'Communication', 'Leadership', 'Project Management'
];

const industries = [
  'Tech', 'Finance', 'Healthcare', 'Education', 'Non-Profit',
  'Consulting', 'Government', 'Startups', 'E-commerce', 'Media'
];

const opportunityTypes: { value: OpportunityType; label: string }[] = [
  { value: 'internship', label: 'Internships' },
  { value: 'scholarship', label: 'Scholarships' },
  { value: 'research', label: 'Research' },
  { value: 'event', label: 'Events' },
  { value: 'fellowship', label: 'Fellowships' }
];

export default function GoalsInterests({ profile, onNext }: GoalsInterestsProps) {
  const [interests, setInterests] = useState<string[]>(profile.interests || []);
  const [skills, setSkills] = useState<string[]>(profile.skills || []);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>(profile.industries || []);
  const [locations, setLocations] = useState<string[]>(profile.locations || ['Remote']);
  const [locationInput, setLocationInput] = useState('');
  const [desiredOpportunities, setDesiredOpportunities] = useState<OpportunityType[]>(
    profile.desiredOpportunities || ['internship']
  );

  const toggleItem = (item: string, list: string[], setList: (list: string[]) => void) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const toggleOpportunityType = (type: OpportunityType) => {
    if (desiredOpportunities.includes(type)) {
      setDesiredOpportunities(desiredOpportunities.filter(t => t !== type));
    } else {
      setDesiredOpportunities([...desiredOpportunities, type]);
    }
  };

  const addLocation = () => {
    if (locationInput.trim() && !locations.includes(locationInput.trim())) {
      setLocations([...locations, locationInput.trim()]);
      setLocationInput('');
    }
  };

  const removeLocation = (location: string) => {
    setLocations(locations.filter(l => l !== location));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({
      interests,
      skills,
      industries: selectedIndustries,
      locations,
      desiredOpportunities
    });
  };

  return (
    <div className="min-h-screen flex flex-col p-6 overflow-y-auto pb-24">
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1 bg-purple-500 rounded-full" />
          <div className="flex-1 h-1 bg-purple-500 rounded-full" />
          <div className="flex-1 h-1 bg-gray-200 rounded-full" />
        </div>
        <p className="text-sm text-gray-500 mt-2">Step 2 of 3</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <h2>Goals & Interests</h2>
          <p className="text-gray-600">
            Help your agent understand what you're looking for
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <Label>Career Interests</Label>
            <div className="flex flex-wrap gap-2">
              {suggestedInterests.map(interest => (
                <Badge
                  key={interest}
                  variant={interests.includes(interest) ? "default" : "outline"}
                  className="cursor-pointer rounded-full px-4 py-2"
                  onClick={() => toggleItem(interest, interests, setInterests)}
                >
                  {interest}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label>Skills</Label>
            <div className="flex flex-wrap gap-2">
              {suggestedSkills.map(skill => (
                <Badge
                  key={skill}
                  variant={skills.includes(skill) ? "default" : "outline"}
                  className="cursor-pointer rounded-full px-4 py-2"
                  onClick={() => toggleItem(skill, skills, setSkills)}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label>Preferred Industries</Label>
            <div className="flex flex-wrap gap-2">
              {industries.map(industry => (
                <Badge
                  key={industry}
                  variant={selectedIndustries.includes(industry) ? "default" : "outline"}
                  className="cursor-pointer rounded-full px-4 py-2"
                  onClick={() => toggleItem(industry, selectedIndustries, setSelectedIndustries)}
                >
                  {industry}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label>Preferred Locations</Label>
            <div className="flex gap-2">
              <Input
                type="text"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addLocation())}
                placeholder="Add location (e.g., NYC, Remote)"
                className="rounded-xl"
              />
              <Button type="button" onClick={addLocation} className="rounded-xl">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {locations.map(location => (
                <Badge
                  key={location}
                  variant="secondary"
                  className="rounded-full px-4 py-2"
                >
                  {location}
                  <X
                    className="w-3 h-3 ml-2 cursor-pointer"
                    onClick={() => removeLocation(location)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label>Desired Opportunities</Label>
            <div className="flex flex-wrap gap-2">
              {opportunityTypes.map(({ value, label }) => (
                <Badge
                  key={value}
                  variant={desiredOpportunities.includes(value) ? "default" : "outline"}
                  className="cursor-pointer rounded-full px-4 py-2"
                  onClick={() => toggleOpportunityType(value)}
                >
                  {label}
                </Badge>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full rounded-full py-6 bg-white text-indigo-700 border border-indigo-100 shadow-[0_12px_30px_rgba(99,102,241,0.18)] hover:-translate-y-0.5 transition-transform disabled:text-indigo-300"
            >
              Next
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
