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

## Site Snapshot

Create a snapshot for SEO purposes:

```bash
npx tsx snapshot.ts
```

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

