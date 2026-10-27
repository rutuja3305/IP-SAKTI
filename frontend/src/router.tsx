import { createBrowserRouter } from 'react-router-dom'

import { RootLayout }     from '@/components/layout/RootLayout'
import { ProtectedRoute } from '@/components/layout/ProtectedRoute'


// ── Public pages (inside RootLayout) ─────────────────────────────────────────
import { LandingPage }                from '@/pages/LandingPage'
import { KnowledgeAtlasPage }         from '@/pages/KnowledgeAtlasPage'
import { ChapterDetailPage }          from '@/pages/ChapterDetailPage'
import { AyurvedaAIPage }             from '@/pages/AyurvedaAIPage'
import { InnovationIntelligencePage } from '@/pages/InnovationIntelligencePage'
import { AboutPage }                  from '@/pages/AboutPage'
import { NotFoundPage }               from '@/pages/NotFoundPage'

// ── Auth pages — BASIC journey (no Navbar / Footer) ──────────────────────────
import { BasicLoginPage }      from '@/pages/auth/BasicLoginPage'

// ── Auth pages — INNOVATION journey (no Navbar / Footer) ─────────────────────
import { InnovationLoginPage }    from '@/pages/auth/InnovationLoginPage'
import { RegisterPage }           from '@/pages/auth/RegisterPage'
import { RoleSelectionPage }      from '@/pages/auth/RoleSelectionPage'
import { StudentProfilePage }     from '@/pages/auth/StudentProfilePage'
import { ProfessionalProfilePage } from '@/pages/auth/ProfessionalProfilePage'
import { VerificationPage }       from '@/pages/auth/VerificationPage'
import { SuccessPage }            from '@/pages/auth/SuccessPage'
import { AnalyzeYourInnovationPage } from '@/pages/AnalyzeYourInnovationPage'


// ── Protected pages ───────────────────────────────────────────────────────────
import { DashboardPage } from '@/pages/DashboardPage'

export const router = createBrowserRouter([

  // ── BASIC AUTH journey ─────────────────────────────────────────────────────
  // /login → Knowledge Atlas login (email/mobile + password, no professional info)
  { path: '/login', element: <BasicLoginPage /> },

  // ── INNOVATION AUTH journey ────────────────────────────────────────────────
  // /innovation-login → welcome + existing user OR create account
  { path: '/innovation-login',     element: <InnovationLoginPage /> },

  // Shared registration (context=basic|innovation via query param)
  { path: '/register',             element: <RegisterPage /> },

  // Innovation onboarding flow
  { path: '/role-selection',       element: <RoleSelectionPage /> },
  { path: '/student-profile',      element: <StudentProfilePage /> },
  { path: '/professional-profile', element: <ProfessionalProfilePage /> },
  { path: '/verify',               element: <VerificationPage /> },

  // Legacy route aliases — kept for backward compat with any existing links
  { path: '/researcher-profile',   element: <ProfessionalProfilePage /> },

  // Success screen (shared by both journeys)
  { path: '/account-created',      element: <SuccessPage /> },
  // Legacy alias
  { path: '/success',              element: <SuccessPage /> },

  // ── Pages inside RootLayout (Navbar + Footer) ─────────────────────────────
  {
    element: <RootLayout />,
    children: [
      {
  path: '/analyze-innovation',
  element: <AnalyzeYourInnovationPage />,
},

      // Protected
      {
        element: <ProtectedRoute />,
        children: [
          { path: '/dashboard', element: <DashboardPage /> },
        ],
      },

      // Public
      { path: '/',                        element: <LandingPage /> },
      { path: '/knowledge',               element: <KnowledgeAtlasPage /> },
      { path: '/knowledge/:chapterId',    element: <ChapterDetailPage /> },
      { path: '/ai',                      element: <AyurvedaAIPage /> },
      { path: '/innovation',              element: <InnovationIntelligencePage /> },
      { path: '/about',                   element: <AboutPage /> },

      // 404
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
