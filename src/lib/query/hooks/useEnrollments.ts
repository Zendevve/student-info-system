import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import {
  getEnrollments,
  getEnrollmentById,
  getEnrollmentStats,
  createEnrollment,
  updateEnrollmentStatus,
  updateEnrollment,
  deleteEnrollment,
  subscribeToEnrollments,
  type EnrollmentFilters,
  type EnrollmentStatus,
} from '@/lib/api/enrollmentService'
import { toast } from 'sonner'

// Query keys
export const enrollmentKeys = {
  all: ['enrollments'] as const,
  lists: () => [...enrollmentKeys.all, 'list'] as const,
  list: (filters: EnrollmentFilters) => [...enrollmentKeys.lists(), filters] as const,
  details: () => [...enrollmentKeys.all, 'detail'] as const,
  detail: (id: string) => [...enrollmentKeys.details(), id] as const,
  stats: () => [...enrollmentKeys.all, 'stats'] as const,
}

/**
 * Hook to fetch enrollments with filters
 */
export function useEnrollments(filters: EnrollmentFilters = {}) {
  return useQuery({
    queryKey: enrollmentKeys.list(filters),
    queryFn: () => getEnrollments(filters),
    staleTime: 30 * 1000, // 30 seconds
  })
}

/**
 * Hook to fetch a single enrollment
 */
export function useEnrollment(id: string) {
  return useQuery({
    queryKey: enrollmentKeys.detail(id),
    queryFn: () => getEnrollmentById(id),
    enabled: !!id,
  })
}

/**
 * Hook to fetch enrollment statistics
 */
export function useEnrollmentStats() {
  return useQuery({
    queryKey: enrollmentKeys.stats(),
    queryFn: getEnrollmentStats,
    staleTime: 60 * 1000, // 1 minute
  })
}

/**
 * Hook for enrollment mutations
 */
export function useEnrollmentMutations() {
  const queryClient = useQueryClient()

  const create = useMutation({
    mutationFn: createEnrollment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: enrollmentKeys.lists() })
      queryClient.invalidateQueries({ queryKey: enrollmentKeys.stats() })
      toast.success('Enrollment created successfully')
    },
    onError: (error: Error) => {
      toast.error(`Failed to create enrollment: ${error.message}`)
    },
  })

  const updateStatus = useMutation({
    mutationFn: ({ id, status }: { id: string; status: EnrollmentStatus }) =>
      updateEnrollmentStatus(id, status),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: enrollmentKeys.lists() })
      queryClient.invalidateQueries({ queryKey: enrollmentKeys.detail(variables.id) })
      queryClient.invalidateQueries({ queryKey: enrollmentKeys.stats() })
      toast.success('Status updated successfully')
    },
    onError: (error: Error) => {
      toast.error(`Failed to update status: ${error.message}`)
    },
  })

  const update = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: any }) =>
      updateEnrollment(id, updates),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: enrollmentKeys.lists() })
      queryClient.invalidateQueries({ queryKey: enrollmentKeys.detail(variables.id) })
      toast.success('Enrollment updated successfully')
    },
    onError: (error: Error) => {
      toast.error(`Failed to update enrollment: ${error.message}`)
    },
  })

  const remove = useMutation({
    mutationFn: deleteEnrollment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: enrollmentKeys.lists() })
      queryClient.invalidateQueries({ queryKey: enrollmentKeys.stats() })
      toast.success('Enrollment deleted successfully')
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete enrollment: ${error.message}`)
    },
  })

  return { create, updateStatus, update, remove }
}

/**
 * Hook to subscribe to real-time enrollment changes
 */
export function useEnrollmentSubscription() {
  const queryClient = useQueryClient()

  useEffect(() => {
    const unsubscribe = subscribeToEnrollments((payload) => {
      // Invalidate enrollment queries when changes occur
      queryClient.invalidateQueries({ queryKey: enrollmentKeys.lists() })
      queryClient.invalidateQueries({ queryKey: enrollmentKeys.stats() })

      // Show toast for new enrollments
      if (payload.eventType === 'INSERT') {
        toast.info('New enrollment application received')
      }
    })

    return () => {
      unsubscribe()
    }
  }, [queryClient])
}
