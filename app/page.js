"use client";
import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import WalletOptions from '@/components/WalletOptions';
import Account from '@/components/Account';
import EthTransaction from '@/components/EthTransaction';
import Airdrop from '@/components/Airdrop'; // Import the Airdrop component

export default function HomePage() {
  const { isConnected } = useAccount();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; 
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-200 to-blue-500">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Connect Your Wallet</h1>
        {isConnected ? (
          <>
            <Account />
            <EthTransaction /> 
          </>
        ) : (
          <WalletOptions />
        )}
      </div>
    </div>
  );
}
