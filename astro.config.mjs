import { defineConfig } from 'astro/config';

// Update `site` to your production domain so canonical + Open Graph URLs resolve correctly.
export default defineConfig({
  site: 'https://studio.anytimemusic.example',
  compressHTML: true,
});
