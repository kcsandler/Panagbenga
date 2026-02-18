import { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { gsap } from "gsap";

import Navbar from "./components/Navbar.jsx";
import FilterBar from "./components/FilterBar.jsx";
import Overview from "./pages/Overview.jsx";
import Topics from "./pages/Topics.jsx";
import Trends from "./pages/Trends.jsx";

export const FilterContext = createContext({
  filters: {
    dateRange: "30d",
    sentimentFilter: "all",
    keyword: "",
  },
  setFilters: () => {},
});

const AppContent = () => {
  const location = useLocation();
  const [filters, setFilters] = useState({
    dateRange: "30d",
    sentimentFilter: "all",
    keyword: "",
  });

  useEffect(() => {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/daf99957-b629-4142-b58b-27d872752052', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: 'log_app_1',
        runId: 'pre-fix',
        hypothesisId: 'H1',
        location: 'src/App.jsx:28',
        message: 'AppContent gsap animation effect triggered',
        data: { pathname: location.pathname },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    // #endregion

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".page-wrapper",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    });

    return () => ctx.revert();
  }, [location.pathname]);

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      <div className="min-h-screen bg-bg text-cream font-sans">
        <Navbar />
        <FilterBar />
        <main className="pt-24 px-4 pb-10 md:px-8">
          <div className="page-wrapper max-w-6xl mx-auto">
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/topics" element={<Topics />} />
              <Route path="/trends" element={<Trends />} />
            </Routes>
          </div>
        </main>
      </div>
    </FilterContext.Provider>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
