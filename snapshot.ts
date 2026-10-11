// snapshot.ts
// Prerenders every route into static HTML so crawlers and AI agents get real content
// without executing JavaScript, and generates sitemap.xml from the same route list.
import puppeteer, { Page } from 'puppeteer';
import { createServer, Server } from 'http';
import { AddressInfo } from 'net';
// @ts-ignore
import { outputFile, readFile, pathExists, stat } from 'fs-extra';
import { extname, join, normalize, resolve } from 'path';
import { DEFAULT_LANGUAGE, LANGUAGES, PrerenderRoute, routesToPrerender, SITE_ORIGIN } from './prerender-routes';

// 🛠️ Config
const distFolder = 'dist/shiatsu-brno/browser';
const outputFolder = distFolder;
const blockedRequestHosts = ['googletagmanager.com', 'google-analytics.com'];

const mimeTypes: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};

/**
 * Serves dist like a SPA host: real files are served as-is, every other path gets the
 * original index.html shell, so the Angular router can render the route.
 * The shell is kept in memory because snapshots overwrite index.html files on disk.
 */
function startSnapshotServer(shellHtml: string): Promise<{ server: Server; port: number }> {
  const root = resolve(distFolder);

  const server = createServer(async (request, response) => {
    const urlPath = decodeURIComponent(new URL(request.url ?? '/', 'http://localhost').pathname);
    const filePath = normalize(join(root, urlPath));
    const isFile = filePath.startsWith(root) && extname(filePath) !== ''
      && await pathExists(filePath) && (await stat(filePath)).isFile();

    if (isFile) {
      response.writeHead(200, { 'Content-Type': mimeTypes[extname(filePath).toLowerCase()] ?? 'application/octet-stream' });
      response.end(await readFile(filePath));
    } else if (extname(urlPath) !== '') {
      response.writeHead(404).end();
    } else {
      response.writeHead(200, { 'Content-Type': mimeTypes['.html'] });
      response.end(shellHtml);
    }
  });

  return new Promise((resolvePromise, reject) => {
    server.once('error', reject);
    server.listen(0, () => resolvePromise({ server, port: (server.address() as AddressInfo).port }));
  });
}

/** Fails loudly instead of deploying empty or wrongly localized snapshots. */
async function validateSnapshot(page: Page, route: PrerenderRoute, html: string) {
  if (html.includes('/@vite/client')) {
    throw new Error(`Snapshot for "${route.path}" captured Vite dev-server assets instead of the production build.`);
  }

  const state = await page.evaluate(() => ({
    renderedElements: document.querySelector('app-root')?.childElementCount ?? 0,
    textLength: document.querySelector('router-outlet + *')?.textContent?.trim().length ?? 0,
    lang: document.documentElement.lang,
    title: document.title,
  }));

  if (state.renderedElements === 0 || state.textLength === 0) {
    throw new Error(`Snapshot for "${route.path}" has no rendered page content.`);
  }
  if (route.lang && state.lang !== route.lang) {
    throw new Error(`Snapshot for "${route.path}" rendered in "${state.lang}" instead of "${route.lang}".`);
  }
  if (!state.title) {
    throw new Error(`Snapshot for "${route.path}" has an empty <title>.`);
  }
}

function buildSitemap(routes: PrerenderRoute[]): string {
  // Must match the canonical URLs built in SeoService.getPageUrl
  const pageUrl = (lang: string, page: string) => `${SITE_ORIGIN}/${lang}/${page}`;

  const entries = routes
    .filter(route => route.inSitemap && route.lang && route.page)
    .map(route => {
      const alternates = [
        ...LANGUAGES.map(lang => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${pageUrl(lang, route.page!)}"/>`),
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${pageUrl(DEFAULT_LANGUAGE, route.page!)}"/>`,
      ];
      return `  <url>\n    <loc>${pageUrl(route.lang!, route.page!)}</loc>\n${alternates.join('\n')}\n  </url>`;
    });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`;
}

async function createSnapshots() {
  const shellHtml = await readFile(join(distFolder, 'index.html'), 'utf-8');
  const { server, port } = await startSnapshotServer(shellHtml);

  const browser = await puppeteer.launch({ headless: 'shell' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  // Keep analytics out of the build: no fake pageviews and no injected GA scripts in the snapshots.
  await page.setRequestInterception(true);
  page.on('request', request => {
    const isBlocked = blockedRequestHosts.some(host => new URL(request.url()).hostname.endsWith(host));
    isBlocked ? request.abort() : request.continue();
  });

  try {
    for (const route of routesToPrerender) {
      const url = `http://localhost:${port}${route.path}`;
      console.log(`Rendering ${url}...`);

      await page.goto(url, { waitUntil: 'networkidle0' });

      const html = await page.content();
      await validateSnapshot(page, route, html);

      // GitHub Pages serves /cs/home from cs/home.html with 200 (no redirect). Without it,
      // /cs/home 301-redirects to /cs/home/, so every routerLink would cost crawlers a redirect hop.
      // cs/home/index.html is kept as a fallback for the trailing-slash URL.
      const outputPaths = route.path === '/'
        ? [join(outputFolder, 'index.html')]
        : [join(outputFolder, `${route.path}.html`), join(outputFolder, route.path, 'index.html')];
      for (const outputPath of outputPaths) {
        await outputFile(outputPath, html);
      }
      console.log(`✔ Saved ${outputPaths.join(', ')}`);
    }

    // GitHub Pages serves 404.html for unknown paths – give it the plain shell, not a prerendered page.
    await outputFile(join(outputFolder, '404.html'), shellHtml);
    await outputFile(join(outputFolder, 'sitemap.xml'), buildSitemap(routesToPrerender));
    console.log('✔ Saved 404.html and sitemap.xml');
  } finally {
    await browser.close();
    server.close();
  }
}

createSnapshots().catch((err) => {
  console.error('❌ Snapshotting failed:', err);
  process.exit(1);
});
