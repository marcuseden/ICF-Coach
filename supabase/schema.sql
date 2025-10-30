-- ICF Coach Database Schema for Supabase

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'coach', 'client')),
  has_full_access BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Coaching packages
CREATE TABLE public.packages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  duration TEXT NOT NULL,
  sessions INTEGER NOT NULL,
  frequency TEXT NOT NULL,
  price TEXT NOT NULL,
  features JSONB NOT NULL,
  reading_materials JSONB NOT NULL,
  questionnaires JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Clients
CREATE TABLE public.clients (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  package_id TEXT REFERENCES public.packages(id),
  start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  current_session INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sessions
CREATE TABLE public.sessions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  session_number INTEGER NOT NULL,
  session_type TEXT CHECK (session_type IN ('text', 'voice')),
  date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  focus TEXT,
  insights TEXT[],
  committed_action TEXT,
  action_deadline TIMESTAMP WITH TIME ZONE,
  notes TEXT[],
  status TEXT CHECK (status IN ('scheduled', 'in-progress', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Check-ins
CREATE TABLE public.check_ins (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  session_id UUID REFERENCES public.sessions(id) ON DELETE CASCADE,
  date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  action_rating INTEGER CHECK (action_rating >= 1 AND action_rating <= 5),
  insight TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Questionnaire responses
CREATE TABLE public.questionnaire_responses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  questionnaire_id TEXT NOT NULL,
  questionnaire_type TEXT CHECK (questionnaire_type IN ('intake', 'midpoint', 'exit')),
  responses JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reading progress
CREATE TABLE public.reading_progress (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  material_id TEXT NOT NULL,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS) Policies

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.check_ins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questionnaire_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reading_progress ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Clients policies
CREATE POLICY "Users can view own client data" ON public.clients
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can insert own client data" ON public.clients
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own client data" ON public.clients
  FOR UPDATE USING (user_id = auth.uid());

-- Sessions policies
CREATE POLICY "Users can view own sessions" ON public.sessions
  FOR SELECT USING (
    client_id IN (SELECT id FROM public.clients WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can insert own sessions" ON public.sessions
  FOR INSERT WITH CHECK (
    client_id IN (SELECT id FROM public.clients WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can update own sessions" ON public.sessions
  FOR UPDATE USING (
    client_id IN (SELECT id FROM public.clients WHERE user_id = auth.uid())
  );

-- Check-ins policies
CREATE POLICY "Users can view own check-ins" ON public.check_ins
  FOR SELECT USING (
    client_id IN (SELECT id FROM public.clients WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can insert own check-ins" ON public.check_ins
  FOR INSERT WITH CHECK (
    client_id IN (SELECT id FROM public.clients WHERE user_id = auth.uid())
  );

-- Questionnaire responses policies
CREATE POLICY "Users can view own responses" ON public.questionnaire_responses
  FOR SELECT USING (
    client_id IN (SELECT id FROM public.clients WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can insert own responses" ON public.questionnaire_responses
  FOR INSERT WITH CHECK (
    client_id IN (SELECT id FROM public.clients WHERE user_id = auth.uid())
  );

-- Reading progress policies
CREATE POLICY "Users can view own reading progress" ON public.reading_progress
  FOR SELECT USING (
    client_id IN (SELECT id FROM public.clients WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can manage own reading progress" ON public.reading_progress
  FOR ALL USING (
    client_id IN (SELECT id FROM public.clients WHERE user_id = auth.uid())
  );

-- Functions

-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER clients_updated_at
  BEFORE UPDATE ON public.clients
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER sessions_updated_at
  BEFORE UPDATE ON public.sessions
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Insert default packages
INSERT INTO public.packages (id, name, duration, sessions, frequency, price, features, reading_materials, questionnaires) VALUES
('basic', 'Basic', '4 weeks', 4, 'Weekly', '$400', 
  '["4 coaching sessions (30 min each)", "Weekly mobile check-ins", "Intake questionnaire", "Basic reading materials", "Action tracking"]'::jsonb,
  '[]'::jsonb,
  '["intake"]'::jsonb),
('standard', 'Standard', '8 weeks', 8, 'Weekly', '$750',
  '["8 coaching sessions (45 min each)", "Bi-weekly mobile check-ins", "Intake & mid-point questionnaires", "Curated reading materials", "Action tracking & accountability", "Progress report"]'::jsonb,
  '[]'::jsonb,
  '["intake", "midpoint"]'::jsonb),
('premium', 'Premium', '12 weeks', 12, 'Weekly', '$1,200',
  '["12 coaching sessions (60 min each)", "Weekly mobile check-ins", "Intake, mid-point & exit questionnaires", "Comprehensive reading library", "Priority support", "Action tracking & accountability", "Detailed progress reports", "Optional voice journaling"]'::jsonb,
  '[]'::jsonb,
  '["intake", "midpoint", "exit"]'::jsonb);

