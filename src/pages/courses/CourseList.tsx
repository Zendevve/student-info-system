import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Plus, Book, Users, Clock, Search, Grid, List, BookOpen, Award, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCourses, useCourseStats } from '@/lib/query/hooks'
import { useRole } from '@/hooks/useRole'

export default function CourseList() {
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const { canManage } = useRole()

  // Fetch data from Supabase
  const { data: coursesData, isLoading, error } = useCourses({
    category: selectedCategory as any,
    search: searchQuery,
  })

  const { data: stats, isLoading: statsLoading } = useCourseStats()

  const courses = coursesData?.courses || []

  const statsCards = [
    { icon: BookOpen, label: 'Total Courses', value: stats?.totalCourses || 0, color: 'primary' },
    { icon: Users, label: 'Total Students', value: stats?.totalStudents || 0, color: 'accent' },
    { icon: Award, label: 'Core Subjects', value: stats?.coreSubjects || 0, color: 'success' },
    { icon: TrendingUp, label: 'Avg Enrollment', value: stats?.avgEnrollment || 0, color: 'warning' },
  ]

  const getIconColor = (color: string) => {
    const colors: Record<string, string> = {
      primary: 'bg-primary-100 text-primary-600',
      accent: 'bg-accent-100 text-accent-600',
      success: 'bg-success-100 text-success-600',
      warning: 'bg-warning-100 text-warning-600',
      error: 'bg-error-100 text-error-600',
    }
    return colors[color] || 'bg-secondary-100 text-secondary-600'
  }

  const getCardColor = (index: number) => {
    const colors = [
      'bg-primary-100 text-primary-600',
      'bg-accent-100 text-accent-600',
      'bg-success-100 text-success-600',
      'bg-warning-100 text-warning-600',
      'bg-error-100 text-error-600',
    ]
    return colors[index % colors.length]
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-secondary-900">Courses</h1>
          <p className="text-secondary-600 mt-1">Manage course offerings and subjects</p>
        </div>
        {canManage && <Button leftIcon={<Plus size={20} />}>Add Course</Button>}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat, i) => (
          <Card key={i} className="p-6 border-none shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className={cn("p-3 rounded-xl", getIconColor(stat.color))}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <div>
              <p className="text-sm text-secondary-500 font-medium mb-1">{stat.label}</p>
              {statsLoading ? (
                <div className="h-8 w-16 bg-secondary-200 animate-pulse rounded" />
              ) : (
                <p className="text-3xl font-bold text-secondary-900">{stat.value}</p>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Controls */}
      <Card className="p-6 border-none shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-secondary-200 bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none text-sm"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-secondary-200 bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none text-sm"
          >
            <option value="all">All Categories</option>
            <option value="Core">Core</option>
            <option value="Elective">Elective</option>
          </select>
          <div className="flex items-center gap-2 border border-secondary-200 rounded-xl p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                "p-2 rounded-lg transition-colors",
                viewMode === 'grid' ? "bg-primary-600 text-white" : "text-secondary-600 hover:bg-secondary-100"
              )}
            >
              <Grid size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                "p-2 rounded-lg transition-colors",
                viewMode === 'list' ? "bg-primary-600 text-white" : "text-secondary-600 hover:bg-secondary-100"
              )}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </Card>

      {/* Courses Grid/List */}
      {isLoading ? (
        <div className={cn(
          "grid gap-6",
          viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
        )}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="p-6 border-none shadow-sm animate-pulse">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-secondary-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 bg-secondary-200 rounded" />
                  <div className="h-3 w-1/2 bg-secondary-200 rounded" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-3 w-full bg-secondary-200 rounded" />
                <div className="h-3 w-2/3 bg-secondary-200 rounded" />
              </div>
            </Card>
          ))}
        </div>
      ) : error ? (
        <Card className="p-12 border-none shadow-sm">
          <div className="flex flex-col items-center justify-center text-error-600">
            <p className="text-sm font-medium">Error loading courses</p>
            <p className="text-xs mt-1">{error.message}</p>
          </div>
        </Card>
      ) : courses.length === 0 ? (
        <Card className="p-12 border-none shadow-sm">
          <div className="flex flex-col items-center justify-center text-secondary-500">
            <BookOpen className="w-12 h-12 mb-3 text-secondary-300" />
            <p className="text-sm font-medium">No courses found</p>
            <p className="text-xs mt-1">Try adjusting your search or filters</p>
          </div>
        </Card>
      ) : (
        <div className={cn(
          "grid gap-6",
          viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
        )}>
          {courses.map((course, index) => (
            <Card
              key={course.id}
              className="group hover:shadow-lg transition-all duration-300 border-none shadow-sm overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className={cn("p-3 rounded-xl group-hover:scale-110 transition-transform", getCardColor(index))}>
                    <Book className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-secondary-900 truncate group-hover:text-primary-600 transition-colors">
                      {course.name}
                    </h3>
                    <p className="text-sm text-secondary-500 font-mono">{course.code}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  {course.description && (
                    <p className="text-sm text-secondary-600 line-clamp-2">{course.description}</p>
                  )}
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-secondary-200">
                  <div className="flex items-center gap-2 text-sm text-secondary-600">
                    <Users size={16} />
                    <span>{course.enrolled_students || 0} students</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-secondary-600">
                    <Clock size={16} />
                    <span>{course.units} {course.units === 1 ? 'unit' : 'units'}</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className={cn(
                    "px-2.5 py-1 rounded-full text-xs font-semibold",
                    course.category === 'Core' ? 'bg-success-100 text-success-700' : 'bg-accent-100 text-accent-700'
                  )}>
                    {course.category || 'Core'}
                  </span>
                  <Button size="sm" variant="ghost">View Details</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
