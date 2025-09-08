-- Add profile completion tracking and mobile field to profiles table
ALTER TABLE public.profiles 
ADD COLUMN mobile VARCHAR(15),
ADD COLUMN profile_completed BOOLEAN DEFAULT FALSE,
ADD COLUMN smart_analysis_completed BOOLEAN DEFAULT FALSE,
ADD COLUMN quiz_completed BOOLEAN DEFAULT FALSE;