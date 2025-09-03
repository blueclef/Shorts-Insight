
import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import type { ShortVideo } from '../types';
import { generateSuccessFactorTag } from '../services/geminiService';

const SkeletonShortItem = () => (
    <div className="flex items-center space-x-4 animate-pulse">
        <div className="w-16 h-28 bg-white/10 rounded-md"></div>
        <div className="flex-1 space-y-2">
            <div className="h-4 bg-white/10 rounded w-full"></div>
            <div className="h-4 bg-white/10 rounded w-3/4"></div>
            <div className="h-6 bg-white/10 rounded w-1/2 mt-2"></div>
        </div>
    </div>
)

interface SuccessTagProps {
    video: ShortVideo;
}
const SuccessTag: React.FC<SuccessTagProps> = ({ video }) => {
    const [tag, setTag] = useState<string>('Analyzing...');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTag = async () => {
            setLoading(true);
            const generatedTag = await generateSuccessFactorTag(video);
            setTag(generatedTag);
            setLoading(false);
        };
        fetchTag();
    }, [video]);

    if (loading) {
        return <div className="h-6 w-24 bg-white/10 rounded-full animate-pulse"></div>;
    }

    return (
        <div className="flex items-center space-x-1.5 bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-semibold">
            <Sparkles className="h-3 w-3" />
            <span>{tag}</span>
        </div>
    );
};

interface TopShortsListProps {
    shorts: ShortVideo[];
    loading: boolean;
}

const TopShortsList: React.FC<TopShortsListProps> = ({ shorts, loading }) => {
    return (
        <div className="bg-surface p-6 rounded-xl shadow-lg h-[400px]">
            <h3 className="text-lg font-bold text-on-surface mb-4">Top 5 Shorts</h3>
            <div className="space-y-4">
                {loading ? (
                    Array.from({length: 5}).map((_, i) => <SkeletonShortItem key={i} />)
                ) : (
                    shorts.map((short) => (
                        <div key={short.id} className="flex items-center space-x-4">
                            <img src={short.thumbnailUrl} alt={short.title} className="w-12 h-20 object-cover rounded-md" />
                            <div className="flex-1">
                                <p className="text-sm font-medium text-on-surface truncate">{short.title}</p>
                                <div className="flex items-center text-xs text-on-surface-variant space-x-2 mt-1">
                                    <span>{short.views.toLocaleString()} views</span>
                                    <span>•</span>
                                    <span>{short.retention}% retention</span>
                                </div>
                                <div className="mt-2">
                                     <SuccessTag video={short} />
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default TopShortsList;
