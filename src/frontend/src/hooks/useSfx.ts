import { useRef, useCallback } from 'react';
import { useBirthdayFlow } from './useBirthdayFlow';

type SfxType = 'balloon-pop' | 'candle-out' | 'gift-open' | 'collectible-found';

const SFX_PATHS: Record<SfxType, string> = {
  'balloon-pop': '/assets/sfx/balloon-pop.mp3',
  'candle-out': '/assets/sfx/candle-out.mp3',
  'gift-open': '/assets/sfx/gift-open.mp3',
  'collectible-found': '/assets/sfx/collectible-found.mp3'
};

export function useSfx() {
  const { sfxMuted, sfxArmed } = useBirthdayFlow();
  const audioCache = useRef<Map<SfxType, HTMLAudioElement>>(new Map());

  const play = useCallback((type: SfxType) => {
    if (sfxMuted || !sfxArmed) return;

    try {
      let audio = audioCache.current.get(type);
      
      if (!audio) {
        audio = new Audio(SFX_PATHS[type]);
        audio.volume = 0.4;
        audioCache.current.set(type, audio);
      }

      // Clone and play to allow overlapping sounds
      const clone = audio.cloneNode() as HTMLAudioElement;
      clone.volume = 0.4;
      clone.play().catch(() => {
        // Silently fail if autoplay is blocked
      });
    } catch (error) {
      // Silently fail
    }
  }, [sfxMuted, sfxArmed]);

  return { play };
}
