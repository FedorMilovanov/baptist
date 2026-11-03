# Security Policy

## Reporting a vulnerability

Please do not publish credentials, exploit details, or unpatched vulnerability reports in public issues or discussions.

Use GitHub's private vulnerability reporting flow:

1. Open the repository's **Security** tab.
2. Choose **Advisories** and **Report a vulnerability**.
3. Include the affected revision, reproduction steps, impact, and any safe proof of concept.

If private vulnerability reporting is unavailable for this repository, contact the repository owner privately before sharing technical details. Do not send API keys, session cookies, passwords, or other live credentials in a public issue.

## Response and remediation

Reports are triaged against the current `main` revision. Affected credentials should be revoked or rotated before relying on a code-only cleanup. Fixes should preserve existing security checks and be verified on the exact proposed commit.

## Secret-handling expectations

- Keep API keys and deployment credentials in the deployment platform's secret store.
- Do not commit `.env` files, browser cookies, access tokens, or production data.
- Treat every `VITE_*` variable as browser-visible build input; it is not a server-side secret.
