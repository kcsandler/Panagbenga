import { useMemo, useState } from "react";
import SentimentDonut from "./SentimentDonut.jsx";
import { dailySentiment } from "../data/mockData.js";
import { useGsapFadeUp } from "../hooks/useGsapFadeUp.js";

const WEEKS = [
  { id: "w1", label: "Week 1", start: 0, end: 6 },
  { id: "w2", label: "Week 2", start: 7, end: 13 },
  { id: "w3", label: "Week 3", start: 14, end: 20 },
  { id: "w4", label: "Week 4", start: 21, end: 29 },
];

const computeSentimentForRange = (startIndex, endIndex) => {
  const slice = dailySentiment.slice(startIndex, endIndex + 1);
  return slice.reduce(
    (acc, day) => {
      acc.positive += day.positive;
      acc.neutral += day.neutral;
      acc.negative += day.negative;
      return acc;
    },
    { positive: 0, neutral: 0, negative: 0 }
  );
};

const PeriodComparison = () => {
  const containerRef = useGsapFadeUp();

  const [leftWeekId, setLeftWeekId] = useState(WEEKS[0].id);
  const [rightWeekId, setRightWeekId] = useState(WEEKS[1].id);

  const leftWeek = useMemo(
    () => WEEKS.find((w) => w.id === leftWeekId) ?? WEEKS[0],
    [leftWeekId]
  );
  const rightWeek = useMemo(
    () => WEEKS.find((w) => w.id === rightWeekId) ?? WEEKS[1],
    [rightWeekId]
  );

  const leftSentiment = computeSentimentForRange(leftWeek.start, leftWeek.end);
  const rightSentiment = computeSentimentForRange(
    rightWeek.start,
    rightWeek.end
  );

  const toDonutData = (sentiment) => [
    { name: "Positive", value: sentiment.positive, color: "#4CAF82" },
    { name: "Neutral", value: sentiment.neutral, color: "#F0A500" },
    { name: "Negative", value: sentiment.negative, color: "#E05252" },
  ];

  const leftTotal =
    leftSentiment.positive + leftSentiment.neutral + leftSentiment.negative;
  const rightTotal =
    rightSentiment.positive + rightSentiment.neutral + rightSentiment.negative;

  const diffFor = (key) => {
    const leftPct = leftTotal ? (leftSentiment[key] / leftTotal) * 100 : 0;
    const rightPct = rightTotal ? (rightSentiment[key] / rightTotal) * 100 : 0;
    const delta = rightPct - leftPct;
    return Number(delta.toFixed(1));
  };

  const rows = [
    { label: "Positive", key: "positive", color: "text-positive" },
    { label: "Neutral", key: "neutral", color: "text-neutral-sentiment" },
    { label: "Negative", key: "negative", color: "text-negative" },
  ];

  return (
    <div ref={containerRef} className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 bg-surface border border-border rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted">Period A</span>
            <div className="flex gap-2">
              {WEEKS.map((week) => (
                <button
                  key={week.id}
                  type="button"
                  onClick={() => setLeftWeekId(week.id)}
                  className={`px-3 py-1 rounded-lg text-xs border ${
                    week.id === leftWeek.id
                      ? "bg-accent text-white border-accent"
                      : "bg-transparent text-muted border-border"
                  }`}
                >
                  {week.label}
                </button>
              ))}
            </div>
          </div>
          <SentimentDonut data={toDonutData(leftSentiment)} />
          <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted">
            <span className="bg-primary/40 text-cream text-xs px-3 py-1 rounded-full border border-primary">
              Top keywords week A
            </span>
          </div>
        </div>

        <div className="flex-1 bg-surface border border-border rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted">Period B</span>
            <div className="flex gap-2">
              {WEEKS.map((week) => (
                <button
                  key={week.id}
                  type="button"
                  onClick={() => setRightWeekId(week.id)}
                  className={`px-3 py-1 rounded-lg text-xs border ${
                    week.id === rightWeek.id
                      ? "bg-accent text-white border-accent"
                      : "bg-transparent text-muted border-border"
                  }`}
                >
                  {week.label}
                </button>
              ))}
            </div>
          </div>
          <SentimentDonut data={toDonutData(rightSentiment)} />
          <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted">
            <span className="bg-primary/40 text-cream text-xs px-3 py-1 rounded-full border border-primary">
              Top keywords week B
            </span>
          </div>
        </div>
      </div>

      <div className="fade-up bg-surface border border-border rounded-2xl p-4">
        <h3 className="font-display text-lg text-cream mb-3">
          Sentiment Change Between Periods
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {rows.map((row) => {
            const delta = diffFor(row.key);
            const isUp = delta >= 0;
            return (
              <div key={row.key} className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isUp ? "bg-positive/20" : "bg-negative/20"
                  }`}
                >
                  <span
                    className={`text-sm ${
                      isUp ? "text-positive" : "text-negative"
                    }`}
                  >
                    {isUp ? "↑" : "↓"}
                  </span>
                </div>
                <div>
                  <p className={`text-sm font-medium ${row.color}`}>
                    {row.label}
                  </p>
                  <p className="text-xs text-muted">
                    {isUp ? "+" : ""}
                    {delta} points
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PeriodComparison;

