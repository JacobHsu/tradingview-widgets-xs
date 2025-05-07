import React from 'react';
import ClientOnlyMobileDashboard from '@/components/ClientOnlyMobileDashboard';
import ClientOnlyTickerTape from '@/components/ClientOnlyTickerTape';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-12 lg:p-24">
      <div className="w-full">
        <ClientOnlyTickerTape theme="auto" />
      </div>

      <div className="w-full max-w-7xl">
        <ClientOnlyMobileDashboard />
      </div>
    </main>
  );
}
