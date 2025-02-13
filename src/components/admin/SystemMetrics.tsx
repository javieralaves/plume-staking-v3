interface SystemMetricsProps {
  totalStaked: number;
  totalPusdDistributed: number;
  totalSurplus: number;
  currentAPY: number;
  plumePrice: number;
}

export default function SystemMetrics({
  totalStaked,
  totalPusdDistributed,
  totalSurplus,
  currentAPY,
  plumePrice
}: SystemMetricsProps) {
  const metrics = [
    {
      label: 'Total PLUME Staked',
      value: `${totalStaked.toFixed(2)} PLUME`,
      subtext: `≈ ${(totalStaked * plumePrice).toFixed(2)} pUSD`
    },
    {
      label: 'Total pUSD Distributed',
      value: `${totalPusdDistributed.toFixed(2)} pUSD`,
    },
    {
      label: 'Total Surplus',
      value: `${totalSurplus.toFixed(2)} pUSD`,
      className: totalSurplus >= 0 ? 'text-green-500' : 'text-red-500'
    },
    {
      label: 'Current Annual APY',
      value: `${currentAPY.toFixed(1)}%`,
    },
    {
      label: 'PLUME Price',
      value: `${plumePrice.toFixed(3)} pUSD`,
    }
  ];

  return (
    <>
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="p-6 bg-white dark:bg-black/30 rounded-lg border border-black/10 dark:border-white/10"
        >
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {metric.label}
          </h3>
          <p className={`mt-2 text-2xl font-semibold ${metric.className || ''}`}>
            {metric.value}
          </p>
          {metric.subtext && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {metric.subtext}
            </p>
          )}
        </div>
      ))}
    </>
  );
} 