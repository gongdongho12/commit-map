// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  site: 'https://map.dongholab.com',
  // base path 제거 - 루트에서 서빙
  output: 'static',
});
