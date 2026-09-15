This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

Flusso di Lavoro per i Colleghi

Una volta invitati i tuoi collaboratori nel repository (da Settings > Collaborators), il loro flusso di lavoro standard dovrà essere questo:

    Creazione Branch: Per ogni nuova feature o bugfix, creano un ramo isolato (es. git checkout -b fix-layout-orari).

    Sviluppo: Scrivono il codice, fanno i commit e inviano il ramo su GitHub (git push origin fix-layout-orari).

    Apertura PR: Vanno su GitHub e aprono una Pull Request dal loro ramo verso il tuo main.

La Fase di Revisione (Il tuo ruolo)

Quando viene aperta una Pull Request, tu avrai il controllo totale prima di accettare il codice:

    Revisione del Codice: Nella scheda Files changed della PR su GitHub, potrai vedere riga per riga cosa è stato aggiunto, modificato o rimosso. Puoi lasciare commenti direttamente sulle righe di codice per chiedere correzioni.

    Collaudo tramite Vercel: Poiché hai collegato Vercel, quest'ultimo intercetterà la PR e creerà automaticamente un Preview Deployment. Ti fornirà un URL temporaneo (visibile direttamente nei dettagli della PR su GitHub) dove potrai navigare e testare il sito con le modifiche apportate dal tuo collega, senza dover scaricare il suo codice in locale.

    Approvazione o Rifiuto: Se il collaudo va a buon fine, clicchi su Approve e poi su Merge pull request per integrare le modifiche nel database principale. Se qualcosa non va, selezioni Request changes, bloccando il merge finché il collega non risolve il problema.
