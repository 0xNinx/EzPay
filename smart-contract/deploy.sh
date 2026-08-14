#!/bin/bash

# EzPay Smart Contract Deployment Script
# This script deploys the EzPay Soroban contract to the Stellar network

set -e

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Default values
NETWORK=${STELLAR_NETWORK:-testnet}
SECRET_KEY=${SECRET_KEY:-}
RPC_URL=${STELLAR_RPC_URL:-https://soroban-testnet.stellar.org}

echo "Deploying EzPay contract to $NETWORK..."
echo "RPC URL: $RPC_URL"

# Build the contract
echo "Building contract..."
cargo build --target wasm32-unknown-unknown --release

# Optimize the WASM
echo "Optimizing WASM..."
wasm-opt target/wasm32-unknown-unknown/release/ezpay.wasm \
    -O3 \
    --strip-debug \
    -o target/ezpay_optimized.wasm

# Deploy the contract
echo "Deploying contract..."
soroban contract deploy \
    --wasm target/ezpay_optimized.wasm \
    --source $SECRET_KEY \
    --rpc-url $RPC_URL \
    --network-passphrase "$STELLAR_NETWORK_PASSPHRASE"

echo "Contract deployed successfully!"
echo "Please save the contract ID for initialization."
