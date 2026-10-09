# Function / Celebration Photo Albums

1. Back up your Supabase database.
2. Open Supabase > SQL Editor and run `GALLERY_ALBUMS_MIGRATION.sql` **once**. Do not rerun the original seed schema.
3. Keep your existing `.env.local` values (VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY).
4. Run `npm install` and `npm run dev` locally. Log in to CMS > Gallery.
5. Create an album, choose it, select multiple images and upload.
6. Verify the public gallery and Tamil switch.
7. After testing, push to your existing GitHub repo for Vercel deployment.

Existing photos are preserved as uncategorized and can be assigned to albums.
Deleting an album removes its database photo records, but not the underlying Supabase Storage objects.
Use image files under 8 MB. Never put service_role keys in the frontend.

**Important:** This package retains the previous CMS custom authentication code. If sessions expire, log in again. A future improvement is migrating all requests to the Supabase JS SDK for automatic token refresh.
