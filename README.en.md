# Doulaichuang · One-Stop Doumen Opportunity Platform

A static, high-fidelity design prototype for an opportunity-matching platform for Greater Bay Area youth in Doumen District, Zhuhai, Guangdong. It contains a 19-screen WeChat mini-program prototype, an 11-view admin console prototype, and a design overview page sharing one token set and component library.

> This is a **static prototype**: no backend, no build step, no third-party dependencies. All projects, news, policies, organizations, jobs, supply-and-demand posts, activities, and user records are fictional demo data. Official content is published only after review.

| Item | Detail |
| --- | --- |
| Platform | 斗来创 (Doulaichuang) — One-Stop Doumen Opportunity Platform |
| Region | Doumen District, Zhuhai, Guangdong |
| Audience | Greater Bay Area youth, startup teams and job seekers, youth organizations and business associations, district media-center and united-front staff |
| Host / Operator | United Front Work Department of the CPC Doumen District Committee / Doumen District Convergence Media Center |
| Deliverables | Mini-program prototype (19 screens) + admin prototype (11 views) + design overview page |

The mini-program organizes content into **six modules**: Find Projects, Find Information, Find Organizations, Find Jobs, Find Supply & Demand, Find Activities.

## Quick start

Open `src/index.html` in a browser — icons are injected as inline SVG, so it also works over `file://`.

```bash
python -m http.server 8080
# http://localhost:8080/src/
```

| Entry | Path | Contents |
| --- | --- | --- |
| Design overview | `src/index.html` | Design direction and the list of items awaiting client confirmation |
| Mini-program | `src/miniprogram/index.html` | 19 interactive screens in a 390×844 device frame, page index, design notes panel |
| Admin console | `src/admin/index.html` | 11 views behind a login overlay |

Both prototypes support hash deep links, e.g. `src/miniprogram/index.html#project-detail` or `src/admin/index.html#review`.

Demo admin account: `chenjing@doulaichuang.cn`, any password; or use "直接进入工作台" to skip login.

## Structure

```text
.
├─ src/                        Self-contained static site; the repo root keeps docs only
│  ├─ index.html               Design overview
│  ├─ miniprogram/index.html   Mini-program: 19 screens + page index + notes panel
│  ├─ admin/index.html         Admin: 11 views + login overlay
│  ├─ assets/
│  │  ├─ css/
│  │  │  ├─ tokens.css         Design tokens: color, radius, shadow, spacing, type, motion, z-index
│  │  │  ├─ base.css           Reset and shared components
│  │  │  ├─ overview.css       Overview page styles
│  │  │  ├─ miniprogram.css    Showcase shell and the 19 screens (carousel, promo, job/supply/activity cards)
│  │  │  └─ admin.css          Shell, tables, editor, review, carousel config, role management
│  │  └─ js/
│  │     ├─ icons.js           71 inline 24×24 line icons + hydration
│  │     ├─ miniprogram.js     Screen router, notes, back stack, carousel, script toggle, lazy promo video
│  │     └─ admin.js           View switching, login, select-all, tabs, live carousel preview, toast
│  └─ 7a7734101140a60d75b8472954e62912.txt   Third-party site verification file, do not delete
├─ README.md
└─ README.en.md
```

`src/` is a self-contained static site: the relative links between the three entries (`../index.html`, `miniprogram/index.html`) and the asset references (`../assets/...`) all resolve inside `src/`, so the folder can be deployed or copied as a whole.

## Design direction

Every page follows the same contract, repeated at the top of each HTML file:

| Aspect | Rule |
| --- | --- |
| Thesis | An entry point that Greater Bay Area youth understand, trust, and dare to act on — not a government information portal. |
| Own world | Bay-Area blue carries institutional credibility; warm orange marks "actionable right now"; eco green belongs to Doumen's industry and landscape; water-town ripples are the only ornament, confined to hero areas and image placeholders. |
| Story | See Doumen → find a project → find information → find an organization → find a job → find supply and demand → find an activity → leave contact details. |
| First view | A configurable hero carousel explaining the platform, followed by the six module entries and a promo video; carousel copy and styling are configured in the admin console, and the video is lazy-loaded and never autoplays. |
| Form | Mini-program: single column at 390×844. Admin: deep-blue sidebar plus a light workspace, status before decoration. |
| Scope | Mini-program 19 screens (six modules plus account and contact flows); admin 11 views; single-level content review. |

