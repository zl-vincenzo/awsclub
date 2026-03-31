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

const sectorIcons: Record<number, string> = {
  1: "🔐",
  2: "🖥️",
  3: "☁️",
  4: "🚨",
};

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
                <h2 className="text-white font-bold text-lg flex items-center gap-2">
                  <span>{sectorIcons[round.id] || "⚡"}</span>
                  {round.title}
                </h2>
                <p className="text-white/30 text-sm">Sector {round.id} of {totalRounds}</p>
              </div>
            </div>

            <Timer duration={300} onTimeUp={handleTimeUp} isRunning={true} />

            <div className="hidden md:flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
              </div>
              <span className="text-white/30 text-sm font-medium font-mono">NEUROLINK</span>
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
