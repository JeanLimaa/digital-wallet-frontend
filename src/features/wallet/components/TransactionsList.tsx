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
  REVERSAL: 'Reversão',
  RECEIVED: 'Recebido'
};

function formatDate(date: string | Date) {
  return new Date(date).toLocaleString('pt-BR');
}

export function TransactionList({
  transactions,
  loading,
  handleReverseTransaction
}: TransactionListProps) {
  const isReversal = (tx: Transaction) => tx.type === 'REVERSAL';
  const isDeposit = (tx: Transaction) => tx.type === 'DEPOSIT';
  const isTransfer = (tx: Transaction) => tx.type === 'TRANSFER';

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
          <li key={tx.id} className={`
            border p-4 rounded-lg shadow-sm flex justify-between items-center 
          `}>
            <div>
              <p className="font-medium">{transactionTypeLabels[tx.type]}</p>
              <p className="text-sm text-muted-foreground">{formatDate(tx.createdAt)}</p>
              {isReversal(tx) && tx.reversedTransaction ? (
                 <p className="text-xs text-red-600 mt-1">
                  Estorno de {transactionTypeLabels[tx.reversedTransaction.type]} de R$ {formatToBrlCurrency(tx.reversedTransaction.amount)} realizado em {formatDate(tx.reversedTransaction.createdAt)}
                </p>
              ) : (
                <>
                  {tx.fromUser?.email && <p className="text-xs text-muted-foreground mt-2">De: {tx.fromUser.email}</p>}
                  <p className="text-xs text-muted-foreground mt-2">Para: {tx.toUser.email}</p>
                </>
              )}
            </div>

            <div className="flex flex-col items-end gap-y-1">
              <p className={`
                font-semibold 
                ${tx.isPositive ? 'text-green-600' : 'text-red-600'}
              `}>
                {tx.isPositive ? '+' : '-'} {formatToBrlCurrency(tx.amount)}
              </p>
              {(isDeposit(tx) || isTransfer(tx)) && (
                <Button size="sm" variant="destructive" className="mt-1" onClick={() => handleReverseTransaction(tx.id)}>
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