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