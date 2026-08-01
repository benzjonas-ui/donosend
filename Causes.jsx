import { Link } from 'react-router-dom'
import { BadgeCheck, Dog, ExternalLink, Heart, MapPin } from 'lucide-react'

export default function Causes(){return <section className="container section page organisation-page">
  <span className="eyebrow">Erste Pilotorganisation · Präsentationsprofil</span>
  <div className="organisation-hero">
    <div className="organisation-mark"><Dog size={42}/></div>
    <div><div className="demo-pill">Demo · noch keine bestätigte Partnerschaft</div><h1>Pro Vita Animale e.V.</h1><p className="lead">Tierschutzverein mit Hundeauffangstation in Essen-Kray. Der Verein vermittelt Hunde in Not in liebevolle Zuhause und engagiert sich auch im Auslandstierschutz.</p><div className="pilot-badges"><span><MapPin size={18}/> Essen-Kray</span><span><BadgeCheck size={18}/> Gemeinnütziger Verein laut eigener Website</span></div></div>
  </div>

  <div className="organisation-grid">
    <article className="panel"><span className="eyebrow">Donosend-Testlauf</span><h2>500 € gemeinsames Pilotziel</h2><p>50–100 Testpersonen sollen den QR-Zahlungsablauf ausprobieren und zeigen, wie lokale Verkäufer gemeinsam sichtbare Wirkung schaffen können.</p><div className="campaign-progress"><div><strong>0 €</strong><span>von 500 € im Live-Pilot</span></div><div className="progress"><i style={{width:'0%'}}/></div></div><Link className="button primary full" to="/qr"><Heart size={18}/> 1,00-€-Test starten</Link></article>
    <article className="panel"><span className="eyebrow">So würde die Partnerschaft aussehen</span><h2>Direkt, transparent und nachvollziehbar</h2><ul className="clean-list"><li>Eigenes verifiziertes Organisationskonto</li><li>Direkte Stripe-Auszahlung nach Onboarding</li><li>Live-Anzeige von Beiträgen und Unterstützern</li><li>QR-Codes für Verkäufer und Aktionen</li></ul><a className="button ghost full" href="https://pro-vita-animale.de" target="_blank" rel="noreferrer">Offizielle Website <ExternalLink size={17}/></a></article>
  </div>

  <div className="impact-examples"><article><strong>1 €</strong><span>erster sichtbarer Beitrag</span></article><article><strong>50–100</strong><span>geplante Tester</span></article><article><strong>500 €</strong><span>mögliches Pilotziel</span></article></div>
  <p className="demo-disclaimer">Alle Donosend-Zahlen auf dieser Seite sind Präsentations- oder Pilotwerte. Inhalte zum Verein sind verkürzt aus der öffentlichen Vereinswebsite zusammengefasst. Logo und Bildmaterial werden erst nach Zustimmung offiziell verwendet.</p>
</section>}
