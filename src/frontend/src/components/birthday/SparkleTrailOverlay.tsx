import { useEffect, useRef, useState } from 'react';
import { useBirthdayFlow } from '@/hooks/useBirthdayFlow';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
  createdAt: number;
}

const SPARKLE_COLORS = ['#FFD700', '#FFA500', '#FF69B4', '#87CEEB', '#98FB98', '#DDA0DD'];
const MAX_SPARKLES = 30;
const SPARKLE_LIFETIME = 1000;
const THROTTLE_MS = 50;

export function SparkleTrailOverlay() {
  const { sparkleTrailEnabled } = useBirthdayFlow();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const nextIdRef = useRef(0);
  const lastSparkleTimeRef = useRef(0);

  const isEnabled = sparkleTrailEnabled && !prefersReducedMotion;

  useEffect(() => {
    if (!isEnabled) {
      setSparkles([]);
      return;
    }

    const handlePointerMove = (e: PointerEvent) => {
      const now = Date.now();
      if (now - lastSparkleTimeRef.current < THROTTLE_MS) return;
      lastSparkleTimeRef.current = now;

      const newSparkle: Sparkle = {
        id: nextIdRef.current++,
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 8 + 4,
        opacity: 1,
        color: SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)],
        createdAt: now
      };

      setSparkles(prev => {
        const filtered = prev.filter(s => now - s.createdAt < SPARKLE_LIFETIME);
        const updated = [...filtered, newSparkle];
        return updated.slice(-MAX_SPARKLES);
      });
    };

    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [isEnabled]);

  useEffect(() => {
    if (!isEnabled || sparkles.length === 0) return;

    const interval = setInterval(() => {
      const now = Date.now();
      setSparkles(prev => prev.filter(s => now - s.createdAt < SPARKLE_LIFETIME));
    }, 100);

    return () => clearInterval(interval);
  }, [isEnabled, sparkles.length]);

  if (!isEnabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
      {sparkles.map(sparkle => {
        const age = Date.now() - sparkle.createdAt;
        const progress = age / SPARKLE_LIFETIME;
        const opacity = sparkle.opacity * (1 - progress);
        const scale = 1 - progress * 0.5;

        return (
          <div
            key={sparkle.id}
            className="absolute transition-opacity duration-100"
            style={{
              left: sparkle.x,
              top: sparkle.y,
              width: sparkle.size,
              height: sparkle.size,
              opacity,
              transform: `translate(-50%, -50%) scale(${scale}) rotate(${progress * 180}deg)`,
              backgroundColor: sparkle.color,
              borderRadius: '50%',
              boxShadow: `0 0 ${sparkle.size}px ${sparkle.color}`,
              willChange: 'transform, opacity'
            }}
          />
        );
      })}
    </div>
  );
}
