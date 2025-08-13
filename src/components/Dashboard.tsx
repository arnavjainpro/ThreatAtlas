import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ScoreCard from './ScoreCard';
import type { VulnerabilityData } from '../types/vulnerability';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { appId } = useParams<{ appId: string }>();
  
  // Application-specific configurations
  const getApplicationConfig = (appId: string | undefined) => {
    const configs: Record<string, { name: string; environment: string; icon: string }> = {
      'production-api': { name: 'Production API', environment: 'Production', icon: '🔗' },
      'web-app': { name: 'Customer Web Portal', environment: 'Production', icon: '🌐' },
      'mobile-api': { name: 'Mobile App Backend', environment: 'Production', icon: '📱' },
      'admin-panel': { name: 'Admin Dashboard', environment: 'Production', icon: '⚙️' },
      'staging-env': { name: 'Staging Environment', environment: 'Staging', icon: '🧪' },
      'microservice-auth': { name: 'Authentication Service', environment: 'Production', icon: '🔐' }
    };
    return configs[appId || 'production-api'] || configs['production-api'];
  };

  const appConfig = getApplicationConfig(appId);
  const [vulnerabilityData, setVulnerabilityData] = useState<VulnerabilityData>({
    projectName: 'Sample Project',
    scanDate: new Date().toLocaleDateString(),
    scores: {
      baseVulnerableScore: 0,
      actionableScore: 0,
      totalScore: 0
    },
    details: {
      criticalVulnerabilities: 0,
      highVulnerabilities: 0,
      mediumVulnerabilities: 0,
      lowVulnerabilities: 0,
      actionableItems: 0
    }
  });

  // Security testing tools configuration
  const securityTools = [
    {
      id: 'zap',
      name: 'ZAP',
      description: 'OWASP ZAP Scanner',
      icon: '🕷️',
      color: '#4299e1',
      vulnerabilities: {
        low: Math.floor(Math.random() * 15) + 5,
        medium: Math.floor(Math.random() * 10) + 3,
        high: Math.floor(Math.random() * 8) + 2
      }
    },
    {
      id: 'nessus',
      name: 'Nessus',
      description: 'Vulnerability Scanner',
      icon: '🔍',
      color: '#48bb78',
      vulnerabilities: {
        low: Math.floor(Math.random() * 12) + 4,
        medium: Math.floor(Math.random() * 7) + 2,
        high: Math.floor(Math.random() * 5) + 1
      }
    },
    {
      id: 'burp',
      name: 'Burp Suite',
      description: 'Web Application Security',
      icon: '🔒',
      color: '#ed8936',
      vulnerabilities: {
        low: Math.floor(Math.random() * 8) + 2,
        medium: Math.floor(Math.random() * 6) + 1,
        high: Math.floor(Math.random() * 4) + 1
      }
    },
    {
      id: 'nikto',
      name: 'Nikto',
      description: 'Web Server Scanner',
      icon: '🌐',
      color: '#9f7aea',
      vulnerabilities: {
        low: Math.floor(Math.random() * 10) + 3,
        medium: Math.floor(Math.random() * 5) + 2,
        high: Math.floor(Math.random() * 3) + 1
      }
    },
    {
      id: 'sqlmap',
      name: 'SQLMap',
      description: 'SQL Injection Testing',
      icon: '💉',
      color: '#e53e3e',
      vulnerabilities: {
        low: Math.floor(Math.random() * 6) + 1,
        medium: Math.floor(Math.random() * 4) + 1,
        high: Math.floor(Math.random() * 2) + 0
      }
    },
    {
      id: 'wpscan',
      name: 'WPScan',
      description: 'WordPress Security',
      icon: '📝',
      color: '#38b2ac',
      vulnerabilities: {
        low: Math.floor(Math.random() * 7) + 2,
        medium: Math.floor(Math.random() * 3) + 1,
        high: Math.floor(Math.random() * 2) + 0
      }
    },
    {
      id: 'nmap',
      name: 'Nmap',
      description: 'Network Discovery & Security',
      icon: '🗺️',
      color: '#319795',
      vulnerabilities: {
        low: Math.floor(Math.random() * 12) + 3,
        medium: Math.floor(Math.random() * 6) + 2,
        high: Math.floor(Math.random() * 3) + 1
      }
    },
    {
      id: 'metasploit',
      name: 'Metasploit',
      description: 'Penetration Testing Framework',
      icon: '⚔️',
      color: '#d53f8c',
      vulnerabilities: {
        low: Math.floor(Math.random() * 8) + 2,
        medium: Math.floor(Math.random() * 5) + 2,
        high: Math.floor(Math.random() * 4) + 1
      }
    },
    {
      id: 'openvas',
      name: 'OpenVAS',
      description: 'Vulnerability Assessment',
      icon: '🛡️',
      color: '#00b894',
      vulnerabilities: {
        low: Math.floor(Math.random() * 14) + 4,
        medium: Math.floor(Math.random() * 8) + 3,
        high: Math.floor(Math.random() * 5) + 2
      }
    },
    {
      id: 'acunetix',
      name: 'Acunetix',
      description: 'Web Vulnerability Scanner',
      icon: '🕸️',
      color: '#667eea',
      vulnerabilities: {
        low: Math.floor(Math.random() * 11) + 3,
        medium: Math.floor(Math.random() * 7) + 2,
        high: Math.floor(Math.random() * 4) + 1
      }
    },
    {
      id: 'wapiti',
      name: 'Wapiti',
      description: 'Web Application Auditor',
      icon: '🐛',
      color: '#f093fb',
      vulnerabilities: {
        low: Math.floor(Math.random() * 9) + 2,
        medium: Math.floor(Math.random() * 5) + 1,
        high: Math.floor(Math.random() * 3) + 0
      }
    },
    {
      id: 'nuclei',
      name: 'Nuclei',
      description: 'Fast Vulnerability Scanner',
      icon: '⚡',
      color: '#ffd93d',
      vulnerabilities: {
        low: Math.floor(Math.random() * 13) + 4,
        medium: Math.floor(Math.random() * 8) + 2,
        high: Math.floor(Math.random() * 5) + 1
      }
    },
    {
      id: 'qualys',
      name: 'Qualys',
      description: 'Cloud Security Platform',
      icon: '☁️',
      color: '#74b9ff',
      vulnerabilities: {
        low: Math.floor(Math.random() * 16) + 5,
        medium: Math.floor(Math.random() * 9) + 3,
        high: Math.floor(Math.random() * 6) + 2
      }
    },
    {
      id: 'rapid7',
      name: 'Rapid7',
      description: 'InsightVM Security',
      icon: '🚀',
      color: '#6c5ce7',
      vulnerabilities: {
        low: Math.floor(Math.random() * 14) + 4,
        medium: Math.floor(Math.random() * 8) + 3,
        high: Math.floor(Math.random() * 5) + 2
      }
    },
    {
      id: 'checkmarx',
      name: 'Checkmarx',
      description: 'Static Code Analysis',
      icon: '📋',
      color: '#fd79a8',
      vulnerabilities: {
        low: Math.floor(Math.random() * 10) + 3,
        medium: Math.floor(Math.random() * 6) + 2,
        high: Math.floor(Math.random() * 4) + 1
      }
    },
    {
      id: 'sonarqube',
      name: 'SonarQube',
      description: 'Code Quality & Security',
      icon: '🔬',
      color: '#00cec9',
      vulnerabilities: {
        low: Math.floor(Math.random() * 12) + 4,
        medium: Math.floor(Math.random() * 7) + 2,
        high: Math.floor(Math.random() * 3) + 1
      }
    }
  ];

  // Initialize with actual data instead of loading state
  useEffect(() => {
    // Simulate vulnerability scan results - higher scores mean better security
    const vulnerabilityRisk = Math.random() * 10; // Raw vulnerability risk (0-10)
    const actionableRisk = Math.random() * 10; // Raw actionable risk (0-10)
    
    // Invert scores so higher values mean more secure
    const baseScore = 10 - vulnerabilityRisk;
    const actionableScore = 10 - actionableRisk;
    const totalScore = Math.round((baseScore + actionableScore) * 10) / 10; // Sum of base and actionable scores, rounded to 1 decimal

    setVulnerabilityData({
      projectName: `${appConfig.name} - ${appConfig.environment}`,
      scanDate: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      scores: {
        baseVulnerableScore: baseScore,
        actionableScore: actionableScore,
        totalScore: totalScore
      },
      details: {
        criticalVulnerabilities: Math.floor(Math.random() * 20) + 5,
        highVulnerabilities: Math.floor(Math.random() * 15) + 10,
        mediumVulnerabilities: Math.floor(Math.random() * 25) + 15,
        lowVulnerabilities: Math.floor(Math.random() * 10) + 2,
        actionableItems: Math.floor(Math.random() * 30) + 20
      }
    });
  }, []);

  const handleRecalculate = () => {
    // Immediate recalculation without loading state - higher scores mean better security
    const vulnerabilityRisk = Math.random() * 10; // Raw vulnerability risk (0-10)
    const actionableRisk = Math.random() * 10; // Raw actionable risk (0-10)
    
    // Invert scores so higher values mean more secure
    const baseScore = 10 - vulnerabilityRisk;
    const actionableScore = 10 - actionableRisk;
    const totalScore = Math.round((baseScore + actionableScore) * 10) / 10; // Sum of base and actionable scores, rounded to 1 decimal

    setVulnerabilityData(prev => ({
      ...prev,
      scanDate: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      scores: {
        baseVulnerableScore: baseScore,
        actionableScore: actionableScore,
        totalScore: totalScore
      },
      details: {
        criticalVulnerabilities: Math.floor(Math.random() * 20) + 5,
        highVulnerabilities: Math.floor(Math.random() * 15) + 10,
        mediumVulnerabilities: Math.floor(Math.random() * 25) + 15,
        lowVulnerabilities: Math.floor(Math.random() * 10) + 2,
        actionableItems: Math.floor(Math.random() * 30) + 20
      }
    }));
  };

  const getSeverityClass = (score: number, maxScore: number) => {
    const ratio = score / maxScore;
    if (ratio >= 0.8) return 'severity--critical';
    if (ratio >= 0.6) return 'severity--high';
    if (ratio >= 0.4) return 'severity--medium';
    return 'severity--low';
  };

  return (
    <div className="dashboard dashboard--with-sidebar">
      <div className="dashboard__header">
        <div className="dashboard__title-section">
          <div>
            <h1 className="dashboard__title">Security Overview</h1>
            <p className="dashboard__subtitle">Real-time vulnerability assessment dashboard</p>
          </div>
        </div>
        <button 
          className="dashboard__recalculate-btn"
          onClick={handleRecalculate}
        >
          ↻ Refresh Analysis
        </button>
      </div>

      <div className="dashboard__scores">
        <ScoreCard
          title="Base Security Score"
          subtitle="Core security strength assessment"
          score={vulnerabilityData.scores.baseVulnerableScore}
          maxScore={10}
          type="base"
          onClick={() => navigate(`/dashboard/${appId}/base-vulnerabilities`)}
        />
        
        <ScoreCard
          title="Actionable Security Score"
          subtitle="Proactive security measures"
          score={vulnerabilityData.scores.actionableScore}
          maxScore={10}
          type="actionable"
          onClick={() => navigate(`/dashboard/${appId}/actionable-items`)}
        />
        
        <ScoreCard
          title="Total Security Score"
          subtitle="Overall security posture"
          score={vulnerabilityData.scores.totalScore}
          maxScore={20}
          type="total"
          onClick={() => navigate(`/dashboard/${appId}/total-vulnerability`)}
        />
      </div>

      {/* Security Testing Tools Section */}
      <div className="dashboard__tools">
        <h3 className="tools__title">Security Testing Tools</h3>
        <div className="tools__grid">
          {securityTools.map((tool) => (
            <div 
              key={tool.id} 
              className="tool-button" 
              style={{ borderColor: tool.color }}
              onClick={() => navigate(`/dashboard/${appId}/tools/${tool.id}`)}
            >
              <span className="tool-button__icon">{tool.icon}</span>
              <span className="tool-button__name">{tool.name}</span>
              
              {/* Hover Tooltip */}
              <div className="tool-tooltip">
                <div className="tool-tooltip__header">
                  <span className="tool-tooltip__icon">{tool.icon}</span>
                  <div>
                    <div className="tool-tooltip__name">{tool.name}</div>
                    <div className="tool-tooltip__description">{tool.description}</div>
                  </div>
                </div>
                <div className="tool-tooltip__vulnerabilities">
                  <div className="vulnerability-item vulnerability-item--low">
                    <span className="vulnerability-item__label">Low</span>
                    <span className="vulnerability-item__value">{tool.vulnerabilities.low}</span>
                  </div>
                  <div className="vulnerability-item vulnerability-item--medium">
                    <span className="vulnerability-item__label">Medium</span>
                    <span className="vulnerability-item__value">{tool.vulnerabilities.medium}</span>
                  </div>
                  <div className="vulnerability-item vulnerability-item--high">
                    <span className="vulnerability-item__label">High</span>
                    <span className="vulnerability-item__value">{tool.vulnerabilities.high}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {vulnerabilityData.details && (
        <div className="dashboard__details">
          <h3 className="details__title">Vulnerability Breakdown</h3>
          <div className="details__grid">
            <div className="detail-item detail-item--critical">
              <span className="detail-item__label">Critical</span>
              <span className="detail-item__value">{vulnerabilityData.details.criticalVulnerabilities}</span>
            </div>
            <div className="detail-item detail-item--high">
              <span className="detail-item__label">High</span>
              <span className="detail-item__value">{vulnerabilityData.details.highVulnerabilities}</span>
            </div>
            <div className="detail-item detail-item--medium">
              <span className="detail-item__label">Medium</span>
              <span className="detail-item__value">{vulnerabilityData.details.mediumVulnerabilities}</span>
            </div>
            <div className="detail-item detail-item--low">
              <span className="detail-item__label">Low</span>
              <span className="detail-item__value">{vulnerabilityData.details.lowVulnerabilities}</span>
            </div>
            <div className="detail-item detail-item--actionable">
              <span className="detail-item__label">Actionable Items</span>
              <span className="detail-item__value">{vulnerabilityData.details.actionableItems}</span>
            </div>
          </div>
        </div>
      )}

      <div className="dashboard__info">
        <div className="dashboard__project-info">
          <h2 className="project-name">{vulnerabilityData.projectName}</h2>
          <p className="scan-date">Last scan: {vulnerabilityData.scanDate}</p>
        </div>
      </div>

      <div className="dashboard__footer">
        <p className="footer__text">
          Powered by ThreatAtlas Security Engine • 
          <span className={`status ${getSeverityClass(20 - vulnerabilityData.scores.totalScore, 20)}`}>
            {vulnerabilityData.scores.totalScore >= 16 ? 'Excellent Security' : 
             vulnerabilityData.scores.totalScore >= 12 ? 'Good Security' :
             vulnerabilityData.scores.totalScore >= 8 ? 'Moderate Security' : 'Needs Improvement'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
