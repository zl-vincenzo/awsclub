import { useState } from "react";
import ParticleBackground from "../components/ParticleBackground";
import CharacterAvatar from "../components/CharacterAvatar";

interface NameEntryProps {
  onSubmit: (name: string) => void;
}

export default function NameEntry({ onSubmit }: NameEntryProps) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Please enter your name to proceed.");
      return;
    }
    if (trimmed.length < 2) {
      setError("Name must be at least 2 characters.");
      return;
    }
    onSubmit(trimmed);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0d0221]">
      <ParticleBackground />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 text-center max-w-lg mx-auto px-6">
        {/* Avatar */}
        <div className="mb-6 animate-fade-in">
          <CharacterAvatar size="lg" />
        </div>

        {/* Badge */}
        <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-300 text-sm font-semibold uppercase tracking-widest border border-purple-500/20 mb-4 animate-fade-in">
          Identity Verification
        </span>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3 animate-slide-up">
          Who's joining the{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">
            mission
          </span>
          ?
        </h1>

        {/* Subtitle */}
        <p className="text-white/40 text-base mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          ARIA needs to register your identity before granting system access.
        </p>

        {/* Name input form */}
        <form onSubmit={handleSubmit} className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <div className="bg-[#1e1145]/60 border border-purple-500/15 rounded-xl p-6 mb-6">
            <label className="block text-white/50 text-sm uppercase tracking-wider mb-3 text-left font-semibold">
              Enter Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
              placeholder="e.g. Alex Johnson"
              autoFocus
              className="w-full px-5 py-4 rounded-xl border-2 border-purple-500/30 bg-[#0d0221]/80 text-white text-lg font-medium placeholder:text-white/20 outline-none transition-all duration-300 focus:border-purple-400 focus:shadow-[0_0_15px_rgba(124,58,237,0.3)]"
              autoComplete="off"
              maxLength={50}
            />
            {error && (
              <p className="text-red-400 text-sm mt-2 text-left">{error}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!name.trim()}
            className="group inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-purple-600 to-purple-500 text-white font-bold text-xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(124,58,237,0.4)] hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 disabled:hover:shadow-none cursor-pointer disabled:cursor-not-allowed"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
            </svg>
            <span>Begin Mission</span>
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
