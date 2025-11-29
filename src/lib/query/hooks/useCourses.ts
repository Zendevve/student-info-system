import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getCourses,
  getCourseById,
  getCourseStats,
  createCourse,
  updateCourse,
  deleteCourse,
  type CourseFilters,
} from '@/lib/api/courseService'
import { toast } from 'sonner'

// Query keys
export const courseKeys = {
  all: ['courses'] as const,
  lists: () => [...courseKeys.all, 'list'] as const,
  list: (filters: CourseFilters) => [...courseKeys.lists(), filters] as const,
  details: () => [...courseKeys.all, 'detail'] as const,
  detail: (id: string) => [...courseKeys.details(), id] as const,
  stats: () => [...courseKeys.all, 'stats'] as const,
}

/**
 * Hook to fetch courses with filters
 */
export function useCourses(filters: CourseFilters = {}) {
  return useQuery({
    queryKey: courseKeys.list(filters),
    queryFn: () => getCourses(filters),
    staleTime: 30 * 1000, // 30 seconds
  })
}

/**
 * Hook to fetch a single course
 */
export function useCourse(id: string) {
  return useQuery({
    queryKey: courseKeys.detail(id),
    queryFn: () => getCourseById(id),
    enabled: !!id,
  })
}

/**
 * Hook to fetch course statistics
 */
export function useCourseStats() {
  return useQuery({
    queryKey: courseKeys.stats(),
    queryFn: getCourseStats,
    staleTime: 60 * 1000, // 1 minute
  })
}

/**
 * Hook for course mutations (create, update, delete)
 */
export function useCourseMutations() {
  const queryClient = useQueryClient()

  const create = useMutation({
    mutationFn: createCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: courseKeys.lists() })
      queryClient.invalidateQueries({ queryKey: courseKeys.stats() })
      toast.success('Course created successfully')
    },
    onError: (error: Error) => {
      toast.error(`Failed to create course: ${error.message}`)
    },
  })

  const update = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: any }) =>
      updateCourse(id, updates),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: courseKeys.lists() })
      queryClient.invalidateQueries({ queryKey: courseKeys.detail(variables.id) })
      queryClient.invalidateQueries({ queryKey: courseKeys.stats() })
      toast.success('Course updated successfully')
    },
    onError: (error: Error) => {
      toast.error(`Failed to update course: ${error.message}`)
    },
  })

  const remove = useMutation({
    mutationFn: deleteCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: courseKeys.lists() })
      queryClient.invalidateQueries({ queryKey: courseKeys.stats() })
      toast.success('Course deleted successfully')
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete course: ${error.message}`)
    },
  })

  return { create, update, remove }
}
