import React from 'react';
import './ExcelExportButton.css';

interface ExcelExportButtonProps {
  pageType: 'base' | 'actionable' | 'total';
  vulnerabilityCount?: number;
}

const ExcelExportButton: React.FC<ExcelExportButtonProps> = ({ 
  pageType, 
  vulnerabilityCount = 0 
}) => {
  const handleExportClick = () => {
    // Mock data based on page type
    const getMockData = () => {
      const baseData = [
        ['ID', 'Vulnerability', 'Severity', 'CVSS Score', 'Component', 'Status', 'First Detected'],
        ['CVE-2023-4567', 'SQL Injection', 'Critical', '9.8', 'Authentication Module', 'Open', '2024-01-15'],
        ['CVE-2023-3456', 'Cross-Site Scripting (XSS)', 'High', '7.2', 'User Interface', 'Open', '2024-01-18'],
        ['CVE-2023-2345', 'Buffer Overflow', 'High', '8.1', 'Data Processing', 'In Progress', '2024-01-20'],
        ['CVE-2023-1234', 'Path Traversal', 'Medium', '6.5', 'File Handler', 'Open', '2024-01-22'],
        ['CVE-2023-0123', 'Privilege Escalation', 'Critical', '9.1', 'Access Control', 'Open', '2024-01-25']
      ];

      const actionableData = [
        ['ID', 'Issue', 'Priority', 'Effort', 'Component', 'Remediation', 'Due Date'],
        ['ACT-001', 'Update OpenSSL Library', 'High', '2 hours', 'Security Layer', 'Update to v3.1.4', '2024-02-15'],
        ['ACT-002', 'Fix Input Validation', 'Critical', '4 hours', 'API Gateway', 'Implement sanitization', '2024-02-10'],
        ['ACT-003', 'Enable CSRF Protection', 'Medium', '1 hour', 'Web Framework', 'Configure middleware', '2024-02-20'],
        ['ACT-004', 'Update Dependencies', 'Low', '3 hours', 'Package Manager', 'Run npm audit fix', '2024-02-28'],
        ['ACT-005', 'Implement Rate Limiting', 'High', '6 hours', 'API Layer', 'Add throttling', '2024-02-12']
      ];

      const totalData = [
        ['Category', 'Vulnerability', 'Severity', 'Score', 'Status', 'Remediation Time', 'Business Impact'],
        ['Base', 'SQL Injection', 'Critical', '9.8', 'Open', '4 hours', 'High'],
        ['Base', 'XSS Vulnerability', 'High', '7.2', 'Open', '2 hours', 'Medium'],
        ['Actionable', 'Outdated SSL Certificate', 'High', '8.0', 'Scheduled', '1 hour', 'High'],
        ['Base', 'Buffer Overflow', 'High', '8.1', 'In Progress', '8 hours', 'High'],
        ['Actionable', 'Missing Security Headers', 'Medium', '5.5', 'Open', '30 minutes', 'Low'],
        ['Base', 'Privilege Escalation', 'Critical', '9.1', 'Open', '6 hours', 'Critical'],
        ['Actionable', 'Weak Password Policy', 'Medium', '6.0', 'Open', '2 hours', 'Medium']
      ];

      switch (pageType) {
        case 'base': return baseData;
        case 'actionable': return actionableData;
        case 'total': return totalData;
        default: return baseData;
      }
    };

    // Create CSV content
    const data = getMockData();
    const csvContent = data.map(row => 
      row.map(cell => `"${cell}"`).join(',')
    ).join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `${pageType}_vulnerabilities_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Show success message
    alert(`Successfully exported ${data.length - 1} vulnerability records to Excel file!`);
  };

  const getButtonText = () => {
    switch (pageType) {
      case 'base': return 'Export Base Vulnerabilities';
      case 'actionable': return 'Export Actionable Items';
      case 'total': return 'Export All Vulnerabilities';
      default: return 'Export to Excel';
    }
  };

  const getIcon = () => {
    return '📊'; // Excel/spreadsheet icon
  };

  return (
    <button 
      className="excel-export-btn"
      onClick={handleExportClick}
      title={`Export ${vulnerabilityCount} vulnerabilities to Excel`}
    >
      <span className="excel-export-btn__icon">{getIcon()}</span>
      <span className="excel-export-btn__text">{getButtonText()}</span>
      {vulnerabilityCount > 0 && (
        <span className="excel-export-btn__count">({vulnerabilityCount})</span>
      )}
    </button>
  );
};

export default ExcelExportButton;
