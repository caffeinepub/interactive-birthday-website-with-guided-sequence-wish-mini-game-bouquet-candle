import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sparkles, Gift, PartyPopper } from 'lucide-react';
import { useBirthdayFlow } from '@/hooks/useBirthdayFlow';
import { WishDecorations } from './WishDecorations';

interface StepWishProps {
  onComplete: () => void;
}

export function StepWish({ onComplete }: StepWishProps) {
  const { age, setAge, setMusicStarted } = useBirthdayFlow();
  const [inputAge, setInputAge] = useState(age?.toString() || '');
  const [error, setError] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);

  const handleSubmit = () => {
    const ageNum = parseInt(inputAge);
    
    if (!inputAge || isNaN(ageNum)) {
      setError('Please enter a valid age');
      return;
    }
    
    if (ageNum < 1 || ageNum > 120) {
      setError('Please enter an age between 1 and 120');
      return;
    }
    
    setError('');
    setAge(ageNum);
    setShowCelebration(true);
    setMusicStarted(true);
    
    setTimeout(() => {
      onComplete();
    }, 800);
  };

  if (age && showCelebration) {
    return (
      <div className="relative w-full max-w-3xl mx-auto px-6 text-center animate-in fade-in zoom-in duration-700">
        <WishDecorations />
        <div className="relative z-10">
          <PartyPopper className="w-32 h-32 text-yellow-300 mx-auto animate-bounce" />
          <h2 className="text-5xl font-bold text-white mt-4">Let's celebrate!</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto px-6 text-center animate-in fade-in duration-700">
      <WishDecorations />
      
      <div className="relative z-10 space-y-10">
        {/* Icon with enhanced styling */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-celebration-accent/20 rounded-full blur-2xl animate-pulse" />
            <Gift className="relative w-28 h-28 text-celebration-accent animate-bounce drop-shadow-2xl" />
            <Sparkles className="w-10 h-10 text-yellow-300 absolute -top-3 -right-3 animate-pulse drop-shadow-lg" />
          </div>
        </div>
        
        {/* Main Wish with enhanced typography */}
        <div className="space-y-6">
          <h1 className="text-6xl md:text-8xl font-bold text-white drop-shadow-2xl animate-in slide-in-from-top duration-500 tracking-tight">
            Happy Birthday! 🎉
          </h1>
          
          <p className="text-3xl md:text-4xl text-white/95 font-semibold animate-in slide-in-from-bottom duration-700 drop-shadow-lg">
            Get ready for a special surprise!
          </p>
          
          <p className="text-xl md:text-2xl text-white/85 max-w-2xl mx-auto leading-relaxed drop-shadow-md font-medium">
            Today is all about celebrating YOU! We've prepared something magical 
            to make your day extra special. Let's embark on this joyful journey together!
          </p>
        </div>
        
        {/* Age Input with enhanced design */}
        {!age && (
          <div className="pt-6 max-w-md mx-auto animate-in fade-in duration-1000">
            <div className="bg-white/98 backdrop-blur-md rounded-3xl p-8 shadow-2xl space-y-5 border-4 border-celebration-accent/40 relative overflow-hidden">
              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-20 h-20 bg-celebration-light/30 rounded-br-full" />
              <div className="absolute bottom-0 right-0 w-20 h-20 bg-celebration-accent/20 rounded-tl-full" />
              
              <div className="relative z-10 space-y-5">
                <Label htmlFor="age" className="text-xl font-bold text-gray-800 block">
                  First, tell us your age:
                </Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  value={inputAge}
                  onChange={(e) => {
                    setInputAge(e.target.value);
                    setError('');
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSubmit();
                    }
                  }}
                  className="text-center text-3xl h-16 border-3 border-celebration-primary/40 focus:border-celebration-accent rounded-xl shadow-inner"
                />
                {error && (
                  <p className="text-red-600 text-base font-semibold animate-in fade-in duration-200">
                    {error}
                  </p>
                )}
                <Button
                  onClick={handleSubmit}
                  size="lg"
                  className="w-full text-2xl px-12 py-7 h-auto bg-celebration-accent hover:bg-celebration-accent/90 text-white shadow-2xl hover:scale-105 transition-all duration-300 rounded-xl font-bold"
                >
                  Start the Surprise ✨
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
