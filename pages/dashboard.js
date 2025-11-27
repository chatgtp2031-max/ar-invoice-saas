// pages/dashboard.js
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Dashboard() {
  const [invoices, setInvoices] = useState([])
  const router = useRouter()

  useEffect(() => {
    fetch('/api/invoices').then(r => r.json()).then(d => {
      if (d.invoices) setInvoices(d.invoices)
      else router.push('/login')
    }).catch(()=>router.push('/login'))
  }, [])

  return (
    <div className="container">
      <div className="card">
        <h2>AR — Dashboard</h2>
        <div className="nav">
          <Link href="/invoices/create"><a>New Invoice</a></Link>
          <Link href="/customers"><a>Customers</a></Link>
          <Link href="/stock"><a>Stock</a></Link>
          <Link href="/settings"><a>Settings</a></Link>
        </div>

        <h3>Your Invoices</h3>
        <ul className="list">
          {invoices.length === 0 && <li>No invoices yet</li>}
          {invoices.map(inv => (
            <li key={inv.id} className="list-item">
              <div>
                <strong>#{inv.id.slice(0,6)}</strong> — Total: {inv.total}
                <div className="muted">{new Date(inv.createdAt).toLocaleString()}</div>
              </div>
              <div>
                <Link href={`/invoices/${inv.id}`}><a className="btn-sm">View / Print</a></Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
