import { useMemo, useState } from 'react'
import { Routes, Route, NavLink, Link, useParams } from 'react-router-dom'
import {
  Bell, CheckCircle2, Compass, Heart, Home, ImagePlus, MessageCircle,
  Plus, Search, Share2, Sparkles, Trophy, Users, UserRound, X
} from 'lucide-react'

const organisations = [
  {
    id: 'pro-vita-animale',
    name: 'Pro Vita Animale',
    handle: '@provitaanimale',
    category: 'Tierschutz',
    verified: true,
    demo: true,
    avatar: '🐾',
    cover: 'linear-gradient(135deg,#d6f2a6,#93d4b2)',
    bio: 'Wir geben Hunden in Not Schutz, Versorgung und die Chance auf ein neues Zuhause.',
    followers: 1248,
    projects: 3,
  },
  {
    id: 'gruene-zukunft',
    name: 'Grüne Zukunft Ruhr',
    handle: '@gruenezukunft',
    category: 'Umwelt',
    verified: true,
    demo: true,
    avatar: '🌱',
    cover: 'linear-gradient(135deg,#bfe6d0,#e9e1a4)',
    bio: 'Lokale Naturprojekte, Gemeinschaftsgärten und Klimabildung im Ruhrgebiet.',
    followers: 817,
    projects: 5,
  }
]

const projects = [
  {
    id: 'hundegehege',
    organisationId: 'pro-vita-animale',
    title: 'Ein neues, sicheres Hundegehege',
    description: 'Mehr Platz, Schutz vor Wetter und sichere Rückzugsorte für Hunde, die auf ein Zuhause warten.',
    progress: 64,
    goal: 15000,
    supporters: 286,
    likes: 482,
    comments: 37,
    emoji: '🐕',
  },
  {
    id: 'schulgarten',
    organisationId: 'gruene-zukunft',
    title: 'Schulgarten für Essen-Kray',
    description: 'Kinder lernen gemeinsam, wie Lebensmittel wachsen und Natur in der Stadt funktioniert.',
    progress: 42,
    goal: 8000,
    supporters: 144,
    likes: 309,
    comments: 18,
    emoji: '🌻',
  }
]

const campaigns = [
  {
    id: '1000-km-tierheim',
    creator: 'Jonas Benz',
    avatar: 'JB',
    title: '1.000 km für Pro Vita Animale',
    description: 'Ich sammle Kilometer mit dem Gravelbike und nehme euch bei jeder Etappe mit. Gemeinsam unterstützen wir das Hundegehege.',
    projectId: 'hundegehege',
    progress: 38,
    supporters: 42,
    team: ['JB','MB','BK'],
    updates: 6,
  }
]

const initialPosts = [
  {
    id: 1,
    type: 'campaign',
    author: 'Jonas Benz',
    handle: '@jonas',
    avatar: 'JB',
    time: 'vor 18 Min.',
    text: 'Die erste Tour ist geschafft: 42 km Richtung 1.000-km-Ziel. Wer fährt bei der nächsten Etappe mit? 🚲',
    visual: 'ride',
    likes: 67,
    comments: 12,
    linked: '1000-km-tierheim',
  },
  {
    id: 2,
    type: 'organisation',
    author: 'Pro Vita Animale',
    handle: '@provitaanimale',
    avatar: '🐾',
    verified: true,
    time: 'vor 2 Std.',
    text: 'Heute durfte Balu zum ersten Mal ohne Angst mit zwei anderen Hunden im Auslauf spielen. Kleine Fortschritte bedeuten für uns alles.',
    visual: 'dog',
    likes: 238,
    comments: 31,
    linked: 'pro-vita-animale',
  },
  {
    id: 3,
    type: 'project',
    author: 'Grüne Zukunft Ruhr',
    handle: '@gruenezukunft',
    avatar: '🌱',
    verified: true,
    time: 'gestern',
    text: 'Das erste Hochbeet steht. Am Samstag bauen wir gemeinsam weiter – Helferinnen und Helfer sind herzlich willkommen.',
    visual: 'garden',
    likes: 141,
    comments: 19,
    linked: 'schulgarten',
  }
]

function Logo(){
  return <Link className="logo" to="/"><span className="logo-mark">d</span><span>Dono</span></Link>
}

