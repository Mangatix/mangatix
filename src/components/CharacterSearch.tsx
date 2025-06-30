import React, { useState, useRef, useEffect } from 'react';
import { Character } from '../types/Character';
import { Search } from 'lucide-react';
import { formatCharacterName, getCharacterImageUrl } from '../utils/gameLogic';
import { ImageOptimizer } from './ImageOptimizer';

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
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (query.length > 0) {
      // Get all character names and format them
      const characterNames = characters.map(character => ({
        character,
        formattedName: formatCharacterName(character.nomFichier),
        searchName: formatCharacterName(character.nomFichier).toLowerCase()
      }));

      // Filter characters that start with the query
      const queryLower = query.toLowerCase();
      const exactMatches = characterNames.filter(({ searchName }) => 
        searchName.startsWith(queryLower)
      );

      // Also include universe matches that start with the query
      const universeMatches = characters.filter(character =>
        character.Univers.toLowerCase().startsWith(queryLower) &&
        !exactMatches.some(match => match.character.nomFichier === character.nomFichier)
      ).map(character => ({
        character,
        formattedName: formatCharacterName(character.nomFichier),
        searchName: formatCharacterName(character.nomFichier).toLowerCase()
      }));

      // Combine and sort alphabetically, limit to 10 results
      const allMatches = [...exactMatches, ...universeMatches]
        .sort((a, b) => a.formattedName.localeCompare(b.formattedName))
        .slice(0, 10);

      setFilteredCharacters(allMatches.map(match => match.character));
      setIsOpen(true);
      setSelectedIndex(-1);
    } else {
      setFilteredCharacters([]);
      setIsOpen(false);
      setSelectedIndex(-1);
    }
  }, [query, characters]);

  const handleSelect = (character: Character) => {
    onSelect(character);
    setQuery('');
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || filteredCharacters.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredCharacters.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : filteredCharacters.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < filteredCharacters.length) {
          handleSelect(filteredCharacters[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
      case 'Tab':
        // Auto-complete with the first suggestion if available
        if (filteredCharacters.length > 0) {
          e.preventDefault();
          const firstMatch = formatCharacterName(filteredCharacters[0].nomFichier);
          if (firstMatch.toLowerCase().startsWith(query.toLowerCase())) {
            setQuery(firstMatch);
            setSelectedIndex(0);
          }
        }
        break;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    // Auto-complete logic: if there's exactly one match that starts with the input
    if (value.length > 0) {
      const queryLower = value.toLowerCase();
      const exactMatches = characters.filter(character => {
        const formattedName = formatCharacterName(character.nomFichier).toLowerCase();
        return formattedName.startsWith(queryLower);
      });

      // If there's exactly one match and the user is typing forward
      if (exactMatches.length === 1 && value.length > query.length) {
        const suggestion = formatCharacterName(exactMatches[0].nomFichier);
        if (suggestion.toLowerCase().startsWith(queryLower)) {
          // Set the full suggestion and select the auto-completed part
          setTimeout(() => {
            if (inputRef.current) {
              inputRef.current.value = suggestion;
              inputRef.current.setSelectionRange(value.length, suggestion.length);
            }
          }, 0);
        }
      }
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length > 0 && setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          disabled={disabled}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none disabled:bg-gray-700 disabled:cursor-not-allowed text-lg text-white placeholder-gray-400 transition-all duration-300 hover-lift"
          autoComplete="off"
        />
      </div>

      {isOpen && filteredCharacters.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-xl max-h-60 overflow-y-auto animate-slideInFromTop">
          {filteredCharacters.map((character, index) => (
            <button
              key={character.nomFichier}
              onClick={() => handleSelect(character)}
              className={`w-full px-4 py-3 text-left border-b border-gray-600 last:border-b-0 transition-all duration-200 flex items-center gap-3 hover-lift ${
                index === selectedIndex
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-700 focus:bg-gray-700 text-white'
              }`}
              onMouseEnter={() => setSelectedIndex(index)}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Character Image with Optimization */}
              <div className="flex-shrink-0">
                <ImageOptimizer
                  src={getCharacterImageUrl(character.nomFichier)}
                  alt={formatCharacterName(character.nomFichier)}
                  className="w-12 h-12 object-cover rounded-lg border border-gray-500 shadow-sm transition-transform duration-200 hover:scale-105"
                  loading="eager"
                />
              </div>
              
              {/* Character Info */}
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">
                  {formatCharacterName(character.nomFichier)}
                </div>
                <div className="text-sm text-gray-400 truncate">
                  {character.Univers}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};