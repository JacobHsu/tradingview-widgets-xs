"use client";

import React from 'react';
import TradingViewWidget from './TradingViewWidget'; 


const symbols = [
  "BINANCE:BTCUSDT",
  "BINANCE:ETHUSDT",
  "BINANCE:SOLUSDT",
];

const MobileDashboard: React.FC = () => {
  return (
    <div className="p-2 md:p-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {symbols.map((symbol) => (
          <div key={symbol}>
            <TradingViewWidget
              symbol={symbol}
              widgetOptions={{
                // 保持寬度 100% 以填滿網格單元
                width: "100%",
                height: 340, 
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileDashboard; 