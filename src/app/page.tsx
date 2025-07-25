import React from 'react';
import ClientOnlyMobileDashboard from '@/components/ClientOnlyMobileDashboard';
import ClientOnlyTickerTape from '@/components/ClientOnlyTickerTape';

export default function Home() {

  const hour = typeof window !== 'undefined' ? new Date().getHours() : 12;
  const isNight = hour >= 19 || hour < 5;

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-12 lg:p-24">
      <div className={`w-full ${isNight ? 'bg-black' : ''}`}>
        <ClientOnlyTickerTape />
      </div>

      <div className="w-full max-w-7xl">
        <ClientOnlyMobileDashboard />
      </div>
    </main>
  );
}
