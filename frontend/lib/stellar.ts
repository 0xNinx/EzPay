/**
 * Stellar Wallet Integration Helpers
 * This module provides utilities for connecting to Stellar wallets
 * using the Stellar SDK
 */

import * as StellarSdk from 'stellar-sdk';

export const STELLAR_CONFIG = {
  network: 'TESTNET' as const,
  serverUrl: 'https://horizon-testnet.stellar.org',
  networkPassphrase: 'Test SDF Network ; September 2015',
};

/**
 * Simulates wallet connection
 * In production, this would use @stellar/stellar-wallet-sdk
 */
export async function connectWallet(): Promise<string> {
  console.log('Initiating wallet connection...');
  
  // Simulate wallet connection with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate a mock public key for demonstration
      const mockAddress = 'GBRPYHIL2CI3WHZDTOOQFC6EB4KJJGUJMXQJSTUYCZLW5B63MPEXPUN';
      console.log('Wallet connected. Address:', mockAddress);
      resolve(mockAddress);
    }, 1500);
  });
}

/**
 * Simulates wallet disconnection
 */
export async function disconnectWallet(): Promise<void> {
  console.log('Disconnecting wallet...');
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Wallet disconnected');
      resolve();
    }, 500);
  });
}

/**
 * Validates a Stellar public key
 */
export function isValidStellarAddress(address: string): boolean {
  try {
    StellarSdk.StrKey.decodeEd25519PublicKey(address);
    return true;
  } catch {
    return false;
  }
}

/**
 * Gets a short version of the address for display
 */
export function shortenAddress(address: string, chars = 4): string {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

/**
 * Generates a new embedded Stellar wallet (keypair)
 * Returns both public and secret keys
 */
export function generateEmbeddedWallet(): { publicKey: string; secretKey: string } {
  console.log('Generating new embedded wallet...');
  const keypair = StellarSdk.Keypair.random();
  const publicKey = keypair.publicKey();
  const secretKey = keypair.secret();
  console.log('Embedded wallet generated. Public key:', publicKey);
  return { publicKey, secretKey };
}

/**
 * Validates an embedded wallet secret (private key)
 */
export function isValidStellarSecret(secret: string): boolean {
  try {
    StellarSdk.Keypair.fromSecret(secret);
    return true;
  } catch {
    return false;
  }
}
