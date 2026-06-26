# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start dev server (Vite, default port 5173)
npm run build     # type-check + production bundle (tsc -b && vite build)
npm run preview   # serve the production build locally
npm run lint      # run oxlint
```

No test suite is configured.

## Committing and pushing changes

After every meaningful change, commit and push to GitHub so each commit can serve as a rollback point:

```bash
git add <specific files>   # stage only the files changed — never git add -A blindly
git commit -m "<type>: <short description>

<optional body explaining why, not what>"
git push origin main
```

Commit message types: `feat` (new feature), `fix` (bug fix), `refactor`, `style`, `chore`.

Write messages that describe **why** the change was made, not just what changed. Good: `fix: prevent negative amount submissions in TransactionForm`. Bad: `updated form`.

Keep commits small and focused — one logical change per commit. This makes individual commits useful as rollback targets via `git revert <hash>` or `git checkout <hash>`.

## Architecture

Single-page React app with no backend. All data persists in `localStorage` under the key `finance-tracker-transactions`.

**Data flow:** `TransactionContext` (useReducer) is the sole state store. Components read and dispatch through the `useTransactions()` hook. On mount the context loads from localStorage; on every state change it writes back.

**Key types** (`src/types/index.ts`):
- `Transaction` — id, type (`'income'|'expense'`), amount (always positive), category, description, date (ISO string), createdAt (timestamp for sort order)
- `Category` — exported as both a `const` object (runtime values) and a type (string literal union). Always import the type with `import type { Category }` unless you need the runtime object (e.g. to access `Category.Food`).
- `Action` — discriminated union for the reducer

**Utilities** (`src/utils/`):
- `calculations.ts` — pure functions: `getTotalIncome`, `getTotalExpenses`, `getBalance`, `getCategoryBreakdown` (returns `ChartDatum[]` for the chart)
- `constants.ts` — `STORAGE_KEY`, category lists split by type, `CATEGORY_COLORS` / `CATEGORY_LABELS` records, `formatCurrency` (USD `Intl.NumberFormat`)

## TypeScript config notes

`tsconfig.app.json` enables two strict flags that affect imports:
- `verbatimModuleSyntax: true` — types must use `import type`
- `erasableSyntaxOnly: true` — TypeScript `enum` is banned; use `const` objects + type unions instead (see `Category` in `src/types/index.ts`)

## Styling

Tailwind CSS v4 via `@tailwindcss/vite` plugin. No `tailwind.config.js` — configuration is CSS-based. `src/index.css` contains only `@import "tailwindcss"`. Dynamic colors (e.g. category badge backgrounds) must use inline styles because Tailwind v4 JIT cannot resolve runtime class names.
