import type { TaskTemplate } from '../types'
import {
  DAVID, DEVEX, IT_DESK, LENA, MARIA, OMAR, PEOPLE_TEAM, RACHEL, SARAH,
} from './people'

const HUB = 'https://brightpath.example'

const companyWide: TaskTemplate[] = [
  {
    id: 'all-offer-forms',
    title: 'Sign your offer & complete I-9 / tax forms',
    description:
      'Sign your offer letter, then fill in the I-9 and your federal and state tax withholding forms in the HR portal. Have your ID documents ready.',
    whyItMatters: 'We cannot run payroll or give you system access until these are on file.',
    link: { label: 'Open the HR portal', url: `${HUB}/hr/forms` },
    helpContact: SARAH,
    phase: 'before_day_1',
    dueOffsetDays: -6,
    owner: 'hr',
    department: 'All',
  },
  {
    id: 'all-id-photo',
    title: 'Upload a photo for your ID badge',
    description:
      'Upload a clear, front-facing headshot (plain background, no sunglasses). Facilities prints your badge from this photo.',
    whyItMatters: 'Your badge is ready at the front desk on Day 1 instead of being made while you wait.',
    link: { label: 'Upload your photo', url: `${HUB}/hr/badge` },
    helpContact: PEOPLE_TEAM,
    phase: 'before_day_1',
    dueOffsetDays: -4,
    owner: 'hr',
    department: 'All',
  },
  {
    id: 'all-handbook',
    title: 'Read the Employee Handbook',
    description:
      'Skim the handbook, focusing on time off, working hours, expenses, and our code of conduct. Note any questions for orientation.',
    whyItMatters: 'It answers most of the "how do things work here?" questions before you have to ask.',
    link: { label: 'Employee Handbook', url: `${HUB}/handbook` },
    helpContact: SARAH,
    phase: 'before_day_1',
    dueOffsetDays: -2,
    owner: 'new_hire',
    department: 'All',
  },
  {
    id: 'all-orientation',
    title: 'Attend New Hire Orientation',
    description:
      'Join the orientation session (9:30am, Conference Room A or the video link). We cover company history, values, and how teams fit together.',
    whyItMatters: 'You meet the other new hires and see the whole company, not just your team.',
    link: { label: 'Orientation calendar invite', url: `${HUB}/calendar/orientation` },
    helpContact: SARAH,
    phase: 'week_1',
    dueOffsetDays: 1,
    owner: 'hr',
    department: 'All',
  },
  {
    id: 'all-buddy',
    title: 'Meet your onboarding buddy',
    description:
      'Your buddy is a teammate outside your reporting line. Grab a 30-minute coffee or video call and ask them anything.',
    whyItMatters: 'Having one friendly person to ask the small questions makes the first weeks much easier.',
    helpContact: PEOPLE_TEAM,
    phase: 'week_1',
    dueOffsetDays: 2,
    owner: 'manager',
    department: 'All',
  },
  {
    id: 'all-manager-1on1',
    title: 'Have your first 1:1 with your manager',
    description:
      'Your manager will walk through your role, expectations, and how you prefer to work. Bring questions about priorities and team rhythms.',
    whyItMatters: 'Clear expectations from the start prevent most early misunderstandings.',
    helpContact: SARAH,
    phase: 'week_1',
    dueOffsetDays: 2,
    owner: 'manager',
    department: 'All',
  },
  {
    id: 'all-security-training',
    title: 'Complete security & privacy training',
    description:
      'Finish the 25-minute online course covering phishing, passwords, device security, and handling customer data.',
    whyItMatters: 'Most security incidents start with a single click; this keeps you and our customers safe.',
    link: { label: 'Start the course', url: `${HUB}/learning/security` },
    helpContact: IT_DESK,
    phase: 'week_1',
    dueOffsetDays: 3,
    owner: 'it',
    department: 'All',
  },
  {
    id: 'all-benefits',
    title: 'Set up your benefits enrollment',
    description:
      'Review the health, dental, vision and 401(k) options and submit your choices. The enrollment window closes 30 days after your start date.',
    whyItMatters: 'Choices made after the window closes generally cannot be changed until next year.',
    link: { label: 'Benefits portal', url: `${HUB}/benefits` },
    helpContact: SARAH,
    phase: 'weeks_2_4',
    dueOffsetDays: 10,
    owner: 'hr',
    department: 'All',
  },
  {
    id: 'all-goals',
    title: 'Set 30/60/90-day goals with your manager',
    description:
      'Draft three goals for each milestone and agree on them in a 1:1. Keep them specific and measurable.',
    whyItMatters: 'Shared goals tell you what a great first quarter looks like.',
    helpContact: SARAH,
    phase: 'weeks_2_4',
    dueOffsetDays: 14,
    owner: 'manager',
    department: 'All',
  },
  {
    id: 'all-compliance',
    title: 'Complete compliance training',
    description:
      'Complete the required courses on harassment prevention, anti-bribery and data protection. Each is about 15 minutes.',
    whyItMatters: 'It is required by law and by our customer contracts.',
    link: { label: 'Compliance courses', url: `${HUB}/learning/compliance` },
    helpContact: SARAH,
    phase: 'weeks_2_4',
    dueOffsetDays: 21,
    owner: 'hr',
    department: 'All',
  },
  {
    id: 'all-30-day-survey',
    title: 'Fill in the 30-day check-in survey',
    description: 'Answer 10 short questions about how onboarding is going. Responses are shared with HR only.',
    whyItMatters: 'Your feedback is how we fix onboarding for the next person.',
    link: { label: 'Open the survey', url: `${HUB}/survey/30-day` },
    helpContact: SARAH,
    phase: 'weeks_2_4',
    dueOffsetDays: 28,
    owner: 'new_hire',
    department: 'All',
  },
]

