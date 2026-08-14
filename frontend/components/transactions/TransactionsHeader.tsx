'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft, Download } from 'lucide-react';
import Link from 'next/link';

export function TransactionsHeader() {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Transaction History</h1>
              <p className="text-sm text-muted-foreground mt-1">
                View and manage all your payment transactions
              </p>
            </div>
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
    </header>
  );
}
