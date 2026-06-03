import { create } from 'zustand';

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  network: string;
  connect: (address: string) => void;
  disconnect: () => void;
  setNetwork: (network: string) => void;
}

export const useWalletStore = create<WalletState>((set) => ({
  isConnected: false,
  address: null,
  network: 'TESTNET',
  connect: (address: string) => {
    console.log('Wallet connected with address:', address);
    set({ isConnected: true, address });
  },
  disconnect: () => {
    console.log('Wallet disconnected');
    set({ isConnected: false, address: null });
  },
  setNetwork: (network: string) => {
    console.log('Network set to:', network);
    set({ network });
  },
}));
