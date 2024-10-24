import React, { useState } from 'react';
import { useSendTransaction } from 'wagmi';
import { parseEther } from 'viem';
import { toast } from 'react-toastify';

export default function SendTransaction() {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const { data: hash, sendTransaction } = useSendTransaction();

  const sendTx = async () => {
    if (!recipient || !amount) {
      toast.error('Both fields are required!');
      return;
    }

    try {
      sendTransaction({ to: recipient, value: parseEther(amount) });
      toast.info('Sending transaction...');
    } catch (error) {
      console.error("Transaction Error:", error);
      toast.error(`Transaction failed: ${error.message}`);
    }
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-lg w-96">
      <h2 className="text-xl font-semibold mb-4 text-gray-700 text-center">
        Send ETH Transaction
      </h2>

      <div className="mb-4">
        <label className="block text-gray-700">Recipient Address</label>
        <input
          type="text"
          className="mt-1 p-2 border border-gray-300 rounded w-full"
          placeholder="0xA0Cf…251e"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Amount (ETH)</label>
        <input
          type="text"
          className="mt-1 p-2 border border-gray-300 rounded w-full"
          placeholder="0.05"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>

      <button
        onClick={sendTx}
        className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
      >
        Send
      </button>

      {hash && (
        <div className="mt-4 text-green-500">
          <p>Transaction sent successfully!</p>
          <a
            href={`https://sepolia.etherscan.io/tx/${hash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            View on Etherscan
          </a>
        </div>
      )}
    </div>
  );
}
