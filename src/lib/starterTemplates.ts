import { LetterTone, MemoryItem } from '@/types/letter';

export interface StarterTemplate {
  tone: LetterTone;
  label: string;
  description: string;
  message: string;
  signOff: string;
  suggestedMemories: MemoryItem[];
}

export const STARTER_TEMPLATES: Record<LetterTone, StarterTemplate> = {
  tender: {
    tone: 'tender',
    label: 'Tender & Loving',
    description: 'Warm, sincere, and heartfelt appreciation for the man he is.',
    message: `Happy Birthday to the most incredible man in my life.\n\nFrom the moment you entered my world, everything became warmer, calmer, and infinitely brighter. You have this quiet strength, a laugh that melts away any bad day, and a heart so genuine that it reminds me daily how lucky I am to stand by your side.\n\nToday isn't just about celebrating your birthday—it's about celebrating every little thing that makes you who you are: your kindness, the way you look at me when you think I'm not noticing, and the constant safety and comfort you bring into my life.\n\nMay this year give you all the success, peace, and pure joy that you deserve. I can't wait to keep loving you and growing together.`,
    signOff: 'Forever and always yours,',
    suggestedMemories: [
      {
        id: 'mem-1',
        title: 'That late evening drive',
        content: 'When we had no destination in mind, just our favorite playlist humming and your hand holding mine over the console.'
      },
      {
        id: 'mem-2',
        title: 'The moment you made me laugh until I cried',
        content: 'Your goofy impression that completely caught me off guard and turned an ordinary afternoon into pure magic.'
      },
      {
        id: 'mem-3',
        title: 'How safe I feel in your arms',
        content: 'No matter how chaotic the world gets, leaning against your chest is my absolute favorite place on earth.'
      }
    ]
  },
  playful: {
    tone: 'playful',
    label: 'Playful & Sweet',
    description: 'Charming, light-hearted, and smiling with inside jokes.',
    message: `Happy Birthday to my favorite human, my personal comedian, and the handsomest guy I know!\n\nAnother year older, wiser, and somehow even better-looking. Thank you for tolerating all my quirks, stealing my fries (even when you said you weren't hungry), and always being the best partner in crime anyone could ask for.\n\nToday, you are officially exempt from doing anything you don't feel like doing. Your only job is to be spoiled, eat all the birthday cake, and let me celebrate you like you deserve.\n\nHere's to another year of spontaneous adventures, silly banter, and me never letting you win any arguments.`,
    signOff: 'With endless love and extra hugs,',
    suggestedMemories: [
      {
        id: 'mem-1',
        title: 'The Great Food Debate',
        content: 'When you swore you would only take one bite of my dessert and ended up finishing half of it with that guilty grin.'
      },
      {
        id: 'mem-2',
        title: 'Our terrible singing in the car',
        content: 'Hitting all the wrong notes at the top of our lungs with the windows rolled down.'
      }
    ]
  },
  poetic: {
    tone: 'poetic',
    label: 'Poetic & Deep',
    description: 'Atmospheric, romantic, and deeply emotional reflection.',
    message: `To the man who feels like coming home.\n\nThere is a rare kind of peace that exists only around you—like walking into a warm room after a rainstorm, or watching the dusk settle over quiet water. You hold my world with gentle hands, and in your eyes, I find both a refuge and an endless horizon.\n\nOn your birthday, I wish you moments that leave you breathless with gratitude, dreams that unfold before you effortlessly, and the quiet assurance that you are loved beyond measure.\n\nThank you for being my constant, my calm, and my greatest adventure. Happy Birthday, my love.`,
    signOff: 'Deeply and unconditionally,',
    suggestedMemories: [
      {
        id: 'mem-1',
        title: 'Under the quiet stars',
        content: 'Standing beside you in the crisp night air, talking about everything and nothing until the hours slipped away.'
      },
      {
        id: 'mem-2',
        title: 'Your gentle reassurance',
        content: 'The way you squeezed my hand when I was anxious, reminding me without words that everything would be okay.'
      }
    ]
  }
};
