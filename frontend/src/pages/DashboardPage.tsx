import { useNavigate } from 'react-router-dom'
import { BookOpen, Bot, Lightbulb, ArrowRight, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { EyebrowLabel } from '@/components/ui/EyebrowLabel'
import { useAuth } from '@/hooks/useAuth'

const ROLE_LABELS: Record<string, string> = {
  student:         'Student',
  researcher:      'Researcher',
  innovator:       'Innovator',
  ip_professional: 'IP Professional',
  admin:           'Administrator',
}

export function DashboardPage() {
  const { user, logout } = useAuth()
  const navigate         = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <div className="bg-parchment min-h-screen">
      <div className="container-site py-12">

        {/* Welcome banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <EyebrowLabel text="DASHBOARD" color="gold" rule className="mb-3" />
            <h1 className="text-display-sm text-forest-dark">
              Welcome back, {user?.name ?? 'there'} 👋
            </h1>
            {user?.institution && (
              <p className="text-sm text-ink-muted mt-1">{user.institution}</p>
            )}
            {user?.role && (
              <div className="mt-2">
                <Badge variant="role">{ROLE_LABELS[user.role] ?? user.role}</Badge>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            icon={<LogOut size={15} />}
            onClick={handleLogout}
          >
            Sign out
          </Button>
        </div>

        {/* Quick access cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: <BookOpen size={28} strokeWidth={1.5} />,
              color: 'bg-forest-light text-forest-dark',
              title: 'Knowledge Atlas',
              desc: 'Continue exploring chapters from where you left off.',
              cta: 'Open Atlas',
              to: '/knowledge',
            },
            {
              icon: <Bot size={28} strokeWidth={1.5} />,
              color: 'bg-gold-light text-gold',
              title: 'Ayurveda AI',
              desc: 'Ask evidence-backed questions about Ayurveda, herbs or research.',
              cta: 'Ask AI',
              to: '/ai',
            },
            {
  icon: <Lightbulb size={28} strokeWidth={1.5} />,
  color: 'bg-sky-tint text-blue-700',
  title: 'Analyze Your Innovation',
  desc: 'Assess your innovation across patent, TK, ABS, regulatory and international considerations.',
  cta: 'Analyze Innovation',
  to: '/analyze-innovation',
},
          ].map((card) => (
            <div
              key={card.title}
              className="bg-white rounded-2xl shadow-card p-6 flex flex-col gap-4 card-hover"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.color}`}>
                {card.icon}
              </div>
              <div className="flex-1">
                <h2 className="text-base font-bold text-forest-dark mb-1">{card.title}</h2>
                <p className="text-sm text-ink-muted leading-relaxed">{card.desc}</p>
              </div>
              <Button
                variant="secondary"
                size="sm"
                icon={<ArrowRight size={14} />}
                iconPosition="right"
                onClick={() => navigate(card.to)}
              >
                {card.cta}
              </Button>
            </div>
          ))}
        </div>

        {/* Recent activity placeholder */}
        <div className="bg-white rounded-2xl shadow-card p-6">
          <h2 className="text-base font-bold text-forest-dark mb-4">Recent Activity</h2>
          <div className="text-sm text-ink-muted text-center py-8">
            Your recent AI queries, saved chapters and innovation analyses will appear here.
          </div>
        </div>

      </div>
    </div>
  )
}
