import { useEffect, useState } from 'react';

export function CelebrationBurst() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string; delay: number }>>([]);

  useEffect(() => {
    const colors = ['#FFD93D', '#FF6B9D', '#6BCB77', '#4D96FF', '#C44569', '#FFA07A'];
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: 50 + (Math.random() - 0.5) * 60,
      y: 50 + (Math.random() - 0.5) * 60,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 0.3
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute w-3 h-3 rounded-full animate-in fade-in zoom-in"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            backgroundColor: particle.color,
            animationDelay: `${particle.delay}s`,
            animationDuration: '1s',
            boxShadow: `0 0 10px ${particle.color}`
          }}
        />
      ))}
    </div>
  );
}
