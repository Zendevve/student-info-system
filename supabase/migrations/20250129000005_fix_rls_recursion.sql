-- Fix Infinite Recursion in RLS Policies

-- 1. Create a SECURITY DEFINER function to get the current user's role
-- This bypasses RLS on the profiles table when checking roles, preventing recursion.
CREATE OR REPLACE FUNCTION public.get_my_role()
RETURNS user_role AS $$
DECLARE
  v_role user_role;
BEGIN
  SELECT role INTO v_role FROM public.profiles WHERE id = auth.uid();
  RETURN v_role;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Drop existing problematic policies

-- Profiles
DROP POLICY IF EXISTS "Admins and Staff can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins and Staff can insert/update students" ON public.students; -- Check name
DROP POLICY IF EXISTS "Admins and Staff can view all students" ON public.students;
DROP POLICY IF EXISTS "Admins and Staff can manage students" ON public.students;

-- Staff
DROP POLICY IF EXISTS "Staff can view all staff" ON public.staff;
DROP POLICY IF EXISTS "Admins can manage staff" ON public.staff;

-- Subjects (Drop old ones if they exist with recursion, though last migration used TRUE)
DROP POLICY IF EXISTS "Admins and Staff can view all subjects" ON public.subjects;
DROP POLICY IF EXISTS "Admins and Staff can manage subjects" ON public.subjects;

-- Enrollments
DROP POLICY IF EXISTS "Admins and Staff can view all enrollments" ON public.enrollments;
DROP POLICY IF EXISTS "Admins and Staff can manage enrollments" ON public.enrollments;


-- 3. Re-create Policies using get_my_role()

-- Profiles
CREATE POLICY "Admins and Staff can view all profiles" ON public.profiles
    FOR SELECT USING (
        get_my_role() IN ('admin', 'staff')
    );

-- Students
CREATE POLICY "Admins and Staff can view all students" ON public.students
    FOR SELECT USING (
        get_my_role() IN ('admin', 'staff')
    );

CREATE POLICY "Admins and Staff can manage students" ON public.students
    FOR ALL USING (
        get_my_role() IN ('admin', 'staff')
    );

-- Staff
CREATE POLICY "Staff can view all staff" ON public.staff
    FOR SELECT USING (
        get_my_role() IN ('admin', 'staff')
    );

CREATE POLICY "Admins can manage staff" ON public.staff
    FOR ALL USING (
        get_my_role() = 'admin'
    );

-- Subjects
CREATE POLICY "Admins and Staff can view all subjects" ON public.subjects
    FOR SELECT USING (TRUE); -- Public read for now, or restrict: get_my_role() IN ('admin', 'staff', 'student')

CREATE POLICY "Admins and Staff can manage subjects" ON public.subjects
    FOR ALL USING (
        get_my_role() IN ('admin', 'staff')
    );

-- Enrollments
CREATE POLICY "Admins and Staff can view all enrollments" ON public.enrollments
    FOR SELECT USING (
        get_my_role() IN ('admin', 'staff') OR auth.uid() = student_id
    );

CREATE POLICY "Admins and Staff can manage enrollments" ON public.enrollments
    FOR ALL USING (
        get_my_role() IN ('admin', 'staff')
    );
