//create a zustand store to set and retrieve the wallet address
import { create } from 'zustand';

const useWalletStore = create((set) => ({
    walletAddress: '',
    setWalletAddress: (address) => set({ walletAddress: address }),
}));

export default useWalletStore;