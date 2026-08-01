import { BadgeCheck, Heart, ShieldCheck, UserRound } from 'lucide-react'
import { useState } from 'react'
import { pilot } from '../data'

export default function PublicPay(){
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState('')
  async function pay(){
    setLoading(true);setError('')
    try{
      const r=await fetch('/.netlify/functions/create-checkout-session',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({amount:1,partnerId:pilot.sellerId,partnerName:pilot.sellerName,causeId:pilot.organisationId,causeName:pilot.organisationName,campaignName:pilot.campaignName})})
      const data=await r.json()
      if(!r.ok) throw new Error(data.error||'Zahlung konnte nicht gestartet werden')
      window.location.assign(data.url)
    }catch(e){setError(e.message)}finally{setLoading(false)}
  }
  return <section className="public-pay-page">
    <div className="public-pay-shell">
      <div className="public-pay-brand">donosend <span>Sandbox-Test</span></div>
      <div className="public-pay-heading"><span className="eyebrow">Verkaufsabschluss über Jonas</span><h1>1,00 € senden und den Donosend-Ablauf testen.</h1><p>Diese Seite wurde über Jonas’ persönlichen QR-Code geöffnet. Für dich ist kein Donosend-Konto erforderlich.</p></div>
      <article className="buyer-summary">
        <div className="buyer-person"><div className="avatar">JB</div><div><span>Verkäufer</span><strong>{pilot.sellerName}</strong><small><BadgeCheck size={14}/> Demo-verifiziert</small></div></div>
        <div className="buyer-arrow">→</div>
        <div className="buyer-cause"><div className="cause-icon"><Heart size={25}/></div><div><span>Unterstützte Organisation</span><strong>{pilot.organisationName}</strong><small>Demo-Profil · keine offizielle Partnerschaft</small></div></div>
      </article>
      <article className="buyer-total"><div><span>Vorgang</span><strong>Donosend-Testverkauf</strong></div><div><span>Betrag</span><strong className="amount">1,00 €</strong></div></article>
      <button className="button primary buyer-pay-button" onClick={pay} disabled={loading}>{loading?'Sichere Stripe-Seite wird geöffnet…':'1,00 € sicher als Test senden'}</button>
      {error&&<p className="error buyer-error">{error}</p>}
      <div className="buyer-security"><ShieldCheck size={18}/><span>Stripe-Sandbox · Es wird kein echtes Geld abgebucht.</span></div>
      <p className="demo-disclaimer"><strong>Präsentationsmodus:</strong> Pro Vita Animale ist noch kein bestätigter Donosend-Partner. Die Testzahlung simuliert nur den späteren Ablauf.</p>
    </div>
  </section>
}
