
import React from 'react';
import type { Kpi } from '../types';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const KpiCard: React.FC<Kpi> = ({ title, value, change, icon: Icon }) => {
    const isPositive = change >= 0;
    return (
        <div className="bg-surface p-5 rounded-xl shadow-lg transition-transform hover:scale-105 duration-300">
            <div className="flex items-center justify-between">
                <p className="text-on-surface-variant font-medium">{title}</p>
                <Icon className="h-6 w-6 text-on-surface-variant" />
            </div>
            <p className="text-3xl font-bold text-on-surface mt-2">{value}</p>
            <div className="flex items-center mt-2">
                <div className={`flex items-center text-sm font-semibold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                    {isPositive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                    <span>{Math.abs(change)}%</span>
                </div>
                <span className="text-xs text-on-surface-variant ml-2">vs last 30 days</span>
            </div>
        </div>
    );
};

export default KpiCard;
