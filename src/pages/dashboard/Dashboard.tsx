import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import { Users, BookOpen, Calendar, TrendingUp, LogOut, Bell, Search, Home, GraduationCap, Menu, Settings, FileText } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export default function Dashboard() {
  const { user, logout } = useAuth()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const stats = [
    {
      icon: Users,
      label: 'Total Students',
      value: '1,234',
      change: '+12% from last month',
      color: 'text-primary-600 bg-primary-50',
    },
    {
      icon: BookOpen,
      label: 'Active Courses',
      value: '24',
      change: '+3 from last month',
      color: 'text-accent-600 bg-accent-50',
    },
    {
      icon: Calendar,
      label: 'Enrollments',
      value: '156',
      change: '+28% from last month',
      color: 'text-success-600 bg-success-50',
    },
    {
      icon: TrendingUp,
      label: 'Completion Rate',
      value: '94%',
      change: '+5% from last month',
      color: 'text-warning-600 bg-warning-50',
    },
  ]

  return (
    <div className="min-h-screen bg-secondary-50 flex">
      {/* Sidebar - Dark Blue (Matching Login Left Side) */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-secondary-950 text-white transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex flex-col",
          !isSidebarOpen && "-translate-x-full lg:hidden"
        )}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center gap-3 px-6 border-b border-white/10">
          <div className="p-1.5 bg-primary-600/20 rounded-lg border border-primary-500/30">
            <GraduationCap className="w-6 h-6 text-primary-400" />
          </div>
          <span className="text-xl font-heading font-bold tracking-tight">SSIS Portal</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <div className="px-2 py-2 text-xs font-semibold text-secondary-500 uppercase tracking-wider">
            Main Menu
          </div>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-primary-600/10 text-primary-400 font-medium border border-primary-500/10">
            <Home className="w-5 h-5" />
            Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-secondary-400 hover:text-white hover:bg-white/5 transition-colors font-medium">
            <Users className="w-5 h-5" />
            Students
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-secondary-400 hover:text-white hover:bg-white/5 transition-colors font-medium">
            <BookOpen className="w-5 h-5" />
            Courses
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-secondary-400 hover:text-white hover:bg-white/5 transition-colors font-medium">
            <Calendar className="w-5 h-5" />
            Enrollment
          </a>

          <div className="px-2 py-2 mt-6 text-xs font-semibold text-secondary-500 uppercase tracking-wider">
            System
          </div>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-secondary-400 hover:text-white hover:bg-white/5 transition-colors font-medium">
            <FileText className="w-5 h-5" />
            Reports
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-secondary-400 hover:text-white hover:bg-white/5 transition-colors font-medium">
            <Settings className="w-5 h-5" />
            Settings
          </a>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.email?.split('@')[0]}</p>
              <p className="text-xs text-secondary-400 truncate">Administrator</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area - Light (Matching Login Right Side) */}
      <div className="flex-1 flex flex-col min-w-0 bg-secondary-50">
        {/* Header */}
        <header className="h-16 bg-white border-b border-secondary-200 sticky top-0 z-40 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 text-secondary-500 hover:bg-secondary-100 rounded-lg"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-heading font-bold text-secondary-900 lg:hidden">Dashboard</h1>

            {/* Search Bar */}
            <div className="hidden lg:flex items-center max-w-md w-full relative">
              <Search className="w-5 h-5 text-secondary-400 absolute left-3" />
              <input
                type="text"
                placeholder="Search students, courses..."
                className="w-96 pl-10 pr-4 py-2 rounded-xl border border-secondary-200 bg-secondary-50 focus:bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-secondary-100 rounded-lg transition-colors relative">
              <Bell className="w-5 h-5 text-secondary-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-secondary-200 mx-1"></div>
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="text-secondary-600 hover:text-error-600 hover:bg-error-50"
              leftIcon={<LogOut size={16} />}
            >
              Logout
            </Button>
          </div>
        </header>

        {/* Content Scrollable Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-8">

            {/* Welcome Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-white p-8 border border-secondary-200 shadow-sm">
              <div className="relative z-10">
                <h2 className="text-3xl font-heading font-bold text-secondary-900 mb-2">
                  Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600">{user?.email?.split('@')[0]}</span>! 👋
                </h2>
                <p className="text-secondary-500 text-lg">Here's what's happening with your school today.</p>
              </div>
              {/* Decorative background elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-50 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2"></div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="p-6 rounded-2xl bg-white border border-secondary-200 shadow-sm hover:shadow-md transition-shadow group">
                  <div className="flex items-start justify-between mb-4">
                    <div className={cn("p-3 rounded-xl", stat.color)}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-success-50 text-success-700">
                      {stat.change.split(' ')[0]}
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold text-secondary-900 mb-1">{stat.value}</h3>
                  <p className="text-sm text-secondary-500">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Quick Actions */}
              <div className="p-6 rounded-2xl bg-white border border-secondary-200 shadow-sm">
                <h3 className="text-lg font-bold text-secondary-900 mb-6 flex items-center gap-2">
                  <div className="w-1 h-5 bg-primary-500 rounded-full"></div>
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center gap-4 p-4 rounded-xl border border-secondary-100 hover:border-primary-200 hover:bg-primary-50/50 transition-all group text-left">
                    <div className="p-2.5 bg-primary-100 text-primary-600 rounded-lg group-hover:scale-110 transition-transform">
                      <Users size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary-900 group-hover:text-primary-700">Manage Students</h4>
                      <p className="text-xs text-secondary-500">Add, edit, or remove student records</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-secondary-300 ml-auto group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
                  </button>

                  <button className="w-full flex items-center gap-4 p-4 rounded-xl border border-secondary-100 hover:border-accent-200 hover:bg-accent-50/50 transition-all group text-left">
                    <div className="p-2.5 bg-accent-100 text-accent-600 rounded-lg group-hover:scale-110 transition-transform">
                      <BookOpen size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary-900 group-hover:text-accent-700">Course Management</h4>
                      <p className="text-xs text-secondary-500">Update curriculum and subjects</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-secondary-300 ml-auto group-hover:text-accent-500 group-hover:translate-x-1 transition-all" />
                  </button>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="p-6 rounded-2xl bg-white border border-secondary-200 shadow-sm">
                <h3 className="text-lg font-bold text-secondary-900 mb-6 flex items-center gap-2">
                  <div className="w-1 h-5 bg-accent-500 rounded-full"></div>
                  Recent Activity
                </h3>
                <div className="space-y-6">
                  {[1, 2, 3].map((_, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-secondary-100 flex items-center justify-center border-2 border-white shadow-sm z-10 relative">
                          <Users className="w-5 h-5 text-secondary-500" />
                        </div>
                        {i !== 2 && <div className="absolute top-10 left-1/2 -translate-x-1/2 w-0.5 h-full bg-secondary-100 -z-0"></div>}
                      </div>
                      <div className="pb-2">
                        <p className="text-sm font-medium text-secondary-900">New student enrolled</p>
                        <p className="text-xs text-secondary-500 mt-0.5">John Doe added to Grade 11 - STEM</p>
                        <p className="text-xs text-secondary-400 mt-1">2 minutes ago</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  )
}
