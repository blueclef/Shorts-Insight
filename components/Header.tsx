
import React from 'react';
import { ChevronDown, Bell } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="flex-shrink-0 bg-surface/50 backdrop-blur-sm border-b border-white/10 p-4 flex items-center justify-between z-10">
      <div>
        <h1 className="text-xl font-bold text-on-surface">Dashboard</h1>
        <p className="text-sm text-on-surface-variant">Welcome back, Creator!</p>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <select className="bg-surface border border-white/10 rounded-lg pl-3 pr-8 py-2 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary appearance-none">
            <option>My Awesome Channel</option>
            <option>Second Channel</option>
          </select>
          <ChevronDown className="h-4 w-4 absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" />
        </div>
        <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <Bell className="h-5 w-5 text-on-surface-variant" />
        </button>
        <img
          src="https://picsum.photos/seed/avatar/40/40"
          alt="User Avatar"
          className="h-10 w-10 rounded-full"
        />
      </div>
    </header>
  );
};

export default Header;
