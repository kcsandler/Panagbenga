# FlowerFestAnalytics — Project Context

> ⚠️ Read this file before making ANY changes to the codebase.
> This is the single source of truth for the project.

---

## 🎓 Project Overview

**Project Name:** FlowerFestAnalytics
**Type:** College Thesis — Public Sentiment & Topic Trends Web Dashboard
**Subject:** Analyzing social media sentiment about the Panagbenga Festival (Baguio City, Philippines)
**Audience:** General public / students / citizens — no login required

The dashboard displays sentiment analysis results and topic trends from social media posts about
the Panagbenga (Blossom) Festival. It is a read-only public view — no user authentication,
no data submission.

---

## ⚙️ Tech Stack

| Tool | Purpose |
|---|---|
| React (Vite, plain JavaScript) | Frontend framework |
| React Router DOM v6 | Page navigation |
| Recharts | All data visualizations |
| GSAP (GreenSock) | All animations and transitions |
| date-fns | Date formatting and manipulation |
| Tailwind CSS v3 | Styling — utility-first CSS |

> Do NOT introduce TypeScript, Next.js, Bootstrap, Framer Motion, or plain CSS files unless explicitly asked.
> Do NOT use arbitrary Tailwind values like `bg-[#hex]` — use the custom theme tokens defined below.
> Do NOT use CSS transitions or keyframe animations — use GSAP for everything animated.

---

## 🗂️ File Structure

```
src/
├── components/
│   ├── Navbar.jsx               # Top navigation bar
│   ├── FilterBar.jsx            # Global filter controls (date, sentiment, keyword)
│   ├── SentimentDonut.jsx       # Reusable donut/pie chart for sentiment
│   ├── SentimentTrendChart.jsx  # Multi-line area chart over time
│   ├── TopicCard.jsx            # Individual topic card with expandable detail
│   ├── TopicFrequencyChart.jsx  # Stacked bar chart of topic post counts
│   ├── TopicEvolutionChart.jsx  # Line chart of topic prominence over time
│   ├── PeriodComparison.jsx     # Side-by-side period comparison panels
│   └── EmergingTopics.jsx       # "Rising This Week" trending topics section
├── pages/
│   ├── Overview.jsx             # Route: /
│   ├── Topics.jsx               # Route: /topics
│   └── Trends.jsx               # Route: /trends
├── data/
│   └── mockData.js              # All mock data (replace with API calls later)
├── hooks/
│   └── useGsapFadeUp.js         # Reusable GSAP fade-up animation hook
├── App.jsx                      # Router setup + global filter state + context
├── index.css                    # Tailwind directives only (@tailwind base/components/utilities)
└── main.jsx                     # Vite entry point
```

---

## 🎨 Design System

### Fonts (loaded via Google Fonts in index.html)
- **Headings:** DM Serif Display
- **Body/UI:** DM Sans

Add this to `index.html` inside `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet">
```

### Tailwind Custom Theme (tailwind.config.js)

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#1A1015",
        surface: "#251820",
        "surface-raised": "#2F2030",
        primary: "#4A1560",
        accent: "#F4623A",
        positive: "#4CAF82",
        "neutral-sentiment": "#F0A500",
        negative: "#E05252",
        cream: "#FBF5EC",
        muted: "#A08898",
        border: "#3D2840",
      },
      fontFamily: {
        display: ['"DM Serif Display"', "serif"],
        sans: ['"DM Sans"', "sans-serif"],
      },
    },
  },
  plugins: [],
}
```

### Color Reference (always use Tailwind tokens, never raw hex in JSX)

| Token | Hex | Usage |
|---|---|---|
| `bg-bg` | #1A1015 | Main page background |
| `bg-surface` | #251820 | Cards, panels |
| `bg-surface-raised` | #2F2030 | Hover states, elevated elements |
| `bg-primary` | #4A1560 | Deep violet — brand color |
| `bg-accent` | #F4623A | Coral/orange — highlights, active states |
| `text-positive` / `bg-positive` | #4CAF82 | Positive sentiment |
| `text-neutral-sentiment` / `bg-neutral-sentiment` | #F0A500 | Neutral sentiment |
| `text-negative` / `bg-negative` | #E05252 | Negative sentiment |
| `text-cream` | #FBF5EC | Primary text |
| `text-muted` | #A08898 | Secondary/muted text |
| `border-border` | #3D2840 | Subtle borders |

### Sentiment Colors for Recharts (use raw hex only inside Recharts props)
- Positive → `#4CAF82`
- Neutral → `#F0A500`
- Negative → `#E05252`

