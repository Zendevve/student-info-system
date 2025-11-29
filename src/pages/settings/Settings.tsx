import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { User, Lock, Bell, Shield, Mail, Phone, Globe, Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/store/authStore'

export default function Settings() {
  const { user, profile } = useAuthStore()
  const [activeTab, setActiveTab] = useState('profile')
  const [darkMode, setDarkMode] = useState(false)

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'preferences', label: 'Preferences', icon: Globe },
  ]

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-heading font-bold text-secondary-900">Settings</h1>
        <p className="text-secondary-600 mt-1">Manage your account and system preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Tabs Sidebar */}
        <Card className="lg:col-span-1 p-4 border-none shadow-sm h-fit">
          <div className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full text-left px-4 py-3 rounded-xl font-medium transition-all flex items-center gap-3",
                  activeTab === tab.id
                    ? "bg-primary-600 text-white shadow-sm"
                    : "text-secondary-600 hover:bg-secondary-50"
                )}
              >
                <tab.icon size={18} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </Card>

        {/* Content */}
        <div className="lg:col-span-3 space-y-6">
          {activeTab === 'profile' && (
            <>
              <Card className="p-6 border-none shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <User className="w-5 h-5 text-secondary-500" />
                  <h3 className="text-lg font-bold text-secondary-900">Profile Information</h3>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label="First Name" placeholder="First name" defaultValue={profile?.first_name || ''} />
                    <Input label="Last Name" placeholder="Last name" defaultValue={profile?.last_name || ''} />
                  </div>
                  <Input label="Middle Name" placeholder="Middle name" defaultValue={profile?.middle_name || ''} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Email Address"
                      type="email"
                      placeholder="email@example.com"
                      defaultValue={user?.email || ''}
                      leftIcon={<Mail size={18} />}
                    />
                    <Input
                      label="Phone Number"
                      placeholder="09XX XXX XXXX"
                      defaultValue={profile?.phone_number || ''}
                      leftIcon={<Phone size={18} />}
                    />
                  </div>
                  <div className="pt-4 border-t border-secondary-200">
                    <Button>Save Changes</Button>
                  </div>
                </div>
              </Card>
            </>
          )}

          {activeTab === 'security' && (
            <>
              <Card className="p-6 border-none shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <Lock className="w-5 h-5 text-secondary-500" />
                  <h3 className="text-lg font-bold text-secondary-900">Change Password</h3>
                </div>
                <div className="space-y-4">
                  <Input label="Current Password" type="password" placeholder="••••••••" />
                  <Input label="New Password" type="password" placeholder="••••••••" />
                  <Input label="Confirm New Password" type="password" placeholder="••••••••" />
                  <div className="pt-4 border-t border-secondary-200">
                    <Button>Update Password</Button>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-none shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <Shield className="w-5 h-5 text-secondary-500" />
                  <h3 className="text-lg font-bold text-secondary-900">Two-Factor Authentication</h3>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-secondary-900">Enable 2FA</p>
                    <p className="text-sm text-secondary-500 mt-1">Add extra security to your account</p>
                  </div>
                  <Button variant="outline" size="sm">Enable</Button>
                </div>
              </Card>
            </>
          )}

          {activeTab === 'notifications' && (
            <Card className="p-6 border-none shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <Bell className="w-5 h-5 text-secondary-500" />
                <h3 className="text-lg font-bold text-secondary-900">Notification Preferences</h3>
              </div>
              <div className="space-y-4">
                {[
                  { title: 'Email Notifications', description: 'Receive email updates about your account' },
                  { title: 'Push Notifications', description: 'Get notified about important updates' },
                  { title: 'Enrollment Updates', description: 'Alerts about new enrollments and applications' },
                  { title: 'System Announcements', description: 'Important system updates and maintenance' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-secondary-100 last:border-0">
                    <div>
                      <p className="font-medium text-secondary-900">{item.title}</p>
                      <p className="text-sm text-secondary-500 mt-0.5">{item.description}</p>
                    </div>
                    <label className="relative inline-block w-11 h-6 cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked={i < 2} />
                      <div className="w-11 h-6 bg-secondary-200 peer-checked:bg-primary-600 rounded-full peer transition-colors"></div>
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm peer-checked:translate-x-5 transition-transform"></div>
                    </label>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {activeTab === 'preferences' && (
            <>
              <Card className="p-6 border-none shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <Globe className="w-5 h-5 text-secondary-500" />
                  <h3 className="text-lg font-bold text-secondary-900">System Preferences</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-secondary-100">
                    <div className="flex items-center gap-3">
                      {darkMode ? <Moon size={20} className="text-primary-600" /> : <Sun size={20} className="text-warning-600" />}
                      <div>
                        <p className="font-medium text-secondary-900">Dark Mode</p>
                        <p className="text-sm text-secondary-500 mt-0.5">Enable dark theme for the interface</p>
                      </div>
                    </div>
                    <label className="relative inline-block w-11 h-6 cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={darkMode}
                        onChange={() => setDarkMode(!darkMode)}
                      />
                      <div className="w-11 h-6 bg-secondary-200 peer-checked:bg-primary-600 rounded-full peer transition-colors"></div>
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm peer-checked:translate-x-5 transition-transform"></div>
                    </label>
                  </div>

                  <div className="py-3 border-b border-secondary-100">
                    <label className="block mb-2">
                      <span className="font-medium text-secondary-900">Language</span>
                      <p className="text-sm text-secondary-500 mt-0.5">Choose your preferred language</p>
                    </label>
                    <select className="mt-2 w-full px-4 py-2.5 rounded-xl border border-secondary-200 bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none">
                      <option>English</option>
                      <option>Filipino</option>
                    </select>
                  </div>

                  <div className="py-3">
                    <label className="block mb-2">
                      <span className="font-medium text-secondary-900">Time Zone</span>
                      <p className="text-sm text-secondary-500 mt-0.5">Set your local time zone</p>
                    </label>
                    <select className="mt-2 w-full px-4 py-2.5 rounded-xl border border-secondary-200 bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none">
                      <option>Asia/Manila (GMT+8)</option>
                      <option>Asia/Singapore (GMT+8)</option>
                    </select>
                  </div>
                </div>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
