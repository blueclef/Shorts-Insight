
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { TrendDataPoint } from '../types';

interface TrendChartProps {
    data: TrendDataPoint[];
    period: '30d' | '90d';
    setPeriod: (period: '30d' | '90d') => void;
    loading: boolean;
}

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface/80 backdrop-blur-sm p-3 border border-white/10 rounded-lg shadow-lg">
        <p className="label font-bold text-on-surface">{`${label}`}</p>
        {payload.map((pld: any) => (
            <p key={pld.dataKey} style={{ color: pld.color }}>
                {`${pld.name}: ${pld.value.toLocaleString()}`}
            </p>
        ))}
      </div>
    );
  }
  return null;
};

const TrendChart: React.FC<TrendChartProps> = ({ data, period, setPeriod, loading }) => {
    if (loading) {
        return (
             <div className="bg-surface p-6 rounded-xl shadow-lg h-[400px] animate-pulse flex items-center justify-center">
                <p className="text-on-surface-variant">Loading Chart Data...</p>
             </div>
        )
    }
    
    return (
        <div className="bg-surface p-6 rounded-xl shadow-lg h-[400px]">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-on-surface">Performance Trends</h3>
                <div className="flex items-center space-x-1 bg-white/5 p-1 rounded-lg">
                    <button 
                        onClick={() => setPeriod('30d')}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${period === '30d' ? 'bg-primary text-white' : 'text-on-surface-variant'}`}
                    >
                        Last 30 Days
                    </button>
                    <button 
                        onClick={() => setPeriod('90d')}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${period === '90d' ? 'bg-primary text-white' : 'text-on-surface-variant'}`}
                    >
                        Last 90 Days
                    </button>
                </div>
            </div>
            <ResponsiveContainer width="100%" height="85%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff1a" />
                    <XAxis dataKey="date" stroke="#9e9e9e" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#9e9e9e" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{fontSize: "14px"}} />
                    <Line type="monotone" dataKey="views" stroke="#6366f1" strokeWidth={2} dot={false} name="Views" />
                    <Line type="monotone" dataKey="likes" stroke="#a855f7" strokeWidth={2} dot={false} name="Likes" />
                    <Line type="monotone" dataKey="comments" stroke="#34d399" strokeWidth={2} dot={false} name="Comments" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TrendChart;
