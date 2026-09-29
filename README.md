# TegaRide

**Move Rwanda. Move Easy.** Ride-hailing platform for Kigali, Rwanda (MVP in development).

## Quick start (VS Code)

1. Unzip, then in VS Code: **File > Open Folder...** and choose the `tegaride` folder.
2. Accept the "Install recommended extensions" prompt (optional but helpful).
3. Open the terminal: **Terminal > New Terminal**, then run:

```bash
npm install
npm run dev
```

4. Open http://localhost:5173 - you should see a green "Service connected" dot.

A `.env` file is already included with development-only values. Never commit it or use those values in production.

## Useful commands

| Command | What it does |
|---|---|
| `npm run dev` | Start API (:4000) and web (:5173) together |
| `npm run typecheck` | TypeScript check in every workspace |
| `npm test` | Run all tests |
| `npm run db:up` / `db:down` | Start / stop PostgreSQL in Docker (needed from Step 3) |

> Status: scaffolding complete (Step 2).
