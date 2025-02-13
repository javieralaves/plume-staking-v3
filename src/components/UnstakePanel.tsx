'use client';

import { useState } from 'react';
import { usePlume } from '@/context/PlumeContext';

export default function UnstakePanel() {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const { stakedAmount, unstake } = usePlume();

  const handleUnstake = () => {
    const unstakeAmount = parseFloat(amount);
    
    if (isNaN(unstakeAmount) || unstakeAmount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (unstakeAmount > stakedAmount) {
      setError('Cannot unstake more than staked amount');
      return;
    }

    unstake(unstakeAmount);
    setAmount('');
    setError('');
  };

  return (
    <div className="p-6 bg-white dark:bg-black/30 rounded-lg border border-black/10 dark:border-white/10">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Unstake PLUME</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Currently Staked: {stakedAmount.toFixed(2)} PLUME
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <input
            type="number"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              setError('');
            }}
            placeholder="Enter amount to unstake"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
                     bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="0"
            max={stakedAmount}
            step="0.01"
          />
          {error && (
            <p className="mt-2 text-sm text-red-500">{error}</p>
          )}
        </div>

        <button
          onClick={handleUnstake}
          disabled={!amount || parseFloat(amount) > stakedAmount || stakedAmount === 0}
          className="w-full px-4 py-2 rounded-lg bg-red-500 text-white font-medium 
                   hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed
                   transition-colors"
        >
          Unstake PLUME
        </button>
      </div>
    </div>
  );
} 