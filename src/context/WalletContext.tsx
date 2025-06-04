import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useAlert } from './AlertContext';

interface WalletContextType {
  isConnected: boolean;
  address: string | null;
  balance: string;
  connect: () => Promise<void>;
  disconnect: () => void;
  isLoading: boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const { showAlert } = useAlert();
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState('0');
  const [isLoading, setIsLoading] = useState(false);

  const connect = async () => {
    try {
      setIsLoading(true);
      // Simulating wallet connection
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsConnected(true);
      setAddress('0x1234...abcd');
      setBalance('1.23 ETH');
      showAlert('success', 'Wallet connected successfully');
    } catch (error) {
      showAlert('error', 'Failed to connect wallet');
      console.error('Error connecting wallet:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const disconnect = () => {
    try {
      setIsConnected(false);
      setAddress(null);
      setBalance('0');
      showAlert('success', 'Wallet disconnected');
    } catch (error) {
      showAlert('error', 'Failed to disconnect wallet');
      console.error('Error disconnecting wallet:', error);
    }
  };

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        address,
        balance,
        connect,
        disconnect,
        isLoading
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
