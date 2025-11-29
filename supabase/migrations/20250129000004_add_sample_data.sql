-- Enable pgcrypto for UUID generation and hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 1. Fix Subjects Table (Use ALTER to avoid dependency issues with 'schedules')
CREATE TABLE IF NOT EXISTS public.subjects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    units INTEGER DEFAULT 3,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add missing columns safely
DO $$ BEGIN
    ALTER TABLE public.subjects ADD COLUMN IF NOT EXISTS units INTEGER DEFAULT 3;
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;

DO $$ BEGIN
    ALTER TABLE public.subjects ADD COLUMN IF NOT EXISTS description TEXT;
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;

DO $$ BEGIN
    ALTER TABLE public.subjects ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'Core' CHECK (category IN ('Core', 'Elective'));
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;

DO $$ BEGIN
    ALTER TABLE public.subjects ADD COLUMN IF NOT EXISTS grade_level TEXT;
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;

DO $$ BEGIN
    ALTER TABLE public.subjects ADD COLUMN IF NOT EXISTS enrolled_students INTEGER DEFAULT 0;
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;


-- 2. Fix Enrollments Table (Safe to drop/recreate as it's the one we are fixing)
DROP TABLE IF EXISTS public.enrollments;

CREATE TABLE public.enrollments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
    grade_level TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'issues')),
    school_year TEXT DEFAULT '2024-2025',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;

-- RLS Policies
DO $$ BEGIN
    CREATE POLICY "Admins and Staff can view all subjects" ON public.subjects FOR SELECT USING (TRUE);
    CREATE POLICY "Admins and Staff can manage subjects" ON public.subjects FOR ALL USING (TRUE);
    CREATE POLICY "Admins and Staff can view all enrollments" ON public.enrollments FOR SELECT USING (TRUE);
    CREATE POLICY "Admins and Staff can manage enrollments" ON public.enrollments FOR ALL USING (TRUE);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;


-- 3. Insert Sample Subjects
INSERT INTO public.subjects (code, name, description, units, category, grade_level, enrolled_students)
VALUES
  ('MATH7', 'Mathematics 7', 'Fundamental Mathematics for Grade 7', 4, 'Core', 'Grade 7', 45),
  ('SCI7', 'Science 7', 'General Science for Grade 7', 4, 'Core', 'Grade 7', 42),
  ('ENG7', 'English 7', 'Grammar and Literature', 4, 'Core', 'Grade 7', 48),
  ('FIL7', 'Filipino 7', 'Wika at Panitikan', 4, 'Core', 'Grade 7', 46),
  ('PE7', 'Physical Education 7', 'Sports and Health', 2, 'Elective', 'Grade 7', 50),
  ('ARTS7', 'Arts 7', 'Philippine Arts', 2, 'Elective', 'Grade 7', 38),
  ('MATH8', 'Mathematics 8', 'Intermediate Mathematics', 4, 'Core', 'Grade 8', 40),
  ('SCI8', 'Science 8', 'Biology and Earth Science', 4, 'Core', 'Grade 8', 38)
ON CONFLICT (code) DO UPDATE SET
  units = EXCLUDED.units,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  grade_level = EXCLUDED.grade_level,
  enrolled_students = EXCLUDED.enrolled_students;


-- 4. Insert Sample Users, Profiles, Students, and Enrollments
DO $$
DECLARE
  v_user_id UUID;
  v_email TEXT;
