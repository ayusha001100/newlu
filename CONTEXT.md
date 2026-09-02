# LetsUpgrade prototype — full context

This Next.js app (`lu-client-prototype`) rebuilds the LU IDea static mock. **Open this repo as the Cursor workspace** so `.cursor/rules` load. Visual source stays on disk; do not copy CSS.

## Product

LetsUpgrade: free certifications for Indian college students.

Loop: **learn a skill → finish a project → apply to internships and fresher jobs** from the Learning Centre.

- **8 live tracks** — classes + labs + exam
- **11 recorded bootcamps** — entry-level, self-paced
- **Career Passport** — projects, assessments, skills in Learning Centre → Career tab
- **Dummy auth only** — mobile + OTP `123456`. Always signs in as Riya Sharma. No profile/signup, no real SMS, no production API.

## Visual source (layout and copy only)

`/Users/akashlakade/Downloads/LU IDea`

Use `index.html`, `learn.html`, `auth.html`, `program.html`, `internships.html`, and other HTML for structure and wording. **Do not port `style.css` class names.** Recreate look with Tailwind on the element. Brand gold is `#FFB300`. Fonts: Plus Jakarta Sans (headings), Manrope (body).

## Hard rules

1. Keep the LU IDea UI. Do not restyle to default shadcn.
2. UI only in `src/components/ui`, `atoms`, `molecules`, `organisms`. No `src/modules` or `src/features`.
3. shadcn first (`@/ui/*`). If missing, add an atom/molecule. Restyle primitives to match gold, radius, type.
4. Tailwind on the element. `globals.css` is tokens + existing base only.
5. API path: `customFetch` / `fetchApi` in `src/services/fetch.js` → `src/actions/{module}.js` → TanStack hook in `src/hooks/{module}/`. Pages and components **never import actions**.
6. Static catalogues in `src/lib/data` may be imported directly.
7. Auth stays dummy. Do not add a real signup, profile step, or live OTP provider unless asked.

## Data flow

```
page / organism
  → hook in src/hooks/{module}/
    → action in src/actions/{module}.js
      → fetchApi / customFetch
        → src/app/api/... (mock) or external API
```

Session: httpOnly cookie `lu_session` + Zustand (`src/store`) via `useSession`.

## What is built

| Route | Status |
|---|---|
| `/` | Home — hero, ticker, hiring, tracks, bootcamps, journey, why us, internships preview, reviews, refer, CTA, FAQ |
| `/programs` | Catalogue — reuses career tracks + bootcamps |
| `/auth` | Dummy login — mobile → OTP only. Centered card. Always Riya after `123456` |
| `/learn` | Learning Centre — 5 tabs, course entry, module player (Learn→See→Try→Check→Recap), AI tutor, opportunities, career passport, profile. Enroll lands via `?course=` |
| `/program/[id]` | Live track landing from LU IDea `program.html` |
| `/bootcamp/[id]` | Recorded bootcamp landing from LU IDea `bootcamp.html` |
| `/internships` | Skill-based internship board — filters, preview listings, apply/save, role drawer |
| `/jobs` | Fresher jobs board — same UI as internships, job catalogue |
| `/colleges` | Campus partnerships hub — solutions, process, FAQ |
| `/colleges/student-upskilling` | Live cohort upskilling for departments |
| `/colleges/certifications` | Certification tracks for campus cohorts |
| `/colleges/placement-training` | Placement-readiness training |
| `/colleges/hire-ready-programs` | Role-aligned hire-ready pathways |
| `/colleges/contact-partnerships` | Partnership brief + official contact portal |
| `/resources` | Redirects to career guides |
| `/resources/career-guides` | Filterable career guide library |
| `/resources/skill-assessments` | Six-question skill-fit check (not stored) |
| `/resources/events` | Live class, codelab, project and career formats |
| `/resources/community` | Official community / YouTube / LinkedIn |
| `/resources/help-center` | Searchable support answers |
| `/blog` | Career skills hub — featured guide, search, AI / data / career filters |
| `/blog/[slug]` | Four guides: Generative AI, prompt engineering, data analyst roadmap, internships |
| `/refer` | Refer & Earn — personal share link, WhatsApp, invite count after a classmate logs in |

Header: logged-out = Login / Start free. Logged-in = Refer & Earn / Continue learning.

## Dummy auth

- OTP: `123456`
- Any valid-length mobile works
- Session user is always **Riya Sharma**, `+919876543210`, Mumbai, enrolled in `generative-ai` and `data-analytics`
- Files: `src/actions/auth.js`, `src/hooks/auth/*`, `src/app/api/auth/{otp,verify,session}`, `src/organisms/auth-card.jsx`
- Do not restore the profile/pincode step unless asked

## Catalogue slugs

Live: `generative-ai`, `ai-agents`, `data-analytics`, `websites-apps-ai`, `cybersecurity`, `cloud-devops`, `digital-marketing`, `sales-gtm`

Bootcamps: `html`, `python`, `sql`, `react`, `excel`, `java`, `figma`, `canva`, `photoshop`, `prompt-engineering`, `placement-prep`

`generative-ai` is the only track with a full skill graph, diagnostics, kits, capstone, and exam in `src/lib/learning/engine.js`.

## File map

| What | Where |
|---|---|
| Home copy / hiring / reviews | `src/lib/data/home.js` |
| Nav IA | `src/lib/data/nav.js` |
| Programs | `src/lib/data/programs.js` |
| Bootcamps | `src/lib/data/bootcamps.js` |
| Program / bootcamp landing copy | `src/lib/data/landing.js` |
| Catalogue helpers | `src/lib/data/catalog.js` |
| Opportunities | `src/lib/data/opportunities.js` |
| College partnerships | `src/lib/data/colleges.js` |
| Resources | `src/lib/data/resources.js` |
| Refer & Earn copy | `src/lib/data/refer.js` |
| Track colours | `src/lib/data/tracks.js` |
| Auth countries / seed user | `src/lib/data/auth.js` |
| Dummy user store | `src/lib/data/auth-users.js` |
| Learning engine | `src/lib/learning/engine.js` |
| Learn progress / tabs helpers | `src/lib/data/learn.js`, `src/lib/data/progress.js` |
| Learning Centre UI | `src/components/organisms/learn-centre/*`, `src/components/organisms/learn-header/` |
| Images | `public/assets/` |
| Theme tokens | `src/app/globals.css` |
| Rules | `.cursor/rules/` |

Aliases: `@/ui/*`, `@/atoms/*`, `@/molecules/*`, `@/organisms/*`, `@/*` (`jsconfig.json`).

## Next slices

The LU IDea marketing and Learning Centre surfaces listed above are in place.

When adding APIs: new file in `src/actions/{module}.js`, hooks in `src/hooks/{module}/`, UI only talks to hooks.
