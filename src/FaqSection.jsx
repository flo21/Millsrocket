import React from 'react';
import { FAQS } from './seo.js';

const titles = {
  '/': 'Questions fréquentes sur Mills Rocket',
  '/ecommerce': 'Questions fréquentes sur la rentabilité e-commerce',
  '/chatgpt-ads': 'Questions fréquentes sur ChatGPT Ads',
  '/outils-ia': 'Questions fréquentes sur les outils IA et l’automatisation',
};

export default function FaqSection({ path }) {
  const items = FAQS[path] || [];
  if (!items.length) return null;
  return <section className="seo-faq" aria-labelledby={`faq-title-${path.replaceAll('/', '') || 'home'}`}>
    <p className="kicker">Questions fréquentes</p>
    <h2 id={`faq-title-${path.replaceAll('/', '') || 'home'}`}>{titles[path]}</h2>
    <div className="seo-faq-list">{items.map(({ question, answer }) => <article key={question}><h3>{question}</h3><p>{answer}</p></article>)}</div>
  </section>;
}