BEGIN
  -- Student 1: John Doe
  v_email := 'john.doe@sample.com';
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = v_email) THEN
    v_user_id := gen_random_uuid();

    -- Insert into auth.users
    INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, role, aud, created_at, updated_at)
    VALUES (v_user_id, '00000000-0000-0000-0000-000000000000', v_email, crypt('password123', gen_salt('bf')), now(), 'authenticated', 'authenticated', now(), now());

    -- Insert into profiles (Corrected: Added phone_number and user_type)
    INSERT INTO public.profiles (id, first_name, last_name, role, phone_number, user_type)
    VALUES (v_user_id, 'John', 'Doe', 'student', '09123456789', 1)
    ON CONFLICT (id) DO NOTHING;

    -- Insert into students
    INSERT INTO public.students (id, first_name, last_name, student_id, grade_level, section, status, lrn)
    VALUES (v_user_id, 'John', 'Doe', '2025-0001', 'Grade 7', 'Section A', 'Active', '123456789012');

    -- Insert Enrollment
    INSERT INTO public.enrollments (student_id, grade_level, status)
    VALUES (v_user_id, 'Grade 7', 'approved');
  END IF;

  -- Student 2: Jane Smith
  v_email := 'jane.smith@sample.com';
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = v_email) THEN
    v_user_id := gen_random_uuid();
    INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, role, aud, created_at, updated_at)
    VALUES (v_user_id, '00000000-0000-0000-0000-000000000000', v_email, crypt('password123', gen_salt('bf')), now(), 'authenticated', 'authenticated', now(), now());

    INSERT INTO public.profiles (id, first_name, last_name, role, phone_number, user_type)
    VALUES (v_user_id, 'Jane', 'Smith', 'student', '09123456788', 1)
    ON CONFLICT (id) DO NOTHING;

    INSERT INTO public.students (id, first_name, last_name, student_id, grade_level, section, status, lrn)
    VALUES (v_user_id, 'Jane', 'Smith', '2025-0002', 'Grade 8', 'Section B', 'Active', '123456789013');

    INSERT INTO public.enrollments (student_id, grade_level, status)
    VALUES (v_user_id, 'Grade 8', 'pending');
  END IF;

  -- Student 3: Michael Johnson
  v_email := 'michael.j@sample.com';
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = v_email) THEN
    v_user_id := gen_random_uuid();
    INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, role, aud, created_at, updated_at)
    VALUES (v_user_id, '00000000-0000-0000-0000-000000000000', v_email, crypt('password123', gen_salt('bf')), now(), 'authenticated', 'authenticated', now(), now());

    INSERT INTO public.profiles (id, first_name, last_name, role, phone_number, user_type)
    VALUES (v_user_id, 'Michael', 'Johnson', 'student', '09123456787', 1)
    ON CONFLICT (id) DO NOTHING;

    INSERT INTO public.students (id, first_name, last_name, student_id, grade_level, section, status, lrn)
    VALUES (v_user_id, 'Michael', 'Johnson', '2025-0003', 'Grade 9', 'Section A', 'Inactive', '123456789014');

    INSERT INTO public.enrollments (student_id, grade_level, status)
    VALUES (v_user_id, 'Grade 9', 'rejected');
  END IF;

  -- Student 4: Emily Brown
  v_email := 'emily.b@sample.com';
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = v_email) THEN
    v_user_id := gen_random_uuid();
    INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, role, aud, created_at, updated_at)
    VALUES (v_user_id, '00000000-0000-0000-0000-000000000000', v_email, crypt('password123', gen_salt('bf')), now(), 'authenticated', 'authenticated', now(), now());

    INSERT INTO public.profiles (id, first_name, last_name, role, phone_number, user_type)
    VALUES (v_user_id, 'Emily', 'Brown', 'student', '09123456786', 1)
    ON CONFLICT (id) DO NOTHING;

    INSERT INTO public.students (id, first_name, last_name, student_id, grade_level, section, status, lrn)
    VALUES (v_user_id, 'Emily', 'Brown', '2025-0004', 'Grade 10', 'Section C', 'Active', '123456789015');

    INSERT INTO public.enrollments (student_id, grade_level, status)
    VALUES (v_user_id, 'Grade 10', 'issues');
  END IF;

  -- Student 5: David Wilson
  v_email := 'david.w@sample.com';
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = v_email) THEN
    v_user_id := gen_random_uuid();
    INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, role, aud, created_at, updated_at)
    VALUES (v_user_id, '00000000-0000-0000-0000-000000000000', v_email, crypt('password123', gen_salt('bf')), now(), 'authenticated', 'authenticated', now(), now());

    INSERT INTO public.profiles (id, first_name, last_name, role, phone_number, user_type)
    VALUES (v_user_id, 'David', 'Wilson', 'student', '09123456785', 1)
    ON CONFLICT (id) DO NOTHING;

    INSERT INTO public.students (id, first_name, last_name, student_id, grade_level, section, status, lrn)
    VALUES (v_user_id, 'David', 'Wilson', '2025-0005', 'Grade 11', 'Section A', 'Active', '123456789016');
  END IF;

END $$;
