import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from '@/context/AuthContext'
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
  const { user, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  return user ? <>{children}</> : <Navigate to="/login" replace />
}

function App() {
  return (
    <QueryProvider>
      <BrowserRouter>
        <AuthProvider>
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
        </AuthProvider>
      </BrowserRouter>
    </QueryProvider>
  )
}

export default App
