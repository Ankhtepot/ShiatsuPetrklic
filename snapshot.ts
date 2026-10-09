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

function startSnapshotServer(): Promise<{ server: ReturnType<typeof createServer>; port: number }> {
  const server = createServer({ root: distFolder });

  return new Promise((resolve, reject) => {
    server.server.once('error', reject);
    server.listen(0, () => {
      const address = server.server.address();
      if (!address || typeof address === 'string') {
        reject(new Error('Snapshot server did not expose a numeric port.'));
        return;
      }

      resolve({ server, port: address.port });
    });
  });
}

async function createSnapshots() {
  const { server, port } = await startSnapshotServer();

  const browser = await puppeteer.launch({ headless: 'shell' });
  const page = await browser.newPage();

  for (const route of routesToPrerender) {
    const url = `http://localhost:${port}${route}`;
    console.log(`Rendering ${url}...`);

    await page.goto(url, { waitUntil: 'networkidle0' });

    const html = await page.content();
    if (html.includes('/@vite/client')) {
      throw new Error(
        `Snapshot for "${route}" captured Vite dev-server assets instead of the production build.`
      );
    }

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
