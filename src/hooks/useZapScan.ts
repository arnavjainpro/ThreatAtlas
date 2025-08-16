// hooks/useZapScan.ts
import { useState, useCallback, useRef } from 'react';

// Types that match your existing ThreatAtlas patterns
interface ZapScanConfig {
  target: string;
  appSlug: string;
  appEnv?: 'production' | 'staging' | 'development' | 'testing';
}

interface ZapScanResult {
  success: boolean;
  dag_run_id: string;
  execution_date: string;
  state: 'queued' | 'running' | 'success' | 'failed';
  target: string;
  app_slug: string;
  app_env: string;
  message?: string;
}

interface ZapScanStatus {
  success: boolean;
  dag_run_id: string;
  state: 'queued' | 'running' | 'success' | 'failed';
  start_date?: string;
  end_date?: string;
  execution_date: string;
  error?: string;
}

interface ZapScanError {
  message: string;
  code?: string;
}

class ZapScanService {
  private readonly supabaseUrl: string;
  private readonly supabaseAnonKey: string;

  constructor() {
    // Use your existing Supabase configuration
    this.supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
    this.supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
  }

  async triggerScan(config: ZapScanConfig): Promise<ZapScanResult> {
    // Call Supabase Edge Function
    const response = await fetch(`${this.supabaseUrl}/functions/v1/trigger-zap-scan`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.supabaseAnonKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        target: config.target,
        app_slug: config.appSlug,
        app_env: config.appEnv || 'production'
      })
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to trigger ZAP scan');
    }

    return result;
  }

  async getScanStatus(dagRunId: string): Promise<ZapScanStatus> {
    // Call Supabase Edge Function for status
    const response = await fetch(`${this.supabaseUrl}/functions/v1/scan-status/${dagRunId}`, {
      headers: {
        'Authorization': `Bearer ${this.supabaseAnonKey}`,
        'Content-Type': 'application/json'
      }
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to get scan status');
    }

    return result;
  }

  startPolling(
    dagRunId: string, 
    onUpdate: (status: ZapScanStatus) => void, 
    pollInterval = 5000
  ): () => void {
    let timeoutId: number;
    let isPolling = true;

    const poll = async () => {
      if (!isPolling) return;

      try {
        const status = await this.getScanStatus(dagRunId);
        onUpdate(status);

        // Continue polling if scan is still running
        if (status.state === 'running' || status.state === 'queued') {
          timeoutId = window.setTimeout(poll, pollInterval);
        } else {
          isPolling = false;
        }
      } catch (error) {
        console.error('Error polling ZAP scan status:', error);
        onUpdate({ 
          success: false, 
          dag_run_id: dagRunId,
          state: 'failed',
          execution_date: new Date().toISOString(),
          error: error instanceof Error ? error.message : 'Unknown error'
        });
        isPolling = false;
      }
    };

    // Start polling immediately
    poll();

    // Return cleanup function
    return () => {
      isPolling = false;
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }
}

// Main hook that follows ThreatAtlas patterns
export const useZapScan = () => {
  const [scanResult, setScanResult] = useState<ZapScanResult | null>(null);
  const [scanStatus, setScanStatus] = useState<ZapScanStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ZapScanError | null>(null);
  
  // Use ref to persist service instance and cleanup function
  const serviceRef = useRef<ZapScanService>(new ZapScanService());
  const stopPollingRef = useRef<(() => void) | null>(null);

  const triggerScan = useCallback(async (config: ZapScanConfig): Promise<ZapScanResult> => {
    setLoading(true);
    setError(null);
    setScanResult(null);
    setScanStatus(null);

    try {
      const result = await serviceRef.current.triggerScan(config);
      setScanResult(result);

      // Start polling for status updates
      const stopPolling = serviceRef.current.startPolling(result.dag_run_id, (status) => {
        setScanStatus(status);
        
        // If scan completed, stop loading state
        if (status.state === 'success' || status.state === 'failed') {
          setLoading(false);
        }
      });

      // Store cleanup function
      stopPollingRef.current = stopPolling;

      return result;
    } catch (err) {
      const error: ZapScanError = {
        message: err instanceof Error ? err.message : 'Unknown error occurred',
        code: 'TRIGGER_ERROR'
      };
      setError(error);
      setLoading(false);
      throw err;
    }
  }, []);

  const stopPolling = useCallback(() => {
    if (stopPollingRef.current) {
      stopPollingRef.current();
      stopPollingRef.current = null;
    }
    setLoading(false);
  }, []);

  const resetScan = useCallback(() => {
    stopPolling();
    setScanResult(null);
    setScanStatus(null);
    setError(null);
    setLoading(false);
  }, [stopPolling]);

  // Cleanup on unmount
  const cleanup = useCallback(() => {
    stopPolling();
  }, [stopPolling]);

  return {
    // State
    scanResult,
    scanStatus,
    loading,
    error,
    
    // Actions
    triggerScan,
    stopPolling,
    resetScan,
    cleanup,
    
    // Computed values
    isScanning: loading || (scanStatus && ['queued', 'running'].includes(scanStatus.state)),
    isCompleted: scanStatus && ['success', 'failed'].includes(scanStatus.state),
    hasError: !!error || (scanStatus?.state === 'failed')
  };
};

export default useZapScan;
