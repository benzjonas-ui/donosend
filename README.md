# Donosend Pro – MVP-Grundlage

Diese Version ist eine professionelle, erweiterbare Grundlage für den Donosend-Pilotbetrieb.

## Enthalten

- React + Vite
- responsive Landingpage
- Partner- und Organisationsansichten
- Partner-Dashboard als funktionale UI-Demo
- QR-Zahlungsseite
- Stripe Checkout Netlify Function
- Stripe Connect Express Onboarding Function
- Stripe Webhook
- Supabase-Datenbankschema
- Netlify-Konfiguration

## Wichtig

Die Oberfläche ist lauffähig. Stripe Checkout funktioniert nach Hinterlegen der Testschlüssel. Benutzerkonten, echte Dashboard-Daten, automatische Spendenweiterleitung und der finale Connect-Split sind als nächste Entwicklungsstufe vorgesehen.

## Lokal starten

```bash
npm install
npm run dev
```

Für Netlify Functions lokal:

```bash
npm install -g netlify-cli
netlify dev
```

## Netlify-Variablen

- `STRIPE_SECRET_KEY` = `sk_test_...` und als Secret markieren
- `STRIPE_WEBHOOK_SECRET` = später `whsec_...`
- `SITE_URL` = veröffentlichte Netlify-URL
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_STRIPE_PUBLISHABLE_KEY` = `pk_test_...`

## Deployment über GitHub

1. ZIP entpacken.
2. Alle Inhalte in dein geklontes GitHub-Repository `donosend` kopieren.
3. GitHub Desktop öffnen.
4. Commit-Nachricht: `Initial Donosend Pro MVP`.
5. `Commit to main` und danach `Push origin`.
6. In Netlify: Add new project → Import from Git → GitHub → `donosend`.
7. Build-Einstellungen werden aus `netlify.toml` übernommen.

## Stripe-Webhook

Nach dem ersten Netlify-Deploy:

- Endpoint: `https://DEINE-SEITE.netlify.app/.netlify/functions/stripe-webhook`
- Event: `checkout.session.completed`
- erzeugtes `whsec_...` als `STRIPE_WEBHOOK_SECRET` in Netlify speichern

## Nächste sinnvolle Schritte

1. Supabase Auth integrieren
2. Händler-Onboarding speichern
3. Connect Account IDs in Supabase ablegen
4. Zahlungsbeiträge und Plattformgebühren festlegen
5. Organisationen rechtlich und technisch verifizieren
6. echtes Wirkungsdashboard aus Zahlungsdaten aufbauen

## Pilot Flow v2
- `/profil/jonas` – öffentliches Verkäuferprofil mit persönlichem QR-Code
- `/pay/jonas` – direkte Kundenseite ohne Donosend-Login
- `/organisationen` – Pro Vita Animale als klar gekennzeichnetes Demo-Profil
- `/success` – Bestätigung nach Stripe-Sandbox-Zahlung
