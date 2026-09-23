# LabProfessionalWebsite

Website for the Pharmaceutical Nanotechnology Research Laboratory (PNRL), NIPER Hyderabad, built with React + Vite and hosted on Netlify.

All site content lives in [`src/data/lab.json`](src/data/lab.json) (source: [client profile](docs/functional-spec/client-profile-pnrl.md)). Edit that file to update text, team, equipment or contact details.

## Getting started

```bash
nvm use        # Node 22
npm install
npm run dev    # http://localhost:5173
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Lint with oxlint |

## Docs

- [Functional spec](docs/functional-spec/)
- [Tech spec](docs/tech-spec/)
