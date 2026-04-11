import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import geminiProxy from './geminiProxy.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ?? 8080;

// Security headers
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Parse JSON request bodies
app.use(express.json());

// Mount Gemini proxy before static middleware
app.use('/api', geminiProxy);

// Serve built frontend from dist/
const distDir = path.resolve(__dirname, '..', 'dist');
app.use(express.static(distDir));

// SPA fallback: serve index.html for all non-/api/* routes
app.get(/^(?!\/api\/).*$/, (_req, res) => {
  res.sendFile(path.join(distDir, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
