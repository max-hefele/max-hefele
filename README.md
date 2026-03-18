# MAX HEFELE — Deployment auf GitHub Pages

## Übersicht

Die Website wird als Vite + React Projekt gebaut und über GitHub Actions automatisch auf GitHub Pages deployed. Das heißt: **jedes Mal wenn du Änderungen hochlädst, wird die Seite automatisch neu gebaut und veröffentlicht.**

Kosten: **0 €** (GitHub Pages ist kostenlos)

---

## Projektstruktur

```
max-hefele/
├── .github/
│   └── workflows/
│       └── deploy.yml          ← Automatisches Build & Deploy
├── public/
│   └── images/
│       ├── hero.jpg            ← Hero-Hintergrund (Pressefoto)
│       ├── about.jpg           ← About-Sektion Foto
│       ├── press-2.jpg         ← Alternatives Pressefoto
│       └── logo.jpg            ← MAX HEFELE Logo
├── src/
│   ├── App.jsx                 ← Die komplette Website
│   └── main.jsx                ← React Entry Point
├── index.html                  ← HTML Entry Point
├── package.json                ← Abhängigkeiten
├── vite.config.js              ← Build-Konfiguration
└── .gitignore
```

---

## Schritt-für-Schritt Anleitung

### 1. GitHub Account erstellen (falls noch keiner vorhanden)

→ https://github.com/signup

### 2. Neues Repository erstellen

1. Auf GitHub: **"New repository"** klicken
2. Name: z.B. `max-hefele` (dieser Name erscheint in der URL!)
3. **Public** auswählen (GitHub Pages braucht Public für kostenlose Accounts)
4. NICHT "Add a README" ankreuzen
5. **"Create repository"** klicken

### 3. ⚠️ Repository-Name in vite.config.js anpassen

Öffne `vite.config.js` und passe die `base`-Zeile an:

```js
// Wenn dein Repo 'max-hefele' heißt:
base: '/max-hefele/',

// Wenn dein Repo 'website' heißt:
base: '/website/',

// Wenn du eine Custom Domain nutzt (z.B. maxhefele.de):
base: '/',
```

### 4. Dateien hochladen

**Option A: Über die GitHub-Weboberfläche (einfachste Methode)**

1. Im neuen Repository auf **"uploading an existing file"** klicken
2. Alle Dateien und Ordner per Drag & Drop hochladen
3. **"Commit changes"** klicken

> ⚠️ GitHub Web Upload unterstützt keine Ordnerstrukturen gut.
> Besser: Option B oder C nutzen.

**Option B: Mit GitHub Desktop (empfohlen für Einsteiger)**

1. GitHub Desktop installieren: https://desktop.github.com/
2. Repository klonen (Clone → dein Repo auswählen)
3. Alle Projektdateien in den lokalen Ordner kopieren
4. In GitHub Desktop: Änderungen sehen → "Commit to main" → "Push origin"

**Option C: Mit Git auf der Kommandozeile**

```bash
# Im Projektordner:
git init
git add .
git commit -m "Initial website"
git branch -M main
git remote add origin https://github.com/DEIN-USERNAME/max-hefele.git
git push -u origin main
```

### 5. GitHub Pages aktivieren

1. Im Repository → **Settings** → **Pages** (links im Menü)
2. Unter "Build and deployment":
   - Source: **"GitHub Actions"** auswählen
3. Fertig! Der erste Build startet automatisch.

### 6. Warten & URL aufrufen

- Gehe auf den **Actions**-Tab im Repository
- Du siehst den laufenden Build (dauert ca. 1-2 Minuten)
- Wenn der Build grün ist ✅: Die Seite ist live!

**Deine URL:** `https://DEIN-USERNAME.github.io/max-hefele/`

---

## Inhalte aktualisieren

### Texte, Links, Tour Dates ändern

1. Öffne `src/App.jsx` auf GitHub (Stift-Icon zum Bearbeiten)
2. Ändere die gewünschten Stellen:

```js
// Ganz oben in der Datei stehen alle Konfigurationen:

const SOCIAL_LINKS = [...]      // Social Media Links
const HIGHLIGHTS = [...]         // Festival/Radio Highlights
const RESIDENCIES = [...]        // Club Residencies
const GOOGLE_DRIVE = {           // Google Drive Links
  pressKit: "...",
  videos: "...",
  firstVideo: "...",
}
```

