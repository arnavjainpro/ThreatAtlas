import React from 'react';
import DetailPage from '../components/DetailPage';
import ExcelExportButton from '../components/ExcelExportButton';

const ActionableItemsPage: React.FC = () => {
  const totalScore = 45.2;
  const maxScore = 100;
  
  const scoreBreakdown = [
    {
      factor: 'Outdated Dependencies',
      impact: 15.5,
      maxImpact: 25,
      description: 'Third-party packages with known security vulnerabilities',
      recommendations: [
        'Update all packages to latest stable versions',
        'Implement automated dependency scanning',
        'Set up alerts for new vulnerability disclosures',
        'Consider alternative packages for high-risk dependencies'
      ]
    },
    {
      factor: 'Missing Security Headers',
      impact: 12.0,
      maxImpact: 20,
      description: 'HTTP security headers that should be implemented for better protection',
      recommendations: [
        'Add Strict-Transport-Security header',
        'Implement Content-Security-Policy',
        'Set X-Frame-Options to prevent clickjacking',
        'Add X-Content-Type-Options header'
      ]
    },
    {
      factor: 'Weak Password Policies',
      impact: 8.5,
      maxImpact: 15,
      description: 'Current password requirements are below security best practices',
      recommendations: [
        'Enforce minimum 12 character passwords',
        'Require mix of uppercase, lowercase, numbers, symbols',
        'Implement password history to prevent reuse',
        'Add password strength meter to UI'
      ]
    },
    {
      factor: 'Insufficient Logging',
      impact: 6.2,
      maxImpact: 20,
      description: 'Missing security event logging and monitoring capabilities',
      recommendations: [
        'Log all authentication attempts',
        'Implement security event monitoring',
        'Set up automated alerts for suspicious activities',
        'Ensure log integrity and secure storage'
      ]
    },
    {
      factor: 'Unencrypted Data Transmission',
      impact: 3.0,
      maxImpact: 20,
      description: 'Some data transmitted without proper encryption',
      recommendations: [
        'Enforce HTTPS for all endpoints',
        'Implement TLS 1.3 for better security',
        'Use certificate pinning for mobile apps',
        'Encrypt sensitive data before transmission'
      ]
    }
  ];

  const additionalInfo = (
    <div>
      <h3 style={{ color: '#f1f5f9', marginBottom: '16px' }}>Remediation Progress</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <div style={{ background: 'rgba(51, 65, 85, 0.5)', padding: '16px', borderRadius: '8px' }}>
          <div style={{ color: '#10b981', fontSize: '1.5rem', fontWeight: 'bold' }}>67%</div>
          <div style={{ color: '#cbd5e1', fontSize: '0.875rem' }}>Items Resolved</div>
        </div>
        <div style={{ background: 'rgba(51, 65, 85, 0.5)', padding: '16px', borderRadius: '8px' }}>
          <div style={{ color: '#f59e0b', fontSize: '1.5rem', fontWeight: 'bold' }}>15</div>
          <div style={{ color: '#cbd5e1', fontSize: '0.875rem' }}>In Progress</div>
        </div>
        <div style={{ background: 'rgba(51, 65, 85, 0.5)', padding: '16px', borderRadius: '8px' }}>
          <div style={{ color: '#3b82f6', fontSize: '1.5rem', fontWeight: 'bold' }}>3.2 days</div>
          <div style={{ color: '#cbd5e1', fontSize: '0.875rem' }}>Avg Resolution Time</div>
        </div>
      </div>
      
      <div style={{ marginTop: '24px' }}>
        <h4 style={{ color: '#f1f5f9', marginBottom: '12px' }}>Quick Wins</h4>
        <ul style={{ color: '#cbd5e1', paddingLeft: '20px' }}>
          <li style={{ marginBottom: '8px' }}>Enable HTTPS redirect (5 minutes)</li>
          <li style={{ marginBottom: '8px' }}>Add security headers to nginx config (10 minutes)</li>
          <li style={{ marginBottom: '8px' }}>Update npm dependencies (15 minutes)</li>
          <li>Configure password strength requirements (20 minutes)</li>
        </ul>
      </div>
    </div>
  );

  return (
    <DetailPage
      title="Actionable Items"
      subtitle="Security improvements that can be implemented immediately"
      icon="●"
      totalScore={totalScore}
      maxScore={maxScore}
      scoreBreakdown={scoreBreakdown}
      additionalInfo={additionalInfo}
      exportButton={<ExcelExportButton pageType="actionable" vulnerabilityCount={15} />}
    />
  );
};

export default ActionableItemsPage;
