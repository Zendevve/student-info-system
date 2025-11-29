import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-secondary-50 flex">
      <Sidebar />

      <div
        className="flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out"
      >
        <Header />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div >
  )
}
