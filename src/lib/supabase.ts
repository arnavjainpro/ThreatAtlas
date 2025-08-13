// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'
import type { SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://lmwjmgiveqralhlpdaia.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxtd2ptZ2l2ZXFyYWxobHBkYWlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ2NjU4NTcsImV4cCI6MjA3MDI0MTg1N30.FTpImKDWZCug7McwD8fsOM_6UP9JpfhNDStmK2J2Fmw'

console.log('Supabase config:', { 
  url: supabaseUrl, 
  hasKey: !!supabaseAnonKey,
  keyLength: supabaseAnonKey?.length,
  envUrl: import.meta.env.VITE_SUPABASE_URL,
  envKey: import.meta.env.VITE_SUPABASE_ANON_KEY
})

// Main Supabase client for authentication (preserving existing functionality)
let supabase: SupabaseClient;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables:', { 
    VITE_SUPABASE_URL: !!supabaseUrl, 
    VITE_SUPABASE_ANON_KEY: !!supabaseAnonKey 
  })
  // Create a dummy client that won't work but won't crash the app
  supabase = createClient('https://dummy.supabase.co', 'dummy-key')
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
  console.log('Supabase client created successfully')
}

export { supabase }

// Security scanning specific configuration
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxtd2ptZ2l2ZXFyYWxobHBkYWlhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NDY2NTg1NywiZXhwIjoyMDcwMjQxODU3fQ.U5MeMB5PHbRNJOvJVLgI-QDGCTn5tuFXE_gsBKOB8Es'

// Organization ID for filtering security scan data
export const ORG_ID = '5e256ebb-ab1b-4c12-b48d-c1add60672d2'

// Separate client for security scanning data (with service role key for full access)
export const securityScanSupabase: SupabaseClient = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
})

console.log('Security scanning Supabase client created')

// Database Types for Airflow security scanning tables
export interface DatabaseScan {
  id: string
  application_id: string
  security_tool_id: string
  status: 'running' | 'success' | 'failed'
  created_at: string
  updated_at: string
  vulnerability_count: number
  scan_metadata: any
}

export interface DatabaseVulnerability {
  id: string
  scan_id: string
  name: string
  description: string
  severity: 'High' | 'Medium' | 'Low' | 'Informational'
  confidence: string
  solution: string
  reference: string
  cwe_id: number
  wasc_id: number
  created_at: string
}

export interface DatabaseApplication {
  id: string
  org_id: string
  name: string
  slug: string
  environment: string
  target_url: string
}

export interface DatabaseSecurityTool {
  id: string
  name: string
  description: string
}

// Combined types for joined queries
export interface ScanWithDetails extends DatabaseScan {
  application: DatabaseApplication
  security_tool: DatabaseSecurityTool
  vulnerabilities?: DatabaseVulnerability[]
}

export interface DashboardStats {
  totalScans: number
  activeScans: number
  totalVulnerabilities: number
  successfulScans: number
  failedScans: number
  lastScanTime?: string
}
