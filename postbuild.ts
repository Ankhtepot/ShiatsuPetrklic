// postbuild.ts – runs after `ng build` (which prerenders all pages, see src/app/app.routes.server.ts)
// and adapts the static output for GitHub Pages:
//  0. / redirects to the homepage in the stored language
//  1. cs/home/index.html -> also cs/home.html, so /cs/home is served with 200 instead of a 301 to /cs/home/
//  2. 404.html = client-side shell, so non-prerendered URLs still boot the Angular app
//  3. sitemap.xml generated from the prerendered pages, with <lastmod> = last build in which the page content changed
//  4. share images (og:image) for events generated from the event photos, warning for any other missing share image
import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'fs';
import { createHash } from 'crypto';
import { basename, dirname, extname, join } from 'path';
import sharp from 'sharp';
import { getEvents } from './src/app/shared/data/events';

const SITE_ORIGIN = 'https://www.shiatsupetrklic.com'; // must match public/CNAME and SeoService
const LANGUAGES = ['cs', 'en'];
const DEFAULT_LANGUAGE = 'cs';

const distFolder = 'dist/shiatsu-brno';
const browserFolder = join(distFolder, 'browser');

// Content hashes and lastmod dates of sitemap pages from previous builds – commit this file after deploying
const lastmodFile = 'sitemap-lastmod.json';
const today = new Date().toISOString().slice(0, 10);

const homeTitle = JSON.parse(readFileSync(`public/languages/${DEFAULT_LANGUAGE}.json`, 'utf-8')).home_page_title as string;

const routes = Object.keys(
  JSON.parse(readFileSync(join(distFolder, 'prerendered-routes.json'), 'utf-8')).routes
) as string[];

// 0. Root: Angular prerenders "/" as a plain redirect to the default language. Replace it with one that
//    sends returning visitors to their stored language (key = EStorageKey.Language) and tells crawlers
//    the homepage is the canonical page.
writeFileSync(join(browserFolder, 'index.html'), `<!DOCTYPE html>
<html lang="${DEFAULT_LANGUAGE}">
<head>
  <meta charset="utf-8">
  <title>${homeTitle}</title>
  <link rel="canonical" href="${SITE_ORIGIN}/${DEFAULT_LANGUAGE}/home">
  <script>
    try {
      var lang = localStorage.getItem('ShiatsuPetrklic - language');
      if (${JSON.stringify(LANGUAGES)}.indexOf(lang) > -1) location.replace('/' + lang + '/home');
    } catch (e) {}
  </script>
  <meta http-equiv="refresh" content="0; url=/${DEFAULT_LANGUAGE}/home">
</head>
<body>
  <a href="/${DEFAULT_LANGUAGE}/home">${homeTitle}</a>
</body>
</html>
`);

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
  .map(([route, lang, page]) => ({ route, lang, page }));

/**
 * Hash of what a reader sees: title, description and text. Markup, Angular ids and the randomly
 * ordered testimonial strips are left out, so an unchanged page keeps its hash between builds.
 */
