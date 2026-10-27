import { useContext } from 'react'
import { AuthContext } from '@/context/AuthContext'

/**
 * useAuth — access the authentication context anywhere in the tree.
 * Throws a clear error if used outside <AuthProvider>.
 */
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used inside <AuthProvider>')
  }
  return ctx
}
