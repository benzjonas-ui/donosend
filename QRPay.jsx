import { QRCodeSVG } from 'qrcode.react'
import { useMemo, useState } from 'react'
import { BadgeCheck, Heart, QrCode, ShieldCheck } from 'lucide-react'
import { pilot } from '../data'

export default function QRPay(){
 const [loading,setLoading]=useState(false)
 const [error,setError]=useState('')
 const paymentUrl=useMemo(()=>{
   if(typeof window==='undefined') return 'https://donosend.de/qr'
   return `${window.location.origin}/pay/jonas`
 },[])

 async function pay(){
   setLoading(true);setError('')
   try{
     const r=await fetch('/.netlify/functions/create-checkout-session',{
       method:'POST',
       headers:{'content-type':'application/json'},
       body:JSON.stringify({
         amount:pilot.amount,
         partnerId:pilot.sellerId,
         partnerName:pilot.sellerName,
         causeId:pilot.organisationId,
         causeName:pilot.organisationName,
         campaignName:pilot.campaignName
       })
     })
     const data=await r.json()
     if(!r.ok) throw new Error(data.error||'Zahlung konnte nicht gestartet werden')
     window.location.href=data.url
   }catch(e){setError(e.message)}finally{setLoading(false)}
 }

 return <section className="container section page pilot-checkout">
   <div className="pilot-intro">
     <span className="eyebrow">Donosend Pilot · Verkäuferansicht</span>
     <h1>1,00 € über Jonas an Pro Vita Animale senden.</h1>
     <p className="lead">Zeige diesen persönlichen QR-Code auf deinem Gerät. Beim Scan öffnet sich auf dem anderen Smartphone direkt Jonas’ öffentliche 1,00-€-Kundenseite und die Transaktion kann über Stripe Sandbox abgeschlossen werden.</p>
     <div className="pilot-badges"><span><BadgeCheck size={18}/> Jonas · Test-Verkäufer</span><span><ShieldCheck size={18}/> Stripe-Testmodus</span></div>

     <article className="checkout-summary">
       <div className="summary-row"><span>Verkäufer</span><strong>{pilot.sellerName}</strong></div>
       <div className="summary-row"><span>Empfänger</span><strong>{pilot.organisationName} <small>(Demo)</small></strong></div>
       <div className="summary-row"><span>Zweck</span><strong>{pilot.campaignName}</strong></div>
       <div className="summary-total"><span>Testbeitrag</span><strong>1,00 €</strong></div>
     </article>

     <div className="actions"><a className="button primary payment-button" href="/pay/jonas">Kundenseite auf diesem Gerät testen</a><button className="button ghost" onClick={pay} disabled={loading}>{loading?'Stripe wird geöffnet…':'Direkt zu Stripe'}</button></div>
     {error&&<p className="error">{error}</p>}
     <p className="demo-disclaimer"><strong>Wichtig:</strong> Es fließt noch kein echtes Geld. Pro Vita Animale ist hier als Präsentations- und Testprofil eingebunden; eine Partnerschaft ist noch nicht bestätigt.</p>
   </div>

   <aside className="seller-qr-panel">
     <div className="seller-chip"><span className="avatar">JB</span><div><strong>Jonas Benz</strong><small>Donosend-Testverkäufer</small></div></div>
     <div className="qr-frame"><QRCodeSVG value={paymentUrl} size={240} level="H" includeMargin/></div>
     <div className="scan-copy"><QrCode size={21}/><div><strong>Mit Handykamera scannen</strong><span>Kein Donosend-Konto erforderlich</span></div></div>
     <div className="organisation-mini"><Heart size={22}/><div><span>Ausgewählte Organisation</span><strong>Pro Vita Animale e.V.</strong><small>Demo-Profil · Essen-Kray</small></div></div>
   </aside>
 </section>
}
