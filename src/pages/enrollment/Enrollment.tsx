import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Search, Filter, CheckCircle, XCircle, Clock, AlertCircle, Eye } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useEnrollments } from '@/lib/query/hooks'
import { useRole } from '@/hooks/useRole'

export default function Enrollment() {
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected' | 'issues'>('pending')
  const [searchQuery, setSearchQuery] = useState('')

  const { canManage } = useRole()

  const { data: enrollmentsData, isLoading, error } = useEnrollments({
    status: activeTab,
    search: searchQuery,
  })

  const enrollments = enrollmentsData?.enrollments || []

  const tabs = [
    { id: 'pending', label: 'Pending', icon: Clock, count: 0 },
    { id: 'approved', label: 'Approved', icon: CheckCircle, count: 0 },
    { id: 'rejected', label: 'Rejected', icon: XCircle, count: 0 },
    { id: 'issues', label: 'Issues', icon: AlertCircle, count: 0 },
  ] as const

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-success-100 text-success-700'
      case 'rejected': return 'bg-error-100 text-error-700'
      case 'issues': return 'bg-warning-100 text-warning-700'
      default: return 'bg-primary-100 text-primary-700'
    }
  }

  const getInitials = (firstName?: string | null, lastName?: string | null) => {
    const first = firstName?.charAt(0) || ''
    const last = lastName?.charAt(0) || ''
    return (first + last).toUpperCase() || '??'
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-heading font-bold text-secondary-900">Enrollment</h1>
        <p className="text-secondary-600 mt-1">Manage student enrollment applications</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all whitespace-nowrap",
              activeTab === tab.id
                ? "bg-primary-600 text-white shadow-lg shadow-primary-600/20"
                : "bg-white text-secondary-600 hover:bg-secondary-50 border border-secondary-200"
            )}
          >
            <tab.icon size={18} />
            <span>{tab.label}</span>
            {tab.count > 0 && (
              <span className={cn(
                "px-2 py-0.5 rounded-full text-xs",
                activeTab === tab.id ? "bg-white/20 text-white" : "bg-secondary-100 text-secondary-600"
              )}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <Card className="border-none shadow-sm">
        <div className="p-6 border-b border-secondary-200">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
              <input
                type="text"
                placeholder="Search applications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-secondary-200 bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none text-sm"
              />
            </div>
            <Button variant="outline" leftIcon={<Filter size={18} />}>Filter</Button>
          </div>
        </div>

        <div className="divide-y divide-secondary-200">
          {isLoading ? (
            <div className="p-12 text-center">
              <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-secondary-500">Loading enrollments...</p>
            </div>
          ) : error ? (
            <div className="p-12 text-center text-error-600">
              <p>Error loading enrollments</p>
              <p className="text-sm mt-1">{error.message}</p>
            </div>
          ) : enrollments.length === 0 ? (
            <div className="p-12 text-center text-secondary-500">
              <p>No {activeTab} enrollments found</p>
            </div>
          ) : (
            enrollments.map((enrollment) => (
              <div key={enrollment.id} className="p-6 hover:bg-secondary-50/50 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary-100 flex items-center justify-center text-lg font-bold text-secondary-600">
                      {getInitials(enrollment.student?.first_name, enrollment.student?.last_name)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary-900">
                        {enrollment.student?.last_name}, {enrollment.student?.first_name}
                      </h3>
                      <div className="flex items-center gap-3 mt-1 text-sm text-secondary-500">
                        <span>{enrollment.student?.lrn}</span>
                        <span>•</span>
                        <span>{enrollment.grade_level}</span>
                        <span>•</span>
                        <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", getStatusColor(enrollment.status))}>
                          {enrollment.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">View Details</Button>
                    {canManage && activeTab === 'pending' && (
                      <>
                        <Button size="sm" className="bg-success-600 hover:bg-success-700 text-white">Approve</Button>
                        <Button size="sm" variant="outline" className="text-error-600 hover:text-error-700 hover:bg-error-50 border-error-200">Reject</Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  )
}
