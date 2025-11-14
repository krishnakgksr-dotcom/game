
import React, { useState } from 'react';
import Spinner from './Spinner';

interface GameScreenProps {
  category: string;
  wordToGuess: string;
  clues: string[];
  guessesLeft: number;
  onGuess: (guess: string) => void;
  onGetClue: () => void;
  isClueLoading: boolean;
  lastGuessStatus: 'correct' | 'incorrect' | null;
}

const GameScreen: React.FC<GameScreenProps> = ({
  category,
  wordToGuess,
  clues,
  guessesLeft,
  onGuess,
  onGetClue,
  isClueLoading,
  lastGuessStatus
}) => {
  const [inputValue, setInputValue] = useState('');

  const maskedWord = wordToGuess
    .split('')
    .map((char) => (char === ' ' ? ' ' : '_'))
    .join('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onGuess(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-3xl text-center">
        <p className="text-cyan-400 text-xl mb-2">Category: {category}</p>
        <div className="mb-6">
            <p className="text-5xl md:text-7xl font-bold tracking-[0.3em] text-white uppercase font-mono">
                {maskedWord}
            </p>
            <p className="text-gray-400 mt-2 text-lg">{wordToGuess.length} letters</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg mb-6 text-left min-h-[150px]">
          <h2 className="text-2xl font-bold text-pink-500 mb-3">Clues</h2>
          <ul className="space-y-2 list-disc list-inside text-gray-300">
            {clues.map((clue, index) => (
              <li key={index}>{clue}</li>
            ))}
          </ul>
        </div>
        
        <form onSubmit={handleSubmit} className="mb-6">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full max-w-sm text-center bg-gray-700 text-white text-2xl p-3 rounded-lg border-2 border-gray-600 focus:outline-none focus:border-pink-500 transition-colors"
            placeholder="Enter your guess"
          />
          <button type="submit" className="mt-4 w-full max-w-sm bg-cyan-600 text-white font-bold py-3 px-4 rounded-lg text-xl hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out transform hover:scale-105">
            Guess
          </button>
        </form>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
                onClick={onGetClue}
                disabled={isClueLoading}
                className="w-full max-w-sm h-14 bg-gray-600 text-white font-bold py-3 px-4 rounded-lg text-xl hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out transform hover:scale-105 disabled:bg-gray-500 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center"
            >
                {isClueLoading ? <Spinner /> : 'Get a New Clue'}
            </button>
            <p className="text-xl text-pink-500 font-bold">Guesses Left: {guessesLeft}</p>
        </div>
        {lastGuessStatus && (
          <p className={`mt-4 text-xl font-bold ${lastGuessStatus === 'incorrect' ? 'text-red-500' : 'text-green-500'}`}>
            {lastGuessStatus === 'incorrect' ? 'Incorrect guess!' : ''}
          </p>
        )}
      </div>
    </div>
  );
};

export default GameScreen;
