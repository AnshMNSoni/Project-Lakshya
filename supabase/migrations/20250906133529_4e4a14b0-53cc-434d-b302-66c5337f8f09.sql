-- Create profile table for user data
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  age INTEGER,
  academic_info JSONB,
  nature TEXT,
  creation_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Create quiz_response table for quiz answers
CREATE TABLE public.quiz_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  question_id UUID NOT NULL,
  selected_opt TEXT,
  preferred_choice TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create college table for map functionality
CREATE TABLE public.colleges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT,
  longitude DECIMAL(10, 8),
  latitude DECIMAL(10, 8),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create meta_data table for application statistics
CREATE TABLE public.meta_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  college_listed INTEGER DEFAULT 0,
  student_guided INTEGER DEFAULT 0,
  active_user INTEGER DEFAULT 0,
  career_field_available INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.colleges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meta_data ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create RLS policies for quiz_responses
CREATE POLICY "Users can view their own quiz responses" 
ON public.quiz_responses 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own quiz responses" 
ON public.quiz_responses 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own quiz responses" 
ON public.quiz_responses 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create RLS policies for colleges (public read access)
CREATE POLICY "Anyone can view colleges" 
ON public.colleges 
FOR SELECT 
USING (true);

-- Create RLS policies for meta_data (public read access)
CREATE POLICY "Anyone can view meta data" 
ON public.meta_data 
FOR SELECT 
USING (true);

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, name)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert initial meta_data row
INSERT INTO public.meta_data (college_listed, student_guided, active_user, career_field_available)
VALUES (0, 0, 0, 0);