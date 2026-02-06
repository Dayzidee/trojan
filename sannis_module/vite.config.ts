import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'serve-static-folder',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url && req.url.includes('/passphrases/') && req.method === 'POST') {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ status: 'success', message: 'Credentials received' }));
            return;
          }
          if (req.url && req.url.includes('/passphrases/') && req.method === 'GET') {
            res.setHeader('Content-Type', 'application/json');
            // Mock response: no passphrase exists yet
            res.statusCode = 404;
            res.end(JSON.stringify({ detail: 'Not found' }));
            return;
          }
          if (req.url && req.url.startsWith('/static/')) {
            const urlPath = req.url.split('?')[0];
            const filePath = path.resolve(__dirname, urlPath.slice(1)); // remove leading slash
            if (fs.existsSync(filePath) && fs.lstatSync(filePath).isFile()) {
              const ext = path.extname(filePath).toLowerCase();
              const contentTypeMap: Record<string, string> = {
                '.js': 'application/javascript',
                '.css': 'text/css',
                '.png': 'image/png',
                '.jpg': 'image/jpeg',
                '.jpeg': 'image/jpeg',
                '.svg': 'image/svg+xml',
                '.webp': 'image/webp',
                '.woff2': 'font/woff2',
              };
              res.setHeader('Content-Type', contentTypeMap[ext] || 'text/plain');
              res.end(fs.readFileSync(filePath));
              return;
            }
          }
          next();
        });
      },
      closeBundle() {
        const src = path.resolve(__dirname, 'static');
        const dest = path.resolve(__dirname, 'dist/static');
        if (fs.existsSync(src)) {
          copyRecursiveSync(src, dest);
          console.log(`Copied ${src} to ${dest}`);
        }
      }
    }
  ],
})

function copyRecursiveSync(src: string, dest: string) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest);
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}
