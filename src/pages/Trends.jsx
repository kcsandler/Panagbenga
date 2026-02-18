import { useGsapFadeUp } from "../hooks/useGsapFadeUp.js";
import TopicEvolutionChart from "../components/TopicEvolutionChart.jsx";
import PeriodComparison from "../components/PeriodComparison.jsx";
import EmergingTopics from "../components/EmergingTopics.jsx";

const Trends = () => {
  const containerRef = useGsapFadeUp();

  return (
    <div ref={containerRef} className="space-y-8">
      <section className="fade-up">
        <h1 className="font-display text-3xl text-cream mb-2">
          Trends &amp; Evolution
        </h1>
        <p className="text-sm text-muted max-w-2xl">
          Explore how topics rise and fall across the festival weeks, compare
          sentiment between periods, and spot which themes are starting to gain
          more attention in recent posts.
        </p>
      </section>

      <section className="fade-up">
        <h2 className="font-display text-2xl text-cream mb-2">
          Topic Evolution Over Time
        </h2>
        <p className="text-sm text-muted mb-4 max-w-2xl">
          Each line shows the share of posts for a topic on a given day,
          helping you see which themes dominate the conversation at different
          moments of the festival calendar.
        </p>
        <div className="bg-surface border border-border rounded-2xl p-4 md:p-6">
          <TopicEvolutionChart />
        </div>
      </section>

      <section className="fade-up">
        <h2 className="font-display text-2xl text-cream mb-2">
          Compare Two Periods
        </h2>
        <p className="text-sm text-muted mb-4 max-w-2xl">
          Look at how the balance of positive, neutral, and negative posts
          shifts between festival weeks. This is useful for evaluating the
          impact of interventions, changes in logistics, or major announcements.
        </p>
        <PeriodComparison />
      </section>

      <EmergingTopics />
    </div>
  );
};

export default Trends;

