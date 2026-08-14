'use client';

import { useWalletStore } from '@/lib/walletStore';
import { Button } from '@/components/ui/button';
import { LogOut, Settings } from 'lucide-react';

export function DashboardHeader() {
  const { isConnected, address, disconnect } = useWalletStore();

  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">EzPay Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {isConnected ? `Connected: ${address?.slice(0, 8)}...${address?.slice(-4)}` : 'Not connected'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            {isConnected && (
              <Button variant="outline" onClick={disconnect}>
                <LogOut className="h-4 w-4 mr-2" />
                Disconnect
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
