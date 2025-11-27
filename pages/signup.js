// pages/signup.js
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [shopName, setShopName] = useState('')
  const [shopLogo, setShopLogo] = useState('') // paste image URL

  const router = useRouter()

  async function submit(e) {
    e.preventDefault()
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, shopName, shopLogo })
    })
    const data = await res.json()
    if (res.ok) router.push('/login')
    else alert(data.error || 'Error')
  }

  return (
    <div className="container">
      <div className="card">
        <h2>AR — Signup</h2>
        <form onSubmit={submit}>
          <input placeholder="Your name" value={name} onChange={e=>setName(e.target.value)} />
          <input placeholder="Business / Shop name (optional)" value={shopName} onChange={e=>setShopName(e.target.value)} />
          <input placeholder="Logo image URL (optional)" value={shopLogo} onChange={e=>setShopLogo(e.target.value)} />
          <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          <button type="submit" className="btn">Create account</button>
        </form>
        <p className="muted">If you don't have logo URL you can add later in Settings.</p>
      </div>
    </div>
  )
}