function Layout({children, onCreate}){
  const nav = [
    ['/', Home, 'Feed'], ['/discover', Compass, 'Entdecken'], ['/activity', Bell, 'Aktivität'], ['/profile/jonas', UserRound, 'Profil']
  ]
  return <div className="app-shell">
    <aside className="sidebar">
      <Logo />
      <nav>{nav.map(([to,Icon,label])=><NavLink key={to} to={to} end={to==='/' } className={({isActive})=>isActive?'nav-link active':'nav-link'}><Icon size={21}/><span>{label}</span></NavLink>)}</nav>
      <button className="create-main" onClick={onCreate}><Plus size={20}/> Erstellen</button>
      <div className="sidebar-card"><strong>Dein Impact</strong><span>3 Projekte begleitet</span><div className="mini-progress"><i style={{width:'62%'}}/></div><small>Nächstes Badge bei 5 Projekten</small></div>
    </aside>
    <main className="main-content">{children}</main>
    <aside className="rightbar">
      <div className="search-box"><Search size={18}/><input placeholder="Dono durchsuchen"/></div>
      <section className="side-panel"><h3>Vorgeschlagen für dich</h3>{organisations.map(org=><MiniOrg key={org.id} org={org}/>)}</section>
      <section className="side-panel"><h3>Deine nächste Etappe</h3><Link className="campaign-mini" to="/campaign/1000-km-tierheim"><span>🚲</span><div><strong>1.000 km für Tiere</strong><small>380 von 1.000 km</small></div></Link></section>
    </aside>
    <nav className="bottom-nav">{nav.map(([to,Icon,label])=><NavLink key={to} to={to} end={to==='/' }><Icon size={22}/><span>{label}</span></NavLink>)}<button onClick={onCreate}><Plus size={22}/><span>Erstellen</span></button></nav>
  </div>
}

function MiniOrg({org}){
  const [following,setFollowing]=useState(false)
  return <div className="mini-org"><Link className="avatar org-avatar" to={`/organisation/${org.id}`}>{org.avatar}</Link><div><Link to={`/organisation/${org.id}`}><strong>{org.name} {org.verified&&<CheckCircle2 size={14}/>}</strong></Link><small>{org.category}</small></div><button className={following?'follow following':'follow'} onClick={()=>setFollowing(v=>!v)}>{following?'Gefolgt':'Folgen'}</button></div>
}

function Feed(){
  const [posts,setPosts]=useState(initialPosts)
  const [tab,setTab]=useState('Für dich')
  const toggleLike=id=>setPosts(ps=>ps.map(p=>p.id===id?{...p,liked:!p.liked,likes:p.likes+(p.liked?-1:1)}:p))
  return <div className="page feed-page">
    <header className="mobile-header"><Logo/><button><Bell size={21}/></button></header>
    <div className="page-title"><div><span className="eyebrow">Deine Community</span><h1>Was bewegt euch heute?</h1></div><button className="icon-button"><Sparkles size={20}/></button></div>
    <div className="feed-tabs">{['Für dich','Gefolgt','In deiner Nähe'].map(t=><button key={t} className={tab===t?'active':''} onClick={()=>setTab(t)}>{t}</button>)}</div>
    <Composer />
    <Stories />
    <div className="feed-list">{posts.map(post=><PostCard key={post.id} post={post} toggleLike={toggleLike}/>)}</div>
  </div>
}

function Composer(){return <button className="composer" onClick={()=>document.querySelector('.create-main')?.click()}><span className="avatar">JB</span><span>Teile ein Update mit deiner Community …</span><ImagePlus size={20}/></button>}

function Stories(){return <div className="stories"><Link to="/profile/jonas" className="story add-story"><span><Plus/></span><small>Dein Update</small></Link>{organisations.map(o=><Link key={o.id} to={`/organisation/${o.id}`} className="story"><span>{o.avatar}</span><small>{o.name.split(' ')[0]}</small></Link>)}<Link to="/campaign/1000-km-tierheim" className="story"><span>🚲</span><small>Jonas’ Tour</small></Link><Link to="/project/schulgarten" className="story"><span>🌻</span><small>Schulgarten</small></Link></div>}

