import { useState, useRef, useEffect } from "react";
import type { Question } from "../types/types";

interface AnswerInputProps {
  question: Question;
  onCorrectAnswer: () => void;
  questionNumber: number;
}

export default function AnswerInput({
  question,
  onCorrectAnswer,
  questionNumber,
}: AnswerInputProps) {
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setAnswer("");
    setFeedback(null);
    setShowHint(false);
    setAttempts(0);
    inputRef.current?.focus();
  }, [question.id]);

  const normalize = (s: string) => s.trim().toLowerCase().replace(/\s+/g, " ");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.trim() || feedback === "correct") return;

    const isCorrect = normalize(answer) === normalize(question.correctAnswer);

    if (isCorrect) {
      setFeedback("correct");
      setTimeout(() => {
        onCorrectAnswer();
      }, 1200);
    } else {
      setFeedback("wrong");
      setShakeKey((prev) => prev + 1);
      setAttempts((prev) => prev + 1);
      setTimeout(() => {
        setFeedback(null);
        setAnswer("");
        inputRef.current?.focus();
      }, 1000);
    }
  };

  return (
    <div
      key={`q-${question.id}-${shakeKey}`}
      className={`w-full max-w-2xl mx-auto animate-fade-in ${
        feedback === "wrong" ? "animate-shake" : ""
      }`}
    >
      {/* Terminal badge */}
      <div className="flex items-center gap-3 mb-4">
        <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm font-semibold uppercase tracking-wider border border-purple-500/30">
          Terminal {questionNumber}
        </span>
        <div className="flex-1 h-px bg-purple-500/10" />
      </div>

      {/* Question / narrative text */}
      <div className="bg-[#1e1145]/60 border border-purple-500/15 rounded-xl p-5 mb-6">
        <p className="text-white/80 text-base md:text-lg leading-relaxed italic">
          "{question.question}"
        </p>
      </div>

      {/* Answer input */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer..."
              disabled={feedback === "correct"}
              className={`w-full px-5 py-4 rounded-xl border-2 bg-[#0d0221]/80 text-white text-lg font-medium placeholder:text-white/20 outline-none transition-all duration-300 ${
                feedback === "correct"
                  ? "border-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.3)]"
                  : feedback === "wrong"
                  ? "border-red-400 shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                  : "border-purple-500/30 focus:border-purple-400 focus:shadow-[0_0_15px_rgba(124,58,237,0.3)]"
              }`}
              autoComplete="off"
            />
            {/* Cursor glow */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              {feedback === "correct" && (
                <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
              {feedback === "wrong" && (
                <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </div>
          </div>
          <button
            type="submit"
            disabled={!answer.trim() || feedback === "correct"}
            className="px-6 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 text-white font-bold transition-all duration-300 hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 disabled:hover:shadow-none cursor-pointer disabled:cursor-not-allowed"
          >
            Submit
          </button>
        </div>
      </form>

      {/* Feedback */}
      {feedback === "correct" && (
        <div className="text-center animate-fade-in mb-4">
          <p className="text-emerald-400 font-semibold text-lg">
            ✓ Terminal unlocked! Proceeding...
          </p>
        </div>
      )}
      {feedback === "wrong" && (
        <div className="text-center animate-fade-in mb-4">
          <p className="text-red-400 font-semibold text-lg">
            ✗ Access denied. Try again.
          </p>
        </div>
      )}

      {/* Hint system */}
      <div className="text-center">
        {!showHint && attempts >= 2 && (
          <button
            onClick={() => setShowHint(true)}
            className="text-purple-400/60 text-sm hover:text-purple-300 transition-colors cursor-pointer underline underline-offset-4"
          >
            Need a hint?
          </button>
        )}
        {showHint && (
          <div className="inline-flex items-start gap-2 px-4 py-3 rounded-lg bg-purple-500/10 border border-purple-500/20 animate-fade-in">
            <svg className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.44 2.211a8.407 8.407 0 01-2.38 0" />
            </svg>
            <p className="text-purple-300/70 text-sm text-left">{question.hint}</p>
          </div>
        )}
      </div>
    </div>
  );
}
