import { ReactNode } from 'react'

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen w-full bg-secondary-50">
      {/* TODO: Add Sidebar and Header */}
      <main className="p-6">
        {children}
      </main>
    </div>
  )
}
