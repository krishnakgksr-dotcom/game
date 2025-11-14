
import React, { useState, useCallback } from 'react';
import { GameState } from './types';
import { getNewGameData, getNewClue } from './services/geminiService';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import EndScreen from './components/EndScreen';

const MAX_GUESSES = 5;

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.IDLE);
  const [wordToGuess, setWordToGuess] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [clues, setClues] = useState<string[]>([]);
  const [guessesLeft, setGuessesLeft] = useState<number>(MAX_GUESSES);
  const [isClueLoading, setIsClueLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastGuessStatus, setLastGuessStatus] = useState<'correct' | 'incorrect' | null>(null);

  const handleStartGame = useCallback(async (selectedCategory: string) => {
    setGameState(GameState.LOADING);
    setError(null);
    try {
      const { word, clue } = await getNewGameData(selectedCategory);
      setWordToGuess(word);
      setClues([clue]);
      setCategory(selectedCategory);
      setGuessesLeft(MAX_GUESSES);
      setLastGuessStatus(null);
      setGameState(GameState.PLAYING);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setGameState(GameState.IDLE);
    }
  }, []);

  const handleGuess = useCallback((guess: string) => {
    if (guess.toLowerCase() === wordToGuess.toLowerCase()) {
      setLastGuessStatus('correct');
      setGameState(GameState.WON);
    } else {
      setLastGuessStatus('incorrect');
      const newGuessesLeft = guessesLeft - 1;
      setGuessesLeft(newGuessesLeft);
      if (newGuessesLeft <= 0) {
        setGameState(GameState.LOST);
      }
    }
  }, [wordToGuess, guessesLeft]);
  
  const handleGetClue = useCallback(async () => {
    setIsClueLoading(true);
    try {
      const newClue = await getNewClue(wordToGuess, category, clues);
      setClues(prevClues => [...prevClues, newClue]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not fetch a new clue');
    } finally {
      setIsClueLoading(false);
    }
  }, [wordToGuess, category, clues]);

  const handlePlayAgain = useCallback(() => {
    setGameState(GameState.IDLE);
    setWordToGuess('');
    setClues([]);
    setCategory('');
    setError(null);
  }, []);

  const renderContent = () => {
    switch (gameState) {
      case GameState.IDLE:
      case GameState.LOADING:
        return (
          <StartScreen
            onStartGame={handleStartGame}
            isLoading={gameState === GameState.LOADING}
          />
        );
      case GameState.PLAYING:
        return (
          <GameScreen
            category={category}
            wordToGuess={wordToGuess}
            clues={clues}
            guessesLeft={guessesLeft}
            onGuess={handleGuess}
            onGetClue={handleGetClue}
            isClueLoading={isClueLoading}
            lastGuessStatus={lastGuessStatus}
          />
        );
      case GameState.WON:
      case GameState.LOST:
        return <EndScreen status={gameState} word={wordToGuess} onPlayAgain={handlePlayAgain} />;
      default:
        return <p>Invalid game state.</p>;
    }
  };

  return (
    <main className="bg-gray-900 min-h-screen font-sans">
      {renderContent()}
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-600 text-white p-4 rounded-lg shadow-lg">
          <p>Error: {error}</p>
          <button onClick={() => setError(null)} className="absolute top-1 right-2 text-xl">&times;</button>
        </div>
      )}
    </main>
  );
};

export default App;
