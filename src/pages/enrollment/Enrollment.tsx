import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CheckCircle2, Clock, AlertCircle, XCircle, Search, Filter, Eye, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useEnrollments, useEnrollmentStats, useEnrollmentSubscription } from '@/lib/query/hooks'

export default function Enrollment() {
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Enable real-time subscriptions
  useEnrollmentSubscription()

  // Fetch data from Supabase
  const { data: enrollmentsData, isLoading, error } = useEnrollments({
    status: activeTab as any,
    search: searchQuery,
  })

  const { data: stats, isLoading: statsLoading } = useEnrollmentStats()

  const enrollments = enrollmentsData?.enrollments || []

  const statusConfig = {
    pending: { label: 'Pending', color: 'bg-warning-100 text-warning-700', icon: Clock },
    approved: { label: 'Approved', color: 'bg-success-100 text-success-700', icon: CheckCircle2 },
    issues: { label: 'Issues', color: 'bg-error-100 text-error-700', icon: AlertCircle },
    rejected: { label: 'Rejected', color: 'bg-secondary-100 text-secondary-700', icon: XCircle },
  }

  const statsCards = [
    { label: 'All Applications', value: stats?.total || 0, status: 'all', color: 'bg-primary-100 text-primary-700' },
    { label: 'Pending', value: stats?.pending || 0, status: 'pending', color: 'bg-warning-100 text-warning-700' },
    { label: 'Approved', value: stats?.approved || 0, status: 'approved', color: 'bg-success-100 text-success-700' },
    { label: 'Issues', value: stats?.issues || 0, status: 'issues', color: 'bg-error-100 text-error-700' },
  ]

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
  }

  const getAvatarColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-warning-100 text-warning-700',
      approved: 'bg-success-100 text-success-700',
      issues: 'bg-error-100 text-error-700',
      rejected: 'bg-secondary-100 text-secondary-700',
    }
    return colors[status] || 'bg-primary-100 text-primary-700'
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-secondary-900">Enrollment</h1>
          <p className="text-secondary-600 mt-1">Manage student enrollment applications</p>
        </div>
        <Button leftIcon={<FileText size={20} />}>Download Report</Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat, i) => (
          <Card
            key={i}
            onClick={() => setActiveTab(stat.status)}
            className={cn(
              "p-4 border-none shadow-sm cursor-pointer transition-all",
              activeTab === stat.status ? "ring-2 ring-primary-500 shadow-md" : "hover:shadow-md"
            )}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-secondary-500 font-medium">{stat.label}</p>
                {statsLoading ? (
                  <div className="h-8 w-16 bg-secondary-200 animate-pulse rounded mt-1" />
                ) : (
                  <p className="text-3xl font-bold text-secondary-900 mt-1">{stat.value}</p>
                )}
              </div>
              <div className={cn("p-3 rounded-full", stat.color)}>
                <FileText className="w-5 h-5" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Search and Filters */}
      <Card className="p-6 border-none shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
            <input
              type="text"
              placeholder="Search by name or LRN..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-secondary-200 bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none text-sm"
            />
          </div>
          <Button variant="outline" leftIcon={<Filter size={18} />}>Filters</Button>
        </div>
      </Card>

      {/* Applications List */}
      <Card className="border-none shadow-sm">
        <div className="p-6 border-b border-secondary-200">
          <h3 className="text-lg font-bold text-secondary-900">
            Applications ({enrollments.length})
          </h3>
        </div>

        <div className="divide-y divide-secondary-200">
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="p-6 animate-pulse">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary-200" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-48 bg-secondary-200 rounded" />
                    <div className="h-3 w-64 bg-secondary-200 rounded" />
                  </div>
                  <div className="h-6 w-20 bg-secondary-200 rounded-full" />
                </div>
              </div>
            ))
          ) : error ? (
            <div className="p-12 text-center">
              <div className="flex flex-col items-center justify-center text-error-600">
                <p className="text-sm font-medium">Error loading enrollments</p>
                <p className="text-xs mt-1">{error.message}</p>
              </div>
            </div>
          ) : enrollments.length === 0 ? (
            <div className="p-12 text-center">
              <div className="flex flex-col items-center justify-center text-secondary-500">
                <Search className="w-12 h-12 mb-3 text-secondary-300" />
                <p className="text-sm font-medium">No applications found</p>
                <p className="text-xs mt-1">Try adjusting your search or filters</p>
              </div>
            </div>
          ) : (
            enrollments.map((enrollment: any) => {
              const studentName = enrollment.student
                ? `${enrollment.student.first_name || ''} ${enrollment.student.last_name || ''}`.trim()
                : 'Unknown Student'
              const status = (enrollment.status || 'pending') as keyof typeof statusConfig
              const StatusIcon = statusConfig[status]?.icon || Clock

              return (
                <div
                  key={enrollment.id}
                  className="p-6 hover:bg-secondary-50/50 transition-colors group"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className={cn("w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm", getAvatarColor(status))}>
                        {getInitials(studentName)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-secondary-900 truncate">{studentName}</h4>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-secondary-500">
                          <span className="font-mono text-xs">{enrollment.lrn || 'No LRN'}</span>
                          <span>•</span>
                          <span>{enrollment.student?.grade_level || 'N/A'}</span>
                          <span>•</span>
                          <span>Submitted {new Date(enrollment.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <StatusIcon className="w-4 h-4" />
                        <span className={cn(
                          "inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold",
                          statusConfig[status]?.color || 'bg-secondary-100 text-secondary-700'
                        )}>
                          {statusConfig[status]?.label || status}
                        </span>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="sm" variant="outline" leftIcon={<Eye size={16} />}>
                          Review
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </Card>
    </div>
  )
}