const engineering: TaskTemplate[] = [
  {
    id: 'eng-laptop',
    title: 'Laptop provisioned & shipped',
    description:
      'IT configures and ships your laptop. Confirm your shipping address and check the tracking number when it arrives.',
    whyItMatters: 'You can start building on Day 1 instead of waiting for hardware.',
    helpContact: IT_DESK,
    phase: 'before_day_1',
    dueOffsetDays: -5,
    owner: 'it',
    department: 'Engineering',
  },
  {
    id: 'eng-github',
    title: 'Get GitHub org access',
    description:
      'Accept the invitation to the brightpath GitHub organization and join your team. Turn on two-factor authentication.',
    whyItMatters: 'Nothing else in engineering onboarding works without repo access.',
    link: { label: 'GitHub organization', url: 'https://github.com/brightpath-example' },
    helpContact: IT_DESK,
    phase: 'week_1',
    dueOffsetDays: 1,
    owner: 'it',
    department: 'Engineering',
  },
  {
    id: 'eng-dev-env',
    title: 'Set up your local dev environment',
    description:
      'Clone the monorepo, run the bootstrap script, and get the app running locally with seeded data. Ask in #dev-help if anything fails.',
    whyItMatters: 'A working local environment is the foundation for shipping your first change.',
    link: { label: 'Dev setup guide', url: `${HUB}/eng/dev-setup` },
    helpContact: DEVEX,
    phase: 'week_1',
    dueOffsetDays: 2,
    owner: 'new_hire',
    department: 'Engineering',
  },
  {
    id: 'eng-wiki',
    title: 'Read the engineering onboarding wiki',
    description:
      'Read the architecture overview, branching and review conventions, and the incident process. Bookmark the runbooks.',
    whyItMatters: 'It shows how we build and ship so your first PR matches team conventions.',
    link: { label: 'Engineering wiki', url: `${HUB}/eng/wiki` },
    helpContact: DAVID,
    phase: 'week_1',
    dueOffsetDays: 3,
    owner: 'new_hire',
    department: 'Engineering',
  },
  {
    id: 'eng-first-pr',
    title: 'Ship your first small PR',
    description:
      'Pick a "good first issue", open a PR, and get it reviewed and merged. Small and boring is perfect.',
    whyItMatters: 'Going through review and deploy once demystifies the whole pipeline.',
    link: { label: 'Good first issues', url: 'https://github.com/brightpath-example/app/labels/good%20first%20issue' },
    helpContact: DAVID,
    phase: 'weeks_2_4',
    dueOffsetDays: 10,
    owner: 'new_hire',
    department: 'Engineering',
  },
  {
    id: 'eng-oncall',
    title: 'Shadow the on-call rotation',
    description:
      'Pair with this week\'s on-call engineer for a shift: watch alerts, follow the runbooks, and join any incident calls.',
    whyItMatters: 'You learn how production behaves and who to call before you ever carry the pager.',
    link: { label: 'On-call handbook', url: `${HUB}/eng/on-call` },
    helpContact: DAVID,
    phase: 'weeks_2_4',
    dueOffsetDays: 21,
    owner: 'manager',
    department: 'Engineering',
  },
]

