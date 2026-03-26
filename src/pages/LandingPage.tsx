import ParticleBackground from "../components/ParticleBackground";
import CharacterAvatar from "../components/CharacterAvatar";

interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0d0221]">
      <ParticleBackground />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
        {/* Character */}
        <div className="mb-6">
          <CharacterAvatar size="lg" />
        </div>

        {/* Club badge */}
        <div className="mb-2 animate-fade-in">
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-300 text-sm font-semibold uppercase tracking-widest border border-purple-500/20">
            AWS Cloud Club
          </span>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 animate-slide-up leading-tight">
          Cloud{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-200">
            Escape
          </span>{" "}
          Room
        </h1>

        {/* Story hook */}
        <p
          className="text-lg md:text-xl text-white/40 mb-4 max-w-xl mx-auto animate-slide-up leading-relaxed"
          style={{ animationDelay: "0.1s" }}
        >
          You've been trapped inside the AWS data center. The Cloud Guardian
          holds the key — but only those who prove their cloud knowledge can
          escape.
        </p>

        {/* Details */}
        <div className="mb-10 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <div className="inline-flex flex-wrap items-center justify-center gap-4 text-sm text-white/30">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
              <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              10 min per room
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
              <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
              3 locked rooms
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
              <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
              </svg>
              4 terminals per room
            </span>
          </div>
        </div>

        {/* Start button */}
        <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <button
            onClick={onStart}
            className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-purple-600 to-purple-500 text-white font-bold text-xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(124,58,237,0.4)] hover:scale-105 active:scale-95 cursor-pointer"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
            </svg>
            <span>Begin the Story</span>
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>

        <p className="mt-12 text-white/15 text-sm animate-slide-up" style={{ animationDelay: "0.4s" }}>
          Powered by AWS Cloud Club
        </p>
      </div>
    </div>
  );
}
