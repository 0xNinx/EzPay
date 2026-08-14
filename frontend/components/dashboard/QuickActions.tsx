'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QrCode, Link, Wallet, Banknote } from 'lucide-react';

export function QuickActions() {
  const actions = [
    {
      title: 'Create Payment Link',
      description: 'Generate a shareable payment link',
      icon: Link,
      color: 'bg-blue-500/10 text-blue-500',
    },
    {
      title: 'Generate QR Code',
      description: 'Create a QR code for payments',
      icon: QrCode,
      color: 'bg-purple-500/10 text-purple-500',
    },
    {
      title: 'Request Payout',
      description: 'Withdraw funds to bank',
      icon: Banknote,
      color: 'bg-green-500/10 text-green-500',
    },
    {
      title: 'Wallet Settings',
      description: 'Manage wallet preferences',
      icon: Wallet,
      color: 'bg-yellow-500/10 text-yellow-500',
    },
  ];

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="w-full justify-start h-auto py-4 hover:bg-accent/5 hover:border-accent transition-all duration-300"
            >
              <div className={`p-2 rounded-lg ${action.color} mr-4`}>
                <action.icon className="h-5 w-5" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-foreground">{action.title}</p>
                <p className="text-xs text-muted-foreground">{action.description}</p>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
