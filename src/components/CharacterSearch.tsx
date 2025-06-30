import React, { useState, useRef, useEffect } from 'react';
import { Character } from '../types/Character';
import { Search } from 'lucide-react';
import { formatCharacterName } from '../utils/gameLogic';

interface CharacterSearchProps {
  characters: Character[];
  onSelect: (character: Character) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const CharacterSearch: React.FC<CharacterSearchProps> = ({
  characters,
  onSelect,
  disabled = false,
  placeholder = "Tapez le nom d'un personnage..."
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (query.length > 0) {
      const filtered = characters.filter(character => {
        const formattedName = formatCharacterName(character.nomFichier);
        return formattedName.toLowerCase().includes(query.toLowerCase()) ||
               character.Univers.toLowerCase().includes(query.toLowerCase());
      }).slice(0, 10);
      setFilteredCharacters(filtered);
      setIsOpen(true);
    } else {
      setFilteredCharacters([]);
      setIsOpen(false);
    }
  }, [query, characters]);

  const handleSelect = (character: Character) => {
    onSelect(character);
    setQuery('');
    setIsOpen(false);
    inputRef.current?.blur();
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length > 0 && setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          disabled={disabled}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none disabled:bg-gray-700 disabled:cursor-not-allowed text-lg text-white placeholder-gray-400"
        />
      </div>

      {isOpen && filteredCharacters.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-xl max-h-60 overflow-y-auto">
          {filteredCharacters.map((character) => (
            <button
              key={character.nomFichier}
              onClick={() => handleSelect(character)}
              className="w-full px-4 py-3 text-left hover:bg-gray-700 focus:bg-gray-700 focus:outline-none border-b border-gray-600 last:border-b-0 transition-colors"
            >
              <div className="font-medium text-white">
                {formatCharacterName(character.nomFichier)}
              </div>
              <div className="text-sm text-gray-400">
                {character.Univers}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};