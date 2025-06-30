import React from 'react';
import { Target, Clock, Zap } from 'lucide-react';

interface GameStatsProps {
  guessCount: number;
  maxGuesses: number;
  cluesRevealed: number;
}

export const GameStats: React.FC<GameStatsProps> = ({ guessCount, maxGuesses, cluesRevealed }) => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-xl p-4 mb-6">
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="flex flex-col items-center">
          <Target className="w-6 h-6 text-blue-400 mb-2" />
          <div className="text-2xl font-bold text-white">{guessCount}</div>
          <div className="text-sm text-gray-300">Tentatives</div>
          <div className="text-xs text-gray-500">sur {maxGuesses}</div>
        </div>
        
        <div className="flex flex-col items-center">
          <Zap className="w-6 h-6 text-yellow-400 mb-2" />
          <div className="text-2xl font-bold text-white">{cluesRevealed}</div>
          <div className="text-sm text-gray-300">Indices</div>
          <div className="text-xs text-gray-500">révélés</div>
        </div>
        
        <div className="flex flex-col items-center">
          <Clock className="w-6 h-6 text-green-400 mb-2" />
          <div className="text-2xl font-bold text-white">{maxGuesses - guessCount}</div>
          <div className="text-sm text-gray-300">Restantes</div>
          <div className="text-xs text-gray-500">tentatives</div>
        </div>
      </div>
    </div>
  );
};