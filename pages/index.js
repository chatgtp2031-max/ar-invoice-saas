// pages/index.js
import Link from 'next/link'

export default function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h1>AR — Invoice SaaS (MVP)</h1>
      <p>Simple billing for small businesses — start from zero.</p>
      <div style={{ marginTop: 20 }}>
        <Link href="/signup"><a>Signup</a></Link> | <Link href="/login"><a>Login</a></Link> | <Link href="/dashboard"><a>Dashboard</a></Link>
      </div>
    </div>
  )
}
