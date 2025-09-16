# DonSang Guinée – Déploiement Netlify

## Prérequis
- Compte Netlify
- Repo GitHub: bahmansourca/donsang-guinee

## Variables d’environnement (Netlify)
- `DATABASE_URL` = `file:./dev.db` (pour test)
- `ADMIN_PASSWORD` = votre mot de passe admin
- `NODE_VERSION` = `20`

## Build & Publish
- Build command: `npm run build`
- Publish directory: `.next`
- Plugin: `@netlify/plugin-nextjs`

## Étapes
1. Sur Netlify, “Add new site” → “Import from Git”.
2. Choisir GitHub et le repo `donsang-guinee`.
3. Renseigner les variables d’environnement.
4. Lancer le déploiement.
