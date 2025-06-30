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
  cluesRevealed: number;
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
  revealClue: string;
  clues: string;
  noCluesRevealed: string;
  attempts: string;
  revealed: string;
  remaining: string;
  congratulations: string;
  tooBad: string;
  foundIn: string;
  attempt: string;
  attempts_plural: string;
  exhaustedAttempts: string;
  nextCharacterIn: string;
  replay: string;
  sameCharacter: string;
  howToPlay: string;
  instruction1: string;
  instruction2: string;
  instruction3: string;
  instruction4: string;
  instruction5: string;
  instruction6: string;
  instruction7: string;
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
  clueTemplates: {
    universe: string;
    gender: string;
    age: string;
    height: string;
    hair: string;
    power: string;
    species: string;
    affiliation: string;
    status: string;
  };
}