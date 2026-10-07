export const ORGANIZATION_ID = 'https://millsrocket.com/#organization';
export const BRAND_IMAGE = 'https://millsrocket.com/millsrocket-og-social.jpg';

export const FAQS = {
  '/': [
    { question: 'Que fait Mills Rocket ?', answer: 'Mills Rocket accompagne les entreprises sur leur acquisition, leur rentabilité, leurs opérations et la création d’outils ou automatisations sur mesure.' },
    { question: 'Quels types de projets prend en charge Mills Rocket ?', answer: 'Mills Rocket intervient notamment sur l’optimisation e-commerce, les campagnes ChatGPT Ads et le développement d’outils IA ou d’automatisations métier.' },
    { question: 'Travaillez-vous uniquement sur des projets IA ?', answer: 'Non. L’IA est utilisée lorsqu’elle apporte un gain concret. L’objectif reste de résoudre un problème business de la manière la plus efficace possible.' },
  ],
  '/ecommerce': [
    { question: 'Comment améliorer la rentabilité d’un e-commerce ?', answer: 'Il faut analyser simultanément la marge produit, le pricing, le coût d’acquisition, les commissions, le SAV, les offres additionnelles et les processus opérationnels.' },
    { question: 'Comment savoir quels produits ou partenaires sont les plus rentables ?', answer: 'En croisant le chiffre d’affaires avec les coûts, commissions, remboursements, taux d’utilisation et autres dépenses associées à chaque produit ou partenaire.' },
    { question: 'Peut-on automatiser le pilotage d’un e-commerce ?', answer: 'Oui. Certaines tâches comme le contrôle des prix, le suivi des marges, la comparaison des offres ou le reporting peuvent être automatisées.' },
  ],
  '/chatgpt-ads': [
    { question: 'Qu’est-ce que ChatGPT Ads ?', answer: 'ChatGPT Ads permet aux annonceurs de diffuser des publicités dans ChatGPT lorsque celles-ci sont pertinentes pour l’utilisateur et la conversation.' },
    { question: 'Pourquoi créer une landing page dédiée à ChatGPT Ads ?', answer: 'Parce que la page d’arrivée doit prolonger exactement l’intention exprimée par l’utilisateur afin de maximiser les chances de conversion.' },
    { question: 'Que comprend l’accompagnement Mills Rocket sur ChatGPT Ads ?', answer: 'L’accompagnement peut inclure la stratégie, la création des campagnes, les annonces, les landing pages, le tracking et l’optimisation des conversions.' },
  ],
  '/outils-ia': [
    { question: 'Quelles tâches peut-on automatiser avec l’IA ?', answer: 'Le contrôle de données, l’analyse documentaire, le SAV, le reporting, la qualification ou certaines tâches répétitives peuvent notamment être automatisés.' },
    { question: 'Quelle différence entre un logiciel standard et un outil métier sur mesure ?', answer: 'Un outil métier sur mesure est construit autour des processus réels de l’entreprise au lieu d’obliger l’entreprise à adapter son fonctionnement à un logiciel générique.' },
    { question: 'Faut-il forcément utiliser l’IA pour automatiser un processus ?', answer: 'Non. Certaines automatisations classiques sont plus simples et plus fiables. L’IA est utilisée lorsque sa valeur ajoutée est réelle.' },
  ],
};

export const SEO_PAGES = {
  '/': {
    title: 'Mills Rocket | Stratégie, acquisition, IA & automatisation',
    description: 'Mills Rocket accompagne les entreprises sur leur acquisition, leur rentabilité et l’automatisation de leurs opérations grâce à des outils métiers et à l’IA.',
    canonical: 'https://millsrocket.com/',
    image: BRAND_IMAGE,
    type: 'Organization',
  },
  '/ecommerce': {
    title: 'Optimisation e-commerce : marge & rentabilité | Mills Rocket',
    description: 'Améliorez la rentabilité de votre e-commerce : pricing, acquisition, partenaires, SAV, marge et outils de pilotage sur mesure.',
    canonical: 'https://millsrocket.com/ecommerce',
    image: BRAND_IMAGE,
    type: 'Service',
    serviceName: 'Optimisation e-commerce',
    serviceDescription: 'Accompagnement des entreprises e-commerce sur la rentabilité, la marge, le pricing, l’acquisition, les partenaires, le SAV et le pilotage.',
    serviceType: 'Conseil et optimisation e-commerce',
  },
  '/chatgpt-ads': {
    title: 'Agence ChatGPT Ads : campagnes & acquisition | Mills Rocket',
    description: 'Lancez vos campagnes ChatGPT Ads avec Mills Rocket : stratégie, annonces, landing pages, tracking et optimisation des conversions.',
    canonical: 'https://millsrocket.com/chatgpt-ads',
    image: BRAND_IMAGE,
    type: 'Service',
    serviceName: 'Gestion de campagnes ChatGPT Ads',
    serviceDescription: 'Création et optimisation de campagnes ChatGPT Ads : stratégie, annonces, landing pages, tracking et conversion.',
    serviceType: 'Gestion de campagnes ChatGPT Ads',
  },
  '/outils-ia': {
    title: 'Outils IA & automatisation sur mesure | Mills Rocket',
    description: 'Mills Rocket crée des outils métiers, automatisations et assistants IA sur mesure pour simplifier vos processus et améliorer votre performance.',
    canonical: 'https://millsrocket.com/outils-ia',
    image: BRAND_IMAGE,
    type: 'Service',
    serviceName: 'Outils IA et automatisation',
    serviceDescription: 'Conception de logiciels métiers, automatisations, dashboards et assistants IA sur mesure.',
    serviceType: "Développement d'outils IA et automatisation",
  },
};

const organization = {
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  name: 'Mills Rocket',
  url: 'https://millsrocket.com/',
  description: "Mills Rocket accompagne les entreprises sur leur acquisition, leur rentabilité, l'automatisation et la création d'outils IA sur mesure.",
};

export function getStructuredData(path) {
  const page = SEO_PAGES[path];
  if (!page) return null;
  const graph = [organization];
  if (page.type === 'Service') {
    graph.push({
      '@type': 'Service',
      name: page.serviceName,
      url: page.canonical,
      description: page.serviceDescription,
      provider: { '@id': ORGANIZATION_ID },
      areaServed: { '@type': 'Country', name: 'France' },
      serviceType: page.serviceType,
    });
  }
  const questions = FAQS[path] || [];
  if (questions.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: questions.map(({ question, answer }) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: answer },
      })),
    });
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}
