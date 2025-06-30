import React from 'react';
import { Lightbulb, Check, X, Minus } from 'lucide-react';
import { Language } from '../types/Character';
import { translations } from '../utils/translations';

interface CluesPanelProps {
  clues: string[];
  onRevealClue: () => void;
  canRevealMore: boolean;
  language: Language;
}

export const CluesPanel: React.FC<CluesPanelProps> = ({ clues, onRevealClue, canRevealMore, language }) => {
  const t = translations[language];

  const getClueStatus = (index: number) => {
    // This is just for demonstration - in a real game you'd track which clues were helpful
    if (index < 3) return 'correct';
    if (index < 6) return 'partial';
    return 'wrong';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'correct':
        return <Check className="w-4 h-4 text-white" />;
      case 'partial':
        return <Minus className="w-4 h-4 text-white" />;
      default:
        return <X className="w-4 h-4 text-white" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'correct':
        return 'bg-green-600';
      case 'partial':
        return 'bg-yellow-600';
      default:
        return 'bg-red-600';
    }
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white flex items-center">
          <Lightbulb className="w-6 h-6 mr-2 text-yellow-400" />
          {t.clues}
        </h2>
        {canRevealMore && (
          <button
            onClick={onRevealClue}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-md"
          >
            {t.revealClue}
          </button>
        )}
      </div>

      {clues.length === 0 ? (
        <p className="text-gray-400 italic">
          {t.noCluesRevealed}
        </p>
      ) : (
        <div className="space-y-3">
          {clues.map((clue, index) => {
            const status = getClueStatus(index);
            return (
              <div key={index} className="flex items-start">
                <span className={`${getStatusColor(status)} text-white text-sm font-medium px-2 py-1 rounded-full mr-3 mt-0.5 shadow-sm flex items-center justify-center min-w-[2rem]`}>
                  {getStatusIcon(status)}
                </span>
                <p className="text-gray-300 flex-1">{clue}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};