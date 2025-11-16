import { useState } from 'react';
import { Button } from './ui/button';
import { Camera, Upload, RefreshCw, Loader2 } from 'lucide-react';

interface UploadPhotoProps {
  onNext: (avatar: string, photoUrl: string) => void;
}

// Service to generate AI avatar from photo
const generateAIAvatar = async (imageFile: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', imageFile);
  formData.append('prompt', 'professional avatar, cartoon style, friendly, colorful');
  
  try {
    const response = await fetch('http://localhost:3001/api/generate-avatar', {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Failed to generate avatar');
    }
    
    const data = await response.json();
    return data.avatarUrl;
  } catch (error) {
    console.error('Avatar generation error:', error);
    // Fallback: return original image if generation fails
    return URL.createObjectURL(imageFile);
  }
};

export default function UploadPhoto({ onNext }: UploadPhotoProps) {
  const [photoUrl, setPhotoUrl] = useState<string>('');
  const [originalPhoto, setOriginalPhoto] = useState<File | null>(null);
  const [avatar, setAvatar] = useState<string>('');
  const [showAvatar, setShowAvatar] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string>('');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setOriginalPhoto(file);
      const url = URL.createObjectURL(file);
      setPhotoUrl(url);
      setIsGenerating(true);
      setGenerationError('');
      
      try {
        const generatedAvatarUrl = await generateAIAvatar(file);
        setAvatar(generatedAvatarUrl);
        setShowAvatar(true);
      } catch (error) {
        console.error('Failed to generate avatar:', error);
        setGenerationError('Failed to generate avatar. Please try again.');
        setAvatar(url);
        setShowAvatar(true);
      } finally {
        setIsGenerating(false);
      }
    }
  };

  const regenerateAvatar = async () => {
    if (!originalPhoto) return;
    
    setIsGenerating(true);
    setGenerationError('');
    
    try {
      const generatedAvatarUrl = await generateAIAvatar(originalPhoto);
      setAvatar(generatedAvatarUrl);
    } catch (error) {
      console.error('Failed to regenerate avatar:', error);
      setGenerationError('Failed to regenerate avatar. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleNext = () => {
    if (avatar) {
      onNext(avatar, photoUrl);
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">
      <div className="flex-1 flex flex-col gap-8 max-w-md mx-auto py-8">
        <div className="space-y-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-indigo-500">
            Step 1 • Hero Shot
          </p>
          <h2 className="text-3xl font-bold text-gray-900">Upload Your Photo</h2>
          <p className="text-gray-600 text-base">
            We’ll generate a polished AI portrait so you can find the opportunities that you need.
          </p>
        </div>

        <div className="space-y-4">
          {isGenerating ? (
            <div className="border-2 border-indigo-200 rounded-3xl p-12 text-center bg-white/80 backdrop-blur-sm shadow-lg">
              <Loader2 className="w-16 h-16 mx-auto text-indigo-500 mb-4 animate-spin" />
              <p className="text-indigo-600 font-semibold mb-2">Crafting your AI portrait…</p>
              <p className="text-gray-500 text-sm">This usually takes 5–10 seconds.</p>
            </div>
          ) : !showAvatar ? (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-200 rounded-3xl p-12 text-center bg-white shadow-inner">
                <Upload className="w-16 h-16 mx-auto text-indigo-300 mb-4" />
                <p className="text-gray-500 mb-4">Drop an image or choose a file to begin</p>
                <label htmlFor="photo-upload">
                  <Button asChild className="rounded-full px-8 py-6 text-base">
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
              {generationError && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-center">
                  <p className="text-red-600 text-sm">{generationError}</p>
                </div>
              )}
              
              <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-3xl p-8">
                <div className="flex justify-center mb-4">
                  <div className="w-48 h-48 bg-white rounded-3xl flex items-center justify-center overflow-hidden shadow-lg">
                    <img 
                      src={avatar} 
                      alt="AI Generated Avatar" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <p className="text-center text-gray-700 font-semibold">Your AI Avatar</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  variant="outline" 
                  onClick={regenerateAvatar} 
                  className="flex-1 rounded-full"
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Regenerate
                    </>
                  )}
                </Button>
                <Button 
                  onClick={handleNext} 
                  className="flex-1 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  disabled={!avatar || isGenerating}
                >
                  Looks Good
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
