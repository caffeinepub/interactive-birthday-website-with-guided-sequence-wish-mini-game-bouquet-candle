import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { EasterEggCollectible } from '../collectibles/EasterEggCollectible';
import { Flame, Sparkles } from 'lucide-react';
import { useBirthdayFlow } from '@/hooks/useBirthdayFlow';
import { useSfx } from '@/hooks/useSfx';
import { toast } from 'sonner';

interface StepCakeCandlesProps {
  onComplete: () => void;
}

const MAX_CANDLES = 30;

export function StepCakeCandles({ onComplete }: StepCakeCandlesProps) {
  const { age, awardAchievement, hasAchievement } = useBirthdayFlow();
  const { play } = useSfx();
  const candleCount = Math.min(age || 7, MAX_CANDLES);
  const [candles, setCandles] = useState<boolean[]>(Array(candleCount).fill(true));
  const [allOff, setAllOff] = useState(false);
  const [showBurst, setShowBurst] = useState(false);

  useEffect(() => {
    if (candles.every(c => !c) && !allOff) {
      setAllOff(true);
      setShowBurst(true);
      
      if (!hasAchievement('wish-maker')) {
        awardAchievement('wish-maker');
        setTimeout(() => {
          toast.success('Achievement Unlocked!', {
            description: '🕯️ Wish Maker - Blew out all the birthday candles!'
          });
        }, 500);
      }
    }
  }, [candles, allOff, awardAchievement, hasAchievement]);

  const toggleCandle = (index: number) => {
    if (!candles[index]) return;
    
    play('candle-out');
    setCandles(prev => {
      const updated = [...prev];
      updated[index] = false;
      return updated;
    });
  };

  const litCount = candles.filter(c => c).length;

  // Arrange candles in rows for better layout
  const candlesPerRow = Math.min(10, Math.ceil(Math.sqrt(candleCount) * 1.5));
  const rows: boolean[][] = [];
  for (let i = 0; i < candles.length; i += candlesPerRow) {
    rows.push(candles.slice(i, i + candlesPerRow));
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-6 text-center relative">
      <EasterEggCollectible id={4} position={{ top: '20%', left: '10%' }} />
      
      <div className="space-y-8">
        <h2 className="text-4xl font-bold text-white animate-in slide-in-from-top duration-500">
          {allOff ? '🎂 Make a Wish! 🎂' : 'Blow Out the Candles!'}
        </h2>
        
        {!allOff && (
          <p className="text-xl text-white/80 animate-in fade-in duration-700">
            Tap each candle to blow it out! ({litCount} {litCount === 1 ? 'candle' : 'candles'} still lit)
          </p>
        )}
        
        {candleCount === MAX_CANDLES && age && age > MAX_CANDLES && (
          <p className="text-sm text-white/70 italic">
            (Showing {MAX_CANDLES} candles for the best experience!)
          </p>
        )}
        
        <div className="relative inline-block">
          <img
            src="/assets/generated/cake-with-candles.dim_1200x800.png"
            alt="Birthday Cake"
            className="w-full max-w-3xl mx-auto rounded-2xl shadow-2xl"
          />
          
          {/* Interactive candles overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-start pt-4 md:pt-8 gap-2 md:gap-3">
            {rows.map((row, rowIndex) => (
              <div key={rowIndex} className="flex gap-2 md:gap-4">
                {row.map((isLit, colIndex) => {
                  const index = rowIndex * candlesPerRow + colIndex;
                  return (
                    <button
                      key={index}
                      onClick={() => toggleCandle(index)}
                      disabled={!isLit}
                      className={`
                        transition-all duration-300 hover:scale-125 relative
                        ${isLit ? 'cursor-pointer' : 'cursor-default opacity-20'}
                      `}
                    >
                      {isLit ? (
                        <>
                          <Flame className="w-6 h-6 md:w-8 md:h-8 text-orange-500 animate-pulse drop-shadow-lg" />
                          <div className="absolute inset-0 bg-orange-400/30 rounded-full blur-md animate-pulse" />
                        </>
                      ) : (
                        <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-400/50" />
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        
        {allOff && (
          <div className="animate-in fade-in zoom-in duration-500 space-y-4">
            {showBurst && <Sparkles className="w-16 h-16 text-yellow-300 mx-auto animate-spin" style={{ animationDuration: '2s' }} />}
            <p className="text-2xl text-white font-semibold">
              Perfect! All candles are out! 🌟
            </p>
            <p className="text-lg text-white/80">
              May all your wishes come true!
            </p>
            <Button
              onClick={onComplete}
              size="lg"
              className="text-xl px-12 py-6 h-auto bg-celebration-accent hover:bg-celebration-accent/90 shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Open Your Gift 🎁
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
