import { ArrowRight, BadgeCheck, ChartNoAxesCombined, CreditCard, Store } from 'lucide-react'
import { Link } from 'react-router-dom'
import ImpactCard from '../components/ImpactCard'
import { partners } from '../data'

export default function Home() {
  return <>
    <section className="hero container">
      <div>
        <span className="eyebrow">Zahlungen, die sichtbar etwas bewegen</span>
        <h1>Jeder Einkauf kann ein kleines Stück Zukunft finanzieren.</h1>
        <p>Donosend verbindet Händler, Kundinnen und Kunden mit geprüften gemeinnützigen Projekten – direkt beim Bezahlen, transparent im Profil und einfach per Karte oder QR-Code.</p>
        <div className="actions"><Link className="button primary" to="/qr">Testzahlung starten <ArrowRight size={18}/></Link><Link className="button ghost" to="/partner">Partner entdecken</Link></div>
        <div className="trust-row"><span><BadgeCheck size={18}/> Transparente Zuordnung</span><span><CreditCard size={18}/> Stripe-Testmodus vorbereitet</span></div>
      </div>
      <div className="hero-panel">
        <div className="mini-receipt"><span>Dein Einkauf</span><strong>24,80 €</strong><small>davon 0,50 € für Kinder & Bildung</small></div>
        <div className="impact-orbit"><ChartNoAxesCombined size={34}/><strong>10.420 €</strong><span>durch lokale Partner bewegt</span></div>
      </div>
    </section>

    <section className="container section">
      <div className="section-head"><span className="eyebrow">So funktioniert es</span><h2>Einfach genug für den Alltag. Stark genug für echte Wirkung.</h2></div>
      <div className="grid three">
        <ImpactCard title="1. Partner zahlt ein" value="Split oder Beitrag" text="Händler legen einen festen Betrag oder Anteil pro Zahlung fest." />
        <ImpactCard title="2. Projekt wird gewählt" value="Transparent" text="Die unterstützte Organisation wird klar im Profil und Beleg angezeigt." />
        <ImpactCard title="3. Wirkung wird sichtbar" value="Messbar" text="Donosend bündelt Beiträge und macht Fortschritt verständlich sichtbar." />
      </div>
    </section>

    <section className="container section muted-block">
      <div className="section-head row"><div><span className="eyebrow">Lokale Vorreiter</span><h2>Unternehmen mit sichtbarer Wirkung</h2></div><Link to="/partner">Alle ansehen <ArrowRight size={16}/></Link></div>
      <div className="grid three">{partners.map(p => <article className="partner-card" key={p.id}><div className="partner-icon"><Store/></div><span>{p.category}</span><h3>{p.name}</h3><p>{p.cause}</p><strong>{p.impact}</strong><div className="progress"><i style={{width:`${p.score}%`}}/></div></article>)}</div>
    </section>
  </>
}
