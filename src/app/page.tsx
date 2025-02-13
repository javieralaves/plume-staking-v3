import Link from 'next/link';
import StakeForm from "@/components/StakeForm";
import CycleStats from "@/components/CycleStats";
import TimeControl from "@/components/TimeControl";

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-end mb-8">
          <Link
            href="/admin"
            className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 
                     rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 
                     transition-colors"
          >
            Admin Dashboard →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <StakeForm />
          </div>
          <div className="space-y-4">
            <TimeControl />
            <CycleStats />
          </div>
        </div>
      </div>
    </div>
  );
}
