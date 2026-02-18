import { useContext, useMemo } from "react";
import { topicModelResults } from "../data/mockData.js";
import TopicModelCard from "./TopicModelCard.jsx";
import { FilterContext } from "../App.jsx";

const TopicModelSection = () => {
  const { filters } = useContext(FilterContext);

  const filteredModels = useMemo(() => {
    const keywordQuery = filters.keyword.trim().toLowerCase();
    if (!keywordQuery) return topicModelResults;

    return topicModelResults.filter((topic) => {
      const matchesLabel = topic.label.toLowerCase().includes(keywordQuery);
      const matchesTerm = topic.termWeights.some((t) =>
        t.term.toLowerCase().includes(keywordQuery)
      );
      return matchesLabel || matchesTerm;
    });
  }, [filters.keyword]);

  const avgCoherence =
    topicModelResults.length > 0
      ? (
          topicModelResults.reduce((s, t) => s + t.coherence, 0) /
          topicModelResults.length
        ).toFixed(2)
      : "—";

  return (
    <section className="fade-up space-y-6">
      <div>
        <h2 className="font-display text-2xl text-cream mb-2">
          Topic Model
        </h2>
        <p className="text-sm text-muted max-w-2xl mb-2">
          Unsupervised topic modelling (e.g. LDA) discovers latent themes from
          social posts. Each topic is represented by its top terms and weights.
          Coherence measures how interpretable the topic is; higher is better.
        </p>
        <div className="flex flex-wrap gap-4 text-sm">
          <span className="text-muted">
            Topics: <strong className="text-cream">{topicModelResults.length}</strong>
          </span>
          <span className="text-muted">
            Avg. coherence: <strong className="text-cream">{avgCoherence}</strong>
          </span>
        </div>
      </div>

      <div className="grid gap-5 md:gap-6 md:grid-cols-2">
        {filteredModels.map((topic) => (
          <TopicModelCard key={topic.id} topic={topic} />
        ))}
      </div>

      {filteredModels.length === 0 && (
        <p className="text-sm text-muted py-4">
          No topic models match the current keyword filter.
        </p>
      )}
    </section>
  );
};

export default TopicModelSection;
