import { useState } from 'react';
import { MiniGameModal } from '../modals/MiniGameModal';
import { EasterEggCollectible } from '../collectibles/EasterEggCollectible';
import { Gamepad2, Sparkles } from 'lucide-react';

interface StepMiniGameProps {
  onComplete: () => void;
}

export function StepMiniGame({ onComplete }: StepMiniGameProps) {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [hasWon, setHasWon] = useState(false);

  const handleWin = () => {
    setHasWon(true);
  };

  const handleContinue = () => {
    setIsModalOpen(false);
    onComplete();
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-6 text-center relative">
      <EasterEggCollectible id={2} position={{ top: '10%', right: '5%' }} />
      
      <div className="space-y-6 animate-in fade-in duration-700">
        <div className="relative inline-block">
          <Gamepad2 className="w-20 h-20 text-celebration-accent mx-auto" />
          <Sparkles className="w-8 h-8 text-yellow-300 absolute -top-2 -right-2 animate-pulse" />
        </div>
        <h2 className="text-4xl font-bold text-white">Time for a Fun Game!</h2>
        <p className="text-xl text-white/80">
          Pop all the balloons to continue your birthday adventure!
        </p>
      </div>
      
      <MiniGameModal
        isOpen={isModalOpen}
        onWin={handleWin}
        onContinue={handleContinue}
        hasWon={hasWon}
      />
    </div>
  );
}
