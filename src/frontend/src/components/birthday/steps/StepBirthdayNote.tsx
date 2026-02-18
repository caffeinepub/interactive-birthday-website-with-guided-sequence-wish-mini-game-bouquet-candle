import { useState, useEffect } from 'react';
import { BirthdayNoteModal } from '../modals/BirthdayNoteModal';
import { Mail, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StepBirthdayNoteProps {
  onRestart: () => void;
}

export function StepBirthdayNote({ onRestart }: StepBirthdayNoteProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);

  // Auto-open modal on mount (Step 6 entry)
  useEffect(() => {
    setIsModalOpen(true);
    setHasOpenedOnce(true);
  }, []);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleReopen = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-6 text-center">
      <div className="space-y-6 animate-in fade-in duration-700">
        <div className="relative inline-block">
          <Mail className="w-20 h-20 text-celebration-accent mx-auto" />
          <Sparkles className="w-8 h-8 text-yellow-300 absolute -top-2 -right-2 animate-pulse" />
        </div>
        <h2 className="text-4xl font-bold text-white">A Special Message for You</h2>
        <p className="text-xl text-white/80">
          {isModalOpen ? 'Open your heartfelt birthday note...' : 'Your birthday note is ready to read again!'}
        </p>
        
        {!isModalOpen && hasOpenedOnce && (
          <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Button
              onClick={handleReopen}
              size="lg"
              className="text-lg px-8 py-6 h-auto bg-celebration-accent hover:bg-celebration-accent/90 gap-2 shadow-lg"
            >
              <Mail className="w-5 h-5" />
              Open the Note Again
            </Button>
          </div>
        )}
      </div>
      
      <BirthdayNoteModal
        isOpen={isModalOpen}
        onClose={handleClose}
        onRestart={onRestart}
      />
    </div>
  );
}
