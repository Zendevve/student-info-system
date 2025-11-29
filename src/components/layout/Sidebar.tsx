import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  BookOpen,
  FileText,
  Settings,
  LogOut,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  School
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/store/authStore'
import { useRole } from '@/hooks/useRole'

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { signOut, user, profile } = useAuthStore()
  const { isStudent } = useRole()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Students', href: '/students', icon: Users },
    { name: 'Courses', href: '/courses', icon: BookOpen },
    { name: 'Enrollment', href: '/enrollment', icon: GraduationCap },
    { name: 'Reports', href: '/reports', icon: FileText, hidden: isStudent },
    { name: 'Settings', href: '/settings', icon: Settings, hidden: isStudent },
  ]

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-secondary-900/50 z-40 lg:hidden transition-opacity duration-300",
          isCollapsed ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
        onClick={() => setIsCollapsed(true)}
      />

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 z-50 h-screen bg-secondary-900 text-white transition-all duration-300 flex flex-col shadow-xl",
          isCollapsed ? "w-20" : "w-72",
          // Mobile behavior: hidden when collapsed (default), shown when expanded
          "transform lg:transform-none",
          isCollapsed ? "-translate-x-full lg:translate-x-0" : "translate-x-0"
        )}
      >
        {/* Logo Section */}
        <div className="h-16 flex items-center px-6 border-b border-white/10">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center shrink-0">
              <School className="w-5 h-5 text-white" />
            </div>
            <span className={cn(
              "font-heading font-bold text-xl tracking-tight whitespace-nowrap transition-all duration-300",
              isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
            )}>
              SSIS v2
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
          {navigation.map((item) => {
            if (item.hidden) return null

            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) => cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
                  isActive
                    ? "bg-primary-600 text-white shadow-lg shadow-primary-900/20"
                    : "text-secondary-400 hover:text-white hover:bg-white/5",
                  isCollapsed && "justify-center"
                )}
              >
                <item.icon className={cn(
                  "w-5 h-5 shrink-0 transition-colors",
                  isCollapsed ? "w-6 h-6" : ""
                )} />

                <span className={cn(
                  "font-medium whitespace-nowrap transition-all duration-300",
                  isCollapsed ? "opacity-0 w-0 hidden" : "opacity-100 w-auto"
                )}>
                  {item.name}
                </span>

                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-4 px-2 py-1 bg-secondary-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                    {item.name}
                  </div>
                )}
              </NavLink>
            )
          })}
        </nav>

        {/* Collapse Toggle (Desktop only) */}
        <div className="hidden lg:flex items-center justify-end p-4 border-t border-white/10">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg text-secondary-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* User Footer */}
        <div className="p-4 border-t border-white/10">
          <div className={cn(
            "flex items-center gap-3 p-2 rounded-xl bg-white/5 border border-white/5 transition-all duration-300",
            isCollapsed ? "justify-center" : ""
          )}>
            <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold shrink-0 text-xs shadow-inner">
              {profile?.first_name?.[0] || user?.email?.charAt(0).toUpperCase()}
            </div>
            <div className={cn(
              "flex-1 min-w-0 overflow-hidden transition-all duration-300",
              isCollapsed ? "w-0 opacity-0 hidden" : "w-auto opacity-100"
            )}>
              <p className="text-sm font-medium text-white truncate">
                {profile ? `${profile.first_name} ${profile.last_name}` : user?.email?.split('@')[0]}
              </p>
              <p className="text-xs text-secondary-400 truncate capitalize">
                {profile?.role || 'User'}
              </p>
            </div>

            {!isCollapsed && (
              <button
                onClick={handleSignOut}
                className="p-1.5 rounded-lg text-secondary-400 hover:text-error-400 hover:bg-error-400/10 transition-colors"
                title="Sign out"
              >
                <LogOut size={18} />
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  )
}
