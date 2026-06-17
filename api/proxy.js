export const config = { runtime: 'edge' };

export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS', 'Access-Control-Allow-Headers': '*' } });
  }
  const body = req.method === 'POST' ? await req.text() : undefined;
  const ollamaUrl = req.headers.get('x-ollama-url') || 'http://localhost:11434';
  const path = new URL(req.url).searchParams.get('path') || '/api/chat';
  const resp = await fetch(ollamaUrl + path, {
    method: req.method,
    headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true', 'User-Agent': 'ODD-Tagger/1.0' },
    body
  });
  const data = await resp.text();
  return new Response(data, { status: resp.status, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
}