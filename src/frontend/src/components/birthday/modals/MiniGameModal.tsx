import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { useBirthdayFlow } from '@/hooks/useBirthdayFlow';
import { useSfx } from '@/hooks/useSfx';
import { toast } from 'sonner';
import { getRandomQuote } from '../minigame/popQuotes';
import { PopQuoteOverlay } from '../minigame/PopQuoteOverlay';

interface MiniGameModalProps {
  isOpen: boolean;
  onWin: () => void;
  onContinue: () => void;
  hasWon: boolean;
}

interface Balloon {
  id: number;
  x: number;
  y: number;
  color: string;
  popped: boolean;
}

interface QuoteInstance {
  id: number;
  text: string;
  x: number;
  y: number;
}

const BALLOON_COLORS = ['#FF6B9D', '#C44569', '#FFA07A', '#FFD93D', '#6BCB77', '#4D96FF'];

export function MiniGameModal({ isOpen, onWin, onContinue, hasWon }: MiniGameModalProps) {
  const { getBalloonCount, awardAchievement, hasAchievement } = useBirthdayFlow();
  const { play } = useSfx();
  const balloonCount = getBalloonCount();
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [quotes, setQuotes] = useState<QuoteInstance[]>([]);
  const [quoteIdCounter, setQuoteIdCounter] = useState(0);

  useEffect(() => {
    // Initialize balloons based on age
    const initialBalloons: Balloon[] = Array.from({ length: balloonCount }, (_, i) => ({
      id: i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 70 + 10,
      color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)],
      popped: false
    }));
    setBalloons(initialBalloons);
  }, [balloonCount]);

  const popBalloon = (id: number) => {
    if (hasWon) return;
    
    const balloon = balloons.find(b => b.id === id);
    if (!balloon || balloon.popped) return;
    
    play('balloon-pop');
    
    // Spawn quote at balloon position
    const newQuote: QuoteInstance = {
      id: quoteIdCounter,
      text: getRandomQuote(),
      x: balloon.x,
      y: balloon.y,
    };
    setQuotes(prev => [...prev, newQuote]);
    setQuoteIdCounter(prev => prev + 1);
    
    setBalloons(prev => {
      const updated = prev.map(b => 
        b.id === id ? { ...b, popped: true } : b
      );
      
      // Check if all balloons are popped
      if (updated.every(b => b.popped)) {
        setTimeout(() => {
          onWin();
          
          if (!hasAchievement('balloon-master')) {
            awardAchievement('balloon-master');
            setTimeout(() => {
              toast.success('Achievement Unlocked!', {
                description: '🎈 Balloon Master - Popped all the balloons!'
              });
            }, 500);
          }
        }, 300);
      }
      
      return updated;
    });
  };

  const activeBalloons = balloons.filter(b => !b.popped);

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-4xl h-[600px] bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center animate-in slide-in-from-top duration-500">
            {hasWon ? '🎉 You Win! 🎉' : 'Pop All the Balloons!'}
          </DialogTitle>
          <DialogDescription className="text-center text-lg">
            {hasWon 
              ? 'Amazing! You popped all the balloons!' 
              : `Tap or click each balloon to pop it! (${activeBalloons.length} left)`
            }
          </DialogDescription>
        </DialogHeader>
        
        {!hasWon ? (
          <div className="relative flex-1 bg-gradient-to-b from-sky-100 to-sky-200 rounded-lg overflow-hidden shadow-inner">
            {balloons.map(balloon => (
              !balloon.popped && (
                <button
                  key={balloon.id}
                  onClick={() => popBalloon(balloon.id)}
                  className="absolute transition-all hover:scale-125 cursor-pointer group"
                  style={{
                    left: `${balloon.x}%`,
                    top: `${balloon.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <div className="relative animate-bounce" style={{ animationDuration: `${2 + Math.random()}s` }}>
                    {/* Balloon with shine effect */}
                    <div
                      className="w-16 h-20 rounded-full shadow-xl relative overflow-hidden group-hover:shadow-2xl transition-shadow"
                      style={{ backgroundColor: balloon.color }}
                    >
                      <div className="absolute top-2 left-3 w-6 h-8 bg-white/40 rounded-full blur-sm" />
                    </div>
                    {/* String */}
                    <div className="w-0.5 h-8 bg-gray-400 mx-auto" />
                    {/* Glow effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute inset-0 bg-white/20 rounded-full blur-lg" />
                    </div>
                  </div>
                </button>
              )
            ))}
            
            <PopQuoteOverlay quotes={quotes} />
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center space-y-6 animate-in zoom-in duration-700">
            <Sparkles className="w-24 h-24 text-yellow-500 animate-pulse" />
            <div className="text-6xl animate-bounce">🎊</div>
            <p className="text-2xl font-semibold text-gray-700">
              Fantastic job! Let's continue the celebration!
            </p>
            <Button
              onClick={onContinue}
              size="lg"
              className="text-xl px-8 py-6 h-auto bg-celebration-accent hover:bg-celebration-accent/90 hover:scale-105 transition-all duration-300"
            >
              Continue to Next Surprise 🎁
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
