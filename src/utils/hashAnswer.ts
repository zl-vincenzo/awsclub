export async function hashAnswer(answer: string): Promise<string> {
  const normalized = answer.trim().toLowerCase().replace(/\s+/g, " ");
  const encoded = new TextEncoder().encode(normalized);
  const hashBuffer = await crypto.subtle.digest("SHA-256", encoded);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}
