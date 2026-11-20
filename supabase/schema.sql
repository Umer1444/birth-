create table if not exists public.birthday_letters (
  id text primary key,
  payload jsonb not null,
  created_at timestamptz not null default now()
);

alter table public.birthday_letters enable row level security;

-- All reads and writes go through server-side Route Handlers using the
-- service-role key. Do not grant anon or authenticated clients table access.
revoke all on table public.birthday_letters from anon, authenticated;
grant all on table public.birthday_letters to service_role;

create index if not exists birthday_letters_created_at_idx
  on public.birthday_letters (created_at desc);
