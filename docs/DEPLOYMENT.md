# PakistanMart deployment

## Backend on Railway

The frontend's previous backend domain was `pakistanmart-production.up.railway.app`.
A Railway-branded "Not Found / The train has not arrived" response means that this
public domain is not routing to the application. Changing frontend components or
MongoDB credentials cannot repair that domain mapping.

1. Open the Railway project and select the backend service. If missing, create a
   service from this GitHub repository and select the `main` branch.
2. Set its root directory to `backend`. Its start command is `npm start`.
   `backend/railway.toml` defines startup and the root HTTP health check.
3. In Variables, supply `MONGODB_URL` and `JWT_SECREAT` (the spelling is intentional).
   For admin access, also configure `ADMIN_EMAIL` and `ADMIN_PASSWORD`.
   Uploads require `CLOUDINARY_NAME`, `CLOUDINARY_API_KEY`, and
   `CLOUDINARY_API_SECRET`. Enter secrets only in the hosting provider's secure UI.
   Never commit a `.env` file. Railway supplies `PORT` automatically.
4. Deploy the service. In Settings → Networking → Public Networking, generate or
   check the public domain and ensure its target port matches the service.
5. Open `/`: expect the PakistanMart backend success message. Then request
   `/api/product/list`: expect HTTP 200 and a JSON array. An empty array means the
   database has no catalogue entries; upload real products through the admin app.
   Root health alone does not validate MongoDB access.

## Frontend on Netlify

Use base directory `frontend`, build command `npm run build`, and publish directory
`dist`. The existing `frontend/public/_redirects` handles client-side routes.

Set `VITE_API_URL` to the working Railway public origin, with `https://` and no
`/api` suffix. If omitted, the old Railway domain is used for compatibility.
Vite embeds this setting at build time, so redeploy Netlify after changing it.
The backend currently allows the production origin `https://pakistanmart.netlify.app`.

`VITE_FIREBASE_API_KEY` enables Google sign-in. Without it, email login remains
available and browsing works; the Google button explains that it is unavailable.
The Firebase project is `loginpakistanmart`; enable the Netlify domain in its
Firebase Authentication authorized domains when configuring Google sign-in.

## Validation

- Frontend: `cd frontend && npm ci && npm run build`.
- Browse the homepage signed out. It must not redirect to login.
- Check catalogue loading, empty response, server error and retry states.
- Check category filters, search, price sorting and product details.
- Adding to the bag requires sign-in; confirm a successful backend response before
  showing success. Backend failure must leave the bag unchanged.
- Verify layout on narrow and wide screens and with reduced motion enabled.

The redesign was browser-tested locally with controlled API fixtures for success,
empty and failure responses. These fixtures are not shipped as product inventory.
Live product availability still requires a healthy Railway service and MongoDB.
