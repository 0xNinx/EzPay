'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowDownRight, ArrowUpRight, ExternalLink } from 'lucide-react';

export function RecentTransactions() {
  const transactions = [
    {
      id: '1',
      type: 'payment',
      from: 'GD...XYZ',
      amount: '$150.00',
      status: 'completed',
      date: '2 hours ago',
    },
    {
      id: '2',
      type: 'payment',
      from: 'GAB...ABC',
      amount: '$75.50',
      status: 'completed',
      date: '5 hours ago',
    },
    {
      id: '3',
      type: 'payout',
      to: 'Bank Account ****1234',
      amount: '$500.00',
      status: 'pending',
      date: '1 day ago',
    },
    {
      id: '4',
      type: 'payment',
      from: 'GC...DEF',
      amount: '$200.00',
      status: 'completed',
      date: '2 days ago',
    },
    {
      id: '5',
      type: 'payment',
      from: 'GA...GHI',
      amount: '$45.00',
      status: 'failed',
      date: '3 days ago',
    },
  ];

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between p-4 rounded-lg bg-background hover:bg-accent/5 transition-colors duration-200"
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
                  <p className="text-sm font-medium text-foreground">
                    {tx.type === 'payment' ? `Payment from ${tx.from}` : tx.to}
                  </p>
                  <p className="text-xs text-muted-foreground">{tx.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">{tx.amount}</p>
                  <Badge
                    variant={
                      tx.status === 'completed'
                        ? 'default'
                        : tx.status === 'pending'
                        ? 'secondary'
                        : 'destructive'
                    }
                    className="text-xs"
                  >
                    {tx.status}
                  </Badge>
                </div>
                <button className="p-1 hover:bg-accent/10 rounded transition-colors">
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
