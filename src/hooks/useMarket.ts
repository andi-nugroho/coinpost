import { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import { useAlert } from '../context/AlertContext';

export const useMarket = () => {
  const { isConnected } = useWallet();
  const { showAlert } = useAlert();
  const [isLoading, setIsLoading] = useState(false);

  const purchaseToken = async (tokenId: string, amount: number, price: number) => {
    if (!isConnected) {
      showAlert('error', 'Please connect your wallet first');
      return false;
    }

    setIsLoading(true);
    try {
      // Simulate blockchain transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      showAlert('success', `Successfully purchased ${amount} tokens`);
      return true;
    } catch (error) {
      showAlert('error', 'Transaction failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const sellToken = async (tokenId: string, amount: number, price: number) => {
    if (!isConnected) {
      showAlert('error', 'Please connect your wallet first');
      return false;
    }

    setIsLoading(true);
    try {
      // Simulate blockchain transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      showAlert('success', `Successfully sold ${amount} tokens`);
      return true;
    } catch (error) {
      showAlert('error', 'Transaction failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const createToken = async (metadata: any) => {
    if (!isConnected) {
      showAlert('error', 'Please connect your wallet first');
      return false;
    }

    setIsLoading(true);
    try {
      // Simulate token creation
      await new Promise(resolve => setTimeout(resolve, 2000));
      showAlert('success', 'Token created successfully');
      return true;
    } catch (error) {
      showAlert('error', 'Failed to create token');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    purchaseToken,
    sellToken,
    createToken,
    isLoading
  };
};
