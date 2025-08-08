import React from 'react';
import DetailPage from '../components/DetailPage';

const DependenciesPage: React.FC = () => {
  const totalScore = 58.7;
  const maxScore = 100;
  
  const scoreBreakdown = [
    {
      factor: 'Critical Vulnerability Dependencies',
      impact: 22.0,
      maxImpact: 30,
      description: 'Dependencies with known critical security vulnerabilities',
      recommendations: [
        'Update lodash from 4.17.15 to 4.17.21 (CVE-2021-23337)',
        'Replace deprecated crypto-js with secure alternative',
        'Update express to latest version (multiple CVEs)',
        'Review and update all dependencies monthly'
      ]
    },
    {
      factor: 'Outdated Major Versions',
      impact: 18.5,
      maxImpact: 25,
      description: 'Dependencies running versions that are multiple major releases behind',
      recommendations: [
        'Upgrade React from v16 to v18',
        'Update Node.js to latest LTS version',
        'Plan migration strategy for breaking changes',
        'Set up automated dependency updates'
      ]
    },
    {
      factor: 'Unmaintained Packages',
      impact: 12.2,
      maxImpact: 20,
      description: 'Dependencies that are no longer actively maintained',
      recommendations: [
        'Replace moment.js with date-fns or dayjs',
        'Find alternative to deprecated request library',
        'Audit all packages for maintenance status',
        'Establish policy for unmaintained dependencies'
      ]
    },
    {
      factor: 'License Compliance Issues',
      impact: 6.0,
      maxImpact: 15,
      description: 'Dependencies with licenses that may not be compatible with your project',
      recommendations: [
        'Review GPL-licensed dependencies for compliance',
        'Document all dependency licenses',
        'Use license scanning tools in CI/CD',
        'Establish approved license whitelist'
      ]
    }
  ];

  const additionalInfo = (
    <div>
      <h3 style={{ color: '#f1f5f9', marginBottom: '16px' }}>Dependency Overview</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div style={{ background: 'rgba(51, 65, 85, 0.5)', padding: '16px', borderRadius: '8px' }}>
          <div style={{ color: '#ef4444', fontSize: '1.5rem', fontWeight: 'bold' }}>47</div>
          <div style={{ color: '#cbd5e1', fontSize: '0.875rem' }}>Vulnerable Packages</div>
        </div>
        <div style={{ background: 'rgba(51, 65, 85, 0.5)', padding: '16px', borderRadius: '8px' }}>
          <div style={{ color: '#f59e0b', fontSize: '1.5rem', fontWeight: 'bold' }}>156</div>
          <div style={{ color: '#cbd5e1', fontSize: '0.875rem' }}>Outdated Packages</div>
        </div>
        <div style={{ background: 'rgba(51, 65, 85, 0.5)', padding: '16px', borderRadius: '8px' }}>
          <div style={{ color: '#3b82f6', fontSize: '1.5rem', fontWeight: 'bold' }}>1,247</div>
          <div style={{ color: '#cbd5e1', fontSize: '0.875rem' }}>Total Dependencies</div>
        </div>
      </div>
      
      <div>
        <h4 style={{ color: '#f1f5f9', marginBottom: '12px' }}>High Priority Updates</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '12px', borderRadius: '6px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
            <span style={{ color: '#fca5a5', fontWeight: 'bold' }}>Critical:</span>
            <span style={{ color: '#cbd5e1', marginLeft: '8px' }}>lodash@4.17.15 → 4.17.21</span>
          </div>
          <div style={{ background: 'rgba(249, 115, 22, 0.1)', padding: '12px', borderRadius: '6px', border: '1px solid rgba(249, 115, 22, 0.3)' }}>
            <span style={{ color: '#fdba74', fontWeight: 'bold' }}>High:</span>
            <span style={{ color: '#cbd5e1', marginLeft: '8px' }}>express@4.17.1 → 4.18.2</span>
          </div>
          <div style={{ background: 'rgba(234, 179, 8, 0.1)', padding: '12px', borderRadius: '6px', border: '1px solid rgba(234, 179, 8, 0.3)' }}>
            <span style={{ color: '#fde047', fontWeight: 'bold' }}>Medium:</span>
            <span style={{ color: '#cbd5e1', marginLeft: '8px' }}>axios@0.21.1 → 1.4.0</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <DetailPage
      title="Dependencies"
      subtitle="Security analysis of third-party packages and libraries"
      icon="◼"
      totalScore={totalScore}
      maxScore={maxScore}
      scoreBreakdown={scoreBreakdown}
      additionalInfo={additionalInfo}
    />
  );
};

export default DependenciesPage;
