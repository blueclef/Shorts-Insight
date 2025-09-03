
import type { Kpi, TrendDataPoint, ShortVideo, HeatmapDataPoint } from '../types';
import { Eye, ThumbsUp, MessageCircle, UserPlus, BarChart2 } from 'lucide-react';

const MOCK_SHORTS: ShortVideo[] = [
    { id: '1', thumbnailUrl: 'https://picsum.photos/seed/short1/270/480', title: '🤯 You WON\'T BELIEVE this magic trick!', views: 1200000, retention: 85, likesRatio: 98.5 },
    { id: '2', thumbnailUrl: 'https://picsum.photos/seed/short2/270/480', title: 'My Cutest Puppy Moments 🐶 #shorts', views: 850000, retention: 72, likesRatio: 99.1 },
    { id: '3', thumbnailUrl: 'https://picsum.photos/seed/short3/270/480', title: '5-Minute Healthy Breakfast Idea 🍓', views: 620000, retention: 91, likesRatio: 97.2 },
    { id: '4', thumbnailUrl: 'https://picsum.photos/seed/short4/270/480', title: 'Epic Drone Shots of Iceland\'s Volcanoes', views: 580000, retention: 65, likesRatio: 96.8 },
    { id: '5', thumbnailUrl: 'https://picsum.photos/seed/short5/270/480', title: 'Trying the VIRAL TikTok dance challenge', views: 450000, retention: 78, likesRatio: 95.3 },
    { id: '6', thumbnailUrl: 'https://picsum.photos/seed/short6/270/480', title: 'DIY Room Decor on a Budget', views: 320000, retention: 88, likesRatio: 98.0 },
];

export const getKpis = async (): Promise<Kpi[]> => {
    await new Promise(res => setTimeout(res, 500));
    return [
        { title: 'Total Views', value: '2.8M', change: 12.5, icon: Eye },
        { title: 'Avg. View Duration', value: '42s', change: -2.1, icon: BarChart2 },
        { title: 'CTR', value: '15.2%', change: 8.3, icon: ThumbsUp },
        { title: 'Subscribers Gained', value: '+1.2K', change: 5.7, icon: UserPlus },
    ];
};

export const getTrendData = async (period: '30d' | '90d'): Promise<TrendDataPoint[]> => {
    await new Promise(res => setTimeout(res, 800));
    const days = period === '30d' ? 30 : 90;
    return Array.from({ length: days }).map((_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (days - i - 1));
        return {
            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            views: Math.floor(Math.random() * 20000) + 50000 + i * 500,
            likes: Math.floor(Math.random() * 2000) + 4000 + i * 50,
            comments: Math.floor(Math.random() * 100) + 200 + i * 5,
        };
    });
};

export const getTopShorts = async (): Promise<ShortVideo[]> => {
    await new Promise(res => setTimeout(res, 600));
    return MOCK_SHORTS.sort((a, b) => b.views - a.views).slice(0, 5);
};


export const getHeatmapData = async (): Promise<HeatmapDataPoint[]> => {
    await new Promise(res => setTimeout(res, 1000));
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const data: HeatmapDataPoint[] = [];
    days.forEach(day => {
        for (let hour = 0; hour < 24; hour++) {
            let value = Math.floor(Math.random() * 5000);
            // Simulate peak times
            if (['Fri', 'Sat', 'Sun'].includes(day) && hour >= 18 && hour <= 22) {
                value = Math.floor(Math.random() * 10000) + 15000;
            } else if (hour >= 12 && hour <= 14) {
                 value = Math.floor(Math.random() * 5000) + 8000;
            }
             else if (hour >= 19 && hour <= 21) {
                 value = Math.floor(Math.random() * 7000) + 10000;
            }
            data.push({ day, hour, value });
        }
    });
    return data;
};
