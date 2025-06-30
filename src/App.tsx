import React, { useState, useEffect } from 'react';
import { Character, GameState, Language } from './types/Character';
import { CharacterSearch } from './components/CharacterSearch';
import { GuessResult } from './components/GuessResult';
import { CluesPanel } from './components/CluesPanel';
import { GameResult } from './components/GameResult';
import { GameStats } from './components/GameStats';
import { LanguageToggle } from './components/LanguageToggle';
import { getRandomCharacter, compareGuess, getClues } from './utils/gameLogic';
import { translations } from './utils/translations';
import charactersData from './data/characters.json';

function App() {
  const [language, setLanguage] = useState<Language>('fr');
  const [gameState, setGameState] = useState<GameState>({
    currentCharacter: null,
    guesses: [],
    isGameWon: false,
    isGameLost: false,
    cluesRevealed: 0,
    maxGuesses: 6,
  });

  const [clues, setClues] = useState<string[]>([]);
  const [guessComparisons, setGuessComparisons] = useState<any[]>([]);

  const t = translations[language];

  // Initialize game
  useEffect(() => {
    initializeGame();
  }, []);

  // Update clues when cluesRevealed changes or language changes
  useEffect(() => {
    if (gameState.currentCharacter) {
      setClues(getClues(gameState.currentCharacter, gameState.cluesRevealed, language));
    }
  }, [gameState.currentCharacter, gameState.cluesRevealed, language]);

  // Update guess comparisons when language changes
  useEffect(() => {
    if (gameState.currentCharacter && guessComparisons.length > 0) {
      const updatedComparisons = guessComparisons.map(result => ({
        ...result,
        comparison: compareGuess(result.character, gameState.currentCharacter, language)
      }));
      setGuessComparisons(updatedComparisons);
    }
  }, [language, gameState.currentCharacter]);

  const initializeGame = () => {
    const character = getRandomCharacter(charactersData as Character[]);
    setGameState({
      currentCharacter: character,
      guesses: [],
      isGameWon: false,
      isGameLost: false,
      cluesRevealed: 0,
      maxGuesses: 6,
    });
    setClues([]);
    setGuessComparisons([]);
  };

  const handleGuess = (guessedCharacter: Character) => {
    if (!gameState.currentCharacter || gameState.isGameWon || gameState.isGameLost) {
      return;
    }

    const isCorrect = guessedCharacter.nomFichier === gameState.currentCharacter.nomFichier;
    const newGuesses = [...gameState.guesses, guessedCharacter];
    const comparison = compareGuess(guessedCharacter, gameState.currentCharacter, language);
    
    setGuessComparisons(prev => [...prev, { character: guessedCharacter, comparison }]);

    const newGameState = {
      ...gameState,
      guesses: newGuesses,
      isGameWon: isCorrect,
      isGameLost: !isCorrect && newGuesses.length >= gameState.maxGuesses,
    };

    setGameState(newGameState);
  };

  const handleRevealClue = () => {
    if (gameState.cluesRevealed < 9 && !gameState.isGameWon && !gameState.isGameLost) {
      setGameState(prev => ({
        ...prev,
        cluesRevealed: prev.cluesRevealed + 1,
      }));
    }
  };

  const handleRestart = () => {
    initializeGame();
  };

  const formatDate = () => {
    const today = new Date();
    return today.toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header with Language Toggle */}
        <div className="flex justify-between items-start mb-8">
          <div className="text-center flex-1">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
              {t.title}
            </h1>
            <p className="text-lg text-gray-300 mb-1">
              {t.subtitle}
            </p>
            <p className="text-sm text-gray-400 capitalize">
              {formatDate()}
            </p>
          </div>
          <div className="ml-4">
            <LanguageToggle currentLanguage={language} onLanguageChange={setLanguage} />
          </div>
        </div>

        {/* Game Stats */}
        <GameStats
          guessCount={gameState.guesses.length}
          maxGuesses={gameState.maxGuesses}
          cluesRevealed={gameState.cluesRevealed}
          language={language}
        />

        {/* Clues Panel */}
        <CluesPanel
          clues={clues}
          onRevealClue={handleRevealClue}
          canRevealMore={gameState.cluesRevealed < 9 && !gameState.isGameWon && !gameState.isGameLost}
          language={language}
        />

        {/* Search Input */}
        {!gameState.isGameWon && !gameState.isGameLost && (
          <div className="mb-8">
            <CharacterSearch
              characters={charactersData as Character[]}
              onSelect={handleGuess}
              disabled={gameState.isGameWon || gameState.isGameLost}
              placeholder={t.guessPlaceholder}
            />
          </div>
        )}

        {/* Guess Results */}
        <div className="space-y-4">
          {guessComparisons.map((result, index) => (
            <GuessResult
              key={index}
              comparisons={result.comparison}
              characterName={result.character.nomFichier}
            />
          ))}
        </div>

        {/* Game Result Modal */}
        {(gameState.isGameWon || gameState.isGameLost) && gameState.currentCharacter && (
          <GameResult
            isWon={gameState.isGameWon}
            character={gameState.currentCharacter}
            guessCount={gameState.guesses.length}
            onRestart={handleRestart}
            language={language}
          />
        )}
      </div>
    </div>
  );
}

export default App;