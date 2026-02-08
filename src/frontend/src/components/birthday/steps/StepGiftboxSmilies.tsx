import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { EasterEggCollectible } from '../collectibles/EasterEggCollectible';
import { Gift, Sparkles } from 'lucide-react';
import { CelebrationBurst } from '../CelebrationBurst';
import { useBirthdayFlow } from '@/hooks/useBirthdayFlow';
import { useSfx } from '@/hooks/useSfx';
import { toast } from 'sonner';

interface StepGiftboxSmiliesProps {
  onComplete: () => void;
}

export function StepGiftboxSmilies({ onComplete }: StepGiftboxSmiliesProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [showBurst, setShowBurst] = useState(false);
  const { awardAchievement, hasAchievement } = useBirthdayFlow();
  const { play } = useSfx();

  const handleOpen = () => {
    setIsOpened(true);
    setShowBurst(true);
    play('gift-open');
    
    if (!hasAchievement('gift-opener')) {
      awardAchievement('gift-opener');
      setTimeout(() => {
        toast.success('Achievement Unlocked!', {
          description: '🎁 Gift Opener - Opened the surprise gift box!'
        });
      }, 500);
    }
  };

  // Generate random positions for smilies
  const smilies = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 90 + 5,
    y: Math.random() * 90 + 5,
    rotation: Math.random() * 360,
    delay: Math.random() * 0.5,
    scale: 0.5 + Math.random() * 0.5
  }));

  return (
    <div className="w-full max-w-4xl mx-auto px-6 text-center relative">
      <EasterEggCollectible id={5} position={{ top: '25%', right: '12%' }} />
      
      <div className="space-y-8">
        {!isOpened ? (
          <>
            <div className="relative inline-block">
              <Gift className="w-20 h-20 text-celebration-accent mx-auto animate-bounce" />
              <Sparkles className="w-8 h-8 text-yellow-300 absolute -top-2 -right-2 animate-pulse" />
            </div>
            <h2 className="text-4xl font-bold text-white animate-in slide-in-from-top duration-500">
              One More Surprise!
            </h2>
            <p className="text-xl text-white/80 animate-in fade-in duration-700">
              Click the gift box to open it!
            </p>
            <button
              onClick={handleOpen}
              className="inline-block transition-all hover:scale-110 active:scale-95 duration-300 animate-in zoom-in"
              style={{ animationDuration: '1s' }}
            >
              <img
                src="/assets/generated/giftbox-closed.dim_900x700.png"
                alt="Closed Gift Box"
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl cursor-pointer hover:shadow-celebration-accent/50"
              />
            </button>
          </>
        ) : (
          <div className="animate-in fade-in zoom-in duration-500 space-y-6 relative">
            <img
              src="/assets/generated/giftbox-open.dim_900x700.png"
              alt="Open Gift Box"
              className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
            />
            
            {/* Smiley burst */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {smilies.map(smiley => (
                <div
                  key={smiley.id}
                  className="absolute animate-in fade-in zoom-in"
                  style={{
                    left: `${smiley.x}%`,
                    top: `${smiley.y}%`,
                    transform: `rotate(${smiley.rotation}deg) scale(${smiley.scale})`,
                    animationDelay: `${smiley.delay}s`,
                    animationDuration: '0.6s'
                  }}
                >
                  <img
                    src="/assets/generated/smilies-pack.dim_512x512.png"
                    alt="Smiley"
                    className="w-12 h-12 md:w-16 md:h-16"
                  />
                </div>
              ))}
            </div>
            
            {showBurst && <CelebrationBurst />}
            
            <h2 className="text-4xl font-bold text-white relative z-10 animate-in slide-in-from-bottom duration-700">
              Happiness Overload! 😊
            </h2>
            <p className="text-xl text-white/90 relative z-10">
              So many smiles for your special day!
            </p>
            <Button
              onClick={onComplete}
              size="lg"
              className="text-xl px-12 py-6 h-auto bg-celebration-accent hover:bg-celebration-accent/90 shadow-2xl relative z-10 hover:scale-105 transition-all duration-300"
            >
              One Last Thing... 💌
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
