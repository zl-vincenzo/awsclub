export interface Question {
  id: number;
  question: string;
  answerHash: string;
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
  NAME_ENTRY: "NAME_ENTRY",
  STORY_INTRO: "STORY_INTRO",
  PLAYING: "PLAYING",
  STORY_OUTRO: "STORY_OUTRO",
  GAME_OVER: "GAME_OVER",
  GAME_WON: "GAME_WON",
  LEADERBOARD: "LEADERBOARD",
} as const;

export type GameStatus = (typeof GameStatus)[keyof typeof GameStatus];

export interface RoundTime {
  round: number;
  title: string;
  timeSeconds: number;
}

export interface PlayerResult {
  id?: string;
  playerName: string;
  totalTimeSeconds: number;
  roundTimes: RoundTime[];
  completedAt: string;
  sectorsCompleted: number;
  totalSectors: number;
  status: "completed" | "failed";
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
