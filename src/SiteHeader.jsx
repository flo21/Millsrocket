import React from 'react';
import { ArrowUpRight, Menu, Rocket, X } from 'lucide-react';

const expertises = [
  { title: 'E-commerce', href: '/ecommerce', description: 'Améliorer la marge, les offres, le pilotage et les opérations de votre activité e-commerce.', mobileDescription: 'Améliorer la marge, les offres et le pilotage.' },
  { title: 'ChatGPT Ads', href: '/chatgpt-ads', description: 'Lancer et optimiser vos campagnes ChatGPT Ads pour transformer les recherches en prospects et clients.', mobileDescription: 'Transformer les recherches en prospects et clients.' },
  { title: 'Outils IA & automatisation', href: '/outils-ia', description: 'Créer des outils métiers, automatisations et assistants IA adaptés à vos processus.', mobileDescription: 'Créer des outils métiers et automatisations sur mesure.' },
];

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [activeExpertise, setActiveExpertise] = React.useState(null);
  const closeTimer = React.useRef(null);
  const close = () => setMenuOpen(false);

  React.useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  function showExpertise(title) {
    window.clearTimeout(closeTimer.current);
    setActiveExpertise(title);
  }

  function scheduleClose() {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setActiveExpertise(null), 160);
  }

  return <header className="site-header-global">
    <div className="business-header">
    <a className="brand" href="/" aria-label="Mills Rocket, accueil"><span className="brand-mark"><Rocket size={19} /></span><span>Mills Rocket</span></a>
    <nav className={menuOpen ? 'business-nav business-nav-open' : 'business-nav'} aria-label="Navigation principale">
      {expertises.map((item) => <div className="expertise-nav-item" key={item.title} onMouseEnter={() => showExpertise(item.title)} onMouseLeave={scheduleClose} onFocus={() => showExpertise(item.title)} onBlur={scheduleClose}>
        <a className="expertise-nav-link" href={item.href} onClick={close} aria-describedby={`expertise-${item.title.replaceAll(' ', '-').toLowerCase()}`}>{item.title}</a>
        <a className={activeExpertise === item.title ? 'expertise-popover open' : 'expertise-popover'} href={item.href} onClick={close} id={`expertise-${item.title.replaceAll(' ', '-').toLowerCase()}`} tabIndex="-1">
          <strong>{item.title}<ArrowUpRight size={15} /></strong>
          <span className="expertise-description-desktop">{item.description}</span>
          <span className="expertise-description-mobile">{item.mobileDescription}</span>
        </a>
      </div>)}
      <a className="business-mobile-cta" href="/contact" onClick={close}>Parler de mon projet</a>
    </nav>
    <a className="button button-primary business-header-cta" href="/contact">Parler de mon projet</a>
    <button className="business-menu" type="button" aria-expanded={menuOpen} aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
    </div>
  </header>;
}
