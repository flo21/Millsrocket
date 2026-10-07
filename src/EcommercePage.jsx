import React from 'react';
import { ArrowRight, BarChart3, Bot, Check, CheckCircle2, Lightbulb, Rocket, Settings2 } from 'lucide-react';
import SiteHeader from './SiteHeader.jsx';
import LeadContactForm from './LeadContactForm.jsx';
import FaqSection from './FaqSection.jsx';

const problems = ['Acquisition trop coûteuse', 'Produits insuffisamment rentables', 'Pricing mal optimisé', 'Partenaires difficiles à piloter', 'SAV trop coûteux', 'Processus trop manuels'];
const caseTopics = ['Analyse de la rentabilité par produit et partenaire', 'Optimisation des commissions', 'Contrôle des prix pratiqués par les partenaires', 'Optimisation des produits additionnels', 'Amélioration du SAV', 'Optimisation des processus internes', 'Création d’outils de pilotage', 'Automatisation de contrôles', 'Intégration d’intelligence artificielle dans les outils métier'];
const businessQuestions = ['Quels sont mes produits les plus rentables ?', 'Où est-ce que je perds de la marge ?', 'Quels partenaires me rapportent réellement le plus ?', 'Où dois-je investir davantage en acquisition ?', 'Combien me coûte réellement mon SAV ?', 'Quelles tâches devrais-je automatiser ?'];

function track(event, params = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, page_type: 'ecommerce_landing', ...params });
  window.dispatchEvent(new CustomEvent('millsrocket:analytics', { detail: { event, ...params } }));
}

function Brand() {
  return <a className="brand" href="/" aria-label="Mills Rocket, accueil"><span className="brand-mark"><Rocket size={19} /></span><span>Mills Rocket</span></a>;
}

function Intro({ eyebrow, title, text, center = false }) {
  return <div className={`eco-intro${center ? ' eco-intro-center' : ''}`}>{eyebrow && <p className="kicker">{eyebrow}</p>}<h2>{title}</h2>{text && <p>{text}</p>}</div>;
}

function CheckList({ items }) {
  return <div className="eco-checklist">{items.map((item) => <div key={item}><Check size={17} aria-hidden="true" /><span>{item}</span></div>)}</div>;
}

