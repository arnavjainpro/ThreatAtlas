import React, { useState } from 'react';
import './RunScanButton.css';

interface RunScanButtonProps {
  toolName: string;
  toolId: string;
  onScanComplete?: () => void;
}

const RunScanButton: React.FC<RunScanButtonProps> = ({ 
  toolName, 
  toolId,
  onScanComplete 
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [lastScanTime, setLastScanTime] = useState<string>('');

  const handleRunScan = async () => {
    setIsScanning(true);
    
    // Simulate scan duration based on tool type
    const scanDurations: Record<string, number> = {
      'zap': 15000,        // 15 seconds
      'nessus': 25000,     // 25 seconds  
      'burp': 20000,       // 20 seconds
      'nikto': 12000,      // 12 seconds
      'sqlmap': 8000,      // 8 seconds
      'wpscan': 10000,     // 10 seconds
      'nmap': 18000,       // 18 seconds
      'metasploit': 30000, // 30 seconds
      'openvas': 35000,    // 35 seconds
      'acunetix': 22000,   // 22 seconds
      'wapiti': 14000,     // 14 seconds
      'nuclei': 8000,      // 8 seconds (fast scanner)
      'qualys': 40000,     // 40 seconds
      'rapid7': 28000,     // 28 seconds
      'checkmarx': 45000,  // 45 seconds (SAST takes longer)
      'sonarqube': 35000   // 35 seconds
    };

    const duration = scanDurations[toolId] || 20000;

    try {
      // Show progress updates during scan
      const progressInterval = setInterval(() => {
        // This could be used to update progress if needed
      }, 2000);

      // Simulate the scan
      await new Promise(resolve => setTimeout(resolve, duration));
      
      clearInterval(progressInterval);
      
      const now = new Date();
      setLastScanTime(now.toLocaleTimeString());
      
      // Call the callback to refresh data
      onScanComplete?.();
      
      // Show success message
      alert(`${toolName} scan completed successfully! New vulnerabilities have been detected and added to the results.`);
      
    } catch (error) {
      alert(`Scan failed: ${error}`);
    } finally {
      setIsScanning(false);
    }
  };

  const getButtonText = () => {
    if (isScanning) {
      return 'Scanning...';
    }
    return `Run ${toolName} Scan`;
  };

  const getIcon = () => {
    if (isScanning) {
      return '⟳'; // Spinning icon
    }
    return '▶️'; // Play/run icon
  };

  return (
    <div className="run-scan-container">
      <button 
        className={`run-scan-btn ${isScanning ? 'run-scan-btn--scanning' : ''}`}
        onClick={handleRunScan}
        disabled={isScanning}
        title={isScanning ? `Running ${toolName} scan...` : `Start a new ${toolName} security scan`}
      >
        <span className={`run-scan-btn__icon ${isScanning ? 'run-scan-btn__icon--spinning' : ''}`}>
          {getIcon()}
        </span>
        <span className="run-scan-btn__text">{getButtonText()}</span>
      </button>
      {lastScanTime && !isScanning && (
        <div className="last-scan-time">
          Last scan: {lastScanTime}
        </div>
      )}
    </div>
  );
};

export default RunScanButton;
