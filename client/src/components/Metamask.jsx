import React, { useEffect, useState } from 'react';
import MetaMaskOnboarding from '@metamask/onboarding';

const forwarderOrigin = 'http://localhost:3000';

export default function MetaMask() {
  const [isMetamaskInstalled, setIsMetamaskInstalled] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const { ethereum } = window;

    // Check if MetaMask is installed
    const onboardMetaMaskClient = async () => {
      setIsMetamaskInstalled(ethereum && ethereum.isMetaMask);
    }

    // On page load, check if the user is already connected
    const savedAccount = localStorage.getItem('metamaskAccount');
    if (savedAccount) {
      setAccounts([savedAccount]);
      setIsConnected(true);
    }

    onboardMetaMaskClient();
  }, []);

  const connectMetaMask = async () => {
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setIsConnected(true);
      setAccounts(accounts);
      localStorage.setItem('metamaskAccount', accounts[0]); // Save account to localStorage
    } catch (err) {
      console.error("Error occurred while connecting to MetaMask: ", err);
    }
  }

  const installMetaMask = () => {
    const onboarding = new MetaMaskOnboarding({ forwarderOrigin });
    onboarding.startOnboarding();
  }

  return (
    <div className="flex justify-center mt-6">
      <button
        onClick={isMetamaskInstalled ? connectMetaMask : installMetaMask}
        disabled={!isMetamaskInstalled}
        className="w-72 bg-[#0080ff] text-white font-bold py-4 px-4 rounded-xl focus:outline-none focus:shadow-outline-gray active:bg-gray-900 transition duration-150 ease-in"
      >
        {isConnected ? `${accounts[0]}` : 'Register with MetaMask'}
      </button>
    </div>
  );
}
