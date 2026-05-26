# DotNexus

Website voor DotNexus — Next.js (App Router), klaar voor deploy op [Vercel](https://vercel.com) via GitHub.

## Lokaal ontwikkelen

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy naar Vercel (via GitHub)

1. Maak een **nieuwe repository** op GitHub (bijv. `dotnexus`).
2. Push deze map:

   ```bash
   git remote add origin git@github.com:<jouw-user>/dotnexus.git
   git add .
   git commit -m "Initial DotNexus site"
   git push -u origin main
   ```

3. Ga naar [vercel.com/new](https://vercel.com/new) → **Import** je GitHub-repo.
4. Vercel herkent Next.js automatisch; klik **Deploy**.

Daarna deployt elke push naar `main` automatisch opnieuw.

## Scripts

| Commando        | Beschrijving        |
|-----------------|---------------------|
| `npm run dev`   | Development server  |
| `npm run build` | Productie-build     |
| `npm run start` | Productie-server    |
| `npm run lint`  | ESLint              |
