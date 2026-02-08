import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface BirthdayFlowState {
  currentStep: number;
  completedSteps: Set<number>;
  age: number | null;
  musicStarted: boolean;
  musicMuted: boolean;
  musicVolume: number;
  sfxMuted: boolean;
  sfxArmed: boolean;
  sparkleTrailEnabled: boolean;
  collectibles: Set<number>;
  achievements: Set<string>;
  memoryCapsule: string;
  isStepComplete: (step: number) => boolean;
  completeStep: (step: number) => void;
  goToNextStep: () => void;
  setAge: (age: number) => void;
  setMusicStarted: (started: boolean) => void;
  setMusicMuted: (muted: boolean) => void;
  setMusicVolume: (volume: number) => void;
  setSfxMuted: (muted: boolean) => void;
  setSfxArmed: (armed: boolean) => void;
  setSparkleTrailEnabled: (enabled: boolean) => void;
  collectCollectible: (id: number) => void;
  hasCollectible: (id: number) => boolean;
  getAllCollectiblesFound: () => boolean;
  awardAchievement: (id: string) => void;
  hasAchievement: (id: string) => boolean;
  getAchievements: () => string[];
  setMemoryCapsule: (message: string) => void;
  getBalloonCount: () => number;
  restart: () => void;
}

const MAX_BALLOONS = 20;
const MAX_CANDLES = 30;

export const useBirthdayFlow = create<BirthdayFlowState>()(
  persist(
    (set, get) => ({
      currentStep: 1,
      completedSteps: new Set<number>(),
      age: null,
      musicStarted: false,
      musicMuted: false,
      musicVolume: 0.5,
      sfxMuted: false,
      sfxArmed: false,
      sparkleTrailEnabled: true,
      collectibles: new Set<number>(),
      achievements: new Set<string>(),
      memoryCapsule: '',
      
      isStepComplete: (step: number) => {
        return get().completedSteps.has(step);
      },
      
      completeStep: (step: number) => {
        set((state) => {
          const newCompleted = new Set(state.completedSteps);
          newCompleted.add(step);
          
          // Auto-advance to next step if current step is completed
          const nextStep = step === state.currentStep ? step + 1 : state.currentStep;
          
          return {
            completedSteps: newCompleted,
            currentStep: Math.min(nextStep, 6)
          };
        });
      },
      
      goToNextStep: () => {
        set((state) => ({
          currentStep: Math.min(state.currentStep + 1, 6)
        }));
      },
      
      setAge: (age: number) => {
        set({ age });
      },
      
      setMusicStarted: (started: boolean) => {
        set({ musicStarted: started });
      },
      
      setMusicMuted: (muted: boolean) => {
        set({ musicMuted: muted });
      },
      
      setMusicVolume: (volume: number) => {
        set({ musicVolume: volume });
      },
      
      setSfxMuted: (muted: boolean) => {
        set({ sfxMuted: muted });
      },
      
      setSfxArmed: (armed: boolean) => {
        set({ sfxArmed: armed });
      },
      
      setSparkleTrailEnabled: (enabled: boolean) => {
        set({ sparkleTrailEnabled: enabled });
      },
      
      collectCollectible: (id: number) => {
        set((state) => {
          const newCollectibles = new Set(state.collectibles);
          newCollectibles.add(id);
          return { collectibles: newCollectibles };
        });
      },
      
      hasCollectible: (id: number) => {
        return get().collectibles.has(id);
      },
      
      getAllCollectiblesFound: () => {
        const collectibles = get().collectibles;
        return collectibles.has(2) && collectibles.has(3) && collectibles.has(4) && collectibles.has(5);
      },
      
      awardAchievement: (id: string) => {
        set((state) => {
          if (state.achievements.has(id)) return state;
          const newAchievements = new Set(state.achievements);
          newAchievements.add(id);
          return { achievements: newAchievements };
        });
      },
      
      hasAchievement: (id: string) => {
        return get().achievements.has(id);
      },
      
      getAchievements: () => {
        return Array.from(get().achievements);
      },
      
      setMemoryCapsule: (message: string) => {
        set({ memoryCapsule: message });
      },
      
      getBalloonCount: () => {
        const age = get().age;
        if (!age) return 12;
        return Math.min(age, MAX_BALLOONS);
      },
      
      restart: () => {
        set({
          currentStep: 1,
          completedSteps: new Set<number>(),
          age: null,
          musicStarted: false,
          musicMuted: false,
          musicVolume: 0.5,
          sfxMuted: false,
          sfxArmed: false,
          sparkleTrailEnabled: true,
          collectibles: new Set<number>(),
          achievements: new Set<string>(),
          memoryCapsule: ''
        });
      }
    }),
    {
      name: 'birthday-flow-storage',
      partialize: (state) => ({
        currentStep: state.currentStep,
        completedSteps: Array.from(state.completedSteps),
        age: state.age,
        musicStarted: state.musicStarted,
        musicMuted: state.musicMuted,
        musicVolume: state.musicVolume,
        sfxMuted: state.sfxMuted,
        sparkleTrailEnabled: state.sparkleTrailEnabled,
        collectibles: Array.from(state.collectibles),
        achievements: Array.from(state.achievements),
        memoryCapsule: state.memoryCapsule
      }),
      merge: (persistedState: any, currentState) => ({
        ...currentState,
        ...persistedState,
        completedSteps: new Set(persistedState?.completedSteps || []),
        collectibles: new Set(persistedState?.collectibles || []),
        achievements: new Set(persistedState?.achievements || []),
        sfxArmed: false
      })
    }
  )
);
