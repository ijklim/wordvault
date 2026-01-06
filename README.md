# Word Vault

A modern, responsive dictionary web application that allows users to search for word definitions instantly. Built with React and TypeScript for a fast, type-safe experience.

## Features

- **Instant Word Search**: Search for any word and get definitions from a reliable API
- **Search History**: View previously searched words in an organized accordion layout
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Toast Notifications**: Real-time feedback during searches
- **Error Handling**: Graceful handling of invalid words or network issues

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Bootstrap 5 (via React Bootstrap)
- **State Management**: React Hooks
- **API Integration**: Fetch API for dictionary data
- **Package Manager**: pnpm
- **Linting**: ESLint
- **Deployment**: Ready for static hosting (e.g., GitHub Pages, Vercel)

## Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- pnpm

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

This starts the development server at `http://localhost:5173`.

### Build

```bash
pnpm build
```

### Linting

```bash
pnpm lint
```

## Usage

1. Enter a word in the search box
2. Press Enter or click the search button
3. View definitions in the expanding accordion below
4. Previously searched words remain accessible in the history

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=https://api.ivan-lim.com
```

For different environments, use `.env.dev` for development and `.env.prod` for production.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.
