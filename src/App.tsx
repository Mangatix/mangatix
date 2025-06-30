import React, { useState, useEffect } from 'react';
import { Character, GameState } from './types/Character';
import { CharacterSearch } from './components/CharacterSearch';
import { GuessResult } from './components/GuessResult';
import { CluesPanel } from './components/CluesPanel';
import { GameResult } from './components/GameResult';
import { GameStats } from './components/GameStats';
import { getRandomCharacter, compareGuess, getClues } from './utils/gameLogic';
import charactersData from './data/characters.json';

function App() {
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

  // Initialize game
  useEffect(() => {
    initializeGame();
  }, []);

  // Update clues when cluesRevealed changes
  useEffect(() => {
    if (gameState.currentCharacter) {
      setClues(getClues(gameState.currentCharacter, gameState.cluesRevealed));
    }
  }, [gameState.currentCharacter, gameState.cluesRevealed]);

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
    const comparison = compareGuess(guessedCharacter, gameState.currentCharacter);
    
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
    return today.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            MANGATIX
          </h1>
          <p className="text-lg text-gray-600 mb-1">
            Jeu de devinettes manga quotidien
          </p>
          <p className="text-sm text-gray-500 capitalize">
            {formatDate()}
          </p>
        </div>

        {/* Game Stats */}
        <GameStats
          guessCount={gameState.guesses.length}
          maxGuesses={gameState.maxGuesses}
          cluesRevealed={gameState.cluesRevealed}
        />

        {/* Clues Panel */}
        <CluesPanel
          clues={clues}
          onRevealClue={handleRevealClue}
          canRevealMore={gameState.cluesRevealed < 9 && !gameState.isGameWon && !gameState.isGameLost}
        />

        {/* Search Input */}
        {!gameState.isGameWon && !gameState.isGameLost && (
          <div className="mb-8">
            <CharacterSearch
              characters={charactersData as Character[]}
              onSelect={handleGuess}
              disabled={gameState.isGameWon || gameState.isGameLost}
              placeholder="Devinez le personnage mystère..."
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
          />
        )}

        {/* Instructions */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Comment jouer ?</h3>
          <div className="space-y-2 text-gray-600">
            <p>• Devinez le personnage manga mystère du jour</p>
            <p>• Vous avez 6 tentatives maximum</p>
            <p>• Révélez des indices pour vous aider</p>
            <p>• Les cases vertes indiquent une correspondance exacte</p>
            <p>• Les cases jaunes indiquent une correspondance partielle</p>
            <p>• Les cases rouges indiquent une mauvaise réponse</p>
            <p>• Un nouveau personnage chaque jour !</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;