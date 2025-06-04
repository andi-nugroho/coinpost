import React, { useEffect, useRef } from 'react';
import { createChart, ColorType } from 'lightweight-charts';

interface PriceChartProps {
  data: { time: string; value: number }[];
  height?: number;
}

const PriceChart: React.FC<PriceChartProps> = ({ data, height = 200 }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#103045',
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { color: '#103045', style: 3 },
      },
      width: chartContainerRef.current.clientWidth,
      height: height,
    });

    const areaSeries = chart.addAreaSeries({
      lineColor: '#A5DEFF',
      topColor: '#A5DEFF',
      bottomColor: 'rgba(165, 222, 255, 0.1)',
    });

    areaSeries.setData(data);

    chart.timeScale().fitContent();

    chartRef.current = chart;

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [data, height]);

  return <div ref={chartContainerRef} />;
};

export default PriceChart;
