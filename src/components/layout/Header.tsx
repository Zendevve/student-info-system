import { Bell, Search, Menu, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/store/authStore'

interface HeaderProps {
  toggleMobileSidebar: () => void
}

export function Header({ toggleMobileSidebar }: HeaderProps) {
  const { signOut } = useAuthStore()

  return (
    <header className="h-16 bg-white border-b border-secondary-200 sticky top-0 z-40 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleMobileSidebar}
          className="lg:hidden p-2 text-secondary-500 hover:bg-secondary-100 rounded-lg"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Search Bar */}
        <div className="hidden md:flex items-center max-w-md w-full relative">
          <Search className="w-5 h-5 text-secondary-400 absolute left-3" />
          <input
            type="text"
            placeholder="Search..."
            className="w-64 lg:w-96 pl-10 pr-4 py-2 rounded-xl border border-secondary-200 bg-secondary-50 focus:bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="p-2 hover:bg-secondary-100 rounded-lg transition-colors relative">
          <Bell className="w-5 h-5 text-secondary-600" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error-500 rounded-full border-2 border-white"></span>
        </button>
        <div className="h-8 w-px bg-secondary-200 mx-1"></div>
        <Button
          variant="ghost"
          size="sm"
          onClick={signOut}
          className="text-secondary-600 hover:text-error-600 hover:bg-error-50"
          leftIcon={<LogOut size={16} />}
        >
          Logout
        </Button>
      </div>
    </header>
  )
}
