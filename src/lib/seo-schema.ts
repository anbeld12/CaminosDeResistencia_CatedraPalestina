import { SITE_URL } from './seo';

export function orgSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Cátedra Caminos de Resistencia',
    url: SITE_URL,
    logo: `${SITE_URL}/og-image.png`,
    description: 'Plataforma de memoria y solidaridad académica · UNAL · Facultad de Derecho y Ciencias Políticas',
    knowsLanguage: 'es-CO',
    areaServed: 'CO',
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Cátedra Caminos de Resistencia',
    url: SITE_URL,
    description: 'Espacio sentipensante de educación pública sobre Palestina desde Colombia. Repositorio de la Facultad de Derecho y Ciencias Políticas.',
    inLanguage: 'es-CO',
  };
}

export function articleSchema(headline: string, description: string, datePublished?: string) {
  const obj: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    inLanguage: 'es-CO',
    author: {
      '@type': 'Organization',
      name: 'Cátedra Caminos de Resistencia · UNAL',
    },
  };
  if (datePublished) obj.datePublished = datePublished;
  return obj;
}

export function collectionPageSchema(description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Cosecha de saberes · Archivo',
    description,
    inLanguage: 'es-CO',
    url: `${SITE_URL}/archivo`,
  };
}

export function eventSchema(name: string, startDate: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name,
    startDate,
    description,
    eventStatus: 'https://schema.org/EventMovedOnline',
    location: {
      '@type': 'Place',
      name: 'Territorio Palestino Ocupado',
    },
  };
}

export function bookSchema(author: string, name: string, datePublished: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Book',
    author,
    name,
    datePublished,
    inLanguage: 'es',
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}
