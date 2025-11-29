import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react'

export default function Enrollment() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-heading font-bold text-secondary-900">Enrollment</h1>
        <p className="text-secondary-500">Process student enrollments and view status.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 border-l-4 border-l-warning-500">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-warning-500" />
            <h3 className="font-bold text-secondary-900">Pending Approval</h3>
          </div>
          <p className="text-2xl font-bold text-secondary-900">45</p>
          <p className="text-sm text-secondary-500">Applications waiting for review</p>
        </Card>

        <Card className="p-6 border-l-4 border-l-success-500">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle2 className="w-5 h-5 text-success-500" />
            <h3 className="font-bold text-secondary-900">Enrolled</h3>
          </div>
          <p className="text-2xl font-bold text-secondary-900">1,234</p>
          <p className="text-sm text-secondary-500">Successfully enrolled students</p>
        </Card>

        <Card className="p-6 border-l-4 border-l-error-500">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="w-5 h-5 text-error-500" />
            <h3 className="font-bold text-secondary-900">Issues</h3>
          </div>
          <p className="text-2xl font-bold text-secondary-900">12</p>
          <p className="text-sm text-secondary-500">Applications requiring attention</p>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-bold text-secondary-900 mb-4">Recent Applications</h3>
        <div className="space-y-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-secondary-100 hover:bg-secondary-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary-200 flex items-center justify-center font-bold text-secondary-600">
                  AP
                </div>
                <div>
                  <p className="font-medium text-secondary-900">Applicant Name {i}</p>
                  <p className="text-sm text-secondary-500">BS Computer Science • 1st Year</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-warning-50 text-warning-700">
                  Pending Review
                </span>
                <Button size="sm" variant="outline">View</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
