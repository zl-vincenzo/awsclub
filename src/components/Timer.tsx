import { useEffect, useState, useCallback } from "react";

interface TimerProps {
  duration: number;
  onTimeUp: () => void;
  isRunning: boolean;
}

export default function Timer({ duration, onTimeUp, isRunning }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    if (!isRunning) return;
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = timeLeft / duration;
  const isUrgent = timeLeft <= 60;

  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  const formatTime = useCallback(
    (val: number) => val.toString().padStart(2, "0"),
    []
  );

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-36 h-36">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60" cy="60" r={radius}
            fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8"
          />
          <circle
            cx="60" cy="60" r={radius}
            fill="none"
            stroke={isUrgent ? "#EF4444" : "#7c3aed"}
            strokeWidth="8" strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-linear"
            style={{
              filter: isUrgent
                ? "drop-shadow(0 0 8px rgba(239,68,68,0.6))"
                : "drop-shadow(0 0 8px rgba(124,58,237,0.5))",
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className={`text-3xl font-bold font-mono ${
              isUrgent ? "text-red-400 animate-pulse" : "text-white"
            }`}
          >
            {formatTime(minutes)}:{formatTime(seconds)}
          </span>
        </div>
      </div>
      <span className="text-xs text-white/30 uppercase tracking-widest">
        Time Remaining
      </span>
    </div>
  );
}
