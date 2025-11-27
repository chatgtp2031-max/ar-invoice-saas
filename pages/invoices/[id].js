// pages/invoices/[id].js
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function InvoiceView() {
  const [invoice, setInvoice] = useState(null)
  const [merchant, setMerchant] = useState(null)
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    if (!id) return
    fetch('/api/invoices').then(r=>r.json()).then(d => {
      const inv = (d.invoices || []).find(x=> x.id === id)
      if (!inv) return
      setInvoice(inv)
      // fetch merchant profile
      fetch('/api/profile').then(r=>r.json()).then(p=>{
        if (p.user) setMerchant(p.user)
      })
    })
  }, [id])

  function handlePrint() {
    window.print()
  }

  if (!invoice) return <div className="container"><p>Loading...</p></div>

  return (
    <div className="print-area container">
      <div className="invoice-card">
        <div className="invoice-header">
          <div className="brand">
            {merchant && merchant.shopLogo ? <img src={merchant.shopLogo} alt="logo" style={{maxHeight:60}}/> : <div className="brand-placeholder">AR</div>}
            <div>
              <h3>{merchant && merchant.shopName ? merchant.shopName : merchant && merchant.name ? merchant.name : 'AR Business'}</h3>
              <div className="muted">Invoice #{invoice.id.slice(0,8)}</div>
            </div>
          </div>
          <div>
            <strong>Date:</strong> {new Date(invoice.createdAt).toLocaleString()}
          </div>
        </div>

        <table className="invoice-table">
          <thead>
            <tr><th>Item</th><th>Qty</th><th>Price</th><th>Total</th></tr>
          </thead>
          <tbody>
            {invoice.items.map((it, idx)=>(
              <tr key={idx}>
                <td>{it.name}</td>
                <td>{it.qty}</td>
                <td>{it.price}</td>
                <td>{(Number(it.qty) * Number(it.price)).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="invoice-total">
          <div>Total: <strong>{invoice.total}</strong></div>
        </div>

        <div className="invoice-actions">
          <button className="btn" onClick={handlePrint}>Print / Save as PDF</button>
        </div>
      </div>
    </div>
  )
}
