import React, { useState, useEffect } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import './Sidebar.css';

interface SidebarProps {
  onToggle?: (isCollapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onToggle }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { appId } = useParams<{ appId: string }>();
  const navigate = useNavigate();

  const handleToggle = () => {
    const newCollapsed = !isCollapsed;
    setIsCollapsed(newCollapsed);
    onToggle?.(newCollapsed);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleLogout = () => {
    // In a real application, this would handle logout logic
    // For now, we'll show an alert
    if (window.confirm('Are you sure you want to logout?')) {
      alert('Logout functionality would be implemented here');
      // window.location.href = '/login';
    }
  };

  useEffect(() => {
    // Only notify Layout component about manual toggle state, not hover
    // This prevents content shifting during hover
    onToggle?.(isCollapsed);
  }, [isCollapsed, onToggle]);

  const menuItems = [
    {
      path: `/dashboard/${appId}`,
      icon: '■',
      label: 'Dashboard',
      description: 'Security Overview'
    },
    {
      path: `/dashboard/${appId}/base-vulnerabilities`,
      icon: '▲',
      label: 'Base Vulnerabilities',
      description: 'Core Security Issues'
    },
    {
      path: `/dashboard/${appId}/actionable-items`,
      icon: '●',
      label: 'Actionable Items',
      description: 'Remediable Issues'
    },
    {
      path: `/dashboard/${appId}/total-vulnerability`,
      icon: '◉',
      label: 'Total Assessment',
      description: 'Combined Risk Analysis'
    },
    {
      path: `/dashboard/${appId}/code-quality`,
      icon: '◆',
      label: 'Code Quality',
      description: 'Code Analysis'
    },
    {
      path: `/dashboard/${appId}/dependencies`,
      icon: '◼',
      label: 'Dependencies',
      description: 'Package Security'
    },
    {
      path: `/dashboard/${appId}/infrastructure`,
      icon: '▼',
      label: 'Infrastructure',
      description: 'System Security'
    },
    {
      path: `/dashboard/${appId}/compliance`,
      icon: '◉',
      label: 'Compliance',
      description: 'Standards & Regulations'
    },
    {
      path: `/dashboard/${appId}/threat-modeling`,
      icon: '◈',
      label: 'Threat Modeling',
      description: 'Risk Assessment'
    },
    {
      path: `/dashboard/${appId}/reports`,
      icon: '▣',
      label: 'Reports',
      description: 'Security Analytics'
    }
  ];

  return (
    <aside 
      className={`sidebar ${isCollapsed && !isHovered ? 'sidebar--collapsed' : ''} ${isHovered && isCollapsed ? 'sidebar--hover-expanded' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="sidebar__header">
        {/* Back to Applications button */}
        {(!isCollapsed || isHovered) && (
          <button 
            className="sidebar__back-btn"
            onClick={() => navigate('/')}
            title="Back to Application Selection"
          >
            <span className="back-icon">←</span>
            <span className="back-text">Applications</span>
          </button>
        )}
        
        <div className="sidebar__brand">
          <div className="brand-icon">TA</div>
          {(!isCollapsed || isHovered) && (
            <div className="brand-text">
              <h2 className="sidebar__title">ThreatAtlas</h2>
              <p className="sidebar__subtitle">Security Platform</p>
            </div>
          )}
        </div>
      </div>

      {/* System Monitoring Indicator */}
      <div className="sidebar__system-info">
        {(!isCollapsed || isHovered) ? (
          <div className="system-info">
            <div className="system-info__header">
              <span className="system-status-dot system-status-dot--active"></span>
              <span className="system-info__title">Monitoring</span>
            </div>
            <div className="system-info__details">
              <span className="system-name">Production API</span>
              <span className="system-env">AWS us-east-1</span>
            </div>
          </div>
        ) : (
          <div className="system-info-collapsed" title="Monitoring: Production API (AWS us-east-1)">
            <span className="system-status-dot system-status-dot--active"></span>
          </div>
        )}
      </div>
      
      <nav className="sidebar__nav">
        <ul className="sidebar__menu">
          {menuItems.map((item, index) => (
            <li key={item.path} className="sidebar__menu-item">
              <NavLink 
                to={item.path} 
                className={({ isActive }) => 
                  `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
                }
                end={index === 0} // Add end prop only for the Dashboard (first item)
                title={(isCollapsed && !isHovered) ? item.label : undefined}
              >
                <span className="sidebar__icon">{item.icon}</span>
                {(!isCollapsed || isHovered) && (
                  <div className="sidebar__content">
                    <span className="sidebar__label">{item.label}</span>
                    <span className="sidebar__description">{item.description}</span>
                  </div>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Toggle button repositioned after navigation */}
      <div className="sidebar__toggle-section">
        <button 
          className="sidebar__toggle sidebar__toggle--bottom"
          onClick={handleToggle}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <span className={`toggle-icon ${isCollapsed ? 'toggle-icon--collapsed' : ''}`}>
            ◀
          </span>
          {(!isCollapsed || isHovered) && <span className="toggle-text">Collapse</span>}
        </button>
      </div>
      
      <div className="sidebar__footer">
        {(!isCollapsed || isHovered) ? (
          <>
            <div className="sidebar__status">
              <div className="status-indicator status-indicator--active"></div>
              <span className="status-text">System Online</span>
            </div>
            <button 
              className="sidebar__logout-btn"
              onClick={handleLogout}
              title="Logout"
            >
              <span className="logout-icon">⏻</span>
              <span className="logout-text">Logout</span>
            </button>
          </>
        ) : (
          <button 
            className="sidebar__logout-btn sidebar__logout-btn--collapsed"
            onClick={handleLogout}
            title="Logout"
          >
            <span className="logout-icon">⏻</span>
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
