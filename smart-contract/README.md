# EzPay Smart Contract

This is the Soroban smart contract for the EzPay payment infrastructure on the Stellar network.

## Overview

The EzPay contract manages:
- Merchant registration and management
- Payment request creation and processing
- Admin controls and fee configuration

## Building

```bash
cargo build --target wasm32-unknown-unknown --release
```

## Testing

```bash
cargo test
```

## Deployment

1. Set up your environment variables in `.env`:
```env
STELLAR_NETWORK=testnet
STELLAR_RPC_URL=https://soroban-testnet.stellar.org
STELLAR_NETWORK_PASSPHRASE="Test SDF Network ; September 2015"
SECRET_KEY=your_secret_key
```

2. Deploy the contract:
```bash
chmod +x deploy.sh
./deploy.sh
```

3. Initialize the contract after deployment:
```bash
soroban contract invoke \
    --id <CONTRACT_ID> \
    --source <ADMIN_KEY> \
    --rpc-url $STELLAR_RPC_URL \
    --network-passphrase "$STELLAR_NETWORK_PASSPHRASE" \
    initialize \
    --admin <ADMIN_ADDRESS> \
    --fee_recipient <FEE_RECIPIENT_ADDRESS> \
    --fee_bpm 100
```

## Usage Examples

### Register a Merchant

```bash
soroban contract invoke \
    --id <CONTRACT_ID> \
    --source <MERCHANT_KEY> \
    --rpc-url $STELLAR_RPC_URL \
    --network-passphrase "$STELLAR_NETWORK_PASSPHRASE" \
    register_merchant \
    --merchant <MERCHANT_ADDRESS> \
    --name "My Business" \
    --wallet_address <WALLET_ADDRESS> \
    --payout_method wallet
```

### Create a Payment Request

```bash
soroban contract invoke \
    --id <CONTRACT_ID> \
    --source <MERCHANT_KEY> \
    --rpc-url $STELLAR_RPC_URL \
    --network-passphrase "$STELLAR_NETWORK_PASSPHRASE" \
    create_payment_request \
    --merchant <MERCHANT_ADDRESS> \
    --token <TOKEN_ADDRESS> \
    --amount 10000000 \
    --memo "Payment for services"
```

### Process a Payment

```bash
soroban contract invoke \
    --id <CONTRACT_ID> \
    --source <PAYER_KEY> \
    --rpc-url $STELLAR_RPC_URL \
    --network-passphrase "$STELLAR_NETWORK_PASSPHRASE" \
    pay \
    --payer <PAYER_ADDRESS> \
    --request_id <REQUEST_ID> \
    --token <TOKEN_ADDRESS> \
    --amount 10000000
```

## Contract Functions

### Admin Functions
- `initialize(admin, fee_recipient, fee_bpm)` - Initialize the contract
- `set_admin(new_admin)` - Set a new admin
- `set_fee(fee_recipient, fee_bpm)` - Update fee configuration
- `pause()` - Pause contract operations
- `unpause()` - Resume contract operations

### Merchant Functions
- `register_merchant(merchant, name, wallet_address, payout_method)` - Register a merchant
- `update_merchant(merchant, name, wallet_address, payout_method)` - Update merchant details
- `deactivate_merchant(merchant)` - Deactivate a merchant
- `get_merchant(merchant)` - Get merchant information
- `is_merchant_active(merchant)` - Check if merchant is active

### Payment Functions
- `create_payment_request(merchant, token, amount, memo)` - Create a payment request
- `pay(payer, request_id, token, amount)` - Process a payment
- `cancel_payment_request(merchant, request_id)` - Cancel a payment request
- `get_payment_request(request_id)` - Get payment request details

## Testing

The contract includes comprehensive unit tests for:
- Merchant registration and management
- Payment request creation and processing
- Admin controls and initialization

Run tests with:
```bash
cargo test
```