function PostCard({post,toggleLike}){
  const href=post.type==='organisation'?`/organisation/${post.linked}`:post.type==='project'?`/project/${post.linked}`:`/campaign/${post.linked}`
  return <article className="post-card">
    <div className="post-head"><Link className="avatar" to={href}>{post.avatar}</Link><div><Link to={href}><strong>{post.author} {post.verified&&<CheckCircle2 size={15}/>}</strong></Link><small>{post.handle} · {post.time}</small></div><button className="more">•••</button></div>
    <p className="post-text">{post.text}</p>
    <Link to={href} className={`post-visual ${post.visual}`}><div className="visual-copy">{post.visual==='ride'&&<><span>42 km geschafft</span><strong>1.000 km für Tiere</strong><small>Gemeinsam unterwegs für Pro Vita Animale</small></>}{post.visual==='dog'&&<><span>Projektupdate</span><strong>Balu macht Fortschritte 🐕</strong><small>Ein ruhiger Tag im neuen Auslauf</small></>}{post.visual==='garden'&&<><span>Gemeinsam anpacken</span><strong>Das erste Hochbeet steht</strong><small>Nächster Bautag: Samstag, 10 Uhr</small></>}</div></Link>
    <div className="post-actions"><button className={post.liked?'liked':''} onClick={()=>toggleLike(post.id)}><Heart size={20} fill={post.liked?'currentColor':'none'}/><span>{post.likes}</span></button><button><MessageCircle size={20}/><span>{post.comments}</span></button><button><Share2 size={20}/><span>Teilen</span></button></div>
  </article>
}

function Discover(){
 const [query,setQuery]=useState('')
 const all=useMemo(()=>[
  ...organisations.map(o=>({...o,kind:'Organisation'})),
  ...projects.map(p=>({...p,name:p.title,kind:'Projekt',avatar:p.emoji})),
  ...campaigns.map(c=>({...c,name:c.title,kind:'Kampagne',avatar:'🚲'})),
  {id:'jonas',name:'Jonas Benz',kind:'Person',avatar:'JB',bio:'Gemeinsam lokal etwas bewegen.'}
 ],[])
 const visible=all.filter(x=>`${x.name} ${x.kind} ${x.bio||x.description||''}`.toLowerCase().includes(query.toLowerCase()))
 return <div className="page"><div className="page-title"><div><span className="eyebrow">Entdecken</span><h1>Finde Menschen und Ideen</h1></div></div><div className="discover-search"><Search/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Personen, Organisationen, Projekte …"/></div><div className="category-row">{['Alles','Tierschutz','Umwelt','Lokal','Sport','Soziales'].map(x=><button key={x}>{x}</button>)}</div><div className="discover-grid">{visible.map(item=><Link key={`${item.kind}-${item.id}`} to={item.kind==='Organisation'?`/organisation/${item.id}`:item.kind==='Projekt'?`/project/${item.id}`:item.kind==='Kampagne'?`/campaign/${item.id}`:`/profile/${item.id}`} className="discover-card"><span className="discover-avatar">{item.avatar}</span><small>{item.kind}</small><strong>{item.name}</strong><p>{item.bio||item.description}</p><span className="text-link">Ansehen →</span></Link>)}</div></div>
}

function Profile(){
 const [following,setFollowing]=useState(false)
 return <div className="page"><div className="profile-cover green-cover"/><section className="profile-header"><span className="profile-avatar">JB</span><div className="profile-actions"><button className="secondary">Profil bearbeiten</button></div><h1>Jonas Benz</h1><span className="muted">@jonas · Gelsenkirchen</span><p>Ich verbinde Menschen, lokale Unternehmen und gute Projekte. Aktuell radle ich 1.000 km für den Tierschutz.</p><div className="stats"><span><strong>128</strong> Follower</span><span><strong>96</strong> Gefolgt</span><span><strong>3</strong> Kampagnen</span></div></section><div className="impact-strip"><div><Trophy/><span><strong>Impact Level 4</strong><small>Community Builder</small></span></div><div><Users/><span><strong>42</strong><small>Unterstützer aktiviert</small></span></div><div><Heart/><span><strong>5</strong><small>Projekte begleitet</small></span></div></div><section className="profile-section"><div className="section-head"><h2>Aktive Kampagne</h2><Link to="/campaign/1000-km-tierheim">Alle ansehen</Link></div><CampaignCard campaign={campaigns[0]}/></section><section className="profile-section"><h2>Unterstützte Organisationen</h2><div className="org-row">{organisations.map(o=><MiniOrg key={o.id} org={o}/>)}</div></section></div>
}

