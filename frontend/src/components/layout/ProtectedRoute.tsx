import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Spinner } from '@/components/ui/Spinner'

/**
 * ProtectedRoute — guards routes that require authentication.
 *
 * - If auth is still loading (e.g. reading localStorage on mount), shows a
 *   centered spinner to avoid a flash of redirect.
 * - If not authenticated, redirects to /login, preserving the intended URL in
 *   state so we can redirect back after login.
 * - If authenticated, renders the child route via <Outlet />.
 */
export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]" aria-live="polite">
        <Spinner size="lg" label="Checking authentication…" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{ from: location.pathname }}
        replace
      />
    )
  }

  return <Outlet />
}
