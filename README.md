# Admin Template

A responsive admin dashboard template built with **Next.js 14 (App Router)**, **React 18** and **TypeScript**. Styling is plain CSS with design tokens, so there are no UI libraries to learn or upgrade. All data is demo data held in the browser, ready to be swapped for a real backend.

## Features

| Area | What you get |
| --- | --- |
| **Dashboard** | Revenue this week vs. last week, stat cards, 7-day revenue chart, best-selling items, recent orders, invoices to collect, top customers, and a music player |
| **User** | List with pagination, add/edit form with a clickable avatar (change the picture) |
| **Item** | List with cover thumbnails, add/edit form with a cover image and a rich text *Detail* box |
| **Order** | Orders with status badges and summary cards (total, pending, completed revenue, cancelled), auto-numbered new orders |
| **Invoice** | Invoices with Draft / Unpaid / Paid / Overdue, summary cards (outstanding, overdue, paid, drafts), auto-numbered new invoices |
| **File** | Image files show a thumbnail, other files show a typed icon; **New File** opens the file picker and uploads straight away; delete rows |
| **Calendar** | Month grid for the current month, month/year picker, add/edit/delete events |
| **Kanban** | Drag and drop cards between To do / In progress / Review / Done, add/edit/delete cards |
| **Message** | Conversation list and chat thread with unread counts |
| **Mail** | Inbox, Sent, Drafts and Trash as sub-items in the sidebar, compose with rich text, reply, star, delete; on small screens the message opens in a modal |
| **Profile** | View and edit your profile and avatar; the header updates with it |
| **Settings** | Light / dark / system theme, font (Manrope, Inter, DM Sans, Lora, JetBrains Mono) and accent color, applied instantly and remembered |

Other details:

- Sidebar is full height and sticky, and collapses to an **icon-only rail below 768px**. The header search collapses to an icon the same way.
- The music player keeps playing while you move between pages, with a small floating player on pages other than the Dashboard.

## Getting started

Requires **Node.js 18.17 or newer**.

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | Type-check with `tsc --noEmit` |

### Music file

The Dashboard player expects an audio file at `public/music/music_jazz.mp3`. It is **not included** in the repository (it is large and git-ignored), so add your own file there. To use a different track or filename, change `TRACK` in `src/lib/player.tsx`.

## Routes

```
/                 Dashboard
/user             Users
/item             Items
/order            Orders
/invoice          Invoices
/file             Files
/calendar         Calendar
/kanban           Kanban board
/message          Messages
/mail             Inbox   (also /mail/sent, /mail/drafts, /mail/trash)
/profile          Your profile
/settings         Appearance settings
```

## Project structure

```
src/
  app/                 Routes (one folder per page) and globals.css
    layout.tsx         Shell: sidebar, header, providers, fonts
  components/          UI building blocks
    CrudPage.tsx       Generic list + add/edit page, driven by a config
    DataTable.tsx, EntityForm.tsx, Pagination.tsx, Modal.tsx
    RichTextEditor.tsx, CoverPicker.tsx, AvatarPicker.tsx
    Sidebar.tsx, Topbar.tsx, MusicPlayer.tsx, MiniPlayer.tsx
  lib/
    configs.ts         Columns, form fields and defaults for User / Item / Order / Invoice / File / Calendar
    data.ts            Demo data
    dashboard.ts       Dashboard figures computed from the demo orders and invoices
    kanban.ts          Kanban columns, tags, people and demo board
    profile.tsx, settings.tsx, mail.tsx, player.tsx   Shared state (React context)
public/                Static files (demo images, music folder)
```

### Adding another CRUD page

Most list pages (User, Item, Order, Invoice, File) are a config object plus a two-line page:

1. Add an `EntityConfig` to `src/lib/configs.ts` (columns, form fields, blank row).
2. Add `src/app/<name>/page.tsx` that renders `<CrudPage config={yourConfig} />`.
3. Add a link in `src/components/Sidebar.tsx`.

### Theming

Colors, fonts and the accent hue are CSS variables at the top of `src/app/globals.css`. The accent is a single `--hue` value, and `:root[data-theme='dark']` overrides the neutral tokens for dark mode. Add or change accent colors in `ACCENTS` in `src/lib/settings.tsx`.

## Connecting a backend

Nothing is persisted yet: refresh the page and demo data comes back. Where to plug in a real API:

- **User, Item, Order, Invoice, File lists**: the `useState` in `src/components/CrudPage.tsx` (load, save and delete).
- **Calendar, Kanban, Mail, Message**: the state at the top of each page file (`src/app/<page>/page.tsx`; mail state is in `src/lib/mail.tsx`).
- **Profile and Settings**: `src/lib/profile.tsx` and `src/lib/settings.tsx`, currently saved to `localStorage`.
- **Dashboard**: `src/lib/dashboard.ts` computes everything from the demo orders and invoices. Replace its inputs with real queries.

Orders and invoices are not linked to each other yet. In a real system an invoice usually references one or more orders.

## Notes

- Uploaded images and files only exist in the browser session (object URLs), so they are lost on refresh.
- The rich text editor is a small `contentEditable` implementation (no dependency). It uses `document.execCommand`, which browsers still support but consider legacy. A library such as Tiptap is a good replacement if you need more.
- Kanban drag and drop uses the browser's native drag events, which are unreliable on touch screens. The **Status** field in the card form works everywhere.

## License

No license has been chosen yet. Add one before sharing the code publicly.
