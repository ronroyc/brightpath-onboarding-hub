# BrightPath Onboarding Hub

A first-version prototype of a new-employee onboarding tool for BrightPath Technologies (~150 employees, several hires a month). It replaces the scattered welcome emails, shared docs and spreadsheets with one place where new hires see what to focus on and managers see who needs help.

**Live demo:** https://brightpath-onboarding-hub.vercel.app

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm test         # unit tests for plan generation, status rules, sorting and emails
npm run build    # type-check + production build
```

No backend and no environment variables. State lives in React context and is persisted to `localStorage`; if storage is empty or blocked the app falls back to seed data. Demo dates are relative to today, so the data always looks current (saved progress resets on a new day, or use "Reset demo data" on the sign-in screen).

## What it does

| Who | What they said | How the prototype answers it |
|---|---|---|
| **Sarah**, HR Manager | One place for everything; pre-Day-1 vs first-weeks tasks; hires see done / outstanding / upcoming; managers see progress; eventually auto-generate plans by role | One app. Plans are generated from the company template plus the department template (`src/lib/plan.ts`). Tasks are grouped by phase; the manager dashboard shows everyone's progress |
| **David**, Engineering Manager | "Every department has different onboarding needs... Engineers need dev tools access." | Department templates (Engineering, Sales, Marketing, Operations) merge with the company-wide tasks. Engineering gets laptop, GitHub, dev environment and on-call tasks |
| **Emily**, New Employee | "I don't want to log in on my first day and see 40 things... I just want to know what to focus on first." | The home page shows only urgent (red) tasks, capped at five, plus a progress bar and a "+N more" link |

### Screens

- **Sign in as...**: role switcher with cards for each demo user (no real auth)
- **New hire / Focus**: greeting, progress bar, up to five red tasks, friendly empty state
- **New hire / All Tasks**: grouped by phase, colour-coded with icons and labels, filter chips
- **Task detail**: description, why it matters, link, help contact, due date, owner, mark complete / undo
- **Manager dashboard**: new-hire notification card, summary stats, hires sorted by attention needed
- **Manager drill-down**: a hire's full plan by phase, plus the manager's and IT's open tasks
- **Add new hire**: name, title, department, start date and manager; the plan size previews live and the plan is generated on submit
- **Email preview**: one shared modal for the Welcome and Reminder emails (nothing is actually sent)

### How status works

`getTaskStatus` in `src/lib/status.ts` is the single source of truth:

| Status | Colour | Rule |
|---|---|---|
| Completed | Green | `completedAt` is set |
| Do now | Red | not done and due within 3 days |
| Overdue | Red + badge | not done and due before today |
| Upcoming | Yellow | not done and due more than 3 days out |

Red is based on due date, not phase, so Week 1 tasks turn red on their own as the hire's first week arrives.

## Tech

React, Vite, TypeScript, Tailwind CSS, react-router. Tests use Vitest. Deploys to Vercel with no configuration (`vercel.json` adds the single-page-app rewrite).

## Not built (on purpose)

Real authentication or SSO, real email sending or scheduled notifications, an HR admin console or template editor, integrations (Slack, HRIS, ticketing, calendar), and a backend or database. See `DEMO_NOTES.md`.