const sales: TaskTemplate[] = [
  {
    id: 'sales-crm',
    title: 'Set up your CRM account',
    description:
      'Log in to the CRM with SSO, connect your calendar and email, and confirm your territory and pipeline views.',
    whyItMatters: 'Every customer conversation you log here becomes part of the team\'s shared picture.',
    helpContact: IT_DESK,
    phase: 'week_1',
    dueOffsetDays: 1,
    owner: 'it',
    department: 'Sales',
  },
  {
    id: 'sales-playbook',
    title: 'Review the sales playbook',
    description:
      'Read the playbook sections on ideal customer profile, discovery questions, objection handling, and pricing guardrails.',
    whyItMatters: 'It captures what has actually worked, so you do not start from scratch.',
    link: { label: 'Sales playbook', url: `${HUB}/sales/playbook` },
    helpContact: MARIA,
    phase: 'week_1',
    dueOffsetDays: 3,
    owner: 'new_hire',
    department: 'Sales',
  },
  {
    id: 'sales-demo-cert',
    title: 'Pass the product demo certification',
    description:
      'Record a 15-minute product demo for Sales Enablement and incorporate their feedback until you pass.',
    whyItMatters: 'Customers judge us on your demo; this makes sure you are confident before going live.',
    link: { label: 'Certification guide', url: `${HUB}/sales/demo-cert` },
    helpContact: MARIA,
    phase: 'week_1',
    dueOffsetDays: 7,
    owner: 'new_hire',
    department: 'Sales',
  },
  {
    id: 'sales-shadow-calls',
    title: 'Shadow 3 customer calls',
    description:
      'Join three calls with different reps (discovery, demo, and renewal) and write down two things you would do the same and one you would change.',
    whyItMatters: 'Hearing real conversations teaches tone and timing faster than any document.',
    helpContact: RACHEL,
    phase: 'weeks_2_4',
    dueOffsetDays: 10,
    owner: 'manager',
    department: 'Sales',
  },
  {
    id: 'sales-pipeline-review',
    title: 'Present your first pipeline review',
    description:
      'Walk your manager through your top 10 opportunities, next steps, and any deals that need help.',
    whyItMatters: 'It sets the habit of honest, regular pipeline reviews from the start.',
    helpContact: RACHEL,
    phase: 'weeks_2_4',
    dueOffsetDays: 21,
    owner: 'manager',
    department: 'Sales',
  },
]

