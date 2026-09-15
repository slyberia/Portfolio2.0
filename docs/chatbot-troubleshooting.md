# Chatbot Runtime Troubleshooting

The Digital Twin has two runtime pieces:

1. The Vite/React frontend renders the chat widget and posts to `/api/chat`.
2. The Express server handles `/api/chat`, keeps `GEMINI_API_KEY` server-side, and streams
   Gemini text back to the browser.

If only the frontend is running or deployed, the widget can render but the chat cannot answer.

## Local Development

Use the full dev script when testing the chatbot:

```bash
cp .env.example .env.local
# Edit .env.local:
# VITE_GEMINI_ENABLED=true
# GEMINI_API_KEY=your_server_side_key
npm install
npm run dev:full
```

`npm run dev` starts only Vite on port 5173. Vite proxies `/api` to
`http://localhost:8080`, so chat requests fail unless the Express server is also running.

## Production Deployment

Production must deploy the Express server, not just the static Vite output. The Docker image builds
`dist/` and `dist-server/`, then starts `dist-server/index.js` on port 8080.

Required server environment variable:

```bash
GEMINI_API_KEY=your_server_side_key
```

Optional server environment variables:

```bash
ALLOWED_CHAT_ORIGINS=https://custom.example.com,https://www.custom.example.com
DIGITAL_TWIN_MAX_DAILY_REQUESTS=25
```

## Symptoms

- Browser console shows a failed request to `/api/chat`: Express is not running, or the site was
  deployed as static files only. Run `npm run dev:full` locally; deploy the Docker/Express app in
  production.
- Chat says the service is not fully configured: `GEMINI_API_KEY` is missing on the server. Add it
  to `.env.local` or deployment secrets.
- Chat says the site origin is not enabled: `ALLOWED_CHAT_ORIGINS` does not include the current
  origin. Add the exact scheme and host, for example `https://www.example.com`.
- Chat says daily limit reached: the per-IP rate limit has been reached. Raise
  `DIGITAL_TWIN_MAX_DAILY_REQUESTS` or wait for the UTC-day reset.
- Chat says the message is too long: input exceeded server validation. Send a shorter message.

## Important Security Rule

Never use `VITE_GEMINI_API_KEY`. Any `VITE_*` variable is bundled into browser JavaScript. The
Gemini key must only be `GEMINI_API_KEY` on the Express server.
