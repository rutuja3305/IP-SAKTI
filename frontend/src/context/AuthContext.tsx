import { createContext, useEffect, useReducer, type ReactNode } from 'react'
import type { User, AuthState } from '@/types'
import { authService } from '@/services/authService'

// ─── Context shape ────────────────────────────────────────────────────────────

interface AuthContextValue extends AuthState {
  login:    (email: string, password: string) => Promise<void>
  logout:   () => void
  register: (email: string, password: string) => Promise<void>
}

// ─── Reducer ──────────────────────────────────────────────────────────────────

type AuthAction =
  | { type: 'SET_LOADING' }
  | { type: 'SET_USER';    payload: User }
  | { type: 'CLEAR_USER' }

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: true }
    case 'SET_USER':
      return { user: action.payload, isAuthenticated: true, isLoading: false }
    case 'CLEAR_USER':
      return { user: null, isAuthenticated: false, isLoading: false }
    default:
      return state
  }
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,   // starts true — we check localStorage on mount
}

// ─── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null)

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Rehydrate session from localStorage on mount
  useEffect(() => {
    const stored = authService.getCurrentUser()
    if (stored) {
      dispatch({ type: 'SET_USER', payload: stored })
    } else {
      dispatch({ type: 'CLEAR_USER' })
    }
  }, [])

  async function login(email: string, password: string) {
    dispatch({ type: 'SET_LOADING' })
    const user = await authService.login({ email, password })
    dispatch({ type: 'SET_USER', payload: user })
  }

  function logout() {
    authService.logout()
    dispatch({ type: 'CLEAR_USER' })
  }

  async function register(email: string, password: string) {
    dispatch({ type: 'SET_LOADING' })
    const user = await authService.register({ email, password })
    dispatch({ type: 'SET_USER', payload: user })
  }

  return (
    <AuthContext.Provider value={{ ...state, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

// ─── Raw context export (used by useAuth hook) ────────────────────────────────

export { AuthContext }
