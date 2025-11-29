import { supabase } from '../supabase'
import type { Database } from '../database.types'

type Course = Database['public']['Tables']['subjects']['Row']
type CourseInsert = Database['public']['Tables']['subjects']['Insert']
type CourseUpdate = Database['public']['Tables']['subjects']['Update']

export interface CourseFilters {
  category?: 'Core' | 'Elective' | 'all'
  search?: string
}

export interface CourseStats {
  totalCourses: number
  totalStudents: number
  coreSubjects: number
  avgEnrollment: number
}

/**
 * Get list of courses with optional filters
 */
export async function getCourses(filters: CourseFilters = {}) {
  let query = supabase
    .from('subjects')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })

  // Apply filters
  if (filters.category && filters.category !== 'all') {
    query = query.eq('category', filters.category)
  }

  if (filters.search) {
    query = query.or(`name.ilike.%${filters.search}%,code.ilike.%${filters.search}%`)
  }

  const { data, error, count } = await query

  if (error) throw error

  return { courses: data || [], count: count || 0 }
}

/**
 * Get a single course by ID
 */
export async function getCourseById(id: string) {
  const { data, error } = await supabase
    .from('subjects')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

/**
 * Get course statistics
 */
export async function getCourseStats(): Promise<CourseStats> {
  const { data, error } = await supabase
    .from('subjects')
    .select('category, enrolled_students')

  if (error) throw error

  const totalStudents = data?.reduce((sum, course) => sum + (course.enrolled_students || 0), 0) || 0

  const stats = {
    totalCourses: data?.length || 0,
    totalStudents,
    coreSubjects: data?.filter(c => c.category === 'Core').length || 0,
    avgEnrollment: data?.length ? Math.round(totalStudents / data.length) : 0,
  }

  return stats
}

/**
 * Create a new course
 */
export async function createCourse(course: CourseInsert) {
  const { data, error } = await supabase
    .from('subjects')
    .insert(course)
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * Update an existing course
 */
export async function updateCourse(id: string, updates: CourseUpdate) {
  const { data, error } = await supabase
    .from('subjects')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * Delete a course
 */
export async function deleteCourse(id: string) {
  const { error } = await supabase
    .from('subjects')
    .delete()
    .eq('id', id)

  if (error) throw error
}
