# Doulaichuang · Rural Entrepreneurship Platform for Hong Kong and Macau Youth

A static, high-fidelity design prototype for a rural-entrepreneurship promotion platform in Doumen District, Zhuhai, Guangdong. It contains a 14-screen WeChat mini-program prototype, an 8-view admin console prototype, and a design-system overview page sharing one token set and component library.

> This is a **static prototype**: no backend, no build step, no third-party dependencies. All projects, news, policies, organizations, and user records are fictional demo data. Official content must pass the client's final review before publication.

| Item | Detail |
| --- | --- |
| Platform | 斗来创 (Doulaichuang) |
| Region | Doumen District, Zhuhai, Guangdong |
| Audience | Hong Kong / Macau young entrepreneurs, rural-innovation organizations, district media-center staff |
| Host / Operator | United Front Work Department of the CPC Doumen District Committee / Doumen District Convergence Media Center |
| Deliverables | Mini-program prototype (14 screens) + admin prototype (8 views) + design overview page |

## Quick start

Open `index.html` in a browser — icons are injected as inline SVG, so it also works over `file://`.

```bash
python -m http.server 8080
# http://localhost:8080/
```

| Entry | Path | Contents |
| --- | --- | --- |
| Design overview | `index.html` | Design direction and the list of items awaiting client confirmation |
| Mini-program | `miniprogram/index.html` | 14 interactive screens in a 390×844 device frame, page index, design notes panel |
| Admin console | `admin/index.html` | 8 views behind a login overlay |

Both prototypes support hash deep links, e.g. `miniprogram/index.html#project-detail` or `admin/index.html#review`.

Demo admin account: `chenjing@doulaichuang.cn`, any password; or use "直接进入工作台" to skip login.

## Structure

```text
.
├─ index.html                  Design overview
├─ miniprogram/index.html      Mini-program: 14 screens + page index + notes panel
├─ admin/index.html            Admin: 8 views + login overlay
├─ assets/
│  ├─ css/
│  │  ├─ tokens.css            Design tokens: color, radius, shadow, spacing, type, motion, z-index
│  │  ├─ base.css              Reset and shared components
│  │  ├─ overview.css          Overview page styles
│  │  ├─ miniprogram.css       Showcase shell and the 14 screens
│  │  └─ admin.css             Shell, tables, editor, review, login
│  └─ js/
│     ├─ icons.js              71 inline 24×24 line icons + hydration
│     ├─ miniprogram.js        Screen router, notes, back stack, keyboard nav, counters
│     └─ admin.js              View switching, login, select-all, tabs, toast
├─ 7a7734101140a60d75b8472954e62912.txt   Third-party site verification file, do not delete
├─ README.md
└─ README.en.md
```

## Design direction

Every page follows the same contract, repeated at the top of each HTML file:

| Aspect | Rule |
| --- | --- |
| Thesis | An entry point that Hong Kong and Macau youth understand, trust, and dare to act on — not a government information portal. |
| Own world | Bay-Area blue carries institutional credibility; warm orange marks "actionable right now"; eco green belongs to rural innovation; water-town ripples are the only ornament, confined to hero areas and image placeholders. |
| Story | See Doumen → understand the opportunity → check the policy → find the organization → apply → await feedback. |
| First view | One sentence explaining the platform, three tappable content entries, one latest major update. No carousels, no purely decorative hero images. |
| Form | Mini-program: single column at 390×844. Admin: deep-blue sidebar plus a light workspace, status before decoration. |

## Design system

- **Color (60-30-10)**: `--blue-800 #0F3557` … `--blue-50 #EDF3FB` for structure; `--green-700 #24724A` … `--green-50 #E9F5EF` for rural-innovation content; `--orange-700 #B8590A` (action buttons, white-text contrast), `--orange-500 #F28C28` (emphasis, pending counts), `--orange-50 #FFF3E8`; neutrals `--ink-900 #16202B` → `--ink-200 #CBD3DB`, `--bg #F4F7FA`, `--line #E3E8EE`; status colors `#2E8B57` / `#B7791F` / `#D14343`.
- **Type**: system font stack (PingFang SC / Microsoft YaHei), no web fonts; `--font-num` with tabular numerals for IDs and statistics; seven steps from 40px page titles down to 10.5px metadata; article body 14px / 1.95 justified.
- **Shape and motion**: radii 6 / 8 / 12 / 16 / 20 / 28 / 999px; four very light blue-tinted shadows plus a focus ring; spacing 4–48px; durations 120 / 200 / 300ms on `cubic-bezier(.2,.8,.2,1)`; z-index layers fixed at 20 / 40 / 60 / 80 / 100.
- **Icons**: 71 inline SVGs, 24×24, stroke 1.8, round caps, no fill. Use `<i data-icon="arrow-right"></i>`; `DLC.hydrateIcons()` replaces them on load and falls back to `info` for unknown names.
- **Shared components**: buttons (`primary`, `accent`, `secondary`, `ghost`, `soft`, `danger`, `green`, `glass`), tags, status pills with a leading dot, form controls, avatars, `.media` water-town gradient placeholders, notices, empty and skeleton states, toast.
- **Accessibility**: `aria-label`, `role="button"` + `tabindex="0"`, `:focus-visible` rings, arrow-key navigation, `prefers-reduced-motion` support.

