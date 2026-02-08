import { useState } from 'react';
import { BirthdayNoteModal } from '../modals/BirthdayNoteModal';
import { Mail, Sparkles } from 'lucide-react';

interface StepBirthdayNoteProps {
  onRestart: () => void;
}

export function StepBirthdayNote({ onRestart }: StepBirthdayNoteProps) {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleClose = () => {
    setIsModalOpen(false);
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
          Open your heartfelt birthday note...
        </p>
      </div>
      
      <BirthdayNoteModal
        isOpen={isModalOpen}
        onClose={handleClose}
        onRestart={onRestart}
      />
    </div>
  );
}
