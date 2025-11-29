import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Plus, Search, Filter } from 'lucide-react'

export default function StudentList() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-secondary-900">Students</h1>
          <p className="text-secondary-500">Manage student records and enrollments.</p>
        </div>
        <Button leftIcon={<Plus size={20} />}>Add Student</Button>
      </div>

      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-400" />
            <input
              type="text"
              placeholder="Search students..."
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-secondary-200 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none"
            />
          </div>
          <Button variant="outline" leftIcon={<Filter size={16} />}>Filters</Button>
        </div>

        <div className="rounded-lg border border-secondary-200 overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-secondary-50 text-secondary-500 font-medium border-b border-secondary-200">
              <tr>
                <th className="px-4 py-3">Student ID</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Course</th>
                <th className="px-4 py-3">Year Level</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary-200">
              <tr className="hover:bg-secondary-50/50 transition-colors">
                <td className="px-4 py-3 font-medium text-secondary-900">2023-0001</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold text-xs">
                      JD
                    </div>
                    <span>John Doe</span>
                  </div>
                </td>
                <td className="px-4 py-3">BS Computer Science</td>
                <td className="px-4 py-3">3rd Year</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success-50 text-success-700">
                    Enrolled
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Button variant="ghost" size="sm">Edit</Button>
                </td>
              </tr>
              {/* Placeholder rows */}
              {[1, 2, 3].map(i => (
                <tr key={i} className="hover:bg-secondary-50/50 transition-colors">
                  <td className="px-4 py-3 font-medium text-secondary-900">2023-000{i + 1}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary-100 text-secondary-600 flex items-center justify-center font-bold text-xs">
                        ST
                      </div>
                      <span>Student Name {i}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">BS Information Tech</td>
                  <td className="px-4 py-3">1st Year</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success-50 text-success-700">
                      Enrolled
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="ghost" size="sm">Edit</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
