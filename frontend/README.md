# EzPay Frontend

Next.js web application for the EzPay payment infrastructure.

## Tech Stack

- **Next.js 16** - App Router with React 19
- **TypeScript** - Strict mode for type safety
- **Tailwind CSS** - Custom black & yellow color scheme
- **Zustand** - Global state management
- **React Query** - Server state and data fetching
- **Stellar SDK** - Blockchain wallet integration

## Project Structure

```
frontend/
├── app/
│   ├── layout.tsx                 # Root layout with navigation
│   ├── page.tsx                   # Landing page
│   ├── register/                  # Registration page
│   ├── success/                   # Success confirmation
│   ├── dashboard/                 # Merchant dashboard
│   ├── transactions/              # Payment history
│   └── globals.css               # Global styles
├── components/
│   ├── landing/                   # Landing page components
│   ├── register/                  # Registration components
│   ├── dashboard/                 # Dashboard components
│   ├── Navigation.tsx             # Site navigation
│   └── ui/                        # Reusable UI components
├── lib/
│   ├── config.ts                  # Environment configuration
│   ├── api/                       # API client structure
│   ├── stellar.ts                 # Stellar SDK helpers
│   ├── walletStore.ts             # Wallet state management
│   └── utils.ts                   # Utility functions
├── jest.config.js                 # Jest configuration
├── jest.setup.js                  # Jest setup with mocks
├── Dockerfile
├── .env.example
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+

### Setup

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.example .env
```

3. Configure `.env`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_STELLAR_NETWORK=testnet
NEXT_PUBLIC_STELLAR_HORIZON_URL=https://horizon-testnet.stellar.org
```

4. Run development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm test             # Run Jest tests
```

## Pages

- **/** - Landing page with hero, features, and how it works
- **/register** - Merchant registration with wallet connection
- **/success** - Registration success confirmation
- **/dashboard** - Merchant dashboard with stats and transactions
- **/transactions** - Payment history with filtering

## Features

- **Stellar Wallet Integration** - Connect to Freighter, Albedo, Lobstr, Rabet
- **Merchant Dashboard** - View stats, recent transactions, and profile
- **Payment History** - Track all payments with status and filtering
- **QR Code Generation** - Generate QR codes for payments
- **Payment Links** - Create shareable payment links
- **Responsive Design** - Mobile-first approach

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | http://localhost:3001 |
| `NEXT_PUBLIC_STELLAR_NETWORK` | Stellar network | testnet |
| `NEXT_PUBLIC_STELLAR_HORIZON_URL` | Horizon API URL | https://horizon-testnet.stellar.org |

## Docker

Build and run with Docker:
```bash
docker build -t ezpay-frontend .
docker run -p 3000:3000 --env-file .env ezpay-frontend
```

## Architecture

For detailed architecture information, see [ARCHITECTURE.md](../ARCHITECTURE.md).

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for contribution guidelines.

