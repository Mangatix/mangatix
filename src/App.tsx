import React, { useState, useEffect } from 'react';
import { Character, GameState, Language } from './types/Character';
import { CharacterSearch } from './components/CharacterSearch';
import { GuessResult } from './components/GuessResult';
import { GameResult } from './components/GameResult';
import { LanguageToggle } from './components/LanguageToggle';
import { getRandomCharacter, compareGuess } from './utils/gameLogic';
import { translations } from './utils/translations';
import charactersData from './data/characters.json';

function App() {
  const [language, setLanguage] = useState<Language>('fr');
  const [gameState, setGameState] = useState<GameState>({
    currentCharacter: null,
    guesses: [],
    isGameWon: false,
    isGameLost: false,
    maxGuesses: 0, // Unlimited guesses
  });

  const [guessComparisons, setGuessComparisons] = useState<any[]>([]);

  const t = translations[language];

  // Initialize game
  useEffect(() => {
    initializeGame();
  }, []);

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
      maxGuesses: 0, // Unlimited guesses
    });
    setGuessComparisons([]);
  };

  const handleGuess = (guessedCharacter: Character) => {
    if (!gameState.currentCharacter || gameState.isGameWon) {
      return;
    }

    const isCorrect = guessedCharacter.nomFichier === gameState.currentCharacter.nomFichier;
    const newGuesses = [...gameState.guesses, guessedCharacter];
    const comparison = compareGuess(guessedCharacter, gameState.currentCharacter, language);
    
    // Add new guess at the beginning of the array (top of the list)
    setGuessComparisons(prev => [{ character: guessedCharacter, comparison }, ...prev]);

    const newGameState = {
      ...gameState,
      guesses: newGuesses,
      isGameWon: isCorrect,
      isGameLost: false, // Never lose with unlimited tries
    };

    setGameState(newGameState);
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

  const handleYouTubeClick = () => {
    window.open('https://www.youtube.com/@YourChannelName', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header with YouTube Channel Link and Language Toggle */}
        <div className="flex justify-between items-start mb-8">
          {/* YouTube Channel Link */}
          <div className="flex-shrink-0">
            <button
              onClick={handleYouTubeClick}
              className="group relative overflow-hidden rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/25"
              aria-label="Visit YouTube Channel"
            >
              <img
                src="/images/PP.webp"
                alt="YouTube Channel"
                className="w-16 h-16 rounded-full border-2 border-gray-600 group-hover:border-purple-400 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Title Section */}
          <div className="text-center flex-1 mx-8">
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

          {/* Language Toggle */}
          <div className="flex-shrink-0">
            <LanguageToggle currentLanguage={language} onLanguageChange={setLanguage} />
          </div>
        </div>

        {/* Game Stats */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-xl p-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{gameState.guesses.length}</div>
            <div className="text-sm text-gray-300">{t.attempts}</div>
          </div>
        </div>

        {/* Search Input */}
        {!gameState.isGameWon && (
          <div className="mb-8">
            <CharacterSearch
              characters={charactersData as Character[]}
              onSelect={handleGuess}
              disabled={gameState.isGameWon}
              placeholder={t.guessPlaceholder}
            />
          </div>
        )}

        {/* Guess Results */}
        <div className="space-y-4">
          {guessComparisons.map((result, index) => (
            <GuessResult
              key={`${result.character.nomFichier}-${guessComparisons.length - index}`}
              comparisons={result.comparison}
              characterName={result.character.nomFichier}
            />
          ))}
        </div>

        {/* Game Result Modal */}
        {gameState.isGameWon && gameState.currentCharacter && (
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