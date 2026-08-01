import { BarChart3, CheckCircle2, QrCode, Users } from 'lucide-react'
import ImpactCard from '../components/ImpactCard'
import { Link } from 'react-router-dom'

export default function Dashboard(){return <section className="container section page">
  <span className="eyebrow">Jonas · Verkäufer-Dashboard</span><h1>Dein erster Donosend-Testlauf</h1><p className="lead">Pro Vita Animale e.V. ist als Demo-Organisation ausgewählt. Nach einer erfolgreichen Sandbox-Zahlung kannst du den gesamten Ablauf präsentieren.</p>
  <div className="grid four dashboard-cards"><ImpactCard title="Testbetrag" value="1,00 €" text="pro QR-Transaktion"/><ImpactCard title="Pilotziel" value="500 €" text="für einen späteren Live-Test"/><ImpactCard title="Tester" value="50–100" text="geplanter Alpha-Kreis"/><ImpactCard title="Organisation" value="PVA" text="Pro Vita Animale (Demo)"/></div>
  <div className="dashboard-grid"><article className="panel"><h2><BarChart3/> Pilotstatus</h2><div className="pilot-timeline"><div className="done"><CheckCircle2/> App & QR live</div><div className="done"><CheckCircle2/> Stripe Sandbox verbunden</div><div><span>3</span> Testzahlung abschließen</div><div><span>4</span> Organisation ansprechen</div><div><span>5</span> Live-Onboarding und Testlauf</div></div></article><article className="panel"><h2>Nächster Test</h2><p>Lass deine Freundin den QR-Code scannen und die 1,00-€-Sandbox-Zahlung durchführen.</p><Link className="button primary full" to="/qr"><QrCode/> QR-Code öffnen</Link><div className="clean-list compact"><div><Users/> Kein Konto erforderlich</div><div><CheckCircle2/> Testkarte von Stripe verwenden</div></div></article></div>
</section>}
