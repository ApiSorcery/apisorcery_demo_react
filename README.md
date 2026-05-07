# ApiSorcery - React Example

This is a React + TypeScript + Vite example application that demonstrates API integration using AutoAPI.

## Features

- ✅ User Management (CRUD operations)
- ✅ Search and Filter
- ✅ Pagination
- ✅ Form Validation
- ✅ Image Upload
- ✅ Status Management
- ✅ Type-safe API calls with AutoAPI

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Ant Design** - UI component library
- **Axios** - HTTP client
- **Day.js** - Date formatting
- **AutoAPI** - API code generation

## Prerequisites

- Node.js >= 22.0.0
- npm >= 10.0.0

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Generate API Client Code

```bash
npm run swagger
```

This will generate TypeScript API client code from the OpenAPI specification.

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at: http://localhost:9528/react/

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run type-check` - Run TypeScript type checking
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run swagger` - Generate API client code

## Project Structure

```
autoapi-example-react/
├── src/
│   ├── apis/
│   │   └── auto/          # Auto-generated API code
│   ├── components/
│   │   ├── CommonQuery/   # Search/filter component
│   │   ├── CommonTable/   # Data table component
│   │   └── CommonForm/    # Form component
│   ├── views/
│   │   └── user/          # User management page
│   ├── types/
│   │   └── common.ts      # TypeScript type definitions
│   ├── utils/
│   │   └── dayjs.ts       # Date utility
│   ├── App.tsx            # Root component
│   ├── main.tsx           # Application entry
│   └── index.scss         # Global styles
├── .autoapirc.json        # AutoAPI configuration
├── .env                   # Environment variables
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Project dependencies
```

## API Configuration

The application uses AutoAPI to generate type-safe API client code. Configuration is in `.autoapirc.json`:

```json
{
  "application": {
    "language": "ts",
    "outputDir": "./src/apis/auto"
  },
  "servers": [
    {
      "code": "demo",
      "token": "72735b33815c4e5c9c2a924a8f4907ef",
      "version": 3,
      "enabled": true,
      "source": "https://apisorcery.com/demo-api/swagger-json"
    }
  ]
}
```

## Environment Variables

- `VITE_PORT` - Development server port (default: 9528)
- `VITE_GLOB_PUBLIC_PATH` - Application base path (default: /react/)
- `VITE_GLOB_BASE_API` - API base path (default: /demo-api)

## Development

### Adding New Features

1. Generate/update API client code: `npm run swagger`
2. Create components in `src/components/`
3. Create views in `src/views/`
4. Update types in `src/types/`

### Code Style

- Follow TypeScript best practices
- Use functional components with hooks
- Use Ant Design components
- Format code with Prettier before committing

## Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## License

MIT