Two hard rules follow from this:

- **Color is semantics**: blue = credibility (structure, navigation, emphasis), eco green = industry and landscape (projects, organizations, approvals), warm orange = action (pending work, featured items, submit). Orange never exceeds 10% of any screen.
- **Status before decoration**: lists, cards, and detail pages must first answer "what state is this content in"; ornament only aids recognition.

## Design system

- **Color (60-30-10)**: `--blue-800 #0F3557` … `--blue-50 #EDF3FB` for structure; `--green-700 #24724A` … `--green-50 #E9F5EF` for industry and landscape content; `--orange-700 #B8590A` (action buttons, white-text contrast), `--orange-500 #F28C28` (emphasis, pending counts), `--orange-50 #FFF3E8`; neutrals `--ink-900 #16202B` → `--ink-200 #CBD3DB`, `--bg #F4F7FA`, `--line #E3E8EE`; status colors `#2E8B57` / `#B7791F` / `#D14343`.
- **Type**: system font stack (PingFang SC / Microsoft YaHei), no web fonts; `--font-num` with tabular numerals for IDs and statistics; seven steps from 40px page titles down to 10.5px metadata; article body 14px / 1.95 justified.
- **Shape and motion**: radii 6 / 8 / 12 / 16 / 20 / 28 / 999px; four very light blue-tinted shadows plus a focus ring; spacing 4–48px; durations 120 / 200 / 300ms on `cubic-bezier(.2,.8,.2,1)`; z-index layers fixed at 20 / 40 / 60 / 80 / 100.
- **Icons**: 71 inline SVGs, 24×24, stroke 1.8, round caps, no fill. Use `<i data-icon="arrow-right"></i>`; `DLC.hydrateIcons()` replaces them on load and falls back to `info` for unknown names.
- **Shared components**: buttons (`primary`, `accent`, `secondary`, `ghost`, `soft`, `danger`, `green`, `glass`), tags, status pills with a leading dot, form controls, avatars, `.media` water-town gradient placeholders, notices, empty and skeleton states, toast.
- **Accessibility**: `aria-label`, `role="button"` + `tabindex="0"`, `:focus-visible` rings, arrow-key navigation, `prefers-reduced-motion` support.

## Mini-program screens (19)

| # | Screen | Purpose |
| --- | --- | --- |
| 01 | Home | The 斗来创 brand and simplified / traditional toggle float over the carousel; admin-configurable carousel (3 slides); six module entries; lazy-loaded promo video placed below the six entries; featured projects; latest information; upcoming activities; organization banner. |
| 02 | Find Projects | Search, sector chips, featured card, project cards with district / cooperation model / status. |
| 03 | Project detail | Hero with tags, four fact cells, intro, highlights, gallery; contacts require login; share / contact bar. |
| 04 | Find Information | Merges the former "major updates" and "Hong Kong and Macau policies"; category tabs, lead card, list, policy entries. |
| 05 | Information detail | Lead block, body, captioned figure, source and editor, review note. |
| 06 | Policy detail | Deep-blue hero, document metadata, 3–5 key points, full text, login-gated attachments. |
| 07 | Find Organizations | Search, type chips, cards with member and event counts, join mode. |
| 08 | Organization detail | Monogram mark, three metrics, intro, responsibilities, recent activities, join entry. |
| 09 | Join organization | Three-step stepper, prefilled profile, organization, 300-character reason, experience, proof upload, consent. |
| 10 | Find Jobs | Full-time / internship / part-time tabs, job cards (salary · district · education · type), application notice, load more. |
| 11 | Job detail | Salary hero with tags, fact grid, responsibilities / requirements / benefits, login-gated contact, save + apply after login. |
| 12 | Find Supply & Demand | Supply / demand / rental tabs, cards (type · quantity · area · validity), "contact visible after login", load more. |
| 13 | Supply & demand detail | Hero, fact grid, details, cooperation notes, contact form (name / phone / message), submit. |
| 14 | Find Activities | All / open / study tour / roadshow tabs, activity cards (time · venue · quota), signup notice, load more. |
| 15 | Activity detail | Hero, fact grid (deadline / quota / signed up / fee), intro, agenda, signup form (name / phone / party size / questions), submit. |
| 16 | Login | Benefits first, one-tap WeChat login, skippable. |
| 17 | Profile | Verified identity tags, application / view stats, grouped menus. |
| 18 | My applications | Status filters, application numbers, three-stage timeline (submitted → under review → result). |
| 19 | Contact request | Project recap, contact channel, preferred time, phone, 200-character message, free-of-charge notice. |

