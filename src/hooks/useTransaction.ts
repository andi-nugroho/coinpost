import { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import { useAlert } from '../context/AlertContext';

export const useTransaction = () => {
  const { isConnected, connect } = useWallet();
  const { showAlert } = useAlert();
  const [isProcessing, setIsProcessing] = useState(false);

  const executeTransaction = async (
    type: 'buy' | 'sell',
    { quantity, price, title }: { quantity: number; price: number; title: string }
  ) => {
    if (!isConnected) {
      showAlert('error', 'Please connect your wallet first');
      connect();
      return false;
    }

    setIsProcessing(true);
    try {
      // Simulate blockchain transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const totalPrice = quantity * price;
      const action = type === 'buy' ? 'Bought' : 'Sold';
      showAlert('success', `${action} ${quantity} ${title} for ${totalPrice.toFixed(3)} ETH`);
      
      return true;
    } catch (error) {
      showAlert('error', 'Transaction failed. Please try again.');
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    executeTransaction,
    isProcessing
  };
};
