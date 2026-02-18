import { useContext, useMemo } from "react";
import { FilterContext } from "../App.jsx";
import { useGsapFadeUp } from "../hooks/useGsapFadeUp.js";
import { topics } from "../data/mockData.js";
import TopicCard from "../components/TopicCard.jsx";
import TopicFrequencyChart from "../components/TopicFrequencyChart.jsx";
import TopicModelSection from "../components/TopicModelSection.jsx";

const Topics = () => {
  const containerRef = useGsapFadeUp();
  const { filters } = useContext(FilterContext);

  const filteredTopics = useMemo(() => {
    const keywordQuery = filters.keyword.trim().toLowerCase();
    const sentimentFilter = filters.sentimentFilter;

    return topics.filter((topic) => {
      const matchesKeyword =
        !keywordQuery ||
        topic.name.toLowerCase().includes(keywordQuery) ||
        topic.keywords.some((kw) => kw.toLowerCase().includes(keywordQuery));

      if (!matchesKeyword) return false;

      if (sentimentFilter === "all") return true;

      const { positive, neutral, negative } = topic.sentiment;
      const dominant =
        positive >= neutral && positive >= negative
          ? "positive"
          : neutral >= positive && neutral >= negative
          ? "neutral"
          : "negative";

      return dominant === sentimentFilter;
    });
  }, [filters.keyword, filters.sentimentFilter]);

  return (
    <div ref={containerRef} className="space-y-8">
      <section className="fade-up">
        <h1 className="font-display text-3xl text-cream mb-2">
          Topic Clusters
        </h1>
        <p className="text-sm text-muted max-w-2xl">
          Topics group together related posts about specific parts of the
          Panagbenga experience — from parade highlights and street
          performances to local vendors, food, traffic, and tourism. Each card
          shows how people feel about that theme and which keywords are most
          common.
        </p>
      </section>

      <section className="fade-up">
        <div className="grid gap-5 md:gap-6 md:grid-cols-2">
          {filteredTopics.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>
      </section>

      <section className="fade-up">
        <TopicModelSection />
      </section>

      <section className="fade-up">
        <h2 className="font-display text-2xl text-cream mb-2">
          Topic Frequency Over Time
        </h2>
        <p className="text-sm text-muted mb-4 max-w-2xl">
          See how often each topic appears in daily posts. Spikes may indicate
          key events, viral photos, or issues that residents and visitors are
          reacting to.
        </p>
        <div className="bg-surface border border-border rounded-2xl p-4 md:p-6">
          <TopicFrequencyChart />
        </div>
      </section>
    </div>
  );
};

export default Topics;

