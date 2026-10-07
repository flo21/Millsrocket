import React from 'react';
import { ArrowRight, BarChart3, Bot, Check, Lightbulb, Rocket, Settings2, Target } from 'lucide-react';
import SiteHeader from './SiteHeader.jsx';
import FaqSection from './FaqSection.jsx';

const cards = [
  { title: 'E-commerce', text: 'Améliorer la marge, les offres, le pilotage et les opérations de votre activité e-commerce.', points: ['Rentabilité par produit', 'Pricing', 'Partenaires', 'Acquisition', 'SAV', 'Automatisation'], href: '/ecommerce', cta: 'Optimiser mon e-commerce', event: 'homepage_expertise_ecommerce_click', icon: BarChart3 },
  { title: 'ChatGPT Ads', text: 'Tester un nouveau canal d’acquisition et transformer les clics en prospects et clients.', points: ['Stratégie', 'Campagnes', 'Annonces', 'Landing pages', 'Tracking', 'Optimisation'], href: '/chatgpt-ads', cta: 'Découvrir ChatGPT Ads', event: 'homepage_chatgpt_ads_click', icon: Target },
  { title: 'Outils IA & automatisation', text: 'Construire les outils, interfaces et automatisations dont votre entreprise a réellement besoin.', points: ['Outils métiers', 'Automatisations', 'Dashboards', 'Assistants IA', 'Workflows', 'Analyse de données'], href: '/outils-ia', cta: 'Découvrir les outils IA', event: 'homepage_tools_click', icon: Bot },
];

function track(event, params = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, page_type: 'homepage', ...params });
}

function Brand() {
  return <a className="brand" href="/" aria-label="Mills Rocket, accueil"><span className="brand-mark"><Rocket size={19} /></span><span>Mills Rocket</span></a>;
}

function HomeForm() {
  const [values, setValues] = React.useState({ firstName: '', phone: '', email: '' });
  const [errors, setErrors] = React.useState({});
  const [status, setStatus] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const started = React.useRef(false);
  function update(field, value) { setValues((current) => ({ ...current, [field]: value })); if (errors[field]) setErrors((current) => ({ ...current, [field]: '' })); }
  function validate() { const next = {}; if (!values.firstName.trim()) next.firstName = 'Indiquez votre prénom.'; if (!/^[+()\d\s.-]{8,20}$/.test(values.phone.trim())) next.phone = 'Indiquez un numéro valide.'; if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) next.email = 'Indiquez un email valide.'; setErrors(next); return Object.keys(next).length === 0; }
  async function submit(event) {
    event.preventDefault(); setStatus(''); if (!validate()) return; setSubmitting(true);
    try { const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: values.firstName.trim(), phone: values.phone.trim(), email: values.email.trim(), projectType: 'Projet Mills Rocket', message: 'Demande de contact depuis la page d’accueil.' }) }); if (!response.ok) throw new Error(); setValues({ firstName: '', phone: '', email: '' }); setStatus('Merci. Nous revenons vers vous rapidement.'); track('homepage_form_submit'); }
    catch { setStatus('Une erreur est survenue. Réessayez dans quelques instants.'); }
    finally { setSubmitting(false); }
  }
  function start() { if (!started.current) { started.current = true; track('homepage_form_start'); } }
  return <form className="business-form" onSubmit={submit} onFocus={start} noValidate><label>Prénom<input name="firstName" autoComplete="given-name" value={values.firstName} onChange={(e) => update('firstName', e.target.value)} aria-invalid={Boolean(errors.firstName)} required />{errors.firstName && <span>{errors.firstName}</span>}</label><label>Téléphone<input name="phone" type="tel" inputMode="tel" autoComplete="tel" value={values.phone} onChange={(e) => update('phone', e.target.value)} aria-invalid={Boolean(errors.phone)} required />{errors.phone && <span>{errors.phone}</span>}</label><label>Email<input name="email" type="email" inputMode="email" autoComplete="email" value={values.email} onChange={(e) => update('email', e.target.value)} aria-invalid={Boolean(errors.email)} required />{errors.email && <span>{errors.email}</span>}</label><button className="button button-primary" type="submit" disabled={submitting}>{submitting ? 'Envoi en cours…' : 'Parler de mon projet'} {!submitting && <ArrowRight size={18} />}</button><small>Échange sans engagement.</small>{status && <p className="form-status" role="status">{status}</p>}</form>;
}

