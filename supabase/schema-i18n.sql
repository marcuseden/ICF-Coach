-- Add internationalization support to ICF Coach Database
-- Adds language columns and Swedish translations

-- Add language column to packages table
ALTER TABLE public.packages ADD COLUMN IF NOT EXISTS language TEXT DEFAULT 'en';
ALTER TABLE public.packages ADD COLUMN IF NOT EXISTS name_sv TEXT;
ALTER TABLE public.packages ADD COLUMN IF NOT EXISTS features_sv JSONB;

-- Update existing packages with Swedish translations
UPDATE public.packages SET 
  language = 'en',
  name_sv = 'Bas',
  features_sv = '["30-min sessioner", "Veckovisa check-ins", "AI röstcoach", "2 läsmaterial", "Handlingsspårning"]'::jsonb
WHERE id = 'basic';

UPDATE public.packages SET 
  language = 'en',
  name_sv = 'Standard',
  features_sv = '["45-min sessioner", "Två-veckors check-ins", "AI + mänsklig coach", "3 läsmaterial", "Handlingsspårning & ansvarsskyldighet", "Framstegsrapport"]'::jsonb
WHERE id = 'standard';

UPDATE public.packages SET 
  language = 'en',
  name_sv = 'Premium',
  features_sv = '["60-min sessioner", "Veckovisa check-ins", "Prioriterad support", "4 läsmaterial", "Handlingsspårning & ansvarsskyldighet", "Detaljerade rapporter", "Valfri röstjournalföring", "Videosessioner"]'::jsonb
WHERE id = 'premium';

-- Create reading materials table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.reading_materials (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  read_time TEXT NOT NULL,
  image_url TEXT,
  content JSONB NOT NULL,
  language TEXT DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on reading_materials
ALTER TABLE public.reading_materials ENABLE ROW LEVEL SECURITY;

-- Create policy for reading materials (publicly readable)
CREATE POLICY "Reading materials are publicly readable" ON public.reading_materials
  FOR SELECT USING (true);

-- Create coaches table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.coaches (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  bio TEXT NOT NULL,
  specialties TEXT[] NOT NULL,
  language TEXT DEFAULT 'en',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on coaches
ALTER TABLE public.coaches ENABLE ROW LEVEL SECURITY;

-- Create policy for coaches (publicly readable)
CREATE POLICY "Coaches are publicly readable" ON public.coaches
  FOR SELECT USING (is_active = true);

-- Insert Swedish coaches
INSERT INTO public.coaches (id, name, title, image_url, bio, specialties, language) VALUES
('1', 'Sarah Martinez', 'Senior Executive Coach', '/images/coaches/coach-female-1.jpg', 
 'ICF-certifierad coach med 15 års erfarenhet av ledarutveckling', 
 ARRAY['Ledarskap', 'Teamutveckling', 'Kommunikation'], 'sv'),
('2', 'Michael Chen', 'Leadership Coach', '/images/coaches/coach-male-1.jpg',
 'Specialist på att utveckla nya chefer och team leaders',
 ARRAY['Karriärutveckling', 'Konflikthantering', 'Motivation'], 'sv'),
('3', 'Emma Johansson', 'Executive Leadership Coach', '/images/coaches/coach-female-2.jpg',
 'Erfaren coach för VD:ar och ledningsgrupper',
 ARRAY['Strategiskt ledarskap', 'Förändringsledning', 'Kulturfrågor'], 'sv'),
('4', 'David Thompson', 'Senior Leadership Consultant', '/images/coaches/coach-male-2.jpg',
 'Över 20 års erfarenhet av ledarutveckling i globala företag',
 ARRAY['Global ledarskap', 'Organisationsutveckling', 'Mentorskap'], 'sv')
ON CONFLICT (id) DO UPDATE SET
  bio = EXCLUDED.bio,
  specialties = EXCLUDED.specialties,
  language = EXCLUDED.language;

-- Insert Swedish reading materials
INSERT INTO public.reading_materials (id, title, description, category, read_time, image_url, content, language) VALUES
('1', 'Hantera fjärrteam effektivt', 'Lär dig strategier för att leda distribuerade team', 
 'Ledarskap', '12 min', 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop',
 '["Att leda ett distribuerat team kräver nya färdigheter och tankesätt.", "**Fem nyckelprinciper för effektivt fjärrledarskap:**", "**1. Överkommunicera med syfte**", "**2. Fokusera på resultat, inte aktivitet**", "**3. Skapa virtuella sociala rum**", "**4. Var synlig och närvarande**", "**5. Investera i rätt verktyg**"]'::jsonb, 'sv'),
('2', 'Kraftfulla coachingfrågor', 'En guide till att ställa frågor som skapar insikt',
 'Coaching', '8 min', 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=300&fit=crop',
 '["En bra coachingfråga öppnar dörrar. En dålig stänger dem.", "**Vad kännetecknar en kraftfull fråga?**", "En kraftfull coachingfråga är öppen, fokuserad på framtiden, klientcentrerad, utforskande och energiskapande."]'::jsonb, 'sv'),
('3', 'Bygga psykologisk trygghet', 'Skapa en miljö där teamet vågar ta risker',
 'Teamutveckling', '15 min', 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop',
 '["Psykologisk trygghet är den viktigaste faktorn för högpresterande team.", "**Fem sätt att bygga psykologisk trygghet:**", "**1. Modellera sårbarhet**", "**2. Ställ inbjudande frågor**", "**3. Hantera misstag konstruktivt**"]'::jsonb, 'sv'),
('4', 'Feedback som förändrar', 'Konsten att ge konstruktiv återkoppling',
 'Kommunikation', '10 min', 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
 '["De flesta ledare ger för lite feedback.", "**COIN-modellen för feedback:**", "**C - Context**, **O - Observation**, **I - Impact**, **N - Next**"]'::jsonb, 'sv'),
('5', 'Delegering som utvecklar', 'Släpp kontroll och bygg kompetens',
 'Ledarskap', '11 min', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop',
 '["Delegering är ett av dina kraftfullaste verktyg för att utveckla ditt team.", "**Fem nivåer av delegering:**", "**Nivå 1: Undersök och rapportera**", "**Nivå 2: Undersök och rekommendera**"]'::jsonb, 'sv'),
('6', 'Aktiv lyssning i praktiken', 'Lyssna för att förstå, inte för att svara',
 'Coaching', '9 min', 'https://images.unsplash.com/photo-1573164574472-797cdf4a583a?w=400&h=300&fit=crop',
 '["Vi tror att vi lyssnar. Men ofta väntar vi bara på vår tur att prata.", "**Tre nivåer av lyssning:**", "**Nivå 1: Intern lyssning**", "**Nivå 2: Fokuserad lyssning**", "**Nivå 3: Global lyssning**"]'::jsonb, 'sv')
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  language = EXCLUDED.language;

-- Add user language preference
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS preferred_language TEXT DEFAULT 'sv';

-- Create function to update updated_at timestamp for new tables
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at on new tables
CREATE TRIGGER reading_materials_updated_at
  BEFORE UPDATE ON public.reading_materials
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER coaches_updated_at
  BEFORE UPDATE ON public.coaches
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

