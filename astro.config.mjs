// @ts-check
import { execSync } from 'node:child_process';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import packageJson from './package.json' with { type: 'json' };

const getGitCommit = () => {
  try {
    return execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim();
  } catch {
    return 'dev';
  }
};

const appVersion = process.env.APP_VERSION || packageJson.version;
const buildCommit = process.env.BUILD_COMMIT || getGitCommit();
const buildDate = process.env.BUILD_DATE || new Date().toISOString();

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  site: 'https://map.dongholab.com',
  // base path 제거 - 루트에서 서빙
  output: 'static',
  vite: {
    define: {
      'import.meta.env.PUBLIC_APP_VERSION': JSON.stringify(appVersion),
      'import.meta.env.PUBLIC_BUILD_COMMIT': JSON.stringify(buildCommit),
      'import.meta.env.PUBLIC_BUILD_DATE': JSON.stringify(buildDate),
    },
  },
});
