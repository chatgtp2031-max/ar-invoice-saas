// pages/customers/index.js
import { useEffect, useState } from 'react'

export default function Customers() {
  const [customers, setCustomers] = useState([])
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  useEffect(() => {
    fetch('/api/customers').then(r => r.json()).then(d => {
      if (d.customers) setCustomers(d.customers)
    })
  }, [])

  async function add(e) {
    e.preventDefault()
    const res = await fetch('/api/customers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone })
    })
    const d = await res.json()
    if (res.ok) {
      setCustomers(prev => [...prev, d.c])
      setName(''); setPhone('')
    } else alert(d.error || 'Error')
  }

  return (
    <div className="container">
      <div className="card">
        <h2>AR — Customers</h2>
        <form onSubmit={add}>
          <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
          <input placeholder="Phone" value={phone} onChange={e=>setPhone(e.target.value)} />
          <button type="submit" className="btn">Add Customer</button>
        </form>

        <h3 style={{ marginTop:20 }}>List</h3>
        <ul>
          {customers.map(c=> <li key={c.id}>{c.name} — {c.phone}</li>)}
        </ul>
      </div>
    </div>
  )
}