### Interaction mechanics

- Screen switching uses `[data-go]`, `[data-back]`, and `[data-toast]` through event delegation, a back stack capped at 24 entries, hash sync via `history.replaceState`, and arrow-key navigation.
- **Hero carousel**: `#heroCarousel` offers prev / next buttons and dots; switching is manual, with no autoplay. Title, subtitle, font size, weight, color, and alignment come from the admin console and are rendered through `--hc-*` CSS variables.
- **Simplified / traditional toggle**: the header pill converts text nodes and `placeholder` attributes through a dictionary. It applies only to static interface copy; anything marked `[data-dynamic]` is backend output and stays in its original form.
- **Lazy promo video**: only the poster and play button render initially. A click creates a `<video preload="none">` and starts playback; nothing autoplays. When no video source is wired up, a notice appears and the poster returns.
- The tab bar appears only on the five top-level screens (home, projects, information, activities, profile); detail screens hide it. Home and login use the dark status bar.
- Form textareas sync their character counter from `maxlength`; chips and tabs are single-select and only change their selected state.

### Content rules (from the notes panel)

- Content (projects, information, jobs, supply and demand, activities) is published only after **single-level review**: create or edit → review → approved / rejected. Every edit requires a fresh review.
- Joining an organization follows **submit → approve → approved / rejected**, with a five-working-day commitment.
- Leaving contact details on supply-and-demand posts and signing up for activities requires login; contacts stay masked until then.
- Activity signups are confirmed in the admin console, and registration closes once the quota is full.
- The simplified / traditional toggle covers static interface copy only; dynamic content keeps its original form.
- Titles and sources are mandatory, clickbait is not allowed, and no marketing or outbound links may be inserted into body text.
- Policy meaning must not be altered; document numbers and issuing bodies must match the official release, and summaries must carry a "official text prevails" note.
- Organization records are maintained in the admin console, changes are logged, and application status stays in sync with the console.
- Identity documents and contact details are used for eligibility checks only.

## Admin views (11)

| View | Purpose |
| --- | --- |
| Dashboard | Four KPIs (pending review, published this month, signups to confirm, mini-program visits), seven-day published / pending chart, to-dos, recent publications, content mix, takedown warning. |
| Contents | Type tabs (all / projects / information / jobs / supply / activities), search and status / category / date filters, bulk selection, row actions (edit, take down, republish, delete), pagination. |
| Content detail | Metadata, rich-text toolbar with editable body, image slots, publishing settings (homepage feature), status plus a take-down action, three-step review explanation. The comment switch and the "sync to mini-program" switch have both been removed. |
| Review | Pending queue, content detail with attachments, return for revision / reject / approve and publish, single-level audit timeline. |
| Carousel | Slide table (thumbnail, copy, order, status, editor), copy and typography form (title, subtitle, size, weight, color, alignment, image), live mini-program preview, link target and enable switch. |
| Activities | Type tabs, activity table (time / venue / signups / quota / status), create, edit, signups, republish, delete. |
| Signups | Filter by activity and status, bulk confirm, export the list, view / confirm / cancel a single record, personal-data notice. |
| Membership applications | Sensitive-data notice, status and organization filters, approve / reject, notify applicant, export. |
| Organizations | Organization table (type, contact, member count, status), online / offline toggling. |
| Accounts and roles | Role cards with add / delete, four demo accounts, permission matrix grouped by the six modules, least-privilege note. |
| Audit log | Time, operator, role, action, object, IP, result; logs retained for 180 days. |

## Status conventions

