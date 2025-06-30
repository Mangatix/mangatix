import React from 'react';
import { Character, Language } from '../types/Character';
import { Trophy, RotateCcw, Star } from 'lucide-react';
import { getCharacterImageUrl, formatCharacterName, getRankFromAttempts, getRankFromAttemptsEN } from '../utils/gameLogic';
import { translations } from '../utils/translations';
import { ImageOptimizer } from './ImageOptimizer';

interface GameResultProps {
  isWon: boolean;
  character: Character;
  guessCount: number;
  onRestart: () => void;
  language: Language;
}

export const GameResult: React.FC<GameResultProps> = ({ isWon, character, guessCount, onRestart, language }) => {
  const t = translations[language];

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
    const attemptText = guessCount === 1 ? t.attempt : t.attempts_plural;
    return `${t.foundIn} ${guessCount} ${attemptText} !`;
  };

  const rankInfo = language === 'fr' ? getRankFromAttempts(guessCount) : getRankFromAttemptsEN(guessCount);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50 animate-fadeInScale">
      <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-2xl p-8 max-w-lg w-full text-center animate-slideInFromTop">
        <div className="mb-6">
          <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4 animate-bounce-custom" />
          
          <h2 className="text-2xl font-bold mb-2 text-white animate-fadeInRight leading-tight break-words hyphens-auto" style={{ wordBreak: 'break-word' }}>
            {t.congratulations}
          </h2>
          
          <p className="text-gray-300 mb-4 animate-fadeInUp leading-tight break-words hyphens-auto" style={{ wordBreak: 'break-word' }}>
            {getResultMessage()}
          </p>

          {/* Rank Display */}
          <div className="mb-6 animate-fadeInScale" style={{ animationDelay: '0.2s' }}>
            <div className="relative">
              {/* Rank Badge */}
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r ${rankInfo.color} shadow-lg mb-3 animate-pulse-custom`}>
                <span className="text-3xl font-bold text-white drop-shadow-lg">
                  {rankInfo.rank}
                </span>
              </div>
              
              {/* Stars for S rank */}
              {rankInfo.rank === 'S' && (
                <div className="absolute -top-2 -right-2">
                  <Star className="w-6 h-6 text-yellow-300 fill-yellow-300 animate-bounce-custom" style={{ animationDelay: '0.5s' }} />
                </div>
              )}
            </div>
            
            <div className={`text-lg font-semibold bg-gradient-to-r ${rankInfo.color} bg-clip-text text-transparent mb-2 leading-tight break-words hyphens-auto`} style={{ wordBreak: 'break-word' }}>
              {language === 'fr' ? 'Rang' : 'Rank'} {rankInfo.rank}
            </div>
            
            <p className="text-sm text-gray-400 italic leading-tight break-words hyphens-auto" style={{ wordBreak: 'break-word' }}>
              {rankInfo.description}
            </p>
          </div>
        </div>

        <div className="mb-6 animate-fadeInScale" style={{ animationDelay: '0.3s' }}>
          {/* Larger Character Image */}
          <ImageOptimizer
            src={getCharacterImageUrl(character.nomFichier)}
            alt={formatCharacterName(character.nomFichier)}
            className="w-40 h-40 object-cover rounded-lg mx-auto mb-4 shadow-lg border border-gray-600 hover:scale-105 transition-transform duration-300"
            loading="eager"
          />
          
          <h3 className="text-xl font-bold text-white mb-2 animate-fadeInUp leading-tight break-words hyphens-auto" style={{ animationDelay: '0.4s', wordBreak: 'break-word' }}>
            {formatCharacterName(character.nomFichier)}
          </h3>
          
          <p className="text-gray-400 animate-fadeInUp leading-tight break-words hyphens-auto" style={{ animationDelay: '0.5s', wordBreak: 'break-word' }}>
            {character.Univers}
          </p>
        </div>

        <div className="space-y-3 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
          <p className="text-sm text-gray-500 leading-tight break-words hyphens-auto" style={{ wordBreak: 'break-word' }}>
            {t.nextCharacterIn} {getTimeUntilNextGame()}
          </p>
          
          <button
            onClick={onRestart}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center shadow-md hover-lift leading-tight break-words hyphens-auto"
            style={{ wordBreak: 'break-word' }}
          >
            <RotateCcw className="w-5 h-5 mr-2 flex-shrink-0" />
            <span className="break-words hyphens-auto" style={{ wordBreak: 'break-word' }}>
              {t.replay} {t.sameCharacter}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};