// ===== EDIT YOUR CONTENT HERE =====
const HIS_NAME = "JiaJia";

const TIPS = [
    "You're Electric...!",
    "You barreled into my life like a Barbarian",
    "Don't go horsin' around my Prince",
    "You’re stronger than a max-level P.E.K.K.A. in my arena",
    "Mega Knight never skips leg day",
    "You're my Legendary card in a deck full of Commons~",
    "Had me at Zap and I've been stunned ever since!",
    "You spin me around crazy like Valkyrie",
    "FIREBALL",
    "Did you just shoot a love dart, you Goblin!?",
];

const PROFILE = [
  ["Name", HIS_NAME],
  ["Level", "23"],
  ["Height", "Taller than Mt. Everest"],
  ["My Favorite card", "his debit card"],
  ["Win condition", "Making me swoon"],
  ["Favorite character in the entire world", "ME ofc"],
  ["Account first created", "November 8th, 2025"],
];

const CHESTS = [   // one song per chest
  { title: "Chest 1", song: "Spring Snow", artist: "10cm",
    text: "The song I thought of while getting to know you :3",
    video: "https://youtu.be/SKWxqYvqmmA?si=9H6ElaeFkwvyueEO" },
  { title: "Chest 2", song: "Honeybee", artist: "Olivia Rodrigo",
    text: "Most recent song I be listening to that reminds me of you ;)",
    video: "https://youtu.be/60rlboK94mE?si=Y2TYKiuRheaMsR1B" },
  { title: "Chest 3", song: "Valentine", artist: "Laufey",
    text: "Song that best describes how I felt while dating you :D",
    video: "https://youtu.be/tyKu0uZS86Q?si=fzaLSwycPfWUnDad" },
];

const CARDS = [  // 8 reasons
  { name: "Reason 1", elixir: 1, reason: "You gave 100% effort when we first met" },
  { name: "Reason 2", elixir: 2, reason: "Yummy biceps." },
  { name: "Reason 3", elixir: 3, reason: "You have parts of my name in your name, it's destiny" },
  { name: "Reason 4", elixir: 4, reason: "My personal chef" },
  { name: "Reason 5", elixir: 5, reason: "The cutest patootie in the world" },
  { name: "Reason 6", elixir: 6, reason: "My personal portable chinese translator" },
  { name: "Reason 7", elixir: 7, reason: "Gentle, smart, hardworking, loving, goofy, handsome, determined, strong, Supercalifragilisticexpialidocious" },
  { name: "Reason 8", elixir: 8, reason: "Mine." },
];

// Memory game: each emoji becomes a matching pair (6 emojis = 12 tiles)
const MATCH_CARDS = ["👑", "🏹", "🧙", "🐷", "⚔️", "💙"];

// The letter appears after the game is won. One string per paragraph.
const LETTER = [
  "Congrats! You've overcome the most horrible gruesome battle of memory match game!!",
  "Despite the goofy ah music in the background, this letter will be serious and intentional...",
  "So jokes aside, I wanted to say that I see all your hard work and effort, and that I'm very proud of you.",
  "I can't believe it's been nearly a year since we first met and starting dating, time flew by crazy fast didn't it?",
  "I'm glad I met you and that you're the partner that I get to experience life with.",
  "I wish you all the success and happiness in life, and I want to be there by your side to support you all the time.",
  "If you're feeling down, come back here to remember how much you're loved.",
  "You're amazing and I know you will be able to overcome any obstacles in life.",
  "Above all, today's the day to show appreciation for one's partner so I wanted to make this website to show you how much I appreciate you!",
  "Happy National Boyfriend Day, my dear <3",
];

// Replace emojis with your own pictures. Leave "" to keep the emoji.
const ICONS = {
  crown: "",
  chest: "",
  chestOpen: "",
  tabChests: "",
  tabCards: "",
  tabBattle: "",
  tabUs: "",
};