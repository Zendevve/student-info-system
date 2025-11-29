import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Plus, Book } from 'lucide-react'

export default function CourseList() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-secondary-900">Courses</h1>
          <p className="text-secondary-500">Manage academic programs and subjects.</p>
        </div>
        <Button leftIcon={<Plus size={20} />}>Add Course</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5].map(i => (
          <Card key={i} className="p-6 hover:shadow-md transition-shadow cursor-pointer group">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-xl bg-accent-50 text-accent-600 group-hover:bg-accent-100 transition-colors">
                <Book className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-secondary-100 text-secondary-600">
                BSCS
              </span>
            </div>
            <h3 className="text-lg font-bold text-secondary-900 mb-2">Bachelor of Science in Computer Science</h3>
            <p className="text-sm text-secondary-500 mb-4 line-clamp-2">
              A four-year degree program that focuses on the study of computing concepts and theories, algorithmic foundations, and new developments in computing.
            </p>
            <div className="flex items-center justify-between text-sm text-secondary-500 border-t border-secondary-100 pt-4">
              <span>4 Years</span>
              <span>185 Units</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
