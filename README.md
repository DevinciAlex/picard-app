# Picard App

Frontend React, Vite et TypeScript de l'application Picard.

## Liens du rendu

- Dépôt GitHub : <https://github.com/DevinciAlex/picard-app>
- Application publique : <https://picard-app.onrender.com>
- API Symfony utilisée : <https://picard-api.onrender.com>
- Vidéo de démonstration : <https://youtu.be/B-UpZasggjU>

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

Les résultats du 31 août 2026 sont consignés dans `preuves/RESULTATS-TESTS.md`.

## Déploiement Render

Le dépôt contient un `render.yaml` pour créer un site statique. La variable `VITE_API_URL` doit contenir l'URL publique de l'API, sans barre oblique finale.

## Ressources et documentation

- React : <https://react.dev/learn>
- Vite : <https://vite.dev/guide/>
- React Router : <https://reactrouter.com/start/declarative/routing>
- API Fetch du navigateur : <https://developer.mozilla.org/fr/docs/Web/API/Fetch_API>
- Stockage de session : <https://developer.mozilla.org/fr/docs/Web/API/Window/sessionStorage>
