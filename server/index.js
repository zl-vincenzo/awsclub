import { WebSocketServer } from "ws";

const PORT = process.env.PORT || 8080;
const ADMIN_USER = process.env.ADMIN_USER || "admin";
const ADMIN_PASS = process.env.ADMIN_PASS || "cloudclub2026";

// In-memory store
const results = [];

const wss = new WebSocketServer({ port: PORT });

console.log(`🚀 NeuroLink WS Server running on port ${PORT}`);

wss.on("connection", (ws) => {
  console.log("📡 Client connected");

  ws.on("message", (raw) => {
    try {
      const msg = JSON.parse(raw.toString());

      switch (msg.type) {
        case "SUBMIT_RESULT": {
          const result = {
            ...msg.data,
            id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
            receivedAt: new Date().toISOString(),
          };
          results.push(result);
          console.log(`✅ Result from "${result.playerName}" — ${result.status}`);

          // Broadcast to all connected leaderboard clients
          const broadcast = JSON.stringify({
            type: "RESULTS_UPDATE",
            data: getSortedResults(),
          });
          wss.clients.forEach((client) => {
            if (client.readyState === 1) client.send(broadcast);
          });

          ws.send(JSON.stringify({ type: "RESULT_ACK", success: true }));
          break;
        }

        case "ADMIN_AUTH": {
          const { username, password } = msg.data;
          const ok = username === ADMIN_USER && password === ADMIN_PASS;
          ws.send(
            JSON.stringify({
              type: "AUTH_RESPONSE",
              success: ok,
              data: ok ? getSortedResults() : null,
            })
          );
          if (ok) {
            ws._isAdmin = true;
            console.log("🔑 Admin authenticated");
          }
          break;
        }

        case "GET_RESULTS": {
          if (ws._isAdmin) {
            ws.send(
              JSON.stringify({
                type: "RESULTS_UPDATE",
                data: getSortedResults(),
              })
            );
          } else {
            ws.send(JSON.stringify({ type: "AUTH_REQUIRED" }));
          }
          break;
        }

        default:
          ws.send(JSON.stringify({ type: "ERROR", message: "Unknown message type" }));
      }
    } catch (err) {
      console.error("❌ Parse error:", err.message);
      ws.send(JSON.stringify({ type: "ERROR", message: "Invalid JSON" }));
    }
  });

  ws.on("close", () => {
    console.log("📴 Client disconnected");
  });
});

function getSortedResults() {
  return [...results].sort((a, b) => {
    // Completed first, then by time
    if (a.status === "completed" && b.status !== "completed") return -1;
    if (a.status !== "completed" && b.status === "completed") return 1;
    return a.totalTimeSeconds - b.totalTimeSeconds;
  });
}
