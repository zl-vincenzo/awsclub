import { useState, useEffect } from "react";
import ParticleBackground from "../components/ParticleBackground";
import CharacterAvatar from "../components/CharacterAvatar";

interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  const [glitchActive, setGlitchActive] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    // Simulate system crash sequence
    const glitchTimer = setTimeout(() => setGlitchActive(true), 300);
    const alertTimer = setTimeout(() => setAlertVisible(true), 1200);
    const contentTimer = setTimeout(() => setShowContent(true), 2000);
    return () => {
      clearTimeout(glitchTimer);
      clearTimeout(alertTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0d0221]">
      <ParticleBackground />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-3xl pointer-events-none" />

      {/* Scanline overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px)",
        }}
      />

      <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
        {/* Critical Alert Banner */}
        {alertVisible && (
          <div className="mb-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 animate-pulse">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
              <span className="font-mono text-sm font-bold tracking-wider">
                ⚠️ CRITICAL SYSTEM FAILURE DETECTED
              </span>
            </div>
          </div>
        )}

        {/* Character */}
        <div className={`mb-6 transition-all duration-700 ${glitchActive ? "animate-fade-in" : "opacity-0"}`}>
          <CharacterAvatar size="lg" />
        </div>

        {/* Club badge */}
        <div className={`mb-2 transition-all duration-700 ${showContent ? "animate-fade-in" : "opacity-0"}`}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-300 text-sm font-semibold uppercase tracking-widest border border-purple-500/20">
            AWS Cloud Club
          </span>
        </div>

        {/* Title */}
        <h1 className={`text-5xl md:text-7xl font-extrabold text-white mb-4 leading-tight transition-all duration-700 ${showContent ? "animate-slide-up" : "opacity-0"}`}>
          Neuro
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-200">
            Link
          </span>
          <span className="block text-2xl md:text-3xl font-bold text-white/40 mt-2">
            System Recovery
          </span>
        </h1>

        {/* Story hook */}
        <p
          className={`text-lg md:text-xl text-white/40 mb-4 max-w-xl mx-auto leading-relaxed transition-all duration-700 ${showContent ? "animate-slide-up" : "opacity-0"}`}
          style={{ animationDelay: "0.1s" }}
        >
          A fast-growing AI startup. Minutes from launch. And then — everything crashes.
          You are the last line of defense.
        </p>

        {/* Mission briefing */}
        <div
          className={`mb-8 transition-all duration-700 ${showContent ? "animate-slide-up" : "opacity-0"}`}
          style={{ animationDelay: "0.15s" }}
        >
          <div className="bg-[#1e1145]/60 border border-purple-500/15 rounded-xl p-5 max-w-lg mx-auto text-left">
            <p className="text-white/30 text-xs uppercase tracking-widest mb-3 text-center font-bold">
              🚨 System Failures Detected
            </p>
            <div className="space-y-2">
              {[
                { icon: "🔐", text: "Login system — LOCKED", color: "text-red-400" },
                { icon: "🖥️", text: "User interface — BROKEN", color: "text-red-400" },
                { icon: "☁️", text: "Cloud services — MISCONFIGURED", color: "text-red-400" },
                { icon: "🚨", text: "Traffic surge — INCOMING", color: "text-red-400" },
              ].map(({ icon, text, color }) => (
                <div key={text} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-red-500/5 border border-red-500/10">
                  <span className="text-lg">{icon}</span>
                  <span className={`font-mono text-sm font-semibold ${color}`}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Details */}
        <div className={`mb-10 transition-all duration-700 ${showContent ? "animate-slide-up" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
          <div className="inline-flex flex-wrap items-center justify-center gap-4 text-sm text-white/30">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
              <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              5 min per sector
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
              <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
              4 locked sectors
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
              <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
              </svg>
              3 terminals per sector
            </span>
          </div>
        </div>

        {/* Start button */}
        <div className={`transition-all duration-700 ${showContent ? "animate-slide-up" : "opacity-0"}`} style={{ animationDelay: "0.3s" }}>
          <button
            onClick={onStart}
            className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-red-600 via-purple-600 to-purple-500 text-white font-bold text-xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(239,68,68,0.3),0_0_60px_rgba(124,58,237,0.3)] hover:scale-105 active:scale-95 cursor-pointer"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <span>Take Control</span>
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>

        <p className={`mt-12 text-white/15 text-sm transition-all duration-700 ${showContent ? "animate-slide-up" : "opacity-0"}`} style={{ animationDelay: "0.4s" }}>
          Powered by AWS Cloud Club
        </p>
      </div>
    </div>
  );
}
