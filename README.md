# GitHub Search

A modern web application for searching and browsing GitHub repositories in real-time, built with [Next.js](https://nextjs.org) and powered by the GitHub REST API.

## Features

- **Real-time repository search** - Search repositories by name, description, or topic
- **Advanced filtering** - Sort by stars, forks, or recent updates
- **Pagination support** - Browse through large result sets seamlessly
- **Repository details** - View key metrics including stars, forks, language, and descriptions
- **Responsive design** - Fully optimized for desktop, tablet, and mobile devices
- **Optimized performance** - Leveraging TanStack React Query for efficient data fetching and caching
- **Quick access** - Press `/` to focus the search bar instantly
- **Error handling** - Graceful handling of API rate limits and errors

## Getting Started

### Prerequisites

- Node.js 16+ or Bun runtime

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `app/` - Next.js App Router with main page, layout, and styles
- `components/` - Reusable React components (SearchBar, Repository, Pagination, SortFilter)
- `hooks/` - Custom React hooks (useGithubRepositories)
- `services/` - GitHub API service layer
- `types/` - TypeScript type definitions

## Techstack
- [Next.js 16](https://nextjs.org) - React framework with App Router
- [React 19](https://react.dev) - UI library
- [TypeScript](https://www.typescriptlang.org) - Type-safe JavaScript
- [TanStack React Query](https://tanstack.com/query) - Data fetching and caching
- [Tailwind CSS 4](https://tailwindcss.com) - Utility-first styling
- [GitHub REST API](https://docs.github.com/en/rest) - Repository data source

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [GitHub API Reference](https://docs.github.com/en/rest)

## Deployment

Deploy on [Vercel](https://vercel.com/new?utm_medium=default-template&utm_source=create-next-app) for the best experience.