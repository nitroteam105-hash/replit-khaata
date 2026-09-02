# Replit Khaata

Khaata is a small-business management workspace with a React web app, shared API packages, and HTML product mockups for the civil/project-management vertical.

## Included

- Khaata web application
- Shared API specification, generated clients, and database package
- API server
- Mockup sandbox and project documentation
- Most mockup image assets
- `mockups/khaata-html-and-svg.tar.gz` containing the HTML and SVG mockups

## Run locally

Install dependencies with pnpm, then start the web app with:

```bash
pnpm install
pnpm --filter @workspace/khaata run dev
```

The API server can be started separately with:

```bash
pnpm --filter @workspace/api-server run dev
```

## Notes

This repository was exported from Replit. Replit workspace metadata, caches, dependencies, and build output are intentionally excluded. The GitHub connector does not accept a small set of raw HTML/XML payloads or image files above its file-size limit, so those HTML/SVG files are preserved unchanged in the archive above; oversized source images are not part of the direct import.

Do not commit credentials or environment files.
