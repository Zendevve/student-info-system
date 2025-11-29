import { useAuth } from '@/context/AuthContext'
import { Users, BookOpen, Calendar, TrendingUp, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Dashboard() {
  const { user } = useAuth()

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
    <div className="space-y-8 animate-fade-in">
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
  )
}
