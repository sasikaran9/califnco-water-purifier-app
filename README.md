# Califnco — Water Purifier Commerce

A polished, responsive Round 1 assignment prototype for Califnco. It runs with no build step and is ready to deploy to Vercel as a static site.

## Run locally

Open `index.html` directly, or serve the folder with any static server:

```bash
npx serve .
```

## Included in this prototype

- 50 realistic purifier, dispenser, pump, filter and spare parts in the catalog
- Responsive mobile-first shopping experience with search, category filters, product imagery, cart and quantities
- Checkout modal with Razorpay test-mode presentation
- Order history and service booking flows
- Admin operations dashboard with orders, revenue and dealer request snapshot
- Static architecture suitable for connecting Firebase Auth/Firestore, FCM, Cloudinary and Razorpay
- Installable PWA shell with offline cache, dark mode, product image zoom, referral code, OpenStreetMap address handoff and notification preferences
- Persistent local demo state so cart, role navigation and preferences survive refresh
- Firebase config/rules templates, Vercel-ready environment template, Docker WAHA compose file and importable n8n daily Instagram workflow

## Production wiring plan

### Production setup

1. Copy `.env.example` to your deployment environment and add your Firebase web app values in `firebase-config.js` (the demo remains usable with no keys).
2. Create Firebase Auth email/password users and set custom claims `dealer` or `admin`. Deploy `firestore.rules`.
3. Replace the local `state` object with Auth/Firestore listeners. Connect the checkout action to Razorpay test mode and verify payments server-side before creating orders.
4. Add FCM service-worker credentials and request notification permission after login. EmailJS/TextBee can be called from a protected Vercel function using the environment variables.
5. Import `n8n-instagram-daily.json` into n8n, set Google Sheets, Groq, Hugging Face, Cloudinary and Meta credentials, then activate the 09:00 schedule. The workflow generates the image and caption, hosts it publicly and publishes/logs it.
6. For the bonus, run `docker compose up -d`, pair the secondary WhatsApp number in WAHA, then add a final HTTP Request node to the workflow for WAHA's `/api/sendImage` endpoint. WAHA is intentionally opt-in because it requires a real phone pairing.

The current frontend is fully runnable without paid services or credentials; external integrations are isolated to the documented adapters and workflow so no secret is committed.
