import React from 'react';
import DetailPage from '../components/DetailPage';
import ExcelExportButton from '../components/ExcelExportButton';

const BaseVulnerabilitiesPage: React.FC = () => {
  const totalScore = 3.25; // Changed from 32.5/100 to 3.25/10
  const maxScore = 10;
  
  const scoreBreakdown = [
    {
      factor: 'SQL Injection Protection',
      impact: 7.5, // Changed from 75.0/100 to 7.5/10
      maxImpact: 10,
      description: 'Database security measures protecting against unauthorized data access',
      recommendations: [
        'Use parameterized queries and prepared statements',
        'Implement input validation and sanitization',
        'Apply principle of least privilege to database accounts',
        'Enable SQL injection detection in WAF'
      ]
    },
    {
      factor: 'Cross-Site Scripting (XSS) Protection',
      impact: 2.6, // Changed from 26.0/100 to 2.6/10
      maxImpact: 10,
      description: 'Client-side security measures preventing malicious script execution',
      recommendations: [
        'Implement Content Security Policy (CSP)',
        'Use output encoding for user-generated content',
        'Validate and sanitize all input data',
        'Enable XSS protection headers'
      ]
    },
    {
      factor: 'Authentication & Authorization Strength',
      impact: 2.5, // Changed from 25.0/100 to 2.5/10
      maxImpact: 10,
      description: 'User authentication and access control security measures',
      recommendations: [
        'Implement multi-factor authentication',
        'Use strong password policies',
        'Apply role-based access control (RBAC)',
        'Regular security token rotation'
      ]
    },
    {
      factor: 'Direct Object Reference Security',
      impact: 4.0, // Changed from 40.0/100 to 4.0/10
      maxImpact: 10,
      description: 'Authorization checks and secure object access patterns',
      recommendations: [
        'Implement access control checks for all object references',
        'Use indirect reference maps',
        'Validate user permissions for each request',
        'Apply consistent authorization patterns'
      ]
    },
    {
      factor: 'Security Configuration Strength',
      impact: 1.5, // Changed from 15.0/100 to 1.5/10
      maxImpact: 10,
      description: 'Proper security settings and configurations across the application stack',
      recommendations: [
        'Regular security configuration reviews',
        'Remove default accounts and passwords',
        'Disable unnecessary services and features',
        'Keep all software components updated'
      ]
    }
  ];

  const additionalInfo = (
    <div>
      <h3 style={{ color: '#f1f5f9', marginBottom: '16px' }}>Security Trends</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <div style={{ background: 'rgba(51, 65, 85, 0.5)', padding: '16px', borderRadius: '8px' }}>
          <div style={{ color: '#10b981', fontSize: '1.5rem', fontWeight: 'bold' }}>↗ +12%</div>
          <div style={{ color: '#cbd5e1', fontSize: '0.875rem' }}>Improvement vs Last Month</div>
        </div>
        <div style={{ background: 'rgba(51, 65, 85, 0.5)', padding: '16px', borderRadius: '8px' }}>
          <div style={{ color: '#f59e0b', fontSize: '1.5rem', fontWeight: 'bold' }}>23</div>
          <div style={{ color: '#cbd5e1', fontSize: '0.875rem' }}>Areas to Strengthen</div>
        </div>
        <div style={{ background: 'rgba(51, 65, 85, 0.5)', padding: '16px', borderRadius: '8px' }}>
          <div style={{ color: '#10b981', fontSize: '1.5rem', fontWeight: 'bold' }}>7</div>
          <div style={{ color: '#cbd5e1', fontSize: '0.875rem' }}>Improved This Week</div>
        </div>
      </div>
    </div>
  );

  return (
    <DetailPage
      title="Base Security Assessment"
      subtitle="Core security strengths in your application"
      icon="▲"
      totalScore={totalScore}
      maxScore={maxScore}
      scoreBreakdown={scoreBreakdown}
      additionalInfo={additionalInfo}
      exportButton={<ExcelExportButton pageType="base" vulnerabilityCount={23} />}
    />
  );
};

export default BaseVulnerabilitiesPage;
