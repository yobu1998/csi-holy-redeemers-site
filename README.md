# CSI Holy Redeemer's Church Website

Bilingual English/Tamil React + Vite church website for CSI Holy Redeemer's Church, V.V.R Nagar, Sayalgudi, Tamil Nadu.

## Included updates
- Re-designed bilingual header with separated English/Tamil identity blocks so the church name/address do not overflow.
- Mobile-friendly header/navigation.
- Hero uses the landscape church photo (`public/images/church-02.png`) with improved cropping.
- Correct Tamil church name: `சி.எஸ்.ஐ பரிசுத்த மீட்பர் ஆலயம்`.
- Sunday worship: 9:00 AM–11:30 AM; first Sunday Holy Communion Service.
- Monday Youth Boys Prayer Fellowship: 7:00 PM–9:00 PM.
- Tuesday Youth Girls Prayer Fellowship: 7:00 PM–9:00 PM.
- Wednesday Women's Fellowship Prayer: 7:00 PM–9:00 PM.
- Thursday Common Prayer Service: 7:00 PM–9:00 PM.
- Friday Litany Prayer: 7:00 PM–9:00 PM.
- First Saturday Monthly Fasting Prayer: 10:00 AM–2:00 PM.
- Admin area for adding church functions/special prayers and bilingual details.
- Prayer Request form prepares a WhatsApp message for the pastor/church number.
- Gallery lightbox, event details modal, contact/WhatsApp/Google Maps actions.

## Important configuration
Open `src/main.jsx` and update:
- `PASTOR_WHATSAPP` with the pastor's actual WhatsApp number when available.
- `CHURCH_PHONE` if the public church contact number changes.

The Admin editor currently stores custom events in browser localStorage. It is suitable for a static/demo deployment, but it is NOT a secure multi-user CMS. Before production use by multiple church administrators, connect it to a real backend/database with authentication.

## Run locally
```bash
npm install
npm run dev
```

## Deploy to Vercel
Push the project to GitHub and import the repository into Vercel. The standard Vite settings are sufficient:
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`
