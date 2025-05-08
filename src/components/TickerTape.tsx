'use client'

import * as React from 'react'
import { useRef, useEffect, useState } from 'react'

type TickerTapeProps = {
  theme?: 'light' | 'dark' | 'auto'
}

const TickerTape = ({ theme = 'auto' }: TickerTapeProps) => {
  const container = useRef<HTMLDivElement>(null)
  const [colorTheme, setColorTheme] = useState<'light' | 'dark'>(theme === 'auto' ? 'light' : theme)

  useEffect(() => {
    if (theme === 'auto') {
      const hour = new Date().getHours()
      setColorTheme(hour >= 19 || hour < 5 ? 'dark' : 'light')
    } else {
      setColorTheme(theme)
    }
  }, [theme])

  useEffect(() => {
    if (!container.current) return

    const existingScript = container.current.querySelector('script')
    const existingWidget = container.current.querySelector('.tradingview-widget-container__widget')
    if (existingScript) {
      existingScript.remove()
    }
    if (existingWidget) {
      existingWidget.innerHTML = ''
    }

    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js'
    script.async = true
    script.innerHTML = JSON.stringify({
      symbols: [
        {
          proName: "BINANCE:BTCUSDT",
          title: "BTC",
        },
        {
          proName: "BINANCE:ETHUSDT",
          title: "ETH",
        },
        {
          proName: "BINANCE:SOLUSDT",
          title: "SOL",
        },
        {
          proName: "CBOE:VIXY",
          title: "VIX Volatility VIXY",
        },
      ],
      showSymbolLogo: true,
      isTransparent: true,
      displayMode: "adaptive",
      colorTheme: colorTheme,
      locale: "zh_TW",
    });

    container.current.appendChild(script)

    return () => {
      if (container.current) {
        const widgetContainer = container.current.querySelector('.tradingview-widget-container__widget')
        if (widgetContainer) {
          widgetContainer.innerHTML = ''
        }
        const scriptElement = container.current.querySelector('script')
        if (scriptElement) {
          scriptElement.remove()
        }
      }
    }
  }, [colorTheme])

  return (
    <div className="tradingview-widget-container md:min-h-10 min-h-18" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
}

export default TickerTape;