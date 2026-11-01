# Demo notes

## Demo script (about 5 minutes)

1. **Sign in as Emily Chen** (Day 3, Engineering).
   - Focus shows five red tasks and a progress bar, not the whole plan. "+1 more urgent task" leads to the full list.
   - Open "Get GitHub org access": description, why it matters, link, help contact. Mark it complete: the progress bar moves and the next urgent task slides up.
   - Open **All Tasks** to show the phases, the colour plus label on every row, and the filter chips.
2. **Sign out and sign in as David Kim** (Engineering Manager).
   - The notification card says Priya Shah joins on Sunday and her plan is ready. Click **Review & send welcome**, edit a line, send. The toast appears and the card disappears.
   - Marcus Lee is first in the list (three overdue tasks). Click **Remind** to show the reminder listing exactly those tasks.
   - Open Emily (or Marcus) to see the plan by phase and "Your tasks for ..." (open items owned by the manager or IT).
3. **Sign in as Jordan Patel** (Sales) to prove plans differ by department: CRM setup, sales playbook, demo certification instead of GitHub and dev environment.
4. **Add a hire live** (manager dashboard, "+ Add new hire"): pick Marketing and watch the preview change to 11 company-wide + 5 Marketing tasks, then submit. This is Sarah's auto-generate goal in one step.
5. **Mention the auto-plan.** `generatePlan` in `src/lib/plan.ts` is the whole feature: company-wide templates plus the department's templates, with due dates computed from the start date.

Tip: "Reset demo data" on the sign-in screen puts everything back.

## How it was built

- **Plan before code.** The spec was turned into a written plan first: file layout, build order, the rules where bugs hide, and what to verify. Decisions that went beyond the spec were written down and flagged.
- **Rules first, UI second.** Status colours, plan generation, the attention sort and the email text are small pure functions with unit tests (16), written before any screen used them. The UI is mostly wiring.
- **Small, reviewable PRs.** Each feature is its own branch and PR (core logic, app shell, Focus, All Tasks, email modal, manager dashboard, stretch items, docs, add-new-hire) so the history reads like the build order.
- **Verified in a real browser**, not just by building: Emily's Focus page, completing tasks, welcome send, Marcus's reminder, phone width, empty state, reload persistence and the empty-storage fallback.
- **Scope held to the brief.** Everything in the Cut list stayed cut; the three stretch items were added only after the core worked.

## What I built and why

| Stakeholder | Quote | Feature |
|---|---|---|
| Sarah | "One place for everything" | A single app with a role switcher in place of scattered emails and sheets |
| Sarah | Pre-Day-1 vs first weeks; done / outstanding / upcoming | Phase grouping and green / red / yellow status |
| Sarah | Managers should see progress | Dashboard sorted by who needs attention, with a drill-down |
| Sarah | Eventually auto-generate plans by role or department | `generatePlan` with company and department templates |
| David | "Every department has different onboarding needs... Engineers need dev tools access" | Department templates merged with company-wide tasks |
| Emily | "I just want to know what to focus on first" | Focus page: red tasks only, capped at five, progress bar |

Design calls worth mentioning:
- **One status function.** Colour, the Focus list, dashboard counts and sort order all come from `getTaskStatus`, so they cannot disagree.
- **Red is due-date based, not phase based.** Before Day 1 the pre-start tasks are red; after the start date Week 1 tasks turn red on their own.
- **Never colour alone.** Every status has an icon and a text label.
- **Calm tone.** Red is only used for things that are due within three days or late.
- **Welcome and reminder emails share one component**, so the next channel (Slack, say) is one more template.

Small decisions I made where the brief was open:
- Task phases follow the due offsets, so benefits enrollment (+10 days) sits under Weeks 2-4.
- Pre-Day-1 offsets are -6 / -5 / -4 / -2, so someone starting in a week has several red tasks.
- "On track" on the dashboard counts hires with no overdue tasks.
- The new-hire card says "Their onboarding plan is ready" (gender-neutral).
- Saved demo data is thrown away when the day changes, so the relative dates stay right.

## What I deliberately cut, and why

- **Authentication / SSO**: the prototype needs a role switcher to tell the story, not a credential system. Production would use company SSO.
- **Real email and scheduled notifications**: the preview shows the content and the flow; delivery is plumbing.
- **HR admin console, template editor, analytics**: valuable, but they need Sarah's input on what to measure first.
- **Integrations (Slack, HRIS, IT ticketing, calendar)**: each is its own project and none changes the core experience.
- **Backend and database**: client-side state is enough to validate the experience.

## What's next

1. SSO and real roles (new hire, manager, IT, HR).
2. Real notifications: welcome and reminder emails, with scheduled nudges for overdue tasks.
3. An HR template editor so Sarah can change plans without a developer.
4. Task ownership across IT, HR and managers, with hand-offs and a queue for each team.
5. Analytics on onboarding completion time and the tasks that stall most often.
6. Roles beyond department (for example per-role task variants) and a "add new hire" form that generates a plan on the spot.
