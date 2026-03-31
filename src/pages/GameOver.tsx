import ParticleBackground from "../components/ParticleBackground";
import CharacterAvatar from "../components/CharacterAvatar";

interface GameOverProps {
  onRetry: () => void;
  roundReached: number;
}

export default function GameOver({ onRetry, roundReached }: GameOverProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0d0221]">
      <ParticleBackground />

      {/* Red glitch overlay */}
      <div className="fixed inset-0 pointer-events-none z-10 bg-red-900/5" />

      <div className="relative z-10 text-center max-w-lg mx-auto px-6">
        {/* Character with sad state */}
        <div className="mb-8 opacity-60">
          <CharacterAvatar size="lg" />
        </div>

        {/* Badge */}
        <span className="inline-block px-4 py-1.5 rounded-full bg-red-500/20 text-red-400 text-sm font-semibold uppercase tracking-widest border border-red-500/30 mb-4 animate-fade-in">
          System Collapsed
        </span>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 animate-slide-up">
          Neuro<span className="text-red-400">Link</span> Down
        </h1>

        {/* Story */}
        <div className="bg-[#1e1145]/60 border border-red-500/15 rounded-xl p-5 mb-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <p className="text-white/50 text-base italic">
            "Time's up. The system couldn't hold. Servers are crashing in cascade. ARIA's voice crackles through the static: 'We've lost the platform. NeuroLink is going dark. The investors have disconnected. The users are gone.' Her hologram flickers and fades. 'But the system can be rebooted... if you're willing to try again.'"
          </p>
        </div>

        <p className="text-white/25 text-sm mb-8 animate-slide-up" style={{ animationDelay: "0.15s" }}>
          You reached Sector {roundReached} of 4
        </p>

        {/* Retry */}
        <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <button
            onClick={onRetry}
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-red-600 to-purple-500 text-white font-bold text-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(239,68,68,0.3)] hover:scale-105 active:scale-95 cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
            </svg>
            <span>Reboot System</span>
          </button>
        </div>
      </div>
    </div>
  );
}
