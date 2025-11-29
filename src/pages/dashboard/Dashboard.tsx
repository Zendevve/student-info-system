import { Users, FileText, CheckCircle2, ArrowRight, ClipboardList, GraduationCap, BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/store/authStore'
import { useStudentStats } from '@/lib/query/hooks/useStudents'
import { useCourseStats } from '@/lib/query/hooks/useCourses'
import { useEnrollmentStats, useEnrollments } from '@/lib/query/hooks/useEnrollments'
import { formatDistanceToNow } from 'date-fns'

export default function Dashboard() {
  const { user, profile } = useAuthStore()

  // Fetch real stats
  const { data: studentStats } = useStudentStats()
  const { data: courseStats } = useCourseStats()
  const { data: enrollmentStats } = useEnrollmentStats()

  // Fetch pending enrollments for "Incoming Applications"
  const { data: pendingEnrollments } = useEnrollments({ status: 'pending' })

  const stats = [
    {
      icon: Users,
      label: 'Total Students',
      value: studentStats?.total.toString() || '0',
      status: 'Active',
      statusColor: 'text-success-600 bg-success-50',
      iconBg: 'bg-primary-100 text-primary-600',
    },
    {
      icon: BookOpen,
      label: 'Total Courses',
      value: courseStats?.totalCourses.toString() || '0',
      status: 'Offered',
      statusColor: 'text-primary-600 bg-primary-50',
      iconBg: 'bg-primary-100 text-primary-600',
    },
    {
      icon: ClipboardList,
      label: 'Pending Review',
      value: enrollmentStats?.pending.toString() || '0',
      status: 'Action Needed',
      statusColor: 'text-warning-600 bg-warning-50',
      iconBg: 'bg-warning-100 text-warning-600',
    },
    {
      icon: CheckCircle2,
      label: 'Enrolled',
      value: enrollmentStats?.approved.toString() || '0',
      status: 'This Year',
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
                <GraduationCap className="w-3 h-3" />
              </div>
              SSIS Admin
            </div>
            <h1 className="text-4xl font-heading font-bold">
              Welcome back, {profile?.first_name || user?.email?.split('@')[0] || 'Administrator'}!
            </h1>
            <p className="text-secondary-400">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/enrollment">
              <Button className="bg-white text-secondary-900 hover:bg-secondary-100 border-none shadow-none font-semibold">
                <FileText className="w-4 h-4 mr-2" />
                Review Applications
              </Button>
            </Link>
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
            <Link to="/enrollment" className="text-sm font-medium text-primary-600 hover:text-primary-700">View All</Link>
          </div>

          <div className="space-y-4">
            {pendingEnrollments?.enrollments.length === 0 ? (
              <Card className="p-8 border-none shadow-sm flex flex-col items-center justify-center text-center space-y-3">
                <div className="p-3 bg-secondary-50 rounded-full">
                  <CheckCircle2 className="w-6 h-6 text-secondary-400" />
                </div>
                <p className="text-secondary-500 font-medium">No pending applications</p>
                <p className="text-sm text-secondary-400">All caught up! Check back later.</p>
              </Card>
            ) : (
              pendingEnrollments?.enrollments.slice(0, 5).map((enrollment) => (
                <Card key={enrollment.id} className="p-4 border-none shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center font-bold uppercase text-sm">
                        EN
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-secondary-900">
                            Enrollment #{enrollment.id.slice(0, 8)}
                          </h4>
                          <span className="text-xs text-secondary-400">•</span>
                          <span className="text-sm text-secondary-500">Student ID: {enrollment.user_id?.slice(0, 8) || 'N/A'}</span>
                        </div>
                        <p className="text-sm text-secondary-500">Enrollment Application</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="text-sm text-secondary-400">
                        {enrollment.created_at ? formatDistanceToNow(new Date(enrollment.created_at), { addSuffix: true }) : 'Recently'}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-warning-50 text-warning-600 capitalize">
                        {enrollment.status}
                      </span>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-secondary-900">Quick Actions</h3>
          <Link to="/enrollment">
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
          </Link>

          <Link to="/students">
            <Card className="p-6 border-none shadow-sm relative overflow-hidden group cursor-pointer hover:shadow-md transition-all mt-4">
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-success-50 text-success-600">
                    <Users className="w-6 h-6" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-secondary-300 group-hover:text-success-600 transition-colors" />
                </div>
                <h4 className="text-lg font-bold text-secondary-900 mb-1">Manage Students</h4>
                <p className="text-sm text-secondary-500">View and edit student records</p>
              </div>

              {/* Action Button */}
              <div className="absolute bottom-4 right-4 w-10 h-10 bg-success-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-success-600/30 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <ArrowRight className="w-5 h-5" />
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
