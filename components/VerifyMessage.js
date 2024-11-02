import React, { useState } from 'react';
import { verifyMessage } from '@wagmi/core';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { config } from '@/config';
import { sepolia } from '@wagmi/core/chains';

const VerifyMessage = () => {
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [signature, setSignature] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(null);

  const handleVerifyMessage = async () => {
    if (!address || !message || !signature) {
      toast.error('All fields are required!');
      return;
    }
  
    if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
      toast.error('Invalid Ethereum address format!');
      return;
    }
  
    setIsLoading(true);
    try {
      const result = await verifyMessage(config, {
        chainId: sepolia.id,
        address,
        message,
        signature,
      });
  
      setIsVerified(result);
      
      // Show a toast based on the result
      if (result) {
        toast.success('The message is valid!');
      } else {
        toast.error('The message is invalid!');
      }
    } catch (error) {
      let errorMessage;
  
      // Specific error handling
      if (error.code === 'NETWORK_ERROR') {
        errorMessage = 'Network error: Please check your connection and try again.';
      } else if (error.message.includes('invalid signature')) {
        errorMessage = 'The signature is invalid. Please check your input.';
      } else if (error.message.includes('user denied')) {
        errorMessage = 'The verification was canceled by the user.';
      } else if (error.message.includes('invalid address')) {
        errorMessage = 'The provided address is not valid for this network.';
      } else {
        console.error('Verification error:', error); 
        errorMessage = `Verification failed: ${error.message}`;
      }
  
      toast.error(errorMessage);
      setIsVerified(false);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="bg-white p-6 rounded-md shadow-lg w-96">
      <h2 className="text-xl font-semibold mb-4 text-gray-700 text-center">Verify a Message</h2>

      <div className="mb-4">
        <label className="block text-gray-700">Ethereum Address</label>
        <input
          type="text"
          className="mt-1 p-2 border border-gray-300 rounded w-full"
          placeholder="Enter address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Message</label>
        <input
          type="text"
          className="mt-1 p-2 border border-gray-300 rounded w-full"
          placeholder="Enter your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Signature</label>
        <input
          type="text"
          className="mt-1 p-2 border border-gray-300 rounded w-full"
          placeholder="Enter signature"
          value={signature}
          onChange={(e) => setSignature(e.target.value)}
          required
        />
      </div>

      <button
        onClick={handleVerifyMessage}
        disabled={isLoading || !address || !message || !signature}
        className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 disabled:bg-gray-400"
      >
        {isLoading ? 'Verifying...' : 'Verify Message'}
      </button>

      {isVerified !== null && (
        <div className={`mt-4 ${isVerified ? 'text-green-500' : 'text-red-500'}`}>
          {isVerified ? 'The message is valid!' : 'The message is invalid!'}
        </div>
      )}
    </div>
  );
};

export default VerifyMessage;
