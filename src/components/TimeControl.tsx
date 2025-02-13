'use client';

import { usePlume } from '@/context/PlumeContext';

export default function TimeControl() {
  const { cycleEndTime, fastForwardTime } = usePlume();

  const handleFastForward = () => {
    fastForwardTime(10); // Fast forward to 10 seconds before cycle end
  };

  const formatTimeLeft = () => {
    const now = Math.floor(Date.now() / 1000);
    const timeLeft = cycleEndTime - now;
    
    const days = Math.floor(timeLeft / (24 * 60 * 60));
    const hours = Math.floor((timeLeft % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((timeLeft % (60 * 60)) / 60);
    const seconds = timeLeft % 60;
    
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="w-full p-4 bg-white dark:bg-black/30 rounded-lg border border-black/10 dark:border-white/10">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-sm font-medium">Time Control (Debug)</h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Time until next cycle: {formatTimeLeft()}
          </p>
        </div>
        <button
          onClick={handleFastForward}
          className="px-3 py-1.5 text-sm bg-yellow-500 hover:bg-yellow-600 
                   text-white rounded-lg transition-colors"
        >
          Fast Forward
        </button>
      </div>
    </div>
  );
} 