import React from 'react';
import DetailPage from '../components/DetailPage';
import ExcelExportButton from '../components/ExcelExportButton';

const BaseVulnerabilitiesPage: React.FC = () => {
  const totalScore = 67.5;
  const maxScore = 100;
  
  const scoreBreakdown = [
    {
      factor: 'SQL Injection Vulnerabilities',
      impact: 25.0,
      maxImpact: 30,
      description: 'Critical database security vulnerabilities that allow unauthorized data access',
      recommendations: [
        'Use parameterized queries and prepared statements',
        'Implement input validation and sanitization',
        'Apply principle of least privilege to database accounts',
        'Enable SQL injection detection in WAF'
      ]
    },
    {
      factor: 'Cross-Site Scripting (XSS)',
      impact: 18.5,
      maxImpact: 25,
      description: 'Client-side vulnerabilities allowing malicious script execution',
      recommendations: [
        'Implement Content Security Policy (CSP)',
        'Use output encoding for user-generated content',
        'Validate and sanitize all input data',
        'Enable XSS protection headers'
      ]
    },
    {
      factor: 'Authentication & Authorization Flaws',
      impact: 15.0,
      maxImpact: 20,
      description: 'Weaknesses in user authentication and access control mechanisms',
      recommendations: [
        'Implement multi-factor authentication',
        'Use strong password policies',
        'Apply role-based access control (RBAC)',
        'Regular security token rotation'
      ]
    },
    {
      factor: 'Insecure Direct Object References',
      impact: 9.0,
      maxImpact: 15,
      description: 'Direct access to internal objects without proper authorization checks',
      recommendations: [
        'Implement access control checks for all object references',
        'Use indirect reference maps',
        'Validate user permissions for each request',
        'Apply consistent authorization patterns'
      ]
    },
    {
      factor: 'Security Misconfiguration',
      impact: 8.5,
      maxImpact: 10,
      description: 'Improper security settings and configurations across the application stack',
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
      <h3 style={{ color: '#f1f5f9', marginBottom: '16px' }}>Vulnerability Trends</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <div style={{ background: 'rgba(51, 65, 85, 0.5)', padding: '16px', borderRadius: '8px' }}>
          <div style={{ color: '#ef4444', fontSize: '1.5rem', fontWeight: 'bold' }}>↗ +12%</div>
          <div style={{ color: '#cbd5e1', fontSize: '0.875rem' }}>vs Last Month</div>
        </div>
        <div style={{ background: 'rgba(51, 65, 85, 0.5)', padding: '16px', borderRadius: '8px' }}>
          <div style={{ color: '#f59e0b', fontSize: '1.5rem', fontWeight: 'bold' }}>23</div>
          <div style={{ color: '#cbd5e1', fontSize: '0.875rem' }}>Critical Issues</div>
        </div>
        <div style={{ background: 'rgba(51, 65, 85, 0.5)', padding: '16px', borderRadius: '8px' }}>
          <div style={{ color: '#10b981', fontSize: '1.5rem', fontWeight: 'bold' }}>7</div>
          <div style={{ color: '#cbd5e1', fontSize: '0.875rem' }}>Fixed This Week</div>
        </div>
      </div>
    </div>
  );

  return (
    <DetailPage
      title="Base Vulnerabilities"
      subtitle="Core security vulnerabilities in your application"
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
