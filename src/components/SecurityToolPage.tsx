import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SecurityScanService } from '../services/securityScanService';
import { securityScanSupabase } from '../lib/supabase';
import ExcelExportButton from './ExcelExportButton';
import RunScanButton from './RunScanButton';
import './SecurityToolPage.css';

interface SecurityTool {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  category: string;
  capabilities: string[];
  supportedTargets: string[];
}

interface Vulnerability {
  id: string;
  title: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  cvss: number;
  cve?: string;
  description: string;
  location: string;
  status: 'Open' | 'Fixed' | 'In Progress' | 'False Positive';
  firstDetected: string;
  lastSeen: string;
  recommendation: string;
  scan_time: string;
  application_id: string;
}

const SecurityToolPage: React.FC = () => {
  const { appId, toolId } = useParams<{ appId: string; toolId: string }>();
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([]);
  const [filteredVulnerabilities, setFilteredVulnerabilities] = useState<Vulnerability[]>([]);
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [loading, setLoading] = useState(false);
  const [isZapTool, setIsZapTool] = useState(false);

  const toolsConfig: Record<string, SecurityTool> = {
    zap: {
      id: 'zap',
      name: 'OWASP ZAP',
      description: 'The OWASP Zed Attack Proxy (ZAP) is one of the world\'s most popular free security tools.',
      icon: '🕷️',
      color: '#4299e1',
      category: 'Web Application Security',
      capabilities: ['Dynamic Application Security Testing (DAST)', 'Automated Security Scanning', 'Manual Testing Tools', 'API Security Testing'],
      supportedTargets: ['Web Applications', 'REST APIs', 'GraphQL APIs', 'WebSocket Applications']
    },
    nessus: {
      id: 'nessus',
      name: 'Nessus',
      description: 'Nessus is a comprehensive vulnerability scanner that identifies vulnerabilities, configuration issues, and malware.',
      icon: '🔍',
      color: '#48bb78',
      category: 'Vulnerability Assessment',
      capabilities: ['Network Vulnerability Scanning', 'Compliance Auditing', 'Malware Detection', 'Configuration Assessment'],
      supportedTargets: ['Network Infrastructure', 'Operating Systems', 'Databases', 'Web Applications']
    },
    burp: {
      id: 'burp',
      name: 'Burp Suite',
      description: 'Burp Suite is an integrated platform for performing security testing of web applications.',
      icon: '🔒',
      color: '#ed8936',
      category: 'Web Application Security',
      capabilities: ['Manual Security Testing', 'Automated Scanning', 'Request Interception', 'Vulnerability Assessment'],
      supportedTargets: ['Web Applications', 'Mobile Applications', 'APIs', 'Web Services']
    },
    nikto: {
      id: 'nikto',
      name: 'Nikto',
      description: 'Nikto is an Open Source web server scanner which performs comprehensive tests for web servers.',
      icon: '🌐',
      color: '#9f7aea',
      category: 'Web Server Security',
      capabilities: ['Web Server Scanning', 'CGI Scanning', 'Plugin-based Testing', 'SSL Certificate Analysis'],
      supportedTargets: ['Web Servers', 'HTTP Services', 'HTTPS Services', 'Virtual Hosts']
    },
    sqlmap: {
      id: 'sqlmap',
      name: 'SQLMap',
      description: 'SQLMap is an open source penetration testing tool that automates SQL injection detection and exploitation.',
      icon: '💉',
      color: '#e53e3e',
      category: 'Database Security',
      capabilities: ['SQL Injection Detection', 'Database Fingerprinting', 'Data Extraction', 'File System Access'],
      supportedTargets: ['Web Applications', 'Database Systems', 'REST APIs', 'Form Parameters']
    },
    wpscan: {
      id: 'wpscan',
      name: 'WPScan',
      description: 'WPScan is a free, for non-commercial use, black box WordPress vulnerability scanner.',
      icon: '📝',
      color: '#38b2ac',
      category: 'CMS Security',
      capabilities: ['WordPress Vulnerability Scanning', 'Plugin/Theme Analysis', 'User Enumeration', 'Brute Force Testing'],
      supportedTargets: ['WordPress Sites', 'WooCommerce Stores', 'WordPress Multisite', 'Custom WordPress Apps']
    },
    nmap: {
      id: 'nmap',
      name: 'Nmap',
      description: 'Nmap is a network discovery and security auditing tool used to discover hosts and services on a network.',
      icon: '🗺️',
      color: '#319795',
      category: 'Network Security',
      capabilities: ['Network Discovery', 'Port Scanning', 'OS Detection', 'Service Version Detection'],
      supportedTargets: ['Network Infrastructure', 'Servers', 'Workstations', 'Network Devices']
    },
    metasploit: {
      id: 'metasploit',
      name: 'Metasploit',
      description: 'The Metasploit Framework is a computer security project that provides information about security vulnerabilities.',
      icon: '⚔️',
      color: '#d53f8c',
      category: 'Penetration Testing',
      capabilities: ['Exploit Development', 'Payload Generation', 'Post-Exploitation', 'Vulnerability Validation'],
      supportedTargets: ['Network Services', 'Web Applications', 'Operating Systems', 'Databases']
    },
    openvas: {
      id: 'openvas',
      name: 'OpenVAS',
      description: 'OpenVAS is a full-featured vulnerability scanner offering comprehensive vulnerability management.',
      icon: '🛡️',
      color: '#00b894',
      category: 'Vulnerability Management',
      capabilities: ['Network Vulnerability Assessment', 'Authenticated Testing', 'Compliance Checking', 'Risk Management'],
      supportedTargets: ['Network Infrastructure', 'Operating Systems', 'Applications', 'Databases']
    },
    acunetix: {
      id: 'acunetix',
      name: 'Acunetix',
      description: 'Acunetix is a web vulnerability scanner that automatically crawls and tests websites and web applications.',
      icon: '🕸️',
      color: '#667eea',
      category: 'Web Application Security',
      capabilities: ['Automated Web Scanning', 'Manual Testing Tools', 'Compliance Reporting', 'Issue Management'],
      supportedTargets: ['Web Applications', 'Single Page Applications', 'HTML5 Applications', 'Web APIs']
    },
    wapiti: {
      id: 'wapiti',
      name: 'Wapiti',
      description: 'Wapiti allows you to audit the security of your websites or web applications.',
      icon: '🐛',
      color: '#f093fb',
      category: 'Web Application Security',
      capabilities: ['Black-box Security Testing', 'Vulnerability Detection', 'Payload Injection', 'Report Generation'],
      supportedTargets: ['Web Applications', 'Web Services', 'Form Handlers', 'File Upload Systems']
    },
    nuclei: {
      id: 'nuclei',
      name: 'Nuclei',
      description: 'Nuclei is a fast tool for configurable targeted scanning based on templates.',
      icon: '⚡',
      color: '#ffd93d',
      category: 'Vulnerability Scanner',
      capabilities: ['Template-based Scanning', 'Custom Vulnerability Detection', 'Bulk Target Processing', 'CI/CD Integration'],
      supportedTargets: ['Web Applications', 'Network Services', 'DNS Records', 'SSL Certificates']
    },
    qualys: {
      id: 'qualys',
      name: 'Qualys VMDR',
      description: 'Qualys VMDR provides comprehensive vulnerability management, detection, and response capabilities.',
      icon: '☁️',
      color: '#74b9ff',
      category: 'Cloud Security Platform',
      capabilities: ['Continuous Monitoring', 'Asset Discovery', 'Threat Detection', 'Compliance Management'],
      supportedTargets: ['Cloud Infrastructure', 'On-Premise Systems', 'Containers', 'Web Applications']
    },
    rapid7: {
      id: 'rapid7',
      name: 'Rapid7 InsightVM',
      description: 'InsightVM is Rapid7\'s on-premise vulnerability management solution.',
      icon: '🚀',
      color: '#6c5ce7',
      category: 'Vulnerability Management',
      capabilities: ['Live Vulnerability Monitoring', 'Risk Prioritization', 'Remediation Guidance', 'Asset Analytics'],
      supportedTargets: ['Enterprise Networks', 'Cloud Environments', 'Virtual Machines', 'Containers']
    },
    checkmarx: {
      id: 'checkmarx',
      name: 'Checkmarx SAST',
      description: 'Checkmarx provides comprehensive Static Application Security Testing (SAST) solutions.',
      icon: '📋',
      color: '#fd79a8',
      category: 'Static Code Analysis',
      capabilities: ['Source Code Analysis', 'Security Code Review', 'Vulnerability Detection', 'Compliance Reporting'],
      supportedTargets: ['Source Code', 'Binary Files', 'Mobile Applications', 'Web Applications']
    },
    sonarqube: {
      id: 'sonarqube',
      name: 'SonarQube',
      description: 'SonarQube provides continuous inspection of code quality and security vulnerabilities.',
      icon: '🔬',
      color: '#00cec9',
      category: 'Code Quality & Security',
      capabilities: ['Static Code Analysis', 'Security Hotspot Detection', 'Technical Debt Analysis', 'Quality Gate Management'],
      supportedTargets: ['Source Code Repositories', 'CI/CD Pipelines', 'Pull Requests', 'Development Branches']
    }
  };

  const currentTool = toolsConfig[toolId || ''];

  // Function to load real ZAP data from Airflow/Supabase
  const [connectionTest, setConnectionTest] = useState<any>(null);

  const testSupabaseConnection = async () => {
    console.log('Testing Supabase connection...');
    try {
      // Test basic connection
      const testResult = await SecurityScanService.testConnection();
      console.log('Connection test:', testResult);
      
      // Get vulnerability data directly (new schema)
      const vulns = await SecurityScanService.getVulnerabilityData(10);
      console.log('💎 Direct vulnerability data:', vulns);
      
      // Get scan data
      const scans = await SecurityScanService.getScanData(5);
      console.log('📊 Scan data:', scans);
      
      // Group vulnerabilities by severity
      const severityGroups = vulns.reduce((groups: any, vuln: any) => {
        groups[vuln.severity] = (groups[vuln.severity] || 0) + 1;
        return groups;
      }, {});

      setConnectionTest({
        connection: testResult,
        vulnerabilityData: vulns.slice(0, 5), // First 5 for display
        scanData: scans.slice(0, 3), // First 3 scans
        totalVulnerabilities: vulns.length,
        severityBreakdown: severityGroups,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Connection test failed:', error);
      setConnectionTest({
        error: error,
        timestamp: new Date().toISOString()
      });
    }
  };

  const loadRealZapData = async (): Promise<Vulnerability[]> => {
    try {
      setLoading(true);
      console.log('🔍 Loading ALL ZAP vulnerability data (up to 1000)...');
      
      // Get ALL vulnerabilities from database with increased limit
      const realVulns = await SecurityScanService.getVulnerabilityData(1000);
      console.log('📊 Raw vulnerabilities from Supabase:', realVulns);
      console.log('🔢 Number of vulnerabilities found:', realVulns?.length || 0);

      if (!realVulns || realVulns.length === 0) {
        console.log('🔍 No vulnerabilities found in database');
        return [];
      }

      // Filter for ZAP vulnerabilities if needed
      const zapVulns = realVulns.filter(vuln => 
        vuln.tool?.toLowerCase() === 'zap' || !vuln.tool
      );
      console.log('✅ ZAP vulnerabilities found:', zapVulns.length);

      // Convert new database format to UI format
      const convertedVulns: Vulnerability[] = zapVulns.map((vuln, index) => {
        // Use scan timestamp as fallback for created_at
        const timestamp = vuln.created_at || vuln.timestamp || new Date().toISOString();
        const dateOnly = timestamp.split('T')[0];
        
        const converted = {
          id: vuln.id,
          title: vuln.title || vuln.name || 'Unknown Vulnerability',
          severity: convertSeverity(vuln.severity),
          cvss: calculateCvssFromSeverity(vuln.severity),
          cve: extractCveFromReference(vuln.reference),
          description: vuln.description || 'No description available',
          location: vuln.url || 'Unknown location',
          status: 'Open' as const,
          firstDetected: dateOnly,
          lastSeen: dateOnly,
          recommendation: vuln.solution || 'Review and apply appropriate security patches or configuration changes.',
          scan_time: dateOnly,
          application_id: appId || 'unknown'
        };
        
        if (index < 5) { // Only log first 5 for cleaner output
          console.log(`Sample converted vulnerability ${index + 1}:`, converted);
        }
        return converted;
      });

      console.log(`✅ Successfully loaded ${convertedVulns.length} real ZAP vulnerabilities`);
      console.log('🎯 Severity breakdown:', {
        Critical: convertedVulns.filter(v => v.severity === 'Critical').length,
        High: convertedVulns.filter(v => v.severity === 'High').length,
        Medium: convertedVulns.filter(v => v.severity === 'Medium').length,
        Low: convertedVulns.filter(v => v.severity === 'Low').length,
      });
      return convertedVulns;

    } catch (error) {
      console.error('❌ Error loading real ZAP data:', error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Helper functions to convert Supabase data to UI format
  const convertSeverity = (severity: string): 'Critical' | 'High' | 'Medium' | 'Low' => {
    if (!severity) return 'Medium';
    
    switch (severity.toLowerCase()) {
      case 'high': return 'High';
      case 'medium': return 'Medium';
      case 'low': return 'Low';
      case 'informational': return 'Low'; // Map Informational to Low for UI consistency
      case 'critical': return 'Critical';
      default: 
        console.warn(`Unknown severity: "${severity}", defaulting to Medium`);
        return 'Medium';
    }
  };

  const calculateCvssFromSeverity = (severity: string): number => {
    switch (severity.toLowerCase()) {
      case 'high': return 7.0 + Math.random() * 2;
      case 'medium': return 4.0 + Math.random() * 3;
      case 'low': 
      case 'informational': return 1.0 + Math.random() * 3;
      default: return 5.0;
    }
  };

  const extractCveFromReference = (reference?: string): string | undefined => {
    if (!reference) return undefined;
    const cveMatch = reference.match(/CVE-\d{4}-\d{4,}/);
    return cveMatch ? cveMatch[0] : undefined;
  };

  // Mock vulnerability data generation
  const generateMockVulnerabilities = (): Vulnerability[] => {
    const mockVulns: Vulnerability[] = [];
    const severities: Array<'Critical' | 'High' | 'Medium' | 'Low'> = ['Critical', 'High', 'Medium', 'Low'];
    const statuses: Array<'Open' | 'Fixed' | 'In Progress' | 'False Positive'> = ['Open', 'Fixed', 'In Progress', 'False Positive'];

    for (let i = 1; i <= 25; i++) {
      const severity = severities[Math.floor(Math.random() * severities.length)];
      const cvss = severity === 'Critical' ? 9.0 + Math.random() : 
                   severity === 'High' ? 7.0 + Math.random() * 2 :
                   severity === 'Medium' ? 4.0 + Math.random() * 3 :
                   1.0 + Math.random() * 3;

      mockVulns.push({
        id: `VULN-${i.toString().padStart(3, '0')}`,
        title: `${currentTool?.name || 'Security'} Vulnerability ${i}`,
        severity,
        cvss: Number(cvss.toFixed(1)),
        cve: Math.random() > 0.6 ? `CVE-2024-${Math.floor(Math.random() * 9999)}` : undefined,
        description: `This is a ${severity.toLowerCase()} severity vulnerability detected by ${currentTool?.name || 'the security tool'}.`,
        location: `Target ${Math.floor(Math.random() * 5) + 1}`,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        firstDetected: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        lastSeen: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        recommendation: 'Review and apply appropriate security patches or configuration changes.',
        scan_time: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        application_id: appId || `app-${Math.floor(Math.random() * 10) + 1}`
      });
    }

    return mockVulns;
  };

  const handleScanComplete = async () => {
    if (toolId === 'zap') {
      // For ZAP, reload real data after scan completion
      const realData = await loadRealZapData();
      if (realData.length > 0) {
        setVulnerabilities(realData);
        setFilteredVulnerabilities(realData);
        return;
      }
    }
    
    // Fallback to mock data for other tools or if no real data
    const newVulns = generateMockVulnerabilities();
    setVulnerabilities(newVulns);
    setFilteredVulnerabilities(newVulns);
  };

  useEffect(() => {
    const loadData = async () => {
      setIsZapTool(toolId === 'zap');
      
      if (toolId === 'zap') {
        // Try to load real ZAP data first
        const realData = await loadRealZapData();
        if (realData.length > 0) {
          setVulnerabilities(realData);
          setFilteredVulnerabilities(realData);
          console.log('✅ Loaded real ZAP data from Airflow');
        } else {
          console.log('⚠️ No real ZAP data found, falling back to mock data');
          const vulns = generateMockVulnerabilities();
          setVulnerabilities(vulns);
          setFilteredVulnerabilities(vulns);
        }
      } else {
        // Use mock data for other tools
        const vulns = generateMockVulnerabilities();
        setVulnerabilities(vulns);
        setFilteredVulnerabilities(vulns);
      }
    };

    loadData();

    // Set up real-time subscriptions only for ZAP
    let scansChannel: any;
    let vulnsChannel: any;

    if (toolId === 'zap') {
      scansChannel = SecurityScanService.subscribeToScans((payload) => {
        console.log('🔄 ZAP scan update received:', payload);
        // Reload data when new scans come in
        loadData();
      });

      vulnsChannel = SecurityScanService.subscribeToVulnerabilities((payload) => {
        console.log('🔄 ZAP vulnerability update received:', payload);
        // Reload data when new vulnerabilities come in
        loadData();
      });
    }

    // Cleanup subscriptions
    return () => {
      if (scansChannel) scansChannel.unsubscribe();
      if (vulnsChannel) vulnsChannel.unsubscribe();
    };
  }, [toolId]);

  useEffect(() => {
    let filtered = vulnerabilities;

    if (severityFilter !== 'all') {
      filtered = filtered.filter(v => v.severity.toLowerCase() === severityFilter);
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(v => v.status.toLowerCase().replace(' ', '-') === statusFilter);
    }

    setFilteredVulnerabilities(filtered);
  }, [severityFilter, statusFilter, vulnerabilities]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return '#dc2626';
      case 'High': return '#ea580c';
      case 'Medium': return '#d97706';
      case 'Low': return '#16a34a';
      default: return '#6b7280';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return '#dc2626';
      case 'In Progress': return '#d97706';
      case 'Fixed': return '#16a34a';
      case 'False Positive': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const severityCounts = {
    critical: vulnerabilities.filter(v => v.severity === 'Critical').length,
    high: vulnerabilities.filter(v => v.severity === 'High').length,
    medium: vulnerabilities.filter(v => v.severity === 'Medium').length,
    low: vulnerabilities.filter(v => v.severity === 'Low').length
  };

  if (!currentTool) {
    return (
      <div className="security-tool-page">
        <div className="error-message">
          <h2>Tool Not Found</h2>
          <p>The requested security tool could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="security-tool-page">
      {/* Real Data Banner for ZAP */}
      {isZapTool && (
        <div className="real-data-banner">
          <span className="banner-icon">🔴</span>
          <div className="banner-content">
            <strong>Live Airflow Data</strong>
            <p>Showing real ZAP scan results from your Airflow pipeline</p>
          </div>
        </div>
      )}

      {/* Loading Indicator */}
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Loading ZAP scan data from Airflow...</p>
        </div>
      )}

      {/* Tool Header */}
      <div className="tool-header" style={{ borderLeftColor: currentTool.color }}>
        <div className="tool-header__info">
          <div className="tool-header__icon" style={{ backgroundColor: currentTool.color }}>
            {currentTool.icon}
          </div>
          <div className="tool-header__details">
            <h1 className="tool-header__title">{currentTool.name}</h1>
            <p className="tool-header__category">{currentTool.category}</p>
            <p className="tool-header__description">{currentTool.description}</p>
          </div>
        </div>
                <div className="tool-header__actions">
          <ExcelExportButton pageType="total" />
          <RunScanButton toolId={toolId || ''} toolName={currentTool?.name || ''} onScanComplete={handleScanComplete} />
          {/* Temporary debug button - remove after fixing Airflow DAG */}
          <button 
            onClick={testSupabaseConnection}
            style={{
              background: '#e2e8f0',
              border: '1px solid #cbd5e0',
              borderRadius: '8px',
              padding: '8px 16px',
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            Debug DB
          </button>
        </div>
      </div>

      {/* Tool Capabilities */}
      <div className="tool-capabilities">
        <div className="capabilities-section">
          <h3>Key Capabilities</h3>
          <div className="capabilities-list">
            {currentTool.capabilities.map((capability, index) => (
              <span key={index} className="capability-tag">
                {capability}
              </span>
            ))}
          </div>
        </div>
        <div className="capabilities-section">
          <h3>Supported Targets</h3>
          <div className="capabilities-list">
            {currentTool.supportedTargets.map((target, index) => (
              <span key={index} className="target-tag">
                {target}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="tool-stats">
        <div className="stat-card stat-card--critical">
          <div className="stat-card__label">Critical</div>
          <div className="stat-card__value">{severityCounts.critical}</div>
        </div>
        <div className="stat-card stat-card--high">
          <div className="stat-card__label">High</div>
          <div className="stat-card__value">{severityCounts.high}</div>
        </div>
        <div className="stat-card stat-card--medium">
          <div className="stat-card__label">Medium</div>
          <div className="stat-card__value">{severityCounts.medium}</div>
        </div>
        <div className="stat-card stat-card--low">
          <div className="stat-card__label">Low</div>
          <div className="stat-card__value">{severityCounts.low}</div>
        </div>
        <div className="stat-card stat-card--total">
          <div className="stat-card__label">Total</div>
          <div className="stat-card__value">{vulnerabilities.length}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters">
        <div className="filter-group">
          <label>Severity:</label>
          <select 
            value={severityFilter} 
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Status:</label>
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Statuses</option>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="fixed">Fixed</option>
            <option value="false-positive">False Positive</option>
          </select>
        </div>
        <div className="filter-info">
          Showing {filteredVulnerabilities.length} of {vulnerabilities.length} vulnerabilities
          {isZapTool && (
            <span className="data-source-indicator">
              {vulnerabilities.length > 0 && vulnerabilities[0].id.includes('VULN-') ? 
                ' • Mock Data (No vulnerabilities in database - check Airflow DAG)' : 
                ` • Live Airflow Data 🔴 (${vulnerabilities.length >= 80 ? 'Full Dataset' : 'Partial Dataset'})`
              }
            </span>
          )}
        </div>
      </div>

      {/* Connection Test Results */}
      {connectionTest && (
        <div style={{ 
          background: connectionTest.error ? '#fee2e2' : '#f0f9ff', 
          border: `1px solid ${connectionTest.error ? '#fecaca' : '#bae6fd'}`,
          padding: '16px', 
          borderRadius: '8px', 
          marginBottom: '24px',
          fontSize: '12px',
          fontFamily: 'monospace'
        }}>
          <h4 style={{ margin: '0 0 8px 0' }}>🔍 Real Data Connection Test:</h4>
          {connectionTest.error ? (
            <p style={{ color: '#dc2626' }}>❌ Error: {connectionTest.error.message}</p>
          ) : (
            <div>
              <p>✅ Connection: {connectionTest.connection.success ? 'Success' : 'Failed'}</p>
              <p>📊 <strong>Total vulnerabilities found: {connectionTest.totalVulnerabilities || 0}</strong></p>
              
              {connectionTest.severityBreakdown && Object.keys(connectionTest.severityBreakdown).length > 0 && (
                <div>
                  <p><strong>🎯 Severity Breakdown:</strong></p>
                  <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
                    {Object.entries(connectionTest.severityBreakdown).map(([severity, count]) => (
                      <li key={severity}>
                        {severity}: {count as number} vulnerabilities
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {connectionTest.vulnerabilityData && connectionTest.vulnerabilityData.length > 0 && (
                <div>
                  <p><strong>🔍 Sample Vulnerabilities:</strong></p>
                  <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
                    {connectionTest.vulnerabilityData.map((vuln: any, idx: number) => (
                      <li key={idx} style={{ fontSize: '10px', marginBottom: '4px' }}>
                        <strong>{vuln.title}</strong> ({vuln.severity})
                        <br />Tool: {vuln.tool} | URL: {vuln.url}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {connectionTest.scanData && connectionTest.scanData.length > 0 && (
                <div>
                  <p><strong>📊 Recent Scans:</strong></p>
                  <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
                    {connectionTest.scanData.map((scan: any, idx: number) => (
                      <li key={idx} style={{ fontSize: '10px' }}>
                        Target: {scan.target} | Status: {scan.status} | Started: {scan.started_at}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
          <p style={{ fontSize: '10px', color: '#6b7280' }}>Test run at: {connectionTest.timestamp}</p>
        </div>
      )}

      {/* Vulnerabilities Table */}
      <div className="vulnerabilities-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Scan Time</th>
              <th>App ID</th>
              <th>Vulnerability</th>
              <th>Severity</th>
              <th>CVE</th>
              <th>CVSS</th>
              <th>Location</th>
              <th>Status</th>
              <th>First Detected</th>
              <th>Last Seen</th>
            </tr>
          </thead>
          <tbody>
            {filteredVulnerabilities.map((vuln) => (
              <tr key={vuln.id} className="vulnerability-row">
                <td className="vuln-id">{vuln.id}</td>
                <td className="vuln-date">{vuln.scan_time}</td>
                <td className="vuln-app-id">{vuln.application_id}</td>
                <td className="vuln-title">{vuln.title}</td>
                <td>
                  <span 
                    className="severity-badge" 
                    style={{ backgroundColor: getSeverityColor(vuln.severity) }}
                  >
                    {vuln.severity}
                  </span>
                </td>
                <td className="vuln-cve">{vuln.cve || 'N/A'}</td>
                <td className="vuln-cvss">{vuln.cvss}</td>
                <td className="vuln-location">{vuln.location}</td>
                <td>
                  <span 
                    className="status-badge" 
                    style={{ color: getStatusColor(vuln.status) }}
                  >
                    {vuln.status}
                  </span>
                </td>
                <td className="vuln-date">{vuln.firstDetected}</td>
                <td className="vuln-date">{vuln.lastSeen}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredVulnerabilities.length === 0 && (
        <div className="no-results">
          <h3>No vulnerabilities found</h3>
          {isZapTool && connectionTest && connectionTest.allVulnerabilitiesInDB === 0 ? (
            <div>
              <p><strong>🔍 Data Pipeline Analysis:</strong></p>
              <p>✅ Supabase connection is working</p>
              <p>✅ ZAP scans are running successfully ({connectionTest.sampleScans?.length || 0} recent scans found)</p>
              <p>❌ No vulnerabilities are being stored in the database</p>
              <br />
              <p><strong>📋 Likely Issue:</strong></p>
              <p>Your Airflow ZAP DAG is running scans but not parsing/storing the vulnerability results.</p>
              <br />
              <p><strong>🛠️ Troubleshooting Steps:</strong></p>
              <ol style={{ textAlign: 'left', display: 'inline-block' }}>
                <li>Check Airflow DAG logs for ZAP result parsing errors</li>
                <li>Verify ZAP scan output format is being processed correctly</li>
                <li>Ensure vulnerability data is being inserted into the 'vulnerabilities' table</li>
                <li>Test scanning a known vulnerable target (testphp.vulnweb.com should find multiple vulnerabilities)</li>
              </ol>
              <br />
              <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '16px' }}>
                <em>Showing mock data below for UI testing purposes.</em>
              </p>
            </div>
          ) : (
            <p>No vulnerabilities match the current filter criteria.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SecurityToolPage;
