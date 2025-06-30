import React from 'react';
import { Target, Clock, Zap } from 'lucide-react';

interface GameStatsProps {
  guessCount: number;
  maxGuesses: number;
  cluesRevealed: number;
}

export const GameStats: React.FC<GameStatsProps> = ({ guessCount, maxGuesses, cluesRevealed }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="flex flex-col items-center">
          <Target className="w-6 h-6 text-blue-500 mb-2" />
          <div className="text-2xl font-bold text-gray-800">{guessCount}</div>
          <div className="text-sm text-gray-600">Tentatives</div>
          <div className="text-xs text-gray-500">sur {maxGuesses}</div>
        </div>
        
        <div className="flex flex-col items-center">
          <Zap className="w-6 h-6 text-yellow-500 mb-2" />
          <div className="text-2xl font-bold text-gray-800">{cluesRevealed}</div>
          <div className="text-sm text-gray-600">Indices</div>
          <div className="text-xs text-gray-500">révélés</div>
        </div>
        
        <div className="flex flex-col items-center">
          <Clock className="w-6 h-6 text-green-500 mb-2" />
          <div className="text-2xl font-bold text-gray-800">{maxGuesses - guessCount}</div>
          <div className="text-sm text-gray-600">Restantes</div>
          <div className="text-xs text-gray-500">tentatives</div>
        </div>
      </div>
    </div>
  );
};