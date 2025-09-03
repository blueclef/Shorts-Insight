
import React, { useState, useEffect } from 'react';
import KpiCard from './KpiCard';
import TrendChart from './TrendChart';
import TopShortsList from './TopShortsList';
import type { Kpi, TrendDataPoint, ShortVideo } from '../types';
import { getKpis, getTrendData, getTopShorts } from '../services/youtubeService';
import { Download } from 'lucide-react';

const SkeletonKpi = () => (
    <div className="bg-surface p-5 rounded-xl animate-pulse">
        <div className="h-6 bg-white/10 rounded w-3/4 mb-2"></div>
        <div className="h-8 bg-white/10 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-white/10 rounded w-1/4"></div>
    </div>
);

const Dashboard: React.FC = () => {
    const [kpis, setKpis] = useState<Kpi[]>([]);
    const [trendData, setTrendData] = useState<TrendDataPoint[]>([]);
    const [topShorts, setTopShorts] = useState<ShortVideo[]>([]);
    const [loading, setLoading] = useState(true);
    const [trendPeriod, setTrendPeriod] = useState<'30d' | '90d'>('30d');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const [kpiData, shortsData] = await Promise.all([
                getKpis(),
                getTopShorts(),
            ]);
            setKpis(kpiData);
            setTopShorts(shortsData);
            // Trend data is fetched separately to allow period switching
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchTrend = async () => {
            setLoading(true);
            const data = await getTrendData(trendPeriod);
            setTrendData(data);
            setLoading(false);
        }
        fetchTrend();
    }, [trendPeriod]);
    
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-on-surface">Performance Overview</h2>
                 <button className="flex items-center gap-2 bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity">
                    <Download className="h-4 w-4" />
                    Download PDF Report
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {loading ? (
                    Array.from({length: 4}).map((_, i) => <SkeletonKpi key={i} />)
                ) : (
                    kpis.map((kpi) => <KpiCard key={kpi.title} {...kpi} />)
                )}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2">
                    <TrendChart data={trendData} period={trendPeriod} setPeriod={setTrendPeriod} loading={loading} />
                </div>
                <div>
                    <TopShortsList shorts={topShorts} loading={loading} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
