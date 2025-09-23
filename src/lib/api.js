// Simple API helper for the UI
// Reads VITE_API_BASE and VITE_AGENT_API_KEY from env

const API_BASE = import.meta.env.VITE_API_BASE;
const AGENT_KEY = import.meta.env.VITE_AGENT_API_KEY;

if (!API_BASE) {
  console.warn('VITE_API_BASE is not set');
}

async function request(path, { method = 'GET', headers = {}, body } = {}) {
  const url = `${API_BASE}${path}`;
  const finalHeaders = {
    'Content-Type': 'application/json',
    ...headers,
  };
  // Send X-API-Key for write operations (PATCH/PUT/POST if needed)
  if ((method === 'PATCH' || method === 'PUT' || method === 'POST') && AGENT_KEY) {
    finalHeaders['X-API-Key'] = AGENT_KEY;
  }
  const res = await fetch(url, {
    method,
    headers: finalHeaders,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`HTTP ${res.status}: ${text || res.statusText}`);
  }
  const ct = res.headers.get('content-type') || '';
  if (ct.includes('application/json')) return res.json();
  return res.text();
}

export function apiGet(path) {
  return request(path, { method: 'GET' });
}

export function apiPatch(path, body) {
  return request(path, { method: 'PATCH', body });
}

export function ask(message) {
  return request('/ask', { method: 'POST', body: { message } });
}

