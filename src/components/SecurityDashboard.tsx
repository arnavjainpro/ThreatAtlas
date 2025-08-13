import React, { useState, useEffect } from 'react';
import { SecurityScanService } from '../services/securityScanService';
import VulnerabilityDetails from './VulnerabilityDetails';
import type { DashboardStats, ScanWithDetails } from '../lib/supabase';
import './SecurityDashboard.css';

interface SecurityDashboardProps {
  className?: string;
}

const SecurityDashboard: React.FC<SecurityDashboardProps> = ({ className }) => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentScans, setRecentScans] = useState<ScanWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedScanId, setSelectedScanId] = useState<string | null>(null);

  // Load initial data
  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [statsData, scansData] = await Promise.all([
        SecurityScanService.getDashboardStats(),
        SecurityScanService.getRecentScans(10)
      ]);

      setStats(statsData);
      setRecentScans(scansData);
    } catch (err) {
      setError('Failed to load security scan data');
      console.error('Error loading dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();

    // Set up real-time subscriptions
    const scansChannel = SecurityScanService.subscribeToScans((payload) => {
      console.log('Scan update received:', payload);
      // Reload data when scans are updated
      loadDashboardData();
    });

    const vulnerabilitiesChannel = SecurityScanService.subscribeToVulnerabilities((payload) => {
      console.log('Vulnerability update received:', payload);
      // Reload data when vulnerabilities are updated
      loadDashboardData();
    });

    // Cleanup subscriptions
    return () => {
      scansChannel.unsubscribe();
      vulnerabilitiesChannel.unsubscribe();
    };
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high': return '#dc2626';
      case 'medium': return '#d97706';
      case 'low': return '#16a34a';
      case 'informational': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return '#d97706';
      case 'success': return '#16a34a';
      case 'failed': return '#dc2626';
      default: return '#6b7280';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className={`security-dashboard ${className || ''}`}>
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading security scan data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`security-dashboard ${className || ''}`}>
        <div className="error-state">
          <h3>Error Loading Data</h3>
          <p>{error}</p>
          <button onClick={loadDashboardData} className="retry-button">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`security-dashboard ${className || ''}`}>
      <div className="dashboard-header">
        <h2>Security Scan Dashboard</h2>
        <p className="dashboard-subtitle">Real-time vulnerability scanning powered by Airflow + ZAP</p>
      </div>

      {/* Statistics Cards */}
      {stats && (
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <div className="stat-value">{stats.totalScans}</div>
              <div className="stat-label">Total Scans</div>
            </div>
          </div>

          <div className="stat-card stat-card--warning">
            <div className="stat-icon">⚡</div>
            <div className="stat-content">
              <div className="stat-value">{stats.activeScans}</div>
              <div className="stat-label">Active Scans</div>
            </div>
          </div>

          <div className="stat-card stat-card--danger">
            <div className="stat-icon">🚨</div>
            <div className="stat-content">
              <div className="stat-value">{stats.totalVulnerabilities}</div>
              <div className="stat-label">Total Vulnerabilities</div>
            </div>
          </div>

          <div className="stat-card stat-card--success">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <div className="stat-value">{stats.successfulScans}</div>
              <div className="stat-label">Successful Scans</div>
            </div>
          </div>

          <div className="stat-card stat-card--error">
            <div className="stat-icon">❌</div>
            <div className="stat-content">
              <div className="stat-value">{stats.failedScans}</div>
              <div className="stat-label">Failed Scans</div>
            </div>
          </div>

          {stats.lastScanTime && (
            <div className="stat-card">
              <div className="stat-icon">🕐</div>
              <div className="stat-content">
                <div className="stat-value">{formatDate(stats.lastScanTime).split(' ')[1]}</div>
                <div className="stat-label">Last Scan</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Recent Scans */}
      <div className="recent-scans">
        <h3>Recent Security Scans</h3>
        {recentScans.length > 0 ? (
          <div className="scans-table">
            <table>
              <thead>
                <tr>
                  <th>Application</th>
                  <th>Tool</th>
                  <th>Environment</th>
                  <th>Status</th>
                  <th>Vulnerabilities</th>
                  <th>Started</th>
                  <th>Target</th>
                </tr>
              </thead>
              <tbody>
                {recentScans.map((scan) => (
                  <tr key={scan.id} className="scan-row">
                    <td className="scan-application">
                      <div className="application-info">
                        <strong>{scan.application.name}</strong>
                      </div>
                    </td>
                    <td className="scan-tool">
                      <span className="tool-badge">
                        {scan.security_tool.name}
                      </span>
                    </td>
                    <td className="scan-environment">
                      <span className={`env-badge env-badge--${scan.application.environment}`}>
                        {scan.application.environment}
                      </span>
                    </td>
                    <td className="scan-status">
                      <span 
                        className="status-badge" 
                        style={{ color: getStatusColor(scan.status) }}
                      >
                        {scan.status}
                        {scan.status === 'running' && <span className="pulse-dot"></span>}
                      </span>
                    </td>
                    <td className="scan-vulns">
                      <button 
                        className="vuln-count-button"
                        onClick={() => setSelectedScanId(scan.id)}
                        disabled={!scan.vulnerability_count || scan.vulnerability_count === 0}
                      >
                        {scan.vulnerability_count || 0}
                      </button>
                    </td>
                    <td className="scan-date">
                      {formatDate(scan.created_at)}
                    </td>
                    <td className="scan-target">
                      <a 
                        href={scan.application.target_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="target-link"
                      >
                        {scan.application.target_url}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="no-scans">
            <p>No recent scans found. Scans will appear here as Airflow processes them.</p>
          </div>
        )}
      </div>

      {/* Vulnerability Details Modal */}
      {selectedScanId && (
        <VulnerabilityDetails 
          scanId={selectedScanId}
          onClose={() => setSelectedScanId(null)}
        />
      )}
    </div>
  );
};

export default SecurityDashboard;
