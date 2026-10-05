# Signal & Sage

A responsive consulting website with a separate team journal, a password-protected team editor, image uploads, and a saved inquiry inbox.

## Included

- `/`: consulting website, services, illustrative projects, founder profiles, and contact form.
- `/day-to-day`: sample team journal entries.
- `/admin`: add, edit, and remove team members; upload photos; read inquiries.
- Profile fields: name, title, start date, biography, responsibilities, and photo.
- Size-optimized WebP versions of supplied portraits and logo assets in `public/`.
- Database schema and migrations, environment templates, and GitHub Actions checks.

This is a full-stack React/Vinext application for Cloudflare Workers, D1, and R2. **GitHub stores the source; GitHub Pages cannot run this backend.** No Codex account or Sites registration is required to run this export.

## Run locally

Use Node.js 22.13 or later and npm.

```sh
npm ci
cp .dev.vars.example .dev.vars
```

Set `ADMIN_PASSWORD` in `.dev.vars` to a long, unique password. An empty value disables admin sign-in. Do not commit this file.

```sh
npm run db:migrate:local
npm run dev
```

Open the URL printed in the terminal (normally `http://localhost:5173`). Visit `/admin` and enter your configured password. Use localhost or loopback for local secure-cookie support; production requires HTTPS.

The D1 and R2 emulators persist local records under `.wrangler/state`. The three founder profiles are defaults; saved edits override them. Start dates are blank until entered by you. No hosted credentials or test records are included.

## Upload to GitHub

Extract this ZIP, open a terminal in the `signal-sage` folder, and create an empty repository in GitHub. Then run:

```sh
git init
git add .
git commit -m "Add Signal & Sage website"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your repository URL. You can also use GitHub Desktop to add this folder and publish a repository. No repository has been created or uploaded for you.

## Deploy to your Cloudflare account

Deployment makes the marketing website public at the Worker URL. Admin changes and inquiry reads still require the admin password. Use Cloudflare Access if the whole website should remain private.

1. Authenticate and provision storage:

```sh
npx wrangler login
npx wrangler d1 create signal-sage-db
npx wrangler r2 bucket create signal-sage-images
```

2. Copy the database ID returned by Cloudflare into `wrangler.json`, replacing the placeholder `database_id`. Adjust the Worker, database, and bucket names there if needed. The zero-filled database ID is for local development only.

3. Apply the database migration, configure the production admin secret, and deploy:

```sh
npm run db:migrate:remote
npm run secret:admin
npm run deploy
```

Enter a strong production password at the secret prompt. Do not put it in `wrangler.json`, GitHub source, or browser code. The build emits the actual deployment config at `dist/server/wrangler.json`. The supplied CI workflow checks builds; it does not deploy or need Cloudflare credentials.

Cloudflare storage and hosting may incur charges according to your account plan. Before a public launch, configure rate limiting for `/api/login` and `/api/inquiries` using your hosting security controls.

## Content and administration

- The contact form saves inquiries in the admin inbox. It does **not** send notification emails.
- Edit the journal in `app/day-to-day/page.tsx`; journal editing is not part of the profile admin.
- Main website content is in `app/site.tsx`; styles are in `app/globals.css`.
- Founder defaults are in `lib/data.ts`; records are stored in D1 and uploaded image bytes in R2.
- Uploaded images are publicly readable by their URL. Upload only photos intended for the website.
- Removing a profile hides it; it does not erase its image from R2.
- Rotate `ADMIN_PASSWORD` to invalidate existing admin sessions. Sessions otherwise expire after one day.
- Journal content is fictional and labeled as sample content. Project outcomes are illustrative, not verified claims. Verify them and the contact address before public use.
- Fonts are loaded from Google Fonts; browser fallbacks apply offline.

## Validation

```sh
npm run check
npm run build
```

The original local application passed API checks for authentication, unauthorized-write rejection, photo upload/read-back, profile create/edit/delete, inquiry persistence, and logout. This GitHub export is separately checked with TypeScript and a production build. Visual browser and optional WebMCP checks were unavailable in the authoring environment.

## Assets and licensing

The supplied brand and portrait assets are included as requested. This project does not grant third parties a license to reuse those assets. Dependency and bundled third-party license notices are retained. Choose your own repository license before inviting reuse.
