// src/components/SignOutButton.tsx
import { useAuth } from '../auth/AuthProvider'

export default function SignOutButton() {
  const { signOut } = useAuth()
  return (
    <button onClick={() => signOut()} className="rounded border border-slate-700 px-3 py-1 text-sm">Sign out</button>
  )
}
