'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowDownRight, ArrowUpRight, ExternalLink, ChevronRight } from 'lucide-react';

export function TransactionsList() {
  const transactions = [
    {
      id: 'TX-001234',
      type: 'payment',
      from: 'GD...XYZ',
      amount: '$150.00',
      fee: '$0.02',
      status: 'completed',
      date: '2024-01-15 14:30:00',
      hash: 'a1b2c3d4e5f6...',
    },
    {
      id: 'TX-001235',
      type: 'payment',
      from: 'GAB...ABC',
      amount: '$75.50',
      fee: '$0.02',
      status: 'completed',
      date: '2024-01-15 11:45:00',
      hash: 'f6e5d4c3b2a1...',
    },
    {
      id: 'TX-001236',
      type: 'payout',
      to: 'Bank Account ****1234',
      amount: '$500.00',
      fee: '$5.00',
      status: 'pending',
      date: '2024-01-14 16:20:00',
      hash: '9z8y7x6w5v4...',
    },
    {
      id: 'TX-001237',
      type: 'payment',
      from: 'GC...DEF',
      amount: '$200.00',
      fee: '$0.02',
      status: 'completed',
      date: '2024-01-13 09:15:00',
      hash: 'u4t5s6r7q8w...',
    },
    {
      id: 'TX-001238',
      type: 'payment',
      from: 'GA...GHI',
      amount: '$45.00',
      fee: '$0.02',
      status: 'failed',
      date: '2024-01-12 18:00:00',
      hash: 'e1d2c3b4a5f...',
    },
  ];

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">All Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between p-4 rounded-lg bg-background hover:bg-accent/5 transition-colors duration-200 border border-border hover:border-accent/30"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`p-2 rounded-full ${
                    tx.type === 'payment' ? 'bg-green-500/10' : 'bg-blue-500/10'
                  }`}
                >
                  {tx.type === 'payment' ? (
                    <ArrowDownRight className="h-4 w-4 text-green-500" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4 text-blue-500" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{tx.id}</p>
                  <p className="text-xs text-muted-foreground">
                    {tx.type === 'payment' ? `From: ${tx.from}` : tx.to}
                  </p>
                  <p className="text-xs text-muted-foreground">{tx.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">{tx.amount}</p>
                  <p className="text-xs text-muted-foreground">Fee: {tx.fee}</p>
                  <Badge
                    variant={
                      tx.status === 'completed'
                        ? 'default'
                        : tx.status === 'pending'
                        ? 'secondary'
                        : 'destructive'
                    }
                    className="text-xs mt-1"
                  >
                    {tx.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-1 hover:bg-accent/10 rounded transition-colors">
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </button>
                  <Button variant="ghost" size="icon">
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
