
import React from 'react';
import { LayoutDashboard, BarChart3, FileText, Settings, Youtube } from 'lucide-react';
import type { View } from '../types';

interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView }) => {
  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'heatmap', icon: BarChart3, label: 'Upload Time Analysis' },
    { id: 'reports', icon: FileText, label: 'Reports' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <aside className="w-64 bg-surface flex-shrink-0 p-4 flex-col hidden md:flex">
      <div className="flex items-center space-x-2 mb-10 p-2">
        <Youtube className="h-8 w-8 text-primary" />
        <span className="text-xl font-bold text-on-surface">Shorts Insight</span>
      </div>
      <nav className="flex-1">
        <ul>
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setCurrentView(item.id as View)}
                className={`w-full flex items-center space-x-3 p-3 my-1 rounded-lg transition-colors duration-200 ${
                  currentView === item.id
                    ? 'bg-primary text-white shadow-lg'
                    : 'text-on-surface-variant hover:bg-white/10'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto p-4 bg-white/5 rounded-lg text-center">
          <p className="text-sm text-on-surface-variant mb-2">You are on the <span className="font-bold text-primary">Starter</span> plan.</p>
          <button className="w-full bg-gradient-to-r from-primary to-secondary text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity">
              Upgrade Plan
          </button>
      </div>
    </aside>
  );
};

export default Sidebar;
