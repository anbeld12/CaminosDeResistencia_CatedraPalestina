import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from './seo';

export function orgSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/og-image.png`,
    description: SITE_DESCRIPTION,
    knowsLanguage: 'es-CO',
    areaServed: 'CO',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Facultad de Derecho y Ciencias Políticas, Universidad Nacional de Colombia',
      addressLocality: 'Bogotá',
      addressRegion: 'Bogotá D.C.',
      addressCountry: 'CO',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 4.6383,
      longitude: -74.0836,
    },
    parentOrganization: {
      '@type': 'CollegeOrUniversity',
      name: 'Universidad Nacional de Colombia',
      url: 'https://unal.edu.co',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'ctpalestina_bog@unal.edu.co',
      contactType: 'academic',
      availableLanguage: ['Spanish', 'English'],
    },
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: 'Espacio sentipensante de educación pública sobre Palestina desde Colombia. Repositorio de la Facultad de Derecho y Ciencias Políticas.',
    inLanguage: 'es-CO',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/archivo?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
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

export function faqSchema(questions: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(q => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };
}

export function courseSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Cátedra Caminos de Resistencia',
    description: 'Espacio sentipensante de educación pública sobre Palestina desde Colombia. Repositorio de la Facultad de Derecho y Ciencias Políticas.',
    provider: {
      '@type': 'CollegeOrUniversity',
      name: 'Universidad Nacional de Colombia',
      url: 'https://unal.edu.co',
    },
    educationalLevel: 'University',
    inLanguage: 'es-CO',
    url: SITE_URL,
  };
}

export function videoObjectSchema(name: string, description: string, thumbnailUrl: string, embedUrl: string, uploadDate: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name,
    description,
    thumbnailUrl,
    embedUrl,
    uploadDate,
    inLanguage: 'es',
    contentUrl: embedUrl,
  };
}

export function podcastEpisodeSchema(name: string, description: string, url: string, episodeNumber: number) {
  return {
    '@context': 'https://schema.org',
    '@type': 'PodcastEpisode',
    name,
    description,
    url,
    episodeNumber,
    inLanguage: 'es',
    partOfSeries: {
      '@type': 'PodcastSeries',
      name: 'Cátedra Caminos de Resistencia · Podcast',
    },
  };
}
