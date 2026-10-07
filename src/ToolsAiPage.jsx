import React from 'react';
import { ArrowDown, ArrowRight, Bot, Check, CircleGauge, GitBranch, LayoutDashboard, Rocket, Workflow, Wrench } from 'lucide-react';
import SiteHeader from './SiteHeader.jsx';
import LeadContactForm from './LeadContactForm.jsx';
import FaqSection from './FaqSection.jsx';

const problems = ['Trop de tâches manuelles', 'Données dispersées', 'Outils mal connectés', 'Contrôles répétitifs', 'Processus lents', 'Manque de visibilité'];
const useCases = [
  { icon: Bot, title: 'Assistant métier', text: 'Un assistant IA qui répond à vos équipes à partir de vos règles, documents et données internes.' },
  { icon: Workflow, title: 'Automatisation de workflows', text: 'Automatiser les tâches répétitives entre vos outils, équipes et systèmes.' },
  { icon: LayoutDashboard, title: 'Dashboard de pilotage', text: 'Centraliser vos indicateurs clés dans une interface simple et exploitable.' },
  { icon: CircleGauge, title: 'Contrôle automatique', text: 'Vérifier automatiquement des prix, données, documents, statuts ou anomalies.' },
  { icon: Wrench, title: 'Outil métier sur mesure', text: 'Créer une interface adaptée à un processus que les logiciels standards couvrent mal.' },
  { icon: GitBranch, title: 'Analyse intelligente', text: 'Croiser vos données pour faire remonter les écarts, risques et opportunités.' },
];
const examples = [
  ['Contrôle automatique des prix partenaires', 'Un outil visite régulièrement les pages partenaires, compare les prix et remonte les écarts.'],
  ['Assistant SAV', 'Un assistant aide les équipes à répondre plus vite à partir des procédures, conditions commerciales et historiques.'],
  ['Pilotage de rentabilité', 'Une interface croise ventes, coûts, commissions et remboursements pour faire remonter la rentabilité réelle.'],
  ['Automatisation documentaire', 'Extraction, classement, validation et traitement automatique de documents récurrents.'],
];
const audiences = ['E-commerce', 'PME et ETI', 'Plateformes', 'Services B2B', 'Équipes opérations et support', 'Entreprises avec plusieurs outils ou bases de données'];
const osPartnerFeatures = ['Pilotage des offres partenaires', 'Contrôle des prix pratiqués', 'Comparaison des produits', 'Détection des écarts tarifaires', 'Analyse de la rentabilité', 'Suivi des commissions', 'Centralisation des informations partenaires', 'Automatisation de contrôles', 'Aide à la décision grâce à l’IA'];

function track(event, params = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, page_type: 'tools_ai_landing', ...params });
  window.dispatchEvent(new CustomEvent('millsrocket:analytics', { detail: { event, ...params } }));
}

function Intro({ eyebrow, title, text, center = false }) {
  return <div className={`tools-ai-intro${center ? ' tools-ai-intro-center' : ''}`}>{eyebrow && <p className="kicker">{eyebrow}</p>}<h2>{title}</h2>{text && <p>{text}</p>}</div>;
}

function ContactForm({ location, final = false }) {
  return <LeadContactForm className={`tools-ai-form${final ? ' tools-ai-form-final' : ''}`} headingClassName="tools-ai-form-heading" errorClassName="tools-ai-error" noteClassName="tools-ai-form-note" eventPrefix="tools_ai" pageType="tools_ai_landing" location={location} projectType="Outils IA et automatisation" requestMessage="Demande de contact depuis la page Outils IA & automatisation." title={final ? 'Parlons de votre besoin' : 'Parlons de votre besoin'} description={final ? 'Expliquez-nous votre processus et voyons comment le simplifier.' : 'Expliquez-nous brièvement ce que vous souhaitez automatiser ou améliorer.'} buttonLabel={final ? 'Parler de mon projet' : 'Être recontacté'} />;
}

