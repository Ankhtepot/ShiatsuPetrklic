const fs = require('fs');
const chokidar = require('chokidar');
const sass = require('sass');
const path = require('path');

// File paths
const INPUT_SCSS = 'src/styles/_colors.scss';
const OUTPUT_TS = 'src/styles/colors.gen.ts';
const EXPORT_NAME = 'AppColors';

// Convert SCSS variable name to camelCase
function toCamelCase(str) {
  return str
    .replace(/^\$/, '')
    .replace(/[-_](\w)/g, (_, c) => c.toUpperCase());
}

// Extract variable declarations from rendered CSS
function parseVariablesFromScss() {
  const result = sass.compileString(`
    @use 'sass:meta';
    @use './${INPUT_SCSS.replace(/^src\/styles\//, '')}' as vars;

    :root {
      ${fs.readFileSync(INPUT_SCSS, 'utf-8')
    .split('\n')
    .filter(line => line.startsWith('$'))
    .map(line => {
      const match = line.match(/^\$(.+?):\s*(.+?);/);
      if (!match) return '';
      const [_, name, value] = match;
      return `--${name.trim()}: #{vars.$${name.trim()}};`;
    })
    .join('\n')}
    }
  `, {
    loadPaths: ['src/styles'],
    style: 'expanded'
  });

  const rootCSS = result.css;

  const variableRegex = /--(.+?):\s*(.+?);/g;
  const output = {};

  let match;
  while ((match = variableRegex.exec(rootCSS)) !== null) {
    const key = toCamelCase(match[1]);
    output[key] = match[2];
  }

  return output;
}

// Write to TypeScript file
function writeTS(vars) {
  const lines = [
    `// Auto-generated from _colors.scss – do not edit manually.`,
    `export const ${EXPORT_NAME} = {`
  ];

  for (const [key, value] of Object.entries(vars)) {
    lines.push(`  ${key}: '${value}',`);
  }

  lines.push('};\n');

  fs.writeFileSync(OUTPUT_TS, lines.join('\n'), 'utf-8');
  console.log(`✅ SCSS variables exported to ${path.relative(process.cwd(), OUTPUT_TS)}`);
}

// Main generator
function generateColors() {
  try {
    const vars = parseVariablesFromScss();
    if (!Object.keys(vars).length) {
      console.error('❌ No SCSS variables found.');
      return;
    }

    writeTS(vars);
  } catch (err) {
    console.error('❌ Failed to parse SCSS:', err.message);
  }
}

// Watch file and regenerate on change
chokidar.watch(INPUT_SCSS).on('change', generateColors);
generateColors();
