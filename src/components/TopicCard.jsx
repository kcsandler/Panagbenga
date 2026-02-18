import { useContext, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import SentimentDonut from "./SentimentDonut.jsx";
import { FilterContext } from "../App.jsx";

const TopicCard = ({ topic }) => {
  const { filters } = useContext(FilterContext);
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef(null);
  const expandedRef = useRef(null);

  useEffect(() => {
    const node = cardRef.current;
    if (!node) return;

    const handleEnter = () => {
      gsap.to(node, {
        scale: 1.03,
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

  useEffect(() => {
    if (expanded && expandedRef.current) {
      const content = expandedRef.current;
      const ctx = gsap.context(() => {
        gsap.fromTo(
          content,
          { height: 0, opacity: 0 },
          {
            height: "auto",
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
          }
        );
      }, expandedRef);

      return () => ctx.revert();
    }
  }, [expanded]);

  const totalPosts = topic.sentiment.positive + topic.sentiment.neutral + topic.sentiment.negative;
  const positiveWidth = (topic.sentiment.positive / totalPosts) * 100;
  const neutralWidth = (topic.sentiment.neutral / totalPosts) * 100;
  const negativeWidth = (topic.sentiment.negative / totalPosts) * 100;

  const keywordQuery = filters.keyword.trim().toLowerCase();
  const matchesFilter =
    !keywordQuery ||
    topic.name.toLowerCase().includes(keywordQuery) ||
    topic.keywords.some((k) => k.toLowerCase().includes(keywordQuery));

  if (!matchesFilter) {
    return null;
  }

  return (
    <div
      ref={cardRef}
      className="fade-up bg-surface border border-border rounded-2xl p-5 cursor-pointer"
      onClick={() => setExpanded((prev) => !prev)}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="font-display text-lg text-cream">{topic.name}</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {topic.keywords.slice(0, 5).map((kw) => (
              <span
                key={kw}
                className="bg-primary/40 text-cream text-xs px-3 py-1 rounded-full border border-primary"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs text-muted mb-1">Posts</span>
          <span className="text-sm bg-accent text-white px-2 py-1 rounded-full">
            {totalPosts.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between mb-2 text-xs text-muted">
          <span>Sentiment mix</span>
          <span>{expanded ? "Tap to collapse" : "Tap to expand"}</span>
        </div>
        <div className="w-full h-3 rounded-full overflow-hidden bg-surface-raised border border-border flex">
          <div
            className="h-full bg-positive"
            style={{ width: `${positiveWidth}%` }}
          />
          <div
            className="h-full bg-neutral-sentiment"
            style={{ width: `${neutralWidth}%` }}
          />
          <div
            className="h-full bg-negative"
            style={{ width: `${negativeWidth}%` }}
          />
        </div>
      </div>

      {expanded && (
        <div ref={expandedRef} className="mt-4 overflow-hidden">
          <SentimentDonut
            data={[
              {
                name: "Positive",
                value: topic.sentiment.positive,
                color: "#4CAF82",
              },
              {
                name: "Neutral",
                value: topic.sentiment.neutral,
                color: "#F0A500",
              },
              {
                name: "Negative",
                value: topic.sentiment.negative,
                color: "#E05252",
              },
            ]}
          />
        </div>
      )}
    </div>
  );
};

export default TopicCard;

