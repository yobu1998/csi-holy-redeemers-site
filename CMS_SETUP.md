# CSI Holy Redeemer Church CMS – Setup

This version keeps the existing public design and adds a real cloud-backed admin CMS.

## 1. Create Supabase
1. Create a project at https://supabase.com/.
2. Open **SQL Editor**.
3. Paste the entire `supabase-schema.sql` file and run it.
4. Open **Authentication → Users → Add user**.
5. Create the pastor/church admin email and password.
6. Copy that user's UUID.
7. In SQL Editor run:

```sql
insert into public.admin_users(id,email)
values ('PASTE-AUTH-USER-UUID-HERE','PASTE-ADMIN-EMAIL-HERE');
```

Do not put a Supabase service-role/secret key into the website.

## 2. Add Vercel environment variables
In the Vercel project, open **Settings → Environment Variables** and add:

- `VITE_SUPABASE_URL` = your Supabase project URL
- `VITE_SUPABASE_PUBLISHABLE_KEY` = your Supabase publishable/anon key

Use the publishable/anon key only in the browser. Never use the service-role key.

## 3. Redeploy
Push the updated project to the same GitHub repository used by the current church site. Vercel will redeploy it.

## 4. Open the admin
Open the church website and click **Admin** in the footer.

Sign in with the Supabase user created above.

## Admin capabilities
- Home page text + hero image
- About text + image
- Worship text
- Prayer schedule: add/edit/delete
- Events & special prayers: add/edit/delete + image
- Gallery: upload/delete photos
- Sermons: add/edit/delete + YouTube link
- Announcements: publish/edit/delete
- Pastor name, bio and photo
- Prayer request management
- Contact details and Google Maps link
- Website section visibility
- English + Tamil content

## Important
The existing images in `/public/images` are kept as the initial website content. New photos uploaded from Admin are stored in Supabase Storage.

The public prayer request form also stores the request in Supabase and opens WhatsApp to the church/pastor number configured in Admin.
