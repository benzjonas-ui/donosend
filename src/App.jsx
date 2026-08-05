import { useState } from 'react'
import {
  Bell,
  CheckCircle2,
  Compass,
  Heart,
  Home,
  HandHeart,
  MessageCircle,
  Plus,
  Search,
  Share2,
  Target,
  User,
  Users,
} from 'lucide-react'

const posts = [
  {
    id: 1,
    author: 'Pro Vita Animale',
    handle: '@pro_vita_animale',
    verified: true,
    avatar: 'PV',
    time: 'vor 2 Std.',
    category: 'Projektupdate',
    title: 'Ein sicherer Außenbereich für unsere Hunde',
    text: 'Heute haben die ersten Vorbereitungen begonnen. Mit dem neuen Bereich erhalten unsere Hunde mehr Bewegung, Sicherheit und Ruhe.',
    image: '🐕',
    likes: 186,
    comments: 24,
  },
  {
    id: 2,
    author: 'Jonas Benz',
    handle: '@jonas',
    verified: false,
    avatar: 'JB',
    time: 'vor 5 Std.',
    category: 'Neue Kampagne',
    title: '1.000 km für Pro Vita Animale',
    text: 'Ich möchte mit dem Fahrrad 1.000 Kilometer sammeln und dabei Menschen für den lokalen Tierschutz begeistern. Wer fährt ein Stück mit?',
    image: '🚴',
    likes: 94,
    comments: 17,
  },
  {
    id: 3,
    author: 'Marie',
    handle: '@mariehilft',
    verified: false,
    avatar: 'M',
    time: 'gestern',
    category: 'Community',
    title: 'Mein erster Tag als Helferin',
    text: 'Heute durfte ich beim Sortieren von Futterspenden helfen. Kleine Aufgaben können gemeinsam eine große Wirkung entfalten.',
    image: '🐾',
    likes: 72,
    comments: 8,
  },
]

const navItems = [
  { id: 'feed', label: 'Feed', icon: Home },
  { id: 'discover', label: 'Entdecken', icon: Compass },
  { id: 'create', label: 'Erstellen', icon: Plus },
  { id: 'activity', label: 'Aktivitäten', icon: Bell },
  { id: 'profile', label: 'Profil', icon: User },
]

