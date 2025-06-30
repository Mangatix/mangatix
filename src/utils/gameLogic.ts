import { Character } from '../types/Character';

export const getRandomCharacter = (characters: Character[]): Character => {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const index = seed % characters.length;
  return characters[index];
};

export const getCharacterImageUrl = (nomFichier: string): string => {
  // Try different possible image formats and naming conventions
  const possibleNames = [
    nomFichier,
    nomFichier.charAt(0).toUpperCase() + nomFichier.slice(1),
    nomFichier.replace(/([a-z])([A-Z])/g, '$1_$2'),
    nomFichier.replace(/([a-z])([A-Z])/g, '$1 $2'),
  ];
  
  // For now, return the first format - in a real app you'd check which exists
  const formattedName = nomFichier.replace(/([a-z])([A-Z])/g, '$1_$2');
  return `/images/characters/${formattedName}.webp`;
};

export const compareGuess = (guess: Character, correct: Character) => {
  const comparisons = [
    {
      field: 'Univers' as keyof Character,
      label: 'Univers',
      playerValue: guess.Univers,
      correctValue: correct.Univers,
      isCorrect: guess.Univers === correct.Univers,
    },
    {
      field: 'Genre' as keyof Character,
      label: 'Genre',
      playerValue: guess.Genre,
      correctValue: correct.Genre,
      isCorrect: guess.Genre === correct.Genre,
    },
    {
      field: 'Age' as keyof Character,
      label: 'Âge',
      playerValue: guess.Age,
      correctValue: correct.Age,
      isCorrect: guess.Age === correct.Age,
      isPartial: Math.abs(parseInt(guess.Age) - parseInt(correct.Age)) <= 5,
    },
    {
      field: 'Taille' as keyof Character,
      label: 'Taille',
      playerValue: guess.Taille,
      correctValue: correct.Taille,
      isCorrect: guess.Taille === correct.Taille,
      isPartial: Math.abs(parseInt(guess.Taille) - parseInt(correct.Taille)) <= 10,
    },
    {
      field: 'Cheveux' as keyof Character,
      label: 'Cheveux',
      playerValue: guess.Cheveux,
      correctValue: correct.Cheveux,
      isCorrect: guess.Cheveux === correct.Cheveux,
    },
    {
      field: 'TypePouvoir' as keyof Character,
      label: 'Pouvoir',
      playerValue: guess.TypePouvoir,
      correctValue: correct.TypePouvoir,
      isCorrect: guess.TypePouvoir === correct.TypePouvoir,
    },
    {
      field: 'Espece' as keyof Character,
      label: 'Espèce',
      playerValue: guess.Espece,
      correctValue: correct.Espece,
      isCorrect: guess.Espece === correct.Espece,
    },
    {
      field: 'Affiliation' as keyof Character,
      label: 'Affiliation',
      playerValue: guess.Affiliation,
      correctValue: correct.Affiliation,
      isCorrect: guess.Affiliation === correct.Affiliation,
    },
    {
      field: 'Statut' as keyof Character,
      label: 'Statut',
      playerValue: guess.Statut,
      correctValue: correct.Statut,
      isCorrect: guess.Statut === correct.Statut,
    },
  ];

  return comparisons;
};

export const getClues = (character: Character, cluesRevealed: number): string[] => {
  const allClues = [
    `Ce personnage vient de l'univers ${character.Univers}`,
    `C'est un${character.Genre === 'Femme' ? 'e' : ''} ${character.Genre.toLowerCase()}`,
    `Il/Elle a ${character.Age} ans`,
    `Sa taille est de ${character.Taille}cm`,
    `Ses cheveux sont ${character.Cheveux.toLowerCase()}`,
    `Son type de pouvoir est ${character.TypePouvoir}`,
    `Son espèce est ${character.Espece}`,
    `Son affiliation est ${character.Affiliation}`,
    `Son statut est ${character.Statut}`,
  ];

  return allClues.slice(0, cluesRevealed);
};