const marketing: TaskTemplate[] = [
  {
    id: 'mkt-brand',
    title: 'Read the brand guidelines',
    description:
      'Go through the voice and tone guide, logo usage, colour palette and the do/don\'t examples.',
    whyItMatters: 'Everything you publish should sound and look like one company.',
    link: { label: 'Brand guidelines', url: `${HUB}/marketing/brand` },
    helpContact: LENA,
    phase: 'week_1',
    dueOffsetDays: 1,
    owner: 'new_hire',
    department: 'Marketing',
  },
  {
    id: 'mkt-tools',
    title: 'Get access to marketing tools',
    description:
      'Request access to the CMS, analytics dashboard, email platform and social scheduler through the IT portal.',
    whyItMatters: 'You will need these in nearly every task from week two on.',
    helpContact: IT_DESK,
    phase: 'week_1',
    dueOffsetDays: 1,
    owner: 'it',
    department: 'Marketing',
  },
  {
    id: 'mkt-calendar',
    title: 'Walk through the content calendar',
    description:
      'Review the next quarter\'s content calendar with Lena and note where you can contribute first.',
    whyItMatters: 'Knowing what is already planned helps you pick work that actually moves things forward.',
    helpContact: LENA,
    phase: 'week_1',
    dueOffsetDays: 3,
    owner: 'manager',
    department: 'Marketing',
  },
  {
    id: 'mkt-standup',
    title: 'Sit in on a weekly campaign stand-up',
    description:
      'Attend this week\'s campaign stand-up as an observer and ask one question afterwards.',
    whyItMatters: 'You learn who owns what and how decisions get made.',
    helpContact: LENA,
    phase: 'week_1',
    dueOffsetDays: 7,
    owner: 'new_hire',
    department: 'Marketing',
  },
  {
    id: 'mkt-brief',
    title: 'Draft your first campaign brief',
    description:
      'Write a one-page brief for a small campaign: audience, goal, channels, and how success will be measured.',
    whyItMatters: 'A strong brief is the best early proof that you understand our customers.',
    helpContact: LENA,
    phase: 'weeks_2_4',
    dueOffsetDays: 14,
    owner: 'new_hire',
    department: 'Marketing',
  },
]

const operations: TaskTemplate[] = [
  {
    id: 'ops-tools',
    title: 'Get access to ERP and finance tools',
    description:
      'Request access to the ERP, expense system and procurement portal. Your manager will approve the request.',
    whyItMatters: 'You cannot process or review any operational work without these systems.',
    helpContact: IT_DESK,
    phase: 'week_1',
    dueOffsetDays: 1,
    owner: 'it',
    department: 'Operations',
  },
  {
    id: 'ops-processes',
    title: 'Review the core process documentation',
    description:
      'Read the procurement, onboarding and vendor-payment process docs and flag anything that looks out of date.',
    whyItMatters: 'Fresh eyes are the best way to find gaps in how we run things today.',
    link: { label: 'Process library', url: `${HUB}/ops/processes` },
    helpContact: OMAR,
    phase: 'week_1',
    dueOffsetDays: 3,
    owner: 'new_hire',
    department: 'Operations',
  },
  {
    id: 'ops-vendors',
    title: 'Get an overview of vendor management',
    description:
      'Meet the vendor manager for a walk-through of our top 15 vendors, contracts and renewal dates.',
    whyItMatters: 'Renewals and vendor issues are where most surprises (and savings) come from.',
    helpContact: OMAR,
    phase: 'week_1',
    dueOffsetDays: 7,
    owner: 'manager',
    department: 'Operations',
  },
  {
    id: 'ops-review',
    title: 'Shadow a weekly operations review',
    description:
      'Attend the weekly operations review, follow the metrics, and write down two follow-up questions.',
    whyItMatters: 'It is the fastest way to learn which numbers matter and who acts on them.',
    helpContact: OMAR,
    phase: 'weeks_2_4',
    dueOffsetDays: 10,
    owner: 'manager',
    department: 'Operations',
  },
  {
    id: 'ops-improvement',
    title: 'Own one small process improvement',
    description:
      'Choose one process pain point, propose a fix with expected impact, and get it agreed with your manager.',
    whyItMatters: 'A quick, visible win builds trust and shows how you work.',
    helpContact: OMAR,
    phase: 'weeks_2_4',
    dueOffsetDays: 21,
    owner: 'new_hire',
    department: 'Operations',
  },
]

export const TEMPLATES: TaskTemplate[] = [
  ...companyWide,
  ...engineering,
  ...sales,
  ...marketing,
  ...operations,
]
