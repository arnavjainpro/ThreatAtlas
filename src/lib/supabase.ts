// src/lib/supabase.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://lmwjmgiveqralhlpdaia.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxtd2ptZ2l2ZXFyYWxobHBkYWlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ2NjU4NTcsImV4cCI6MjA3MDI0MTg1N30.FTpImKDWZCug7McwD8fsOM_6UP9JpfhNDStmK2J2Fmw'

console.log('Supabase config:', { 
  url: supabaseUrl, 
  hasKey: !!supabaseAnonKey,
  keyLength: supabaseAnonKey?.length,
  envUrl: import.meta.env.VITE_SUPABASE_URL,
  envKey: import.meta.env.VITE_SUPABASE_ANON_KEY
})

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
