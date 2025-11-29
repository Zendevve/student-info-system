import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { User, Lock, Bell, Globe } from 'lucide-react'

export default function Settings() {
  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <div>
        <h1 className="text-2xl font-heading font-bold text-secondary-900">Settings</h1>
        <p className="text-secondary-500">Manage your account and system preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="space-y-1">
          <button className="w-full text-left px-4 py-2 rounded-lg bg-primary-50 text-primary-700 font-medium">
            General
          </button>
          <button className="w-full text-left px-4 py-2 rounded-lg text-secondary-600 hover:bg-secondary-50 transition-colors">
            Security
          </button>
          <button className="w-full text-left px-4 py-2 rounded-lg text-secondary-600 hover:bg-secondary-50 transition-colors">
            Notifications
          </button>
        </div>

        <div className="md:col-span-3 space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-bold text-secondary-900 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-secondary-500" />
              Profile Information
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input label="First Name" placeholder="John" />
                <Input label="Last Name" placeholder="Doe" />
              </div>
              <Input label="Email Address" placeholder="john.doe@example.com" />
              <Button>Save Changes</Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-bold text-secondary-900 mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-secondary-500" />
              System Preferences
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium text-secondary-900">Dark Mode</p>
                  <p className="text-sm text-secondary-500">Enable dark theme for the interface</p>
                </div>
                <div className="w-11 h-6 bg-secondary-200 rounded-full relative cursor-pointer">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
