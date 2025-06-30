import React from 'react';
import { ClueComparison } from '../types/Character';
import { formatCharacterName, getCharacterImageUrl } from '../utils/gameLogic';
import { ImageOptimizer } from './ImageOptimizer';

interface GuessResultProps {
  comparisons: ClueComparison[];
  characterName: string;
}

export const GuessResult: React.FC<GuessResultProps> = ({ comparisons, characterName }) => {
  const getComparisonColor = (comparison: ClueComparison) => {
    if (comparison.isCorrect) return 'bg-green-600';
    if (comparison.isPartial) return 'bg-yellow-600';
    return 'bg-red-600';
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-xl p-6 mb-4 animate-slideInFromTop">
      <div className="flex items-center gap-6 mb-4">
        {/* Character Image with Larger Size */}
        <div className="flex-shrink-0 animate-fadeInScale">
          <ImageOptimizer
            src={getCharacterImageUrl(characterName)}
            alt={formatCharacterName(characterName)}
            className="w-24 h-24 object-cover rounded-lg border-2 border-gray-600 shadow-md"
            loading="eager"
          />
        </div>
        
        {/* Character Name with Better Text Handling */}
        <div className="flex-1 min-w-0 overflow-hidden">
          <h3 className="font-bold text-xl text-white animate-fadeInRight leading-tight break-words hyphens-auto" style={{ wordBreak: 'break-word' }}>
            {formatCharacterName(characterName)}
          </h3>
        </div>
      </div>
      
      {/* Comparison Grid with Responsive Layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-9 gap-3">
        {comparisons.map((comparison, index) => (
          <div 
            key={comparison.field} 
            className="text-center animate-fadeInUp"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="text-xs font-medium text-gray-400 mb-2 leading-tight break-words hyphens-auto" style={{ wordBreak: 'break-word' }}>
              {comparison.label}
            </div>
            <div className={`${getComparisonColor(comparison)} border border-gray-600 rounded-lg p-3 flex items-center justify-center min-h-[4rem] shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg`}>
              <div className="text-white text-sm font-medium text-center leading-tight break-words hyphens-auto" style={{ wordBreak: 'break-word' }}>
                <div>{comparison.playerValue}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};