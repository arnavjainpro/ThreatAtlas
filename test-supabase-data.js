// Quick test script to check Supabase data structure
import { securityScanSupabase, ORG_ID } from './src/lib/supabase.js'

async function testSupabaseData() {
  try {
    console.log('Testing Supabase connection with ORG_ID:', ORG_ID)
    
    // Get all applications for the org
    const { data: apps, error: appsError } = await securityScanSupabase
      .from('applications')
      .select('*')
      .eq('org_id', ORG_ID)
    
    if (appsError) throw appsError
    console.log('Applications:', apps)
    
    // Get all scans
    const { data: scans, error: scansError } = await securityScanSupabase
      .from('scans')
      .select(`
        *,
        application:applications!inner(*)
      `)
      .eq('application.org_id', ORG_ID)
      .order('created_at', { ascending: false })
      .limit(5)
    
    if (scansError) throw scansError
    console.log('Recent scans:', scans)
    
    if (scans && scans.length > 0) {
      // Get vulnerabilities for the first scan
      const { data: vulns, error: vulnsError } = await securityScanSupabase
        .from('vulnerabilities')
        .select('*')
        .eq('scan_id', scans[0].id)
        .limit(3)
      
      if (vulnsError) throw vulnsError
      console.log('Sample vulnerabilities:', vulns)
    }
    
  } catch (error) {
    console.error('Test failed:', error)
  }
}

testSupabaseData()
