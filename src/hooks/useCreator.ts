import { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import { useAlert } from '../context/AlertContext';

export const useCreator = () => {
  const { isConnected } = useWallet();
  const { showAlert } = useAlert();
  const [isLoading, setIsLoading] = useState(false);

  const createContent = async (data: any) => {
    if (!isConnected) {
      showAlert('error', 'Please connect your wallet first');
      return false;
    }

    setIsLoading(true);
    try {
      // Simulate content creation
      await new Promise(resolve => setTimeout(resolve, 2000));
      showAlert('success', 'Content created successfully');
      return true;
    } catch (error) {
      showAlert('error', 'Failed to create content');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateContent = async (contentId: string, data: any) => {
    if (!isConnected) {
      showAlert('error', 'Please connect your wallet first');
      return false;
    }

    setIsLoading(true);
    try {
      // Simulate content update
      await new Promise(resolve => setTimeout(resolve, 2000));
      showAlert('success', 'Content updated successfully');
      return true;
    } catch (error) {
      showAlert('error', 'Failed to update content');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteContent = async (contentId: string) => {
    if (!isConnected) {
      showAlert('error', 'Please connect your wallet first');
      return false;
    }

    setIsLoading(true);
    try {
      // Simulate content deletion
      await new Promise(resolve => setTimeout(resolve, 2000));
      showAlert('success', 'Content deleted successfully');
      return true;
    } catch (error) {
      showAlert('error', 'Failed to delete content');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createContent,
    updateContent,
    deleteContent,
    isLoading
  };
};
