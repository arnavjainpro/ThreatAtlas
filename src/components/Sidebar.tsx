import React, { useState, useEffect } from 'react';
import { NavLink, useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import './Sidebar.css';

interface SidebarProps {
  onToggle?: (isCollapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onToggle }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { appId } = useParams<{ appId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut } = useAuth();

  // Check if we're on a tool page
  const isOnToolPage = location.pathname.includes('/tools/');

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

  const handleLogout = async () => {
    // Use real authentication logout
    if (window.confirm('Are you sure you want to logout?')) {
      await signOut();
    }
  };

  useEffect(() => {
    // Only notify Layout component about manual toggle state, not hover
    // This prevents content shifting during hover
    onToggle?.(isCollapsed);
  }, [isCollapsed, onToggle]);

  // Function to get application name from appId
  const getApplicationName = (appId: string | undefined): string => {
    if (!appId) return 'Unknown App';
    
    const appNames: { [key: string]: string } = {
      'production-api': 'Production API',
      'web-app': 'Customer Web Portal',
      'mobile-api': 'Mobile App Backend',
      'admin-panel': 'Admin Dashboard',
      'staging-env': 'Staging Environment',
      'microservice-auth': 'Authentication Service',
      'payment-gateway': 'Payment Gateway',
      'notification-service': 'Notification Service',
      'data-analytics': 'Analytics Engine',
      'file-storage': 'File Storage API',
      'search-engine': 'Search Service',
      'inventory-system': 'Inventory Management',
      'chat-service': 'Chat Service',
      'reporting-engine': 'Reporting Engine',
      'backup-service': 'Backup Service',
      'monitoring-stack': 'Monitoring Stack'
    };
    
    return appNames[appId] || appId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  // Function to get mock server name based on appId
  const getServerName = (appId: string | undefined): string => {
    if (!appId) return 'us-east-1a';
    
    const serverNames: { [key: string]: string } = {
      'production-api': 'us-east-1a',
      'web-app': 'us-west-2b',
      'mobile-api': 'eu-west-1c',
      'admin-panel': 'us-east-1b',
      'staging-env': 'us-west-1a',
      'microservice-auth': 'ap-south-1a',
      'payment-gateway': 'us-east-1c',
      'notification-service': 'eu-central-1a',
      'data-analytics': 'us-west-2c',
      'file-storage': 'ap-southeast-1a',
      'search-engine': 'eu-west-2a',
      'inventory-system': 'us-central-1b',
      'chat-service': 'ap-northeast-1a',
      'reporting-engine': 'eu-west-3a',
      'backup-service': 'us-east-2a',
      'monitoring-stack': 'ca-central-1a'
    };
    
    return serverNames[appId] || 'us-east-1a';
  };

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
        {/* Back button */}
        {(!isCollapsed || isHovered) && (
          <button 
            className="sidebar__back-btn"
            onClick={() => navigate(isOnToolPage ? `/dashboard/${appId}` : '/')}
            title={isOnToolPage ? "Back to Dashboard" : "Back to Application Selection"}
          >
            <span className="back-icon">←</span>
            <span className="back-text">{isOnToolPage ? "Dashboard" : "Applications"}</span>
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
              <span className="status-text">{getApplicationName(appId)} • {getServerName(appId)}</span>
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
