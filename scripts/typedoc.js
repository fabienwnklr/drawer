/* eslint-env node */
import { Application } from 'typedoc';

async function main() {
  // Application.bootstrap also exists, which will not load plugins
  // Also accepts an array of option readers if you want to disable
  // TypeDoc's tsconfig.json/package.json/typedoc.json option readers
  const app = await Application.bootstrapWithPlugins({
    entryPoints: ['src/**/*.ts'],
    plugin: ["typedoc-plugin-markdown"],
    gitRevision: "master",
    excludePrivate: true,
    logLevel: "Verbose"
  });

  const project = await app.convert();

  if (project) {
    // Project may not have converted correctly
    const outputDir = 'docs/docs/api';
    // Rendered docs
    await app.generateDocs(project, outputDir);
  }
}

main().catch(console.error);
