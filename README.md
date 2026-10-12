# Shiatsu Brno

A professional website for Shiatsu massage therapy services in Brno, built with Angular 21.

## Tech Stack

- **Angular** 21.0.8
- **Bootstrap** 5.3.6
- **SCSS** for styling
- **ngx-markdown** for Markdown content rendering
- **EmailJS** for contact form

## Development

Start a local development server:

```bash
ng serve
```

Navigate to `http://localhost:4200/`. The app reloads automatically on file changes.

## Building

```bash
ng build
```

Build artifacts are stored in `dist/shiatsu-brno/browser`.

## Deployment

Deploy to GitHub Pages (with build of the artifacts):

```bash
npm run deploy
```

This builds with production configuration and pushes to GitHub Pages.

## SCSS Colors Sync

Generate TypeScript color definitions from `_colors.scss`:

```bash
npm run watch:colors
```

## Prerendering (SEO)

`ng build` prerenders all public pages into static HTML at build time (routes are listed in `src/app/app.routes.server.ts`); in the browser the app hydrates that HTML instead of re-rendering it. No server runs in production.

After the build, adapt the output for GitHub Pages (`.html` copies of each route, `404.html` fallback, `sitemap.xml`):

```bash
npm run postbuild
```

`npm run deploy` runs both steps and publishes.

## Testing

Run unit tests with Karma:

```bash
ng test
```

## Code Scaffolding

```bash
ng generate component component-name
```

## Resources

- [Angular CLI Documentation](https://angular.dev/tools/cli)
