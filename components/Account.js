"use client";
import React from "react";
import { useAccount, useDisconnect, useBalance } from "wagmi";
import { formatUnits } from "ethers"; 

export default function Account() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: balanceData } = useBalance({ address });

  return (
    <div className="flex flex-col items-center text-center">
      <div className="text-lg font-semibold mb-2 overflow-hidden text-ellipsis whitespace-nowrap">
        {address}
      </div>
      <div className="text-lg font-semibold mb-2">
        Address: {address}, Balance: {balanceData ? `${formatUnits(balanceData.value, balanceData.decimals)} ${balanceData.symbol}` : "Loading..."}
      </div>
      {/* Message indicating the supported network */}
      <div className="text-red-500 font-medium mb-2">
        Note: This features works only for the Sepolia network.
      </div>
      <button
        onClick={() => disconnect()}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
      >
        Disconnect
      </button>
    </div>
  );
}
