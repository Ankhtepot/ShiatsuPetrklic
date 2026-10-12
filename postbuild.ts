// postbuild.ts – runs after `ng build` (which prerenders all pages, see src/app/app.routes.server.ts)
// and adapts the static output for GitHub Pages:
//  1. cs/home/index.html -> also cs/home.html, so /cs/home is served with 200 instead of a 301 to /cs/home/
//  2. 404.html = client-side shell, so non-prerendered URLs still boot the Angular app
//  3. sitemap.xml generated from the prerendered pages
import { copyFileSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const SITE_ORIGIN = 'https://www.shiatsupetrklic.com'; // must match public/CNAME and SeoService
const LANGUAGES = ['cs', 'en'];
const DEFAULT_LANGUAGE = 'cs';

const distFolder = 'dist/shiatsu-brno';
const browserFolder = join(distFolder, 'browser');

const routes = Object.keys(
  JSON.parse(readFileSync(join(distFolder, 'prerendered-routes.json'), 'utf-8')).routes
) as string[];

// 1. Extension-less URLs
for (const route of routes.filter(route => route !== '/')) {
  copyFileSync(join(browserFolder, route, 'index.html'), join(browserFolder, `${route}.html`));
}

// 2. Fallback for everything that is not prerendered (hidden pages, unknown URLs)
copyFileSync(join(browserFolder, 'index.csr.html'), join(browserFolder, '404.html'));

// 3. Sitemap: localized pages only, without noindex pages (404) and redirect pages (old URLs)
const sitemapPages = routes
  .map(route => route.match(/^\/([a-z]{2})\/(.+)$/))
  .filter((match): match is RegExpMatchArray => !!match && LANGUAGES.includes(match[1]))
  .filter(([route]) => {
    const html = readFileSync(join(browserFolder, route, 'index.html'), 'utf-8');
    return !html.includes('content="noindex') && !html.includes('http-equiv="refresh"');
  })
  .map(([, lang, page]) => ({ lang, page }));

const pageUrl = (lang: string, page: string) => `${SITE_ORIGIN}/${lang}/${page}`;
const entries = sitemapPages.map(({ lang, page }) => [
  '  <url>',
  `    <loc>${pageUrl(lang, page)}</loc>`,
  ...LANGUAGES.map(alternate => `    <xhtml:link rel="alternate" hreflang="${alternate}" href="${pageUrl(alternate, page)}"/>`),
  `    <xhtml:link rel="alternate" hreflang="x-default" href="${pageUrl(DEFAULT_LANGUAGE, page)}"/>`,
  '  </url>',
].join('\n'));

writeFileSync(join(browserFolder, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`);

console.log(`✔ ${routes.length - 1} .html copies, 404.html, sitemap.xml (${sitemapPages.length} URLs)`);
