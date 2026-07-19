import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const today = new Date().toISOString().split('T')[0];

const urls = [
  { loc: '/', priority: 1.0 },
  { loc: '/historia', priority: 0.8 },
  { loc: '/ongs', priority: 0.8 },
  { loc: '/genero', priority: 0.8 },
  { loc: '/voces', priority: 0.8 },
  { loc: '/archivo', priority: 0.8 },
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>https://caminosderesistencia.co${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

writeFileSync(join(__dirname, '..', 'public', 'sitemap.xml'), xml, 'utf-8');
console.log(`\u2713 sitemap.xml generated (${today})`);
