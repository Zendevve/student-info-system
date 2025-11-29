-- Create Custom Types (if not exists)
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('admin', 'staff', 'student');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Alter Profiles Table
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS role user_role DEFAULT 'student'::user_role,
ADD COLUMN IF NOT EXISTS legacy_id INTEGER;

-- Create Students Table (if not exists)
CREATE TABLE IF NOT EXISTS public.students (
    id UUID REFERENCES public.profiles(id) ON DELETE CASCADE PRIMARY KEY,
    lrn TEXT,
    legacy_id INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Alter Staff Table
ALTER TABLE public.staff
ADD COLUMN IF NOT EXISTS legacy_id INTEGER,
ADD COLUMN IF NOT EXISTS position TEXT;

-- Enable RLS on Students
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Students
DO $$ BEGIN
    CREATE POLICY "Students can view own record" ON public.students
        FOR SELECT USING (auth.uid() = id);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE POLICY "Admins and Staff can view all students" ON public.students
        FOR SELECT USING (
            EXISTS (
                SELECT 1 FROM public.profiles
                WHERE id = auth.uid() AND role IN ('admin', 'staff')
            )
        );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE POLICY "Admins and Staff can manage students" ON public.students
        FOR ALL USING (
            EXISTS (
                SELECT 1 FROM public.profiles
                WHERE id = auth.uid() AND role IN ('admin', 'staff')
            )
        );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;
