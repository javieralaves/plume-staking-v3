import { useState } from 'react';

interface CycleData {
  cycleNumber: number;
  totalStaked: number;
  expectedRewards: number;
  networkRevenue: number;
  pusdStreamed: number;
  surplus: number;
  plumeEmissions: number;
}

interface CycleTableProps {
  cycles: CycleData[];
}

export default function CycleTable({ cycles }: CycleTableProps) {
  const [selectedCycle, setSelectedCycle] = useState<number | 'all'>('all');

  const filteredCycles = selectedCycle === 'all' 
    ? cycles 
    : cycles.filter(cycle => cycle.cycleNumber === selectedCycle);

  return (
    <div className="bg-white dark:bg-black/30 rounded-lg border border-black/10 dark:border-white/10 overflow-hidden">
      <div className="p-4 border-b border-black/10 dark:border-white/10">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Cycle History</h2>
          <select
            value={selectedCycle}
            onChange={(e) => setSelectedCycle(e.target.value === 'all' ? 'all' : Number(e.target.value))}
            className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-black/20 
                     border border-gray-200 dark:border-gray-700"
          >
            <option value="all">All Cycles</option>
            {cycles.map(cycle => (
              <option key={cycle.cycleNumber} value={cycle.cycleNumber}>
                Cycle #{cycle.cycleNumber}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 dark:bg-black/20">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cycle
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                PLUME Staked
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Expected Rewards
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Network Revenue
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                pUSD Streamed
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Surplus
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                PLUME Emissions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredCycles.map((cycle) => (
              <tr key={cycle.cycleNumber}>
                <td className="px-6 py-4 whitespace-nowrap">
                  #{cycle.cycleNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {cycle.totalStaked.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {cycle.expectedRewards.toFixed(4)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {cycle.networkRevenue.toFixed(4)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {cycle.pusdStreamed.toFixed(4)}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap ${
                  cycle.surplus > 0 ? 'text-green-500' : cycle.surplus < 0 ? 'text-red-500' : ''
                }`}>
                  {cycle.surplus.toFixed(4)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {cycle.plumeEmissions.toFixed(4)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 