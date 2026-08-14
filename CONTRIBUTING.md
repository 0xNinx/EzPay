# Contributing to EzPay

Thank you for your interest in contributing to **EzPay**.

EzPay is a Stellar-based payment infrastructure focused on simple, fast, and accessible stablecoin payments.

Before contributing, please read the [README.md](README.md) for an overview of the project.

---

# Ways to Contribute

You can contribute by:

- Fixing bugs
- Improving documentation
- Adding new features
- Improving payment flows
- Writing tests
- Improving developer experience
- Enhancing Stellar integrations

For major changes, please open an issue first to discuss your idea.

---

# Development Setup

## Clone the Repository

```bash
git clone https://github.com/your-username/ezpay.git
cd ezpay
```

---

## Configure Environment Variables

Copy the environment template:

```bash
cp .env.example .env
```

Example:

```env
PORT=3001
RUST_LOG=info
STELLAR_NETWORK=testnet
STELLAR_RPC_URL=
STELLAR_SECRET_KEY=
DATABASE_URL=
ANCHOR_API_KEY=
```

---

## Install Dependencies

```bash
cargo build
```

---

## Run the Development Server

```bash
cargo run
```

---

# Project Structure

```text
ezpay/
├── frontend/           # Next.js frontend application
│   ├── app/           # Next.js app directory
│   ├── components/    # React components
│   ├── lib/           # Utilities and API clients
│   └── package.json
│
├── backend/            # Rust backend API
│   ├── src/
│   │   ├── config/    # Configuration
│   │   ├── models/    # Database models
│   │   ├── routes/    # API routes
│   │   ├── middleware/ # Middleware
│   │   └── main.rs
│   ├── migrations/    # Database migrations
│   └── Cargo.toml
│
├── smart-contract/     # Soroban smart contract
│   ├── src/
│   │   ├── admin/     # Admin functions
│   │   ├── merchant/  # Merchant functions
│   │   ├── payment/   # Payment functions
│   │   └── lib.rs
│   └── Cargo.toml
│
├── .env.example
├── README.md
├── CONTRIBUTING.md
└── LICENSE
```

---

# Branching Strategy

Use descriptive branch names.

Examples:

```text
feature/qr-payments
feature/anchor-integration
fix/payment-validation
docs/readme-update
```

Avoid committing directly to `main`.

---

# Commit Message Guidelines

Use clear commit messages.

Examples:

```text
feat: add QR payment flow
fix: resolve Stellar transaction validation issue
docs: update setup instructions
test: add payment service tests
```

---

# Pull Request Process

When submitting a PR:

1. Create a feature branch
2. Implement your changes
3. Test your implementation
4. Commit your changes
5. Push to your fork
6. Open a Pull Request

Please include:
- A clear description
- Testing steps
- Related issue (if applicable)

---

# Code Guidelines

- Use Rust for backend development
- Write modular and reusable code
- Keep functions small and readable
- Use descriptive naming
- Validate payment-related inputs carefully

---

# Testing

When adding features:
- Include tests where possible
- Validate payment flows
- Handle transaction errors properly

Critical areas include:
- Stellar transaction handling
- Payment validation
- Merchant payout flows
- Anchor integrations

---

# Reporting Bugs

When reporting bugs, include:

- Clear description
- Steps to reproduce
- Logs or screenshots (if available)

Example:

```text
Issue:
Invalid wallet addresses return internal server errors.

Steps:
1. Enter invalid Stellar address
2. Submit payment
3. API returns 500 error
```

---

# Suggesting Features

Feature suggestions are welcome.

Please include:
- The problem
- Proposed solution
- Possible implementation ideas

---

# Community Guidelines

Please be respectful and constructive when interacting with contributors.

EzPay aims to build open financial infrastructure that is accessible and easy to use globally.

---

# License

By contributing to EzPay, you agree that your contributions will be licensed under the MIT License.