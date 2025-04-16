"use client";

import React, { useEffect, useRef, memo } from 'react';

interface TradingViewWidgetProps {
  symbol: string;
  widgetOptions?: Record<string, any>;
}

const defaultWidgetOptions = {
  scriptSrc: "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js",
  settings: {
    interval: "5m",
    width: 425,
    isTransparent: false,
    height: 380,
    showIntervalTabs: true,
    displayMode: "single",
    locale: "zh_TW",
    colorTheme: "light",
  }
};

const TradingViewWidget: React.FC<TradingViewWidgetProps> = ({
  symbol,
  widgetOptions = {},
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptAddedRef = useRef<boolean>(false);

  useEffect(() => {
    if (!containerRef.current || scriptAddedRef.current) {
      return;
    }

    const mergedOptions = {
      ...defaultWidgetOptions.settings,
      ...widgetOptions,
      symbol: symbol,
    };

    const scriptSrc = widgetOptions.scriptSrc || defaultWidgetOptions.scriptSrc;

    const script = document.createElement('script');
    script.src = scriptSrc;
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify(mergedOptions);

    containerRef.current.appendChild(script);
    scriptAddedRef.current = true;

    return () => {
      if (containerRef.current && script.parentNode === containerRef.current) {
        try {
          containerRef.current.removeChild(script);
          const widgetContainer = containerRef.current.querySelector('.tradingview-widget-container__widget');
           if (widgetContainer && widgetContainer.firstChild) {
               widgetContainer.removeChild(widgetContainer.firstChild);
           }
        } catch (error) {
          console.error("Error removing TradingView script:", error);
        } finally {
            scriptAddedRef.current = false;
        }
      }
    };
  }, [symbol, widgetOptions]);

  const containerStyle: React.CSSProperties = {
    height: widgetOptions.height || defaultWidgetOptions.settings.height || 'auto',
    width: widgetOptions.width || defaultWidgetOptions.settings.width || 'auto',
  };

  return (
    <div className="tradingview-widget-container" style={containerStyle}>
      <div ref={containerRef} className="tradingview-widget-container__widget" style={{ height: '100%', width: '100%' }}>
      </div>
    </div>
  );
};

export default memo(TradingViewWidget); 