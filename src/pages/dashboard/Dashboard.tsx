import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Users, BookOpen, Calendar, TrendingUp, LogOut, Bell, Search } from 'lucide-react'

export default function Dashboard() {
  const { user, logout } = useAuth()

  const stats = [
    {
      icon: Users,
      label: 'Total Students',
      value: '1,234',
      change: '+12%',
      color: 'text-primary-600 bg-primary-50',
    },
    {
      icon: BookOpen,
      label: 'Active Courses',
      value: '24',
      change: '+3',
      color: 'text-accent-600 bg-accent-50',
    },
    {
      icon: Calendar,
      label: 'Enrollments',
      value: '156',
      change: '+28%',
      color: 'text-success-600 bg-success-50',
    },
    {
      icon: TrendingUp,
      label: 'Completion Rate',
      value: '94%',
      change: '+5%',
      color: 'text-warning-600 bg-warning-50',
    },
  ]

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Header */}
      <header className="bg-white border-b border-secondary-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-heading font-bold text-secondary-900">Dashboard</h1>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-secondary-100 rounded-lg transition-colors">
                <Search className="w-5 h-5 text-secondary-600" />
              </button>
              <button className="p-2 hover:bg-secondary-100 rounded-lg transition-colors relative">
                <Bell className="w-5 h-5 text-secondary-600" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error-500 rounded-full"></span>
              </button>
              <div className="flex items-center gap-3 pl-4 border-l border-secondary-200">
                <div className="text-right">
                  <p className="text-sm font-semibold text-secondary-900">{user?.email}</p>
                  <p className="text-xs text-secondary-500">Administrator</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-heading font-bold mb-2">Welcome back! 👋</h2>
            <p className="text-white/90">Here's what's happening with your school today.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-secondary-500">{stat.label}</p>
                    <h3 className="text-3xl font-bold text-secondary-900">{stat.value}</h3>
                    <p className="text-xs text-success-600 font-medium">{stat.change} from last month</p>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start" leftIcon={<Users size={18} />}>
                  Manage Students
                </Button>
                <Button variant="outline" className="w-full justify-start" leftIcon={<BookOpen size={18} />}>
                  View Courses
                </Button>
                <Button variant="outline" className="w-full justify-start" leftIcon={<Calendar size={18} />}>
                  Enrollment Period
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-secondary-900">New student enrolled</p>
                    <p className="text-xs text-secondary-500">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-accent-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-secondary-900">Course updated</p>
                    <p className="text-xs text-secondary-500">1 hour ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-success-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-secondary-900">Staff member added</p>
                    <p className="text-xs text-secondary-500">3 hours ago</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
