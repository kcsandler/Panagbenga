# Panagbenga Sentiment & Topic Dashboard

An interactive dashboard for exploring public sentiment and emerging topics around the **Panagbenga Festival**.  
Built with **React**, **Vite**, **Tailwind CSS**, and custom data visualizations.

The app focuses on:
- Visualising sentiment trends over time
- Comparing periods (e.g., pre‑festival vs. festival days)
- Highlighting emerging topics and themes
- Showing topic evolution and frequency

---

## Getting started

### 1. Install dependencies

Make sure you have **Node.js 18+** installed.

```bash
npm install
```

### 2. Run the development server

```bash
npm run dev
```

Then open the URL printed in the terminal (by default `http://localhost:5173/`).

### 3. Build for production

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## Project structure (high level)

- `src/App.jsx` – top‑level layout and routing between pages
- `src/pages/Overview.jsx` – overall sentiment and high‑level metrics
- `src/pages/Topics.jsx` – topic‑focused views and cards
- `src/pages/Trends.jsx` – time‑series / trend visualisations
- `src/components/` – reusable UI components (charts, cards, navbar, filters)
- `src/data/mockData.js` – mock data used for development and demos

---

## Scripts

- `npm run dev` – start Vite dev server
- `npm run build` – build for production
- `npm run preview` – preview the production build
- `npm run lint` – run ESLint checks (if configured)

---

## Notes

- The current dataset is mock/demo data and can be replaced with real festival data sources (e.g., social media, surveys, news).
- Styling is managed with Tailwind CSS; global styles live in `src/index.css` and `src/App.css`.
- For details on implementation constraints and goals, see `CONTEXT.md` and `frontENDRequirements.md`.
