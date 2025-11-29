import { cn } from '@/lib/utils'
import {
  Home, Users, BookOpen, Calendar, FileText, Settings,
  GraduationCap, ChevronLeft, ChevronRight
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'

interface SidebarProps {
  isOpen: boolean
  isCollapsed: boolean
  toggleCollapse: () => void
  closeMobile: () => void
}

export function Sidebar({ isOpen, isCollapsed, toggleCollapse, closeMobile }: SidebarProps) {
  const location = useLocation()
  const { user } = useAuthStore()

  const navItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard' },
    { icon: Users, label: 'Students', href: '/students' },
    { icon: BookOpen, label: 'Courses', href: '/courses' },
    { icon: Calendar, label: 'Enrollment', href: '/enrollment' },
    { icon: FileText, label: 'Reports', href: '/reports' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ]

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-secondary-950/50 backdrop-blur-sm lg:hidden transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={closeMobile}
      />

      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 bg-secondary-950 text-white transition-all duration-300 ease-in-out flex flex-col border-r border-white/10",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          isCollapsed ? "w-20" : "w-64"
        )}
      >
        {/* Header */}
        <div className={cn("h-16 flex items-center border-b border-white/10 transition-all duration-300", isCollapsed ? "justify-center px-0" : "px-6 gap-3")}>
          <div className="p-1.5 bg-primary-600 rounded-lg shrink-0">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <span className={cn("text-xl font-heading font-bold tracking-tight whitespace-nowrap overflow-hidden transition-all duration-300", isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100")}>
            SSIS Portal
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto overflow-x-hidden">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all duration-200 group relative",
                  isActive
                    ? "bg-primary-600 text-white shadow-lg shadow-primary-600/20"
                    : "text-secondary-400 hover:text-white hover:bg-white/5",
                  isCollapsed && "justify-center px-2"
                )}
                title={isCollapsed ? item.label : undefined}
              >
                <item.icon className={cn("w-5 h-5 shrink-0 transition-colors", isActive ? "text-white" : "group-hover:text-white")} />
                <span className={cn("whitespace-nowrap overflow-hidden transition-all duration-300", isCollapsed ? "w-0 opacity-0 hidden" : "w-auto opacity-100")}>
                  {item.label}
                </span>

                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-secondary-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap border border-white/10">
                    {item.label}
                  </div>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Collapse Toggle (Desktop Only) */}
        <div className="hidden lg:flex items-center justify-end p-4">
          <button
            onClick={toggleCollapse}
            className="p-1.5 rounded-lg text-secondary-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* User Footer */}
        <div className="p-4 border-t border-white/10">
          <div className={cn("flex items-center gap-3 p-2 rounded-xl bg-white/5 border border-white/5 transition-all duration-300", isCollapsed ? "justify-center" : "")}>
            <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold shrink-0 text-xs shadow-inner">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
            <div className={cn("flex-1 min-w-0 overflow-hidden transition-all duration-300", isCollapsed ? "w-0 opacity-0 hidden" : "w-auto opacity-100")}>
              <p className="text-sm font-medium text-white truncate">{user?.email?.split('@')[0]}</p>
              <p className="text-xs text-secondary-400 truncate">Administrator</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
