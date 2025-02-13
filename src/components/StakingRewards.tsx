'use client';

import { usePlume } from '@/context/PlumeContext';

export default function StakingRewards() {
  const {
    stakedAmount,
    currentCycleRewards,
    totalStreamingRewards,
    claimedRewards,
    streamedAmount,
    cycleNumber,
    nextCycleIn,
    weeklyAPY,
    claimRewards
  } = usePlume();

  // Calculate annual APY from weekly
  const annualAPY = weeklyAPY * 52;

  return (
    <div className="w-full p-6 bg-white dark:bg-black/30 rounded-lg border border-black/10 dark:border-white/10">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Staking Rewards</h3>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Cycle #{cycleNumber}
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">Current Stake</span>
            <span className="font-medium">{stakedAmount.toFixed(2)} PLUME</span>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium">Current Cycle</h4>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Next cycle in {nextCycleIn}
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Accumulated Rewards</span>
              <span className="font-medium">{currentCycleRewards.toFixed(4)} pUSD</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Target APY</span>
              <span className="font-medium">{annualAPY.toFixed(1)}%</span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <h4 className="font-medium mb-2">Streaming Rewards</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Total Rewards</span>
              <span className="font-medium">{totalStreamingRewards.toFixed(4)} pUSD</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Claimed</span>
              <span className="font-medium">{claimedRewards.toFixed(4)} pUSD</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Available to Claim</span>
              <span className="font-medium">{streamedAmount.toFixed(4)} pUSD</span>
            </div>
          </div>
        </div>

        <button
          onClick={claimRewards}
          disabled={streamedAmount <= 0}
          className="w-full mt-4 px-4 py-2 rounded-lg bg-green-500 text-white font-medium 
                   hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed
                   transition-colors"
        >
          Claim Available Rewards
        </button>
      </div>
    </div>
  );
} 