---

## 📄 Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | Overview.jsx | Hero stats, sentiment donut, sentiment trend chart |
| `/topics` | Topics.jsx | Topic cards grid, topic frequency chart |
| `/trends` | Trends.jsx | Topic evolution, period comparison, emerging topics |

---

## 🔧 Global Filter State

Managed in `App.jsx` using `useState` and passed via React Context (`FilterContext`).

```js
{
  dateRange: "30d",         // "7d" | "30d" | "all"
  sentimentFilter: "all",   // "all" | "positive" | "neutral" | "negative"
  keyword: ""               // free text search string
}
```

All pages and charts must respond to changes in this filter state.

---

## 🎬 GSAP Animation Rules

### Installation
```bash
npm install gsap
```

### Import pattern (always import this way)
```js
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
```

### Always use useRef + useEffect for GSAP in React
```js
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

const MyComponent = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".fade-up", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
      });
    }, containerRef); // scope to containerRef — critical for cleanup

    return () => ctx.revert(); // always clean up on unmount
  }, []);

  return (
    <div ref={containerRef}>
      <div className="fade-up">...</div>
    </div>
  );
};
```

### Reusable Hook (hooks/useGsapFadeUp.js)
Create this hook and use it across all pages instead of repeating boilerplate:
```js
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Animates children with class ".fade-up" inside the returned ref.
 * @param {object} options - GSAP tween options override
 */
export function useGsapFadeUp(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".fade-up", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          once: true,
        },
        ...options,
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return ref;
}
```

### Standard Animation Presets (use these consistently)

| Animation | GSAP Config | When to use |
|---|---|---|
| Fade up (page load) | `{ y: 40, opacity: 0, duration: 0.7, ease: "power3.out" }` | Hero stats, headings |
| Staggered cards | `{ y: 30, opacity: 0, stagger: 0.12, duration: 0.6, ease: "power2.out" }` | Topic cards, stat cards |
| Scroll reveal | Use ScrollTrigger with `start: "top 85%", once: true` | Charts, comparison panels |
| Hover scale | `gsap.to(el, { scale: 1.03, duration: 0.2, ease: "power1.out" })` | Cards on mouseenter |
| Number count-up | `gsap.from(obj, { val: 0, duration: 1.5, ease: "power2.out", onUpdate })` | Stat counters |

### Count-Up Animation for Stat Numbers
```js
useEffect(() => {
  const ctx = gsap.context(() => {
    const obj = { val: 0 };
    gsap.to(obj, {
      val: totalPosts,
      duration: 1.8,
      ease: "power2.out",
      onUpdate: () => {
        if (countRef.current) {
          countRef.current.textContent = Math.floor(obj.val).toLocaleString();
        }
      },
    });
  }, containerRef);
  return () => ctx.revert();
}, [totalPosts]);
```

### Page Transition (App.jsx)
On route change, animate the page wrapper out then in:
```js
// Wrap page content in a div with ref, then on location change:
gsap.fromTo(".page-wrapper",
  { opacity: 0, y: 20 },
  { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
);
```

### Rules for GSAP usage
1. **Always use `gsap.context()` with a ref** — this scopes selectors and prevents leaks
2. **Always return `ctx.revert()`** from the useEffect cleanup
3. **Never animate with CSS transitions** — use GSAP for everything that moves
4. **Use `once: true` in ScrollTrigger** — elements should animate in only once, not repeatedly
5. **Register plugins at the top of the file** — `gsap.registerPlugin(ScrollTrigger)`
6. **Use `.fade-up` class names** as GSAP selectors on elements you want to animate — keep it consistent

---

## 📊 Data Shape (mockData.js)

### dailySentiment
```js
[
  { date: "2025-01-19", positive: 80, neutral: 45, negative: 25 },
  // ... 30 entries total
]
```

### topics
```js
[
  {
    id: "float-parade",
    name: "Float Parade",
    keywords: ["floats", "flowers", "parade route", "grand float", "Burnham"],
    sentiment: { positive: 320, neutral: 110, negative: 40 },
    dailyCounts: [{ date: "2025-01-19", count: 18 }, ...]
  },
  // 6 topics total:
  // "Float Parade", "Street Dancing", "Flower Vendors",
  // "Festival Food", "Traffic & Crowds", "Hotel & Tourism"
]
```

