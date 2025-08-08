import React from 'react';
import DetailPage from '../components/DetailPage';

const InfrastructurePage: React.FC = () => {
  const totalScore = 41.3;
  const maxScore = 100;
  
  const scoreBreakdown = [
    {
      factor: 'Server Hardening',
      impact: 15.0,
      maxImpact: 25,
      description: 'Security configuration of servers and infrastructure components',
      recommendations: [
        'Disable unnecessary services and ports',
        'Implement fail2ban for intrusion prevention',
        'Configure proper firewall rules',
        'Enable audit logging for system events'
      ]
    },
    {
      factor: 'Network Security',
      impact: 12.3,
      maxImpact: 25,
      description: 'Network-level security controls and segmentation',
      recommendations: [
        'Implement network segmentation',
        'Configure VPN for remote access',
        'Set up intrusion detection system (IDS)',
        'Regular network vulnerability scanning'
      ]
    },
    {
      factor: 'Access Control',
      impact: 8.0,
      maxImpact: 20,
      description: 'User access management and privilege escalation controls',
      recommendations: [
        'Implement principle of least privilege',
        'Regular access review and cleanup',
        'Use centralized identity management',
        'Enable multi-factor authentication for admin access'
      ]
    },
    {
      factor: 'Backup & Recovery',
      impact: 6.0,
      maxImpact: 15,
      description: 'Data backup integrity and disaster recovery procedures',
      recommendations: [
        'Test backup restoration procedures regularly',
        'Implement automated backup monitoring',
        'Encrypt backups both in transit and at rest',
        'Document and test disaster recovery plan'
      ]
    }
  ];

  const additionalInfo = (
    <div>
      <h3 style={{ color: '#f1f5f9', marginBottom: '16px' }}>Infrastructure Status</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div style={{ background: 'rgba(51, 65, 85, 0.5)', padding: '16px', borderRadius: '8px' }}>
          <div style={{ color: '#10b981', fontSize: '1.5rem', fontWeight: 'bold' }}>99.9%</div>
          <div style={{ color: '#cbd5e1', fontSize: '0.875rem' }}>Uptime</div>
        </div>
        <div style={{ background: 'rgba(51, 65, 85, 0.5)', padding: '16px', borderRadius: '8px' }}>
          <div style={{ color: '#f59e0b', fontSize: '1.5rem', fontWeight: 'bold' }}>12</div>
          <div style={{ color: '#cbd5e1', fontSize: '0.875rem' }}>Open Ports</div>
        </div>
        <div style={{ background: 'rgba(51, 65, 85, 0.5)', padding: '16px', borderRadius: '8px' }}>
          <div style={{ color: '#ef4444', fontSize: '1.5rem', fontWeight: 'bold' }}>3</div>
          <div style={{ color: '#cbd5e1', fontSize: '0.875rem' }}>Unpatched Systems</div>
        </div>
      </div>
    </div>
  );

  return (
    <DetailPage
      title="Infrastructure"
      subtitle="Security assessment of servers, networks, and system components"
      icon="▼"
      totalScore={totalScore}
      maxScore={maxScore}
      scoreBreakdown={scoreBreakdown}
      additionalInfo={additionalInfo}
    />
  );
};

export default InfrastructurePage;
