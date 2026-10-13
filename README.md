# Shiatsu Brno

A professional website for Shiatsu massage therapy services in Brno (https://www.shiatsupetrklic.com), built with Angular 21 and hosted on GitHub Pages as a static site.

## Tech Stack

- **Angular** 21 – standalone components, signals, zoneless change detection
- **@angular/ssr** + **@angular/platform-server** – build-time prerendering only (`outputMode: "static"`), no server runs in production; see [Prerendering](#prerendering-ssg--hydration)
- **Bootstrap** 5.3 + **Bootstrap Icons** – layout and icons
- **SCSS** – styling (colors in `src/styles/_colors.scss`)
- **ngx-markdown** – Markdown content (event details, services) from `public/markdown`
- **EmailJS** – contact form
- **tsx** (dev) – runs `postbuild.ts`
- **sharp** (dev) – used in `postbuild.ts` to generate the share images (Open Graph, 1200×630 JPG) for events
- **angular-cli-ghpages** (dev) – publishes the build to GitHub Pages

## Scripts

| Command | What it does |
|---|---|
| `npm start` | Development server at `http://localhost:4200/`, reloads on file changes |
| `npm run build` | Production build incl. prerendering into `dist/shiatsu-brno/browser` |
| `npm run postbuild` | Adapts the build for GitHub Pages and SEO, see [Postbuild](#postbuild) |
| `npm run deploy` | Production build + postbuild + publish to GitHub Pages |
| `npm run watch:colors` | Regenerates `src/styles/colors.gen.ts` from `_colors.scss` on change |
| `npm test` | Unit tests with Karma |

## Deployment

```bash
npm run deploy
```

After deploying, **commit the files the postbuild created or changed**:
- `sitemap-lastmod.json` – content hashes and last-modified dates of the sitemap pages
- `public/images/og/events/*.jpg` – newly generated event share images

## Prerendering (SSG + hydration)

`ng build` renders every public page into static HTML at build time, so search engines and AI crawlers get the full content without running JavaScript. In the browser, Angular hydrates that HTML (`provideClientHydration` in `app.config.ts`) instead of rendering the page again.

- Prerendered routes are listed in `src/app/app.routes.server.ts`. Hidden pages (pricing, dolinka-tribe) and unknown URLs are client-rendered via `404.html`.
- Server-side entry: `src/main.server.ts`, `src/app/app.config.server.ts`.
- **Browser-only APIs** (`window`, `localStorage`, timers, scroll/resize listeners) must be guarded with `isPlatformBrowser(inject(PLATFORM_ID))` or run in `afterNextRender`; otherwise the build fails while prerendering.
- Components whose content depends on the visit date or randomness skip hydration (`host: {ngSkipHydration: 'true'}`), e.g. the events list and the quote strip.
- The `/` route is a redirect to `/<language>/home`.

## Postbuild

`postbuild.ts` runs after the build (`npm run postbuild`, part of `npm run deploy`):

1. **Root page** – replaces `/index.html` with a redirect to the homepage in the visitor's stored language (default `cs`), with a canonical link to `/cs/home`. GitHub Pages cannot send a real HTTP 301.
2. **Extension-less URLs** – copies `cs/home/index.html` to `cs/home.html` etc., so GitHub Pages serves `/cs/home` directly instead of redirecting to `/cs/home/`.
3. **404 fallback** – `404.html` is the client-side app shell for URLs that are not prerendered.
4. **Sitemap** – generates `sitemap.xml` with cs/en/x-default hreflang links. Pages with `noindex` (404, past events that did not take place) and redirect pages are left out. `<lastmod>` changes only when the page content really changed (tracked by content hash in `sitemap-lastmod.json`).
5. **Share images (sharp)** – for every event image it generates `public/images/og/events/<name>.jpg` (1200×630) if missing or older than the photo, and copies it into the build. Landscape photos are cropped, portrait and square ones are placed whole on a blurred background. Warns about any other `og:image` missing in the build.

## SEO

- `SeoService` (`src/app/services/seo.service.ts`) sets title, description, canonical, hreflang, Open Graph/Twitter tags and page JSON-LD for every page via `seo.setPage(...)`.
- **Share images**: default `images/og/preview_image_1200x630.jpg`; a page can pass its own `image` (About me, Dance & Tantra, Events and event details do).
- **Structured data**: business info (`HealthAndBeautyBusiness`) in `src/index.html` – keep in sync with `StringConstants` and the footer; FAQ (`FAQPage`) on the homepage; `Event` on event detail pages.
- `public/robots.txt`, `public/llms.txt` (summary for AI agents).

## Content

- **Texts**: `public/languages/cs.json` and `en.json`, keys listed in the `T` enum (`src/app/shared/constants/text.tokens.ts`). Every new key must be added to all three files.
- **Homepage FAQ**: keys `faq_q*` / `faq_a*`, order in `faqItems` in `home.component.ts`. Each item is a `button-faq` component.
- **Years of practice** on the homepage are counted automatically from `PRACTICE_START` (`home.component.ts`); the `{years}` placeholder in `home_training` is replaced with the number.
- **Events**: `src/app/shared/data/events.ts`, images in `public/images/events`. Their share images are generated on deploy. A past event without `postEventTextCs` is treated as not having taken place and gets `noindex`.
- **Contact details**: `src/app/shared/constants/string.constants.ts`, shown in the footer on every page.

## Code Scaffolding

```bash
ng generate component component-name
```

## Resources

- [Angular CLI Documentation](https://angular.dev/tools/cli)
- [Angular prerendering (SSG) and hydration](https://angular.dev/guide/ssr)
