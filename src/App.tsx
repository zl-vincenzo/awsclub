import { useState, useCallback, useEffect, useRef } from "react";
import { GameStatus } from "./types/types";
import type { QuizData, RoundTime, PlayerResult } from "./types/types";
import questionsData from "./data/questions.json";
import LandingPage from "./pages/LandingPage";
import NameEntry from "./pages/NameEntry";
import QuizPage from "./pages/QuizPage";
import GameOver from "./pages/GameOver";
import Victory from "./pages/Victory";
import StoryDialogue from "./components/StoryDialogue";
import { useWebSocket } from "./hooks/useWebSocket";

const data: QuizData = questionsData;

export default function App() {
  const [status, setStatus] = useState<GameStatus>(GameStatus.LANDING);
  const [currentRound, setCurrentRound] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [roundStartTime, setRoundStartTime] = useState(0);
  const [roundTimes, setRoundTimes] = useState<RoundTime[]>([]);
  const [totalTimeSeconds, setTotalTimeSeconds] = useState(0);
  const [playerName, setPlayerName] = useState("");
  const [solvedAnswers, setSolvedAnswers] = useState<Record<number, string>>({});

  const ws = useWebSocket();
  const wsConnected = useRef(false);

  // Connect WebSocket once
  useEffect(() => {
    if (!wsConnected.current) {
      ws.connect();
      wsConnected.current = true;
    }
  }, [ws]);

  const totalRounds = data.rounds.length;
  const round = data.rounds[currentRound];

  const handleStart = useCallback(() => {
    setCurrentRound(0);
    setCurrentQuestion(0);
    setRoundTimes([]);
    setTotalTimeSeconds(0);
    setSolvedAnswers({});
    setStatus(GameStatus.NAME_ENTRY);
  }, []);

  const handleNameSubmit = useCallback((name: string) => {
    setPlayerName(name);
    const now = Date.now();
    setStartTime(now);
    setRoundStartTime(now);
    setStatus(GameStatus.STORY_INTRO);
  }, []);

  const handleStoryIntroDone = useCallback(() => {
    setRoundStartTime(Date.now());
    setCurrentQuestion(0);
    setStatus(GameStatus.PLAYING);
  }, []);

  const handleCorrectAnswer = useCallback(
    (userAnswer: string) => {
      const question = round.questions[currentQuestion];
      setSolvedAnswers((prev) => ({ ...prev, [question.id]: userAnswer }));

      const nextQuestion = currentQuestion + 1;

      if (nextQuestion >= round.questions.length) {
        const roundElapsed = Math.floor((Date.now() - roundStartTime) / 1000);
        const newRoundTime: RoundTime = {
          round: round.id,
          title: round.title,
          timeSeconds: roundElapsed,
        };

        setRoundTimes((prev) => [...prev, newRoundTime]);

        const nextRound = currentRound + 1;
        if (nextRound >= totalRounds) {
          const totalElapsed = Math.floor((Date.now() - startTime) / 1000);
          setTotalTimeSeconds(totalElapsed);
          setStatus(GameStatus.STORY_OUTRO);
        } else {
          setStatus(GameStatus.STORY_OUTRO);
        }
      } else {
        setCurrentQuestion(nextQuestion);
      }
    },
    [currentQuestion, currentRound, round, totalRounds, roundStartTime, startTime]
  );

  const handleOutroDone = useCallback(() => {
    const nextRound = currentRound + 1;
    if (nextRound >= totalRounds) {
      // Send result via WebSocket
      const result: PlayerResult = {
        playerName,
        totalTimeSeconds,
        roundTimes: [...roundTimes],
        completedAt: new Date().toISOString(),
        sectorsCompleted: totalRounds,
        totalSectors: totalRounds,
        status: "completed",
      };
      ws.submitResult(result);
      setStatus(GameStatus.GAME_WON);
    } else {
      setCurrentRound(nextRound);
      setCurrentQuestion(0);
      setStatus(GameStatus.STORY_INTRO);
    }
  }, [currentRound, totalRounds, playerName, totalTimeSeconds, roundTimes, ws]);

  const handleTimeUp = useCallback(() => {
    // Send failed result via WebSocket
    const totalElapsed = Math.floor((Date.now() - startTime) / 1000);
    const result: PlayerResult = {
      playerName,
      totalTimeSeconds: totalElapsed,
      roundTimes: [...roundTimes],
      completedAt: new Date().toISOString(),
      sectorsCompleted: currentRound + 1,
      totalSectors: totalRounds,
      status: "failed",
    };
    ws.submitResult(result);
    setStatus(GameStatus.GAME_OVER);
  }, [playerName, startTime, roundTimes, currentRound, totalRounds, ws]);

  const handleRetry = useCallback(() => {
    setCurrentRound(0);
    setCurrentQuestion(0);
    setRoundTimes([]);
    setTotalTimeSeconds(0);
    setSolvedAnswers({});
    setPlayerName("");
    setStatus(GameStatus.LANDING);
  }, []);

  switch (status) {
    case GameStatus.LANDING:
      return <LandingPage onStart={handleStart} />;

    case GameStatus.NAME_ENTRY:
      return <NameEntry onSubmit={handleNameSubmit} />;

    case GameStatus.STORY_INTRO:
      return (
        <StoryDialogue
          key={`intro-${currentRound}`}
          text={round.storyIntro}
          onComplete={handleStoryIntroDone}
          buttonLabel="Enter Sector"
        />
      );

    case GameStatus.PLAYING:
      return (
        <QuizPage
          key={`round-${currentRound}`}
          round={round}
          currentQuestion={currentQuestion}
          totalRounds={totalRounds}
          onCorrectAnswer={handleCorrectAnswer}
          onTimeUp={handleTimeUp}
        />
      );

    case GameStatus.STORY_OUTRO:
      return (
        <StoryDialogue
          key={`outro-${currentRound}`}
          text={round.storyOutro}
          onComplete={handleOutroDone}
          buttonLabel={currentRound + 1 >= totalRounds ? "See Results" : "Next Sector"}
        />
      );

    case GameStatus.GAME_OVER:
      return (
        <GameOver
          onRetry={handleRetry}
          roundReached={currentRound + 1}
        />
      );

    case GameStatus.GAME_WON:
      return (
        <Victory
          onRestart={handleRetry}
          totalTimeSeconds={totalTimeSeconds}
          roundTimes={roundTimes}
          quizData={data}
          solvedAnswers={solvedAnswers}
          playerName={playerName}
        />
      );

    default:
      return <LandingPage onStart={handleStart} />;
  }
}
