import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Heart, RotateCcw, X, Download, Trophy } from 'lucide-react';
import { useBirthdayFlow } from '@/hooks/useBirthdayFlow';
import { ACHIEVEMENTS, getAchievement } from '@/features/achievements/achievements';

interface BirthdayNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRestart: () => void;
}

const MAX_MESSAGE_LENGTH = 500;

export function BirthdayNoteModal({ isOpen, onClose, onRestart }: BirthdayNoteModalProps) {
  const [showNote, setShowNote] = useState(false);
  const { 
    getAllCollectiblesFound, 
    getAchievements, 
    memoryCapsule, 
    setMemoryCapsule 
  } = useBirthdayFlow();
  
  const allCollectiblesFound = getAllCollectiblesFound();
  const earnedAchievements = getAchievements();

  useEffect(() => {
    if (isOpen) {
      // Delay showing the note for the animation
      setTimeout(() => setShowNote(true), 800);
    } else {
      setShowNote(false);
    }
  }, [isOpen]);

  const handleDownloadMessage = () => {
    if (!memoryCapsule.trim()) return;
    
    const blob = new Blob([memoryCapsule], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'birthday-memory-capsule.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-transparent border-none shadow-none p-0">
        <div className="relative">
          {/* Gift box with note emerging animation */}
          <div className={`transition-all duration-1000 ${showNote ? 'opacity-0 scale-75' : 'opacity-100 scale-100'}`}>
            <img
              src="/assets/generated/giftbox-note-out.dim_900x700.png"
              alt="Gift box with note"
              className="w-full max-w-2xl mx-auto"
            />
          </div>

          {/* Handwritten note */}
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${showNote ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
            <div 
              className="relative w-full max-w-3xl mx-4 p-8 md:p-12 rounded-lg shadow-2xl overflow-y-auto max-h-[85vh]"
              style={{
                backgroundImage: 'url(/assets/generated/paper-note-texture.dim_1400x900.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transform: 'rotate(-1deg)'
              }}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all hover:scale-110"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

              {/* Handwritten content */}
              <div className="space-y-6 handwritten-note">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Heart className="w-8 h-8 text-red-500 fill-red-500 animate-pulse" />
                  <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800">
                    Happy Birthday!
                  </h2>
                  <Heart className="w-8 h-8 text-red-500 fill-red-500 animate-pulse" />
                </div>

                <div className="space-y-4 text-lg md:text-xl text-gray-700 leading-relaxed">
                  <p className="italic">
                    On this special day, I want you to know how truly wonderful you are...
                  </p>
                  
                  <p>
                    Your presence brings joy and light to everyone around you. The way you smile, 
                    the kindness in your heart, and the warmth of your spirit make the world a 
                    better place.
                  </p>
                  
                  <p>
                    May this year bring you countless moments of happiness, dreams that come true, 
                    and adventures that fill your heart with wonder. You deserve all the beautiful 
                    things life has to offer.
                  </p>
                  
                  <p>
                    Remember that you are loved, you are cherished, and you are celebrated not just 
                    today, but every single day. Your journey is unique and precious, and I'm so 
                    grateful to be a part of it.
                  </p>
                  
                  <p className="font-semibold text-center mt-8 text-2xl">
                    Here's to you and all the magic you bring to this world! 🎉✨
                  </p>
                </div>

                {/* Secret Collectibles Section */}
                {allCollectiblesFound && (
                  <div className="mt-8 p-6 bg-yellow-50/80 rounded-lg border-2 border-yellow-400 animate-in fade-in zoom-in duration-500">
                    <div className="flex items-center gap-2 mb-3">
                      <Trophy className="w-6 h-6 text-yellow-600" />
                      <h3 className="text-2xl font-bold text-yellow-800">Secret Unlocked!</h3>
                    </div>
                    <p className="text-lg text-yellow-900">
                      Wow! You found all the hidden collectibles! You have a keen eye and an 
                      adventurous spirit. This birthday experience was made even more special 
                      by your curiosity and attention to detail. Keep exploring and discovering 
                      the magic in every moment! ⭐✨
                    </p>
                  </div>
                )}

                {/* Achievements Section */}
                {earnedAchievements.length > 0 && (
                  <div className="mt-8 p-6 bg-purple-50/80 rounded-lg border-2 border-purple-400">
                    <h3 className="text-2xl font-bold text-purple-800 mb-4 flex items-center gap-2">
                      <Trophy className="w-6 h-6" />
                      Your Achievements
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {earnedAchievements.map(id => {
                        const achievement = getAchievement(id);
                        if (!achievement) return null;
                        return (
                          <div key={id} className="flex items-start gap-3 p-3 bg-white/60 rounded-lg">
                            <span className="text-3xl">{achievement.icon}</span>
                            <div>
                              <h4 className="font-bold text-purple-900">{achievement.name}</h4>
                              <p className="text-sm text-purple-700">{achievement.description}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Memory Capsule Section */}
                <div className="mt-8 p-6 bg-blue-50/80 rounded-lg border-2 border-blue-400">
                  <h3 className="text-2xl font-bold text-blue-800 mb-3">Memory Capsule 💭</h3>
                  <p className="text-base text-blue-700 mb-4">
                    Capture this moment with a personal message. Your words will be saved and you can download them!
                  </p>
                  
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="memory-message" className="text-blue-900 font-semibold">
                        Your Birthday Message
                      </Label>
                      <Textarea
                        id="memory-message"
                        value={memoryCapsule}
                        onChange={(e) => {
                          if (e.target.value.length <= MAX_MESSAGE_LENGTH) {
                            setMemoryCapsule(e.target.value);
                          }
                        }}
                        placeholder="Write your thoughts, wishes, or memories from this special day..."
                        className="mt-2 min-h-[120px] bg-white/80 border-blue-300 focus:border-blue-500"
                        maxLength={MAX_MESSAGE_LENGTH}
                      />
                      <p className="text-sm text-blue-600 mt-1">
                        {memoryCapsule.length} / {MAX_MESSAGE_LENGTH} characters
                      </p>
                    </div>
                    
                    {memoryCapsule.trim() && (
                      <div className="p-4 bg-white/60 rounded border border-blue-300">
                        <p className="text-base text-gray-800 whitespace-pre-wrap">
                          {memoryCapsule}
                        </p>
                      </div>
                    )}
                    
                    <Button
                      onClick={handleDownloadMessage}
                      disabled={!memoryCapsule.trim()}
                      variant="outline"
                      className="w-full bg-blue-100 hover:bg-blue-200 border-blue-400 text-blue-900"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Memory Capsule
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 pt-6 border-t-2 border-gray-300/50">
                  <Button
                    onClick={onClose}
                    variant="outline"
                    size="lg"
                    className="text-lg px-8 py-6 h-auto bg-white/80 hover:bg-white border-2 border-gray-400"
                  >
                    Close
                  </Button>
                  <Button
                    onClick={onRestart}
                    size="lg"
                    className="text-lg px-8 py-6 h-auto bg-celebration-accent hover:bg-celebration-accent/90 gap-2"
                  >
                    <RotateCcw className="w-5 h-5" />
                    Start Over
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
