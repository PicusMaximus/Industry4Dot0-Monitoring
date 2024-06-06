# Industrie 4.0 Monitor

## Einrichtung

- Repository klonen:
  ```bash
  git clone https://github.com/PicusMaximus/Industry4Dot0-Monitoring.git
  ```
- Node.js installieren (https://nodejs.org/en/download/prebuilt-installer)
- Dependencies installieren:
  ```bash
  npm install
  ```
- Devserver starten:
  ```bash
  npm run dev
  ```
  > **Hinweis:** In VSCode sollte der Devserver automatisch gestartet werden, wenn das Projekt geöffnet wird.
- Live-Vorschau im Browser öffnen:
  ```
  http://localhost:3000
  ```

## Befehle

### Nuxt 3

Weitere Informationen findest du in der [Nuxt 3 Dokumentation](https://nuxt.com/docs/getting-started/introduction).

#### Entwicklungsserver

Starte den Entwicklungsserver auf `http://localhost:3000`:

```bash
npm run dev
```

#### Produktion

Baue die Anwendung für die Produktion:

```bash
npm run build
```

Lokale Vorschau der Produktionsversion:

```bash
npm run preview
```

Schau dir die [Bereitstellungsdokumentation](https://nuxt.com/docs/getting-started/deployment) für weitere Informationen an.

### Drizzle

Schau dir die [Drizzle-Dokumentation](https://orm.drizzle.team/docs/overview) an, um mehr zu erfahren.

#### Migration generieren

Generiere eine neue Migration im Verzeichnis `src/database/migrations`:

```bash
npm run db:generate
```

> **Hinweis:** Migrationen werden automatisch ausgeführt, wenn die Anwendung startet.

#### Studio starten

Starte das [Drizzle Studio](https://orm.drizzle.team/drizzle-studio/overview):

```bash
npm run db:studio
```

## Ordnerstruktur

Die Ordnerstruktur wird größtenteils von Nuxt 3 vorgegeben. Da viele Dateien von Nuxt automatisch geladen werden, ist es wichtig, die Dateien in den richtigen Ordnern zu speichern.

Mehr Informationen:

- [Ordnerstruktur](https://nuxt.com/docs/guide)

Zu den wichtigsten Ordnern hier noch eine kurze Übersicht:

### `components`

Die Vue-Komponenten in diesem Ordner werden von Nuxt in anderen Komponenten oder Seiten automatisch importiert.

Mehr Informationen:

- [Vue Komponenten](https://vuejs.org/guide/essentials/component-basics.html)
- [Nuxt Komponenten Ordner](https://nuxt.com/docs/guide/directory-structure/components)
- [Auto Imports in Nuxt](https://nuxt.com/docs/guide/concepts/auto-imports)

### `composables`

Composables sind Funktionen, die Logik und State für mehrere Komponenten wiederverwendbar machen. Die Composables in diesem Ordner werden von Nuxt in anderen Komponenten oder Seiten automatisch importiert.

Mehr Informationen:

- [Vue Composables](https://vuejs.org/guide/reusability/composables.html)
- [Nuxt Composables Ordner](https://nuxt.com/docs/guide/directory-structure/composables)
- [Auto Imports in Nuxt](https://nuxt.com/docs/guide/concepts/auto-imports)

### `pages`

Die Vue-Komponenten in diesem Ordner sind automatisch mit einer URL verknüpft. Die Dateistruktur entspricht der URL-Struktur.

`pages/index.vue` -> `http://localhost:3000/`  
`pages/jobs.vue` -> `http://localhost:3000/jobs`

Mehr Informationen:

- [Nuxt Pages Ordner](https://nuxt.com/docs/guide/directory-structure/pages)

### `server`

Hier wird die Server-Logik definiert. Nuxt nutzt [Nitro](https://nitro.unjs.io/guide) als Server-Framework.

#### `api`

Hier werden die API-Endpunkte definiert. Die Dateien in diesem Ordner werden automatisch von Nuxt geladen. Die Dateistruktur entspricht der URL-Struktur.

`server/api/jobs.js` -> `http://localhost:3000/api/jobs`

Mehr Informationen:

- [Nuxt Server API Ordner](https://nuxt.com/docs/guide/directory-structure/server#server-routes)
- [Nitro API Ordner](https://nitro.unjs.io/guide/routing)

#### `database`

Hier liegen die Drizzle-Schemas und Migrationen. Drizzle ist ein typsicheres ORM für Node.js.

Mehr Informationen:

- [Drizzle Dokumentation](https://orm.drizzle.team/docs/overview)

##### `schemas`

Hier werden die Drizzle-Schemas definiert. Diese werden durch das eigene Drizzle Modul (`models/drizzle.ts`) automatisch geladen.

Mehr Informationen:

- [Drizzle Schemas](https://orm.drizzle.team/docs/sql-schema-declaration)

##### `migrations`

Hier werden die von Drizzle automatisch generierten Migrationen gespeichert.

Neue Migrationen können mit dem Befehl `npm run db:generate` generiert werden.

Mehr Informationen:

- [Drizzle Migrationen](https://orm.drizzle.team/kit-docs/overview#migration-files)

#### `tasks`

Die Tasks in diesem Ordner werden von Nitro automatisch geladen und werden über die Konfiguration in der `nuxt.config.ts` unter `nitro.scheduledTasks` automatisch periodisch ausgeführt.

Mehr Informationen:

- [Nitro Tasks](https://nitro.unjs.io/guide/tasks)

#### `utils`

Funktionen, die in der Server-Logik automatisch importiert werden.

Mehr Informationen:

- [Nitro Utils](https://nitro.unjs.io/guide/utils)
- [Auto Imports in Nuxt](https://nuxt.com/docs/guide/concepts/auto-imports)

### `utils`

Funktionen, die in der Client-Logik automatisch importiert werden.

Mehr Informationen:

- [Auto Imports in Nuxt](https://nuxt.com/docs/guide/concepts/auto-imports)
- [Nuxt Utils Ordner](https://nuxt.com/docs/guide/directory-structure/utils)

## Verwendete Technologien

- [Nuxt 3](https://nuxt.com/docs/getting-started/introduction) (Full-Stack Framework)
  - [Vue 3](https://v3.vuejs.org/guide/introduction.html) (Frontend)
  - [Nitro](https://nitro.unjs.io/guide) (Server)
- Datenbank
  - [Drizzle](https://orm.drizzle.team/docs/overview) (ORM)
  - SQLite (Datenbank)
- Styles
  - [Tailwind CSS](https://tailwindcss.com/docs) (CSS Framework)
  - [Element Plus](https://element-plus.org/en-US/component/overview.html) (Vue Komponenten Bibliothek)
- Weiteres
  - [Zod](https://zod.dev/) (Schema Validierung)
  - [Vue Use](https://vueuse.org/guide/) (Vue Composables)
  - [Vue Draggable](https://sortablejs.github.io/Vue.Draggable/#/simple) (Drag & Drop)
  - [ts-reset](https://github.com/total-typescript/ts-reset?tab=readme-ov-file) (Verbesserte Typen für Built-In Types)
  - [Prettier](https://prettier.io/docs/en/index.html) (Code Formatter)

## Todos

- [ ] Logik zum stoppen der Geräte bei Fehlern in der Produktionslinie überarbeiten
- [ ] Visualisierung Aktiver Jobs + Aktuelles Gerät
  - Teilwesie eingebaut, muss getestet werden und das Gerät zum Job muss gehighlightet werden
  - Die Geräte müssen beim starten eines Jobs ein Event mit dem Status `job-gestartet` und beim beenden ein Event mit dem Status `job-beendet` senden.
- [ ] Produktionslinie stoppen wenn ein Gerät zu lange keinen neuen Status sendet
  - Die Anpassung macht nur Sinn wenn die Geräte die Events senden.
- [ ] Eventlog Einträge limitieren
  - Aktuell werden alle Events gerendert/ausgelesen
- [ ] Entfernen von Jobs aus der Jobreihenfolge auch an den Geräten
  - Aktuell kann der nächste Job für einen Job bei den Geräten nur zu einem anderen Job geändert, aber nicht entfernt werden.
- [ ] Möglichkeit die Produktionslinie zu pausieren
