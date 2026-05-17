# Quick Start Guide

## Prerequisites

Ensure you have Node.js >= 22.0.0 installed:

```bash
node --version
```

If you have nvm installed, you can use:

```bash
nvm use
```

## Installation

```bash
npm install
```

## Generate API Client Code

Before running the application, generate the API client code from the Swagger specification:

```bash
npm run swagger
```

This will create type-safe API client code in `src/apis/auto/demo/`.

## Development

Start the development server:

```bash
npm run dev
```

The application will be available at: **http://localhost:9528/react/**

## Features

The application includes a complete User Management system with:

- ✅ **User List** - View all users with pagination
- ✅ **Search & Filter** - Search by code, name, and status
- ✅ **Create User** - Add new users with form validation
- ✅ **Edit User** - Update existing user information
- ✅ **Delete User** - Remove users with confirmation
- ✅ **View Details** - View user information in read-only mode
- ✅ **Avatar Upload** - Upload and display user avatars
- ✅ **Status Management** - Enable/disable users

## Project Structure

```
src/
├── apis/auto/demo/          # Auto-generated API client code
│   ├── ApiUser.ts           # User API methods
│   ├── ApiFile.ts           # File upload API methods
│   ├── base.ts              # Base API configuration
│   ├── model.ts             # TypeScript type definitions
│   └── httpClient/          # HTTP client implementation
├── components/              # Reusable components
│   ├── CommonQuery/         # Search/filter component
│   ├── CommonTable/         # Data table component
│   └── CommonForm/          # Form component
├── views/user/              # User management page
├── types/                   # TypeScript type definitions
├── utils/                   # Utility functions
├── App.tsx                  # Root component
└── main.tsx                 # Application entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run type-check` - Run TypeScript type checking
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run swagger` - Generate API client code

## API Configuration

The application connects to the demo API server. Configuration is in `.apisorceryrc.json`:

- **API Source**: https://apisorcery.com/demo-api/swagger-json
- **Base URL**: /demo-api (proxied in development)
- **Output Directory**: ./src/apis/auto

## Environment Variables

Configuration is in `.env`:

```env
VITE_PORT = 9528                    # Development server port
VITE_GLOB_PUBLIC_PATH = /react/     # Application base path
VITE_GLOB_BASE_API = /demo-api      # API base path
```

## Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Troubleshooting

### Port Already in Use

If port 9528 is already in use, you can change it in `.env`:

```env
VITE_PORT = 9529
```

### API Connection Issues

1. Ensure the backend service is running
2. Check the proxy configuration in `vite.config.ts`
3. Verify `VITE_GLOB_BASE_API` in `.env`

### Type Errors

Run type checking to identify issues:

```bash
npm run type-check
```

## Next Steps

1. Explore the code in `src/views/user/index.tsx`
2. Check the API client code in `src/apis/auto/demo/`
3. Customize components in `src/components/`
4. Add new features following the existing patterns

## Support

For issues or questions, refer to:
- Project README: `README.md`
- API Integration Guide: `../.kiro/steering/api-integration.md`
- Development Workflow: `../.kiro/steering/development-workflow.md`