### Other fields
```js
totalPosts: 4500
lastUpdated: <current ISO timestamp>
```

---

## ✅ Functional Requirements Checklist

| ID | Requirement | Component |
|---|---|---|
| FR-PV-01 | Overall sentiment distribution | SentimentDonut.jsx |
| FR-PV-02 | Sentiment trends over time | SentimentTrendChart.jsx |
| FR-PV-03 | Auto-refresh visualizations | App.jsx (useEffect interval) |
| FR-PV-04 | Total posts count display | Overview.jsx hero section |
| FR-PV-05 | Detected topic clusters | Topics.jsx / TopicCard.jsx |
| FR-PV-06 | Top keywords per topic | TopicCard.jsx |
| FR-PV-07 | Topic frequency over time | TopicFrequencyChart.jsx |
| FR-PV-08 | Topic sentiment on click | TopicCard.jsx (expanded state) |
| FR-PV-09 | Topic prominence over time | TopicEvolutionChart.jsx |
| FR-PV-10 | Compare two time periods | PeriodComparison.jsx |
| FR-PV-11 | Emerging/trending topics | EmergingTopics.jsx |
| FR-PV-12 | Filter by date range | FilterBar.jsx |
| FR-PV-13 | Filter by sentiment | FilterBar.jsx |
| FR-PV-14 | Filter by keyword | FilterBar.jsx |

---

## 🚫 Hard Rules (never break these)

1. **No PII** — Never display usernames, profile photos, or any user-identifiable data (NFR-PV-06, NFR-PV-07)
2. **No TypeScript** — Plain JavaScript only
3. **No Bootstrap, Framer Motion, or plain CSS files** — Tailwind + GSAP only
4. **No arbitrary Tailwind values** — Use only tokens defined in `tailwind.config.js`
5. **No new libraries** without checking this file first
6. **Recharts only** for charts — do not mix in Chart.js or D3
7. **Recharts color props** use raw hex strings (not Tailwind classes) — only exception to rule 4
8. **GSAP only** for animations — no CSS transitions, no keyframes, no Framer Motion
9. **Responsive design** — all layouts must work on mobile; use Tailwind's `sm:` / `md:` / `lg:` prefixes
10. **Components stay focused** — keep each file under ~150 lines; split if longer

---

## 📐 Common Tailwind Patterns (use these consistently across all components)

```jsx
// Page wrapper
<div className="min-h-screen bg-bg text-cream font-sans">

// Card / panel
<div className="bg-surface border border-border rounded-2xl p-6">

// Elevated card
<div className="bg-surface-raised rounded-2xl p-6">

// Section heading
<h2 className="font-display text-2xl text-cream mb-4">

// Muted label
<p className="text-sm text-muted">

// Accent button (active/selected)
<button className="bg-accent text-white px-4 py-2 rounded-lg font-medium">

// Ghost button (inactive)
<button className="border border-border text-muted px-4 py-2 rounded-lg">

// Sentiment badge — positive
<span className="bg-positive/20 text-positive text-xs px-2 py-1 rounded-full">

// Sentiment badge — neutral
<span className="bg-neutral-sentiment/20 text-neutral-sentiment text-xs px-2 py-1 rounded-full">

// Sentiment badge — negative
<span className="bg-negative/20 text-negative text-xs px-2 py-1 rounded-full">

// Keyword chip
<span className="bg-primary/40 text-cream text-xs px-3 py-1 rounded-full border border-primary">
```

---

## 🔄 Future: Replacing Mock Data with Real API

When the backend is ready, replace `import { ... } from '../data/mockData.js'`
with a `useEffect` + `fetch` call to the real endpoint.

```js
useEffect(() => {
  fetch('/api/sentiment/daily')
    .then(res => res.json())
    .then(data => setDailySentiment(data));
}, [filters]);
```

---

## 💬 How to Use This File with Cursor

When starting a new Composer session:
> "Read CONTEXT.md first, then [your request]"

When the agent drifts or uses wrong libraries:
> "Check CONTEXT.md — you used Framer Motion / CSS transitions / hardcoded hex values. Fix to match the rules there."

When animations look wrong:
> "Check the GSAP Animation Rules section in CONTEXT.md and make sure you're using gsap.context() with cleanup."
