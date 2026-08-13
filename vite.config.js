import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { getLiveDownloadTotal } from './scripts/lib/gemStats.mjs';

function injectLiveStats() {
  return {
    name: 'inject-live-stats',
    async transformIndexHtml(html) {
      const { total } = await getLiveDownloadTotal();
      return html.replaceAll('{{GEM_DOWNLOADS}}', `${total.toLocaleString()}+`);
    },
  };
}

export default defineConfig({
  plugins: [react(), injectLiveStats()],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
  },
});
