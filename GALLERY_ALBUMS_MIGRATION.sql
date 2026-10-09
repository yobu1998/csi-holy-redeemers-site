-- Run once in Supabase SQL Editor AFTER the original supabase-schema.sql.
create table if not exists public.gallery_albums (
 id uuid primary key default gen_random_uuid(),
 title_en text not null,
 title_ta text not null default '',
 event_date date,
 cover_url text,
 created_at timestamptz not null default now()
);
alter table public.gallery add column if not exists album_id uuid references public.gallery_albums(id) on delete cascade;
create index if not exists gallery_album_id_idx on public.gallery(album_id);
alter table public.gallery_albums enable row level security;
create policy "public reads gallery albums" on public.gallery_albums for select to anon, authenticated using(true);
create policy "admins manage gallery albums" on public.gallery_albums for all to authenticated
 using(exists(select 1 from public.admin_users a where a.id=auth.uid()))
 with check(exists(select 1 from public.admin_users a where a.id=auth.uid()));