export default function ToolsAiPage() {
  React.useEffect(() => {
    if (window.location.hash !== '#os-partner') return undefined;
    const frame = window.requestAnimationFrame(() => document.getElementById('os-partner')?.scrollIntoView({ block: 'start' }));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return <div className="tools-ai-page"><SiteHeader /><main>
    <section className="tools-ai-hero"><div className="tools-ai-hero-inner"><div className="tools-ai-hero-copy"><p className="kicker">OUTILS IA &amp; AUTOMATISATION</p><h1>Créez les outils IA et automatisations adaptés à votre entreprise.</h1><p className="tools-ai-lead">Mills Rocket conçoit des logiciels métiers, automatisations, dashboards et assistants IA sur mesure pour les entreprises, en fonction de leurs processus, données et équipes.</p><p className="tools-ai-tags">Automatisation <i /> Outils métiers <i /> IA <i /> Workflows <i /> Dashboards <i /> Intégrations</p><div className="tools-ai-hero-actions"><a className="button button-primary" href="#contact" onClick={() => track('tools_ai_cta_click', { location: 'hero' })}>Parler de mon projet <ArrowRight size={18} /></a><a className="tools-ai-text-link" href="#cas-usage" onClick={() => track('tools_ai_cta_click', { location: 'use_cases' })}>Voir des cas d’usage <ArrowDown size={17} /></a></div></div><ContactForm location="hero" /></div></section>

    <section className="tools-ai-section tools-ai-problems"><Intro eyebrow="Le quotidien opérationnel" title="Beaucoup d’entreprises utilisent encore trop d’outils mal adaptés." text="Excel, copier-coller, emails, contrôles manuels, doubles saisies, dashboards incomplets… Ces tâches prennent du temps et génèrent des erreurs." /><div className="tools-ai-problem-grid">{problems.map((item, index) => <article key={item}><span>{String(index + 1).padStart(2, '0')}</span><h3>{item}</h3></article>)}</div><p className="tools-ai-callout">Quand une tâche se répète souvent, <strong>elle mérite probablement d’être automatisée.</strong></p></section>

    <section className="tools-ai-section tools-ai-usecases" id="cas-usage"><Intro eyebrow="Des solutions utiles" title="Ce que nous pouvons construire" text="Des solutions adaptées à vos opérations, sans ajouter de complexité inutile." center /><div className="tools-ai-usecase-grid">{useCases.map(({ icon: Icon, title, text }) => <a href="#contact" key={title} onClick={() => track('tools_ai_usecase_click', { usecase: title })}><span className="tools-ai-icon"><Icon size={21} /></span><h3>{title}</h3><p>{text}</p><ArrowRight className="tools-ai-card-arrow" size={18} /></a>)}</div></section>

    <section className="tools-ai-section tools-ai-approach"><Intro eyebrow="Une approche pragmatique" title="Nous ne commençons pas par l’IA." text="Nous commençons par votre problème." center /><div className="tools-ai-steps"><article><span>01</span><h3>Comprendre</h3><p>Identifier le processus, les pertes de temps, les erreurs et les contraintes.</p></article><article><span>02</span><h3>Concevoir</h3><p>Déterminer l’outil ou l’automatisation la plus simple pour résoudre le problème.</p></article><article><span>03</span><h3>Construire</h3><p>Développer, connecter et déployer la solution dans votre environnement.</p></article></div><p className="tools-ai-approach-note">La meilleure solution n’est pas toujours <strong>la plus complexe.</strong></p></section>

    <section className="tools-ai-section tools-ai-examples"><Intro eyebrow="Du concret" title="Exemples concrets" /><div className="tools-ai-example-list">{examples.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></section>

    <section className="tools-ai-reference"><div className="tools-ai-reference-name"><p className="kicker">Référence récente</p><h2><a href="https://4000m.com" target="_blank" rel="noopener noreferrer">4000m.com <ArrowRight size={22} /></a></h2><p>4000m.com est un acteur de référence de la vente de sauts en parachute en ligne en France depuis 2003.</p></div><div className="tools-ai-reference-copy"><h3>Des outils internes au service des opérations.</h3><p>Mills Rocket intervient sur la création d’outils de pilotage, le contrôle des offres partenaires, l’analyse de la rentabilité, l’automatisation de contrôles et l’intégration d’IA dans les processus métier.</p><div className="tools-ai-reference-tags">{['Contrôle des prix', 'Analyse de données', 'Outils de pilotage', 'Automatisation', 'Support aux équipes', 'IA dans les workflows'].map((item) => <span key={item}><Check size={15} />{item}</span>)}</div><blockquote>L’objectif : transformer des tâches manuelles et dispersées en processus plus simples, plus rapides et plus fiables.</blockquote></div></section>

    <section className="tools-ai-os-partner" id="os-partner"><figure className="tools-ai-os-visual"><img src="/os-partner-dashboard.png" alt="Interface OS Partner développée pour 4000m.com, avec tableau de bord opérationnel et contrôles du réseau de partenaires" width="2532" height="1302" loading="lazy" decoding="async" /><figcaption>Interface interne développée pour 4000m.com</figcaption></figure><div className="tools-ai-os-copy"><p className="kicker">Réalisation concrète</p><h2>OS Partner — outil métier développé pour 4000m.com</h2><p className="tools-ai-os-subtitle">Une plateforme conçue pour centraliser le pilotage des partenaires, contrôler les offres et améliorer la rentabilité.</p><p>4000m.com est un acteur de référence de la vente de sauts en parachute en ligne en France depuis 2003.</p><p>OS Partner a été développé par Mills Rocket pour centraliser le pilotage des partenaires, contrôler les offres, comparer les prix et améliorer la visibilité sur la rentabilité.</p><p>L’objectif est de regrouper dans une seule interface les informations utiles à la gestion commerciale et opérationnelle, tout en automatisant les contrôles qui étaient auparavant dispersés ou manuels.</p><dl className="tools-ai-os-facts"><div><dt>Client</dt><dd>4000m.com</dd></div><div><dt>Projet</dt><dd>OS Partner</dd></div><div><dt>Type</dt><dd>Outil métier sur mesure</dd></div><div><dt>Domaines</dt><dd>Pilotage partenaires · Pricing · Rentabilité · Automatisation · IA</dd></div></dl><ul className="tools-ai-os-features">{osPartnerFeatures.map((item) => <li key={item}><Check size={16} />{item}</li>)}</ul><blockquote>OS Partner illustre l’approche Mills Rocket : partir d’un problème métier concret et construire l’outil adapté.</blockquote><p className="tools-ai-os-principle">Plutôt que d’adapter l’entreprise à un logiciel standard, nous pouvons construire le logiciel autour de son fonctionnement réel.</p></div></section>

    <section className="tools-ai-section tools-ai-audience"><Intro eyebrow="Pour les équipes en mouvement" title="Pour quelles entreprises ?" text="Cette expertise est particulièrement adaptée aux entreprises qui ont déjà des processus internes complexes ou répétitifs." /><div className="tools-ai-audience-list">{audiences.map((item) => <span key={item}><Check size={16} />{item}</span>)}</div><p className="tools-ai-crosslinks">Ces solutions peuvent compléter un <a href="/ecommerce">environnement e-commerce</a> ou soutenir le suivi des conversions de campagnes comme <a href="/chatgpt-ads">ChatGPT Ads</a>.</p></section>

    <FaqSection path="/outils-ia" />
    <section className="tools-ai-final" id="contact"><div className="tools-ai-final-copy"><p className="kicker">Passons à l’action</p><h2>Vous avez un processus qui vous fait perdre du temps&nbsp;?</h2><p>Parlons-en et voyons s’il peut être simplifié, automatisé ou transformé en outil.</p></div><ContactForm location="final" final /></section>
  </main><footer className="tools-ai-footer"><a className="brand" href="/" aria-label="Mills Rocket, accueil"><span className="brand-mark"><Rocket size={19} /></span><span>Mills Rocket</span></a><p>Outils métiers <i /> Automatisation <i /> IA utile</p><nav aria-label="Pied de page"><a href="/mentions-legales">Mentions légales</a><a href="/confidentialite">Confidentialité</a><a href="/contact">Contact</a></nav></footer></div>;
}
