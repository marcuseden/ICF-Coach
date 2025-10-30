-------------------------------------------------
-- Coaching Sessions and Commitments Add-On
-- ICF-compliant structured AI + Human coaching
-------------------------------------------------

-- Coaching Sessions table
-- Tracks both AI and human coaching sessions
create table if not exists coaching_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  mode text check (mode in ('ai','human')) not null,
  focus_area text,
  summary text,
  commitment text,
  created_at timestamptz default now(),
  ended_at timestamptz
);

-- Coaching Commitments table
-- Tracks user commitments and action items from sessions
create table if not exists coaching_commitments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  session_id uuid references coaching_sessions(id) on delete cascade,
  text text not null,
  confidence integer check (confidence between 1 and 10),
  due_date date,
  status text check (status in ('active','done','dropped')) default 'active',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Organization Trends table
-- Aggregated data for organizational insights
create table if not exists org_trends (
  id uuid primary key default gen_random_uuid(),
  org_id uuid,
  period_start date not null,
  period_end date not null,
  metric text not null,
  value numeric,
  sample_size integer,
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table coaching_sessions enable row level security;
alter table coaching_commitments enable row level security;
alter table org_trends enable row level security;

-- RLS Policies for coaching_sessions
create policy "user owns session"
  on coaching_sessions for all 
  using (auth.uid() = user_id);

-- RLS Policies for coaching_commitments
create policy "user owns commitment"
  on coaching_commitments for all 
  using (auth.uid() = user_id);

-- RLS Policies for org_trends (read-only for authenticated users)
create policy "authenticated users can view org trends"
  on org_trends for select 
  using (auth.role() = 'authenticated');

-- Trigger to update updated_at on coaching_commitments
create or replace function update_coaching_commitment_timestamp()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_coaching_commitment_timestamp
  before update on coaching_commitments
  for each row
  execute function update_coaching_commitment_timestamp();

-- Indexes for performance
create index if not exists idx_coaching_sessions_user_id on coaching_sessions(user_id);
create index if not exists idx_coaching_sessions_created_at on coaching_sessions(created_at desc);
create index if not exists idx_coaching_commitments_user_id on coaching_commitments(user_id);
create index if not exists idx_coaching_commitments_status on coaching_commitments(status);
create index if not exists idx_org_trends_org_id on org_trends(org_id);
create index if not exists idx_org_trends_period on org_trends(period_start, period_end);

-------------------------------------------------
-- End of Add-On Schema
-------------------------------------------------

