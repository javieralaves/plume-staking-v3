'use client';

import { usePlume } from '@/context/PlumeContext';
import CycleTable from './CycleTable';
import SystemMetrics from './SystemMetrics';
import AdminControls from './AdminControls';

export default function AdminDashboard() {
  const { 
    cycleData,
    historicalCycles,
    cycleNumber,
    weeklyAPY,
    plumePrice
  } = usePlume();

  // Combine current cycle with historical cycles for complete data
  const allCycles = [...historicalCycles, cycleData];
  
  // Calculate total metrics
  const totalStaked = cycleData.totalStaked;
  const totalPusdDistributed = historicalCycles.reduce(
    (sum, cycle) => sum + cycle.pusdStreamed, 
    0
  );
  const totalSurplus = historicalCycles.reduce(
    (sum, cycle) => sum + cycle.surplus, 
    0
  );

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SystemMetrics 
          totalStaked={totalStaked}
          totalPusdDistributed={totalPusdDistributed}
          totalSurplus={totalSurplus}
          currentAPY={weeklyAPY * 52}
          plumePrice={plumePrice}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CycleTable cycles={allCycles} />
        </div>
        <div>
          <AdminControls />
        </div>
      </div>
    </div>
  );
} 