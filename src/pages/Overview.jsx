import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { format } from "date-fns";
import { gsap } from "gsap";

import { FilterContext } from "../App.jsx";
import { dailySentiment, totalPosts, lastUpdated } from "../data/mockData.js";
import SentimentDonut from "../components/SentimentDonut.jsx";
import SentimentTrendChart from "../components/SentimentTrendChart.jsx";
import { useGsapFadeUp } from "../hooks/useGsapFadeUp.js";

const Overview = () => {
  const containerRef = useGsapFadeUp();
  const { filters } = useContext(FilterContext);
  const countRef = useRef(null);

  const [refreshTick, setRefreshTick] = useState(0);

  // Simulate near real-time refresh on the frontend.
  // In production, this tick would be driven by fresh data from the backend.
  useEffect(() => {
    const id = setInterval(() => {
      setRefreshTick((prev) => prev + 1);
    }, 30_000);
    return () => clearInterval(id);
  }, []);

  const filteredDailySentiment = useMemo(() => {
    if (filters.dateRange === "7d") return dailySentiment.slice(-7);
    if (filters.dateRange === "30d") return dailySentiment.slice(-30);
    return dailySentiment;
  }, [filters.dateRange, refreshTick]);

  const totalSentiment = useMemo(() => {
    return filteredDailySentiment.reduce(
      (acc, day) => {
        acc.positive += day.positive;
        acc.neutral += day.neutral;
        acc.negative += day.negative;
        return acc;
      },
      { positive: 0, neutral: 0, negative: 0 }
    );
  }, [filteredDailySentiment]);

  const totalPostsInRange = useMemo(
    () =>
      filteredDailySentiment.reduce(
        (sum, day) => sum + day.positive + day.neutral + day.negative,
        0
      ),
    [filteredDailySentiment]
  );

  const donutData = useMemo(
    () => {
      const base = [
        { name: "Positive", key: "positive", color: "#4CAF82" },
        { name: "Neutral", key: "neutral", color: "#F0A500" },
        { name: "Negative", key: "negative", color: "#E05252" },
      ];

      return base.map((item) => {
        const value = totalSentiment[item.key];
        // When a specific sentiment filter is active, keep the
        // selected category and zero out the others.
        if (
          filters.sentimentFilter !== "all" &&
          filters.sentimentFilter !== item.key
        ) {
          return { ...item, value: 0 };
        }
        return { ...item, value };
      });
    },
    [totalSentiment, filters.sentimentFilter]
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: totalPostsInRange,
        duration: 1.8,
        ease: "power2.out",
        onUpdate: () => {
          if (countRef.current) {
            countRef.current.textContent = Math.floor(
              obj.val
            ).toLocaleString();
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef, totalPostsInRange]);

  const activeRangeLabel =
    filters.dateRange === "7d"
      ? "Last 7 days"
      : filters.dateRange === "30d"
      ? "Last 30 days"
      : "All available data";

  return (
    <div ref={containerRef} className="space-y-8">
      <section className="fade-up">
        <div className="mb-6">
          <h1 className="font-display text-3xl md:text-4xl text-cream mb-2">
            FlowerFestAnalytics
          </h1>
          <p className="text-muted text-sm md:text-base max-w-2xl">
            A live snapshot of how people are feeling and talking about the
            Panagbenga Festival in Baguio City — from grand floats and street
            dancing to traffic, food, and tourism.
          </p>
        </div>
        <div className="grid gap-4 md:gap-6 md:grid-cols-3">
          <div className="bg-surface border border-border rounded-2xl p-6">
            <p className="text-sm text-muted mb-1">Total Posts Analyzed</p>
            <p
              ref={countRef}
              className="font-display text-3xl md:text-4xl text-cream"
            >
              {totalPostsInRange.toLocaleString()}
            </p>
          </div>
          <div className="bg-surface border border-border rounded-2xl p-6">
            <p className="text-sm text-muted mb-1">Last Updated</p>
            <p className="text-lg text-cream">
              {format(new Date(lastUpdated), "MMM dd, yyyy • h:mm a")}
            </p>
          </div>
          <div className="bg-surface border border-border rounded-2xl p-6">
            <p className="text-sm text-muted mb-1">Active Date Range</p>
            <p className="text-lg text-cream">{activeRangeLabel}</p>
          </div>
        </div>
      </section>

      <section className="fade-up">
        <h2 className="font-display text-2xl text-cream mb-2">
          Overall Sentiment Distribution
        </h2>
        <p className="text-sm text-muted mb-4 max-w-2xl">
          This donut shows how many posts about Panagbenga are generally
          positive, neutral, or negative. Positive posts celebrate floats,
          performances, and cool weather; neutral posts share information like
          schedules; negative posts often mention traffic, crowds, or
          inconveniences.
        </p>
        <div className="bg-surface border border-border rounded-2xl p-4 md:p-6">
          <SentimentDonut data={donutData} />
        </div>
      </section>

      <section className="fade-up">
        <h2 className="font-display text-2xl text-cream mb-2">
          Sentiment Over Time
        </h2>
        <p className="text-sm text-muted mb-4 max-w-2xl">
          Track how festival sentiment changes each day. Peaks often align with
          major events like the Grand Float Parade or Street Dancing, while
          dips can reflect heavy traffic or weather issues.
        </p>
        <div className="bg-surface border border-border rounded-2xl p-4 md:p-6">
          <SentimentTrendChart
            data={dailySentiment}
            dateRange={filters.dateRange}
            sentimentFilter={filters.sentimentFilter}
          />
        </div>
      </section>
    </div>
  );
};

export default Overview;

