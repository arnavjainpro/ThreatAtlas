import React from 'react';
import DetailPage from '../components/DetailPage';

const CompliancePage: React.FC = () => {
  const totalScore = 73.2;
  const maxScore = 100;
  
  const scoreBreakdown = [
    {
      factor: 'GDPR Compliance',
      impact: 20.0,
      maxImpact: 25,
      description: 'General Data Protection Regulation compliance status',
      recommendations: [
        'Complete data mapping and classification',
        'Implement data subject rights procedures',
        'Update privacy policies and consent mechanisms',
        'Conduct privacy impact assessments'
      ]
    },
    {
      factor: 'SOC 2 Type II',
      impact: 18.5,
      maxImpact: 25,
      description: 'Service Organization Control 2 compliance framework',
      recommendations: [
        'Document security policies and procedures',
        'Implement continuous monitoring controls',
        'Conduct regular security training',
        'Prepare for annual audit assessment'
      ]
    },
    {
      factor: 'ISO 27001',
      impact: 15.0,
      maxImpact: 25,
      description: 'Information Security Management System standards',
      recommendations: [
        'Complete risk assessment documentation',
        'Implement information security controls',
        'Establish incident response procedures',
        'Regular management review meetings'
      ]
    },
    {
      factor: 'Industry Regulations',
      impact: 19.7,
      maxImpact: 25,
      description: 'Sector-specific regulatory compliance requirements',
      recommendations: [
        'Stay updated with regulatory changes',
        'Implement required security controls',
        'Maintain audit trails and documentation',
        'Regular compliance assessments'
      ]
    }
  ];

  return (
    <DetailPage
      title="Compliance"
      subtitle="Regulatory and standards compliance assessment"
      icon="◉"
      totalScore={totalScore}
      maxScore={maxScore}
      scoreBreakdown={scoreBreakdown}
    />
  );
};

export default CompliancePage;
