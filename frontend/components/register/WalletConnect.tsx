'use client';

import { useWalletStore } from '@/lib/walletStore';
import { useRegistrationStore } from '@/lib/registrationStore';
import { connectWallet, disconnectWallet, shortenAddress } from '@/lib/stellar';
import { useState } from 'react';

export function WalletConnect() {
  const { isConnected, address, connect, disconnect } = useWalletStore();
  const { updateFormData } = useRegistrationStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = async () => {
    setIsLoading(true);
    try {
      const walletAddress = await connectWallet();
      connect(walletAddress);
      updateFormData({ walletAddress });
    } catch (error) {
      console.error('Error connecting wallet:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = async () => {
    setIsLoading(true);
    try {
      await disconnectWallet();
      disconnect();
      updateFormData({ walletAddress: '' });
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      {!isConnected ? (
        <div className="p-6 border-2 border-dashed border-accent/50 rounded-lg text-center bg-card hover:border-accent transition-colors duration-300">
          <div className="mb-4 text-4xl">🔗</div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Connect Your Stellar Wallet</h3>
          <p className="text-muted-foreground text-sm mb-4">
            Link your Stellar wallet to receive payments. Supports Freighter, Lobstr, and Albedo.
          </p>
          <button
            onClick={handleConnect}
            disabled={isLoading}
            className="px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:shadow-lg hover:shadow-accent/50 hover:scale-105 transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Connecting...' : 'Connect Wallet'}
          </button>
        </div>
      ) : (
        <div className="p-6 border-2 border-accent rounded-lg bg-card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <h3 className="text-lg font-semibold text-foreground">Wallet Connected</h3>
            </div>
            <button
              onClick={handleDisconnect}
              disabled={isLoading}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              Disconnect
            </button>
          </div>
          <div className="bg-background rounded-lg p-4 break-all font-mono text-sm text-muted-foreground">
            {shortenAddress(address!, 12)}
          </div>
          <p className="text-xs text-muted-foreground mt-2">Full address: {address}</p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Bank Account Number (Optional)
        </label>
        <input
          type="text"
          placeholder="Enter your bank account for direct deposits"
          className="w-full px-4 py-3 border border-border rounded-lg bg-card text-foreground placeholder-muted-foreground transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Bank Routing Number (Optional)
        </label>
        <input
          type="text"
          placeholder="Your bank routing number"
          className="w-full px-4 py-3 border border-border rounded-lg bg-card text-foreground placeholder-muted-foreground transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>
    </div>
  );
}
