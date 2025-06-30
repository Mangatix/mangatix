import React from 'react';
import { ClueComparison } from '../types/Character';
import { formatCharacterName, getCharacterImageUrl } from '../utils/gameLogic';

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
    <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-xl p-4 mb-4">
      <div className="flex items-center gap-4 mb-3">
        {/* Character Image */}
        <div className="flex-shrink-0">
          <img
            src={getCharacterImageUrl(characterName)}
            alt={formatCharacterName(characterName)}
            className="w-16 h-16 object-cover rounded-lg border-2 border-gray-600 shadow-md"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/images/characters/placeholder.webp';
            }}
          />
        </div>
        
        {/* Character Name */}
        <h3 className="font-bold text-lg text-white">
          {formatCharacterName(characterName)}
        </h3>
      </div>
      
      {/* Comparison Grid */}
      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2">
        {comparisons.map((comparison) => (
          <div key={comparison.field} className="text-center">
            <div className="text-xs font-medium text-gray-400 mb-1">
              {comparison.label}
            </div>
            <div className={`${getComparisonColor(comparison)} border border-gray-600 rounded-lg p-2 flex items-center justify-center min-h-[3rem] shadow-md`}>
              <div className="text-white text-sm font-medium text-center">
                <div>{comparison.playerValue}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};