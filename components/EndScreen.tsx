
import React from 'react';
import { GameState } from '../types';

interface EndScreenProps {
  status: GameState.WON | GameState.LOST;
  word: string;
  onPlayAgain: () => void;
}

const EndScreen: React.FC<EndScreenProps> = ({ status, word, onPlayAgain }) => {
  const isWinner = status === GameState.WON;
  const title = isWinner ? 'You Won!' : 'Game Over!';
  const message = isWinner
    ? "Congratulations, you guessed the word!"
    : "Better luck next time! The word was:";

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-80 flex items-center justify-center p-4 z-50">
      <div className={`bg-gray-800 rounded-2xl p-8 md:p-12 text-center shadow-2xl border-4 ${isWinner ? 'border-green-500' : 'border-red-500'}`}>
        <h1 className={`text-5xl font-bold mb-4 ${isWinner ? 'text-green-400' : 'text-red-400'}`}>
          {title}
        </h1>
        <p className="text-xl text-gray-300 mb-6">{message}</p>
        <p className="text-4xl font-bold text-cyan-400 uppercase tracking-widest mb-8 font-mono bg-gray-700 p-4 rounded-lg">
          {word}
        </p>
        <button
          onClick={onPlayAgain}
          className="bg-pink-600 text-white font-bold py-3 px-8 rounded-lg text-2xl hover:bg-pink-700 focus:outline-none focus:ring-4 focus:ring-pink-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default EndScreen;
