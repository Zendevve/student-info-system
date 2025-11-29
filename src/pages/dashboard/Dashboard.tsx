import { useAuth } from '@/context/AuthContext'
import { Users, FileText, CheckCircle2, AlertCircle, Search, ArrowRight, ClipboardList } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export default function Dashboard() {
  const { user } = useAuth()

  const stats = [
    {
      icon: Users,
      label: 'Total Users',
      value: '21',
      status: 'Active',
      statusColor: 'text-success-600 bg-success-50',
      iconBg: 'bg-primary-100 text-primary-600',
    },
    {
      icon: FileText,
      label: 'Total Applications',
      value: '90',
      status: 'All Time',
      statusColor: 'text-primary-600 bg-primary-50',
      iconBg: 'bg-primary-100 text-primary-600',
    },
    {
      icon: ClipboardList,
      label: 'Pending Review',
      value: '9',
      status: 'Action Needed',
      statusColor: 'text-warning-600 bg-warning-50',
      iconBg: 'bg-warning-100 text-warning-600',
    },
    {
      icon: CheckCircle2,
      label: 'Approval Rate',
      value: '25%',
      status: 'High',
      statusColor: 'text-success-600 bg-success-50',
      iconBg: 'bg-success-100 text-success-600',
    },
  ]

  return (
    <div className="space-y-8 animate-fade-in pb-8">
      {/* Banner Section */}
      <div className="relative overflow-hidden rounded-2xl bg-secondary-900 text-white p-8 shadow-lg">
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-secondary-400 text-sm font-medium uppercase tracking-wider">
              <div className="p-1 rounded border border-secondary-600">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              Admin Portal
            </div>
            <h1 className="text-4xl font-heading font-bold">Dashboard Overview</h1>
            <p className="text-secondary-400">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-400" />
              <input
                type="text"
                placeholder="Search Records"
                className="pl-9 pr-4 py-2.5 rounded-lg bg-white/10 border border-white/10 text-white placeholder:text-secondary-400 focus:bg-white/20 focus:outline-none transition-colors text-sm w-64"
              />
            </div>
            <Button className="bg-white text-secondary-900 hover:bg-secondary-100 border-none shadow-none font-semibold">
              <FileText className="w-4 h-4 mr-2" />
              Review Applications
            </Button>
          </div>
        </div>

        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6 border-none shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-6">
              <div className={cn("p-3 rounded-full", stat.iconBg)}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className={cn("px-2.5 py-1 rounded-full text-xs font-bold", stat.statusColor)}>
                {stat.status}
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-secondary-500">{stat.label}</p>
              <h3 className="text-3xl font-bold text-secondary-900">{stat.value}</h3>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Incoming Applications */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-secondary-900">Incoming Applications</h3>
            <button className="text-sm font-medium text-primary-600 hover:text-primary-700">View All</button>
          </div>

          <div className="space-y-4">
            {[1, 2].map((_, i) => (
              <Card key={i} className="p-4 border-none shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center font-bold">
                      {i === 0 ? '2' : 'r'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-secondary-900">{i === 0 ? '2' : 'r3wrwefew'}</h4>
                        <span className="text-xs text-secondary-400">•</span>
                        <span className="text-sm text-secondary-500">Arnhel Guinto</span>
                      </div>
                      <p className="text-sm text-secondary-500">{i === 0 ? 'renewal Application' : 'new Application'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-sm text-secondary-400">1 day ago</span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary-50 text-primary-600">
                      Submitted
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-secondary-900">Quick Actions</h3>
          <Card className="p-6 border-none shadow-sm relative overflow-hidden group cursor-pointer hover:shadow-md transition-all">
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-primary-50 text-primary-600">
                  <ClipboardList className="w-6 h-6" />
                </div>
                <ArrowRight className="w-5 h-5 text-secondary-300 group-hover:text-primary-600 transition-colors" />
              </div>
              <h4 className="text-lg font-bold text-secondary-900 mb-1">Review Applications</h4>
              <p className="text-sm text-secondary-500">Process pending permit requests</p>
            </div>

            {/* Action Button */}
            <div className="absolute bottom-4 right-4 w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-primary-600/30 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              <ArrowRight className="w-5 h-5" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
