import { QRCodeSVG } from 'qrcode.react'
import { useState } from 'react'

export default function QRPay(){
 const [amount,setAmount]=useState('5.00'); const [loading,setLoading]=useState(false); const [error,setError]=useState('')
 async function pay(){setLoading(true);setError('');try{const r=await fetch('/.netlify/functions/create-checkout-session',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({amount:Number(amount),partnerId:'foodlover',causeId:'children'})});const data=await r.json();if(!r.ok)throw new Error(data.error||'Zahlung konnte nicht gestartet werden');window.location.href=data.url}catch(e){setError(e.message)}finally{setLoading(false)}}
 const qrValue=typeof window==='undefined'?'https://donosend.de/qr':window.location.href
 return <section className="container section page qr-page"><div><span className="eyebrow">QR-Zahlung – Testmodus</span><h1>Bezahlen und Wirkung direkt sichtbar machen</h1><p className="lead">Diese Seite ist für den Pilotbetrieb am Verkaufspunkt vorbereitet.</p><label>Betrag in Euro<input type="number" min="0.50" step="0.50" value={amount} onChange={e=>setAmount(e.target.value)}/></label><button className="button primary" onClick={pay} disabled={loading}>{loading?'Weiterleitung…':'Mit Stripe testen'}</button>{error&&<p className="error">{error}</p>}<small>Es werden ausschließlich Stripe-Testschlüssel verwendet, solange dein Konto im Testmodus ist.</small></div><div className="qr-card"><QRCodeSVG value={qrValue} size={210}/><strong>Donosend Pilot</strong><span>Scannen, zahlen, Wirkung sehen.</span></div></section>
}
