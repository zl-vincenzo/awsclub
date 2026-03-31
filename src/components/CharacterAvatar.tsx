export default function CharacterAvatar({ size = "lg" }: { size?: "sm" | "lg" }) {
  const dims = size === "lg" ? "w-32 h-32" : "w-14 h-14";
  const outerRing = size === "lg" ? "w-28 h-28" : "w-12 h-12";
  const innerRing = size === "lg" ? "w-20 h-20" : "w-8 h-8";
  const coreSize = size === "lg" ? "w-10 h-10" : "w-4 h-4";

  return (
    <div className={`${dims} relative animate-float flex items-center justify-center`}>
      {/* Glow aura */}
      <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-2xl animate-glow-pulse" />

      {/* Outer rotating ring */}
      <div className={`${outerRing} absolute rounded-full border-2 border-purple-500/30 animate-portal-spin`}
        style={{ borderTopColor: "rgba(192, 132, 252, 0.8)", borderRightColor: "transparent" }}
      />

      {/* Inner counter-rotating ring */}
      <div className={`${innerRing} absolute rounded-full border-2 border-purple-400/20`}
        style={{
          borderBottomColor: "rgba(167, 139, 250, 0.7)",
          borderLeftColor: "transparent",
          animation: "portal-spin 5s linear infinite reverse",
        }}
      />

      {/* Core orb */}
      <div className={`${coreSize} relative rounded-full bg-gradient-to-br from-purple-400 via-fuchsia-400 to-purple-600 shadow-[0_0_20px_rgba(167,139,250,0.8)] animate-eye-glow`} />

      {/* Scanning line effect (large only) */}
      {size === "lg" && (
        <div className="absolute inset-4 rounded-full overflow-hidden pointer-events-none">
          <div
            className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400/50 to-transparent"
            style={{
              animation: "scan-line 3s ease-in-out infinite",
            }}
          />
        </div>
      )}
    </div>
  );
}
