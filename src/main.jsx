import React from 'react';
import ReactDOM from 'react-dom/client';
import { ArrowRight, Bot, BrainCircuit, CheckCircle2, Code2, ExternalLink, FileText, Globe2, Layers3, LayoutDashboard, LogOut, Mail, Menu, Pencil, Plus, Rocket, Save, Search, ShoppingCart, Sparkles, Target, Trash2, Workflow, X } from 'lucide-react';
import './styles.css';

const navItems = [
  { label: 'Accueil', href: '/' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Lab', href: '/lab' },
  { label: 'Contact', href: '/contact' },
];

const iconMap = { Bot, BrainCircuit, Code2, Globe2, Layers3, Rocket, Search, ShoppingCart, Target, Workflow };

const fallbackContent = {
  seoTitle: 'Mills Rocket — Création de sites, SaaS et automatisations IA',
  metaDescription: 'Mills Rocket accompagne entrepreneurs, startups et entreprises dans la création rapide de sites web, plateformes SaaS, outils métiers, automatisations IA et projets digitaux sur mesure.',
  ogTitle: 'Mills Rocket — Création de sites, SaaS et automatisations IA',
  ogDescription: 'Création rapide de sites web, plateformes SaaS, outils métiers, automatisations IA et projets digitaux sur mesure.',
  heroTitle: 'Je construis des projets digitaux avec la puissance de l’IA.',
  heroSubtitle: 'Solopreneur assisté par IA, j’aide les entrepreneurs et entreprises à transformer rapidement leurs idées en sites, SaaS, automatisations et plateformes concrètes.',
  primaryCta: 'Discuter de mon projet',
  secondaryCta: 'Voir le portfolio',
  presentationTitle: 'Un studio digital solopreneur assisté par IA.',
  presentationText: 'Mills Rocket n’est pas une grosse agence. C’est un studio porté par une seule vision, avec moins d’intermédiaires et plus d’efficacité.\n\nLe client travaille avec une personne qui comprend le business, conçoit le produit et pilote l’exécution, pas avec une chaîne d’intervenants déconnectés. L’objectif n’est pas de vendre du temps, mais de livrer un projet utile, concret et exploitable.',
  aiPositioningTitle: 'Un solopreneur assisté par IA',
  aiPositioningText: 'Mills Rocket repose sur une conviction simple : aujourd’hui, une personne bien organisée, bien équipée et assistée par l’IA peut créer plus vite, tester plus vite et lancer plus vite. J’utilise l’IA pour accélérer l’analyse, le développement, le contenu, le SEO, l’automatisation et l’optimisation des projets.',
  aiCards: [
    { title: 'Vision business', text: 'Une seule personne garde le contexte, comprend l’objectif et relie les choix techniques aux enjeux business.' },
    { title: 'Développement rapide', text: 'L’IA accélère la conception, le code, les itérations et la production des premières versions exploitables.' },
    { title: 'Automatisation IA', text: 'Les workflows IA servent à automatiser les tâches répétitives, structurer les données et gagner en efficacité.' },
    { title: 'Lancement concret', text: 'Le focus reste la mise en ligne, le SEO, les contenus, les tests et l’amélioration après livraison.' },
  ],
  founderTitle: 'Qui est derrière Mills Rocket ?',
  founderText: 'Je m’appelle Florent Moulin.\n\nDepuis plus de 10 ans, je crée des sites web, développe des outils digitaux et accompagne des entreprises dans leurs projets numériques.\n\nJ’ai travaillé dans le développement web, le recrutement, le business development, l’immobilier, le marketing digital et la création d’entreprises.\n\nAujourd’hui, j’ai choisi un modèle différent : celui du solopreneur assisté par l’IA.\n\nGrâce aux outils d’intelligence artificielle, je peux concevoir, développer et lancer des projets beaucoup plus rapidement qu’une structure traditionnelle.\n\nMon objectif n’est pas de vendre du temps mais de créer des solutions concrètes qui répondent à un besoin réel.\n\nJe développe également mes propres projets afin de tester en permanence de nouvelles idées, technologies et stratégies de lancement.',
  founderImage: '/florent-moulin-founder.png',
  founderName: 'Florent Moulin',
  founderRole: 'Fondateur de Mills Rocket',
  founderProjects: ['Spotykite', 'Signal Immo', 'MillsBank', 'Mills Rocket Lab'],
  expertiseTitle: 'Mes domaines d’expertise',
  expertiseItems: ['Développement web', 'Plateformes SaaS', 'Intelligence artificielle', 'Automatisation', 'SEO', 'E-commerce', 'Acquisition digitale', 'Analyse et optimisation de processus'],
  whySolopreneurTitle: 'Pourquoi travailler avec un solopreneur ?',
  whySolopreneurCards: [
    { title: 'Vision unique', text: 'Un seul interlocuteur du début à la fin.' },
    { title: 'Exécution rapide', text: 'Moins de réunions, plus d’action.' },
    { title: 'Assisté par l’IA', text: 'Utilisation quotidienne des meilleurs outils IA pour accélérer le développement.' },
    { title: 'Culture entrepreneuriale', text: 'Je développe également mes propres startups et connais les réalités du terrain.' },
  ],
  founderQuote: 'Je ne vends pas des heures de développement. Je construis des projets capables de créer de la valeur.',
  founderQuoteAuthor: '— Florent Moulin\nFondateur de Mills Rocket',
  homeServicesTitle: 'Des briques concrètes pour construire, lancer et améliorer.',
  homeServicesText: 'Chaque projet peut être traité comme une mission client, un MVP ou une expérimentation rapide.',
  methodTitle: 'Un processus court, lisible et orienté livraison.',
  methodSteps: ['Analyse du besoin', 'Proposition claire', 'Développement rapide', 'Mise en ligne', 'Optimisation'],
  portfolioTitle: 'Des projets variés, du produit au business.',
  portfolioText: 'Références produit, développement, automatisation, acquisition, e-commerce et image de marque.',
  solutionsTitle: 'Des solutions pensées pour les entrepreneurs qui veulent avancer.',
  solutionsText: 'On part du besoin business, puis on construit la version la plus utile.',
  labTitle: 'Un espace pour tester, construire et lancer régulièrement.',
  labText: 'Le Lab rassemble les projets internes, expérimentations IA, prototypes SaaS, automatisations et pistes e-commerce.',
  labItems: ['Expérimentations IA', 'Prototypes SaaS', 'Automatisations business'],
  contactTitle: 'Vous avez une idée ? On peut la transformer en produit lancé.',
  contactText: 'Décrivez votre projet, votre contexte et ce que vous voulez obtenir.',
};

function useRoute() {
  const [path, setPath] = React.useState(window.location.pathname);

  React.useEffect(() => {
    const onPopState = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = React.useCallback((href) => {
    window.history.pushState({}, '', href);
    setPath(href);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return { path: path === '/' ? '/' : path.replace(/\/$/, ''), navigate };
}

async function api(path, options = {}) {
  const token = localStorage.getItem('millsrocket_token');
  const response = await fetch(path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error || 'Erreur API');
  }
  return response.status === 204 ? null : response.json();
}

function useSiteData() {
  const [data, setData] = React.useState({ content: fallbackContent, solutions: [], references: [], loading: true });

  const load = React.useCallback(async () => {
    try {
      const [content, solutions, references] = await Promise.all([
        api('/api/content'),
        api('/api/solutions'),
        api('/api/references'),
      ]);
      setData({ content: { ...fallbackContent, ...content }, solutions, references, loading: false });
    } catch {
      setData((current) => ({ ...current, loading: false }));
    }
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  React.useEffect(() => {
    document.title = data.content.seoTitle || fallbackContent.seoTitle;
    setMeta('description', data.content.metaDescription);
    setProperty('og:title', data.content.ogTitle);
    setProperty('og:description', data.content.ogDescription);
  }, [data.content]);

  return { ...data, reload: load };
}

function setMeta(name, content) {
  const tag = document.querySelector(`meta[name="${name}"]`);
  if (tag && content) tag.setAttribute('content', content);
}

function setProperty(property, content) {
  const tag = document.querySelector(`meta[property="${property}"]`);
  if (tag && content) tag.setAttribute('content', content);
}

function NavLink({ href, children, onNavigate, className }) {
  return (
    <a className={className} href={href} onClick={(event) => {
      event.preventDefault();
      onNavigate(href);
    }}>
      {children}
    </a>
  );
}

function Header({ navigate }) {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="site-header">
      <NavLink className="brand" href="/" onNavigate={navigate}>
        <span className="brand-mark"><Rocket size={19} /></span>
        <span>Mills Rocket</span>
      </NavLink>
      <nav className={open ? 'nav nav-open' : 'nav'} aria-label="Navigation principale">
        {navItems.map((item) => (
          <NavLink key={item.href} href={item.href} onNavigate={(href) => {
            setOpen(false);
            navigate(href);
          }}>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <NavLink className="header-cta" href="/contact" onNavigate={navigate}>Discuter</NavLink>
      <button className="menu-button" type="button" aria-label="Ouvrir le menu" onClick={() => setOpen((value) => !value)}>
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
    </header>
  );
}

function SectionIntro({ kicker, title, text }) {
  return (
    <div className="section-intro">
      <p className="kicker">{kicker}</p>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

function ServiceCard({ item, detailed = false }) {
  const Icon = iconMap[item.icon] || Rocket;
  return (
    <article className="feature-card">
      <div className="icon-box"><Icon size={22} /></div>
      <h3>{item.title}</h3>
      <p>{detailed ? item.detailedDescription || item.shortDescription : item.shortDescription}</p>
    </article>
  );
}

function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <div className="project-topline">
        <span>{project.type}</span>
        <span className="status">{project.status}</span>
      </div>
      {project.image && <img className="project-image" src={project.image} alt="" />}
      <h3>{project.name}</h3>
      <p>{project.shortDescription}</p>
      <div className="tags">
        {project.skills.map((skill) => <span key={skill}>{skill}</span>)}
      </div>
      {project.projectLink && <a className="project-link" href={project.projectLink} target="_blank" rel="noreferrer">Voir le projet <ExternalLink size={15} /></a>}
    </article>
  );
}

function Home({ content, solutions, references, navigate }) {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <p className="kicker">Studio digital solopreneur · millsrocket.com</p>
          <h1>{content.heroTitle}</h1>
          <p className="hero-subtitle">{content.heroSubtitle}</p>
          <div className="hero-actions">
            <NavLink className="button button-primary" href="/contact" onNavigate={navigate}>{content.primaryCta} <ArrowRight size={18} /></NavLink>
            <NavLink className="button button-secondary" href="/portfolio" onNavigate={navigate}>{content.secondaryCta}</NavLink>
          </div>
          <div className="hero-proof">
            <span><CheckCircle2 size={17} /> Solopreneur augmenté par l’IA</span>
            <span><CheckCircle2 size={17} /> Une vision, une exécution rapide</span>
            <span><CheckCircle2 size={17} /> IA & acquisition</span>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <img src="/millsrocket-og.png" alt="" />
        </div>
      </section>
      <section className="section positioning">
        <div>
          <p className="kicker">Positionnement</p>
          <h2>{content.presentationTitle}</h2>
        </div>
        <div className="positioning-text">
          {String(content.presentationText || '').split('\n').filter(Boolean).map((line) => <p key={line}>{line}</p>)}
        </div>
      </section>
      <section className="section ai-positioning">
        <SectionIntro kicker="Approche" title={content.aiPositioningTitle} text={content.aiPositioningText} />
        <div className="ai-card-grid">
          {(content.aiCards || []).map((card) => (
            <article className="feature-card ai-card" key={card.title}>
              <div className="icon-box"><Sparkles size={22} /></div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </section>
      <FounderSection content={content} />
      <section className="section">
        <SectionIntro kicker="Solutions" title={content.homeServicesTitle} text={content.homeServicesText} />
        <div className="feature-grid">{solutions.slice(0, 6).map((item) => <ServiceCard key={item.id} item={item} />)}</div>
      </section>
      <section className="section method-section">
        <SectionIntro kicker="Méthode" title={content.methodTitle} />
        <div className="method-grid">
          {(content.methodSteps || []).map((step, index) => (
            <article className="method-card" key={step}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{step}</h3>
            </article>
          ))}
        </div>
      </section>
      <Portfolio content={content} references={references} compact />
      <section className="section cta-band">
        <h2>{content.contactTitle}</h2>
        <NavLink className="button button-primary" href="/contact" onNavigate={navigate}>{content.primaryCta} <ArrowRight size={18} /></NavLink>
      </section>
    </>
  );
}

function FounderSection({ content }) {
  return (
    <section className="section founder-section">
      <div className="founder-grid">
        <div className="founder-copy">
          <p className="kicker">Fondateur</p>
          <h2>{content.founderTitle}</h2>
          <div className="founder-text">
            {String(content.founderText || '').split('\n').filter(Boolean).map((line) => <p key={line}>{line}</p>)}
          </div>
          <div className="founder-projects">
            <span>Quelques projets</span>
            <div className="tags">
              {(content.founderProjects || []).map((project) => <span key={project}>{project}</span>)}
            </div>
          </div>
        </div>
        <aside className="founder-profile">
          <img src={content.founderImage || '/florent-moulin-founder.png'} alt="Portrait professionnel de Florent Moulin" />
          <div>
            <strong>{content.founderName}</strong>
            <span>{content.founderRole}</span>
          </div>
        </aside>
      </div>
      <div className="expertise-block">
        <h3>{content.expertiseTitle}</h3>
        <div className="expertise-list">
          {(content.expertiseItems || []).map((item) => <span key={item}>{item}</span>)}
        </div>
      </div>
      <div className="why-solopreneur">
        <h3>{content.whySolopreneurTitle}</h3>
        <div className="ai-card-grid">
          {(content.whySolopreneurCards || []).map((card) => (
            <article className="feature-card ai-card" key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </div>
      <blockquote className="founder-quote">
        <p>“{content.founderQuote}”</p>
        <cite>{String(content.founderQuoteAuthor || '').split('\n').map((line) => <span key={line}>{line}</span>)}</cite>
      </blockquote>
    </section>
  );
}

function SolutionsPage({ content, solutions }) {
  return (
    <section className="section solutions-detail page-section">
      <SectionIntro kicker="Offres" title={content.solutionsTitle} text={content.solutionsText} />
      <div className="solution-list">{solutions.map((item) => <ServiceCard key={item.id} item={item} detailed />)}</div>
    </section>
  );
}

function Portfolio({ content, references, compact = false }) {
  return (
    <section className="section portfolio-section page-section">
      <SectionIntro kicker="Portfolio" title={compact ? 'Quelques projets construits ou accompagnés.' : content.portfolioTitle} text={content.portfolioText} />
      <div className="project-grid">{references.map((project) => <ProjectCard key={project.id} project={project} />)}</div>
    </section>
  );
}

function Lab({ content }) {
  return (
    <section className="section lab-section page-section">
      <div className="lab-panel">
        <div>
          <p className="kicker">Lab</p>
          <h2>{content.labTitle}</h2>
          <p>{content.labText}</p>
        </div>
        <div className="lab-list">
          {(content.labItems || []).map((item) => (
            <div className="lab-item" key={item}><Sparkles size={18} /><span>{item}</span></div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact({ content }) {
  const [status, setStatus] = React.useState('');

  async function submit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    try {
      await api('/api/contact', {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(form.entries())),
      });
      event.currentTarget.reset();
      setStatus('Demande envoyée.');
    } catch (error) {
      setStatus(error.message);
    }
  }

  return (
    <section className="section contact-section page-section">
      <div className="contact-copy">
        <p className="kicker">Contact</p>
        <h2>{content.contactTitle}</h2>
        <p>{content.contactText}</p>
        <div className="contact-note"><Mail size={20} /><span>Contact direct via millsrocket.com</span></div>
      </div>
      <form className="contact-form" onSubmit={submit}>
        <label>Nom<input type="text" name="name" autoComplete="name" required /></label>
        <label>Email<input type="email" name="email" autoComplete="email" required /></label>
        <label>Téléphone<input type="tel" name="phone" autoComplete="tel" /></label>
        <label>Type de projet
          <select name="projectType" defaultValue="">
            <option value="" disabled>Choisir une option</option>
            <option>Site vitrine</option><option>Plateforme web</option><option>SaaS / outil métier</option><option>Automatisation IA</option><option>E-commerce</option><option>SEO / acquisition</option>
          </select>
        </label>
        <label>Budget estimé
          <select name="estimatedBudget" defaultValue="">
            <option value="" disabled>Choisir une fourchette</option>
            <option>Moins de 2 000 €</option><option>2 000 € - 5 000 €</option><option>5 000 € - 10 000 €</option><option>10 000 € et plus</option>
          </select>
        </label>
        <label className="full-field">Message<textarea name="message" rows="6" required /></label>
        {status && <p className="form-status full-field">{status}</p>}
        <button className="button button-primary full-field" type="submit">Envoyer ma demande <ArrowRight size={18} /></button>
      </form>
    </section>
  );
}

function Footer({ navigate }) {
  return (
    <footer className="footer">
      <div>
        <NavLink className="brand" href="/" onNavigate={navigate}><span className="brand-mark"><Rocket size={18} /></span><span>Mills Rocket</span></NavLink>
        <p>Création de projets digitaux, SaaS, automatisation IA et plateformes web.</p>
      </div>
      <div className="footer-links"><span>Liens rapides</span>{navItems.map((item) => <NavLink key={item.href} href={item.href} onNavigate={navigate}>{item.label}</NavLink>)}</div>
      <div className="footer-contact"><span>Contact</span><NavLink href="/contact" onNavigate={navigate}>Discuter de mon projet <ExternalLink size={15} /></NavLink></div>
    </footer>
  );
}

function Login({ onLogin }) {
  const [error, setError] = React.useState('');

  async function submit(event) {
    event.preventDefault();
    const form = Object.fromEntries(new FormData(event.currentTarget).entries());
    try {
      const result = await api('/api/admin/login', { method: 'POST', body: JSON.stringify(form) });
      localStorage.setItem('millsrocket_token', result.token);
      onLogin(result.token);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="admin-login">
      <form className="admin-card login-card" onSubmit={submit}>
        <div className="brand"><span className="brand-mark"><Rocket size={18} /></span><span>Mills Rocket Admin</span></div>
        <h1>Connexion admin</h1>
        <label>Email<input name="email" type="email" autoComplete="email" required /></label>
        <label>Mot de passe<input name="password" type="password" autoComplete="current-password" required /></label>
        {error && <p className="admin-error">{error}</p>}
        <button className="button button-primary" type="submit">Se connecter</button>
      </form>
    </main>
  );
}

const blankReference = { name: '', type: '', shortDescription: '', detailedDescription: '', skills: [], status: 'en développement', image: '', projectLink: '', order: 0, active: true };
const blankSolution = { title: '', shortDescription: '', detailedDescription: '', icon: 'Rocket', order: 0, active: true };

function Admin({ navigate }) {
  const [token, setToken] = React.useState(localStorage.getItem('millsrocket_token'));
  const [tab, setTab] = React.useState('content');
  const [content, setContent] = React.useState(fallbackContent);
  const [references, setReferences] = React.useState([]);
  const [solutions, setSolutions] = React.useState([]);
  const [contacts, setContacts] = React.useState([]);
  const [editingReference, setEditingReference] = React.useState(null);
  const [editingSolution, setEditingSolution] = React.useState(null);
  const [message, setMessage] = React.useState('');

  const loadAdmin = React.useCallback(async () => {
    if (!token) return;
    try {
      const [nextContent, nextReferences, nextSolutions, nextContacts] = await Promise.all([
        api('/api/content'),
        api('/api/references?all=1'),
        api('/api/solutions?all=1'),
        api('/api/contact'),
      ]);
      setContent({ ...fallbackContent, ...nextContent });
      setReferences(nextReferences);
      setSolutions(nextSolutions);
      setContacts(nextContacts);
    } catch (error) {
      if (error.message.includes('Session')) {
        localStorage.removeItem('millsrocket_token');
        setToken(null);
      }
    }
  }, [token]);

  React.useEffect(() => {
    loadAdmin();
  }, [loadAdmin]);

  if (!token) return <Login onLogin={setToken} />;

  function logout() {
    localStorage.removeItem('millsrocket_token');
    setToken(null);
    navigate('/');
  }

  async function saveContent(event) {
    event.preventDefault();
    await api('/api/content', { method: 'PUT', body: JSON.stringify(content) });
    setMessage('Contenu enregistré.');
  }

  async function saveReference(item) {
    const payload = { ...item, skills: Array.isArray(item.skills) ? item.skills : String(item.skills || '').split(',').map((skill) => skill.trim()).filter(Boolean) };
    await api(item.id ? `/api/references/${item.id}` : '/api/references', { method: item.id ? 'PUT' : 'POST', body: JSON.stringify(payload) });
    setEditingReference(null);
    await loadAdmin();
  }

  async function saveSolution(item) {
    await api(item.id ? `/api/solutions/${item.id}` : '/api/solutions', { method: item.id ? 'PUT' : 'POST', body: JSON.stringify(item) });
    setEditingSolution(null);
    await loadAdmin();
  }

  async function remove(path, name) {
    if (!window.confirm(`Supprimer "${name}" ?`)) return;
    await api(path, { method: 'DELETE' });
    await loadAdmin();
  }

  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <div className="brand"><span className="brand-mark"><Rocket size={18} /></span><span>Mills Rocket</span></div>
        <button className={tab === 'content' ? 'active' : ''} onClick={() => setTab('content')}><FileText size={18} /> Contenus</button>
        <button className={tab === 'references' ? 'active' : ''} onClick={() => setTab('references')}><LayoutDashboard size={18} /> Références</button>
        <button className={tab === 'solutions' ? 'active' : ''} onClick={() => setTab('solutions')}><Sparkles size={18} /> Solutions</button>
        <button className={tab === 'contacts' ? 'active' : ''} onClick={() => setTab('contacts')}><Mail size={18} /> Demandes</button>
        <button onClick={logout}><LogOut size={18} /> Déconnexion</button>
      </aside>
      <section className="admin-main">
        <div className="admin-heading">
          <div><p className="kicker">Backoffice</p><h1>Gestion du site</h1></div>
          {message && <span className="admin-success">{message}</span>}
        </div>

        {tab === 'content' && <ContentEditor content={content} setContent={setContent} onSubmit={saveContent} />}
        {tab === 'references' && (
          <CrudPanel title="Références / portfolio" onAdd={() => setEditingReference(blankReference)}>
            <AdminTable items={references} columns={['name', 'type', 'status', 'order', 'active']} onEdit={setEditingReference} onDelete={(item) => remove(`/api/references/${item.id}`, item.name)} />
            {editingReference && <ReferenceForm item={editingReference} onCancel={() => setEditingReference(null)} onSave={saveReference} />}
          </CrudPanel>
        )}
        {tab === 'solutions' && (
          <CrudPanel title="Solutions" onAdd={() => setEditingSolution(blankSolution)}>
            <AdminTable items={solutions} columns={['title', 'icon', 'order', 'active']} onEdit={setEditingSolution} onDelete={(item) => remove(`/api/solutions/${item.id}`, item.title)} />
            {editingSolution && <SolutionForm item={editingSolution} onCancel={() => setEditingSolution(null)} onSave={saveSolution} />}
          </CrudPanel>
        )}
        {tab === 'contacts' && <Contacts contacts={contacts} reload={loadAdmin} remove={remove} />}
      </section>
    </main>
  );
}

function CrudPanel({ title, onAdd, children }) {
  return (
    <div className="admin-card">
      <div className="admin-card-head"><h2>{title}</h2><button className="admin-button" onClick={onAdd}><Plus size={17} /> Ajouter</button></div>
      {children}
    </div>
  );
}

function AdminTable({ items, columns, onEdit, onDelete }) {
  return (
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead><tr>{columns.map((column) => <th key={column}>{column}</th>)}<th>Actions</th></tr></thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              {columns.map((column) => <td key={column}>{column === 'active' ? (item.active ? 'actif' : 'inactif') : String(item[column] ?? '')}</td>)}
              <td className="admin-actions"><button onClick={() => onEdit(item)}><Pencil size={16} /></button><button onClick={() => onDelete(item)}><Trash2 size={16} /></button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ContentEditor({ content, setContent, onSubmit }) {
  const fields = [
    ['heroTitle', 'Titre hero'], ['heroSubtitle', 'Sous-titre hero'], ['primaryCta', 'CTA principal'], ['secondaryCta', 'CTA secondaire'],
    ['presentationTitle', 'Titre présentation'], ['presentationText', 'Texte présentation'], ['homeServicesTitle', 'Titre services accueil'], ['homeServicesText', 'Texte services accueil'],
    ['aiPositioningTitle', 'Titre positionnement IA'], ['aiPositioningText', 'Texte positionnement IA'],
    ['founderTitle', 'Titre fondateur'], ['founderText', 'Texte fondateur'], ['founderImage', 'Image fondateur'], ['founderName', 'Nom fondateur'], ['founderRole', 'Rôle fondateur'],
    ['expertiseTitle', 'Titre expertises'], ['whySolopreneurTitle', 'Titre pourquoi solopreneur'], ['founderQuote', 'Citation fondateur'], ['founderQuoteAuthor', 'Auteur citation'],
    ['solutionsTitle', 'Titre page Solutions'], ['solutionsText', 'Texte page Solutions'], ['labTitle', 'Titre Lab'], ['labText', 'Texte Lab'],
    ['contactTitle', 'Titre Contact'], ['contactText', 'Texte Contact'], ['seoTitle', 'SEO title'], ['metaDescription', 'Meta description'], ['ogTitle', 'Open Graph title'], ['ogDescription', 'Open Graph description'],
  ];
  return (
    <form className="admin-card admin-form-grid" onSubmit={onSubmit}>
      <h2 className="full-field">Contenus du site</h2>
      {fields.map(([key, label]) => (
        <label key={key} className={key.toLowerCase().includes('text') || key.toLowerCase().includes('description') ? 'full-field' : ''}>
          {label}
          {key.toLowerCase().includes('text') || key.toLowerCase().includes('description')
            ? <textarea rows="4" value={content[key] || ''} onChange={(e) => setContent({ ...content, [key]: e.target.value })} />
            : <input value={content[key] || ''} onChange={(e) => setContent({ ...content, [key]: e.target.value })} />}
        </label>
      ))}
      <label className="full-field">Étapes méthode, séparées par une virgule<input value={(content.methodSteps || []).join(', ')} onChange={(e) => setContent({ ...content, methodSteps: e.target.value.split(',').map((x) => x.trim()).filter(Boolean) })} /></label>
      <label className="full-field">Items Lab, séparés par une virgule<input value={(content.labItems || []).join(', ')} onChange={(e) => setContent({ ...content, labItems: e.target.value.split(',').map((x) => x.trim()).filter(Boolean) })} /></label>
      <label className="full-field">Cards positionnement IA, format titre | texte, une par ligne<textarea rows="6" value={(content.aiCards || []).map((card) => `${card.title} | ${card.text}`).join('\n')} onChange={(e) => setContent({ ...content, aiCards: e.target.value.split('\n').map((line) => {
        const [title, ...text] = line.split('|');
        return { title: title?.trim(), text: text.join('|').trim() };
      }).filter((card) => card.title && card.text) })} /></label>
      <label className="full-field">Projets fondateur, séparés par une virgule<input value={(content.founderProjects || []).join(', ')} onChange={(e) => setContent({ ...content, founderProjects: e.target.value.split(',').map((x) => x.trim()).filter(Boolean) })} /></label>
      <label className="full-field">Domaines d’expertise, séparés par une virgule<input value={(content.expertiseItems || []).join(', ')} onChange={(e) => setContent({ ...content, expertiseItems: e.target.value.split(',').map((x) => x.trim()).filter(Boolean) })} /></label>
      <label className="full-field">Cards solopreneur, format titre | texte, une par ligne<textarea rows="5" value={(content.whySolopreneurCards || []).map((card) => `${card.title} | ${card.text}`).join('\n')} onChange={(e) => setContent({ ...content, whySolopreneurCards: e.target.value.split('\n').map((line) => {
        const [title, ...text] = line.split('|');
        return { title: title?.trim(), text: text.join('|').trim() };
      }).filter((card) => card.title && card.text) })} /></label>
      <button className="button button-primary full-field" type="submit"><Save size={18} /> Enregistrer les contenus</button>
    </form>
  );
}

function ReferenceForm({ item, onCancel, onSave }) {
  const [form, setForm] = React.useState({ ...item, skills: (item.skills || []).join(', ') });
  return <EntityForm title={item.id ? 'Modifier la référence' : 'Ajouter une référence'} form={form} setForm={setForm} onCancel={onCancel} onSave={() => onSave(form)} fields={[
    ['name', 'Nom du projet'], ['type', 'Type de projet'], ['shortDescription', 'Description courte', 'textarea'], ['detailedDescription', 'Description détaillée', 'textarea'], ['skills', 'Compétences utilisées'], ['status', 'Statut', 'select', ['lancé', 'en développement', 'référence client']], ['image', 'Image'], ['projectLink', 'Lien du projet'], ['order', 'Ordre d’affichage', 'number'], ['active', 'Actif', 'checkbox'],
  ]} />;
}

function SolutionForm({ item, onCancel, onSave }) {
  const [form, setForm] = React.useState(item);
  return <EntityForm title={item.id ? 'Modifier la solution' : 'Ajouter une solution'} form={form} setForm={setForm} onCancel={onCancel} onSave={() => onSave(form)} fields={[
    ['title', 'Titre'], ['shortDescription', 'Description courte', 'textarea'], ['detailedDescription', 'Description détaillée', 'textarea'], ['icon', 'Icône', 'select', Object.keys(iconMap)], ['order', 'Ordre d’affichage', 'number'], ['active', 'Actif', 'checkbox'],
  ]} />;
}

function EntityForm({ title, form, setForm, fields, onCancel, onSave }) {
  return (
    <div className="admin-modal">
      <div className="admin-card admin-form-grid">
        <div className="admin-card-head full-field"><h2>{title}</h2><button className="admin-icon-button" onClick={onCancel}><X size={18} /></button></div>
        {fields.map(([key, label, type, options]) => (
          <label key={key} className={type === 'textarea' ? 'full-field' : ''}>
            {label}
            {type === 'textarea' && <textarea rows="4" value={form[key] || ''} onChange={(e) => setForm({ ...form, [key]: e.target.value })} />}
            {type === 'select' && <select value={form[key] || ''} onChange={(e) => setForm({ ...form, [key]: e.target.value })}>{options.map((option) => <option key={option}>{option}</option>)}</select>}
            {type === 'checkbox' && <input type="checkbox" checked={Boolean(form[key])} onChange={(e) => setForm({ ...form, [key]: e.target.checked })} />}
            {!type && <input value={form[key] || ''} onChange={(e) => setForm({ ...form, [key]: e.target.value })} />}
            {type === 'number' && <input type="number" value={form[key] || 0} onChange={(e) => setForm({ ...form, [key]: Number(e.target.value) })} />}
          </label>
        ))}
        <button className="button button-secondary" type="button" onClick={onCancel}>Annuler</button>
        <button className="button button-primary" type="button" onClick={onSave}><Save size={18} /> Enregistrer</button>
      </div>
    </div>
  );
}

function Contacts({ contacts, reload, remove }) {
  async function toggle(item) {
    await api(`/api/contact/${item.id}`, { method: 'PATCH', body: JSON.stringify({ status: item.status === 'traité' ? 'nouveau' : 'traité' }) });
    await reload();
  }
  return (
    <div className="admin-card">
      <div className="admin-card-head"><h2>Demandes reçues</h2></div>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>Date</th><th>Nom</th><th>Email</th><th>Téléphone</th><th>Projet</th><th>Budget</th><th>Message</th><th>Statut</th><th>Actions</th></tr></thead>
          <tbody>{contacts.map((item) => (
            <tr key={item.id}><td>{item.createdAt}</td><td>{item.name}</td><td>{item.email}</td><td>{item.phone}</td><td>{item.projectType}</td><td>{item.estimatedBudget}</td><td>{item.message}</td><td>{item.status}</td><td className="admin-actions"><button onClick={() => toggle(item)}><CheckCircle2 size={16} /></button><button onClick={() => remove(`/api/contact/${item.id}`, item.name)}><Trash2 size={16} /></button></td></tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}

function App() {
  const { path, navigate } = useRoute();
  const siteData = useSiteData();
  const pages = {
    '/': <Home {...siteData} navigate={navigate} />,
    '/solutions': <SolutionsPage {...siteData} />,
    '/portfolio': <Portfolio {...siteData} />,
    '/lab': <Lab {...siteData} />,
    '/contact': <Contact {...siteData} />,
  };

  if (path === '/admin') return <Admin navigate={navigate} />;

  return (
    <>
      <Header navigate={navigate} />
      <main>{pages[path] || pages['/']}</main>
      <Footer navigate={navigate} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
