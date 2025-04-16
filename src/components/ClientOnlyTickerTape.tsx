'use client'

import dynamic from 'next/dynamic';
import React from 'react';

const TickerTape = dynamic(() => import('./TickerTape'), {
  ssr: false,
  loading: () => <div className="w-full h-[40px]" />
});

const ClientOnlyTickerTape = () => {
  return <TickerTape />;
};

export default ClientOnlyTickerTape; 