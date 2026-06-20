# Security Policy

This repository is the source for a personal portfolio website. It is not a
product that stores user accounts or sensitive personal data, but it is built
and maintained with a deliberate security posture.

## Reporting a concern

If you discover a security issue, please report it privately rather than
opening a public issue with exploit details:

- Open a [GitHub issue](https://github.com/slyberia/Portfolio2.0/issues) with
  the minimum detail needed to make contact (no live exploit specifics), or
- Email **kfreshsemple@gmail.com**.

Please do not submit sensitive or personal data through the site's contact form
or the AI chat widget.

## Security posture

- **Server-side AI proxy** — Gemini API calls are proxied through an Express
  backend (`server/geminiProxy.ts`); the API key is read server-side as
  `GEMINI_API_KEY` and is never exposed in the client bundle.
- **Input validation & rate limiting** on the proxy endpoint.
- **HTML sanitization** — all rendered HTML passes through DOMPurify with an
  explicit allowlist.
- **HTTP hardening** via Helmet.
- **Secret scanning** (gitleaks) and **dependency updates** (Dependabot) run in
  CI / on schedule.

More detail lives in [`THREAT_MODEL.md`](THREAT_MODEL.md) and
[`SECURITY_AUDIT.md`](SECURITY_AUDIT.md).

## Privacy & logging

The chat proxy logs operational metadata for abuse prevention and debugging:
timestamp, route, request outcome, approximate client IP, and message length. It
does **not** intentionally log chat message content. There is no analytics,
advertising, or third-party tracking on the site, and the chat widget does not
require or collect user accounts. Please don't submit sensitive personal data
through the contact form or chat widget.

## Known limitations

- This is a single-maintainer portfolio project; there is no formal bug-bounty
  program or guaranteed response SLA.
- The AI chat widget is a demonstration feature; treat its output as
  illustrative, not authoritative.
