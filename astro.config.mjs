// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  build: {
    assets: 'static'
  },

  //Localhost
  //Deploy normal project
  base: '/designs-with-canva-part-2/',
  site: 'https://20essentials.github.io/designs-with-canva-part-2/',
  // site: 'http://localhost:4321/',

  integrations: [react()]
});