# ShiatsuBrno

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

general build command:
```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## _colors.scss watcher watch-scss-colors.js 

This file generates ts file with colors from _colors.scss. It is used to keep the color definitions in sync with the SCSS file.
Run as follows:

```bash
npm run watch:colors
``` 

## Deploying to Production

Command to deploy the application to production, this will build the project and push it to the specified remote repository:

```bash
npm run deploy
```

Changes in angular.json file:
```json
...
"architect": {
        "build": {
          "builder": "@angular/build:application",
          "options": {
            "browser": "src/main.ts",
            "tsConfig": "tsconfig.app.json",
            "inlineStyleLanguage": "scss",
            "outputPath": "dist/shiatsu-brno", <-- THIS IS THE OUTPUT DIRECTORY
            "assets": [
              {
                "glob": "**/*",
                "input": "public"
              }
            ],
            "styles": [
              "src/styles.scss",
              "node_modules/bootstrap/dist/css/bootstrap.min.css"
            ]
          },
          "configurations": {
            "production": {
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "1MB", <--- SET MAXIMUM WARNING SIZE
                  "maximumError": "2MB" <--- SET MAXIMUM ERROR SIZE
                },
...
```
Changes in package.json file:
```json
...
"scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test",
    "deploy": "ng build --base-href=/ShiatsuPetrklic/ && npx angular-cli-ghpages --dir=dist/shiatsu-brno/browser", <-- This is the deploy command
    "watch:colors": "node watch-scss-colors.js" <-- This is the command to watch colors
  },
... 
```
