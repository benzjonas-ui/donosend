import { ArrowRight, BadgeCheck, CreditCard, Dog, QrCode } from 'lucide-react'
import { Link } from 'react-router-dom'
import ImpactCard from '../components/ImpactCard'

export default function Home() {return <>
  <section className="hero container">
    <div><span className="eyebrow">Donosend Pilot · Pro Vita Animale</span><h1>Verkaufen, bezahlen und dabei sichtbar Tieren helfen.</h1><p>Jonas startet den ersten Donosend-Test: Ein QR-Code, ein 1,00-€-Testbeitrag und eine klare Zuordnung zu Pro Vita Animale e.V. – zunächst als unverbindliche Demo-Präsentation.</p><div className="actions"><Link className="button primary" to="/qr">QR-Test öffnen <QrCode size={18}/></Link><Link className="button ghost" to="/organisationen">PVA-Demo ansehen <ArrowRight size={18}/></Link></div><div className="trust-row"><span><BadgeCheck size={18}/> Klare Demo-Kennzeichnung</span><span><CreditCard size={18}/> Stripe Sandbox</span></div></div>
    <div className="hero-panel animal-hero"><div className="mini-receipt"><span>Verkauf über Jonas</span><strong>1,00 €</strong><small>für Pro Vita Animale e.V. (Demo)</small></div><div className="impact-orbit"><Dog size={38}/><strong>500 €</strong><span>mögliches gemeinsames Pilotziel</span></div></div>
  </section>
  <section className="container section"><div className="section-head"><span className="eyebrow">Der konkrete Test</span><h2>In drei Schritten zur ersten vollständigen Donosend-Transaktion.</h2></div><div className="grid three"><ImpactCard title="1. Jonas zeigt QR" value="1,00 €" text="Der Betrag und die ausgewählte Organisation sind bereits festgelegt."/><ImpactCard title="2. Freundin scannt" value="Ohne Konto" text="Die Zahlungsseite öffnet sich direkt auf ihrem Smartphone."/><ImpactCard title="3. Stripe bestätigt" value="Sandbox" text="Die Erfolgsseite zeigt Verkäufer, Organisation und Betrag transparent an."/></div></section>
</>}