function Organisation(){
 const {id}=useParams(); const org=organisations.find(o=>o.id===id)||organisations[0]; const [following,setFollowing]=useState(false); const orgProjects=projects.filter(p=>p.organisationId===org.id)
 return <div className="page"><div className="profile-cover" style={{background:org.cover}}/><section className="profile-header organisation-header"><span className="profile-avatar org-big">{org.avatar}</span><div className="profile-actions"><button className={following?'primary':'secondary'} onClick={()=>setFollowing(v=>!v)}>{following?'Du folgst':'Folgen'}</button></div><span className="eyebrow">Verifizierte Organisation {org.demo&&'· Demo-Profil'}</span><h1>{org.name} <CheckCircle2 size={22}/></h1><span className="muted">{org.handle} · {org.category}</span><p>{org.bio}</p><div className="stats"><span><strong>{org.followers.toLocaleString('de-DE')}</strong> Follower</span><span><strong>{org.projects}</strong> Projekte</span><span><strong>87</strong> Updates</span></div></section>{org.demo&&<div className="demo-note"><strong>Präsentationsprofil</strong><span>Noch keine offizielle Partnerschaft. Inhalte und Kennzahlen dienen der Alpha-Demonstration.</span></div>}<section className="profile-section"><div className="section-head"><h2>Aktuelle Projekte</h2><button className="text-button">Updates folgen</button></div><div className="project-grid">{orgProjects.map(p=><ProjectCard key={p.id} project={p}/>)}</div></section><section className="profile-section"><h2>Neueste Updates</h2><div className="simple-update"><span className="avatar">{org.avatar}</span><div><strong>Ein guter Tag im Auslauf</strong><p>Heute konnten drei Hunde gemeinsam trainieren. Danke an alle Ehrenamtlichen.</p><small>vor 2 Stunden · 238 Likes</small></div></div></section></div>
}

function Project(){
 const {id}=useParams(); const p=projects.find(x=>x.id===id)||projects[0]; const org=organisations.find(o=>o.id===p.organisationId); const [liked,setLiked]=useState(false)
 return <div className="page"><Link to={`/organisation/${org.id}`} className="back-link">← Zur Organisation</Link><div className="project-hero"><div className="project-art">{p.emoji}</div><div className="project-info"><span className="eyebrow">Offizielles Projekt von {org.name}</span><h1>{p.title}</h1><p>{p.description}</p><div className="progress-large"><i style={{width:`${p.progress}%`}}/></div><div className="progress-label"><strong>{p.progress}% erreicht</strong><span>{p.supporters} Unterstützer</span></div><div className="hero-actions"><button className={liked?'primary':'secondary'} onClick={()=>setLiked(v=>!v)}><Heart size={18} fill={liked?'currentColor':'none'}/>{liked?'Gemerkt':'Projekt merken'}</button><Link className="primary" to={`/create?project=${p.id}`}><Plus size={18}/> Kampagne starten</Link></div></div></div><section className="content-card"><h2>Worum geht es?</h2><p>Mit diesem Projekt soll ein geschützter, wetterfester und artgerechter Bereich entstehen. Die Community kann Updates verfolgen, Fragen stellen und eigene Aktionen für dieses Projekt starten.</p><div className="milestones"><div><CheckCircle2/><span><strong>Planung abgeschlossen</strong><small>Fläche und Anforderungen abgestimmt</small></span></div><div><Sparkles/><span><strong>Nächster Meilenstein</strong><small>Material und Helferteams organisieren</small></span></div></div></section><section className="content-card"><h2>Community</h2><div className="comment"><span className="avatar">MB</span><p><strong>Marie</strong> Das ist genau die Art Projekt, bei der ich am Wochenende mithelfen würde.</p></div><div className="comment"><span className="avatar">BK</span><p><strong>Ben</strong> Unser Team könnte Materialtransport übernehmen.</p></div><div className="comment-input"><input placeholder="Schreibe einen Kommentar …"/><button>Senden</button></div></section></div>
}

function Campaign(){
 const {id}=useParams(); const c=campaigns.find(x=>x.id===id)||campaigns[0]; const p=projects.find(x=>x.id===c.projectId); const [joined,setJoined]=useState(false)
 return <div className="page"><div className="campaign-hero"><div><span className="eyebrow">Community-Kampagne</span><h1>{c.title}</h1><p>{c.description}</p><div className="campaign-owner"><span className="avatar">JB</span><span>gestartet von <Link to="/profile/jonas"><strong>Jonas Benz</strong></Link></span></div><div className="hero-actions"><button className="primary" onClick={()=>setJoined(v=>!v)}>{joined?'Du bist dabei ✓':'Kampagne unterstützen'}</button><button className="secondary"><Share2 size={18}/> Teilen</button></div></div><div className="campaign-meter"><strong>{c.progress}%</strong><span>des Kilometerziels</span><div className="ring"><i style={{'--progress':`${c.progress*3.6}deg`}}/></div></div></div><div className="impact-strip"><div><Users/><span><strong>{c.supporters}</strong><small>Unterstützer</small></span></div><div><MessageCircle/><span><strong>{c.updates}</strong><small>Updates</small></span></div><div><Trophy/><span><strong>380 km</strong><small>geschafft</small></span></div></div><section className="content-card"><h2>Verbundenes Projekt</h2><ProjectCard project={p}/></section><section className="content-card"><h2>Team</h2><div className="team-row">{c.team.map(x=><span className="team-avatar" key={x}>{x}</span>)}<button className="team-add"><Plus/> Einladen</button></div></section></div>
}

