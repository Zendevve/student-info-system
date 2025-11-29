import { useAuthStore } from '@/store/authStore'

export function useRole() {
  const { profile } = useAuthStore()

  const role = profile?.role || 'student' // Default to student if no profile

  const isAdmin = role === 'admin'
  const isStaff = role === 'staff'
  const isStudent = role === 'student'

  // Admins and Staff often share management permissions
  const canManage = isAdmin || isStaff

  return {
    role,
    isAdmin,
    isStaff,
    isStudent,
    canManage
  }
}
