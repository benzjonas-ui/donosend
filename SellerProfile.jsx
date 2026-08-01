import { QRCodeSVG } from 'qrcode.react'
import { BadgeCheck, Copy, ExternalLink, Heart, MapPin, QrCode, Share2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { pilot } from '../data'

export default function SellerProfile(){
  const [copied,setCopied]=useState(false)
  const payUrl=useMemo(()=>typeof window==='undefined'?'https://donosend.de/pay/jonas':`${window.location.origin}/pay/jonas`,[])
  async function copyLink(){
    try{await navigator.clipboard.writeText(payUrl);setCopied(true);setTimeout(()=>setCopied(false),1800)}catch{}
  }
  return <section className="container section page seller-profile-page">
    <div className="seller-profile-hero">
      <div className="seller-profile-main">
        <div className="seller-profile-avatar">JB</div>
        <div><span className="eyebrow">Dein öffentliches Verkäuferprofil</span><h1>{pilot.sellerName}</h1><p className="lead">Privater Test-Verkäufer · Gelsenkirchen</p><div className="pilot-badges"><span><BadgeCheck size={18}/> Demo-verifiziert</span><span><MapPin size={18}/> Ruhrgebiet</span></div></div>
      </div>
      <div className="seller-profile-actions"><Link className="button primary" to="/pay/jonas"><QrCode size={18}/> Kundenseite öffnen</Link><button className="button ghost" onClick={copyLink}><Copy size={18}/>{copied?'Link kopiert':'Profil-Link kopieren'}</button></div>
    </div>

    <div className="profile-stat-grid"><article><strong>1,00 €</strong><span>Testbetrag je Vorgang</span></article><article><strong>Pro Vita Animale</strong><span>ausgewählte Organisation</span></article><article><strong>0</strong><span>erfolgreiche Tests</span></article><article><strong>500 €</strong><span>späteres Pilotziel</span></article></div>

    <div className="seller-profile-grid">
      <article className="panel seller-public-card"><span className="eyebrow">Öffentlicher Zahlungslink</span><h2>Dein persönlicher Donosend-Link</h2><p>Diesen Link oder QR-Code kannst du Käufern zeigen. Für die Käufer ist kein Donosend-Login nötig.</p><div className="profile-link-box"><code>{payUrl}</code><button onClick={copyLink}><Copy size={17}/></button></div><div className="actions"><Link className="button primary" to="/pay/jonas"><ExternalLink size={18}/> Als Käufer ansehen</Link><button className="button ghost" onClick={copyLink}><Share2 size={18}/> Teilen</button></div></article>
      <aside className="seller-qr-card"><QRCodeSVG value={payUrl} size={230} level="H" includeMargin/><strong>Jonas’ persönlicher QR-Code</strong><span>Öffnet direkt die 1,00-€-Kundenseite</span></aside>
    </div>

    <article className="selected-organisation-card"><div className="organisation-mark"><Heart size={36}/></div><div><span className="eyebrow">Ausgewählte Organisation</span><h2>Pro Vita Animale e.V. <small>(Demo)</small></h2><p>Die Organisation ist für die Präsentation vorausgewählt. Eine offizielle Partnerschaft besteht noch nicht.</p></div><Link className="button ghost" to="/organisationen">Profil ansehen</Link></article>
  </section>
}
