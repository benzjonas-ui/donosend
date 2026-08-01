import { CircleCheckBig, HeartHandshake, ReceiptText } from 'lucide-react'
import { Link } from 'react-router-dom'
import { pilot } from '../data'

export default function Success(){return <section className="center-page success-page">
  <CircleCheckBig size={72}/>
  <span className="eyebrow">Testtransaktion abgeschlossen</span>
  <h1>1,00 € erfolgreich gesendet.</h1>
  <p>Die Stripe-Sandbox hat den Zahlungsablauf erfolgreich simuliert.</p>
  <article className="success-receipt">
    <div><span>Über Verkäufer</span><strong>{pilot.sellerName}</strong></div>
    <div><span>Für Organisation</span><strong>{pilot.organisationName} (Demo)</strong></div>
    <div><span>Betrag</span><strong>1,00 €</strong></div>
    <div><span>Status</span><strong>Testzahlung bestätigt</strong></div>
  </article>
  <div className="actions"><Link className="button primary" to="/dashboard"><HeartHandshake size={18}/> Wirkung ansehen</Link><Link className="button ghost" to="/qr"><ReceiptText size={18}/> Noch einmal testen</Link></div>
</section>}
