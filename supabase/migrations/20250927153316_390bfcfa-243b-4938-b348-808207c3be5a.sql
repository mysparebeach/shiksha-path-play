-- Fix security issues from linter

-- Add missing RLS policies and enable RLS on existing tables that need it
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;

-- Update existing functions to have proper search_path
DROP FUNCTION IF EXISTS public.update_updated_at_column();
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Recreate the trigger
DROP TRIGGER IF EXISTS update_curriculum_lessons_updated_at ON public.curriculum_lessons;
CREATE TRIGGER update_curriculum_lessons_updated_at
  BEFORE UPDATE ON public.curriculum_lessons
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Fix the handle_new_auth_user function search path
DROP FUNCTION IF EXISTS public.handle_new_auth_user();
CREATE OR REPLACE FUNCTION public.handle_new_auth_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
declare
  v_role text := coalesce(new.raw_user_meta_data->>'role', 'student');
  v_name text := new.raw_user_meta_data->>'name';
  v_school text := new.raw_user_meta_data->>'school';
  v_subject text := new.raw_user_meta_data->>'subject';
  v_grade_int int := null;
begin
  if new.raw_user_meta_data->>'grade' is not null and new.raw_user_meta_data->>'grade' <> '' then
    v_grade_int := (new.raw_user_meta_data->>'grade')::int;
  end if;

  -- insert/upsert into public.users (your main users table)
  insert into public.users (id, role, name, language, phone, created_at)
  values (new.id, v_role, v_name, 'en', new.phone, now())
  on conflict (id) do update
    set role = coalesce(excluded.role, public.users.role),
        name = coalesce(excluded.name, public.users.name);

  -- also insert into students or teachers (one row per user)
  if v_role = 'student' then
    insert into public.students (id, name, grade, school, created_at)
    values (new.id, v_name, v_grade_int, v_school, now())
    on conflict (id) do nothing;
  elsif v_role = 'teacher' then
    insert into public.teachers (id, name, subject, school, created_at)
    values (new.id, v_name, v_subject, v_school, now())
    on conflict (id) do nothing;
  end if;

  return new;
end;
$$;