import { useState, useCallback } from "react";
import { GameStatus } from "./types/types";
import type { QuizData, RoundTime } from "./types/types";
import questionsData from "./data/questions.json";
import LandingPage from "./pages/LandingPage";
import QuizPage from "./pages/QuizPage";
import GameOver from "./pages/GameOver";
import Victory from "./pages/Victory";
import StoryDialogue from "./components/StoryDialogue";

const data: QuizData = questionsData;

export default function App() {
  const [status, setStatus] = useState<GameStatus>(GameStatus.LANDING);
  const [currentRound, setCurrentRound] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [roundStartTime, setRoundStartTime] = useState(0);
  const [roundTimes, setRoundTimes] = useState<RoundTime[]>([]);
  const [totalTimeSeconds, setTotalTimeSeconds] = useState(0);

  const totalRounds = data.rounds.length;
  const round = data.rounds[currentRound];

  const handleStart = useCallback(() => {
    const now = Date.now();
    setCurrentRound(0);
    setCurrentQuestion(0);
    setStartTime(now);
    setRoundStartTime(now);
    setRoundTimes([]);
    setTotalTimeSeconds(0);
    setStatus(GameStatus.STORY_INTRO);
  }, []);

  const handleStoryIntroDone = useCallback(() => {
    setRoundStartTime(Date.now());
    setCurrentQuestion(0);
    setStatus(GameStatus.PLAYING);
  }, []);

  const handleCorrectAnswer = useCallback(() => {
    const nextQuestion = currentQuestion + 1;

    if (nextQuestion >= round.questions.length) {
      // Round complete — record round time
      const roundElapsed = Math.floor((Date.now() - roundStartTime) / 1000);
      const newRoundTime: RoundTime = {
        round: round.id,
        title: round.title,
        timeSeconds: roundElapsed,
      };

      setRoundTimes((prev) => [...prev, newRoundTime]);

      const nextRound = currentRound + 1;
      if (nextRound >= totalRounds) {
        // Show outro story, then victory
        const totalElapsed = Math.floor((Date.now() - startTime) / 1000);
        setTotalTimeSeconds(totalElapsed);
        setStatus(GameStatus.STORY_OUTRO);
      } else {
        // Show outro story, then next round intro
        setStatus(GameStatus.STORY_OUTRO);
      }
    } else {
      setCurrentQuestion(nextQuestion);
    }
  }, [currentQuestion, currentRound, round, totalRounds, roundStartTime, startTime]);

  const handleOutroDone = useCallback(() => {
    const nextRound = currentRound + 1;
    if (nextRound >= totalRounds) {
      setStatus(GameStatus.GAME_WON);
    } else {
      setCurrentRound(nextRound);
      setCurrentQuestion(0);
      setStatus(GameStatus.STORY_INTRO);
    }
  }, [currentRound, totalRounds]);

  const handleTimeUp = useCallback(() => {
    setStatus(GameStatus.GAME_OVER);
  }, []);

  const handleRetry = useCallback(() => {
    setCurrentRound(0);
    setCurrentQuestion(0);
    setRoundTimes([]);
    setTotalTimeSeconds(0);
    setStatus(GameStatus.LANDING);
  }, []);

  switch (status) {
    case GameStatus.LANDING:
      return <LandingPage onStart={handleStart} />;

    case GameStatus.STORY_INTRO:
      return (
        <StoryDialogue
          key={`intro-${currentRound}`}
          text={round.storyIntro}
          onComplete={handleStoryIntroDone}
          buttonLabel="Enter the Room"
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
          buttonLabel={currentRound + 1 >= totalRounds ? "See Results" : "Next Room"}
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
        />
      );

    default:
      return <LandingPage onStart={handleStart} />;
  }
}
