import { useState, useEffect, useCallback } from "react";
import ParticleBackground from "../components/ParticleBackground";
import { useWebSocket } from "../hooks/useWebSocket";
import type { PlayerResult } from "../types/types";

export default function Leaderboard() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [results, setResults] = useState<PlayerResult[]>([]);
  const [loading, setLoading] = useState(false);

  const ws = useWebSocket();

  useEffect(() => {
    ws.connect();

    const unsub1 = ws.on("AUTH_RESPONSE", (msg: any) => {
      setLoading(false);
      if (msg.success) {
        setIsAuthed(true);
        setResults(msg.data || []);
        setAuthError("");
      } else {
        setAuthError("Invalid credentials. Access denied.");
      }
    });

    const unsub2 = ws.on("RESULTS_UPDATE", (msg: any) => {
      setResults(msg.data || []);
    });

    return () => {
      unsub1();
      unsub2();
    };
  }, []);

  const handleLogin = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!username.trim() || !password.trim()) return;
      setLoading(true);
      setAuthError("");
      ws.authenticate(username.trim(), password.trim());
    },
    [username, password, ws]
  );

  const formatTime = (s: number) => {
    const min = Math.floor(s / 60);
    const sec = s % 60;
    return `${min}m ${sec.toString().padStart(2, "0")}s`;
  };

  if (!isAuthed) {
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0d0221]">
        <ParticleBackground />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 w-full max-w-md mx-auto px-6">
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-1.5 rounded-full bg-red-500/15 text-red-400 text-sm font-semibold uppercase tracking-widest border border-red-500/30 mb-4 animate-fade-in">
              🔒 Restricted Access
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 animate-slide-up">
              Leaderboard
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">
                {" "}Admin
              </span>
            </h1>
            <p className="text-white/40 text-sm animate-slide-up" style={{ animationDelay: "0.1s" }}>
              Authorized personnel only. Enter admin credentials.
            </p>
          </div>

          <form onSubmit={handleLogin} className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <div className="bg-[#1e1145]/60 border border-purple-500/15 rounded-xl p-6 space-y-4">
              <div>
                <label className="block text-white/50 text-xs uppercase tracking-wider mb-2 font-semibold">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  autoFocus
                  className="w-full px-4 py-3 rounded-lg border-2 border-purple-500/30 bg-[#0d0221]/80 text-white placeholder:text-white/20 outline-none transition-all focus:border-purple-400 focus:shadow-[0_0_15px_rgba(124,58,237,0.3)]"
                  autoComplete="off"
                />
              </div>
              <div>
                <label className="block text-white/50 text-xs uppercase tracking-wider mb-2 font-semibold">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-3 rounded-lg border-2 border-purple-500/30 bg-[#0d0221]/80 text-white placeholder:text-white/20 outline-none transition-all focus:border-purple-400 focus:shadow-[0_0_15px_rgba(124,58,237,0.3)]"
                  autoComplete="off"
                />
              </div>

              {authError && (
                <p className="text-red-400 text-sm text-center">{authError}</p>
              )}

              <button
                type="submit"
                disabled={loading || !username.trim() || !password.trim()}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-purple-500 text-white font-bold transition-all duration-300 hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:scale-[1.02] active:scale-95 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
              >
                {loading ? "Authenticating..." : "Access Dashboard"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // ── Leaderboard Dashboard ──
  const completedCount = results.filter((r) => r.status === "completed").length;
  const failedCount = results.filter((r) => r.status === "failed").length;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0d0221]">
      <ParticleBackground />

      <div className="relative z-10 min-h-screen py-8 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
                <span className="text-2xl">📊</span>
                Live Leaderboard
              </h1>
              <p className="text-white/30 text-sm mt-1">
                Real-time player results • {results.length} total participants
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
              </span>
              <span className="text-emerald-400 text-sm font-semibold">LIVE</span>
            </div>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-[#1e1145]/60 border border-purple-500/15 rounded-xl p-5 text-center">
              <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Total Players</p>
              <p className="text-3xl font-bold text-white">{results.length}</p>
            </div>
            <div className="bg-[#1e1145]/60 border border-emerald-500/20 rounded-xl p-5 text-center">
              <p className="text-emerald-400/60 text-xs uppercase tracking-wider mb-1">Completed</p>
              <p className="text-3xl font-bold text-emerald-400">{completedCount}</p>
            </div>
            <div className="bg-[#1e1145]/60 border border-red-500/20 rounded-xl p-5 text-center">
              <p className="text-red-400/60 text-xs uppercase tracking-wider mb-1">Failed</p>
              <p className="text-3xl font-bold text-red-400">{failedCount}</p>
            </div>
          </div>

          {/* Results table */}
          <div className="bg-[#1e1145]/60 border border-purple-500/15 rounded-xl overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-12 gap-2 px-5 py-3 border-b border-purple-500/10 text-white/40 text-xs uppercase tracking-wider font-semibold">
              <div className="col-span-1 text-center">Rank</div>
              <div className="col-span-3">Player</div>
              <div className="col-span-2 text-center">Status</div>
              <div className="col-span-2 text-center">Sectors</div>
              <div className="col-span-2 text-center">Time</div>
              <div className="col-span-2 text-center">Completed At</div>
            </div>

            {/* Table body */}
            {results.length === 0 ? (
              <div className="px-5 py-12 text-center">
                <p className="text-white/30 text-lg mb-2">No results yet</p>
                <p className="text-white/20 text-sm">
                  Waiting for players to complete the quiz...
                </p>
              </div>
            ) : (
              <div className="divide-y divide-purple-500/5">
                {results.map((r, i) => (
                  <div
                    key={r.id || i}
                    className="grid grid-cols-12 gap-2 px-5 py-4 items-center hover:bg-white/[0.02] transition-colors"
                  >
                    {/* Rank */}
                    <div className="col-span-1 text-center">
                      {i === 0 && r.status === "completed" ? (
                        <span className="text-2xl">🥇</span>
                      ) : i === 1 && r.status === "completed" ? (
                        <span className="text-2xl">🥈</span>
                      ) : i === 2 && r.status === "completed" ? (
                        <span className="text-2xl">🥉</span>
                      ) : (
                        <span className="text-white/40 font-mono font-bold">
                          #{i + 1}
                        </span>
                      )}
                    </div>

                    {/* Player name */}
                    <div className="col-span-3">
                      <p className="text-white font-semibold truncate">
                        {r.playerName}
                      </p>
                    </div>

                    {/* Status */}
                    <div className="col-span-2 text-center">
                      {r.status === "completed" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-semibold">
                          ✓ Completed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-500/15 text-red-400 text-xs font-semibold">
                          ✗ Failed
                        </span>
                      )}
                    </div>

                    {/* Sectors */}
                    <div className="col-span-2 text-center">
                      <span className="text-purple-300 font-mono">
                        {r.sectorsCompleted}/{r.totalSectors}
                      </span>
                    </div>

                    {/* Time */}
                    <div className="col-span-2 text-center">
                      <span className="text-white/70 font-mono">
                        {formatTime(r.totalTimeSeconds)}
                      </span>
                    </div>

                    {/* Completed at */}
                    <div className="col-span-2 text-center">
                      <span className="text-white/30 text-xs">
                        {new Date(r.completedAt).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
