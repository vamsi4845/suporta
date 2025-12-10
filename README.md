# Suporta

AI support that works for your team & customers.

Drop your knowledge base, install the widget, and start taking conversations in minutes.

## Features

### Core Workflow

1. **Drop your knowledge** - Upload your documents and knowledge base. The AI instantly learns from your content to answer questions accurately.

2. **Setup your agent** - Install the widget with a single line of code. Customize your AI agent's behavior and appearance to match your brand.

3. **Start conversations** - Your AI support agent is live. Start taking conversations, manage your inbox, and watch it resolve issues automatically.

### Platform Features

- **Smart. Simple. Brilliant.** - Your knowledge base is intelligently organized so the AI can find answers instantly without the clutter.

- **Real-time conversation management** - Every conversation flows seamlessly between AI and human agents, keeping your team aligned and customers happy.

- **Effortless integration** - Add a single line of code to your website and your AI support agent is live. No complex setup required.

- **Conversation analytics** - Track resolution rates, escalation patterns, and customer satisfaction with detailed conversation insights.

## Tech Stack

This is a Next.js monorepo built with Turborepo and pnpm workspaces:

### Frontend
- **Framework**: Next.js 15 (App Router) with React 19
- **UI Components**: shadcn/ui + Radix UI
- **Styling**: Tailwind CSS
- **TypeScript**: Full type safety

### Backend
- **Database & Backend**: Convex (real-time database and serverless functions)
- **AI/LLM**: Vercel AI SDK + Convex Agent + RAG (Retrieval Augmented Generation) with OpenAI
- **Authentication**: Clerk (multi-organization support)

### Infrastructure & Tools
- **Monorepo**: Turborepo
- **Package Manager**: pnpm
- **Build Tool**: Vite (for embed script builder)
- **Error Tracking**: Sentry
- **Analytics**: Vercel Analytics
- **Form Handling**: React Hook Form + Zod validation

## Prerequisites

- Node.js >= 20
- pnpm >= 10.4.1
- Convex account and project
- Clerk account and application
- OpenAI API key

## Installation

```bash
pnpm install
```

## Environment Setup

### Web App (`apps/web`)

Create a `.env.local` file with:

```env
NEXT_PUBLIC_CONVEX_URL=your_convex_url
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

### Widget App (`apps/widget`)

Create a `.env.local` file with:

```env
NEXT_PUBLIC_CONVEX_URL=your_convex_url
```

### Backend (`packages/backend`)

Configure Convex environment variables:

```env
CLERK_JWT_ISSUER_DOMAIN=your_clerk_jwt_issuer_domain
OPENAI_API_KEY=your_openai_api_key
```

## Development

Start all apps in development mode:

```bash
pnpm dev
```

This will start:
- Web app on `http://localhost:3000`
- Widget app on `http://localhost:3001`
- Embed builder on `http://localhost:3002`

### Running Individual Apps

```bash
# Web app only
cd apps/web && pnpm dev

# Widget app only
cd apps/widget && pnpm dev

# Backend (Convex) only
cd packages/backend && pnpm dev
```

## Building

Build all apps:

```bash
pnpm build
```

## Adding Components

To add shadcn/ui components to your app, run the following command at the root of your `web` app:

```bash
pnpm dlx shadcn@latest add button -c apps/web
```

This will place the UI components in the `packages/ui/src/components` directory.

## Using Components

To use components in your app, import them from the `ui` package:

```tsx
import { Button } from "@workspace/ui/components/button"
```

## Project Structure

```
├── apps/
│   ├── web/              # Main Next.js dashboard application
│   ├── widget/           # Widget app for embedding on customer sites
│   └── embed/            # Embed script builder (Vite)
├── packages/
│   ├── backend/          # Convex backend (database, functions, AI)
│   ├── ui/               # Shared UI components (shadcn/ui)
│   ├── eslint-config/    # Shared ESLint configuration
│   └── typescript-config/# Shared TypeScript configuration
```

### Key Directories

- `apps/web/app/` - Next.js App Router pages and layouts
- `apps/web/modules/` - Feature modules (auth, dashboard, inbox, etc.)
- `packages/backend/convex/` - Convex functions and schema
- `packages/ui/src/components/` - Reusable UI components

## Architecture

- **Monorepo**: Managed with Turborepo for efficient builds and caching
- **Real-time**: Convex provides real-time subscriptions for conversations and data
- **AI Integration**: Uses Convex Agent with RAG for intelligent responses from knowledge base
- **Multi-tenancy**: Clerk organizations for team management
- **Widget System**: Embeddable widget that can be customized per organization

## Links

- [Live Site](https://suporta.vamsi.app/)
- [Demo Video](https://dar5y10gv8dj8.cloudfront.net/suporta/Suporta-Final-Demo.mp4)
