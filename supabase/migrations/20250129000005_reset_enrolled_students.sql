-- Reset enrolled_students to 0 for all subjects
-- This field should be calculated dynamically from actual enrollment data
UPDATE public.subjects
SET enrolled_students = 0;
