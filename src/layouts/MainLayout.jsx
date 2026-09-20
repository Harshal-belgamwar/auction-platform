// src/layouts/MainLayout.jsx
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/navbar/Navbar';

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1  bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
}
