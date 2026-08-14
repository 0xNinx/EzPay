# EzPay Architecture Overview

## System Architecture

EzPay is a three-tier payment infrastructure consisting of:

1. **Frontend** - Next.js web application
2. **Backend** - Rust REST API
3. **Smart Contract** - Soroban contract on Stellar

## Component Diagram

```
┌─────────────────┐
│   Frontend      │
│   (Next.js)     │
└────────┬────────┘
         │ HTTP/REST
         ↓
┌─────────────────┐
│   Backend API   │
│   (Rust/Axum)   │
└────────┬────────┘
         │
    ┌────┴────┐
    ↓         ↓
┌──────┐  ┌──────────┐
│  DB  │  │ Stellar  │
│PostgreSQL│ Network │
└──────┘  └──────────┘
```

## Frontend Architecture

### Tech Stack
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Zustand (state management)
- React Query (data fetching)
- Stellar SDK

### Key Components
- Wallet integration (Freighter, Albedo, Lobstr, Rabet)
- Merchant dashboard
- Payment history
- QR code generation
- Payment link generation

## Backend Architecture

### Tech Stack
- Rust
- Axum (web framework)
- SQLx (database)
- PostgreSQL
- Stellar SDK

### Modules
- **config** - Environment configuration
- **models** - Database models (Merchant, Payment)
- **routes** - API endpoints (merchants, payments, health)
- **middleware** - Auth, rate limiting, error handling
- **db** - Database connection pool

### API Endpoints
- `/api/health` - Health check
- `/api/merchants/*` - Merchant CRUD operations
- `/api/payments/*` - Payment operations
- `/api/payment-requests/*` - Payment request management

## Smart Contract Architecture

### Tech Stack
- Rust
- Soroban SDK
- Stellar Network

### Modules
- **admin** - Contract initialization, admin controls
- **merchant** - Merchant registration and management
- **payment** - Payment request creation and processing
- **storage** - Contract storage
- **types** - Data structures
- **errors** - Error types

### Key Functions
- `initialize` - Contract setup
- `register_merchant` - Register merchant
- `create_payment_request` - Create payment request
- `pay` - Process payment
- `cancel_payment_request` - Cancel request

## Data Flow

### Payment Flow (Registered Merchant)
1. Customer initiates payment via frontend
2. Frontend calls backend API
3. Backend validates and creates payment request
4. Customer signs transaction with wallet
5. Transaction submitted to Stellar network
6. Smart contract processes payment
7. Backend updates database
8. Frontend displays confirmation

### Payment Flow (Unregistered Merchant)
1. Customer enters merchant bank details
2. Backend routes through Anchor infrastructure
3. Payment settles on Stellar
4. Fiat payout processed to merchant bank

## Security Considerations

- JWT-based authentication (to be implemented)
- Rate limiting (to be implemented)
- Input validation
- Stellar transaction validation
- Secure wallet handling
- Database encryption for sensitive data

## Scalability Considerations

- Connection pooling for database
- Async I/O with Tokio
- Stateless API design
- Smart contract for on-chain logic
- Caching layer (to be added)
