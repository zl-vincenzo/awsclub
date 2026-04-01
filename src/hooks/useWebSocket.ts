import { useRef, useCallback, useEffect } from "react";
import type { PlayerResult } from "../types/types";

const WS_URL = import.meta.env.VITE_WS_URL || "ws://localhost:8080";

export function useWebSocket() {
  const wsRef = useRef<WebSocket | null>(null);
  const callbacksRef = useRef<Map<string, ((data: unknown) => void)[]>>(new Map());

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return;

    try {
      const ws = new WebSocket(WS_URL);

      ws.onopen = () => {
        console.log("🟢 WebSocket connected");
      };

      ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);
          const handlers = callbacksRef.current.get(msg.type) || [];
          handlers.forEach((fn) => fn(msg));
        } catch {
          // ignore parse errors
        }
      };

      ws.onclose = () => {
        console.log("🔴 WebSocket disconnected");
        // Auto-reconnect after 3 seconds
        setTimeout(() => connect(), 3000);
      };

      ws.onerror = () => {
        ws.close();
      };

      wsRef.current = ws;
    } catch {
      // Connection failed, retry
      setTimeout(() => connect(), 3000);
    }
  }, []);

  const on = useCallback((type: string, callback: (data: unknown) => void) => {
    const handlers = callbacksRef.current.get(type) || [];
    handlers.push(callback);
    callbacksRef.current.set(type, handlers);
    return () => {
      const updated = (callbacksRef.current.get(type) || []).filter((fn) => fn !== callback);
      callbacksRef.current.set(type, updated);
    };
  }, []);

  const send = useCallback((type: string, data?: unknown) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type, data }));
    }
  }, []);

  const submitResult = useCallback((result: PlayerResult) => {
    send("SUBMIT_RESULT", result);
  }, [send]);

  const authenticate = useCallback((username: string, password: string) => {
    send("ADMIN_AUTH", { username, password });
  }, [send]);

  const getResults = useCallback(() => {
    send("GET_RESULTS");
  }, [send]);

  const deleteResult = useCallback((id: string) => {
    if (window.confirm("Delete this user's result?")) {
      send("DELETE_RESULT", { id });
    }
  }, [send]);

  useEffect(() => {
    return () => {
      wsRef.current?.close();
    };
  }, []);

  return { connect, on, send, submitResult, authenticate, getResults, deleteResult };
}
