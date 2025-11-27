// pages/invoices/create.js
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function CreateInvoice() {
  const [items, setItems] = useState([{ name:'', qty:1, price:0 }])
  const [total, setTotal] = useState(0)
  const [customers, setCustomers] = useState([])
  const [selectedCustomer, setSelectedCustomer] = useState('')
  const [merchant, setMerchant] = useState(null)
  const router = useRouter()

  useEffect(() => {
    fetch('/api/customers').then(r=>r.json()).then(d=> { if (d.customers) setCustomers(d.customers) })
    fetch('/api/profile').then(r=>r.json()).then(d=> { if (d.user) setMerchant(d.user) })
  }, [])

  useEffect(() => {
    let t = 0
    items.forEach(i => t += (Number(i.qty) || 0) * (Number(i.price) || 0))
    setTotal(t)
  }, [items])

  function updateItem(idx, field, value) {
    const copy = [...items]; copy[idx][field] = value; setItems(copy)
  }
  function addItem(){ setItems([...items, { name:'', qty:1, price:0 }]) }

  async function submit(e){
    e.preventDefault()
    const res = await fetch('/api/invoices', {
      method:'POST',
      headers:{ 'Content-Type':'application/json' },
      body: JSON.stringify({ items, total, customerId: selectedCustomer })
    })
    if (res.ok) router.push('/dashboard')
    else { const d = await res.json(); alert(d.error || 'Error') }
  }

  return (
    <div className="container">
      <div className="card">
        <h2>Create AR Invoice</h2>
        {merchant && <div className="muted">Using: {merchant.shopName || merchant.name}</div>}

        <form onSubmit={submit}>
          <label>Customer (optional)</label>
          <select value={selectedCustomer} onChange={e=>setSelectedCustomer(e.target.value)}>
            <option value=''>-- walk-in --</option>
            {customers.map(c=> <option key={c.id} value={c.id}>{c.name} — {c.phone}</option>)}
          </select>

          {items.map((it, idx) => (
            <div key={idx} className="row">
              <input placeholder="Item name" value={it.name} onChange={e=>updateItem(idx,'name',e.target.value)} />
              <input placeholder="Qty" value={it.qty} onChange={e=>updateItem(idx,'qty',e.target.value)} />
              <input placeholder="Price" value={it.price} onChange={e=>updateItem(idx,'price',e.target.value)} />
            </div>
          ))}

          <button type="button" onClick={addItem} className="btn">Add Item</button>
          <div className="invoice-total">Total: <strong>{total}</strong></div>
          <button className="btn" type="submit">Save Invoice</button>
        </form>
      </div>
    </div>
  )
}
