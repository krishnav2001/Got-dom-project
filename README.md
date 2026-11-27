# People of GOT 👑

An interactive **Game of Thrones** character directory built with **Vanilla JavaScript (DOM Manipulation)**, **Tailwind CSS**, and **Vite**. Browse characters across the Great Houses and groups of Westeros and Essos, filter by house, and search in real time.

---

## ✨ Features

- **Real-Time Search:** Filter characters instantaneously by name, description/titles, or house name.
- **House & Group Filters:** Toggle filters for major houses and factions (`Starks`, `Lannisters`, `Baratheons`, `Targaryens`, `Greyjoys`, `Tyrells`, `Tullys`, `Redwyne`, `Freys`, `Arryns`, `Dothrakis`).
- **Combined Filtering:** Search queries and active house filters work together seamlessly.
- **Character Cards:** Displays each character's portrait (with automatic SVG initial fallback if an image fails to load), name, titles/bio, and a **KNOW MORE** link to their Wiki page.
- **Responsive Grid:** Adapts cleanly across mobile (`1` column), tablet (`2` columns), and desktop (`3` columns) screens.

---

## 🛠️ Tech Stack

- **HTML5**
- **Tailwind CSS (v4)** with `@tailwindcss/vite`
- **Vanilla JavaScript (ES Modules + DOM API)**
- **Vite** (Development server & bundler)

---

## 📁 Project Structure

```text
got_dom/
├── node_modules/        # Installed npm dependencies
├── .gitignore           # Git ignored files and folders
├── got-data.js          # Dataset containing houses, characters, images, and wiki links
├── index.html           # Main HTML entry point and layout structure
├── package.json         # Project metadata, scripts, and dependencies
├── package-lock.json    # Locked dependency tree
├── README.md            # Project documentation
├── script.js            # DOM rendering, house filtering, and search logic
├── style.css            # Tailwind CSS entry stylesheet
└── vite.config.js       # Vite configuration with Tailwind plugin
```

---

## 🚀 Getting Started

### 1. Clone or Navigate to the Project
```bash
cd got_dom
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npm run dev
```
Open the local URL shown in your terminal (typically `http://localhost:5173`) to view the app.

### 4. Build for Production
```bash
npm run build
```

---

## 🧩 How It Works

1. **`got-data.js`** defines the global `got` object structured by houses, with each house containing an array of `people`.
2. **`script.js`** flattens `got.houses` into a unified character list while retaining each character's house metadata, dynamically renders the house filter buttons, and updates the `#cards-grid` whenever the search input or active house filter changes.
3. **`style.css`** imports Tailwind CSS (`@import "tailwindcss";`), which Vite compiles via `@tailwindcss/vite`.