export default function App() {
  const [activePage, setActivePage] = useState('feed')
  const [likedPosts, setLikedPosts] = useState([])
  const [followingOrganisation, setFollowingOrganisation] = useState(false)
  const [showCreate, setShowCreate] = useState(false)

  function toggleLike(postId) {
    setLikedPosts((current) =>
      current.includes(postId)
        ? current.filter((id) => id !== postId)
        : [...current, postId],
    )
  }

  return (
    <>
      <style>{`
        :root {
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          color: #17352d;
          background: #f5f5ed;
          font-synthesis: none;
        }

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          min-width: 320px;
          background:
            radial-gradient(circle at top left, rgba(218, 244, 157, .28), transparent 32rem),
            #f5f5ed;
        }

        button,
        input {
          font: inherit;
        }

        button {
          cursor: pointer;
        }

        .dono-app {
          min-height: 100vh;
        }

        .topbar {
          position: sticky;
          top: 0;
          z-index: 20;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          height: 76px;
          padding: 0 5vw;
          background: rgba(250, 250, 245, .92);
          border-bottom: 1px solid #dde3d9;
          backdrop-filter: blur(18px);
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
          border: 0;
          padding: 0;
          background: transparent;
          color: #17352d;
          text-align: left;
        }

        .brand-mark {
          display: grid;
          place-items: center;
          width: 44px;
          height: 44px;
          border-radius: 14px;
          background: #dff482;
          color: #17352d;
          box-shadow: 0 8px 22px rgba(23, 53, 45, .10);
        }

        .brand-copy {
          display: grid;
          gap: 3px;
          line-height: 1;
        }

        .brand-name {
          font-size: 25px;
          font-weight: 900;
          letter-spacing: -1px;
        }

        .brand-tagline {
          color: #718079;
          font-size: 8px;
          font-weight: 850;
          letter-spacing: 1.15px;
          text-transform: uppercase;
        }

        .search {
          display: flex;
          align-items: center;
          gap: 10px;
          width: min(430px, 42vw);
          padding: 11px 15px;
          border: 1px solid #dde3d9;
          border-radius: 999px;
          background: white;
        }

        .search input {
          width: 100%;
          border: 0;
          outline: 0;
          color: #17352d;
          background: transparent;
        }

        .top-actions {
          display: flex;
          gap: 10px;
        }

        .icon-button {
          display: grid;
          place-items: center;
          width: 42px;
          height: 42px;
          border: 1px solid #d9e0d5;
          border-radius: 50%;
          background: white;
          color: #17352d;
        }

        .layout {
          display: grid;
          grid-template-columns: 220px minmax(0, 680px) 300px;
          gap: 28px;
          width: min(1240px, 94vw);
          margin: 30px auto 100px;
          align-items: start;
        }

        .sidebar,
        .rightbar {
          position: sticky;
          top: 104px;
        }

        .nav {
          display: grid;
          gap: 7px;
        }

        .nav-button {
          display: flex;
          align-items: center;
          gap: 13px;
          width: 100%;
          padding: 13px 15px;
          border: 0;
          border-radius: 15px;
          background: transparent;
          color: #51645d;
          font-weight: 700;
          text-align: left;
        }

        .nav-button:hover,
        .nav-button.active {
          color: #17352d;
          background: #e8eddf;
        }

        .nav-button.create {
          margin-top: 14px;
          justify-content: center;
          color: white;
          background: #174b3b;
        }

        .profile-mini {
          display: flex;
          align-items: center;
          gap: 11px;
          margin-top: 24px;
          padding: 14px;
          border: 1px solid #dce3d8;
          border-radius: 17px;
          background: rgba(255,255,255,.75);
        }

        .avatar {
          display: grid;
          place-items: center;
          flex: 0 0 auto;
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background: #dff482;
          color: #17352d;
          font-weight: 900;
        }

        .avatar.large {
          width: 90px;
          height: 90px;
          font-size: 27px;
        }

        .muted {
          color: #6f817a;
        }

        .feed-header {
          margin-bottom: 18px;
        }

        .feed-header h1,
        .page-title {
          margin: 0;
          font-size: clamp(28px, 4vw, 40px);
          letter-spacing: -1.4px;
        }

        .feed-tabs {
          display: flex;
          gap: 8px;
          margin-top: 17px;
        }

        .pill {
          padding: 9px 14px;
          border: 1px solid #d8e0d5;
          border-radius: 999px;
          background: white;
          color: #566962;
          font-weight: 700;
        }

        .pill.active {
          color: white;
          background: #174b3b;
          border-color: #174b3b;
        }

        .composer,
        .post-card,
        .side-card,
        .profile-card,
        .project-card,
        .empty-page {
          border: 1px solid #dce3d8;
          border-radius: 22px;
          background: rgba(255, 255, 255, .88);
          box-shadow: 0 12px 35px rgba(32, 65, 53, .06);
        }

        .composer {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 17px;
          padding: 15px;
        }

        .composer button {
          flex: 1;
          padding: 13px 16px;
          border: 1px solid #d8dfd5;
          border-radius: 999px;
          background: #f7f8f4;
          color: #728078;
          text-align: left;
        }

        .post-card {
          margin-bottom: 18px;
          overflow: hidden;
        }

        .post-head {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 18px 18px 10px;
        }

        .post-author {
          flex: 1;
        }

        .author-line {
          display: flex;
          align-items: center;
          gap: 5px;
          font-weight: 850;
        }

        .verified {
          color: #21875e;
        }

        .post-content {
          padding: 5px 18px 17px;
        }

        .eyebrow {
          color: #718e2d;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 1.3px;
          text-transform: uppercase;
        }

        .post-content h2 {
          margin: 8px 0;
          font-size: 23px;
          line-height: 1.18;
          letter-spacing: -.5px;
        }

        .post-content p {
          margin: 0;
          color: #50665e;
          line-height: 1.6;
        }

        .post-visual {
          display: grid;
          place-items: center;
          height: 270px;
          margin: 0 18px;
          border-radius: 20px;
          background:
            linear-gradient(135deg, #ddf47d, #c8e8dc);
          font-size: 100px;
        }

        .post-actions {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 7px;
          padding: 13px 18px 17px;
        }

        .action-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 10px;
          border: 0;
          border-radius: 12px;
          background: transparent;
          color: #61736c;
          font-weight: 700;
        }

        .action-button:hover {
          background: #f0f3ed;
        }

        .action-button.liked {
          color: #b44355;
          background: #fff0f1;
        }

        .side-card {
          margin-bottom: 16px;
          padding: 18px;
        }

        .side-card h3 {
          margin: 0 0 14px;
          font-size: 17px;
        }

        .organisation-row {
          display: flex;
          align-items: center;
          gap: 11px;
        }

        .organisation-row .avatar {
          background: #d4eee1;
        }

        .follow-button {
          width: 100%;
          margin-top: 15px;
          padding: 10px 14px;
          border: 1px solid #174b3b;
          border-radius: 12px;
          background: #174b3b;
          color: white;
          font-weight: 800;
        }

        .follow-button.following {
          color: #174b3b;
          background: white;
        }

        .trend {
          padding: 11px 0;
          border-bottom: 1px solid #edf0eb;
        }

        .trend:last-child {
          border-bottom: 0;
        }

        .trend strong {
          display: block;
          margin-bottom: 4px;
        }

        .profile-card {
          overflow: hidden;
        }

        .profile-cover {
          height: 180px;
          background: linear-gradient(135deg, #dff482, #b9e4d7);
        }

        .profile-body {
          padding: 0 24px 28px;
        }

        .profile-body .avatar {
          margin-top: -46px;
          border: 5px solid white;
        }

        .profile-body h1 {
          margin: 15px 0 3px;
          font-size: 31px;
        }

        .profile-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          margin-top: 24px;
        }

        .stat {
          padding: 15px;
          border-radius: 15px;
          background: #f2f5ee;
          text-align: center;
        }

        .stat strong {
          display: block;
          font-size: 21px;
        }

        .project-card {
          margin-top: 18px;
          padding: 21px;
        }

        .project-card h2 {
          margin: 8px 0;
        }

        .progress {
          height: 11px;
          margin: 17px 0 8px;
          border-radius: 999px;
          background: #e5e9e2;
          overflow: hidden;
        }

        .progress span {
          display: block;
          width: 64%;
          height: 100%;
          border-radius: inherit;
          background: #7ca637;
        }

        .empty-page {
          padding: 45px 30px;
          text-align: center;
        }

        .empty-icon {
          display: grid;
          place-items: center;
          width: 70px;
          height: 70px;
          margin: 0 auto 18px;
          border-radius: 23px;
          background: #e5f1cc;
        }

        .empty-page p {
          max-width: 470px;
          margin: 12px auto 0;
          color: #65776f;
          line-height: 1.6;
        }

        .modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 100;
          display: grid;
          place-items: center;
          padding: 20px;
          background: rgba(20, 42, 35, .48);
          backdrop-filter: blur(7px);
        }

        .modal {
          width: min(480px, 100%);
          padding: 25px;
          border-radius: 24px;
          background: white;
        }

        .create-option {
          display: flex;
          align-items: center;
          gap: 13px;
          width: 100%;
          margin-top: 10px;
          padding: 15px;
          border: 1px solid #dce3d8;
          border-radius: 15px;
          background: #fafbf8;
          color: #17352d;
          text-align: left;
          font-weight: 800;
        }

        .mobile-nav {
          display: none;
        }

        @media (max-width: 1050px) {
          .layout {
            grid-template-columns: 190px minmax(0, 1fr);
          }

          .rightbar {
            display: none;
          }
        }

        @media (max-width: 760px) {
          .topbar {
            height: 66px;
            padding: 0 16px;
          }

          .brand-name {
            font-size: 22px;
          }

          .brand-tagline {
            display: none;
          }

          .brand-mark {
            width: 40px;
            height: 40px;
          }

          .search {
            display: none;
          }

          .sidebar {
            display: none;
          }

          .layout {
            display: block;
            width: min(100% - 24px, 680px);
            margin-top: 20px;
          }

          .post-visual {
            height: 220px;
          }

          .mobile-nav {
            position: fixed;
            left: 12px;
            right: 12px;
            bottom: 12px;
            z-index: 40;
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            padding: 8px;
            border: 1px solid #d7ded4;
            border-radius: 22px;
            background: rgba(255,255,255,.94);
            box-shadow: 0 15px 40px rgba(20,45,36,.18);
            backdrop-filter: blur(18px);
          }

          .mobile-nav button {
            display: grid;
            place-items: center;
            gap: 3px;
            padding: 7px 2px;
            border: 0;
            border-radius: 13px;
            background: transparent;
            color: #75847e;
            font-size: 10px;
            font-weight: 700;
          }

          .mobile-nav button.active {
            color: #174b3b;
            background: #edf3e4;
          }

          .profile-stats {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="dono-app">
        <header className="topbar">
          <button className="brand" onClick={() => setActivePage('feed')}>
            <span className="brand-mark" aria-hidden="true">
              <HandHeart size={24} strokeWidth={2.35} />
            </span>
            <span className="brand-copy">
              <span className="brand-name">Dono</span>
              <span className="brand-tagline">Gemeinsam Wirkung schaffen</span>
            </span>
          </button>

          <label className="search">
            <Search size={19} />
            <input placeholder="Menschen, Projekte und Organisationen suchen" />
          </label>

          <div className="top-actions">
            <button className="icon-button" onClick={() => setActivePage('activity')}>
              <Bell size={20} />
            </button>
            <button className="icon-button" onClick={() => setActivePage('profile')}>
              <User size={20} />
            </button>
          </div>
        </header>

        <div className="layout">
          <aside className="sidebar">
            <nav className="nav">
              {navItems
                .filter((item) => item.id !== 'create')
                .map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    className={`nav-button ${activePage === id ? 'active' : ''}`}
                    onClick={() => setActivePage(id)}
                  >
                    <Icon size={21} />
                    {label}
                  </button>
                ))}

              <button
                className="nav-button create"
                onClick={() => setShowCreate(true)}
              >
                <Plus size={20} />
                Erstellen
              </button>
            </nav>

            <div className="profile-mini">
              <div className="avatar">JB</div>
              <div>
                <strong>Jonas Benz</strong>
                <div className="muted">@jonas</div>
              </div>
            </div>
          </aside>

          <main>
            {activePage === 'feed' && (
              <>
                <div className="feed-header">
                  <span className="eyebrow">Deine Community</span>
                  <h1>Gemeinsam etwas bewegen.</h1>

                  <div className="feed-tabs">
                    <button className="pill active">Für dich</button>
                    <button className="pill">Gefolgt</button>
                    <button className="pill">Lokal</button>
                  </div>
                </div>

                <div className="composer">
                  <div className="avatar">JB</div>
                  <button onClick={() => setShowCreate(true)}>
                    Teile ein Update oder starte eine Kampagne …
                  </button>
                </div>

                {posts.map((post) => {
                  const liked = likedPosts.includes(post.id)

                  return (
                    <article className="post-card" key={post.id}>
                      <div className="post-head">
                        <div className="avatar">{post.avatar}</div>
                        <div className="post-author">
                          <div className="author-line">
                            {post.author}
                            {post.verified && (
                              <CheckCircle2 className="verified" size={17} />
                            )}
                          </div>
                          <div className="muted">
                            {post.handle} · {post.time}
                          </div>
                        </div>
                      </div>

                      <div className="post-content">
                        <span className="eyebrow">{post.category}</span>
                        <h2>{post.title}</h2>
                        <p>{post.text}</p>
                      </div>

                      <div className="post-visual">{post.image}</div>

                      <div className="post-actions">
                        <button
                          className={`action-button ${liked ? 'liked' : ''}`}
                          onClick={() => toggleLike(post.id)}
                        >
                          <Heart size={19} fill={liked ? 'currentColor' : 'none'} />
                          {post.likes + (liked ? 1 : 0)}
                        </button>

                        <button className="action-button">
                          <MessageCircle size={19} />
                          {post.comments}
                        </button>

                        <button className="action-button">
                          <Share2 size={19} />
                          Teilen
                        </button>
                      </div>
                    </article>
                  )
                })}
              </>
            )}

            {activePage === 'profile' && (
              <>
                <section className="profile-card">
                  <div className="profile-cover" />
                  <div className="profile-body">
                    <div className="avatar large">JB</div>
                    <h1>Jonas Benz</h1>
                    <div className="muted">@jonas · Gelsenkirchen</div>

                    <p>
                      Ich möchte Menschen, lokale Unternehmen und Organisationen
                      zusammenbringen, damit gesellschaftliches Engagement zum
                      Alltag wird.
                    </p>

                    <div className="profile-stats">
                      <div className="stat">
                        <strong>126</strong>
                        <span className="muted">Follower</span>
                      </div>
                      <div className="stat">
                        <strong>84</strong>
                        <span className="muted">Gefolgt</span>
                      </div>
                      <div className="stat">
                        <strong>3</strong>
                        <span className="muted">Kampagnen</span>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="project-card">
                  <span className="eyebrow">Aktive Kampagne</span>
                  <h2>1.000 km für Pro Vita Animale</h2>
                  <p className="muted">
                    Gemeinsam mit Freunden fahre ich 1.000 Kilometer für den
                    lokalen Tierschutz.
                  </p>

                  <div className="progress">
                    <span />
                  </div>

                  <strong>640 von 1.000 km erreicht</strong>
                </section>
              </>
            )}

            {activePage === 'discover' && (
              <section className="empty-page">
                <div className="empty-icon">
                  <Compass size={31} />
                </div>
                <h1 className="page-title">Entdecke, was dich bewegt.</h1>
                <p>
                  Finde Menschen, lokale Initiativen, verifizierte
                  Organisationen, Projekte und Teams aus deiner Umgebung.
                </p>

                <section className="project-card">
                  <span className="eyebrow">Empfohlen für dich</span>
                  <h2>Pro Vita Animale</h2>
                  <p className="muted">
                    Tierschutzorganisation aus Essen mit Projekten für Hunde in
                    Not.
                  </p>
                  <button
                    className={`follow-button ${
                      followingOrganisation ? 'following' : ''
                    }`}
                    onClick={() =>
                      setFollowingOrganisation((current) => !current)
                    }
                  >
                    {followingOrganisation ? 'Du folgst' : 'Organisation folgen'}
                  </button>
                </section>
              </section>
            )}

            {activePage === 'activity' && (
              <section className="empty-page">
                <div className="empty-icon">
                  <Bell size={31} />
                </div>
                <h1 className="page-title">Deine Aktivitäten</h1>
                <p>
                  Hier erscheinen künftig neue Follower, Likes, Kommentare,
                  Kampagnen-Meilensteine und Updates unterstützter
                  Organisationen.
                </p>
              </section>
            )}
          </main>

          <aside className="rightbar">
            <section className="side-card">
              <h3>Organisation im Fokus</h3>

              <div className="organisation-row">
                <div className="avatar">PV</div>
                <div>
                  <div className="author-line">
                    Pro Vita Animale
                    <CheckCircle2 className="verified" size={16} />
                  </div>
                  <div className="muted">Tierschutz · Essen</div>
                </div>
              </div>

              <button
                className={`follow-button ${
                  followingOrganisation ? 'following' : ''
                }`}
                onClick={() =>
                  setFollowingOrganisation((current) => !current)
                }
              >
                {followingOrganisation ? 'Du folgst' : 'Folgen'}
              </button>
            </section>

            <section className="side-card">
              <h3>In deiner Nähe</h3>

              <div className="trend">
                <strong>#TierschutzRuhrgebiet</strong>
                <span className="muted">284 Beiträge</span>
              </div>

              <div className="trend">
                <strong>#1000kmFürTiere</strong>
                <span className="muted">96 Unterstützer</span>
              </div>

              <div className="trend">
                <strong>#GemeinsamWirken</strong>
                <span className="muted">Neu bei Dono</span>
              </div>
            </section>

            <section className="side-card">
              <h3>Dein Impact</h3>
              <div className="organisation-row">
                <Target size={27} />
                <div>
                  <strong>3 Projekte begleitet</strong>
                  <div className="muted">42 Menschen aktiviert</div>
                </div>
              </div>
            </section>
          </aside>
        </div>

        <nav className="mobile-nav">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={activePage === id ? 'active' : ''}
              onClick={() => {
                if (id === 'create') {
                  setShowCreate(true)
                } else {
                  setActivePage(id)
                }
              }}
            >
              <Icon size={20} />
              {label}
            </button>
          ))}
        </nav>

        {showCreate && (
          <div
            className="modal-backdrop"
            onClick={() => setShowCreate(false)}
          >
            <div className="modal" onClick={(event) => event.stopPropagation()}>
              <span className="eyebrow">Neu erstellen</span>
              <h2>Was möchtest du bewegen?</h2>

              <button className="create-option">
                <MessageCircle size={22} />
                Beitrag veröffentlichen
              </button>

              <button className="create-option">
                <Target size={22} />
                Kampagne starten
              </button>

              <button className="create-option">
                <Users size={22} />
                Team gründen
              </button>

              <button
                className="follow-button following"
                onClick={() => setShowCreate(false)}
              >
                Abbrechen
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
