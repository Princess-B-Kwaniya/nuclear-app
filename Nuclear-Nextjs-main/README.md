# NuClear - Nuclear Supply Chain Management

Comprehensive nuclear supply chain management platform for radiopharmaceutical delivery.

## Demo Credentials

This application uses simple demo authentication. Use these credentials to log in:

- **Email:** `demo@nuclear.app`
- **Password:** `demo123456`

Click the "Use Demo Credentials" button on the login page to automatically fill in these credentials.

## Development

```bash
# Install dependencies
bun install
# or
npm install --legacy-peer-deps

# Run development server
bun run dev
# or
npm run dev

# Build for production
bun run build
# or
npm run build
```

## Tech Stack

- **Framework**: Next.js 16 (with Turbopack)
- **Authentication**: Simple demo authentication (localStorage)
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Package Manager**: Bun or npm

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── dashboard/         # Dashboard pages
│   └── login/             # Login page
├── components/            # React components
├── contexts/              # React contexts (Auth, etc.)
├── controllers/           # Business logic controllers
├── lib/                   # Utility libraries
├── models/                # TypeScript models/types
├── services/              # External services
└── styles/                # Global styles
```

## Features

- 🔐 Simple demo authentication
- 📦 Shipment tracking and management
- 📊 Compliance monitoring
- 🔍 Full traceability
- 📈 Reporting and analytics
- ⚙️ Settings and configuration

## License

Proprietary - Scale AI for Africa
