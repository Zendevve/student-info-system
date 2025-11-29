import { Card } from '@/components/ui/card'
import { BarChart3, PieChart } from 'lucide-react'

export default function Reports() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-heading font-bold text-secondary-900">Reports & Analytics</h1>
        <p className="text-secondary-500">View system insights and generate reports.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 h-80 flex flex-col items-center justify-center text-secondary-400 border-dashed">
          <BarChart3 className="w-12 h-12 mb-4 opacity-50" />
          <p>Enrollment Trends Chart Placeholder</p>
        </Card>
        <Card className="p-6 h-80 flex flex-col items-center justify-center text-secondary-400 border-dashed">
          <PieChart className="w-12 h-12 mb-4 opacity-50" />
          <p>Student Demographics Chart Placeholder</p>
        </Card>
      </div>
    </div>
  )
}
