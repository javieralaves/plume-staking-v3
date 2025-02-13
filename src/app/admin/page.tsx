import AdminDashboard from '@/components/admin/AdminDashboard';
import Link from 'next/link';

export default function AdminPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <Link 
            href="/"
            className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 
                     rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 
                     transition-colors"
          >
            ← Back to Staking
          </Link>
        </div>
        <AdminDashboard />
      </div>
    </div>
  );
} 