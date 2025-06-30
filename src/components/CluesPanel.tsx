import React from 'react';
import { Lightbulb } from 'lucide-react';

interface CluesPanelProps {
  clues: string[];
  onRevealClue: () => void;
  canRevealMore: boolean;
}

export const CluesPanel: React.FC<CluesPanelProps> = ({ clues, onRevealClue, canRevealMore }) => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white flex items-center">
          <Lightbulb className="w-6 h-6 mr-2 text-yellow-400" />
          Indices
        </h2>
        {canRevealMore && (
          <button
            onClick={onRevealClue}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-md"
          >
            Révéler un indice
          </button>
        )}
      </div>

      {clues.length === 0 ? (
        <p className="text-gray-400 italic">
          Aucun indice révélé. Faites une première tentative ou révélez un indice !
        </p>
      ) : (
        <div className="space-y-3">
          {clues.map((clue, index) => (
            <div key={index} className="flex items-start">
              <span className="bg-blue-600 text-blue-100 text-sm font-medium px-2 py-1 rounded-full mr-3 mt-0.5 shadow-sm">
                {index + 1}
              </span>
              <p className="text-gray-300">{clue}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};