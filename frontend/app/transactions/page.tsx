import { TransactionsHeader } from '@/components/transactions/TransactionsHeader';
import { TransactionsFilter } from '@/components/transactions/TransactionsFilter';
import { TransactionsList } from '@/components/transactions/TransactionsList';

export default function TransactionsPage() {
  return (
    <main className="min-h-screen bg-background">
      <TransactionsHeader />
      <div className="container mx-auto px-4 py-8">
        <TransactionsFilter />
        <TransactionsList />
      </div>
    </main>
  );
}
