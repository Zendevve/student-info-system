import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'sonner'
import { useAuthStore } from '@/store/authStore'
import { QueryProvider } from '@/lib/query/QueryProvider'
import Login from '@/pages/auth/Login'
import Register from '@/pages/auth/Register'
import DashboardLayout from '@/layouts/DashboardLayout'
import Dashboard from '@/pages/dashboard/Dashboard'
import StudentList from '@/pages/students/StudentList'
import CourseList from '@/pages/courses/CourseList'
import Enrollment from '@/pages/enrollment/Enrollment'
import Reports from '@/pages/reports/Reports'
import Settings from '@/pages/settings/Settings'

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuthStore()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return user ? <>{children}</> : <Navigate to="/login" replace />
}

function App() {
  const { initialize } = useAuthStore()

  useEffect(() => {
    initialize()
  }, [initialize])

  return (
    <QueryProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/students" element={<StudentList />} />
            <Route path="/courses" element={<CourseList />} />
            <Route path="/enrollment" element={<Enrollment />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryProvider>
  )
}

export default App
