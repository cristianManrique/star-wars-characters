# SWAPI Explorer

> **Fan project — not affiliated with Lucasfilm or Disney.**

A Star Wars character browser built with Next.js and GraphQL. Browse, search, create, edit and delete characters from the Star Wars universe. Built as a personal project to explore Next.js App Router, GraphQL with Apollo Client, TypeScript, custom React hooks, and component architecture inspired by real-world patterns.


---
## Screens

<img width="1251" height="863" alt="Screenshot 2026-05-22 163109" src="https://github.com/user-attachments/assets/8c9b2c7e-095b-4c02-96ee-4bded3f1588a" />


<img width="1411" height="867" alt="Screenshot 2026-05-22 163238" src="https://github.com/user-attachments/assets/0dbafb48-6367-4801-8d00-2e058483f618" />



---

## Tech Stack

| Technology                   | Usage                             |
| ---------------------------- | --------------------------------- |
| Next.js 16 (App Router)      | Framework                         |
| React 19                     | UI                                |
| TypeScript 5                 | Strict typing                     |
| Tailwind CSS 4               | Styling + custom SW color palette |
| Apollo Client                | GraphQL client                    |
| SWAPI GraphQL                | Star Wars API (read-only)         |
| graphql-yoga                 | Local GraphQL server (API route)  |
| react-day-picker             | Date picker in character form     |
| Jest + React Testing Library | Unit and component tests          |
| ESLint                       | Code quality                      |

---

## Features

- **Full CRUD** — create, edit and delete characters
- **Modal forms** — overlay with backdrop-blur, closes on Escape
- **Confirm before delete** — dialog prevents accidental deletions
- **Live search** — filter characters by name with 300ms debounce
- **Animated star field** — 250 twinkling stars rendered on Canvas
- **Custom scrollbar** — Star Wars yellow on all browsers
- **Responsive layout** — adaptive grid, stacked action bar on mobile/tablet
- **Route groups** — separate layouts for home and app sections

---

## Pages

```
/               → Landing page — no header, no scroll
/characters     → Character list with full CRUD and search
```

---

## Project Structure

```
app/
  (marketing)/
    page.tsx                        → Landing page
  (app)/
    layout.tsx                      → Shared layout: Header + Footer
    characters/
      page.tsx                      → Character list + search
      components/
        CharacterList.tsx           → Character grid
        CharacterItem.tsx           → Individual card (React.memo)
        CharacterForm.tsx           → Add/edit form (Escape key support)
        CharacterFormModal.tsx      → Modal overlay for create & edit
  _ui/
    Loading.tsx                     → Reusable centered spinner
    Error.tsx                       → Reusable error message
    ConfirmDialog.tsx               → Confirmation dialog before delete
  components/
    StarField.tsx                   → Canvas animation — 250 twinkling stars
    layout/
      Header.tsx                    → Global dark navigation
      Footer.tsx                    → Fan project disclaimer
  hooks/
    useDebounce.ts                  → Generic configurable debounce
    useCharacterSearch.ts           → Name-based character filtering
  api/
    graphql/
      route.ts                      → graphql-yoga server (in-memory CRUD)
  layout.tsx                        → Root layout — fonts, StarField, Providers
  globals.css                       → SW palette, yellow scrollbar, loader
  providers.tsx                     → ApolloProvider wrapper

lib/
  apolloClient.ts                   → Apollo Client instance
  queries.ts                        → GraphQL queries and mutations
  swapi.ts                          → Initial fetch from swapi-graphql.netlify.app

types/
  character.ts                      → Shared Character type

__test__/
  CharacterForm.test.tsx
  CharacterList.test.tsx
  smoke.test.ts
```

---

## GraphQL Strategy

- **GET queries** → real network call to `swapi-graphql.netlify.app` on server startup
- **Mutations (create / update / delete)** → handled in-memory via `graphql-yoga`

> SWAPI is read-only. Mutations demonstrate the full CRUD pattern without server-side persistence — data resets on server restart.

---

## Learning Goals

1. **App Router** — route groups `(marketing)` / `(app)`, nested layouts
2. **GraphQL** — queries, mutations, Apollo cache, MockedProvider in tests
3. **TypeScript** — strict types, `import type`, typed props
4. **Custom hooks** — `useDebounce`, `useCharacterSearch` with `useMemo`
5. **Performance** — `React.memo`, `useCallback`, debounce
6. **Canvas API** — `requestAnimationFrame` animation loop, cleanup on unmount
7. **Jest + RTL** — render, userEvent, MockedProvider

---

## Getting Started

```bash
yarn && yarn start
```

Opens [http://localhost:3000](http://localhost:3000) automatically in your default browser.

## Commands

```bash
yarn start          # Start dev server + open browser
yarn build          # Production build
yarn lint           # Run ESLint
yarn test           # Run tests
yarn test:watch     # Run tests in watch mode
yarn test:coverage  # Run tests with coverage report
```
