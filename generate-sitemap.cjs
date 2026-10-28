/**
 * Auto sitemap generator.
 * Chalane ka tareeqa:  node scripts/generate-sitemap.cjs
 * Ya package.json mein:  "prebuild": "node scripts/generate-sitemap.cjs"
 */
const fs = require('fs');
const path = require('path');

const SITE = 'https://void-shahzaib.runs-on.dev';
const OUT = path.join(__dirname, '..', 'public', 'sitemap.xml');
const today = new Date().toISOString().split('T')[0];

// Apne asli pages yahan likho: [path, changefreq, priority]
const routes = [
  ['/', 'daily', '1.0'],
  ['/about', 'monthly', '0.9'],
  ['/projects', 'weekly', '0.9'],
  ['/services', 'monthly', '0.8'],
  ['/blog', 'weekly', '0.8'],
  ['/contact', 'monthly', '0.7'],
  ['/faq', 'monthly', '0.5'],
  ['/privacy-policy', 'yearly', '0.3'],
  ['/terms', 'yearly', '0.3'],
];

const urls = routes
  .map(
    ([p, freq, prio]) => `  <url>
    <loc>${SITE}${p}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>${prio}</priority>
  </url>`
  )
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, xml);
console.log(`sitemap.xml ban gayi: ${routes.length} pages -> ${OUT}`);
