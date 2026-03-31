import { useEffect, useRef } from "react";
import ParticleBackground from "../components/ParticleBackground";
import CharacterAvatar from "../components/CharacterAvatar";
import type { RoundTime, QuizData } from "../types/types";

interface VictoryProps {
  onRestart: () => void;
  totalTimeSeconds: number;
  roundTimes: RoundTime[];
  quizData: QuizData;
}

const sectorIcons: Record<number, string> = {
  1: "🔐",
  2: "🖥️",
  3: "☁️",
  4: "🚨",
};

export default function Victory({
  onRestart,
  totalTimeSeconds,
  roundTimes,
  quizData,
}: VictoryProps) {
  const confettiCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = confettiCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ["#7c3aed", "#a78bfa", "#c084fc", "#6d28d9", "#fff", "#52d49e", "#fbbf24", "#22d3ee"];

    interface Confetti {
      x: number; y: number; w: number; h: number;
      color: string; speedX: number; speedY: number;
      rotation: number; rotationSpeed: number; opacity: number;
    }

    const confetti: Confetti[] = [];
    for (let i = 0; i < 120; i++) {
      confetti.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        w: Math.random() * 10 + 5,
        h: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: (Math.random() - 0.5) * 3,
        speedY: Math.random() * 3 + 2,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        opacity: Math.random() * 0.7 + 0.3,
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      confetti.forEach((c) => {
        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate((c.rotation * Math.PI) / 180);
        ctx.globalAlpha = c.opacity;
        ctx.fillStyle = c.color;
        ctx.fillRect(-c.w / 2, -c.h / 2, c.w, c.h);
        ctx.restore();
        c.x += c.speedX;
        c.y += c.speedY;
        c.rotation += c.rotationSpeed;
        if (c.y > canvas.height + 20) {
          c.y = -20;
          c.x = Math.random() * canvas.width;
        }
      });
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  const formatTime = (s: number) => {
    const min = Math.floor(s / 60);
    const sec = s % 60;
    return `${min}m ${sec.toString().padStart(2, "0")}s`;
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0d0221]">
      <ParticleBackground />
      <canvas ref={confettiCanvasRef} className="fixed inset-0 pointer-events-none z-20" />

      <div className="relative z-30 min-h-screen flex flex-col items-center justify-start py-12 px-6">
        <div className="max-w-2xl w-full mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mb-6">
              <CharacterAvatar size="lg" />
            </div>

            <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-semibold uppercase tracking-widest border border-emerald-500/30 mb-4 animate-fade-in">
              System Restored
            </span>

            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 animate-slide-up">
              Neuro
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-purple-300">
                Link
              </span>{" "}
              is Live!
            </h1>

            <p className="text-white/40 text-lg animate-slide-up" style={{ animationDelay: "0.1s" }}>
              Congratulations! You've brought NeuroLink back online. The platform is fully operational.
            </p>
          </div>

          {/* Total time */}
          <div className="bg-[#1e1145]/60 border border-emerald-500/20 rounded-xl p-6 mb-6 text-center animate-slide-up" style={{ animationDelay: "0.15s" }}>
            <p className="text-white/30 text-sm uppercase tracking-widest mb-2">Total Recovery Time</p>
            <p className="text-4xl font-bold font-mono text-emerald-300">
              {formatTime(totalTimeSeconds)}
            </p>
          </div>

          {/* Per-round breakdown */}
          <div className="grid gap-3 mb-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            {roundTimes.map((rt) => (
              <div
                key={rt.round}
                className="flex items-center justify-between bg-[#1e1145]/40 border border-purple-500/10 rounded-lg px-5 py-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-sm font-bold">
                    ✓
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm flex items-center gap-2">
                      <span>{sectorIcons[rt.round] || "⚡"}</span>
                      {rt.title}
                    </p>
                    <p className="text-white/30 text-xs">Sector {rt.round}</p>
                  </div>
                </div>
                <span className="text-purple-300 font-mono font-bold">
                  {formatTime(rt.timeSeconds)}
                </span>
              </div>
            ))}
          </div>

          {/* Correct answers */}
          <div className="bg-[#1e1145]/60 border border-purple-500/15 rounded-xl overflow-hidden mb-8 animate-slide-up" style={{ animationDelay: "0.25s" }}>
            <div className="px-5 py-3 border-b border-purple-500/10">
              <h3 className="text-white font-bold text-sm uppercase tracking-wider">All System Codes</h3>
            </div>
            <div className="divide-y divide-purple-500/5">
              {quizData.rounds.map((round) =>
                round.questions.map((q) => (
                  <div key={q.id} className="px-5 py-3 flex items-start gap-3">
                    <span className="text-purple-400/50 text-xs font-mono mt-0.5 shrink-0">
                      T{q.id}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-white/50 text-sm truncate">
                        {q.question.split("'")[1] || q.question.substring(0, 60) + "..."}
                      </p>
                      <p className="text-emerald-400 font-semibold text-sm mt-0.5">
                        {q.correctAnswer}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Play again */}
          <div className="text-center animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <button
              onClick={onRestart}
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 text-white font-bold text-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] hover:scale-105 active:scale-95 cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
              </svg>
              <span>Play Again</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
