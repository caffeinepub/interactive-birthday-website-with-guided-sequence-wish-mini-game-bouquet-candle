import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface QuoteInstance {
  id: number;
  text: string;
  x: number;
  y: number;
}

interface PopQuoteOverlayProps {
  quotes: QuoteInstance[];
}

export function PopQuoteOverlay({ quotes }: PopQuoteOverlayProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [visibleQuotes, setVisibleQuotes] = useState<QuoteInstance[]>([]);

  useEffect(() => {
    // Add new quotes to visible list
    quotes.forEach(quote => {
      if (!visibleQuotes.find(q => q.id === quote.id)) {
        setVisibleQuotes(prev => [...prev, quote]);
        
        // Auto-remove after 2.5 seconds
        setTimeout(() => {
          setVisibleQuotes(prev => prev.filter(q => q.id !== quote.id));
        }, 2500);
      }
    });
  }, [quotes]);

  return (
    <div className="absolute inset-0 pointer-events-none z-50">
      {visibleQuotes.map(quote => (
        <div
          key={quote.id}
          className={`absolute text-center px-4 py-2 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border-2 border-celebration-accent/40 ${
            prefersReducedMotion ? 'animate-in fade-in duration-300' : 'quote-float-up'
          }`}
          style={{
            left: `${quote.x}%`,
            top: `${quote.y}%`,
            transform: 'translate(-50%, -50%)',
            maxWidth: '280px',
          }}
        >
          <p className="text-sm md:text-base font-semibold text-gray-800 leading-snug">
            "{quote.text}"
          </p>
        </div>
      ))}
    </div>
  );
}
