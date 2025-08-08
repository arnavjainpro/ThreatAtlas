// src/components/UserOrgBadge.tsx
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

type Ctx = { org_id: string, role: string } | null

export default function UserOrgBadge() {
  const [ctx, setCtx] = useState<Ctx>(null)

  useEffect(() => {
    supabase.from('v_user_ctx').select('org_id, role').single().then(({ data }) => {
      // @ts-ignore v_user_ctx is a view without types
      setCtx(data as any)
    })
  }, [])

  if (!ctx) return null
  return (
    <div className="rounded bg-slate-800 text-slate-200 px-2 py-1 text-xs">
      Org {ctx.org_id.slice(0, 8)} • {ctx.role}
    </div>
  )
}
