import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAccount } from 'wagmi';

const TransactionHistory = () => {
  const { address } = useAccount();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!address) return;
      const apikey=process.env.NEXT_PUBLIC_ETH_KEY;
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=2&sort=desc&apikey=${apikey}`
        );
        console.log(response.data);
        setTransactions(response.data.result);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
      setLoading(false);
    };

    fetchTransactions();
  }, [address]);

  if (loading) {
    return <div>Loading transactions...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-2xl">
      <h2 className="text-xl font-semibold mb-4 text-gray-700 text-center">Latest 2 Transactions</h2>
      {transactions.length > 0 ? (
        <ul>
          {transactions.map((tx) => (
            <li key={tx.hash} className="mb-4 border-b pb-2">
              <p><strong>Hash:</strong> {tx.hash}</p>
              <p><strong>From:</strong> {tx.from}</p>
              <p><strong>To:</strong> {tx.to}</p>
              <p><strong>Value:</strong> {parseFloat(tx.value) / 10 ** 18} ETH</p>
              <p><strong>Timestamp:</strong> {new Date(tx.timeStamp * 1000).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No transactions found for this address.</p>
      )}
    </div>
  );
};

export default TransactionHistory;
