'use client';

import { Button } from '@/components/ui/button';
import { formatToBrlCurrency } from '@/lib/currency';
import { Transaction } from '@/types/transaction.types';

interface TransactionListProps {
  transactions: Transaction[];
  loading: boolean;
  handleReverseTransaction: (id: string) => void;
}

const transactionTypeLabels: Record<Transaction['type'], string> = {
  DEPOSIT: 'Depósito',
  TRANSFER: 'Transferência',
  REVERSAL: 'Reversão'
};

function formatDate(date: string | Date) {
  return new Date(date).toLocaleString('pt-BR');
}

export function TransactionList({
  transactions,
  loading,
  handleReverseTransaction
}: TransactionListProps) {
  if (loading) {
    return <p className="text-sm text-muted-foreground">Carregando transações...</p>;
  }

  if (!transactions.length) {
    return <p className="text-sm text-muted-foreground">Nenhuma transação encontrada.</p>;
  }

  return (
    <section className="space-y-4 mt-8">
      <h2 className="text-xl font-semibold mb-2">Últimas transações</h2>
      <ul className="space-y-3">
        {transactions.map((tx) => (
          <li key={tx.id} className="border p-4 rounded-lg shadow-sm flex justify-between items-center">
            <div>
              <p className="font-medium">{transactionTypeLabels[tx.type]}</p>
              <p className="text-sm text-muted-foreground">{formatDate(tx.createdAt)}</p>
              <p className="text-xs text-muted-foreground mt-2">Para: {tx.toUser.email}</p>
            </div>

            <div className="flex flex-col items-end gap-y-1">
              <p className={`font-semibold ${tx.type === 'DEPOSIT' ? 'text-green-600' : 'text-blue-600'}`}>
                {formatToBrlCurrency(tx.amount)}
              </p>
              {(tx.type === 'TRANSFER' || tx.type === 'DEPOSIT') && (
                <Button size="sm" variant="outline" className="mt-1" onClick={() => handleReverseTransaction(tx.id)}>
                  Reverter
                </Button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}