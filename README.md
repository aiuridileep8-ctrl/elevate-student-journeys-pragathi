# Stride

Colleges collect large amounts of student data, but it sits in separate systems, so administrators often spot struggling students only after the damage is done. Stride is a student success platform that brings data from seven sources into one unified student view: academic records, attendance, LMS activity, engagement, placement readiness, skills and course feedback. Records from each source are matched into a single profile per student.

The platform turns this data into a risk score from 0 to 100 for each student. The score is explainable: it is built from named factors such as low attendance, falling grades, backlogs, missed assignments, fee dues, low engagement and weak placement readiness, so counsellors can see why a student is flagged. A risk map shows the whole cohort at a glance, and a priority list ranks the students who most need help. A what-if simulator shows how improving attendance would change a student’s risk.

Stride also moves from insight to action. It recommends targeted interventions for each student, such as guardian outreach, peer tutoring, backlog clearance plans, mentoring and fee counselling, and lets administrators assign them to counsellors. The dashboard then shows how many students would leave high risk if the planned actions work. Automatically generated insights point out department-level patterns and students close to the high-risk threshold, so action can come before exams.

The prototype uses simulated data and a transparent weighted scoring model. Planned next steps are importing real institutional data and training a predictive model, such as gradient boosting, on historical outcomes. The explanation of each score would be kept alongside it.

I’ve worded the last paragraph so it doesn’t overclaim: the current risk score is a rule-based weighted model, not a trained machine learning model. If your submission is judged on AI depth, tell me and I can add a real model in the demo. I can also trim this to about 100 words if there’s a limit. give me the ui

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://elevate-student-journeys.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/bc19aae3-2cb8-5839-be45-23fd49767031).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Authentication and student database setup

The `/login` page uses Supabase Auth for email/password accounts. Supabase securely stores
credentials in its managed Auth database; this app does not store passwords. During evaluation,
any email-confirmed account can access and modify the live student roster and intervention records
without administrator approval. This deliberately open access is for the prototype only; restrict
access to approved staff before production use.

1. In Supabase **Authentication → Sign In / Providers**, enable email/password and allow new users
   to sign up. In **Authentication → URL Configuration**, keep email confirmation enabled.
2. Copy `.env.example` to `.env.local` and set `VITE_SUPABASE_URL` and
   `VITE_SUPABASE_PUBLISHABLE_KEY` from the project API settings. Never put a secret or
   `service_role` key in this file.
3. Run [`supabase/migrations/20261010193000_student_records.sql`](./supabase/migrations/20261010193000_student_records.sql)
   in the Supabase SQL Editor. It creates the roster, staff access list, row-level security
   policies, and realtime publication.
4. In **Authentication → URL Configuration**, set the Site URL to the deployed app origin and
   allow the sign-in and recovery callback URLs, including
   `https://snazzy-bubblegum-7ce2b4.netlify.app/login`,
   `https://snazzy-bubblegum-7ce2b4.netlify.app/login?reset=1`,
   `http://localhost:8080/login`, and `http://localhost:8080/login?reset=1`.
   Do not leave the Site URL set to an inactive localhost port for production.
5. After applying the student, intervention, follow-up, and semester migrations below, run
   [`supabase/migrations/20261011103000_open_confirmed_user_access.sql`](./supabase/migrations/20261011103000_open_confirmed_user_access.sql)
   in the SQL Editor. It removes the administrator approval requirement for authenticated users.
6. Restart the development server after changing environment variables. New users must confirm
   their email and sign in before accessing the dashboard.

Users can request a password reset from **Sign in → Forgot password?**. Supabase sends a one-time
recovery link to the account email; after opening it, users set and confirm a new password in Stride.
If a link expires or redirects to an unavailable local address, correct the Site URL and allowed
redirect URLs above, then request a fresh link.

Signed-in users can add and edit records in **Students → Add student** during evaluation. Fields match the dashboard
scoring model: student ID, name, department, year, academic year, semester, attendance, academic
score, backlogs, missed assignments, fee dues, engagement, and placement readiness. Roster changes
sync to connected dashboards in realtime. The database validates score ranges and enforces
student-ID uniqueness. Risk scores are rule-based, not institutional predictions.

For bulk entry, signed-in users can use **Students → Import CSV**. In Excel, use one student per
row with these headers: `student_id`, `name`, `department`, `year_label`, `academic_year`,
`semester`, `attendance`, `grades`, `backlogs`, `missed`, `engagement`, and `placement`.
`fees` is optional and defaults to `0`; use `1` for outstanding dues. Export as **CSV UTF-8**,
then select the file in the app. Semester must be 1–8 for B.Tech; attendance, grades, engagement, and
placement must be 0–100; backlogs and missed assignments must be whole numbers. Student IDs must
be unique both within the file and across the existing roster. If any ID already exists, the
database rejects the whole batch so no partial import is made. Each inserted row is attributed to
the signed-in staff account.

Apply [`supabase/migrations/20261011090000_btech_eight_semesters.sql`](./supabase/migrations/20261011090000_btech_eight_semesters.sql)
to enforce the 1–8 semester limit in the database as well as the app. The migration preserves any
existing records outside that range, but the database will reject new or updated invalid semester
values.

The eight example profiles and public MCP tools remain simulated-only. They are not imported into
the real student roster or exposed through MCP.

### Intervention assignment notifications

Signed-in users can assign an intervention to one of the prototype counsellor names and enter that
person's email address. The assignment is stored in `public.interventions`; a database trigger
creates an in-app notification for that email, and the dashboard listens for matching notifications
in realtime. After assignment, the dashboard calls the `send-intervention-notification` Supabase
Edge Function to send an email. The assignee can also see the in-app notification after signing into
Stride with the same email address.

Apply [`supabase/migrations/20261010233000_intervention_notifications.sql`](./supabase/migrations/20261010233000_intervention_notifications.sql)
after the student-record migration. Assignments include a follow-up due date and can be updated with
staff notes and a completion outcome in **Interventions → Follow-up tracking**. Apply
[`supabase/migrations/20261011004700_intervention_follow_up.sql`](./supabase/migrations/20261011004700_intervention_follow_up.sql)
after the intervention-notifications migration to add these fields. In-app notifications are
available. To enable email delivery, configure a Resend account with a verified sender domain, link
the correct Supabase project with the Supabase CLI, set the Edge Function secrets and deploy the
function:

```sh
supabase login
supabase link --project-ref <your-project-ref>
supabase secrets set RESEND_API_KEY=<your-resend-api-key> NOTIFICATION_FROM="Stride <notifications@your-verified-domain>"
supabase functions deploy send-intervention-notification
```

Replace the sender with an address verified by Resend. These values are server-side Supabase
secrets; never add the Resend key or a Supabase secret/service-role key to frontend environment
variables. Netlify deployment alone does not configure the Resend provider: emails will report a
delivery error until these secrets are set and the Edge Function is deployed.
