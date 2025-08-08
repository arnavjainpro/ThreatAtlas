import React from 'react';
import DetailPage from '../components/DetailPage';

const ThreatModelingPage: React.FC = () => {
  const totalScore = 28.6;
  const maxScore = 100;
  
  const scoreBreakdown = [
    {
      factor: 'Asset Identification',
      impact: 8.5,
      maxImpact: 20,
      description: 'Critical assets and data flow mapping completeness',
      recommendations: [
        'Complete asset inventory and classification',
        'Map all data flows and trust boundaries',
        'Identify high-value targets',
        'Document system architecture diagrams'
      ]
    },
    {
      factor: 'Threat Identification',
      impact: 7.2,
      maxImpact: 25,
      description: 'Comprehensive threat landscape analysis',
      recommendations: [
        'Use STRIDE methodology for threat modeling',
        'Analyze current threat intelligence',
        'Consider insider threats and supply chain risks',
        'Regular threat landscape updates'
      ]
    },
    {
      factor: 'Risk Assessment',
      impact: 6.5,
      maxImpact: 25,
      description: 'Quantitative and qualitative risk analysis',
      recommendations: [
        'Implement risk scoring methodology',
        'Consider business impact and likelihood',
        'Prioritize risks based on severity',
        'Regular risk reassessment cycles'
      ]
    },
    {
      factor: 'Mitigation Strategies',
      impact: 6.4,
      maxImpact: 30,
      description: 'Effectiveness of implemented security controls',
      recommendations: [
        'Develop comprehensive mitigation plans',
        'Implement defense in depth strategy',
        'Regular control effectiveness testing',
        'Continuous improvement process'
      ]
    }
  ];

  return (
    <DetailPage
      title="Threat Modeling"
      subtitle="Comprehensive threat analysis and risk assessment"
      icon="◈"
      totalScore={totalScore}
      maxScore={maxScore}
      scoreBreakdown={scoreBreakdown}
    />
  );
};

export default ThreatModelingPage;
