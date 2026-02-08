// Beautiful inspirational quotes for balloon pops
const QUOTES = [
  "Every moment is a fresh beginning.",
  "Believe you can and you're halfway there.",
  "The best is yet to come.",
  "Dream big, sparkle more, shine bright.",
  "You are capable of amazing things.",
  "Today is your day to shine.",
  "Make every moment count.",
  "Life is a beautiful adventure.",
  "You are stronger than you think.",
  "Celebrate every tiny victory.",
  "Your smile is your superpower.",
  "Keep shining, beautiful soul.",
  "Magic happens when you believe.",
  "You are a gift to the world.",
  "Embrace the journey ahead.",
];

let lastQuoteIndex = -1;

export function getRandomQuote(): string {
  // Avoid immediate repetition
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * QUOTES.length);
  } while (newIndex === lastQuoteIndex && QUOTES.length > 1);
  
  lastQuoteIndex = newIndex;
  return QUOTES[newIndex];
}
