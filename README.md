# Kapal Lawd Article - Frontend

## 🚀 Features

- **User Authentication** - Login and registration system
- **Article Management** - Create, read, update, and delete articles
- **Rich Text Editor** - Powered by TipTap with markdown support
- **Commenting System** - Interactive comments on articles
- **Like System** - Social engagement features
- **User Profiles** - Personalized user profiles
- **Responsive Design** - Mobile-first design with Tailwind CSS
- **Real-time Updates** - Optimistic updates with React Query

## 🛠 Tech Stack

### Core Technologies

- **React 19** - Frontend framework
- **TypeScript** - Type safety and developer experience
- **Vite** - Build tool and development server
- **React Router** - Client-side routing
- **TailwindCSS** - Utility-first CSS framework

### State Management & Data Fetching

- **TanStack React Query** - Server state management and caching
- **Zustand** - Client-side state management
- **React Hook Form** - Form state management
- **Zod** - Schema validation

### UI Components & Styling

- **Radix UI** - Accessible component primitives
- **shadcn/ui** - Re-usable component library
- **Lucide React** - Icon library
- **TipTap** - Rich text editor
- **Sonner** - Toast notifications

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript ESLint** - TypeScript-specific linting rules

## Architecture

This project follows **Clean Architecture** principles with clear separation of concerns:

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components (shadcn/ui)
│   ├── common/          # Shared business components
│   └── layouts/         # Layout components
├── features/            # Feature-based modules
│   ├── Auth/           # Authentication features
│   ├── ArticleCreate/  # Article creation
│   ├── ArticleDetail/  # Article viewing
│   ├── Homepage/       # Main dashboard
│   └── Profile/        # User profiles
├── domains/            # Domain entities and types
├── useCases/           # Business logic and use cases
├── services/           # External API communication
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries
├── constants/          # Application constants
└── types/              # Global type definitions
```

### Architecture Layers

1. **Presentation Layer** (`components/`, `features/`)
   - React components and UI logic
   - Feature-specific components and pages
   - Layout and routing components

2. **Application Layer** (`useCases/`, `hooks/`)
   - Business logic and use cases
   - Custom hooks for state management
   - Application-specific logic

3. **Domain Layer** (`domains/`)
   - Core business entities
   - Domain models and interfaces
   - Business rules and constraints

4. **Infrastructure Layer** (`services/`, `lib/`)
   - External API communication
   - HTTP client configuration
   - Utility functions and helpers

## Installation

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm

### Setup Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd data-cakra/fe
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Environment Configuration**

   ```bash
   cp .env.example .env.local
   ```

   Configure your environment variables in `.env.local`

4. **Start development server**

   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
