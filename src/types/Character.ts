export interface Character {
  nomFichier: string;
  Univers: string;
  Genre: string;
  Age: string;
  Taille: string;
  Cheveux: string;
  TypePouvoir: string;
  Espece: string;
  Affiliation: string;
  Statut: string;
  Difficulte: string;
}

export interface GameState {
  currentCharacter: Character | null;
  guesses: Character[];
  isGameWon: boolean;
  isGameLost: boolean;
  maxGuesses: number;
}

export interface ClueComparison {
  field: keyof Character;
  label: string;
  playerValue: string;
  correctValue: string;
  isCorrect: boolean;
  isPartial?: boolean;
}

export type Language = 'fr' | 'en';

export interface Translations {
  title: string;
  subtitle: string;
  guessPlaceholder: string;
  attempts: string;
  congratulations: string;
  tooBar: string;
  foundIn: string;
  attempt: string;
  attempts_plural: string;
  exhaustedAttempts: string;
  nextCharacterIn: string;
  replay: string;
  sameCharacter: string;
  labels: {
    Univers: string;
    Genre: string;
    Age: string;
    Taille: string;
    Cheveux: string;
    TypePouvoir: string;
    Espece: string;
    Affiliation: string;
    Statut: string;
  };
}