import { CircleCheckBig } from 'lucide-react'
import { Link } from 'react-router-dom'
export default function Success(){return <section className="center-page"><CircleCheckBig size={64}/><h1>Testzahlung erfolgreich</h1><p>Die Zahlung wurde im Stripe-Testmodus abgeschlossen.</p><Link className="button primary" to="/dashboard">Wirkung ansehen</Link></section>}
