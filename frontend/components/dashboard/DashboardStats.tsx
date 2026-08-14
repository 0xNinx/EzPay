'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, TrendingUp, Users, Clock } from 'lucide-react';

export function DashboardStats() {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$12,450.00',
      change: '+15.3%',
      icon: DollarSign,
      color: 'text-green-500',
    },
    {
      title: 'Total Transactions',
      value: '234',
      change: '+8.1%',
      icon: TrendingUp,
      color: 'text-blue-500',
    },
    {
      title: 'Active Customers',
      value: '89',
      change: '+12.5%',
      icon: Users,
      color: 'text-purple-500',
    },
    {
      title: 'Pending Payouts',
      value: '$3,200.00',
      change: '3 pending',
      icon: Clock,
      color: 'text-yellow-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-card border-border hover:shadow-lg hover:shadow-accent/10 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-5 w-5 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className={stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                {stat.change}
              </span>{' '}
              from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
