import React from 'react';
import { Language } from '../types/Character';
import { Globe } from 'lucide-react';

interface LanguageToggleProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ currentLanguage, onLanguageChange }) => {
  return (
    <div className="flex items-center space-x-2 bg-gray-800 border border-gray-600 rounded-lg p-2">
      <Globe className="w-4 h-4 text-gray-400" />
      <button
        onClick={() => onLanguageChange('fr')}
        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
          currentLanguage === 'fr'
            ? 'bg-blue-600 text-white'
            : 'text-gray-300 hover:text-white hover:bg-gray-700'
        }`}
      >
        FR
      </button>
      <button
        onClick={() => onLanguageChange('en')}
        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
          currentLanguage === 'en'
            ? 'bg-blue-600 text-white'
            : 'text-gray-300 hover:text-white hover:bg-gray-700'
        }`}
      >
        EN
      </button>
    </div>
  );
};