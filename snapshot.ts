// snapshot.ts
import puppeteer from 'puppeteer';
// @ts-ignore
import { createServer } from 'http-server';
// @ts-ignore
import { outputFile } from 'fs-extra';
import { join } from 'path';
import { routesToPrerender } from './public/prerender-routes';

// 🛠️ Config
const distFolder = 'dist/shiatsu-brno/browser';
const outputFolder = distFolder;
const port = 4201;

async function createSnapshots() {
  // Start local server
  const server = createServer({ root: distFolder });
  server.listen(port);

  const browser = await puppeteer.launch({ headless: 'shell' });
  const page = await browser.newPage();

  for (const route of routesToPrerender) {
    const url = `http://localhost:${port}${route}`;
    console.log(`Rendering ${url}...`);

    await page.goto(url, { waitUntil: 'networkidle0' });

    const html = await page.content();
    const outputPath = join(outputFolder, route, 'index.html');

    await outputFile(outputPath, html);
    console.log(`✔ Saved ${outputPath}`);
  }

  await browser.close();
  server.close();
}

createSnapshots().catch((err) => {
  console.error('❌ Snapshotting failed:', err);
  process.exit(1);
});
