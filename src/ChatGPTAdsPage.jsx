import React from 'react';
import { ArrowRight, BarChart3, Check, MessageSquareText, Rocket, Target } from 'lucide-react';
import SiteHeader from './SiteHeader.jsx';
import LeadContactForm from './LeadContactForm.jsx';
import FaqSection from './FaqSection.jsx';

function track(event, params = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, page_type: 'chatgpt_ads_landing', ...params });
}

function Brand() {
  return <a className="brand" href="/" aria-label="Mills Rocket, accueil"><span className="brand-mark"><Rocket size={19} /></span><span>Mills Rocket</span></a>;
}

const intentions = ['Quel produit choisir', 'Quelle entreprise contacter', 'Quelle solution correspond à leur problème', 'Quel service acheter', 'Quelle marque comparer'];
const steps = [['01', 'Stratégie', 'Nous identifions les offres et intentions les plus intéressantes pour votre activité.'], ['02', 'Création de campagne', 'Nous structurons les campagnes et créons les annonces adaptées.'], ['03', 'Landing page', 'Nous concevons ou optimisons la page d’arrivée pour maximiser la conversion.'], ['04', 'Tracking', 'Nous suivons les clics, formulaires, appels et conversions.'], ['05', 'Optimisation', 'Nous concentrons progressivement le budget sur ce qui fonctionne réellement.']];
const uses = ['Génération de leads', 'E-commerce', 'Services B2B', 'Logiciels SaaS', 'Prestations locales', 'Réservation d’activités', 'Demandes de devis', 'Lancement de nouveaux produits'];

export default function ChatGPTAdsPage() {
  return <div className="ads-page"><SiteHeader /><main>
    <section className="ads-hero"><div className="ads-hero-container"><div className="ads-hero-copy"><p className="kicker">Un nouveau canal d’acquisition</p><h1>Lancez et optimisez vos campagnes <span>ChatGPT Ads.</span></h1><p>ChatGPT devient un nouveau point d’entrée entre les consommateurs et les marques.</p><p>Mills Rocket accompagne les entreprises dans la création, le lancement et l’optimisation de campagnes ChatGPT Ads, de la stratégie à la landing page et au suivi des conversions.</p><div className="ads-tags">Stratégie <i /> Campagnes <i /> Landing pages <i /> Tracking <i /> Optimisation</div><a className="button button-primary" href="#contact" onClick={() => track('chatgpt_ads_cta_click', { location: 'hero' })}>Lancer ma campagne ChatGPT Ads <ArrowRight size={18} /></a></div><LeadContactForm className="ads-form" headingClassName="ads-form-title" eventPrefix="chatgpt_ads" pageType="chatgpt_ads_landing" location="hero" projectType="Campagne ChatGPT Ads" requestMessage="Demande de contact depuis la landing ChatGPT Ads." title="Parlons de votre projet" description="Vous souhaitez tester ChatGPT Ads pour votre entreprise ?" /></div></section>

    <section className="ads-section ads-intent"><div><p className="kicker">La nouvelle recherche</p><h2>Vos futurs clients posent déjà leurs questions à ChatGPT.</h2></div><div><p>Ils cherchent :</p><ul>{intentions.map((item) => <li key={item}><Check />{item}</li>)}</ul><strong>Positionnez votre entreprise au moment où l’utilisateur cherche une solution.</strong></div></section>

    <section className="ads-section ads-approach" id="approche"><div className="ads-heading"><p className="kicker">La cohérence avant les clics</p><h2>Être présent ne suffit pas.</h2><p>Comme sur Google Ads, envoyer du trafic vers une mauvaise page ne sert à rien.</p></div><div className="ads-three"><article><Target /><h3>La bonne intention</h3><p>Identifier les recherches et besoins sur lesquels votre entreprise doit apparaître.</p></article><article><MessageSquareText /><h3>La bonne annonce</h3><p>Créer un message directement lié au problème que l’utilisateur cherche à résoudre.</p></article><article><BarChart3 /><h3>La bonne landing page</h3><p>Envoyer le prospect vers une page construite spécifiquement pour convertir cette intention.</p></article></div><div className="ads-funnel">ChatGPT <ArrowRight /> Annonce <ArrowRight /> Landing page <ArrowRight /> Lead <ArrowRight /> Vente</div></section>

    <section className="ads-section" id="methode"><div className="ads-heading"><p className="kicker">De A à Z</p><h2>Nous gérons votre campagne.</h2></div><div className="ads-steps">{steps.map(([number, title, text]) => <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></section>

    <section className="ads-section ads-results"><div><p className="kicker">La vraie performance</p><h2>Pas simplement des clics.<br /><span>Nous cherchons des clients.</span></h2><p>Les clics, impressions et CTR donnent une indication. Les leads, opportunités, ventes et la rentabilité déterminent réellement la valeur d’une campagne.</p><blockquote>Savoir combien vous rapporte chaque euro investi dans ChatGPT Ads.</blockquote><p className="ads-crosslinks">Pour les entreprises e-commerce, découvrez aussi <a href="/ecommerce">notre accompagnement dédié à la rentabilité et au pilotage e-commerce</a>. Les flux de campagne peuvent également s’appuyer sur des <a href="/outils-ia">outils d’automatisation et de suivi sur mesure</a>.</p></div><div className="ads-metrics"><span>Leads</span><span>Coût par lead</span><span>Opportunités commerciales</span><span>Ventes</span><span>Rentabilité</span></div></section>

    <section className="ads-section ads-use-cases"><div className="ads-heading"><p className="kicker">Votre offre au centre</p><h2>Une campagne pensée autour de votre activité.</h2><p>Chaque campagne est construite autour d’une intention commerciale précise.</p></div><div>{uses.map((item) => <span key={item}>{item}</span>)}</div></section>

    <section className="ads-section ads-example"><div><p className="kicker">Exemple</p><h2>La landing page doit poursuivre la conversation.</h2><p>Un utilisateur cherche : <strong>« Comment améliorer la marge de mon e-commerce ? »</strong></p></div><div className="ads-comparison"><div><small>Message générique</small><p>« Mills Rocket — Agence digitale »</p></div><div className="active"><small>Message aligné sur le besoin</small><p>« Identifiez où votre e-commerce perd de la marge. »</p></div><strong>Besoin → Annonce → Page → Offre</strong></div></section>

    <FaqSection path="/chatgpt-ads" />
    <section className="ads-final" id="contact"><div><p className="kicker">Passez au test</p><h2>Testez ChatGPT Ads sur votre activité.</h2><p>Nous définissons l’offre, les intentions, les annonces, la landing page, le tracking, le budget de test et les indicateurs de rentabilité. Puis nous lançons et optimisons la campagne.</p></div><LeadContactForm className="ads-form" headingClassName="ads-form-title" eventPrefix="chatgpt_ads" pageType="chatgpt_ads_landing" location="final" projectType="Campagne ChatGPT Ads" requestMessage="Demande de contact depuis la landing ChatGPT Ads." title="Étudier mon projet ChatGPT Ads" description="Vous voulez savoir si ChatGPT Ads peut fonctionner pour votre entreprise ?" buttonLabel="Étudier mon projet ChatGPT Ads" /></section>
  </main><footer className="ads-footer"><Brand /><p>Acquisition <i /> Conversion <i /> Automatisation</p><nav><a href="/mentions-legales">Mentions légales</a><a href="/confidentialite">Confidentialité</a><a href="/contact">Contact</a></nav></footer></div>;
}
