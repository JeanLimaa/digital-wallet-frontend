'use client';

import { WalletHeader } from '@/features/wallet/components/WalletHeader';
import { TransactionList } from '@/features/wallet/components/TransactionsList';
import { ConfirmDialog } from '@/features/wallet/components/ConfirmDialog';
import { useWallet } from '@/features/wallet/hooks/useWallet';
import { WalletTabs } from '@/features/wallet/components/WalletTabs';

export default function WalletPage() {
  const {
    depositValue,
    setDepositValue,
    transferValue,
    setTransferValue,
    transferEmail,
    setTransferEmail,
    balance,
    handleDeposit,
    handleReverseTransaction,
    transactions,
    loading,
    handleTransfer,
    confirmationDialogProps
  } = useWallet();

  return (
    <main className="max-w-4xl mx-auto p-4 sm:p-6">
      <WalletHeader balance={balance} />

      <WalletTabs
        depositValue={depositValue}
        setDepositValue={setDepositValue}
        transferValue={transferValue}
        setTransferValue={setTransferValue}
        transferEmail={transferEmail}
        setTransferEmail={setTransferEmail}
        handleDeposit={handleDeposit}
        handleTransfer={handleTransfer}
      />

      <TransactionList
        handleReverseTransaction={handleReverseTransaction}
        transactions={transactions}
        loading={loading}
      />

      <ConfirmDialog
        title="Confirmar transferência"
        email={confirmationDialogProps.email}
        value={confirmationDialogProps.value}
        onCancel={confirmationDialogProps.onCancel}
        onConfirm={confirmationDialogProps.onConfirm}
        open={confirmationDialogProps.open}
      />
    </main>
  );
}