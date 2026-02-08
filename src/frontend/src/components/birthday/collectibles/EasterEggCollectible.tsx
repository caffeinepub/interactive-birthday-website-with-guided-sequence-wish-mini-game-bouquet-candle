import { useState } from 'react';
import { Star } from 'lucide-react';
import { useBirthdayFlow } from '@/hooks/useBirthdayFlow';
import { useSfx } from '@/hooks/useSfx';

interface EasterEggCollectibleProps {
  id: number;
  position?: { top?: string; bottom?: string; left?: string; right?: string };
}

export function EasterEggCollectible({ id, position = {} }: EasterEggCollectibleProps) {
  const { hasCollectible, collectCollectible } = useBirthdayFlow();
  const { play } = useSfx();
  const [isCollecting, setIsCollecting] = useState(false);
  const isCollected = hasCollectible(id);

  const handleCollect = () => {
    if (isCollected) return;
    
    setIsCollecting(true);
    collectCollectible(id);
    play('collectible-found');
    
    setTimeout(() => {
      setIsCollecting(false);
    }, 600);
  };

  if (isCollected) return null;

  return (
    <button
      onClick={handleCollect}
      className={`absolute z-20 transition-all duration-300 hover:scale-125 ${
        isCollecting ? 'animate-ping' : 'animate-pulse'
      }`}
      style={{
        top: position.top,
        bottom: position.bottom,
        left: position.left,
        right: position.right,
        animationDuration: '2s'
      }}
      title="Hidden collectible!"
    >
      <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 drop-shadow-lg" />
    </button>
  );
}
