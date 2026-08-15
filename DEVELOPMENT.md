# Development Setup Guide

This guide provides detailed development workflows and troubleshooting. For basic setup, see [CONTRIBUTING.md](CONTRIBUTING.md). For architecture details, see [ARCHITECTURE.md](ARCHITECTURE.md).

## Detailed Setup Instructions

### Frontend Development

```bash
cd frontend
npm install
npm run dev
```

**Available scripts:**
- `npm run dev` - Start development server (port 3000)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm test` - Run Jest tests
- `npm run lint` - Run ESLint

**Troubleshooting:**
- If port 3000 is in use, set `PORT=3002 npm run dev`
- For module resolution issues, check `tsconfig.json` paths configuration
- Clear Next.js cache: `rm -rf .next`

### Backend Development

```bash
cd backend
cargo build
cargo run
```

**Available commands:**
- `cargo run` - Start development server (port 3001)
- `cargo build` - Build the project
- `cargo test` - Run tests
- `cargo clippy` - Run linter
- `cargo fmt` - Format code

**Troubleshooting:**
- If PostgreSQL connection fails, check `DATABASE_URL` in `.env`
- For compilation errors, ensure Rust 1.70+ is installed
- Clear Cargo cache: `cargo clean`

### Smart Contract Development

```bash
cd smart-contract
cargo build --target wasm32-unknown-unknown --release
cargo test
```

**Available commands:**
- `cargo test` - Run unit tests
- `cargo build` - Build contract
- `./deploy.sh` - Deploy to network (requires .env setup)

**Troubleshooting:**
- Ensure WASM target is installed: `rustup target add wasm32-unknown-unknown`
- For deployment errors, check Stellar network credentials in `.env`

## Docker Development

Use Docker Compose for local development:

```bash
docker-compose up
```

This starts:
- PostgreSQL (port 5432)
- Backend API (port 3001)
- Frontend (port 3000)

**Troubleshooting:**
- If containers fail to start, check port conflicts
- Rebuild containers: `docker-compose build`
- View logs: `docker-compose logs -f`

## Database Management

### Running Migrations

```bash
cd backend
psql $DATABASE_URL -f migrations/001_initial.up.sql
```

### Resetting Database

```bash
dropdb ezpay
createdb ezpay
psql $DATABASE_URL -f migrations/001_initial.up.sql
```

### Common Issues

- **Connection refused**: Ensure PostgreSQL is running
- **Permission denied**: Check database user permissions
- **Migration fails**: Verify SQL syntax and table dependencies

## Testing Workflows

### Frontend Testing

```bash
cd frontend
npm test
```

Run with coverage:
```bash
npm test -- --coverage
```

### Backend Testing

```bash
cd backend
cargo test
```

Run specific test:
```bash
cargo test test_name
```

### Smart Contract Testing

```bash
cd smart-contract
cargo test
```

## Debugging

### Frontend Debugging

- Use browser DevTools for React component debugging
- Check Network tab for API calls
- Use React DevTools extension for state inspection

### Backend Debugging

- Set `RUST_LOG=debug` environment variable for verbose logging
- Use `cargo run` with debugger (VS Code, IntelliJ)
- Check logs in terminal for error traces

### Smart Contract Debugging

- Use Soroban CLI for contract inspection
- Check Stellar Explorer for transaction history
- Review contract events for state changes

## Common Development Issues

### Port Conflicts

If ports are in use:
```bash
# Frontend
PORT=3002 npm run dev

# Backend
PORT=3002 cargo run
```

### Environment Variables

Ensure all required env vars are set:
```bash
# Frontend
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_STELLAR_NETWORK=testnet

# Backend
DATABASE_URL=postgresql://postgres:password@localhost:5432/ezpay
STELLAR_NETWORK=testnet
```

### Dependency Issues

**Frontend:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Backend:**
```bash
cargo clean
cargo build
```

## Performance Tips

### Frontend
- Use React Query caching to reduce API calls
- Implement code splitting for large components
- Optimize images before uploading

### Backend
- Use connection pooling for database
- Implement caching for frequently accessed data
- Use async I/O for concurrent operations
