import { useContext, useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { topics } from "../data/mockData.js";
import { FilterContext } from "../App.jsx";

const EmergingTopics = () => {
  const containerRef = useRef(null);

  const { filters } = useContext(FilterContext);

  const topTopics = useMemo(() => {
    const dateRange = filters.dateRange;

    const computeGrowthForRange = (topic) => {
      const counts = topic.dailyCounts || [];
      if (!counts.length) return 0;

      const windowSize =
        dateRange === "7d"
          ? Math.min(7, counts.length)
          : dateRange === "30d"
          ? Math.min(30, counts.length)
          : counts.length;

      const recent = counts.slice(-windowSize);
      const recentAvg =
        recent.reduce((sum, d) => sum + d.count, 0) / recent.length;

      const overallAvg =
        counts.reduce((sum, d) => sum + d.count, 0) / counts.length;

      if (!overallAvg) return 0;

      const growth = ((recentAvg - overallAvg) / overallAvg) * 100;
      return Number(growth.toFixed(1));
    };

    return [...topics]
      .map((topic) => ({
        ...topic,
        computedGrowth: computeGrowthForRange(topic),
      }))
      .sort((a, b) => b.computedGrowth - a.computedGrowth)
      .slice(0, 3);
  }, [filters.dateRange]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".emerging-card", {
        scale: 1.02,
        duration: 2,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="space-y-3 fade-up">
      <h2 className="font-display text-2xl text-cream">🌸 Rising This Week</h2>
      <p className="text-sm text-muted max-w-2xl">
        Topics gaining the most momentum in recent posts. These clusters are
        becoming more visible in conversations and may signal opportunities or
        issues that need attention.
      </p>
      <div className="grid gap-4 md:grid-cols-3">
        {topTopics.map((topic) => (
          <div
            key={topic.id}
            className="emerging-card bg-surface border-2 border-accent rounded-2xl p-5"
            style={{ boxShadow: "0 0 20px rgba(244,98,58,0.2)" }}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display text-lg text-cream">
                {topic.name}
              </h3>
              <span className="bg-accent/20 text-accent rounded-full px-3 py-1 text-xs">
                📈 Trending
              </span>
            </div>
            <p className="text-sm text-muted mb-2">
              Growth:{" "}
              <span className="text-accent">
                {topic.computedGrowth ?? topic.growthRate}%
              </span>
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {topic.keywords.slice(0, 3).map((kw) => (
                <span
                  key={kw}
                  className="bg-primary/40 text-cream text-xs px-3 py-1 rounded-full border border-primary"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EmergingTopics;

