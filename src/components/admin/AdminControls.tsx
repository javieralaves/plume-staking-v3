export default function AdminControls() {
  return (
    <div className="p-6 bg-white dark:bg-black/30 rounded-lg border border-black/10 dark:border-white/10">
      <h2 className="text-lg font-semibold mb-4">Admin Controls</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Weekly APY Target
          </label>
          <input
            type="number"
            className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-black/20 
                     border border-gray-200 dark:border-gray-700"
            placeholder="5.00%"
            disabled
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            PLUME Price (pUSD)
          </label>
          <input
            type="number"
            className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-black/20 
                     border border-gray-200 dark:border-gray-700"
            placeholder="0.12"
            disabled
          />
        </div>

        <button
          disabled
          className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg 
                   opacity-50 cursor-not-allowed"
        >
          Update Settings
        </button>

        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium mb-2">Emergency Actions</h3>
          <button
            disabled
            className="w-full px-4 py-2 bg-red-500 text-white rounded-lg 
                     opacity-50 cursor-not-allowed"
          >
            Force Distribute Rewards
          </button>
        </div>
      </div>
    </div>
  );
} 