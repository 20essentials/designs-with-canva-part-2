// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  build: {
    assets: 'static'
  },

  base: import.meta.env.DEV ? undefined : '/designs-with-canva-part-2/',
  site: import.meta.env.DEV
    ? 'http://localhost:4321/'
    : 'https://20essentials.github.io/designs-with-canva-part-2/',

  integrations: [react()]
});
