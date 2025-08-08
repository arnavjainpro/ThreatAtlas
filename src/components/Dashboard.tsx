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

  // Initialize with actual data instead of loading state
  useEffect(() => {
    // Simulate vulnerability scan results - higher scores mean better security
    const vulnerabilityRisk = Math.random() * 10; // Raw vulnerability risk (0-10)
    const actionableRisk = Math.random() * 10; // Raw actionable risk (0-10)
    
    // Invert scores so higher values mean more secure
    const baseScore = 10 - vulnerabilityRisk;
    const actionableScore = 10 - actionableRisk;
    const totalScore = (baseScore + actionableScore) / 2; // Average for total score out of 10

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
    const totalScore = (baseScore + actionableScore) / 2; // Average for total score out of 10

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
          maxScore={10}
          type="total"
          onClick={() => navigate(`/dashboard/${appId}/total-vulnerability`)}
        />
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
          <span className={`status ${getSeverityClass(10 - vulnerabilityData.scores.totalScore, 10)}`}>
            {vulnerabilityData.scores.totalScore >= 8 ? 'Excellent Security' : 
             vulnerabilityData.scores.totalScore >= 6 ? 'Good Security' :
             vulnerabilityData.scores.totalScore >= 4 ? 'Moderate Security' : 'Needs Improvement'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
