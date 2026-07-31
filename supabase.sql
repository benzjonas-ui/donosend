create extension if not exists "pgcrypto";

create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  verified boolean default false,
  created_at timestamptz default now()
);

create table if not exists public.partners (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references auth.users(id),
  name text not null,
  slug text unique not null,
  stripe_account_id text,
  organization_id uuid references public.organizations(id),
  contribution_type text default 'fixed',
  contribution_value numeric default 0.50,
  created_at timestamptz default now()
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  stripe_session_id text unique,
  partner_id uuid references public.partners(id),
  organization_id uuid references public.organizations(id),
  gross_amount integer not null,
  impact_amount integer default 0,
  currency text default 'eur',
  status text default 'completed',
  created_at timestamptz default now()
);

alter table public.organizations enable row level security;
alter table public.partners enable row level security;
alter table public.payments enable row level security;

create policy "Organizations are public" on public.organizations for select using (true);
create policy "Partners are public" on public.partners for select using (true);
create policy "Owners manage partners" on public.partners for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
