interface ProgressBarProps {
  currentRound: number;
  totalRounds: number;
  currentQuestion: number;
  totalQuestions: number;
}

export default function ProgressBar({
  currentRound,
  totalRounds,
  currentQuestion,
  totalQuestions,
}: ProgressBarProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Round indicators */}
      <div className="flex items-center justify-between mb-3">
        {Array.from({ length: totalRounds }, (_, i) => {
          const roundNum = i + 1;
          const isComplete = roundNum < currentRound;
          const isCurrent = roundNum === currentRound;

          return (
            <div key={roundNum} className="flex items-center gap-2 flex-1">
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 text-sm font-bold ${
                    isComplete
                      ? "bg-emerald-500 border-emerald-400 text-white shadow-[0_0_15px_rgba(52,211,153,0.4)]"
                      : isCurrent
                      ? "bg-purple-500/20 border-purple-400 text-purple-300 shadow-[0_0_15px_rgba(124,58,237,0.3)] animate-pulse-glow"
                      : "bg-white/5 border-white/20 text-white/30"
                  }`}
                >
                  {isComplete ? "✓" : roundNum}
                </div>
                <span className={`text-xs ${isCurrent ? "text-purple-300" : "text-white/30"}`}>
                  Room {roundNum}
                </span>
              </div>

              {roundNum < totalRounds && (
                <div className="flex-1 h-0.5 mx-2 mb-5 rounded-full overflow-hidden bg-white/10">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      isComplete ? "bg-emerald-500 w-full" : isCurrent ? "bg-purple-500" : "w-0"
                    }`}
                    style={{
                      width: isCurrent
                        ? `${(currentQuestion / totalQuestions) * 100}%`
                        : isComplete ? "100%" : "0%",
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Question dots */}
      <div className="flex items-center justify-center gap-2 mt-2">
        {Array.from({ length: totalQuestions }, (_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i < currentQuestion
                ? "w-8 bg-purple-500"
                : i === currentQuestion
                ? "w-8 bg-purple-500/50"
                : "w-4 bg-white/10"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
