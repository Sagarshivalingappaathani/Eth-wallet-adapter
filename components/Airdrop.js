// Airdrop.js
"use client";
import React from "react";
import { useAccount, useSendTransaction } from "wagmi";
import { parseEther } from "ethers"; 
import { toast } from 'react-toastify';

export default function Airdrop() {
  const { address } = useAccount();
  const { sendTransaction } = useSendTransaction();

  const handleAirdrop = async () => {
    if (!address) {
      toast.error("Please connect your wallet."); // Notify if no address
      return;
    }

    const airdropAddress = address; 
    const amount = parseEther("0.01"); 

    try {
      const tx = sendTransaction({
          to: airdropAddress,
          value: amount,
      });

      // Notify success
      toast.success("Transaction sent! Check your wallet for the airdrop.");
    } catch (error) {
      // Notify error
      toast.error("Transaction failed! Please try again.");
    }
  };

  return (
    <div className="mt-4 flex justify-center"> 
      <button
        onClick={handleAirdrop}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Request Airdrop
      </button>
    </div>
  );
}
