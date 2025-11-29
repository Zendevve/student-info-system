import { supabase } from '../supabase'
import type { Database } from '../database.types'

type Enrollment = Database['public']['Tables']['enrollments']['Row']
type EnrollmentInsert = Database['public']['Tables']['enrollments']['Insert']
type EnrollmentUpdate = Database['public']['Tables']['enrollments']['Update']

export type EnrollmentStatus = 'pending' | 'approved' | 'rejected' | 'issues'

export interface EnrollmentFilters {
  status?: EnrollmentStatus | 'all'
  search?: string
}

export interface EnrollmentStats {
  total: number
  pending: number
  approved: number
  issues: number
}

/**
 * Get list of enrollments/applications with optional filters
 */
export async function getEnrollments(filters: EnrollmentFilters = {}) {
  let query = supabase
    .from('enrollments')
    .select(`
      *,
      student:students(first_name, last_name, lrn, grade_level)
    `, { count: 'exact' })
    .order('created_at', { ascending: false })

  // Apply filters
  if (filters.status && filters.status !== 'all') {
    query = query.eq('status', filters.status)
  }

  if (filters.search) {
    // Search in related student data
    query = query.or(`student.first_name.ilike.%${filters.search}%,student.last_name.ilike.%${filters.search}%,student.lrn.ilike.%${filters.search}%`)
  }

  const { data, error, count } = await query

  if (error) throw error

  return { enrollments: data || [], count: count || 0 }
}

/**
 * Get a single enrollment by ID
 */
export async function getEnrollmentById(id: string) {
  const { data, error } = await supabase
    .from('enrollments')
    .select(`
      *,
      student:students(*),
      course:courses(*)
    `)
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

/**
 * Get enrollment statistics
 */
export async function getEnrollmentStats(): Promise<EnrollmentStats> {
  const { data, error } = await supabase
    .from('enrollments')
    .select('status')

  if (error) throw error

  const stats = {
    total: data?.length || 0,
    pending: data?.filter(e => e.status === 'pending').length || 0,
    approved: data?.filter(e => e.status === 'approved').length || 0,
    issues: data?.filter(e => e.status === 'issues').length || 0,
  }

  return stats
}

/**
 * Create a new enrollment
 */
export async function createEnrollment(enrollment: EnrollmentInsert) {
  const { data, error } = await supabase
    .from('enrollments')
    .insert(enrollment)
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * Update enrollment status
 */
export async function updateEnrollmentStatus(id: string, status: EnrollmentStatus) {
  const { data, error } = await supabase
    .from('enrollments')
    .update({ status })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * Update an enrollment
 */
export async function updateEnrollment(id: string, updates: EnrollmentUpdate) {
  const { data, error } = await supabase
    .from('enrollments')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * Delete an enrollment
 */
export async function deleteEnrollment(id: string) {
  const { error } = await supabase
    .from('enrollments')
    .delete()
    .eq('id', id)

  if (error) throw error
}

/**
 * Subscribe to real-time enrollment changes
 */
export function subscribeToEnrollments(callback: (payload: any) => void) {
  const channel = supabase
    .channel('enrollments-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'enrollments',
      },
      callback
    )
    .subscribe()

  return () => {
    supabase.removeChannel(channel)
  }
}
