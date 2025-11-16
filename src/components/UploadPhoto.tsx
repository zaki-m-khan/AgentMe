import { useState } from 'react';
import { Button } from './ui/button';
import { Camera, Upload, RefreshCw } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface UploadPhotoProps {
  onNext: (avatar: string, photoUrl: string) => void;
}

const avatarStyles = [
  '😊', '🎓', '💼', '🚀', '💡', '🎯', '⭐', '🌟'
];

export default function UploadPhoto({ onNext }: UploadPhotoProps) {
  const [photoUrl, setPhotoUrl] = useState<string>('');
  const [avatar, setAvatar] = useState<string>('');
  const [showAvatar, setShowAvatar] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoUrl(url);
      // Simulate avatar generation
      const randomAvatar = avatarStyles[Math.floor(Math.random() * avatarStyles.length)];
      setAvatar(randomAvatar);
      setShowAvatar(true);
    }
  };

  const regenerateAvatar = () => {
    const randomAvatar = avatarStyles[Math.floor(Math.random() * avatarStyles.length)];
    setAvatar(randomAvatar);
  };

  const handleNext = () => {
    if (avatar) {
      onNext(avatar, photoUrl);
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-6">
      <div className="flex-1 flex flex-col justify-center">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2>Upload Your Photo</h2>
            <p className="text-gray-600">
              We'll create your AI avatar from your photo
            </p>
          </div>

          <div className="space-y-4">
            {!showAvatar ? (
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-3xl p-12 text-center">
                  <Upload className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500 mb-4">
                    Upload a photo of yourself
                  </p>
                  <label htmlFor="photo-upload">
                    <Button asChild className="rounded-full">
                      <span>
                        <Camera className="w-4 h-4 mr-2" />
                        Choose Photo
                      </span>
                    </Button>
                  </label>
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-3xl p-8">
                  <div className="flex justify-center mb-4">
                    <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center text-6xl shadow-lg">
                      {avatar}
                    </div>
                  </div>
                  <p className="text-center text-gray-700">
                    Your AI Avatar
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    onClick={regenerateAvatar}
                    className="flex-1 rounded-full"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Regenerate
                  </Button>
                  <Button 
                    onClick={handleNext}
                    className="flex-1 rounded-full"
                  >
                    Looks Good
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
