# Picard App

Frontend React, Vite et TypeScript de l'application Picard.

## Développement local

```bash
npm install
npm run dev
```

Par défaut, le frontend appelle l'API locale sur `http://localhost:8000`.

## Vérifications

```bash
npm run lint
npm run build
```

## Déploiement Render

Le dépôt contient un `render.yaml` pour créer un site statique. La variable `VITE_API_URL` doit contenir l'URL publique de l'API, sans barre oblique finale.
