import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Plus, Book, Users, Clock, Search, Grid, List, BookOpen, Award, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function CourseList() {
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Mock data - will be replaced with real data from Supabase
  const courses = [
    { id: 1, code: 'MATH101', name: 'Mathematics 7', gradeLevel: 'Grade 7', students: 45, units: 4, category: 'Core' },
    { id: 2, code: 'SCI101', name: 'Science 7', gradeLevel: 'Grade 7', students: 42, units: 4, category: 'Core' },
    { id: 3, code: 'ENG101', name: 'English 7', gradeLevel: 'Grade 7', students: 48, units: 4, category: 'Core' },
    { id: 4, code: 'FIL101', name: 'Filipino 7', gradeLevel: 'Grade 7', students: 46, units: 4, category: 'Core' },
    { id: 5, code: 'PE101', name: 'Physical Education 7', gradeLevel: 'Grade 7', students: 50, units: 2, category: 'Elective' },
    { id: 6, code: 'ARTS101', name: 'Arts 7', gradeLevel: 'Grade 7', students: 38, units: 2, category: 'Elective' },
  ]

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const stats = [
    { icon: BookOpen, label: 'Total Courses', value: courses.length, color: 'primary' },
    { icon: Users, label: 'Total Students', value: courses.reduce((sum, c) => sum + c.students, 0), color: 'accent' },
    { icon: Award, label: 'Core Subjects', value: courses.filter(c => c.category === 'Core').length, color: 'success' },
    { icon: TrendingUp, label: 'Avg Enrollment', value: Math.round(courses.reduce((sum, c) => sum + c.students, 0) / courses.length), color: 'warning' },
  ]

  const getIconColor = (index: number) => {
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
          <p className="text-secondary-600 mt-1">Manage academic subjects and curriculum</p>
        </div>
        <Button leftIcon={<Plus size={20} />}>Add Course</Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="p-4 border-none shadow-sm">
            <div className="flex items-center gap-3">
              <div className={cn("p-3 rounded-xl", getIconColor(i))}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-secondary-500 font-medium">{stat.label}</p>
                <p className="text-2xl font-bold text-secondary-900">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Search and View Controls */}
      <Card className="p-6 border-none shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-secondary-200 bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none text-sm"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-secondary-200 bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none text-sm"
            >
              <option value="all">All Categories</option>
              <option value="Core">Core</option>
              <option value="Elective">Elective</option>
            </select>

            <div className="flex items-center gap-1 bg-secondary-100 p-1 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  viewMode === 'grid' ? "bg-white text-primary-600 shadow-sm" : "text-secondary-600 hover:text-secondary-900"
                )}
                title="Grid View"
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  viewMode === 'list' ? "bg-white text-primary-600 shadow-sm" : "text-secondary-600 hover:text-secondary-900"
                )}
                title="List View"
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Courses Grid/List */}
      {filteredCourses.length === 0 ? (
        <Card className="p-12 border-none shadow-sm text-center">
          <div className="flex flex-col items-center justify-center text-secondary-500">
            <Search className="w-12 h-12 mb-3 text-secondary-300" />
            <p className="text-sm font-medium">No courses found</p>
            <p className="text-xs mt-1">Try adjusting your search or filters</p>
          </div>
        </Card>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, index) => (
            <Card key={course.id} className="p-6 border-none shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div className={cn("p-3 rounded-xl group-hover:scale-110 transition-transform", getIconColor(index))}>
                  <Book className="w-6 h-6" />
                </div>
                <span className={cn(
                  "text-xs font-semibold px-2.5 py-1 rounded-full",
                  course.category === 'Core' ? 'bg-primary-100 text-primary-700' : 'bg-accent-100 text-accent-700'
                )}>
                  {course.category}
                </span>
              </div>

              <div className="mb-4">
                <p className="text-xs font-medium text-secondary-500 mb-1">{course.code}</p>
                <h3 className="text-lg font-bold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {course.name}
                </h3>
                <p className="text-sm text-secondary-600">{course.gradeLevel}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-secondary-100">
                <div className="flex items-center gap-1.5 text-sm text-secondary-600">
                  <Users size={16} className="text-secondary-400" />
                  <span className="font-medium">{course.students} students</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-secondary-600">
                  <Clock size={16} className="text-secondary-400" />
                  <span className="font-medium">{course.units} units</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-none shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-secondary-50 border-b border-secondary-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-600 uppercase tracking-wider">Course</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-600 uppercase tracking-wider">Grade Level</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-600 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-600 uppercase tracking-wider">Students</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-600 uppercase tracking-wider">Units</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary-200">
              {filteredCourses.map((course, index) => (
                <tr key={course.id} className="hover:bg-secondary-50/50 transition-colors group cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={cn("p-2 rounded-lg", getIconColor(index))}>
                        <Book className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-medium text-secondary-900">{course.name}</p>
                        <p className="text-xs text-secondary-500">{course.code}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-secondary-600">{course.gradeLevel}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold",
                      course.category === 'Core' ? 'bg-primary-100 text-primary-700' : 'bg-accent-100 text-accent-700'
                    )}>
                      {course.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-secondary-900">{course.students}</td>
                  <td className="px-6 py-4 font-medium text-secondary-900">{course.units}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  )
}