function Activity(){return <div className="page"><div className="page-title"><div><span className="eyebrow">Aktivität</span><h1>Was in deiner Community passiert</h1></div></div><div className="activity-list">{[
 ['🐾','Pro Vita Animale hat ein neues Projektupdate veröffentlicht.','vor 18 Min.'],['MB','Marie gefällt deine Kampagne „1.000 km für Tiere“.','vor 1 Std.'],['BK','Ben möchte deinem Team beitreten.','vor 3 Std.'],['🏆','Du hast das Badge „Community Starter“ erreicht.','gestern'],['🌱','Grüne Zukunft Ruhr folgt dir jetzt.','vor 2 Tagen']
 ].map(([a,t,time],i)=><div className="activity-item" key={i}><span className="avatar">{a}</span><div><p>{t}</p><small>{time}</small></div>{i===2&&<button className="follow">Annehmen</button>}</div>)}</div></div>}

function CampaignCard({campaign}){return <Link to={`/campaign/${campaign.id}`} className="campaign-card"><div className="campaign-icon">🚲</div><div><span className="eyebrow">Community-Kampagne</span><h3>{campaign.title}</h3><p>{campaign.description}</p><div className="mini-progress"><i style={{width:`${campaign.progress}%`}}/></div><small>{campaign.supporters} Unterstützer · {campaign.progress}% des Ziels</small></div></Link>}
function ProjectCard({project}){return <Link to={`/project/${project.id}`} className="project-card"><span className="project-emoji">{project.emoji}</span><div><small>Offizielles Projekt</small><h3>{project.title}</h3><p>{project.description}</p><div className="mini-progress"><i style={{width:`${project.progress}%`}}/></div><span>{project.progress}% · {project.supporters} Unterstützer</span></div></Link>}

function CreateModal({close}){
 const [mode,setMode]=useState('Beitrag')
 return <div className="modal-backdrop" onMouseDown={e=>e.target===e.currentTarget&&close()}><div className="modal"><button className="modal-close" onClick={close}><X/></button><span className="eyebrow">Etwas bewegen</span><h2>Was möchtest du erstellen?</h2><div className="create-tabs">{['Beitrag','Kampagne','Team'].map(x=><button key={x} className={mode===x?'active':''} onClick={()=>setMode(x)}>{x}</button>)}</div>{mode==='Beitrag'&&<><textarea placeholder="Was möchtest du mit deiner Community teilen?"/><div className="upload-placeholder"><ImagePlus/><span>Bild oder Video hinzufügen</span></div><button className="primary wide" onClick={close}>Beitrag veröffentlichen</button></>}{mode==='Kampagne'&&<><label>Projekt auswählen<select><option>Ein neues, sicheres Hundegehege</option><option>Schulgarten für Essen-Kray</option></select></label><label>Titel<input defaultValue="Meine Aktion für das Hundegehege"/></label><label>Beschreibung<textarea placeholder="Was hast du vor?"/></label><button className="primary wide" onClick={close}>Kampagne als Entwurf anlegen</button></>}{mode==='Team'&&<><label>Teamname<input placeholder="z. B. Ruhrpott bewegt"/></label><label>Worum geht es?<textarea placeholder="Beschreibe euer gemeinsames Ziel"/></label><button className="primary wide" onClick={close}>Team erstellen</button></>}</div></div>
}

export default function App(){
 const [createOpen,setCreateOpen]=useState(false)
 return <><Layout onCreate={()=>setCreateOpen(true)}><Routes><Route path="/" element={<Feed/>}/><Route path="/discover" element={<Discover/>}/><Route path="/activity" element={<Activity/>}/><Route path="/profile/:id" element={<Profile/>}/><Route path="/organisation/:id" element={<Organisation/>}/><Route path="/project/:id" element={<Project/>}/><Route path="/campaign/:id" element={<Campaign/>}/><Route path="*" element={<Feed/>}/></Routes></Layout>{createOpen&&<CreateModal close={()=>setCreateOpen(false)}/>}</>
}
