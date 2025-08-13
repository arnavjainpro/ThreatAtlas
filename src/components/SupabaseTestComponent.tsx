import React, { useState } from 'react';
import { SecurityScanService } from '../services/securityScanService';

const SupabaseTestComponent: React.FC = () => {
  const [testResult, setTestResult] = useState<string>('Not tested');
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    setTestResult('Testing...');
    
    try {
      // Test the security scanning service
      const stats = await SecurityScanService.getDashboardStats();
      setTestResult(`✅ Connection successful! Found ${stats.totalScans} scans, ${stats.totalVulnerabilities} vulnerabilities`);
    } catch (error) {
      setTestResult(`❌ Connection failed: ${error}`);
      console.error('Test failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', border: '2px solid #ccc', margin: '20px', borderRadius: '8px' }}>
      <h3>Supabase Security Scanning Connection Test</h3>
      <p>Status: {testResult}</p>
      <button 
        onClick={testConnection} 
        disabled={loading}
        style={{
          padding: '10px 20px',
          background: loading ? '#ccc' : '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Testing...' : 'Test Connection'}
      </button>
      <p style={{ fontSize: '0.9em', color: '#666', marginTop: '10px' }}>
        This will test the connection to your Airflow + Supabase security scanning database
      </p>
    </div>
  );
};

export default SupabaseTestComponent;
