/**
 * Disclaimer: this build is extremely hacky. We need to use `monic` and webpack
 * to produce better build.
 */
import fs from 'fs';
import { build } from 'tsup';
import type { Plugin } from 'esbuild'
import path from 'path';

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
const { devDependencies } = packageJson;
const external = [...Object.keys({ ...devDependencies })];
const entry = ['src/config.ts', 'src/index.ts'];

const excludeV4Fire: Plugin = {
  name: 'exclude-v4fire',
  setup(build) {
    build.onResolve({ filter: /.*/ }, (args) => {
      if (args.resolveDir.includes('@v4fire')) {
        return { external: true };
      }
    })
  },
}

const esmPromise = build({
  entry,
  clean: true,
  outDir: 'dist',
  format: ['esm'],
  target: 'chrome100',
  platform: 'browser',
  external,
  esbuildPlugins: [
    excludeV4Fire,
  ],
  esbuildOptions: (c) => {
    c.conditions = ['module'];
    c.platform = 'browser';
  },
  dts: true,
  outExtension() {
    return {
      js: '.mjs',
    };
  },
})

const cjsPromise = build({
  entry,
  clean: true,
  outDir: 'dist',
  format: ['cjs'],
  target: 'node18',
  platform: 'node',
  external,
  esbuildPlugins: [
    excludeV4Fire,
  ],
  esbuildOptions: (c) => {
    c.platform = 'node';
  },
  outExtension() {
    return {
      js: '.js',
    };
  },
})

// Remove dynamic imports from build
Promise.all([esmPromise, cjsPromise]).then(() => {
  const files = fs.readdirSync(path.resolve(__dirname, 'dist'));

  for (const file of files) {
    const stat = fs.statSync(file);
    if (stat.isFile() && file.endsWith('js')) {
      let contents = fs.readFileSync(file, {encoding: 'utf-8'});

      if (file.endsWith('.mjs')) {
        contents = contents.replace(/import\(.*?\);\n/g, '');
      }

       
    }
  }
}).catch((error) => {
  console.log('Postprocess failed, reason: ' + error.message);
});
