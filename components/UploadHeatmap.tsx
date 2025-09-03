
import React, { useState, useEffect } from 'react';
import { getHeatmapData } from '../services/youtubeService';
import type { HeatmapDataPoint } from '../types';

const SkeletonHeatmap = () => (
    <div className="animate-pulse">
        <div className="grid grid-cols-7 gap-1 mt-4">
            {Array.from({length: 7 * 24}).map((_, i) => (
                <div key={i} className="w-full aspect-square bg-white/10 rounded-sm"></div>
            ))}
        </div>
    </div>
);

const UploadHeatmap: React.FC = () => {
    const [data, setData] = useState<HeatmapDataPoint[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const heatmapData = await getHeatmapData();
            setData(heatmapData);
            setLoading(false);
        };
        fetchData();
    }, []);

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const hours = Array.from({ length: 24 }, (_, i) => i);

    const maxViews = Math.max(...data.map(d => d.value), 1);

    const getColor = (value: number) => {
        const intensity = Math.min(value / (maxViews * 0.8), 1); // Cap intensity to make peaks stand out
        if (intensity === 0) return 'bg-surface';
        if (intensity < 0.2) return 'bg-primary/20';
        if (intensity < 0.4) return 'bg-primary/40';
        if (intensity < 0.6) return 'bg-primary/60';
        if (intensity < 0.8) return 'bg-primary/80';
        return 'bg-primary';
    };

    return (
        <div className="bg-surface p-6 rounded-xl shadow-lg">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-on-surface">Upload Time Analysis</h2>
                    <p className="text-on-surface-variant mt-1">Discover the best times to publish your Shorts based on average views.</p>
                </div>
                 <div className="bg-primary/20 border border-primary/50 p-4 rounded-lg text-center">
                    <p className="text-sm text-primary font-medium">Optimal Upload Time</p>
                    <p className="text-xl font-bold text-on-surface mt-1">Saturday, 8:00 PM</p>
                </div>
            </div>
            
            {loading ? <SkeletonHeatmap /> : (
                <div className="overflow-x-auto">
                    <div className="grid grid-cols-[auto_1fr] gap-2 items-center" style={{minWidth: '700px'}}>
                        {/* Empty corner */}
                        <div></div>
                        {/* Hour labels */}
                        <div className="grid grid-cols-24 gap-1">
                            {hours.map(hour => (
                                <div key={hour} className="text-center text-xs text-on-surface-variant">
                                    {hour % 2 === 0 ? `${hour.toString().padStart(2, '0')}` : ''}
                                </div>
                            ))}
                        </div>
                        
                        {/* Day labels and heatmap grid */}
                        {days.map(day => (
                            <React.Fragment key={day}>
                                <div className="text-right text-xs text-on-surface-variant pr-2">{day}</div>
                                <div className="grid grid-cols-24 gap-1">
                                    {hours.map(hour => {
                                        const point = data.find(d => d.day === day && d.hour === hour);
                                        const value = point ? point.value : 0;
                                        return (
                                            <div key={`${day}-${hour}`} className="w-full aspect-square relative group">
                                                <div className={`w-full h-full rounded-sm ${getColor(value)} transition-colors`}></div>
                                                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-background border border-white/10 px-2 py-1 rounded-md text-xs text-on-surface whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                                    {value.toLocaleString()} views
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            )}

            <div className="flex items-center justify-end space-x-4 mt-4 text-sm text-on-surface-variant">
                <span>Less Active</span>
                <div className="flex items-center space-x-1">
                    <div className="w-4 h-4 rounded-sm bg-primary/20"></div>
                    <div className="w-4 h-4 rounded-sm bg-primary/40"></div>
                    <div className="w-4 h-4 rounded-sm bg-primary/60"></div>
                    <div className="w-4 h-4 rounded-sm bg-primary/80"></div>
                    <div className="w-4 h-4 rounded-sm bg-primary"></div>
                </div>
                <span>More Active</span>
            </div>
        </div>
    );
};

export default UploadHeatmap;
