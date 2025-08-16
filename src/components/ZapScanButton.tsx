// components/ZapScanButton.tsx
import React, { useEffect } from 'react';
import { useZapScan } from '../hooks/useZapScan';

interface ZapScanButtonProps {
  target: string;
  appSlug: string;
  appEnv?: 'production' | 'staging' | 'development' | 'testing';
  onScanTriggered?: (result: any) => void;
  onScanComplete?: (result: any) => void;
  onScanError?: (error: any) => void;
  className?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
}

export const ZapScanButton: React.FC<ZapScanButtonProps> = ({
  target,
  appSlug,
  appEnv = 'production',
  onScanTriggered,
  onScanComplete,
  onScanError,
  className = '',
  disabled = false,
  size = 'md',
  variant = 'primary'
}) => {
  const { 
    scanResult, 
    scanStatus, 
    loading, 
    error, 
    isScanning, 
    isCompleted, 
    hasError,
    triggerScan,
    resetScan,
    cleanup
  } = useZapScan();

  // Handle scan trigger
  const handleTriggerScan = async () => {
    try {
      const result = await triggerScan({ target, appSlug, appEnv });
      onScanTriggered?.(result);
    } catch (error) {
      console.error('Failed to trigger ZAP scan:', error);
      onScanError?.(error);
    }
  };

  // Handle scan completion
  useEffect(() => {
    if (isCompleted && scanStatus) {
      if (scanStatus.state === 'success') {
        onScanComplete?.(scanStatus);
      } else if (scanStatus.state === 'failed') {
        onScanError?.(scanStatus);
      }
    }
  }, [isCompleted, scanStatus, onScanComplete, onScanError]);

  // Cleanup on unmount
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  // Get scan status text
  const getScanStatusText = (): string => {
    if (loading && !scanStatus) return 'Triggering scan...';
    if (!scanStatus && !scanResult) return 'Ready to scan';
    
    if (scanStatus) {
      switch (scanStatus.state) {
        case 'queued':
          return 'Scan queued...';
        case 'running':
          return 'Scan in progress...';
        case 'success':
          return 'Scan completed successfully';
        case 'failed':
          return 'Scan failed';
        default:
          return `Scan ${scanStatus.state}`;
      }
    }
    
    return 'Scan triggered';
  };

  // Get button variant based on state
  const getButtonVariant = (): string => {
    if (hasError) return 'danger';
    
    if (scanStatus) {
      switch (scanStatus.state) {
        case 'queued':
        case 'running':
          return 'warning';
        case 'success':
          return 'success';
        case 'failed':
          return 'danger';
        default:
          return variant;
      }
    }
    
    return variant;
  };

  // Get button size classes
  const getSizeClass = (): string => {
    switch (size) {
      case 'sm':
        return 'btn-sm';
      case 'lg':
        return 'btn-lg';
      default:
        return '';
    }
  };

  const isDisabled = disabled || isScanning;
  const currentVariant = getButtonVariant();

  return (
    <div className={`zap-scan-widget ${className}`}>
      <div className="d-flex align-items-center gap-2">
        <button
          onClick={handleTriggerScan}
          disabled={isDisabled}
          className={`btn btn-${currentVariant} ${getSizeClass()} ${isDisabled ? 'opacity-75' : ''}`}
          title={isDisabled ? 'Scan in progress...' : 'Trigger ZAP security scan'}
        >
          {isScanning ? (
            <>
              <span 
                className="spinner-border spinner-border-sm me-2" 
                role="status"
                aria-hidden="true"
              ></span>
              Scanning...
            </>
          ) : (
            <>
              <i className="bi bi-shield-check me-2" aria-hidden="true"></i>
              Run ZAP Scan
            </>
          )}
        </button>

        {isCompleted && (
          <button
            onClick={resetScan}
            className="btn btn-outline-secondary btn-sm"
            title="Reset scan state"
          >
            <i className="bi bi-arrow-clockwise" aria-hidden="true"></i>
          </button>
        )}
      </div>
      
      {/* Status Display */}
      <div className="scan-status mt-2">
        <div className="d-flex align-items-center gap-2">
          <small className="text-muted">
            Status: <span className="fw-medium">{getScanStatusText()}</span>
          </small>
          
          {scanStatus && (
            <span className={`badge badge-${currentVariant}`}>
              {scanStatus.state.toUpperCase()}
            </span>
          )}
        </div>
        
        {scanResult && (
          <div className="scan-details mt-1">
            <small className="text-muted">
              <div><strong>Target:</strong> {target}</div>
              <div><strong>Environment:</strong> {appEnv}</div>
              <div><strong>Run ID:</strong> <code>{scanResult.dag_run_id}</code></div>
              {scanStatus?.start_date && (
                <div><strong>Started:</strong> {new Date(scanStatus.start_date).toLocaleString()}</div>
              )}
              {scanStatus?.end_date && (
                <div><strong>Completed:</strong> {new Date(scanStatus.end_date).toLocaleString()}</div>
              )}
            </small>
          </div>
        )}
        
        {/* Error Display */}
        {(error || hasError) && (
          <div className="alert alert-danger mt-2 py-2 mb-0">
            <small>
              <i className="bi bi-exclamation-triangle me-1" aria-hidden="true"></i>
              {error?.message || scanStatus?.error || 'Scan failed'}
            </small>
          </div>
        )}

        {/* Success Message */}
        {scanStatus?.state === 'success' && (
          <div className="alert alert-success mt-2 py-2 mb-0">
            <small>
              <i className="bi bi-check-circle me-1" aria-hidden="true"></i>
              ZAP scan completed successfully! Check the vulnerabilities tab for results.
            </small>
          </div>
        )}
      </div>
    </div>
  );
};

export default ZapScanButton;
