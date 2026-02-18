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
      <div className="relative w-full max-w-3xl mx-auto px-4 sm:px-6 py-8 text-center animate-in fade-in zoom-in duration-700">
        <WishDecorations />
        <div className="relative z-10">
          <PartyPopper className="w-24 h-24 sm:w-32 sm:h-32 text-yellow-300 mx-auto animate-bounce" />
          <h2 className="text-4xl sm:text-5xl font-bold text-white mt-4 drop-shadow-2xl">Let's celebrate!</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 text-center animate-in fade-in duration-700">
      <WishDecorations />
      
      <div className="relative z-10 space-y-8 sm:space-y-10 lg:space-y-12">
        {/* Icon with enhanced styling */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-celebration-accent/20 rounded-full blur-2xl animate-pulse" />
            <Gift className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 text-celebration-accent animate-bounce drop-shadow-2xl" />
            <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-300 absolute -top-2 -right-2 sm:-top-3 sm:-right-3 animate-pulse drop-shadow-lg" />
          </div>
        </div>
        
        {/* Main Wish with enhanced typography and responsive sizing */}
        <div className="space-y-4 sm:space-y-5 lg:space-y-6 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white drop-shadow-2xl animate-in slide-in-from-top duration-500 tracking-tight leading-tight px-2">
            Happy Birthday! 🎉
          </h1>
          
          <p className="text-2xl sm:text-3xl lg:text-4xl text-white/95 font-semibold animate-in slide-in-from-bottom duration-700 drop-shadow-lg px-4">
            Get ready for a special surprise!
          </p>
          
          <p className="text-lg sm:text-xl lg:text-2xl text-white/85 max-w-2xl mx-auto leading-relaxed drop-shadow-md font-medium px-4">
            Today is all about celebrating YOU! We've prepared something magical 
            to make your day extra special. Let's embark on this joyful journey together!
          </p>
        </div>
        
        {/* Age Input with enhanced design and accessibility */}
        {!age && (
          <div className="pt-4 sm:pt-6 max-w-md mx-auto animate-in fade-in duration-1000">
            <div className="bg-white/98 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4 sm:space-y-5 border-2 sm:border-4 border-celebration-accent/40 relative overflow-hidden">
              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-16 h-16 sm:w-20 sm:h-20 bg-celebration-light/30 rounded-br-full" />
              <div className="absolute bottom-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-celebration-accent/20 rounded-tl-full" />
              
              <div className="relative z-10 space-y-4 sm:space-y-5">
                <Label htmlFor="age" className="text-lg sm:text-xl font-bold text-gray-800 block">
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
                  className="text-center text-2xl sm:text-3xl h-14 sm:h-16 border-2 sm:border-3 border-celebration-primary/40 focus:border-celebration-accent focus-visible:ring-celebration-accent focus-visible:ring-2 focus-visible:ring-offset-2 rounded-xl shadow-inner transition-all duration-200"
                  aria-invalid={!!error}
                  aria-describedby={error ? "age-error" : undefined}
                />
                {error && (
                  <p id="age-error" role="alert" className="text-red-600 text-sm sm:text-base font-semibold animate-in fade-in duration-200">
                    {error}
                  </p>
                )}
                <Button
                  onClick={handleSubmit}
                  size="lg"
                  className="w-full text-xl sm:text-2xl px-8 sm:px-12 py-6 sm:py-7 h-auto bg-celebration-accent hover:bg-celebration-accent/90 text-white shadow-2xl hover:shadow-celebration-accent/50 hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-celebration-accent focus-visible:ring-offset-2 transition-all duration-200 rounded-xl font-bold"
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
