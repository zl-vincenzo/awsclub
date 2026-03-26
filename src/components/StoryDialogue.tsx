import { useState, useEffect, useCallback } from "react";
import CharacterAvatar from "./CharacterAvatar";

interface StoryDialogueProps {
  text: string;
  onComplete: () => void;
  buttonLabel?: string;
}

export default function StoryDialogue({
  text,
  onComplete,
  buttonLabel = "Continue",
}: StoryDialogueProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    setDisplayedText("");
    setCharIndex(0);
    setIsTyping(true);
  }, [text]);

  useEffect(() => {
    if (!isTyping) return;
    if (charIndex >= text.length) {
      setIsTyping(false);
      return;
    }
    const speed = text[charIndex] === "." || text[charIndex] === "'" ? 80 : 20;
    const timer = setTimeout(() => {
      setDisplayedText((prev) => prev + text[charIndex]);
      setCharIndex((prev) => prev + 1);
    }, speed);
    return () => clearTimeout(timer);
  }, [charIndex, isTyping, text]);

  const handleSkip = useCallback(() => {
    if (isTyping) {
      setDisplayedText(text);
      setCharIndex(text.length);
      setIsTyping(false);
    }
  }, [isTyping, text]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0d0221]/95 backdrop-blur-md animate-fade-in">
      <div className="max-w-2xl mx-auto px-6 w-full">
        {/* Character */}
        <div className="flex justify-center mb-8">
          <CharacterAvatar size="lg" />
        </div>

        {/* Name tag */}
        <div className="text-center mb-4">
          <span className="inline-block px-4 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm font-semibold uppercase tracking-widest border border-purple-500/30">
            Cloud Guardian
          </span>
        </div>

        {/* Speech bubble */}
        <div
          className="relative bg-[#1e1145]/80 border border-purple-500/20 rounded-2xl p-6 mb-8 min-h-[160px] cursor-pointer"
          onClick={handleSkip}
        >
          {/* Speech arrow */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-[#1e1145]/80 border-l border-t border-purple-500/20 rotate-45" />

          <p className="text-white/80 text-base md:text-lg leading-relaxed relative z-10">
            {displayedText}
            {isTyping && (
              <span className="inline-block w-0.5 h-5 bg-purple-400 ml-1 align-middle animate-typewriter-blink" />
            )}
          </p>

          {isTyping && (
            <p className="text-white/20 text-xs mt-4 text-center">
              Click to skip
            </p>
          )}
        </div>

        {/* Continue button */}
        {!isTyping && (
          <div className="text-center animate-fade-in">
            <button
              onClick={onComplete}
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 text-white font-bold text-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>{buttonLabel}</span>
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
