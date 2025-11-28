import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import { Users, BookOpen, Calendar, TrendingUp, LogOut, Bell, Search, Home, GraduationCap } from 'lucide-react'

export default function Dashboard() {
  const { user, logout } = useAuth()

  const stats = [
    {
      icon: Users,
      label: 'Total Students',
      value: '1,234',
      change: '+12% from last month',
    },
    {
      icon: BookOpen,
      label: 'Active Courses',
      value: '24',
      change: '+3 from last month',
    },
    {
      icon: Calendar,
      label: 'Enrollments',
      value: '156',
      change: '+28% from last month',
    },
    {
      icon: TrendingUp,
      label: 'Completion Rate',
      value: '94%',
      change: '+5% from last month',
    },
  ]

  return (
    <div className="min-h-screen bg-secondary-950">
      {/* Animated Background - matching login page */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-primary-900/20 z-0"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-500/30 rounded-full blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent-500/20 rounded-full blur-[120px]"></div>
      </div>

      {/* Header - sleek and minimal */}
      <header className="relative z-10 border-b border-white/10 backdrop-blur-md bg-secondary-950/80 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-600/20 rounded-xl backdrop-blur-md border border-primary-500/30">
                  <GraduationCap className="w-6 h-6 text-primary-400" />
                </div>
                <h1 className="text-xl font-heading font-bold text-white">SSIS Portal</h1>
              </div>
              <nav className="hidden md:flex items-center gap-1 ml-8">
                <a href="#" className="px-3 py-1.5 rounded-lg text-white font-medium text-sm bg-white/10">
                  Overview
                </a>
                <a href="#" className="px-3 py-1.5 rounded-lg text-secondary-300 hover:text-white font-medium text-sm transition-colors">
                  Students
                </a>
                <a href="#" className="px-3 py-1.5 rounded-lg text-secondary-300 hover:text-white font-medium text-sm transition-colors">
                  Classes
                </a>
              </nav>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <Search className="w-5 h-5 text-secondary-300" />
              </button>
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors relative">
                <Bell className="w-5 h-5 text-secondary-300" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary-500 rounded-full"></span>
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
                  className="border-white/20 text-white hover:bg-white/10"
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
          {/* Welcome Section - matching login style */}
          <div className="space-y-4">
            <h2 className="text-4xl font-heading font-bold text-white leading-tight">
              Welcome back, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">
                {user?.email?.split('@')[0]}
              </span>
            </h2>
            <p className="text-lg text-secondary-200 leading-relaxed font-medium max-w-2xl">
              Here's your overview for today. Manage your school operations with precision and efficiency.
            </p>
          </div>

          {/* Stats Grid - matching login card style */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2.5 bg-primary-600/20 rounded-xl border border-primary-500/30">
                    <stat.icon className="w-5 h-5 text-primary-400" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">{stat.value}</h3>
                <p className="text-sm text-secondary-400 mb-1">{stat.label}</p>
                <p className="text-xs text-secondary-500">{stat.change}</p>
              </div>
            ))}
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            {/* Quick Actions */}
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary-600/20 rounded-lg">
                  <Home className="w-5 h-5 text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
              </div>
              <div className="space-y-3">
                <button className="w-full text-left p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-primary-400" />
                      <span className="text-white font-medium">Manage Students</span>
                    </div>
                    <span className="text-secondary-400 group-hover:text-white transition-colors">→</span>
                  </div>
                </button>
                <button className="w-full text-left p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5 text-primary-400" />
                      <span className="text-white font-medium">View Courses</span>
                    </div>
                    <span className="text-secondary-400 group-hover:text-white transition-colors">→</span>
                  </div>
                </button>
                <button className="w-full text-left p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-primary-400" />
                      <span className="text-white font-medium">Enrollment Period</span>
                    </div>
                    <span className="text-secondary-400 group-hover:text-white transition-colors">→</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary-600/20 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-white">New student enrolled</p>
                    <p className="text-xs text-secondary-400 mt-0.5">John Doe, Grade 11 - STEM</p>
                    <p className="text-xs text-secondary-500 mt-1">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-white">Course curriculum updated</p>
                    <p className="text-xs text-secondary-400 mt-0.5">Mathematics - Advanced Calculus</p>
                    <p className="text-xs text-secondary-500 mt-1">1 hour ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                  <div>
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
