import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { EasterEggCollectible } from '../collectibles/EasterEggCollectible';
import { Flower2, Sparkles } from 'lucide-react';
import { useBirthdayFlow } from '@/hooks/useBirthdayFlow';
import { toast } from 'sonner';

interface StepBouquetProps {
  onComplete: () => void;
}

export function StepBouquet({ onComplete }: StepBouquetProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const { awardAchievement, hasAchievement } = useBirthdayFlow();

  const handleReveal = () => {
    setIsRevealed(true);
    
    if (!hasAchievement('flower-lover')) {
      awardAchievement('flower-lover');
      setTimeout(() => {
        toast.success('Achievement Unlocked!', {
          description: '💐 Flower Lover - Revealed the beautiful bouquet!'
        });
      }, 500);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-6 text-center relative">
      <EasterEggCollectible id={3} position={{ bottom: '15%', left: '8%' }} />
      
      <div className="space-y-8">
        {!isRevealed ? (
          <>
            <div className="relative inline-block">
              <Flower2 className="w-20 h-20 text-celebration-accent mx-auto animate-pulse" />
              <Sparkles className="w-8 h-8 text-yellow-300 absolute -top-2 -right-2 animate-spin" style={{ animationDuration: '3s' }} />
            </div>
            <h2 className="text-4xl font-bold text-white animate-in slide-in-from-top duration-500">
              A Special Gift Awaits...
            </h2>
            <p className="text-xl text-white/80 animate-in fade-in duration-700">
              Tap below to reveal your beautiful bouquet!
            </p>
            <Button
              onClick={handleReveal}
              size="lg"
              className="text-xl px-12 py-6 h-auto bg-white text-celebration-primary hover:bg-white/90 shadow-2xl hover:scale-110 transition-all duration-300 animate-in zoom-in"
              style={{ animationDuration: '1s' }}
            >
              Reveal the Bouquet 💐
            </Button>
          </>
        ) : (
          <div className="animate-in fade-in zoom-in duration-700 space-y-6">
            <div className="relative inline-block">
              <img
                src="/assets/generated/bouquet-realistic.dim_900x700.png"
                alt="Beautiful Birthday Bouquet"
                className="w-full max-w-2xl mx-auto rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/10 rounded-2xl pointer-events-none" />
            </div>
            <Sparkles className="w-12 h-12 text-yellow-300 mx-auto animate-pulse" />
            <h2 className="text-4xl font-bold text-white">For You! 💐</h2>
            <p className="text-xl text-white/90">
              A beautiful bouquet to brighten your special day!
            </p>
            <Button
              onClick={onComplete}
              size="lg"
              className="text-xl px-12 py-6 h-auto bg-celebration-accent hover:bg-celebration-accent/90 shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Continue ✨
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
