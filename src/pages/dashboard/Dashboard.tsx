import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Users, BookOpen, Calendar, TrendingUp, LogOut, Bell, Search, Home, FileText, Settings, Menu } from 'lucide-react'

export default function Dashboard() {
  const { user, logout } = useAuth()

  const stats = [
    {
      icon: Users,
      label: 'Total Students',
      value: '1,234',
      change: '+12%',
      gradient: 'from-primary-500 to-primary-600',
    },
    {
      icon: BookOpen,
      label: 'Active Courses',
      value: '24',
      change: '+3',
      gradient: 'from-accent-500 to-accent-600',
    },
    {
      icon: Calendar,
      label: 'Enrollments',
      value: '156',
      change: '+28%',
      gradient: 'from-primary-400 to-accent-500',
    },
    {
      icon: TrendingUp,
      label: 'Completion Rate',
      value: '94%',
      change: '+5%',
      gradient: 'from-accent-400 to-primary-500',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-950 via-secondary-900 to-secondary-950">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-500/20 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-accent-500/20 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-primary-400/10 rounded-full blur-[100px]"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 bg-secondary-900/50 backdrop-blur-xl sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6">
              <h1 className="text-2xl font-heading font-bold text-white">Dashboard</h1>
              <nav className="hidden md:flex items-center gap-1">
                <a href="#" className="px-4 py-2 rounded-lg bg-white/10 text-white font-medium text-sm transition-colors">
                  <Home className="w-4 h-4 inline-block mr-2" />
                  Overview
                </a>
                <a href="#" className="px-4 py-2 rounded-lg text-secondary-300 hover:bg-white/5 hover:text-white font-medium text-sm transition-colors">
                  Students
                </a>
                <a href="#" className="px-4 py-2 rounded-lg text-secondary-300 hover:bg-white/5 hover:text-white font-medium text-sm transition-colors">
                  Classes
                </a>
              </nav>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors group">
                <Search className="w-5 h-5 text-secondary-400 group-hover:text-white transition-colors" />
              </button>
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors relative group">
                <Bell className="w-5 h-5 text-secondary-400 group-hover:text-white transition-colors" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent-500 rounded-full ring-2 ring-secondary-900"></span>
              </button>
              <div className="flex items-center gap-3 pl-3 ml-3 border-l border-white/10">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-semibold text-white">{user?.email?.split('@')[0]}</p>
                  <p className="text-xs text-secondary-400">Administrator</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className="border-white/10 text-white hover:bg-white/10"
                  leftIcon={<LogOut size={16} />}
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-600 to-accent-600 p-8 shadow-glow">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-heading font-bold text-white mb-2">Welcome back, {user?.email?.split('@')[0]}! 👋</h2>
              <p className="text-white/90 text-lg">Here's what's happening with your school today.</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300 hover:shadow-glow-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity"
                  style={{ backgroundImage: `linear-gradient(to bottom right, var(--color-primary-500), var(--color-accent-500))` }}></div>

                <div className="relative z-10 flex items-start justify-between">
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-secondary-400">{stat.label}</p>
                    <h3 className="text-4xl font-bold text-white">{stat.value}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-accent-400">{stat.change}</span>
                      <span className="text-xs text-secondary-500">from last month</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions & Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quick Actions */}
            <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 shadow-glass">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-primary-500 to-accent-500 rounded-full"></div>
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group">
                  <div className="p-2 rounded-lg bg-primary-500/20 text-primary-400 group-hover:bg-primary-500/30 transition-colors">
                    <Users size={20} />
                  </div>
                  <span className="text-white font-medium">Manage Students</span>
                  <div className="ml-auto text-secondary-400 group-hover:text-white transition-colors">→</div>
                </button>
                <button className="w-full flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group">
                  <div className="p-2 rounded-lg bg-accent-500/20 text-accent-400 group-hover:bg-accent-500/30 transition-colors">
                    <BookOpen size={20} />
                  </div>
                  <span className="text-white font-medium">View Courses</span>
                  <div className="ml-auto text-secondary-400 group-hover:text-white transition-colors">→</div>
                </button>
                <button className="w-full flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group">
                  <div className="p-2 rounded-lg bg-primary-400/20 text-primary-300 group-hover:bg-primary-400/30 transition-colors">
                    <Calendar size={20} />
                  </div>
                  <span className="text-white font-medium">Enrollment Period</span>
                  <div className="ml-auto text-secondary-400 group-hover:text-white transition-colors">→</div>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 shadow-glass">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-accent-500 to-primary-500 rounded-full"></div>
                Recent Activity
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 shadow-glow-sm"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">New student enrolled</p>
                    <p className="text-xs text-secondary-400 mt-0.5">John Doe, Grade 11 - STEM</p>
                    <p className="text-xs text-secondary-500 mt-1">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                  <div className="w-2 h-2 bg-accent-500 rounded-full mt-2 shadow-glow-sm"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">Course curriculum updated</p>
                    <p className="text-xs text-secondary-400 mt-0.5">Mathematics - Advanced Calculus</p>
                    <p className="text-xs text-secondary-500 mt-1">1 hour ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                  <div className="w-2 h-2 bg-primary-400 rounded-full mt-2 shadow-glow-sm"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">New staff member added</p>
                    <p className="text-xs text-secondary-400 mt-0.5">Dr. Maria Santos, Biology Teacher</p>
                    <p className="text-xs text-secondary-500 mt-1">3 hours ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
