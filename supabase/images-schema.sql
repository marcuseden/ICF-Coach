-- Generated Images Storage for DALL-E

create table if not exists generated_images (
  id uuid primary key default gen_random_uuid(),
  type text not null, -- 'hero', 'voiceCoach', 'videoSession', etc.
  url text not null,
  prompt text not null,
  revised_prompt text,
  base64_data text, -- Store base64 encoded image
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table generated_images enable row level security;

-- Allow public read access for landing page images
create policy "public can view images"
  on generated_images for select
  using (true);

-- Only authenticated users can insert
create policy "authenticated users can insert images"
  on generated_images for insert
  with check (auth.role() = 'authenticated');

-- Index for fast lookups
create index idx_generated_images_type on generated_images(type);
create index idx_generated_images_created_at on generated_images(created_at desc);

-- Trigger for updated_at
create or replace function update_generated_image_timestamp()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_generated_image_timestamp
  before update on generated_images
  for each row
  execute function update_generated_image_timestamp();

