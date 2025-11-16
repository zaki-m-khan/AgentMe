import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Upload } from 'lucide-react';
import { UserProfile } from '../App';

interface BasicInfoProps {
  profile: Partial<UserProfile>;
  onNext: (data: Partial<UserProfile>) => void;
}

export default function BasicInfo({ profile, onNext }: BasicInfoProps) {
  const [name, setName] = useState(profile.name || '');
  const [major, setMajor] = useState(profile.major || '');
  const [graduationYear, setGraduationYear] = useState(profile.graduationYear || '');
  const [school, setSchool] = useState(profile.school || '');
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({
      name,
      major,
      graduationYear,
      school,
      resume: resumeFile || undefined
    });
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFile(file);
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-6">
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1 bg-purple-500 rounded-full" />
          <div className="flex-1 h-1 bg-gray-200 rounded-full" />
          <div className="flex-1 h-1 bg-gray-200 rounded-full" />
        </div>
        <p className="text-sm text-gray-500 mt-2">Step 1 of 3</p>
      </div>

      <div className="flex-1">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2>Basic Information</h2>
            <p className="text-gray-600">
              Tell us about yourself
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                required
                className="rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="major">Major</Label>
              <Input
                id="major"
                type="text"
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                placeholder="Computer Science"
                required
                className="rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="graduation">Graduation Year</Label>
              <Input
                id="graduation"
                type="text"
                value={graduationYear}
                onChange={(e) => setGraduationYear(e.target.value)}
                placeholder="2026"
                required
                className="rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="school">School</Label>
              <Input
                id="school"
                type="text"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                placeholder="University Name"
                required
                className="rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="resume">Resume (Optional)</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-4">
                <label htmlFor="resume" className="cursor-pointer flex items-center justify-center gap-2 text-gray-600">
                  <Upload className="w-5 h-5" />
                  <span>{resumeFile ? resumeFile.name : 'Upload Resume (PDF)'}</span>
                </label>
                <input
                  id="resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeUpload}
                  className="hidden"
                />
              </div>
            </div>

            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full rounded-full py-6"
              >
                Next
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