export default function EcommercePage() {
  return <div className="ecommerce-page ecommerce-page-short"><SiteHeader /><main>
    <section className="eco-hero eco-hero-short"><div className="eco-hero-glow" aria-hidden="true" /><div className="eco-hero-copy"><p className="kicker">Rentabilité e-commerce</p><h1>Améliorez la rentabilité de votre e-commerce.</h1><p className="eco-hero-subtitle">Mills Rocket accompagne les entreprises e-commerce dans l’amélioration de leur marge, de leur pricing, de leur acquisition, de leur SAV et de leur pilotage opérationnel.</p><p className="eco-levers">Acquisition <i /> Pricing <i /> Offres <i /> Partenaires <i /> SAV <i /> Marge <i /> Automatisation</p></div><LeadContactForm className="eco-short-form" headingClassName="eco-form-heading" errorClassName="eco-field-error" noteClassName="eco-form-note" eventPrefix="ecommerce" pageType="ecommerce_landing" location="hero" projectType="Accompagnement e-commerce" requestMessage="Demande de rappel depuis la landing e-commerce." title="Parlons de votre e-commerce" description="Laissez vos coordonnées et échangeons sur les leviers de rentabilité de votre activité." /></section>

    <section className="eco-section eco-problems-short"><Intro eyebrow="La marge invisible" title="Vous avez probablement plus de marge à récupérer que vous ne le pensez." text="Un e-commerce peut générer beaucoup de chiffre d’affaires tout en perdant de la rentabilité sur ses prix, son acquisition, ses partenaires, son SAV ou ses processus internes. Nous analysons aussi le panier moyen, les coûts d’acquisition, les commissions et les offres additionnelles pour comprendre la marge réelle." /><div className="eco-problem-grid eco-problem-grid-short">{problems.map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, '0')}</span><p>{item}</p></div>)}</div><p className="eco-key-message">Pris séparément, ces écarts semblent faibles. À l’échelle de milliers de ventes, ils peuvent représenter <strong>des dizaines de milliers d’euros.</strong></p></section>

    <section className="eco-section eco-method-short" id="methode"><Intro center eyebrow="Notre approche" title="Conseil + Exécution + Technologie" /><div className="eco-three-columns"><article><Lightbulb /><small>01</small><h3>Stratégie</h3><p>Nous identifions les leviers qui peuvent améliorer la rentabilité de votre activité.</p></article><article><Settings2 /><small>02</small><h3>Opérations</h3><p>Nous travaillons sur les offres, les partenaires, le SAV, les processus et le pilotage.</p></article><article><Bot /><small>03</small><h3>Technologie</h3><p>Nous développons les outils, automatisations et interfaces nécessaires pour mettre les recommandations en œuvre.</p></article></div><p className="eco-key-message eco-key-message-center">L’objectif n’est pas de produire des recommandations. <strong>L’objectif est de les mettre en place et d’en mesurer l’impact.</strong></p></section>

    <section className="eco-section eco-reference" id="cas-concret"><div className="eco-reference-intro"><p className="kicker">Parmi nos dernières interventions</p><h2>Référence récente — <a href="https://4000m.com" target="_blank" rel="noopener noreferrer">4000m.com</a></h2><p>Acteur de référence de la vente de sauts en parachute en ligne en France depuis 2003.</p><p>Mills Rocket accompagne 4000m.com sur plusieurs dimensions de son activité e-commerce : rentabilité, pricing, partenaires, commissions, SAV, produits additionnels et pilotage.</p><p>Conception de OS Partner, une plateforme interne permettant de centraliser le pilotage des partenaires, des offres et des écarts de prix.</p><a className="eco-os-partner-link" href="/outils-ia#os-partner">Voir la réalisation OS Partner <ArrowRight size={16} /></a></div><div className="eco-reference-details"><CheckList items={caseTopics} /><aside><BarChart3 size={28} /><h3>Ne plus piloter uniquement le chiffre d’affaires, mais la rentabilité réelle de chaque vente.</h3><p>Deux ventes du même montant peuvent produire une rentabilité très différente selon le partenaire, le produit, le taux d’utilisation ou les coûts opérationnels associés.</p><p>L’objectif est donc d’intégrer ces données dans les décisions marketing et commerciales afin d’investir davantage là où la rentabilité réelle est la meilleure.</p></aside></div></section>

    <section className="eco-section eco-questions-short"><Intro eyebrow="Les bons indicateurs" title="Pouvez-vous répondre facilement à ces questions ?" /><div className="eco-question-grid eco-question-grid-short">{businessQuestions.map((item) => <div key={item}><CheckCircle2 /><span>{item}</span></div>)}</div><p className="eco-key-message">Si certaines de ces réponses sont difficiles à obtenir, il existe probablement <strong>une opportunité d’amélioration.</strong></p><p className="eco-internal-links">Pour tester un nouveau levier d’acquisition, découvrez aussi <a href="/chatgpt-ads">l’accompagnement ChatGPT Ads</a>. Pour simplifier le pilotage, explorez nos <a href="/outils-ia">outils métiers et automatisations sur mesure</a>.</p></section>

    <FaqSection path="/ecommerce" />
    <section className="eco-final-short" id="contact"><div><p className="kicker">Passons aux chiffres</p><h2>Vous avez déjà du chiffre d’affaires.<br /><span>Maintenant, cherchons la marge qui se cache derrière.</span></h2></div><LeadContactForm className="eco-short-form eco-short-form-final" headingClassName="eco-form-heading" errorClassName="eco-field-error" noteClassName="eco-form-note" eventPrefix="ecommerce" pageType="ecommerce_landing" location="final" projectType="Accompagnement e-commerce" requestMessage="Demande de rappel depuis la landing e-commerce." title="Être recontacté" description="Expliquez-nous ensuite votre activité lors d’un premier échange." /></section>
  </main><footer className="eco-footer"><div><Brand /><p>Performance <i /> Rentabilité <i /> Automatisation</p></div><nav aria-label="Pied de page"><a href="/mentions-legales">Mentions légales</a><a href="/confidentialite">Confidentialité</a><a href="/contact">Contact</a></nav></footer></div>;
}
