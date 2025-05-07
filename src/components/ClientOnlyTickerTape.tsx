'use client'

import dynamic from 'next/dynamic';
import React from 'react';

const TickerTape = dynamic(() => import('./TickerTape'), {
  ssr: false,
  loading: () => <div className="w-full h-[40px]" />
});

type ClientOnlyTickerTapeProps = {
  theme?: 'light' | 'dark' | 'auto'
}

const ClientOnlyTickerTape = ({ theme = 'auto' }: ClientOnlyTickerTapeProps) => {
  return <TickerTape theme={theme} />;
};

export default ClientOnlyTickerTape;