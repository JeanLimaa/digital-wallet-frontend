export interface Transaction {
  id: string;
  type: 'DEPOSIT' | 'TRANSFER' | 'REVERSAL';
  amount: number;
  description?: string;
  createdAt: string;
  toUser: {
    email: string;
    name: string;
  }
}