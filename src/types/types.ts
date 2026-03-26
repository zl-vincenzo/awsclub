export interface Question {
  id: number;
  question: string;
  hint: string;
  correctAnswer: string;
}

export interface Round {
  id: number;
  title: string;
  description: string;
  storyIntro: string;
  storyOutro: string;
  questions: Question[];
}

export interface QuizData {
  rounds: Round[];
}

export const GameStatus = {
  LANDING: "LANDING",
  STORY_INTRO: "STORY_INTRO",
  PLAYING: "PLAYING",
  STORY_OUTRO: "STORY_OUTRO",
  GAME_OVER: "GAME_OVER",
  GAME_WON: "GAME_WON",
} as const;

export type GameStatus = (typeof GameStatus)[keyof typeof GameStatus];

export interface RoundTime {
  round: number;
  title: string;
  timeSeconds: number;
}

export interface QuizState {
  status: GameStatus;
  currentRound: number;
  currentQuestion: number;
  score: number;
  startTime: number;
  roundStartTime: number;
  roundTimes: RoundTime[];
  totalTimeSeconds: number;
}
