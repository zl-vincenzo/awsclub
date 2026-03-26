export default function CharacterAvatar({ size = "lg" }: { size?: "sm" | "lg" }) {
  const dims = size === "lg" ? "w-32 h-40" : "w-16 h-20";
  const hoodSize = size === "lg" ? "w-28 h-28" : "w-14 h-14";
  const eyeSize = size === "lg" ? "w-2.5 h-3.5" : "w-1.5 h-2";
  const eyeGap = size === "lg" ? "gap-5" : "gap-2.5";
  const bodyW = size === "lg" ? "w-20" : "w-10";
  const bodyH = size === "lg" ? "h-14" : "h-7";

  return (
    <div className={`${dims} relative animate-float`}>
      {/* Glow aura */}
      <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-2xl animate-glow-pulse" />

      {/* Hood / Head */}
      <div className={`${hoodSize} mx-auto relative`}>
        {/* Hood shape */}
        <div className="w-full h-full rounded-full bg-gradient-to-b from-[#2d1b69] to-[#1a0533] border-2 border-purple-500/30 shadow-[0_0_20px_rgba(124,58,237,0.3)]" />

        {/* Face shadow */}
        <div className="absolute inset-3 rounded-full bg-gradient-to-b from-[#0d0221] to-[#1a0533]" />

        {/* Eyes */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4 flex ${eyeGap}`}>
          <div
            className={`${eyeSize} rounded-full bg-purple-400 shadow-[0_0_12px_rgba(167,139,250,0.8)] animate-eye-glow`}
          />
          <div
            className={`${eyeSize} rounded-full bg-purple-400 shadow-[0_0_12px_rgba(167,139,250,0.8)] animate-eye-glow`}
            style={{ animationDelay: "0.3s" }}
          />
        </div>
      </div>

      {/* Body / Cloak */}
      <div className={`${bodyW} ${bodyH} mx-auto -mt-2 relative`}>
        <div className="w-full h-full bg-gradient-to-b from-[#2d1b69] to-transparent rounded-b-2xl"
          style={{ clipPath: "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)" }}
        />
      </div>
    </div>
  );
}
