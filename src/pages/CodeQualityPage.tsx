import React from 'react';
import DetailPage from '../components/DetailPage';

const CodeQualityPage: React.FC = () => {
  const totalScore = 32.8;
  const maxScore = 100;
  
  const scoreBreakdown = [
    {
      factor: 'Code Complexity',
      impact: 12.5,
      maxImpact: 25,
      description: 'High cyclomatic complexity indicating potential maintenance and security issues',
      recommendations: [
        'Refactor complex functions into smaller units',
        'Implement design patterns to reduce coupling',
        'Add comprehensive unit tests for complex logic',
        'Use static analysis tools to monitor complexity'
      ]
    },
    {
      factor: 'Security Hotspots',
      impact: 8.3,
      maxImpact: 20,
      description: 'Code patterns that commonly lead to security vulnerabilities',
      recommendations: [
        'Review all user input handling code',
        'Implement secure coding standards',
        'Use static application security testing (SAST)',
        'Regular code security training for developers'
      ]
    },
    {
      factor: 'Error Handling',
      impact: 7.0,
      maxImpact: 15,
      description: 'Insufficient or insecure error handling that may leak sensitive information',
      recommendations: [
        'Implement centralized error handling',
        'Avoid exposing stack traces to users',
        'Log errors securely for debugging',
        'Use generic error messages for user-facing errors'
      ]
    },
    {
      factor: 'Input Validation',
      impact: 5.0,
      maxImpact: 25,
      description: 'Missing or inadequate input validation across the application',
      recommendations: [
        'Implement whitelist-based input validation',
        'Use validation libraries consistently',
        'Validate on both client and server side',
        'Sanitize data before processing'
      ]
    }
  ];

  const additionalInfo = (
    <div>
      <h3 style={{ color: '#f1f5f9', marginBottom: '16px' }}>Code Quality Metrics</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <div style={{ background: 'rgba(51, 65, 85, 0.5)', padding: '16px', borderRadius: '8px' }}>
          <div style={{ color: '#f59e0b', fontSize: '1.5rem', fontWeight: 'bold' }}>15.2</div>
          <div style={{ color: '#cbd5e1', fontSize: '0.875rem' }}>Avg Complexity</div>
        </div>
        <div style={{ background: 'rgba(51, 65, 85, 0.5)', padding: '16px', borderRadius: '8px' }}>
          <div style={{ color: '#ef4444', fontSize: '1.5rem', fontWeight: 'bold' }}>23</div>
          <div style={{ color: '#cbd5e1', fontSize: '0.875rem' }}>Security Hotspots</div>
        </div>
        <div style={{ background: 'rgba(51, 65, 85, 0.5)', padding: '16px', borderRadius: '8px' }}>
          <div style={{ color: '#10b981', fontSize: '1.5rem', fontWeight: 'bold' }}>78%</div>
          <div style={{ color: '#cbd5e1', fontSize: '0.875rem' }}>Test Coverage</div>
        </div>
      </div>
    </div>
  );

  return (
    <DetailPage
      title="Code Quality"
      subtitle="Analysis of code security and maintainability"
      icon="◆"
      totalScore={totalScore}
      maxScore={maxScore}
      scoreBreakdown={scoreBreakdown}
      additionalInfo={additionalInfo}
    />
  );
};

export default CodeQualityPage;