3. Unten auf **"Commit changes"** klicken
4. Die Seite wird automatisch neu gebaut (1-2 Min)

### Bilder austauschen

1. Neue Bilder auf gleiche Größe zuschneiden:
   - `hero.jpg`: ca. 1920×1152px (Querformat)
   - `about.jpg`: ca. 800×1200px (Hochformat)
2. In GitHub zum Ordner `public/images/` navigieren
3. Alte Datei löschen → Neue mit gleichem Namen hochladen
4. Commit → automatischer Rebuild

### Tour Dates hinzufügen

In `src/App.jsx` den "DATES" Bereich suchen und den Platzhalter ersetzen:

```jsx
{/* Ersetze den dates-empty Block mit echten Dates: */}
<div className="tour-item">
  <div className="tour-date">21.03.2026</div>
  <div className="tour-info">
    <div className="tour-venue">Club Name</div>
    <div className="tour-city">Stadt, DE</div>
  </div>
  <a className="tour-ticket" href="https://ticket-link.de" target="_blank">
    Tickets <Icons.Arrow />
  </a>
</div>
```

---

## Optional: Custom Domain (z.B. maxhefele.de)

Wenn Max eine eigene Domain haben möchte (ca. 10-15 €/Jahr):

### 1. Domain kaufen (z.B. bei Namecheap, IONOS, Hetzner)

### 2. DNS einrichten

Beim Domain-Anbieter folgende DNS-Einträge setzen:

```
Typ     Name    Wert
A       @       185.199.108.153
A       @       185.199.109.153
A       @       185.199.110.153
A       @       185.199.111.153
CNAME   www     DEIN-USERNAME.github.io.
```

### 3. CNAME-Datei erstellen

Erstelle die Datei `public/CNAME` mit dem Inhalt:
```
maxhefele.de
```

### 4. vite.config.js anpassen

```js
base: '/',  // Bei Custom Domain immer '/'
```

### 5. In GitHub Settings

Repository → Settings → Pages → Custom domain → `maxhefele.de` → "Enforce HTTPS" ✅

---

## Google Drive Integration

Die Seite verlinkt zentral auf Google Drive — Max kann dort Dateien pflegen, ohne die Website anzufassen:

| Bereich | Google Drive Link | Zweck |
|---------|------------------|-------|
| Press Kit | [Ordner](https://drive.google.com/drive/folders/1IWpYqmi32KSwJYzpufRnb0VvszaQtfL6) | Bio, Fotos, Logo, Tech Rider |
| Videos | [Ordner](https://drive.google.com/drive/folders/159vuE6gldbiJihBx7CigxbYG2p4ZdWj0) | Alle Videos |
| Eingebettetes Video | [Video](https://drive.google.com/file/d/1W4eYUtmmDKoGH5lSQP9gvhMdtTqM-ZGY/view) | Wird direkt auf der Seite angezeigt |

**Wichtig:** Die Google Drive Ordner müssen auf **"Jeder mit dem Link"** gestellt sein, damit Besucher sie sehen können.

---

## Impressum & Datenschutz

Die Platzhalter in den Legal-Modals müssen vor dem Go-Live ausgefüllt werden:

1. In `src/App.jsx` nach `⚠️ PLATZHALTER` suchen
2. Echte Adressdaten, Hosting-Anbieter ("GitHub Pages") eintragen
3. Datum der Datenschutzerklärung setzen

---

## Lokal testen (optional, für Fortgeschrittene)

```bash
# Node.js installieren: https://nodejs.org/ (LTS Version)
cd max-hefele
npm install
npm run dev
# → Öffne http://localhost:5173 im Browser
```

---

## Hilfe & Troubleshooting

| Problem | Lösung |
|---------|--------|
| Build schlägt fehl | Actions-Tab prüfen → Fehlermeldung lesen |
| Seite zeigt 404 | `base` in `vite.config.js` prüfen (muss zum Repo-Namen passen) |
| Bilder laden nicht | Dateinamen prüfen (Groß/Kleinschreibung beachten!) |
| Alte Version wird angezeigt | Hard Refresh: `Ctrl+Shift+R` / Browser-Cache leeren |
| CSS sieht kaputt aus | `npm run build` lokal testen, Konsole auf Fehler prüfen |
