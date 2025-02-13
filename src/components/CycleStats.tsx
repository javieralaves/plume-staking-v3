'use client';

import { usePlume } from '@/context/PlumeContext';

export default function CycleStats() {
  const { 
    cycleData, 
    historicalCycles, 
    cycleNumber,
    weeklyAPY,
    plumePrice
  } = usePlume();

  return (
    <div className="w-full p-6 bg-white dark:bg-black/30 rounded-lg border border-black/10 dark:border-white/10">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Cycle Statistics</h3>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-gray-50 dark:bg-black/20 rounded-lg">
          <h4 className="font-medium mb-3">Current Cycle #{cycleData.cycleNumber}</h4>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">PLUME Staked at Start</span>
                <span>{cycleData.totalStaked.toFixed(2)} PLUME</span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Based on total staked PLUME from previous cycle
              </p>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Expected Rewards</span>
              <span>{cycleData.expectedRewards.toFixed(4)} pUSD</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Network Revenue</span>
              <span>{cycleData.networkRevenue.toFixed(4)} pUSD</span>
            </div>

            <div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">pUSD Streaming</span>
                <span>{cycleData.pusdStreamed.toFixed(4)} pUSD</span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Streaming rewards from previous cycle
              </p>
            </div>

            {cycleData.surplus > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Surplus (Carried Over)</span>
                <span>+{cycleData.surplus.toFixed(4)} pUSD</span>
              </div>
            )}
            {cycleData.plumeEmissions > 0 && (
              <div className="flex justify-between text-yellow-600">
                <span>PLUME Emissions</span>
                <span>+{cycleData.plumeEmissions.toFixed(4)} PLUME</span>
              </div>
            )}
          </div>
        </div>

        {historicalCycles.length > 0 && (
          <div className="mt-4">
            <h4 className="font-medium mb-3">Historical Cycles</h4>
            <div className="space-y-3">
              {historicalCycles.slice(-3).reverse().map((cycle) => (
                <div key={`cycle-${cycle.cycleNumber}`} className="p-3 bg-gray-50 dark:bg-black/20 rounded-lg">
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between font-medium">
                      <span>Cycle #{cycle.cycleNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">PLUME Staked at Start</span>
                      <span>{cycle.totalStaked.toFixed(2)} PLUME</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Expected Rewards</span>
                      <span>{cycle.expectedRewards.toFixed(4)} pUSD</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Network Revenue</span>
                      <span>{cycle.networkRevenue.toFixed(4)} pUSD</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">pUSD Streamed</span>
                      <span>{cycle.pusdStreamed.toFixed(4)} pUSD</span>
                    </div>
                    {cycle.surplus > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Surplus</span>
                        <span>+{cycle.surplus.toFixed(4)} pUSD</span>
                      </div>
                    )}
                    {cycle.plumeEmissions > 0 && (
                      <div className="flex justify-between text-yellow-600">
                        <span>Emissions</span>
                        <span>+{cycle.plumeEmissions.toFixed(4)} PLUME</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 