# Suporta

AI support that works for your team & customers.

Drop your knowledge base, install the widget, and start taking conversations in minutes.

## Live Demo

- **Website**: [https://suporta.vamsi.app/](https://suporta.vamsi.app/)
- **Demo Video**: [Watch Demo](https://dar5y10gv8dj8.cloudfront.net/suporta/Suporta-Final-Demo.mp4)

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

This is a Next.js monorepo built with:

- **Framework**: Next.js (App Router)
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **TypeScript**: Full type safety

## Installation

```bash
pnpm install
```

## Development

```bash
pnpm dev
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

- `apps/web` - Main Next.js application
- `packages/ui` - Shared UI components (shadcn/ui)

## Links

- [Live Site](https://suporta.vamsi.app/)
- [Demo Video](https://dar5y10gv8dj8.cloudfront.net/suporta/Suporta-Final-Demo.mp4)
