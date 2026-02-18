import { useRef, useEffect } from "react";
import { gsap } from "gsap";

const TopicModelCard = ({ topic }) => {
  const cardRef = useRef(null);
  const maxWeight = Math.max(...topic.termWeights.map((t) => t.weight), 0.01);

  useEffect(() => {
    const node = cardRef.current;
    if (!node) return;

    const handleEnter = () => {
      gsap.to(node, {
        scale: 1.02,
        duration: 0.2,
        ease: "power1.out",
      });
    };
    const handleLeave = () => {
      gsap.to(node, {
        scale: 1,
        duration: 0.2,
        ease: "power1.out",
      });
    };

    node.addEventListener("mouseenter", handleEnter);
    node.addEventListener("mouseleave", handleLeave);
    return () => {
      node.removeEventListener("mouseenter", handleEnter);
      node.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="fade-up bg-surface border border-border rounded-2xl p-5"
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <h3 className="font-display text-lg text-cream">{topic.label}</h3>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-muted">Coherence</span>
          <span className="text-sm bg-primary/40 text-cream px-2 py-1 rounded-full border border-primary">
            {(topic.coherence * 100).toFixed(0)}%
          </span>
        </div>
      </div>
      <p className="text-xs text-muted mb-3">
        {topic.docCount.toLocaleString()} posts
      </p>
      <div className="space-y-2">
        {topic.termWeights.map(({ term, weight }) => (
          <div key={term} className="flex items-center gap-2">
            <span className="text-sm text-cream w-24 shrink-0 truncate" title={term}>
              {term}
            </span>
            <div className="flex-1 h-2 rounded-full bg-surface-raised border border-border overflow-hidden">
              <div
                className="h-full rounded-full bg-accent transition-all duration-300"
                style={{ width: `${(weight / maxWeight) * 100}%` }}
              />
            </div>
            <span className="text-xs text-muted w-8 text-right">
              {(weight * 100).toFixed(0)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicModelCard;
