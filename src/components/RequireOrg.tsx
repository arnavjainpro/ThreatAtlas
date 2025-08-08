// src/components/RequireOrg.tsx
import { useEffect, useState } from 'react'
import type { ReactElement } from 'react'
import { supabase } from '../lib/supabase'

export default function RequireOrg({ children }: { children: ReactElement }) {
  const [ok, setOk] = useState<null | boolean>(null)

  useEffect(() => {
    supabase.from('v_user_ctx').select('org_id, role').single()
      .then(({ data, error }) => {
        if (error) return setOk(false)
        setOk(Boolean(data?.org_id))
      })
  }, [])

  if (ok === null) return <div className="p-6 text-slate-200">Checking access…</div>
  if (!ok) return <div className="p-6 text-red-300">You are not assigned to an organization. Ask an admin.</div>
  return children
}
