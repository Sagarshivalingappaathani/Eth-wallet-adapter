"use client";
import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import WalletOptions from '@/components/WalletOptions';
import Account from '@/components/Account';
import EthTransaction from '@/components/EthTransaction';
import SignMessage from '@/components/SignMessage';
import VerifyMessage from '@/components/VerifyMessage';
import GasEstimation from '@/components/GasEstimation';
import ChartComponent from '@/components/BlockCount';
import TransactionHistory from '@/components/TransactionHistory'

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
            <div className="mb-6">
              <Account />
            </div>
            <div className="flex flex-row gap-4 mb-6">
              <ChartComponent/>
              <SignMessage />
              <VerifyMessage/>
            </div>
            <div className="flex flex-row gap-4 mb-6">
              <EthTransaction />
              <GasEstimation/>
              <TransactionHistory/>
            </div>
          </>
        ) : (
          <WalletOptions />
        )}
      </div>
    </div>
  );
}
