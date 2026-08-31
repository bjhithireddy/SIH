import React from 'react';
import { Outlet } from 'react-router-dom';
import { DriverHeader } from '../components/driver/DriverHeader';
import { DriverBottomNav } from '../components/driver/DriverBottomNav';

export const DriverLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-100 text-navy-950 font-sans flex flex-col selection:bg-govblue-600 selection:text-white">
      {/* Sticky Driver Header */}
      <DriverHeader />

      {/* Main Page Area */}
      <main className="flex-1 w-full max-w-md md:max-w-3xl mx-auto">
        <Outlet />
      </main>

      {/* Fixed Driver Bottom Navigation Bar */}
      <DriverBottomNav />
    </div>
  );
};
