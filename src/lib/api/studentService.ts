import { supabase } from '../supabase'
import type { Database } from '../database.types'

type Student = Database['public']['Tables']['students']['Row']
type StudentInsert = Database['public']['Tables']['students']['Insert']
type StudentUpdate = Database['public']['Tables']['students']['Update']

export interface StudentFilters {
  gradeLevel?: string
  status?: 'Active' | 'Inactive'
  search?: string
}

export interface StudentStats {
  total: number
  active: number
  inactive: number
  newThisMonth: number
}

/**
 * Get paginated list of students with optional filters
 */
export async function getStudents(filters: StudentFilters = {}) {
  let query = supabase
    .from('students')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })

  // Apply filters
  if (filters.gradeLevel && filters.gradeLevel !== 'all') {
    query = query.eq('grade_level', filters.gradeLevel)
  }

  if (filters.status && filters.status !== 'all') {
    query = query.eq('status', filters.status)
  }

  if (filters.search) {
    query = query.or(`first_name.ilike.%${filters.search}%,last_name.ilike.%${filters.search}%,lrn.ilike.%${filters.search}%,student_id.ilike.%${filters.search}%`)
  }

  const { data, error, count } = await query

  if (error) throw error

  return { students: data || [], count: count || 0 }
}

/**
 * Get a single student by ID
 */
export async function getStudentById(id: string) {
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

/**
 * Get student statistics for dashboard cards
 */
export async function getStudentStats(): Promise<StudentStats> {
  const { data, error } = await supabase
    .from('students')
    .select('status, created_at')

  if (error) throw error

  const now = new Date()
  const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())

  const stats = {
    total: data?.length || 0,
    active: data?.filter(s => s.status === 'Active').length || 0,
    inactive: data?.filter(s => s.status === 'Inactive').length || 0,
    newThisMonth: data?.filter(s => new Date(s.created_at) > oneMonthAgo).length || 0,
  }

  return stats
}

/**
 * Create a new student
 */
export async function createStudent(student: StudentInsert) {
  const { data, error } = await supabase
    .from('students')
    .insert(student)
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * Update an existing student
 */
export async function updateStudent(id: string, updates: StudentUpdate) {
  const { data, error } = await supabase
    .from('students')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * Delete a student
 */
export async function deleteStudent(id: string) {
  const { error } = await supabase
    .from('students')
    .delete()
    .eq('id', id)

  if (error) throw error
}
