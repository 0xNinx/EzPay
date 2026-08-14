import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { RecentTransactions } from '@/components/dashboard/RecentTransactions';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="container mx-auto px-4 py-8">
        <DashboardStats />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2">
            <RecentTransactions />
          </div>
          <div>
            <QuickActions />
          </div>
        </div>
      </div>
    </main>
  );
}
