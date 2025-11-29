import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getStudents,
  getStudentById,
  getStudentStats,
  createStudent,
  updateStudent,
  deleteStudent,
  type StudentFilters,
} from '@/lib/api/studentService'
import { toast } from 'sonner'

// Query keys
export const studentKeys = {
  all: ['students'] as const,
  lists: () => [...studentKeys.all, 'list'] as const,
  list: (filters: StudentFilters) => [...studentKeys.lists(), filters] as const,
  details: () => [...studentKeys.all, 'detail'] as const,
  detail: (id: string) => [...studentKeys.details(), id] as const,
  stats: () => [...studentKeys.all, 'stats'] as const,
}

/**
 * Hook to fetch students with filters
 */
export function useStudents(filters: StudentFilters = {}) {
  return useQuery({
    queryKey: studentKeys.list(filters),
    queryFn: () => getStudents(filters),
    staleTime: 30 * 1000, // 30 seconds
  })
}

/**
 * Hook to fetch a single student
 */
export function useStudent(id: string) {
  return useQuery({
    queryKey: studentKeys.detail(id),
    queryFn: () => getStudentById(id),
    enabled: !!id,
  })
}

/**
 * Hook to fetch student statistics
 */
export function useStudentStats() {
  return useQuery({
    queryKey: studentKeys.stats(),
    queryFn: getStudentStats,
    staleTime: 60 * 1000, // 1 minute
  })
}

/**
 * Hook for student mutations (create, update, delete)
 */
export function useStudentMutations() {
  const queryClient = useQueryClient()

  const create = useMutation({
    mutationFn: createStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: studentKeys.lists() })
      queryClient.invalidateQueries({ queryKey: studentKeys.stats() })
      toast.success('Student created successfully')
    },
    onError: (error: Error) => {
      toast.error(`Failed to create student: ${error.message}`)
    },
  })

  const update = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: any }) =>
      updateStudent(id, updates),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: studentKeys.lists() })
      queryClient.invalidateQueries({ queryKey: studentKeys.detail(variables.id) })
      queryClient.invalidateQueries({ queryKey: studentKeys.stats() })
      toast.success('Student updated successfully')
    },
    onError: (error: Error) => {
      toast.error(`Failed to update student: ${error.message}`)
    },
  })

  const remove = useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: studentKeys.lists() })
      queryClient.invalidateQueries({ queryKey: studentKeys.stats() })
      toast.success('Student deleted successfully')
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete student: ${error.message}`)
    },
  })

  return { create, update, remove }
}
