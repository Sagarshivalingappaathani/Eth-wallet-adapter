"use client"
import React from 'react'
import { useConnect } from 'wagmi'

export default function WalletOptions() {
  const { connectors, connect } = useConnect()

  return (
    <div className="flex flex-col items-center">
      {connectors.map((connector) => (
        <button 
          key={connector.id} 
          onClick={() => connect({ connector })} 
          className="w-full mb-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        >
          {connector.name}
        </button>
      ))}
    </div>
  )
}

