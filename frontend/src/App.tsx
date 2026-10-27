import { RouterProvider } from 'react-router-dom'
import { AuthProvider }   from '@/context/AuthContext'
import { router }         from './router'

/**
 * App — root component.
 *
 * AuthProvider wraps the entire router so every page (including
 * auth pages) can access the auth context via useAuth().
 */
export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}
