import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import express from 'express';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';
import geminiProxy from './geminiProxy.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ?? 8080;

app.use(helmet({ frameguard: { action: 'deny' } }));

// Parse JSON request bodies — 10 KB limit prevents memory-exhaustion via large payloads
app.use(express.json({ limit: '10kb' }));

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
