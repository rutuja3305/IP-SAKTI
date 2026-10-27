/**
 * apiClient.ts — thin fetch wrapper for the service layer.
 *
 * Controls the switch between mock and real FastAPI:
 *   VITE_USE_MOCK=true   → services use in-memory mock data (Phase 1 default)
 *   VITE_USE_MOCK=false  → services call VITE_API_BASE_URL (real FastAPI)
 *
 * The UI never imports this directly — it calls service functions.
 */

export const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false'
export const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'

// ─── Shared API error ─────────────────────────────────────────────────────────

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code?: string,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

// ─── Request helpers ─────────────────────────────────────────────────────────

function getHeaders(): HeadersInit {
  const token = localStorage.getItem('ipsakti_token')
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let message = `HTTP ${res.status}`
    try {
      const body = await res.json() as { message?: string; detail?: string }
      message = body.message ?? body.detail ?? message
    } catch {
      // ignore parse errors
    }
    throw new ApiError(res.status, message)
  }
  return res.json() as Promise<T>
}

// ─── HTTP methods ─────────────────────────────────────────────────────────────

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'GET',
    headers: getHeaders(),
  })
  return handleResponse<T>(res)
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(body),
  })
  return handleResponse<T>(res)
}

export async function apiPut<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(body),
  })
  return handleResponse<T>(res)
}

export async function apiDelete<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'DELETE',
    headers: getHeaders(),
  })
  return handleResponse<T>(res)
}

// ─── Mock delay helper (simulate network latency) ────────────────────────────

export function mockDelay(ms = 600): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
