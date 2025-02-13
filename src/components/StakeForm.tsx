'use client';

import { useState } from 'react';
import { usePlume } from '@/context/PlumeContext';
import StakingRewards from './StakingRewards';
import UnstakePanel from './UnstakePanel';

export default function StakeForm() {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const { availableBalance, stakedAmount, stake } = usePlume();

  const handleStake = () => {
    const stakeAmount = parseFloat(amount);
    
    if (isNaN(stakeAmount) || stakeAmount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (stakeAmount > availableBalance) {
      setError('Insufficient balance');
      return;
    }

    stake(stakeAmount);
    setAmount('');
    setError('');
    // You can add a toast notification here
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <div className="p-6 bg-white dark:bg-black/30 rounded-lg shadow-lg border border-black/10 dark:border-white/10">
        <div className="mb-6 space-y-1">
          <h2 className="text-xl font-semibold">Stake PLUME</h2>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Available: {availableBalance.toFixed(2)} PLUME
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Staked: {stakedAmount.toFixed(2)} PLUME
          </div>
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
              placeholder="Enter amount to stake"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              step="0.01"
            />
            {error && (
              <p className="mt-2 text-sm text-red-500">{error}</p>
            )}
          </div>

          <button
            onClick={handleStake}
            disabled={!amount || parseFloat(amount) > availableBalance}
            className="w-full px-4 py-2 rounded-lg bg-blue-500 text-white font-medium 
                     hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed
                     transition-colors"
          >
            Stake PLUME
          </button>
        </div>
      </div>
      
      <UnstakePanel />
      <StakingRewards />
    </div>
  );
} 