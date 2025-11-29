-- Cleanup Lingering Recursive Policies

-- Drop old policies that might still cause recursion or are duplicates
DROP POLICY IF EXISTS "Staff can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can manage subjects" ON public.subjects;
DROP POLICY IF EXISTS "Anyone can view subjects" ON public.subjects;

-- Ensure we only have the correct ones (already created in previous migration)
-- "Admins and Staff can view all profiles"
-- "Admins and Staff can view all subjects"
-- "Admins and Staff can manage subjects"
