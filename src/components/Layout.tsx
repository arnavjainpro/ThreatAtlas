import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import './Layout.css';

const Layout: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    const handleSidebarToggle = (event: CustomEvent) => {
      setIsSidebarCollapsed(event.detail.isCollapsed);
    };

    window.addEventListener('sidebar-toggle', handleSidebarToggle as EventListener);
    
    return () => {
      window.removeEventListener('sidebar-toggle', handleSidebarToggle as EventListener);
    };
  }, []);

  return (
    <div className="layout">
      <Sidebar onToggle={setIsSidebarCollapsed} />
      <main className={`layout__main ${isSidebarCollapsed ? 'layout__main--sidebar-collapsed' : ''}`}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
