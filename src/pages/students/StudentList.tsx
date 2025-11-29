import { useState } from 'react'
import { Plus, Search, Filter, Eye, Edit, Trash2, Download, ChevronLeft, ChevronRight } from 'lucide-react'
import { useStudents, useStudentStats } from '@/lib/query/hooks'
import { useRole } from '@/hooks/useRole'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export default function StudentList() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedGrade, setSelectedGrade] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const { canManage } = useRole()

  const { data: studentsData, isLoading, error } = useStudents({
    gradeLevel: selectedGrade,
    status: selectedStatus as any,
    search: searchQuery,
  })

  const { data: stats, isLoading: statsLoading } = useStudentStats()

  const students = studentsData?.students || []
  const totalPages = Math.ceil(students.length / itemsPerPage)
  const paginatedStudents = students.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const getInitials = (firstName?: string | null, lastName?: string | null) => {
    const first = firstName?.charAt(0) || ''
    const last = lastName?.charAt(0) || ''
    return (first + last).toUpperCase() || '??'
  }

  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-primary-100 text-primary-700',
      'bg-accent-100 text-accent-700',
      'bg-success-100 text-success-700',
      'bg-warning-100 text-warning-700',
      'bg-error-100 text-error-700',
    ]
    const index = name.charCodeAt(0) % colors.length
    return colors[index]
  }

  const statsCards = [
    { label: 'Total Students', value: stats?.total || 0, change: '+12%' },
    { label: 'Active', value: stats?.active || 0, change: '+8%' },
    { label: 'Inactive', value: stats?.inactive || 0, change: '-3%' },
    { label: 'New This Month', value: stats?.newThisMonth || 0, change: '+20%' },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-secondary-900">Students</h1>
          <p className="text-secondary-600 mt-1">Manage student records and enrollments</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" leftIcon={<Download size={18} />}>Export</Button>
          {canManage && <Button leftIcon={<Plus size={20} />}>Add Student</Button>}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat, i) => (
          <Card key={i} className="p-4 border-none shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-secondary-500 font-medium">{stat.label}</p>
                {statsLoading ? (
                  <div className="h-8 w-16 bg-secondary-200 animate-pulse rounded mt-1" />
                ) : (
                  <p className="text-2xl font-bold text-secondary-900 mt-1">{stat.value}</p>
                )}
              </div>
              <span className={cn("text-xs font-semibold",
                stat.change.startsWith('+') ? 'text-success-600' : 'text-error-600')}>
                {stat.change}
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* Table Card */}
      <Card className="border-none shadow-sm">
        {/* Search and Filters */}
        <div className="p-6 border-b border-secondary-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
              <input
                type="text"
                placeholder="Search by name, ID, or LRN..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-secondary-200 bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none text-sm"
              />
            </div>
            <Button
              variant={showFilters ? "primary" : "outline"}
              leftIcon={<Filter size={18} />}
              onClick={() => setShowFilters(!showFilters)}
            >
              Filters {(selectedGrade !== 'all' || selectedStatus !== 'all') && `(${[selectedGrade !== 'all', selectedStatus !== 'all'].filter(Boolean).length})`}
            </Button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-4 p-4 rounded-xl bg-secondary-50 border border-secondary-200 animate-slide-down">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-secondary-900">Filters</h3>
                <button onClick={() => {
                  setSelectedGrade('all')
                  setSelectedStatus('all')
                }} className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                  Clear All
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Grade Level</label>
                  <select
                    value={selectedGrade}
                    onChange={(e) => setSelectedGrade(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-secondary-300 bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none text-sm"
                  >
                    <option value="all">All Grades</option>
                    <option value="Grade 7">Grade 7</option>
                    <option value="Grade 8">Grade 8</option>
                    <option value="Grade 9">Grade 9</option>
                    <option value="Grade 10">Grade 10</option>
                    <option value="Grade 11">Grade 11</option>
                    <option value="Grade 12">Grade 12</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Status</label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-secondary-300 bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none text-sm"
                  >
                    <option value="all">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary-50 border-b border-secondary-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-600 uppercase tracking-wider">Student</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-600 uppercase tracking-wider">LRN</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-600 uppercase tracking-wider">Grade & Section</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-600 uppercase tracking-wider">Status</th>
                {canManage && <th className="px-6 py-4 text-right text-xs font-semibold text-secondary-600 uppercase tracking-wider">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary-200">
              {isLoading ? (
                // Loading skeleton
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-secondary-200" />
                        <div className="space-y-2">
                          <div className="h-4 w-32 bg-secondary-200 rounded" />
                          <div className="h-3 w-20 bg-secondary-200 rounded" />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4"><div className="h-3 w-24 bg-secondary-200 rounded" /></td>
                    <td className="px-6 py-4"><div className="h-3 w-20 bg-secondary-200 rounded" /></td>
                    <td className="px-6 py-4"><div className="h-6 w-16 bg-secondary-200 rounded-full" /></td>
                    {canManage && <td className="px-6 py-4"><div className="h-8 w-20 bg-secondary-200 rounded ml-auto" /></td>}
                  </tr>
                ))
              ) : error ? (
                <tr>
                  <td colSpan={canManage ? 5 : 4} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-error-600">
                      <p className="text-sm font-medium">Error loading students</p>
                      <p className="text-xs mt-1">{error.message}</p>
                    </div>
                  </td>
                </tr>
              ) : paginatedStudents.length === 0 ? (
                <tr>
                  <td colSpan={canManage ? 5 : 4} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-secondary-500">
                      <Search className="w-12 h-12 mb-3 text-secondary-300" />
                      <p className="text-sm font-medium">No students found</p>
                      <p className="text-xs mt-1">Try adjusting your search or filters</p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedStudents.map((student) => {
                  const fullName = `${student.first_name || ''} ${student.last_name || ''}`.trim() || 'Unknown Student'

                  return (
                    <tr key={student.id} className="hover:bg-secondary-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm", getAvatarColor(fullName))}>
                            {getInitials(student.first_name, student.last_name)}
                          </div>
                          <div>
                            <p className="font-medium text-secondary-900">{fullName}</p>
                            <p className="text-xs text-secondary-500">{student.student_id || 'No ID'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-secondary-600 font-mono text-xs">{student.lrn || 'N/A'}</td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-secondary-900">{student.grade_level || 'N/A'}</p>
                          <p className="text-xs text-secondary-500">{student.section || 'N/A'}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold",
                          student.status === 'Active' ? 'bg-success-100 text-success-700' : 'bg-warning-100 text-warning-700'
                        )}>
                          {student.status || 'Active'}
                        </span>
                      </td>
                      {canManage && (
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-1.5 hover:bg-primary-50 text-primary-600 rounded-lg transition-colors" title="View">
                              <Eye size={16} />
                            </button>
                            <button className="p-1.5 hover:bg-accent-50 text-accent-600 rounded-lg transition-colors" title="Edit">
                              <Edit size={16} />
                            </button>
                            <button className="p-1.5 hover:bg-error-50 text-error-600 rounded-lg transition-colors" title="Delete">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && !isLoading && (
          <div className="px-6 py-4 border-t border-secondary-200 flex items-center justify-between">
            <p className="text-sm text-secondary-600">
              Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
              <span className="font-medium">{Math.min(currentPage * itemsPerPage, students.length)}</span> of{' '}
              <span className="font-medium">{students.length}</span> students
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                leftIcon={<ChevronLeft size={16} />}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={cn(
                        "w-8 h-8 rounded-lg text-sm font-medium transition-colors",
                        currentPage === pageNum
                          ? "bg-primary-600 text-white"
                          : "text-secondary-600 hover:bg-secondary-100"
                      )}
                    >
                      {pageNum}
                    </button>
                  )
                })}
              </div>
              <Button
                variant="outline"
                size="sm"
                rightIcon={<ChevronRight size={16} />}
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
