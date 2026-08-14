# Development Setup Guide

This guide will help you set up the EzPay development environment.

## Prerequisites

- Node.js 18+ (for frontend)
- Rust 1.70+ (for backend and smart contract)
- PostgreSQL 14+ (for database)
- Soroban CLI (for smart contract development)

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:3000`.

## Backend Setup

```bash
cd backend
cargo build
cargo run
```

The backend API will be available at `http://localhost:3001`.

## Smart Contract Setup

```bash
cd smart-contract
cargo build
cargo test
```

## Database Setup

```bash
# Create PostgreSQL database
createdb ezpay

# Run migrations
cd backend
psql $DATABASE_URL -f migrations/001_initial.up.sql
```

## Environment Configuration

Copy the appropriate `.env.example` file for each service:

```bash
# Frontend
cp frontend/.env.example frontend/.env

# Backend
cp backend/.env.example backend/.env
```

## Running the Full Stack

1. Start PostgreSQL
2. Start backend: `cd backend && cargo run`
3. Start frontend: `cd frontend && npm run dev`

## Testing

```bash
# Frontend tests
cd frontend
npm test

# Backend tests
cd backend
cargo test

# Smart contract tests
cd smart-contract
cargo test
```
