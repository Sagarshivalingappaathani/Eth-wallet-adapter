'use client';

import React, { useState, useEffect } from 'react';
import { useEstimateGas } from 'wagmi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { parseEther } from 'viem';

const GasEstimation = () => {
  const [to, setTo] = useState('');
  const [value, setValue] = useState('');
  const [data, setData] = useState('');
  const [estimatedGas, setEstimatedGas] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // State for triggering gas estimation
  const [shouldEstimate, setShouldEstimate] = useState(false);

  // Hook to estimate gas
  const { data: estimatedGasResult, error, isLoading: isEstimating } = useEstimateGas({
    to,
    value: value ? parseEther(value) : undefined,
    data,
    enabled: shouldEstimate, // Enable the hook only when estimation is requested
  });

  useEffect(() => {
    if (shouldEstimate) {
      if (error) {
        console.error('Error estimating gas:', error);
        toast.error(`Failed to estimate gas: ${error.message}`);
      } else {
        setEstimatedGas(estimatedGasResult ? estimatedGasResult.toString() : null);
        toast.success('Gas estimation completed!');
      }
      setIsLoading(false);
      setShouldEstimate(false); // Reset after estimation
    }
  }, [shouldEstimate, estimatedGasResult, error]);

  const handleEstimateGas = (e) => {
    e.preventDefault();
    if (!to) {
      toast.error('Recipient address is required!');
      return;
    }

    if (!/^0x[a-fA-F0-9]{40}$/.test(to)) {
      toast.error('Invalid Ethereum address format!');
      return;
    }

    if (!value || isNaN(value) || parseFloat(value) <= 0) {
      toast.error('Valid Ether value is required!');
      return;
    }

    setIsLoading(true);
    setShouldEstimate(true); // Trigger gas estimation
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-lg w-96">
      <h2 className="text-xl font-semibold mb-4 text-gray-700 text-center">Estimate Gas</h2>

      <form onSubmit={handleEstimateGas}>
        <div className="mb-4">
          <label className="block text-gray-700">Recipient Address</label>
          <input
            type="text"
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            placeholder="Enter recipient address"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Value (in Ether)</label>
          <input
            type="text"
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            placeholder="Enter value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || isEstimating}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isLoading || isEstimating ? 'Estimating...' : 'Estimate Gas'}
        </button>
      </form>

      {estimatedGas && (
        <div className="mt-4 text-green-500">
          Estimated Gas: {estimatedGas} units
        </div>
      )}
    </div>
  );
};

export default GasEstimation;
