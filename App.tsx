
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import UploadHeatmap from './components/UploadHeatmap';
import Header from './components/Header';
import type { View } from './types';


const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'heatmap':
        return <UploadHeatmap />;
      case 'reports':
        return <div className="text-center p-8">Reports Feature Coming Soon!</div>;
      case 'settings':
        return <div className="text-center p-8">Settings Feature Coming Soon!</div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-background font-sans">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <main className="flex-1 flex flex-col overflow-y-auto">
        <Header />
        <div className="p-4 sm:p-6 lg:p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
