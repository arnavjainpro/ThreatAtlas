import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import './ApplicationSelector.css';

interface Application {
  id: string;
  name: string;
  description: string;
  environment: string;
  lastScan: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  vulnerabilityCount: number;
  icon: string;
}

const ApplicationSelector: React.FC = () => {
  const navigate = useNavigate();
  const { signOut, user } = useAuth();
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [scrollOpacity, setScrollOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const maxScroll = 50; // Reduced from 80px - fade out completely by 50px
      
      if (scrollTop <= 0) {
        setScrollOpacity(1);
      } else if (scrollTop >= maxScroll) {
        setScrollOpacity(0);
      } else {
        // Calculate opacity based on scroll position (1 to 0)
        const opacity = 1 - (scrollTop / maxScroll);
        setScrollOpacity(Math.max(0, Math.min(1, opacity)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const applications: Application[] = [
    {
      id: 'production-api',
      name: 'Production API',
      description: 'Main REST API serving customer applications',
      environment: 'Production',
      lastScan: '2 hours ago',
      riskLevel: 'medium',
      vulnerabilityCount: 23,
      icon: '🔗'
    },
    {
      id: 'web-app',
      name: 'Customer Web Portal',
      description: 'Frontend application for customer interactions',
      environment: 'Production',
      lastScan: '4 hours ago',
      riskLevel: 'high',
      vulnerabilityCount: 31,
      icon: '🌐'
    },
    {
      id: 'mobile-api',
      name: 'Mobile App Backend',
      description: 'API services for iOS and Android applications',
      environment: 'Production',
      lastScan: '1 hour ago',
      riskLevel: 'low',
      vulnerabilityCount: 8,
      icon: '📱'
    },
    {
      id: 'admin-panel',
      name: 'Admin Dashboard',
      description: 'Internal administration and management system',
      environment: 'Production',
      lastScan: '6 hours ago',
      riskLevel: 'critical',
      vulnerabilityCount: 45,
      icon: '⚙️'
    },
    {
      id: 'staging-env',
      name: 'Staging Environment',
      description: 'Pre-production testing and validation environment',
      environment: 'Staging',
      lastScan: '12 hours ago',
      riskLevel: 'medium',
      vulnerabilityCount: 19,
      icon: '🧪'
    },
    {
      id: 'microservice-auth',
      name: 'Authentication Service',
      description: 'Centralized authentication and authorization service',
      environment: 'Production',
      lastScan: '3 hours ago',
      riskLevel: 'high',
      vulnerabilityCount: 27,
      icon: '🔐'
    }
  ];

  const handleApplicationSelect = (appId: string) => {
    setSelectedApp(appId);
    // Navigate to the dashboard with the selected application context
    navigate(`/dashboard/${appId}`);
  };

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to logout?')) {
      await signOut();
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'critical': return '#dc2626';
      case 'high': return '#ea580c';
      case 'medium': return '#d97706';
      case 'low': return '#16a34a';
      default: return '#6b7280';
    }
  };

  const getRiskLabel = (riskLevel: string) => {
    return riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1) + ' Risk';
  };

  return (
    <div className="app-selector">
      <div 
        className="app-selector__header"
        style={{ opacity: scrollOpacity }}
      >
        <div className="header__brand">
          <div className="brand-icon">TA</div>
          <div className="brand-text">
            <h1 className="brand-title">ThreatAtlas</h1>
            <p className="brand-subtitle">Security Platform</p>
          </div>
        </div>
        <div className="header__info">
          <p className="info-text">Select an application to view its security assessment</p>
        </div>
        <div className="header__user">
          <div className="user-info">
            <span className="user-email">{user?.email}</span>
            <button className="logout-btn" onClick={handleLogout} title="Logout">
              <span className="logout-icon">⏻</span>
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="app-selector__content">
        <div className="content__title-section">
          <h2 className="content-title">Your Applications</h2>
          <p className="content-subtitle">
            Choose an application below to access its detailed security dashboard
          </p>
        </div>

        <div className="applications-grid">
          {applications.map((app) => (
            <div
              key={app.id}
              className={`application-card ${selectedApp === app.id ? 'application-card--selected' : ''}`}
              onClick={() => handleApplicationSelect(app.id)}
            >
              <div className="card__header">
                <div className="card__icon">{app.icon}</div>
                <div className="card__badge" data-env={app.environment.toLowerCase()}>
                  {app.environment}
                </div>
              </div>
              
              <div className="card__content">
                <h3 className="card__title">{app.name}</h3>
                <p className="card__description">{app.description}</p>
              </div>

              <div className="card__metrics">
                <div className="metric">
                  <span className="metric__label">Vulnerabilities</span>
                  <span className="metric__value">{app.vulnerabilityCount}</span>
                </div>
                <div className="metric">
                  <span className="metric__label">Risk Level</span>
                  <span 
                    className="metric__value metric__value--risk"
                    style={{ color: getRiskColor(app.riskLevel) }}
                  >
                    {getRiskLabel(app.riskLevel)}
                  </span>
                </div>
              </div>

              <div className="card__footer">
                <span className="last-scan">Last scan: {app.lastScan}</span>
                <div className="card__arrow">→</div>
              </div>
            </div>
          ))}
        </div>

        <div className="app-selector__actions">
          <button className="action-btn action-btn--secondary">
            <span className="btn-icon">+</span>
            Add New Application
          </button>
          <button className="action-btn action-btn--primary">
            <span className="btn-icon">📊</span>
            View Global Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationSelector;
