import { Character, Language } from '../types/Character';
import { translations } from './translations';

export const getRandomCharacter = (characters: Character[]): Character => {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const index = seed % characters.length;
  return characters[index];
};

export const getCharacterImageUrl = (nomFichier: string): string => {
  // Convert underscore format to proper capitalized format for image names
  const formattedName = nomFichier
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('_');
  
  return `/images/characters/${formattedName}.webp`;
};

export const compareGuess = (guess: Character, correct: Character, language: Language) => {
  const t = translations[language];
  
  const comparisons = [
    {
      field: 'Univers' as keyof Character,
      label: t.labels.Univers,
      playerValue: guess.Univers,
      correctValue: correct.Univers,
      isCorrect: guess.Univers === correct.Univers,
    },
    {
      field: 'Genre' as keyof Character,
      label: t.labels.Genre,
      playerValue: guess.Genre,
      correctValue: correct.Genre,
      isCorrect: guess.Genre === correct.Genre,
    },
    {
      field: 'Age' as keyof Character,
      label: t.labels.Age,
      playerValue: guess.Age,
      correctValue: correct.Age,
      isCorrect: guess.Age === correct.Age,
      isPartial: Math.abs(parseInt(guess.Age) - parseInt(correct.Age)) <= 5,
    },
    {
      field: 'Taille' as keyof Character,
      label: t.labels.Taille,
      playerValue: guess.Taille,
      correctValue: correct.Taille,
      isCorrect: guess.Taille === correct.Taille,
      isPartial: Math.abs(parseInt(guess.Taille) - parseInt(correct.Taille)) <= 10,
    },
    {
      field: 'Cheveux' as keyof Character,
      label: t.labels.Cheveux,
      playerValue: guess.Cheveux,
      correctValue: correct.Cheveux,
      isCorrect: guess.Cheveux === correct.Cheveux,
    },
    {
      field: 'TypePouvoir' as keyof Character,
      label: t.labels.TypePouvoir,
      playerValue: guess.TypePouvoir,
      correctValue: correct.TypePouvoir,
      isCorrect: guess.TypePouvoir === correct.TypePouvoir,
    },
    {
      field: 'Espece' as keyof Character,
      label: t.labels.Espece,
      playerValue: guess.Espece,
      correctValue: correct.Espece,
      isCorrect: guess.Espece === correct.Espece,
    },
    {
      field: 'Affiliation' as keyof Character,
      label: t.labels.Affiliation,
      playerValue: guess.Affiliation,
      correctValue: correct.Affiliation,
      isCorrect: guess.Affiliation === correct.Affiliation,
    },
    {
      field: 'Statut' as keyof Character,
      label: t.labels.Statut,
      playerValue: guess.Statut,
      correctValue: correct.Statut,
      isCorrect: guess.Statut === correct.Statut,
    },
  ];

  return comparisons;
};

export const getClues = (character: Character, cluesRevealed: number, language: Language): string[] => {
  const t = translations[language];
  
  const allClues = [
    `${t.clueTemplates.universe} ${character.Univers}`,
    `${t.clueTemplates.gender}${character.Genre === 'Femme' ? 'e' : ''} ${character.Genre.toLowerCase()}`,
    `${t.clueTemplates.age} ${character.Age} ${language === 'fr' ? 'ans' : 'years old'}`,
    `${t.clueTemplates.height} ${character.Taille}cm`,
    `${t.clueTemplates.hair} ${character.Cheveux.toLowerCase()}`,
    `${t.clueTemplates.power} ${character.TypePouvoir}`,
    `${t.clueTemplates.species} ${character.Espece}`,
    `${t.clueTemplates.affiliation} ${character.Affiliation}`,
    `${t.clueTemplates.status} ${character.Statut}`,
  ];

  return allClues.slice(0, cluesRevealed);
};

export const formatCharacterName = (nomFichier: string): string => {
  return nomFichier
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};