import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/dashboard/Sidebar';
import { useState } from 'react';
import { Menu } from 'lucide-react';

export default function DashBoard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* Header for small screens */}
        <header className="flex items-center justify-between p-4 bg-white border-b lg:hidden">
          <button
            // onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-6 w-6 text-black" />
          </button>
          <h1 className="text-xl font-bold text-black">Dashboard</h1>
        </header>
        <main className="flex-1 overflow-y-auto ">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
