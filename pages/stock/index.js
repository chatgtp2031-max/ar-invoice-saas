// pages/stock/index.js
import { useEffect, useState } from 'react'

export default function Stock() {
  const [stock, setStock] = useState([])
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [qty, setQty] = useState('')

  useEffect(() => {
    fetch('/api/stock').then(r => r.json()).then(d => {
      if (d.stock) setStock(d.stock)
    })
  }, [])

  async function add(e) {
    e.preventDefault()
    const res = await fetch('/api/stock', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price, qty })
    })
    const d = await res.json()
    if (res.ok) {
      setStock(prev => [...prev, d.s])
      setName(''); setPrice(''); setQty('')
    } else alert(d.error || 'Error')
  }

  return (
    <div style={{ padding:20 }}>
      <h2>Stock</h2>
      <form onSubmit={add}>
        <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
        <input placeholder="Price" value={price} onChange={e=>setPrice(e.target.value)} />
        <input placeholder="Qty" value={qty} onChange={e=>setQty(e.target.value)} />
        <button type="submit">Add Item</button>
      </form>

      <h3 style={{ marginTop:20 }}>List</h3>
      <ul>
        {stock.map(s=> <li key={s.id}>{s.name} — {s.qty} — {s.price}</li>)}
      </ul>
    </div>
  )
}
