import React from 'react';
import { ClueComparison } from '../types/Character';
import { Check, X, Minus } from 'lucide-react';

interface GuessResultProps {
  comparisons: ClueComparison[];
  characterName: string;
}

export const GuessResult: React.FC<GuessResultProps> = ({ comparisons, characterName }) => {
  const getStatusIcon = (comparison: ClueComparison) => {
    if (comparison.isCorrect) {
      return <Check className="w-5 h-5 text-white" />;
    } else if (comparison.isPartial) {
      return <Minus className="w-5 h-5 text-white" />;
    } else {
      return <X className="w-5 h-5 text-white" />;
    }
  };

  const getStatusColor = (comparison: ClueComparison) => {
    if (comparison.isCorrect) {
      return 'bg-green-600';
    } else if (comparison.isPartial) {
      return 'bg-yellow-600';
    } else {
      return 'bg-red-600';
    }
  };

  const formatCharacterName = (nomFichier: string) => {
    return nomFichier
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/^./, str => str.toUpperCase());
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-xl p-4 mb-4">
      <h3 className="font-bold text-lg mb-3 text-white">
        {formatCharacterName(characterName)}
      </h3>
      
      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2">
        {comparisons.map((comparison) => (
          <div key={comparison.field} className="text-center">
            <div className="text-xs font-medium text-gray-400 mb-1">
              {comparison.label}
            </div>
            <div
              className={`${getStatusColor(comparison)} rounded-lg p-2 flex items-center justify-center min-h-[3rem] shadow-md`}
            >
              <div className="text-white text-sm font-medium text-center">
                <div>{comparison.playerValue}</div>
                <div className="mt-1">
                  {getStatusIcon(comparison)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};