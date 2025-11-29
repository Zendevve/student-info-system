-- Extend students table with additional fields needed for the UI
ALTER TABLE public.students
ADD COLUMN IF NOT EXISTS first_name TEXT,
ADD COLUMN IF NOT EXISTS last_name TEXT,
ADD COLUMN IF NOT EXISTS middle_name TEXT,
ADD COLUMN IF NOT EXISTS student_id TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS grade_level TEXT,
ADD COLUMN IF NOT EXISTS section TEXT,
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive', 'Graduated', 'Transferred'));

-- Create index on student_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_students_student_id ON public.students(student_id);
CREATE INDEX IF NOT EXISTS idx_students_grade_level ON public.students(grade_level);
CREATE INDEX IF NOT EXISTS idx_students_status ON public.students(status);

-- Add a column to subjects table to track enrolled students count (denormalized for performance)
ALTER TABLE public.subjects
ADD COLUMN IF NOT EXISTS enrolled_students INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'Core' CHECK (category IN ('Core', 'Elective'));

-- Update trigger to keep subjects.units as integer (ensure data integrity)
-- Subjects table already has: code, name, description, units, created_at

-- Add grade_level field to subjects for filtering
ALTER TABLE public.subjects
ADD COLUMN IF NOT EXISTS grade_level TEXT;