export default function BusinessHomePage() {
  return <div className="business-home"><SiteHeader /><main>
    <section className="business-hero"><div className="business-hero-copy"><p className="kicker">Stratégie • Croissance • Technologie</p><h1>Stratégie, acquisition et automatisation pour améliorer la performance de votre entreprise.</h1><p>Mills Rocket aide les entreprises à vendre plus, améliorer leur rentabilité et automatiser ce qui peut l’être.</p><p className="business-hero-context">Mills Rocket est une société de conseil et de développement spécialisée dans l’acquisition, l’optimisation e-commerce, l’automatisation et la création d’outils IA pour les entreprises. La stratégie business relie ces leviers aux résultats attendus.</p><div className="business-tags">Acquisition <i /> E-commerce <i /> Rentabilité <i /> Automatisation <i /> IA</div><div className="hero-actions"><a className="button button-primary" href="#contact" onClick={() => track('homepage_contact_click', { location: 'hero' })}>Parler de mon projet <ArrowRight size={18} /></a><a className="button button-secondary" href="#expertises">Découvrir nos expertises</a></div></div><div className="business-visual" aria-hidden="true"><div className="business-chart"><span /><span /><span /><span /><span /></div><div className="business-visual-label"><strong>Stratégie</strong><ArrowRight /><strong>Résultat</strong></div></div></section>

    <section className="business-section" id="expertises"><div className="business-heading"><p className="kicker">Expertises</p><h2>Trois leviers pour faire progresser votre activité.</h2></div><div className="business-expertise-grid">{cards.map((card) => { const Icon = card.icon; return <article key={card.title}><Icon /><h3>{card.title}</h3><p>{card.text}</p><div>{card.points.map((point) => <span key={point}><Check size={14} />{point}</span>)}</div><a href={card.href} onClick={() => track(card.event)}>{card.cta} <ArrowRight size={17} /></a></article>; })}</div></section>

    <section className="business-section business-method" id="methode"><div className="business-heading"><p className="kicker">Notre approche</p><h2>Conseil + Exécution + Technologie</h2><p>Une seule approche : comprendre le problème, construire la solution et mesurer le résultat.</p></div><div className="business-method-grid"><article><Lightbulb /><span>01</span><h3>Comprendre</h3><p>Identifier le problème business, les contraintes et les leviers ayant le plus d’impact.</p></article><article><Settings2 /><span>02</span><h3>Construire</h3><p>Créer la stratégie, le process, la landing page, l’automatisation ou l’outil nécessaire.</p></article><article><BarChart3 /><span>03</span><h3>Mesurer</h3><p>Suivre les résultats, identifier ce qui fonctionne et concentrer les ressources sur les meilleurs leviers.</p></article></div><blockquote>Nous ne vendons pas des heures de développement. Nous cherchons à résoudre des problèmes qui ont un impact sur le chiffre d’affaires, la marge ou l’efficacité.</blockquote></section>

    <section className="business-section business-reference"><div className="business-reference-identity"><p className="kicker">RÉFÉRENCE RÉCENTE</p><a href="https://4000m.com" target="_blank" rel="noopener noreferrer"><h2>4000m.com</h2><ArrowRight size={22} /></a><p>Acteur de référence de la vente de sauts en parachute en ligne en France depuis 2003.</p></div><div className="business-reference-mission"><h3>Une mission au cœur de l’activité.</h3><p>Mills Rocket accompagne 4000m.com sur la rentabilité, le pricing, le pilotage des partenaires, le SAV et le développement d’outils internes.</p><div className="business-reference-tags">{['Rentabilité', 'Pricing', 'Partenaires', 'SAV', 'Acquisition', 'Automatisation', 'Outils IA'].map((item) => <span key={item}>{item}</span>)}</div><p>Parmi les réalisations : OS Partner, un outil métier conçu pour centraliser le pilotage des partenaires, des offres, des prix et de la rentabilité.</p><a className="business-reference-link" href="/outils-ia#os-partner">Voir la réalisation OS Partner <ArrowRight size={17} /></a><a className="business-reference-link" href="/ecommerce">Découvrir notre expertise e-commerce <ArrowRight size={17} /></a></div></section>

    <section className="business-section business-about" id="apropos"><div><p className="kicker">À propos</p><h2>Un interlocuteur capable de comprendre le business et de construire la solution.</h2></div><div><p>Mills Rocket intervient à l’intersection de la stratégie, des opérations et de la technologie.</p><p>L’objectif n’est pas d’ajouter de la complexité ou des outils inutiles. Nous cherchons d’abord à comprendre où se situe le problème, puis nous utilisons la technologie uniquement lorsqu’elle permet d’obtenir un meilleur résultat.</p><div className="business-about-points"><span>Interlocuteur unique</span><span>Vision business</span><span>Capacité d’exécution</span><span>Prototypage rapide</span><span>Approche pragmatique</span></div></div></section>

    <FaqSection path="/" />
    <section className="business-contact" id="contact"><div><p className="kicker">Premier échange</p><h2>Vous avez un problème business à résoudre ?</h2><p>Parlons-en avant de décider de la solution.</p></div><HomeForm /></section>
  </main><footer className="business-footer"><div><Brand /><p>Stratégie <i /> Acquisition <i /> Rentabilité <i /> Automatisation</p></div><nav><a href="/ecommerce">E-commerce</a><a href="/chatgpt-ads">ChatGPT Ads</a><a href="/methode">Méthode</a><a href="/a-propos">À propos</a><a href="/contact">Contact</a><a href="/mentions-legales">Mentions légales</a><a href="/confidentialite">Confidentialité</a></nav></footer></div>;
}
