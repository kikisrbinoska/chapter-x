# ChapterX Frontend

A collaborative storytelling platform built with React + TypeScript + Vite + Tailwind CSS.

## Getting Started

```bash
cd chapterx-frontend
npm install
npm run dev
```

The app runs at http://localhost:5173

## Dev Switcher

There is a floating blue button in the bottom-left corner that opens the **Dev Switcher**. Click it to instantly switch between any of the mock users without needing to log in manually.

## Quick Login Users

| User | Role | Description |
|------|------|-------------|
| `admin_alex` | Admin | Full admin access — user management, content moderation, genre management |
| `elena_writes` | Writer | Has 3 stories (published + draft), chapters, AI suggestions, collaborators |
| `boris_writer` | Writer | Has 1 published story (Moonlight Promises) |
| `sara_reader` | Regular | Has reading lists, can browse and comment |
| `marco_author` | Writer | Editor collaborator on Elena's story |

You can also use the Login page and type any username to log in (no password required in mock mode).

## Backend

The app connects to a .NET 9 API at `https://localhost:7125`. Auth (login/register) uses the real backend when available, and falls back to mock data. All other data (stories, chapters, comments, etc.) uses in-memory mock state.

## Features

- Dark mode only UI with glassmorphism design
- Story browsing with search, genre filters, and sort
- Full story reading with chapter navigation and progress bar
- Writer dashboard with analytics (Recharts), story/chapter CRUD
- AI Suggestion panel (grammar, style, plot suggestions)
- Collaborator management with permission levels
- Reading lists (personal + public community lists)
- Notifications system
- Admin panel: user management, content moderation, genre management
- Role-based access control (guest, regular, writer, admin)
