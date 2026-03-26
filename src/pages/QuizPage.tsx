import { useCallback } from "react";
import type { Round } from "../types/types";
import ParticleBackground from "../components/ParticleBackground";
import Timer from "../components/Timer";
import AnswerInput from "../components/AnswerInput";
import ProgressBar from "../components/ProgressBar";
import CharacterAvatar from "../components/CharacterAvatar";

interface QuizPageProps {
  round: Round;
  currentQuestion: number;
  totalRounds: number;
  onCorrectAnswer: () => void;
  onTimeUp: () => void;
}

export default function QuizPage({
  round,
  currentQuestion,
  totalRounds,
  onCorrectAnswer,
  onTimeUp,
}: QuizPageProps) {
  const question = round.questions[currentQuestion];
  const handleTimeUp = useCallback(() => onTimeUp(), [onTimeUp]);

  return (
    <div className="relative min-h-screen bg-[#0d0221] overflow-hidden">
      <ParticleBackground />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="px-6 py-4 border-b border-purple-500/10">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CharacterAvatar size="sm" />
              <div>
                <h2 className="text-white font-bold text-lg">{round.title}</h2>
                <p className="text-white/30 text-sm">Room {round.id} of {totalRounds}</p>
              </div>
            </div>

            <Timer duration={600} onTimeUp={handleTimeUp} isRunning={true} />

            <div className="hidden md:flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
              </div>
              <span className="text-white/30 text-sm font-medium">Escape Room</span>
            </div>
          </div>
        </header>

        {/* Progress */}
        <div className="px-6 py-6">
          <ProgressBar
            currentRound={round.id}
            totalRounds={totalRounds}
            currentQuestion={currentQuestion}
            totalQuestions={round.questions.length}
          />
        </div>

        {/* Question area */}
        <main className="flex-1 flex items-center justify-center px-6 pb-12">
          <AnswerInput
            key={question.id}
            question={question}
            onCorrectAnswer={onCorrectAnswer}
            questionNumber={currentQuestion + 1}
          />
        </main>
      </div>
    </div>
  );
}
