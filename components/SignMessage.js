// components/SignMessage.jsx
import React, { useState, useEffect } from 'react';
import { useSignMessage } from 'wagmi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignMessage = () => {
  const [message, setMessage] = useState('');
  const [previousMessage, setPreviousMessage] = useState(null);
  const { signMessage, data, error, isError, isSuccess, isLoading } = useSignMessage();

  const handleSignMessage = () => {
    if (!message) {
      toast.error('Message cannot be empty!');
      return;
    }

    signMessage({ message });
    toast.info('Signing message...');
  };

  useEffect(() => {
    if (isSuccess && data) {
      setPreviousMessage({ message, signature: data });
      setMessage(''); // Clear the input box
      toast.success('Message signed successfully!');
    }
  }, [isSuccess, data]); // Trigger this effect when isSuccess or data changes

  return (
    <div className="bg-white p-6 rounded-md shadow-lg w-96">
      <h2 className="text-xl font-semibold mb-4 text-gray-700 text-center">
        Sign a Message
      </h2>

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

      <button
        onClick={handleSignMessage}
        disabled={isLoading || !message}
        className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 disabled:bg-gray-400"
      >
        {isLoading ? 'Signing...' : 'Sign Message'}
      </button>

      {isSuccess && previousMessage && (
        <div className="mt-4 text-green-500">
          <p>Message signed successfully!</p>
          <div className="text-gray-600 break-all">Your message: {previousMessage.message}</div>
          <div className="text-gray-600 break-all">Signature: {previousMessage.signature}</div>
        </div>
      )}

      {isError && (
        <div className="mt-4 text-red-500">
          <p>Error: {error.message}</p>
        </div>
      )}
    </div>
  );
};

export default SignMessage;
