import React from 'react';
import DetailPage from '../components/DetailPage';

const ReportsPage: React.FC = () => {
  const totalScore = 82.1;
  const maxScore = 100;
  
  const scoreBreakdown = [
    {
      factor: 'Executive Dashboard',
      impact: 22.0,
      maxImpact: 25,
      description: 'High-level security metrics and KPIs for leadership',
      recommendations: [
        'Automated executive summary generation',
        'Real-time risk indicators',
        'Trend analysis and forecasting',
        'Business impact correlation'
      ]
    },
    {
      factor: 'Technical Reports',
      impact: 20.5,
      maxImpact: 25,
      description: 'Detailed technical findings and remediation guidance',
      recommendations: [
        'Comprehensive vulnerability details',
        'Step-by-step remediation procedures',
        'Code examples and best practices',
        'Integration with development workflows'
      ]
    },
    {
      factor: 'Compliance Reports',
      impact: 19.8,
      maxImpact: 25,
      description: 'Regulatory compliance status and audit trail',
      recommendations: [
        'Automated compliance mapping',
        'Evidence collection and storage',
        'Audit-ready documentation',
        'Continuous compliance monitoring'
      ]
    },
    {
      factor: 'Trend Analysis',
      impact: 19.8,
      maxImpact: 25,
      description: 'Historical data analysis and security posture trends',
      recommendations: [
        'Security metrics over time',
        'Comparative analysis capabilities',
        'Predictive risk modeling',
        'Benchmarking against industry standards'
      ]
    }
  ];

  const additionalInfo = (
    <div>
      <h3 style={{ color: '#f1f5f9', marginBottom: '16px' }}>Report Analytics</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <div style={{ background: 'rgba(51, 65, 85, 0.5)', padding: '16px', borderRadius: '8px' }}>
          <div style={{ color: '#10b981', fontSize: '1.5rem', fontWeight: 'bold' }}>156</div>
          <div style={{ color: '#cbd5e1', fontSize: '0.875rem' }}>Reports Generated</div>
        </div>
        <div style={{ background: 'rgba(51, 65, 85, 0.5)', padding: '16px', borderRadius: '8px' }}>
          <div style={{ color: '#3b82f6', fontSize: '1.5rem', fontWeight: 'bold' }}>24/7</div>
          <div style={{ color: '#cbd5e1', fontSize: '0.875rem' }}>Automated Monitoring</div>
        </div>
        <div style={{ background: 'rgba(51, 65, 85, 0.5)', padding: '16px', borderRadius: '8px' }}>
          <div style={{ color: '#f59e0b', fontSize: '1.5rem', fontWeight: 'bold' }}>45 min</div>
          <div style={{ color: '#cbd5e1', fontSize: '0.875rem' }}>Avg Report Generation</div>
        </div>
      </div>
    </div>
  );

  return (
    <DetailPage
      title="Reports"
      subtitle="Comprehensive security reporting and analytics"
      icon="▣"
      totalScore={totalScore}
      maxScore={maxScore}
      scoreBreakdown={scoreBreakdown}
      additionalInfo={additionalInfo}
    />
  );
};

export default ReportsPage;
