import { ReactNode, useRef, useEffect } from 'react';
import { useBirthdayFlow } from '@/hooks/useBirthdayFlow';

interface BirthdayLayoutProps {
  children: ReactNode;
}

export function BirthdayLayout({ children }: BirthdayLayoutProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { musicStarted, musicMuted, musicVolume } = useBirthdayFlow();

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = musicVolume;
      audioRef.current.muted = musicMuted;
      
      if (musicStarted) {
        audioRef.current.play().catch(() => {
          // Autoplay blocked, user needs to interact
        });
      } else {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [musicStarted, musicMuted, musicVolume]);

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex flex-col">
      {/* Audio element */}
      <audio ref={audioRef} loop>
        <source src="/assets/birthday-music.mp3" type="audio/mpeg" />
      </audio>

      {/* Confetti background with subtle animation */}
      <div 
        className="fixed inset-0 z-0 opacity-30 animate-pulse"
        style={{
          backgroundImage: 'url(/assets/generated/bg-confetti.dim_1920x1080.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          animationDuration: '4s'
        }}
      />
      
      {/* Gradient overlay with shimmer */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-celebration-light via-celebration-medium to-celebration-dark" />
      <div className="fixed inset-0 z-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent animate-pulse" style={{ animationDuration: '3s' }} />
      
      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col">
        {children}
      </div>
      
      {/* Footer */}
      <footer className="relative z-10 py-4 text-center text-sm text-white/70">
        <p>
          © 2026. Built with <span className="text-celebration-accent">♥</span> using{' '}
          <a 
            href="https://caffeine.ai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="underline hover:text-white transition-colors"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
