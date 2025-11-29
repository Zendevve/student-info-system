import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BarChart3, PieChart, TrendingUp, Users, BookOpen, Calendar, Download, Filter } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState('month')

  const stats = [
    { icon: Users, label: 'Total Students', value: '1,234', change: '+12%', trend: 'up' },
    { icon: BookOpen, label: 'Active Courses', value: '48', change: '+5%', trend: 'up' },
    { icon: TrendingUp, label: 'Enrollment Rate', value: '87%', change: '+3%', trend: 'up' },
    { icon: Calendar, label: 'This Month', value: '156', change: '+18%', trend: 'up' },
  ]

  const reports = [
    { title: 'Student Enrollment Report', description: 'Overview of student enrollment trends and statistics', icon: Users, color: 'primary' },
    { title: 'Course Performance Report', description: 'Analysis of course completion and performance metrics', icon: BookOpen, color: 'accent' },
    { title: 'Attendance Report', description: 'Student attendance tracking and summaries', icon: Calendar, color: 'success' },
    { title: 'Grade Distribution Report', description: 'Grade distribution across all courses and sections', icon: BarChart3, color: 'warning' },
  ]

  const getIconColor = (color: string) => {
    const colors: Record<string, string> = {
      primary: 'bg-primary-100 text-primary-600',
      accent: 'bg-accent-100 text-accent-600',
      success: 'bg-success-100 text-success-600',
      warning: 'bg-warning-100 text-warning-600',
    }
    return colors[color] || 'bg-secondary-100 text-secondary-600'
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-secondary-900">Reports & Analytics</h1>
          <p className="text-secondary-600 mt-1">View insights and generate custom reports</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" leftIcon={<Filter size={18} />}>Filters</Button>
          <Button leftIcon={<Download size={20} />}>Export Report</Button>
        </div>
      </div>

      {/* Period Selector */}
      <Card className="p-4 border-none shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-secondary-600 mr-2">Period:</span>
          {['week', 'month', 'quarter', 'year'].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize",
                selectedPeriod === period
                  ? "bg-primary-600 text-white"
                  : "bg-secondary-100 text-secondary-600 hover:bg-secondary-200"
              )}
            >
              {period}
            </button>
          ))}
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="p-6 border-none shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className={cn("p-3 rounded-xl", getIconColor(['primary', 'accent', 'success', 'warning'][i]))}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className={cn(
                "text-xs font-semibold px-2 py-1 rounded-full",
                stat.trend === 'up' ? 'bg-success-100 text-success-700' : 'bg-error-100 text-error-700'
              )}>
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-sm text-secondary-500 font-medium mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-secondary-900">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 border-none shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-secondary-900">Enrollment Trends</h3>
            <BarChart3 className="w-5 h-5 text-secondary-400" />
          </div>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-secondary-200 rounded-xl bg-secondary-50/50">
            <div className="text-center text-secondary-400">
              <BarChart3 className="w-12 h-12 mb-3 mx-auto opacity-50" />
              <p className="text-sm font-medium">Chart visualization</p>
              <p className="text-xs mt-1">Will be replaced with real chart library</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-none shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-secondary-900">Grade Distribution</h3>
            <PieChart className="w-5 h-5 text-secondary-400" />
          </div>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-secondary-200 rounded-xl bg-secondary-50/50">
            <div className="text-center text-secondary-400">
              <PieChart className="w-12 h-12 mb-3 mx-auto opacity-50" />
              <p className="text-sm font-medium">Chart visualization</p>
              <p className="text-xs mt-1">Will be replaced with real chart library</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Available Reports */}
      <Card className="p-6 border-none shadow-sm">
        <h3 className="text-lg font-bold text-secondary-900 mb-6">Available Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reports.map((report, i) => (
            <div
              key={i}
              className="p-4 rounded-xl border border-secondary-200 hover:border-primary-300 hover:bg-primary-50/50 transition-all group cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className={cn("p-3 rounded-xl group-hover:scale-110 transition-transform", getIconColor(report.color))}>
                  <report.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-secondary-900 mb-1 group-hover:text-primary-600 transition-colors">
                    {report.title}
                  </h4>
                  <p className="text-sm text-secondary-500">{report.description}</p>
                  <Button size="sm" variant="ghost" className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    Generate Report
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
