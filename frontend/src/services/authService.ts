/**
 * authService.ts — authentication service.
 *
 * Phase 1: localStorage mock — no network calls.
 * Future: replace mock blocks with apiPost('/api/v1/auth/...') calls.
 * The AuthContext and all pages remain unchanged on that swap.
 *
 * localStorage keys:
 *   ipsakti_users   — array of stored mock users (JSON)
 *   ipsakti_auth    — currently logged-in user (JSON)
 *   ipsakti_token   — mock JWT token string
 */

import type { User, UserRole, LoginCredentials, RegisterCredentials } from '@/types'
import { USE_MOCK, mockDelay, apiPost } from './apiClient'

// ─── Constants ────────────────────────────────────────────────────────────────

const AUTH_KEY   = 'ipsakti_auth'
const USERS_KEY  = 'ipsakti_users'
const TOKEN_KEY  = 'ipsakti_token'

// ─── Mock helpers ─────────────────────────────────────────────────────────────

interface StoredMockUser {
  id: string
  email: string
  passwordHash: string   // plain text in mock — never do this in production
  name: string
  role: UserRole
  institution?: string
  fieldOfInterest?: string
  createdAt: string
}

function getStoredUsers(): StoredMockUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY)
    return raw ? (JSON.parse(raw) as StoredMockUser[]) : []
  } catch {
    return []
  }
}

function saveStoredUsers(users: StoredMockUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function mockTokenFor(userId: string): string {
  return `mock-jwt-${userId}-${Date.now()}`
}

function toUser(stored: StoredMockUser): User {
  return {
    id:              stored.id,
    email:           stored.email,
    name:            stored.name,
    role:            stored.role,
    institution:     stored.institution,
    fieldOfInterest: stored.fieldOfInterest,
    createdAt:       stored.createdAt,
  }
}

// ─── Service interface ────────────────────────────────────────────────────────

export const authService = {

  /**
   * Returns the currently logged-in user, or null if not authenticated.
   * Called by AuthProvider on mount to rehydrate session.
   */
  getCurrentUser(): User | null {
    try {
      const raw = localStorage.getItem(AUTH_KEY)
      return raw ? (JSON.parse(raw) as User) : null
    } catch {
      return null
    }
  },

  /**
   * Login — mock or real.
   * Mock: looks up email in stored users, validates password string match.
   */
  async login(credentials: LoginCredentials): Promise<User> {
    if (USE_MOCK) {
      await mockDelay(700)
      const users = getStoredUsers()
      const found = users.find((u) => u.email === credentials.email)
      if (!found || found.passwordHash !== credentials.password) {
        throw new Error('Invalid email or password.')
      }
      const user  = toUser(found)
      const token = mockTokenFor(user.id)
      localStorage.setItem(AUTH_KEY, JSON.stringify(user))
      localStorage.setItem(TOKEN_KEY, token)
      return user
    }

    // ── Real FastAPI path ──────────────────────────────────────────────
    const { user, token } = await apiPost<{ user: User; token: string }>(
      '/api/v1/auth/login',
      credentials,
    )
    localStorage.setItem(AUTH_KEY, JSON.stringify(user))
    localStorage.setItem(TOKEN_KEY, token)
    return user
  },

  /**
   * Register — creates a new mock user with default role 'student'.
   * The registration flow sets role + profile separately via updateProfile().
   */
  async register(credentials: RegisterCredentials): Promise<User> {
    if (USE_MOCK) {
      await mockDelay(600)
      const users = getStoredUsers()
      if (users.some((u) => u.email === credentials.email)) {
        throw new Error('An account with this email already exists.')
      }
      const newUser: StoredMockUser = {
        id:           `user-${Date.now()}`,
        email:        credentials.email,
        passwordHash: credentials.password,
        name:         credentials.email.split('@')[0] ?? 'User',
        role:         'student',
        createdAt:    new Date().toISOString(),
      }
      saveStoredUsers([...users, newUser])
      const user  = toUser(newUser)
      const token = mockTokenFor(user.id)
      localStorage.setItem(AUTH_KEY, JSON.stringify(user))
      localStorage.setItem(TOKEN_KEY, token)
      return user
    }

    const { user, token } = await apiPost<{ user: User; token: string }>(
      '/api/v1/auth/register',
      credentials,
    )
    localStorage.setItem(AUTH_KEY, JSON.stringify(user))
    localStorage.setItem(TOKEN_KEY, token)
    return user
  },

  /**
   * Update profile after registration (role selection + profile step).
   * Persists to the mock user store and updates the session.
   */
  updateProfile(patch: Partial<Pick<User, 'name' | 'role' | 'institution' | 'fieldOfInterest'>>) {
    const current = this.getCurrentUser()
    if (!current) return

    // Update mock user store
    if (USE_MOCK) {
      const users = getStoredUsers()
      const idx   = users.findIndex((u) => u.id === current.id)
      if (idx !== -1) {
        users[idx] = { ...users[idx], ...patch }
        saveStoredUsers(users)
      }
    }

    // Update session
    const updated: User = { ...current, ...patch }
    localStorage.setItem(AUTH_KEY, JSON.stringify(updated))
    return updated
  },

  /**
   * Logout — clears all session keys.
   */
  logout() {
    localStorage.removeItem(AUTH_KEY)
    localStorage.removeItem(TOKEN_KEY)
  },
}