- **Content**: `draft` → `pending review` → `published`, with the review outcome being approved or rejected; published content can be taken down, and any edit returns it to pending review.
- **Review chain**: editor writes → review (approved / rejected) → auto-publish. Single-level, no multi-stage routing; each record stores reviewer, time, and comment.
- **Joining an organization**: `pending` → `approved` / `rejected`, with a five-working-day commitment.
- **Activity signups**: `pending confirmation` → `confirmed` / `cancelled`; the console can confirm in bulk and export the list.
- **Role management**: roles can be added and deleted, and the permission list follows the six modules (content, review and publishing, carousel, activities and signups, membership and organizations, system). The system administrator is built in and cannot be deleted.
- **Organizations**: `online` / `offline`. **Projects**: `seeking investment` / `under cooperation` / `recruiting`.
- Status labels in the mini-program are read-only and driven entirely by the admin console.
- Contacts are masked until login; messages and signups are followed up by staff at no charge.
- **Demo data**: 122 content items (42 projects / 36 information / 18 jobs / 14 supply and demand / 12 activities), 18 organizations, 27 membership applications, 23 activity signups, all dated in 2026.

## Implementation notes

- Plain HTML, CSS custom properties, and vanilla JavaScript (IIFE). No framework, no bundler, no `package.json`.
- Icons live as SVG strings in JavaScript, so there are no extra requests and no cross-origin issues over `file://`.
- Responsive: overview collapses at 900px; the mini-program shell degrades at 1240 / 920 / 520px (index hidden below 520); the admin console at 1180 / 900 / 620px (sidebar collapses to a 64px icon rail below 900).

## Pending client confirmation

1. Main visual direction and the 60-30-10 ratio.
2. Order of the six modules and homepage content priority — currently projects > information > organizations > jobs > supply and demand > activities.
3. Carousel configuration scope (slide cap, configurable copy and style fields, autoplay) — currently 3 slides, manual switching.
4. Promo video source, duration, and poster — currently lazy-loaded, no autoplay, 02:18 sample duration.
5. Simplified / traditional conversion standard and boundary — currently static interface copy only.
6. Access rules for contact and message entry points — currently visible but login-gated for submission.
7. Join-organization fields and approval states — currently submit → approve → approved / rejected.
8. Review levels and state names — currently single-level, with every edit re-reviewed.
9. Whether activity signups need manual confirmation, plus quota limits and export fields — currently confirmed in the console with list export.
10. Supported viewport range — currently 390×844 for the mini-program, full admin layout at ≥1280px degrading to 900px.

## Known limitations

- No backend or persistence: reloading resets everything; submissions, reviews, uploads, downloads, search, and pagination are simulated.
- Login is a demo: any password works and permissions are not enforced; roles and the permission matrix illustrate the design only.
- The simplified / traditional toggle is a front-end dictionary replacement covering 267 characters and 70 phrases; it does not resolve polyphones or context, and applies to static copy only.
- No video file is bundled: clicking play reports "no promo source in this demo", and production wires the URL through the console.
- The carousel is manual only; dwell time and easing are decided during mini-program implementation.
- All records and names are fictional; policy texts are illustrative and must be replaced with official documents, including document numbers, before publication.
- Image slots use water-town gradient placeholders; no maps, emblems, or official marks are included.
- The overview page currently contains only the hero and the pending-confirmation list; `overview.css` already styles palette, type, icon, and page sections for future expansion.

## Contributing

1. Register a new screen in `ORDER` and `NOTES` inside `src/assets/js/miniprogram.js`; the notes panel builds the index from them.
2. Add an admin view as `<section class="view" data-view="…" data-title="…">`; a sidebar button with the same `data-view` links to it.
3. Mark backend-published copy with `data-dynamic` so the script toggle leaves it untouched.
4. Reference tokens from `tokens.css` for color, radius, and shadow; never write raw color values in page styles.
5. Add icons to the table in `src/assets/js/icons.js` — 24×24, stroke 1.8, no fill.
6. Before committing, check all three entries at 1280px and 900px and confirm keyboard operation still works.

## Copyright

Content, data, and design assets belong to the host and operator organizations and are provided for project review and implementation hand-off only.