function contentHash(html: string): string {
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '';
  const description = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '';
  const text = html
    .replace(/<head>[\s\S]*?<\/head>/, '')
    .replace(/<(script|style)\b[\s\S]*?<\/\1>/g, '')
    .replace(/<app-quote-strip[\s>][\s\S]*?<\/app-quote-strip>/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ');
  return createHash('sha256').update([title, description, text].join('\n')).digest('hex').slice(0, 16);
}

type LastmodEntry = { hash: string; lastmod: string };
const previousLastmod: Record<string, LastmodEntry> =
  existsSync(lastmodFile) ? JSON.parse(readFileSync(lastmodFile, 'utf-8')) : {};
const lastmod: Record<string, LastmodEntry> = {};
for (const { route } of sitemapPages) {
  const hash = contentHash(readFileSync(join(browserFolder, route, 'index.html'), 'utf-8'));
  const previous = previousLastmod[route];
  lastmod[route] = { hash, lastmod: previous?.hash === hash ? previous.lastmod : today };
}
writeFileSync(lastmodFile, JSON.stringify(lastmod, null, 2) + '\n');

const pageUrl = (lang: string, page: string) => `${SITE_ORIGIN}/${lang}/${page}`;
const entries = sitemapPages.map(({ route, lang, page }) => [
  '  <url>',
  `    <loc>${pageUrl(lang, page)}</loc>`,
  `    <lastmod>${lastmod[route].lastmod}</lastmod>`,
  ...LANGUAGES.map(alternate => `    <xhtml:link rel="alternate" hreflang="${alternate}" href="${pageUrl(alternate, page)}"/>`),
  `    <xhtml:link rel="alternate" hreflang="x-default" href="${pageUrl(DEFAULT_LANGUAGE, page)}"/>`,
  '  </url>',
].join('\n'));

writeFileSync(join(browserFolder, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`);

// 4. Share images
const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

/** Same path as DetailComponent uses: images/events/x.webp -> images/og/events/x.jpg */
const eventShareImagePath = (imageUrl: string) =>
  join('images/og/events', `${basename(imageUrl, extname(imageUrl))}.jpg`);

/**
 * 1200×630 JPG from a photo: landscape photos are cropped, portrait and square ones are shown whole
 * on a blurred copy of themselves, so nobody's head gets cut off.
 */
async function createShareImage(source: string, target: string) {
  const { width = OG_WIDTH, height = OG_HEIGHT } = await sharp(source).metadata();
  const isLandscape = Math.abs(width / height - OG_WIDTH / OG_HEIGHT) < 0.45;

  const image = isLandscape
    ? sharp(source).resize(OG_WIDTH, OG_HEIGHT, { fit: 'cover' })
    : sharp(source).resize(OG_WIDTH, OG_HEIGHT, { fit: 'cover' }).blur(30).composite([{
        input: await sharp(source).resize(OG_WIDTH, OG_HEIGHT, { fit: 'inside' }).toBuffer(),
        gravity: 'centre',
      }]);

  mkdirSync(dirname(target), { recursive: true });
  await image.flatten({ background: '#ffffff' }).jpeg({ quality: 82, progressive: true, mozjpeg: true }).toFile(target);
}

/** Generates missing or outdated event share images into public/ (commit them) and copies them into the build */
async function generateEventShareImages() {
  const imageUrls = new Set(getEvents().map(event => event.imageUrl).filter((url): url is string => !!url));
  for (const imageUrl of imageUrls) {
    const source = join('public', imageUrl);
    const relativeTarget = eventShareImagePath(imageUrl);
    const target = join('public', relativeTarget);
    if (!existsSync(source)) {
      continue;
    }
    if (!existsSync(target) || statSync(source).mtimeMs > statSync(target).mtimeMs) {
      await createShareImage(source, target);
      console.log(`✔ Share image generated: ${target}`);
    }
    mkdirSync(dirname(join(browserFolder, relativeTarget)), { recursive: true });
    copyFileSync(target, join(browserFolder, relativeTarget));
  }
}

/** Warns about share images referenced by pages but missing in the build (e.g. a typo in a page's image path) */
function checkShareImages() {
  const missingImages = new Set<string>();
  for (const route of routes.filter(route => route !== '/')) {
    const html = readFileSync(join(browserFolder, route, 'index.html'), 'utf-8');
    const image = html.match(/<meta property="og:image" content="([^"]*)"/)?.[1];
    if (image?.startsWith(SITE_ORIGIN) && !existsSync(join(browserFolder, image.slice(SITE_ORIGIN.length)))) {
      missingImages.add(image.slice(SITE_ORIGIN.length + 1));
    }
  }
  missingImages.forEach(image => console.warn(`⚠ Missing share image: public/${image}`));
}

generateEventShareImages()
  .then(() => {
    checkShareImages();
    console.log(`✔ ${routes.length - 1} .html copies, 404.html, sitemap.xml (${sitemapPages.length} URLs)`);
  })
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
