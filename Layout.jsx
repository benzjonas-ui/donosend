import { HeartHandshake, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Layout({ children }) {
  const [open, setOpen] = useState(false)
  const links = [['/', 'Start'], ['/partner', 'Partner'], ['/organisationen', 'Organisationen'], ['/profil/jonas', 'Mein Profil'], ['/dashboard', 'Dashboard'], ['/qr', 'QR-Code']]
  return <div className="app-shell">
    <header className="topbar">
      <Link className="brand" to="/"><span className="brand-mark"><HeartHandshake size={22}/></span>Donosend</Link>
      <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Menü">{open ? <X/> : <Menu/>}</button>
      <nav className={open ? 'nav open' : 'nav'}>
        {links.map(([to, label]) => <NavLink key={to} to={to} onClick={() => setOpen(false)}>{label}</NavLink>)}
      </nav>
    </header>
    <main>{children}</main>
    <footer><strong>Donosend</strong><span>Transparente Wirkung. Einfache Zahlungen. Starke Gemeinschaft.</span></footer>
  </div>
}
