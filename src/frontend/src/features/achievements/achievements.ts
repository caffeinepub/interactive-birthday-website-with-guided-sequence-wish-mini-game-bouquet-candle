export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'balloon-master',
    name: 'Balloon Master',
    description: 'Popped all the balloons in the mini-game!',
    icon: '🎈'
  },
  {
    id: 'wish-maker',
    name: 'Wish Maker',
    description: 'Blew out all the birthday candles!',
    icon: '🕯️'
  },
  {
    id: 'gift-opener',
    name: 'Gift Opener',
    description: 'Opened the surprise gift box!',
    icon: '🎁'
  },
  {
    id: 'flower-lover',
    name: 'Flower Lover',
    description: 'Revealed the beautiful bouquet!',
    icon: '💐'
  }
];

export function getAchievement(id: string): Achievement | undefined {
  return ACHIEVEMENTS.find(a => a.id === id);
}
