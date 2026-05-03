# Threat Model — Portfolio2.0

## Scope

This model covers the React SPA, Express API proxy (`/api/chat`), deployment to Google Cloud Run, CI/CD workflows, and crawler/LLM accessibility artifacts (`/markdown`, `/ai-index`, `/crawler/**`).

## Architecture Summary

- Frontend: React + TypeScript built by Vite and served as static assets.
- Backend: Express server proxies chatbot requests to Gemini using server-side API key access.
- Hosting: Cloud Run containerized deployment.
- CI: GitHub Actions for lint/test/build and bundle/secret checks.
- Crawler layer: intentionally public mirror routes and machine-readable files for indexing/LLM access.

## Threat Table

| Threat                                                        | Likelihood | Impact | Current Mitigation                                                    | Remaining Gap                                                   | Next Action                                                   |
| ------------------------------------------------------------- | ---------: | -----: | --------------------------------------------------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------- |
| API quota abuse through `/api/chat`                           |     Medium | Medium | Server-side rate limiting and topic/validation gates                  | In-memory limit resets on restart/scale-out                     | Evaluate shared rate-limit store when infra supports it       |
| Prompt injection                                              |     Medium | Medium | Injection phrase detection, scope restrictions, deflection behavior   | Regex defenses can miss novel phrasing                          | Add semantic classifier in later hardening pass               |
| Gemini API key exposure                                       |        Low |   High | Key stays server-side, no client-side key usage, CI bundle leak check | Runtime logs/config missteps could still leak                   | Keep logs metadata-only; rotate key on exposure               |
| XSS via localStorage/unsafe DOM insertion                     |        Low | Medium | Mockup flows use safer text insertion/reset patterns                  | Embedded demo HTML still requires ongoing review                | Keep avoiding `innerHTML` for dynamic text                    |
| Supply-chain compromise via mutable GitHub Actions            |        Low |   High | Core actions pinned to SHAs                                           | Third-party scanner action currently tag-pinned                 | Pin scanner action SHA after verified lookup                  |
| Dependency vulnerabilities                                    |     Medium | Medium | Lockfile + audit process + planned Dependabot updates                 | Some updates blocked when registry/audit endpoints unavailable  | Retry audit remediation in CI/network-enabled environment     |
| Public crawler/markdown mirrors misread as sensitive exposure |     Medium |    Low | Intentional route isolation and separate crawler sitemap              | Misinterpretation risk by reviewers                             | Keep architecture docs explicit on intent                     |
| Cloud Run container compromise                                |        Low |   High | Non-root runtime user, Helmet headers, constrained app surface        | No runtime IDS/advanced isolation controls                      | Monitor Cloud Run security updates and least privilege        |
| Lack of observability                                         |     Medium | Medium | Structured `/api/chat` metadata logging                               | Limited metrics/alerting                                        | Add request/error dashboards in Cloud Logging                 |
| Rate-limit reset after container restart                      |     Medium | Medium | Known and accepted for portfolio scale                                | No persistent quota state                                       | Defer until Redis/shared store is justified                   |
| Missing/unverified production security headers                |        Low | Medium | Helmet middleware configured in app                                   | Deployed header posture not externally re-verified in this pass | Re-check with securityheaders.com post deploy                 |
| Manual Gemini quota cap not enforced in code                  |     Medium | Medium | None in repository automation                                         | Depends on cloud console configuration                          | Set and periodically review quota cap in Google Cloud Console |

## Accepted Risks

- In-memory rate limits are accepted for current portfolio-scale traffic and may reset on restart.
- Crawler mirror routes are intentionally public to support indexing/LLM accessibility.

## Deferred Hardening

- Persistent/distributed rate limiting.
- Semantic prompt-injection classifier.
- Full dependency remediation when registry/audit endpoints are reachable.
- SHA pinning for the new third-party secret scanner action after verified lookup.

## Manual Controls

- Set Gemini API quota limits in Google Cloud Console.
- Verify deployed headers after release with an external scanner.
- Monitor Cloud Run logs for repeated blocked or rate-limited request patterns.