## Mini-program screens

1. Home — positioning statement, 42 / 18 / 36 stats, four entries, featured projects, latest news, policies, organizations
2. Projects — search, sector chips, featured card, project cards with district / cooperation model / status
3. Project detail — hero, four fact cells, intro, highlights, gallery; contacts require login; favorite / share / contact bar
4. Major updates — category tabs, lead card, source, date, view count
5. Article detail — lead, body, captioned figure, source and editor, final-review note
6. Policies — compilation / interpretation / document tabs, "official release prevails" notice
7. Policy detail — deep-blue hero, document metadata, 3–5 key points, full text, login-gated attachments
8. Organizations — search, type chips, cards with member and event counts, join mode
9. Organization detail — monogram mark, three metrics, intro, responsibilities, recent events, join entry
10. Membership application — three-step stepper, prefilled profile, organization, 300-character reason, experience, proof upload, consent
11. Login — benefits first, one-tap WeChat login, skippable
12. Profile — verified identity tags, application / favorite / view stats, grouped menus
13. My applications — status filters, application numbers, four-stage timeline
14. Contact request — project recap, contact channel, preferred time, phone, 200-character message, free-of-charge notice

Screen switching uses `[data-go]`, `[data-back]`, and `[data-toast]` through event delegation, a back stack capped at 24 entries, hash sync via `history.replaceState`, and arrow-key navigation. The tab bar appears only on the five top-level screens.

## Admin views

1. Dashboard — four KPIs, seven-day published / pending chart, to-dos, recent publications, content mix, takedown warning
2. Contents — type tabs, search and filters, bulk selection, row actions, pagination
3. Editor — metadata, rich-text toolbar with editable body, image slots, publishing switches, review-flow explanation
4. Review — pending queue, content detail, return / takedown / approve-and-publish, audit timeline
5. Membership applications — sensitive-data notice, filters, initial review, final review, notify applicant
6. Organizations — organization table, online / offline toggling
7. Accounts and roles — four demo accounts, role-by-module permission matrix, least privilege
8. Audit log — time, operator, role, action, object, IP, result; logs retained for 180 days

## Status conventions

- Content: `draft` → `pending review` → `published`; any review stage can return it for revision, and published content can be taken down.
- Review chain: editor writes → platform initial review → client final review → auto-publish, fully audited.
- Membership: `under review` → `awaiting final review` → `approved` / `rejected`, with a five-working-day commitment.
- Organizations: `online` / `offline`. Projects: `seeking investment` / `under cooperation` / `recruiting`.
- Status labels in the mini-program are read-only and driven entirely by the admin console.
- Contacts are masked until login; contact requests are followed up within one to two working days at no charge.

## Implementation notes

- Plain HTML, CSS custom properties, and vanilla JavaScript (IIFE). No framework, no bundler, no `package.json`.
- Icons live as SVG strings in JavaScript, so there are no extra requests and no cross-origin issues over `file://`.
- Responsive: overview collapses at 900px; the mini-program shell degrades at 1240 / 920 / 520px (index hidden below 520); the admin console at 1180 / 900 / 620px (sidebar collapses to a 64px icon rail below 900).

## Pending client confirmation

1. Whether the "Bay-Area blue · rural orange" direction is approved — currently implemented as approved.
2. Exact palette values and the 60-30-10 ratio.
3. Homepage content priority — currently projects > major updates > policies > organizations.
4. Contact-entry access rule — currently visible but login-gated.
5. Membership form fields and review states — currently 6 required fields and 4 states.
6. Admin content status flow — currently draft → pending review → published / taken down.
7. Whether Doumen visual elements, maps, or official marks may be used — currently none are used.
8. Supported viewport range — currently full admin layout at ≥1280px, degrading to 900px.

## Known limitations

- No backend or persistence: reloading resets everything; submissions, reviews, uploads, downloads, search, and pagination are simulated.
- Login is a demo: any password works and permissions are not enforced.
- All records and names are fictional; policy texts are illustrative and must be replaced with official documents, including document numbers, before publication.
- Image slots use water-town gradient placeholders; no maps, emblems, or official marks are included.
- The overview page currently contains only the hero and the pending-confirmation list; `overview.css` already styles palette, type, icon, and page sections for future expansion.

## Copyright

Content, data, and design assets belong to the host and operator organizations and are provided for project review and implementation hand-off only.
