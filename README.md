# Movena marketing site

The production website is currently published from the legacy static HTML at
the repository root through GitHub Pages. The `CNAME`, root HTML files,
directory `index.html` files, and root `assets/` directory remain the production
source until a separately approved hosting cutover.

The migration-safe Next.js baseline lives alongside those files on the
`redesign/slice-1-next-baseline` branch. It statically renders the existing
content without implementing the later visual/content redesign.

## Local Next.js commands

```sh
npm install
npm run dev
npm run lint
npm run typecheck
npm test
npm run build
npm run test:http
```

`public/assets/` is an exact copy of the legacy root `assets/` directory so the
Next.js app can serve the existing `/assets/...` URLs without moving or deleting
anything required by GitHub Pages.
