import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import express from 'express';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';
import geminiProxy from './geminiProxy.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createApp(distDir = path.resolve(__dirname, '..', 'dist')) {
  const app = express();

  app.use(
    helmet({
      frameguard: { action: 'deny' },
      contentSecurityPolicy: {
        directives: {
          ...helmet.contentSecurityPolicy.getDefaultDirectives(),
          'img-src': ["'self'", 'data:', 'https://storage.googleapis.com'],
          'frame-src': [
            "'self'",
            'https://luxe-lofts-roadmap-repo-786228485832.us-central1.run.app',
            'https://guynode-spatial-data-hub-786228485832.us-central1.run.app',
          ],
        },
      },
    }),
  );

  // Helmet does not set Permissions-Policy; add a restrictive policy so the site
  // explicitly opts out of powerful browser features it never uses. Closes the one
  // gap in the deployed securityheaders.com grade (A → A+ on that header).
  app.use((_req, res, next) => {
    res.setHeader(
      'Permissions-Policy',
      'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=(), interest-cohort=()',
    );
    next();
  });

  app.get('/healthz', (_req, res) => {
    res.status(200).json({ ok: true });
  });

  app.use(express.json({ limit: '10kb' }));
  app.use('/api', geminiProxy);

  // Serve the AI index through one canonical URL. These routes must precede express.static:
  // otherwise the legacy ai-index/ directory can win directory resolution and expose stale copy.
  app.use((req, res, next) => {
    const requestPath = req.originalUrl.split('?')[0];
    if (
      req.method === 'GET' &&
      (requestPath === '/ai-index/' || requestPath === '/ai-index.html')
    ) {
      res.redirect(308, '/ai-index');
      return;
    }
    next();
  });
  app.get('/ai-index', (_req, res) => {
    res.sendFile(path.join(distDir, 'ai-index.html'));
  });

  app.use(express.static(distDir));

  app.get(/^(?!\/api\/).*$/, (_req, res) => {
    res.sendFile(path.join(distDir, 'index.html'));
  });

  return app;
}

const PORT = process.env.PORT ?? 8080;

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const app = createApp();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
