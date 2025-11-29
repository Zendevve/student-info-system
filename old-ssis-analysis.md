# Analysis of Legacy SSIS Codebase (`old-ssis`)

## Overview
The legacy system is a PHP-based web application using a custom MVC-like structure. It separates the frontend (HTML/CSS/JS/PHP Views) from the backend (PHP API endpoints/Controllers).

## Architecture
- **Backend**: PHP (Vanilla/Custom)
- **Frontend**: PHP files serving HTML, using Vanilla JS and CSS.
- **Database**: MySQL (accessed via PDO wrapper `app\Database\Database`).
- **Dependency Management**: Composer (`vlucas/phpdotenv` for environment variables).

## Authentication (`BackEnd/common/loginModel.php`)
The system supports two types of users: **Staff** and **Users (Students)**.

### Staff Login
- **Table**: `staffs` linked to `users` via `Staff_Id`.
- **Credentials**: `Staff_Contact_Number` and `Password`.
- **Session Data**: `User-Id`, `Staff-Id`, `First-Name`, `Last-Name`, `Contact-Number`, `User-Type`, `Staff-Type`.
- **Teacher Logic**: If `Staff-Type` is 2, it logs the login in `teacher_logs`.

### Student Login
- **Table**: `registrations` linked to `users` via `Registration_Id`.
- **Credentials**: `Contact_Number` and `Password`.
- **Session Data**: `User-Id`, `Registration-Id`, `First-Name`, `Last-Name`, `Middle-Name`, `Contact-Number`, `User-Type`.
- **Logging**: Logs login in `user_logs`.

## Dashboard Features (`BackEnd/admin/controllers/adminDashboardController.php`)
The dashboard visualizes the following data:
1.  **Enrollee Statuses**: Enrolled, Denied, Pending, Followed Up.
2.  **Enrollee Demographics**: Grade Levels (Kinder 1-2, Grade 1-6), Biological Sex.
3.  **Student Statuses**: Active, Inactive, Dropped.
4.  **Student Demographics**: Grade Levels, Biological Sex.

## Database Schema (Inferred)
- **`users`**: Core user table. Columns: `User_Id`, `Password`, `Staff_Id`, `Registration_Id`, `User_Type`.
- **`staffs`**: Staff details. Columns: `Staff_Id`, `Staff_First_Name`, `Staff_Last_Name`, `Staff_Contact_Number`, `Staff_Type`.
- **`registrations`**: Student registration details. Columns: `Registration_Id`, `Contact_Number`, `First_Name`, `Last_Name`, `Middle_Name`.
- **`user_logs`**: Student login logs.
- **`teacher_logs`**: Teacher login logs.

## Migration Strategy for SSIS v2
1.  **Database**: Map legacy tables to Supabase.
    - `users` -> `auth.users` + `public.profiles`.
    - `staffs` -> `public.staffs`.
    - `registrations` -> `public.students`.
2.  **Authentication**: Use Supabase Auth. Create a mapping to handle "Staff" vs "Student" roles using metadata or a lookup table.
3.  **Dashboard**: Recreate the charts using Recharts/Chart.js in React, fetching data from Supabase via TanStack Query.
4.  **API**: Replace PHP endpoints with Supabase Edge Functions or direct client-side queries (RLS protected).
