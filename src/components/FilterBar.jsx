import { useContext } from "react";
import { FilterContext } from "../App.jsx";

const FilterBar = () => {
  const { filters, setFilters } = useContext(FilterContext);

  const setDateRange = (value) => {
    setFilters((prev) => ({ ...prev, dateRange: value }));
  };

  const setSentimentFilter = (value) => {
    setFilters((prev) => ({ ...prev, sentimentFilter: value }));
  };

  const setKeyword = (value) => {
    setFilters((prev) => ({ ...prev, keyword: value }));
  };

  const dateButtonBase =
    "px-3 py-1 rounded-lg text-sm font-medium border border-border";

  const sentimentButtonBase =
    "px-3 py-1 rounded-lg text-xs md:text-sm font-medium border border-border";

  return (
    <div className="sticky top-16 z-20 bg-surface border-b border-border px-4 md:px-8 py-3">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-3 md:gap-4 items-start md:items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-muted">Date range</span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setDateRange("7d")}
              className={
                filters.dateRange === "7d"
                  ? `${dateButtonBase} bg-accent text-white`
                  : `${dateButtonBase} bg-transparent text-muted`
              }
            >
              7 Days
            </button>
            <button
              type="button"
              onClick={() => setDateRange("30d")}
              className={
                filters.dateRange === "30d"
                  ? `${dateButtonBase} bg-accent text-white`
                  : `${dateButtonBase} bg-transparent text-muted`
              }
            >
              30 Days
            </button>
            <button
              type="button"
              onClick={() => setDateRange("all")}
              className={
                filters.dateRange === "all"
                  ? `${dateButtonBase} bg-accent text-white`
                  : `${dateButtonBase} bg-transparent text-muted`
              }
            >
              All Time
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-muted">Sentiment</span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setSentimentFilter("all")}
              className={
                filters.sentimentFilter === "all"
                  ? `${sentimentButtonBase} bg-accent text-white`
                  : `${sentimentButtonBase} bg-transparent text-muted`
              }
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setSentimentFilter("positive")}
              className={
                filters.sentimentFilter === "positive"
                  ? `${sentimentButtonBase} bg-positive text-bg`
                  : `${sentimentButtonBase} bg-transparent text-muted`
              }
            >
              Positive
            </button>
            <button
              type="button"
              onClick={() => setSentimentFilter("neutral")}
              className={
                filters.sentimentFilter === "neutral"
                  ? `${sentimentButtonBase} bg-neutral-sentiment text-bg`
                  : `${sentimentButtonBase} bg-transparent text-muted`
              }
            >
              Neutral
            </button>
            <button
              type="button"
              onClick={() => setSentimentFilter("negative")}
              className={
                filters.sentimentFilter === "negative"
                  ? `${sentimentButtonBase} bg-negative text-bg`
                  : `${sentimentButtonBase} bg-transparent text-muted`
              }
            >
              Negative
            </button>
          </div>
        </div>

        <div className="flex-1 w-full md:w-auto">
          <input
            type="text"
            value={filters.keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search topics, streets, places..."
            className="w-full bg-surface-raised border border-border rounded-lg text-cream placeholder-muted px-3 py-1 text-sm outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;

