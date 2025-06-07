interface userInTransaction {
  email: string;
  name: string;
}

type TransactionType = 'DEPOSIT' | 'TRANSFER' | 'REVERSAL' | 'RECEIVED';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  description?: string;
  createdAt: string;
  toUser: userInTransaction;
  fromUser?: userInTransaction;
  isPositive: boolean;
  reversedTransaction?: {
    id: string;
    amount: number;
    type: TransactionType;
    createdAt: string;
  };
}