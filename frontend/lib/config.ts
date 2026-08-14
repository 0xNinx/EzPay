/**
 * Application Configuration
 * Centralized configuration management for the frontend
 */

export const config = {
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || 'EzPay',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  },
  stellar: {
    network: (process.env.NEXT_PUBLIC_STELLAR_NETWORK as 'testnet' | 'public') || 'testnet',
    rpcUrl: process.env.NEXT_PUBLIC_STELLAR_RPC_URL || 'https://horizon-testnet.stellar.org',
    networkPassphrase: process.env.NEXT_PUBLIC_STELLAR_NETWORK === 'public'
      ? 'Public Global Stellar Network ; September 2015'
      : 'Test SDF Network ; September 2015',
  },
  features: {
    walletConnect: process.env.NEXT_PUBLIC_ENABLE_WALLET_CONNECT === 'true',
    qrPayments: process.env.NEXT_PUBLIC_ENABLE_QR_PAYMENTS === 'true',
    paymentLinks: process.env.NEXT_PUBLIC_ENABLE_PAYMENT_LINKS === 'true',
  },
  analytics: {
    enabled: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
    id: process.env.NEXT_PUBLIC_ANALYTICS_ID,
  },
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
};

export default config;
