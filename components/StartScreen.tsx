
import React, { useState } from 'react';
import Spinner from './Spinner';

interface StartScreenProps {
  onStartGame: (category: string) => void;
  isLoading: boolean;
}

const categories = ["Technology", "Animals", "Food", "Movies", "Science", "History"];

const StartScreen: React.FC<StartScreenProps> = ({ onStartGame, isLoading }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <div className="max-w-2xl w-full">
        <h1 className="text-5xl md:text-7xl font-bold text-cyan-400 mb-4 tracking-wider">
          AI Word Guesser
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl mx-auto">
          The AI has a word in mind. Can you guess it with the help of its clues?
        </p>

        <div className="mb-8">
          <label htmlFor="category-select" className="block text-xl font-medium text-gray-200 mb-3">
            Choose a Category
          </label>
          <div className="relative inline-block">
            <select
              id="category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              disabled={isLoading}
              className="appearance-none w-64 bg-gray-800 border-2 border-cyan-500 text-white py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-gray-700 focus:border-cyan-300 text-center text-lg"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-cyan-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>
        
        <button
          onClick={() => onStartGame(selectedCategory)}
          disabled={isLoading}
          className="w-64 h-16 bg-pink-600 text-white font-bold py-2 px-4 rounded-lg text-2xl hover:bg-pink-700 focus:outline-none focus:ring-4 focus:ring-pink-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out transform hover:scale-105 disabled:bg-gray-500 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? <Spinner size="h-10 w-10" /> : 'Start Game'}
        </button>
      </div>
    </div>
  );
};

export default StartScreen;
