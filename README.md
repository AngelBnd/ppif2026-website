# PPIF 2026 — Altering Your Inner Universe 🌌

The official interactive web application and puzzle game platform for **Perkenalan Prodi Informatika (PPIF) 2026**, organized and developed by the **Divisi Interface PPIF 2026** (Himpunan Mahasiswa Informatika - Universitas Multimedia Nusantara).

---

## 📌 About The Project

* **Theme**: *"Altering Your Inner Universe"*
* **Tagline**: *"Aim, Act, Alternate!"*
* **Description**: This web platform serves as an orientation portal for new Informatics students at UMN, featuring rich informational pages and a storyline-driven mini-game hub. Each student team is assigned a unique code to solve a sequence of computational logic puzzles, collect hidden letter fragments, and reconstruct their final team identity.

---

## ✨ Key Features

### 1. Informational & Documentation Pages
- **Home**: Landing page featuring a cosmic visual aesthetic and interactive 3D elements.
- **About**: Comprehensive overview of PPIF 2026 and Informatics UMN, mission & vision, photo gallery documentation, and committee division profiles.
- **Timeline**: Schedule of key event milestones (Briefing Day, D-Day) with interactive animated date stickers.
- **Contact**: Fast access to official communication channels (Instagram, Discord, WhatsApp) featuring an interactive smartphone mockup animation.
- **Archive**: Historical recaps and activity archives.

### 2. Game Hub & 4 Sequential Mini-Games
Games are unlocked in a strictly enforced server-side sequence:
1. **Signal Decoder**: Decrypt signal clues to uncover the first letter fragments.
2. **Data Trace**: Analyze algorithmic log queries to reveal the second set of fragments.
3. **Core Logic Test**: Timed logic & programming assessment for the third fragment batch.
4. **Reconstruct Identity**: Final assembly game where teams arrange all collected fragments into their assigned group name.

### 3. Real-Time Leaderboard
- Tracks and ranks each team by total puzzle completion time.
- Protected by *HTTP Basic Authentication* for committee members.
- Auto-refreshes every 15 seconds.

### 4. Immersive 3D Graphics & Audio
- Dynamic, lazy-loaded **Three.js** 3D background models.
- Smooth transitions powered by **GSAP** (*ScrollTrigger*, *ScrollSmoother*, and *CircleWipe*).
- Integrated sound effects (SFX) and background music (BGM) player.

---

## 🛠️ Tech Stack

* **Backend**: [Laravel 13](https://laravel.com/) (PHP 8.3+)
* **Full-Stack Adapter**: [Inertia.js React 2.0](https://inertiajs.com/)
* **Frontend**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
* **Styling**: [TailwindCSS 3.x](https://tailwindcss.com/)
* **Animation & 3D**: [GSAP](https://greensock.com/gsap/) & [Three.js](https://threejs.org/)
* **Bundler & Tooling**: [Vite](https://vitejs.dev/)
* **Database**: SQLite (default) / MySQL

---

## 🚀 Getting Started (Setup Tutorial)

### Prerequisites
Make sure your development machine has the following installed:
* **PHP** `>= 8.3` (with extensions: `pdo_sqlite` or `pdo_mysql`, `mbstring`, `fileinfo`, `curl`)
* **Composer** `>= 2.x`
* **Node.js** `>= 18.x` / `20.x` & **npm**

---

### Step-by-Step Installation

#### 1. Clone the Repository & Navigate to Directory
```bash
git clone https://github.com/HMIF-UMN/ppif2026.git
cd ppif2026
```

#### 2. Install PHP Dependencies (Composer)
```bash
composer install
```

#### 3. Install JavaScript Dependencies (Node.js)
```bash
npm install
```

#### 4. Configure Environment (`.env`)
Copy the template `.env.example` file to `.env`:
```bash
# Windows (PowerShell)
copy .env.example .env

# Linux / macOS
cp .env.example .env
```

Generate the Laravel application encryption key:
```bash
php artisan key:generate
```

#### 5. Setup Database & Seed Initial Data
By default, this project uses **SQLite**. Create the database file if it does not exist:

```bash
# Windows (PowerShell)
New-Item -ItemType File -Path database/database.sqlite -Force

# Linux / macOS / Git Bash
touch database/database.sqlite
```

Run database migrations and seeders (loads all 24 team codes and puzzle question banks):
```bash
php artisan migrate:fresh --seed
```

> [!NOTE]
> The database seeder creates 24 pre-configured teams (e.g., code `E64A4` for Stella, `8C692` for Nexus, `0C437` for Cosmo, etc.) along with the server-side puzzle answer keys.

#### 6. Configure Leaderboard Credentials (Optional)
Add the following variables to your `.env` file to enable committee access to the leaderboard:
```env
LEADERBOARD_USERNAME=panitia
LEADERBOARD_PASSWORD=ppif2026supersecret
```

---

### Running the Development Server

You can run all services concurrently (Laravel server, Vite dev server, queue worker, and log tailing):

```bash
composer run dev
```

Alternatively, run them separately in two distinct terminal windows:
* **Terminal 1 (Laravel Backend)**:
  ```bash
  php artisan serve
  ```
* **Terminal 2 (Vite Frontend)**:
  ```bash
  npm run dev
  ```

Open your browser and visit: **`http://localhost:8000`** (or `http://127.0.0.1:8000`).

---

## 🎮 Key Routes & Endpoints

| Page / Feature | URL | Description |
| :--- | :--- | :--- |
| **Home** | `/home` | Main landing page |
| **About** | `/about` | Event information, faculty profile & divisions |
| **Timeline** | `/timeline` | Event schedule and agenda |
| **Contact** | `/contact` | Social media and contact info |
| **Archive** | `/archive` | Event documentation archive |
| **Game Hub** | `/games` | Team login and game selection hub |
| **Storyline** | `/games/story` | Narrative introduction before games |
| **Leaderboard** | `/inibuatorbits/leaderboard` | Committee leaderboard (HTTP Basic Auth) |

---

## 🧪 Useful Commands

* **Build Production Bundle**:
  ```bash
  npm run build
  ```
* **Run Linter**:
  ```bash
  npm run lint
  ```
* **Code Style Formatter**:
  ```bash
  ./vendor/bin/pint
  ```
* **Run Unit & Feature Tests**:
  ```bash
  php artisan test
  ```

---

## 📁 Directory Structure

```
ppif2026/
├── app/
│   ├── Http/Controllers/       # Game, Team, and Leaderboard controllers
│   ├── Http/Middleware/        # Team auth & leaderboard protection middleware
│   ├── Models/                 # Eloquent models (Team, GameProgress, Questions)
│   └── Support/                # GameCatalog & server-side question bank catalogs
├── database/
│   ├── migrations/             # Database schema migrations
│   └── seeders/                # Seeders for 24 teams and puzzle question banks
├── resources/
│   └── js/
│       ├── Components/         # React components (Three.js 3D, GSAP, Audio, UI)
│       ├── Layouts/            # AppLayout and global wrappers
│       ├── Pages/              # Inertia page views (Home, About, Games, etc.)
│       ├── data/               # Static datasets (timeline, divisions, games catalog)
│       └── services/           # Frontend API client handlers
├── routes/
│   └── web.php                 # Web routes and API endpoints
└── vite.config.js              # Vite bundler configuration
```

---

## 👥 Credits & License

Developed with ❤️ for **PPIF 2026** by **Interface PPIF 2026**.  
Licensed under the [MIT License](LICENSE).
