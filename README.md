# Photobook

A React single-page app to configure and place a personalized photo book order.

## Quick Start

### Requirements

- Bun

### Install dependencies

```bash
bun install
```

### Run in development

```bash
bun run dev
```

Open the local URL shown in the terminal (usually `http://localhost:5173`).

### Build for production

```bash
bun run build
```

### Preview production build

```bash
bun run preview
```

### Lint and format

```bash
bun run lint
bun run lint:fix
bun run format
bun run format:check
```

## Architecture

### Stack

- React 19 + TypeScript
- Vite 8 for dev server and bundling
- Tailwind CSS v4 + shadcn/ui components (Radix primitives)
- ESLint + Prettier for code quality and formatting

### Libraries

- **Zustand** (`src/stores/order-store.ts`): manages global order state (`shipping`, `book`, `orderConfirmed`) and exposes actions used across routes and components.
- **TanStack Router** (`src/routes/*`, `src/routeTree.gen.ts`): handles file-based routing, nested layouts, route guards, and step navigation through search params.
- **TanStack Form** (`src/components/ShippingForm.tsx`): powers the shipping form state, validation, and submission flow with typed form handling.
- **shadcn/ui** (`src/components/ui/*`): provides reusable UI primitives (buttons, cards, inputs, dialogs, drawers, etc.) composed into feature-level components.

### Application flow

The app guides users through a multi-step order flow:

1. Home page (`/`)
2. Product configuration (`/configure`)
3. Shipping details (`/shipping`)
4. Confirmation (`/confirmed`)

The order flow UI is rendered inside the shared order layout route (`/_order`), which also shows an order summary sidebar (desktop) or drawer (mobile).

### Routing model

- File-based routes live in `src/routes`.
- TanStack Router generates `src/routeTree.gen.ts` from route files.
- Root route in `src/routes/__root.tsx` mounts:
  - global theme initialization script
  - shared `Header` and `Footer`
  - route outlet
  - TanStack Router Devtools

### State management

Global order state is centralized in `src/stores/order-store.ts` with Zustand.

State domains:

- `shipping`: recipient and address data
- `book`: format, dimensions, pages, and extras
- `orderConfirmed`: final completion flag

Validation helpers in `src/stores/order-validation.ts` drive route guards and CTA enablement (for example, checking whether shipping is complete before continuing).

### UI composition

- `src/components/steps/*`: step-by-step configurator UI
- `src/components/order-summary/*`: live order recap in desktop/mobile containers
- `src/components/form/*`: reusable form controls wrapping UI primitives
- `src/components/ui/*`: shadcn/ui component primitives

### Data and domain constants

`src/lib/dataset.ts` provides static configuration data (formats, options, countries, and related display metadata) consumed by steps and summary views.

### Styling and theming

- Global styles are in `src/index.css`.
- Tailwind utilities are used across route and component files.
- Theme mode (`light`, `dark`, `auto`) is initialized in the root route before content renders to avoid visual flicker.

### Project structure

```text
src/
  components/
    form/
    order-summary/
    steps/
    ui/
  hooks/
  lib/
  routes/
  stores/
  main.tsx
  router.tsx
  routeTree.gen.ts
  index.css
```

