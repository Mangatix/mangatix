import React from 'react';
import { Character, Language } from '../types/Character';
import { Trophy, X, RotateCcw } from 'lucide-react';
import { getCharacterImageUrl } from '../utils/gameLogic';
import { translations } from '../utils/translations';

interface GameResultProps {
  isWon: boolean;
  character: Character;
  guessCount: number;
  onRestart: () => void;
  language: Language;
}

export const GameResult: React.FC<GameResultProps> = ({ isWon, character, guessCount, onRestart, language }) => {
  const t = translations[language];

  const formatCharacterName = (nomFichier: string) => {
    return nomFichier
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/^./, str => str.toUpperCase());
  };

  const getTimeUntilNextGame = () => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const diff = tomorrow.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };

  const getResultMessage = () => {
    if (isWon) {
      const attemptText = guessCount === 1 ? t.attempt : t.attempts_plural;
      return `${t.foundIn} ${guessCount} ${attemptText} !`;
    }
    return t.exhaustedAttempts;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-2xl p-8 max-w-md w-full text-center">
        <div className="mb-6">
          {isWon ? (
            <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          ) : (
            <X className="w-16 h-16 text-red-400 mx-auto mb-4" />
          )}
          
          <h2 className="text-2xl font-bold mb-2 text-white">
            {isWon ? t.congratulations : t.tooBar}
          </h2>
          
          <p className="text-gray-300 mb-4">
            {getResultMessage()}
          </p>
        </div>

        <div className="mb-6">
          <img
            src={getCharacterImageUrl(character.nomFichier)}
            alt={formatCharacterName(character.nomFichier)}
            className="w-32 h-32 object-cover rounded-lg mx-auto mb-4 shadow-lg border border-gray-600"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/images/characters/placeholder.webp';
            }}
          />
          
          <h3 className="text-xl font-bold text-white mb-2">
            {formatCharacterName(character.nomFichier)}
          </h3>
          
          <p className="text-gray-400">
            {character.Univers}
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-sm text-gray-500">
            {t.nextCharacterIn} {getTimeUntilNextGame()}
          </p>
          
          <button
            onClick={onRestart}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center shadow-md"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            {t.replay} {t.sameCharacter}
          </button>
        </div>
      </div>
    </div>
  );
};