import React, { useState, useEffect } from 'react';
import { Gamepad2, RotateCcw, Trophy, Heart } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "What is the strongest material in Minecraft?",
    options: ["Diamond", "Netherite", "Obsidian", "Bedrock"],
    correctAnswer: 1,
    explanation: "Netherite is the strongest craftable material, even stronger than diamond!"
  },
  {
    id: 2,
    question: "How many blocks high can you stack items?",
    options: ["64", "99", "128", "256"],
    correctAnswer: 3,
    explanation: "You can build up to 256 blocks high in most Minecraft worlds!"
  },
  {
    id: 3,
    question: "What do you need to make a Nether Portal?",
    options: ["Diamond blocks", "Obsidian blocks", "Iron blocks", "Gold blocks"],
    correctAnswer: 1,
    explanation: "You need at least 10 obsidian blocks to create a Nether Portal frame!"
  },
  {
    id: 4,
    question: "Which mob drops Ender Pearls?",
    options: ["Enderman", "Ender Dragon", "Shulker", "Blaze"],
    correctAnswer: 0,
    explanation: "Endermen drop Ender Pearls when defeated!"
  },
  {
    id: 5,
    question: "What is the maximum enchantment level?",
    options: ["Level 30", "Level 50", "Level 100", "No limit"],
    correctAnswer: 0,
    explanation: "The maximum enchantment level you can get at an enchanting table is 30!"
  },
  {
    id: 6,
    question: "Which dimension has the End Cities?",
    options: ["Overworld", "Nether", "End", "Void"],
    correctAnswer: 2,
    explanation: "End Cities are found in the outer End islands after defeating the Ender Dragon!"
  },
  {
    id: 7,
    question: "What food restores the most hunger points?",
    options: ["Steak", "Golden Apple", "Cake", "Rabbit Stew"],
    correctAnswer: 0,
    explanation: "Cooked Steak and Porkchops restore 8 hunger points, the most for regular food!"
  },
  {
    id: 8,
    question: "How many eyes of ender do you need to activate an End Portal?",
    options: ["9", "12", "15", "16"],
    correctAnswer: 1,
    explanation: "You need 12 Eyes of Ender to fill all the End Portal frame blocks!"
  },
  {
    id: 9,
    question: "Which block can't be broken by the Wither?",
    options: ["Obsidian", "Bedrock", "Diamond Block", "Netherite Block"],
    correctAnswer: 1,
    explanation: "Bedrock is indestructible and can't be broken by any means in survival mode!"
  },
  {
    id: 10,
    question: "What is the rarest ore in Minecraft?",
    options: ["Diamond", "Emerald", "Netherite", "Ancient Debris"],
    correctAnswer: 3,
    explanation: "Ancient Debris is the rarest ore, used to make Netherite!"
  },
  {
    id: 11,
    question: "Which potion effect makes you invisible?",
    options: ["Night Vision", "Invisibility", "Speed", "Jump Boost"],
    correctAnswer: 1,
    explanation: "The Invisibility potion makes your player model invisible to mobs!"
  },
  {
    id: 12,
    question: "What do you use to breed horses?",
    options: ["Carrots", "Apples", "Wheat", "Sugar"],
    correctAnswer: 1,
    explanation: "Horses can be bred using Golden Apples or Golden Carrots!"
  },
  {
    id: 13,
    question: "Which block emits the highest light level?",
    options: ["Torch", "Glowstone", "Sea Lantern", "Beacon"],
    correctAnswer: 1,
    explanation: "Glowstone emits light level 15, the maximum possible!"
  },
  {
    id: 14,
    question: "What is the spawn rate of a Pink Sheep?",
    options: ["0.164%", "1%", "5%", "10%"],
    correctAnswer: 0,
    explanation: "Pink sheep have only a 0.164% chance of spawning naturally!"
  },
  {
    id: 15,
    question: "Which villager trades emeralds for books?",
    options: ["Farmer", "Librarian", "Cleric", "Weaponsmith"],
    correctAnswer: 1,
    explanation: "Librarians trade emeralds for books and enchanted books!"
  },
  {
    id: 16,
    question: "How many different wood types are there?",
    options: ["6", "8", "10", "12"],
    correctAnswer: 2,
    explanation: "There are 10 different wood types: Oak, Spruce, Birch, Jungle, Acacia, Dark Oak, Crimson, Warped, Mangrove, and Cherry!"
  },
  {
    id: 17,
    question: "What happens when you name a sheep 'jeb_'?",
    options: ["It becomes faster", "It changes colors", "It gives more wool", "It becomes friendly"],
    correctAnswer: 1,
    explanation: "Naming a sheep 'jeb_' makes it cycle through rainbow colors!"
  },
  {
    id: 18,
    question: "Which tool is most effective against stone?",
    options: ["Axe", "Pickaxe", "Shovel", "Sword"],
    correctAnswer: 1,
    explanation: "Pickaxes are designed for mining stone and ore blocks!"
  },
  {
    id: 19,
    question: "What is the crafting recipe pattern for a sword?",
    options: ["Horizontal line", "Vertical line", "L-shape", "T-shape"],
    correctAnswer: 1,
    explanation: "Swords are crafted with materials in a vertical line with a stick handle!"
  },
  {
    id: 20,
    question: "Which boss drops the most XP?",
    options: ["Ender Dragon", "Wither", "Elder Guardian", "Warden"],
    correctAnswer: 0,
    explanation: "The Ender Dragon drops 12,000 XP when first defeated!"
  },
  {
    id: 21,
    question: "Which mob can be tamed using bones?",
    options: ["Cat", "Wolf", "Parrot", "Fox"],
    correctAnswer: 1,
    explanation: "Wolves can be tamed with bones and become loyal dogs!"
  },
  {
    id: 22,
    question: "What do Creepers drop when killed?",
    options: ["Gunpowder", "TNT", "Coal", "Slimeballs"],
    correctAnswer: 0,
    explanation: "Creepers drop Gunpowder, which can be used to make TNT or fireworks!"
  },
  {
    id: 23,
    question: "Which item is needed to craft a brewing stand?",
    options: ["Blaze Rod", "Ghast Tear", "Magma Cream", "End Rod"],
    correctAnswer: 0,
    explanation: "A Blaze Rod is required to craft a Brewing Stand for making potions!"
  },
  {
    id: 24,
    question: "What is the effect of eating a Chorus Fruit?",
    options: ["Gives regeneration", "Random teleport", "Restores full hunger", "Grants invisibility"],
    correctAnswer: 1,
    explanation: "Chorus Fruit randomly teleports you a few blocks when eaten!"
  },
  {
    id: 25,
    question: "Which enchantment prevents you from dying in lava?",
    options: ["Fire Protection", "Flame", "Respiration", "Feather Falling"],
    correctAnswer: 0,
    explanation: "Fire Protection reduces fire and lava damage, making survival easier!"
  },
  {
    id: 26,
    question: "What item do you need to enter the Nether?",
    options: ["Flint and Steel", "Torch", "Redstone", "Beacon"],
    correctAnswer: 0,
    explanation: "Flint and Steel is used to light the Nether Portal made of obsidian!"
  },
  {
    id: 27,
    question: "Which fish can be used to tame a cat?",
    options: ["Cod", "Pufferfish", "Salmon", "Tropical Fish"],
    correctAnswer: 2,
    explanation: "Cats are usually tamed with raw Salmon or raw Cod!"
  },
  {
    id: 28,
    question: "Which mob is immune to lava and fire?",
    options: ["Zombie Pigman", "Blaze", "Magma Cube", "All of the above"],
    correctAnswer: 3,
    explanation: "Zombie Pigmen, Blazes, and Magma Cubes are all immune to fire and lava!"
  },
  {
    id: 29,
    question: "Which block can transport players upward like an elevator?",
    options: ["Soul Sand", "Magma Block", "Slime Block", "Honey Block"],
    correctAnswer: 0,
    explanation: "Soul Sand with water creates bubble columns that push players upward!"
  },
  {
    id: 30,
    question: "Which music disc is considered the rarest?",
    options: ["Cat", "Pigstep", "Ward", "13"],
    correctAnswer: 1,
    explanation: "Pigstep is the rarest disc, only found in Bastion Remnants in the Nether!"
  },
  {
    id: 31,
    question: "What effect does a Golden Apple give?",
    options: ["Speed", "Regeneration", "Night Vision", "Levitation"],
    correctAnswer: 1,
    explanation: "Golden Apples give Regeneration and Absorption effects!"
  },
  {
    id: 32,
    question: "Which mob explodes when close to players?",
    options: ["Creeper", "Ghast", "Slime", "Phantom"],
    correctAnswer: 0,
    explanation: "Creepers are infamous for silently sneaking up and exploding!"
  },
  {
    id: 33,
    question: "What is required to respawn the Ender Dragon?",
    options: ["Dragon Egg", "Ender Pearls", "End Crystals", "Obsidian"],
    correctAnswer: 2,
    explanation: "You need four End Crystals placed around the portal to respawn the Ender Dragon!"
  },
  {
    id: 34,
    question: "What happens if you sleep in the Nether?",
    options: ["You set spawn", "Nothing", "The bed explodes", "You teleport to Overworld"],
    correctAnswer: 2,
    explanation: "Beds explode if used in the Nether or the End!"
  },
  {
    id: 35,
    question: "Which block is needed to craft a Jack o’ Lantern?",
    options: ["Pumpkin + Torch", "Pumpkin + Glowstone", "Pumpkin + Redstone", "Pumpkin + Lantern"],
    correctAnswer: 0,
    explanation: "A carved Pumpkin combined with a Torch makes a Jack o’ Lantern!"
  },
  {
    id: 36,
    question: "What is the durability of a Netherite Pickaxe?",
    options: ["1561", "2031", "3122", "4096"],
    correctAnswer: 1,
    explanation: "A Netherite Pickaxe has 2031 durability, the highest of all pickaxes!"
  },
  {
    id: 37,
    question: "Which mob can fly through walls?",
    options: ["Bat", "Phantom", "Vex", "Ghast"],
    correctAnswer: 2,
    explanation: "Vexes, summoned by Evokers, can fly and phase through walls!"
  },
  {
    id: 38,
    question: "What is the rarest naturally spawning structure?",
    options: ["Woodland Mansion", "Ocean Monument", "Stronghold", "Igloo"],
    correctAnswer: 0,
    explanation: "Woodland Mansions are the rarest and only spawn in Dark Forest biomes!"
  },
  {
    id: 39,
    question: "Which enchantment increases block drops?",
    options: ["Looting", "Silk Touch", "Fortune", "Efficiency"],
    correctAnswer: 2,
    explanation: "Fortune increases the number of items dropped from ores and blocks!"
  },
  {
    id: 40,
    question: "Which hostile mob burns in sunlight?",
    options: ["Zombie", "Creeper", "Spider", "Slime"],
    correctAnswer: 0,
    explanation: "Zombies burn in sunlight unless wearing a helmet or in shade!"
  }

];

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  // Shuffle questions on component mount
  useEffect(() => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled.slice(0, 10)); // Use 10 random questions
  }, []);

  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answerIndex);
    setShowResult(true);

    if (answerIndex === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      setShowExplanation(true);
    }, 1000);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setShowExplanation(false);
    } else {
      setGameFinished(true);
    }
  };

  const resetGame = () => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled.slice(0, 10));
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setShowExplanation(false);
    setScore(0);
    setGameFinished(false);
  };

  const getScoreColor = () => {
    const percentage = (score / shuffledQuestions.length) * 100;
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreMessage = () => {
    const percentage = (score / shuffledQuestions.length) * 100;
    if (percentage === 100) return "Perfect! You're a true Minecraft Master! 🏆";
    if (percentage >= 80) return "Excellent! You know your Minecraft well! ⭐";
    if (percentage >= 60) return "Good job! Keep exploring and learning! 👍";
    if (percentage >= 40) return "Not bad! Time for more Minecraft adventures! 🎮";
    return "Keep playing and you'll get better! Never give up! 💪";
  };

  if (shuffledQuestions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white text-xl">
        Loading Minecraft Quiz...
      </div>
    );
  }

  if (gameFinished) {
    return (
      <div
        className="min-h-screen relative flex items-center justify-center p-4 bg-cover bg-center"
        style={{ backgroundImage: "url('/image.png')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative bg-stone-700 border-4 border-stone-600 p-8 rounded-lg shadow-2xl max-w-md w-full text-center">
          <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4 font-mono">Quiz Complete!</h2>

          <div className="bg-stone-800 border-2 border-stone-600 p-6 rounded-lg mb-6">
            <div className={`text-4xl font-bold mb-2 font-mono ${getScoreColor()}`}>
              {score}/{shuffledQuestions.length}
            </div>
            <div className="text-gray-300 text-lg mb-3">
              {Math.round((score / shuffledQuestions.length) * 100)}% Correct
            </div>
            <div className="text-green-300 text-sm font-semibold">
              {getScoreMessage()}
            </div>
          </div>

          <button
            onClick={resetGame}
            className="bg-green-600 hover:bg-green-500 border-2 border-green-500 text-white px-8 py-3 rounded-lg font-bold text-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg font-mono flex items-center justify-center gap-2 mx-auto"
          >
            <RotateCcw className="w-5 h-5" />
            Play Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen relative flex items-center justify-center p-4 bg-cover bg-center"
      style={{ backgroundImage: "url('/image.png')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Quiz Card */}
      <div className="relative bg-stone-700 border-4 border-stone-600 p-6 rounded-lg shadow-2xl max-w-2xl w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Gamepad2 className="w-8 h-8 text-green-400" />
            <h1 className="text-2xl font-bold text-white font-mono">Minecraft Quiz</h1>
          </div>
          <div className="flex items-center gap-4 text-white">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-400" />
              <span className="font-mono">{score}/{shuffledQuestions.length}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-300 mb-2">
            <span>Question {currentQuestionIndex + 1} of {shuffledQuestions.length}</span>
            <span>{Math.round(((currentQuestionIndex + 1) / shuffledQuestions.length) * 100)}% Complete</span>
          </div>
          <div className="bg-stone-800 border-2 border-stone-600 h-4 rounded-lg overflow-hidden">
            <div
              className="bg-gradient-to-r from-green-500 to-green-400 h-full transition-all duration-500 ease-out"
              style={{ width: `${((currentQuestionIndex + 1) / shuffledQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="bg-stone-800 border-2 border-stone-600 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-bold text-white mb-6 leading-relaxed font-mono">
            {currentQuestion.question}
          </h2>

          {/* Answer Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              let buttonClass = "w-full p-4 text-left rounded-lg border-2 transition-all duration-200 font-bold font-mono transform hover:scale-[1.02] active:scale-98";

              if (selectedAnswer === null) {
                buttonClass += " bg-stone-600 border-stone-500 text-white hover:bg-stone-500 hover:border-stone-400";
              } else if (index === currentQuestion.correctAnswer) {
                buttonClass += " bg-green-600 border-green-500 text-white shadow-lg";
              } else if (index === selectedAnswer && index !== currentQuestion.correctAnswer) {
                buttonClass += " bg-red-600 border-red-500 text-white shadow-lg";
              } else {
                buttonClass += " bg-stone-600 border-stone-500 text-gray-400";
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={buttonClass}
                  disabled={selectedAnswer !== null}
                >
                  <span className="text-green-300 mr-3">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        {/* Result Message */}
        {showResult && (
          <div className={`p-4 rounded-lg mb-4 border-2 transition-all duration-500 ${selectedAnswer === currentQuestion.correctAnswer
            ? 'bg-green-800 border-green-600 text-green-200'
            : 'bg-red-800 border-red-600 text-red-200'
            }`}>
            <div className="font-bold text-lg font-mono">
              {selectedAnswer === currentQuestion.correctAnswer ? '✅ Correct!' : '❌ Incorrect!'}
            </div>
            {showExplanation && (
              <div className="mt-2 text-sm opacity-90">
                {currentQuestion.explanation}
              </div>
            )}
          </div>
        )}

        {/* Next Button */}
        {showExplanation && (
          <div className="flex justify-center">
            <button
              onClick={handleNextQuestion}
              className="bg-blue-600 hover:bg-blue-500 border-2 border-blue-500 text-white px-8 py-3 rounded-lg font-bold text-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg font-mono"
            >
              {currentQuestionIndex < shuffledQuestions.length - 1 ? 'Next Question →' : 'View Results →'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
