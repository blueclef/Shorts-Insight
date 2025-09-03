// FIX: Import React to resolve the "Cannot find namespace 'React'" error.
import type React from 'react';

export interface Kpi {
  title: string;
  value: string;
  change: number;
  icon: React.ElementType;
}

export interface TrendDataPoint {
  date: string;
  views: number;
  likes: number;
  comments: number;
}

export interface ShortVideo {
  id: string;
  thumbnailUrl: string;
  title: string;
  views: number;
  retention: number;
  likesRatio: number;
}

export interface HeatmapDataPoint {
  day: string;
  hour: number;
  value: number; // Represents avg. views, ctr, etc.
}

export type View = 'dashboard' | 'heatmap' | 'reports' | 'settings';