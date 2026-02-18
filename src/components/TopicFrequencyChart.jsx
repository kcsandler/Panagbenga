import { useContext, useMemo, useState } from "react";
import { format } from "date-fns";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { topics } from "../data/mockData.js";
import { FilterContext } from "../App.jsx";

const TOPIC_COLORS = [
  "#F4623A",
  "#4CAF82",
  "#F0A500",
  "#E05252",
  "#4A9FF5",
  "#AF52DE",
];

const TopicFrequencyChart = () => {
  const { filters } = useContext(FilterContext);
  const [visible, setVisible] = useState(
    () =>
      topics.reduce((acc, topic) => {
        acc[topic.id] = true;
        return acc;
      }, {})
  );

  const allDates = topics[0]?.dailyCounts?.map((d) => d.date) || [];

  const dates = useMemo(() => {
    if (filters.dateRange === "7d") return allDates.slice(-7);
    if (filters.dateRange === "30d") return allDates.slice(-30);
    return allDates;
  }, [allDates, filters.dateRange]);

  const chartData = useMemo(
    () =>
      dates.map((date) => {
        const entry = { dateLabel: format(new Date(date), "MMM dd") };
        topics.forEach((topic) => {
          const match = topic.dailyCounts.find((d) => d.date === date);
          entry[topic.id] = match ? match.count : 0;
        });
        return entry;
      }),
    [dates]
  );

  const toggleTopic = (id) => {
    setVisible((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {topics.map((topic, index) => (
          <button
            key={topic.id}
            type="button"
            onClick={() => toggleTopic(topic.id)}
            className={`px-3 py-1 rounded-full text-xs border ${
              visible[topic.id]
                ? "bg-accent text-white border-accent"
                : "bg-surface-raised text-muted border-border"
            }`}
          >
            <span
              className="inline-block w-2 h-2 rounded-full mr-2"
              style={{ backgroundColor: TOPIC_COLORS[index % TOPIC_COLORS.length] }}
            />
            {topic.name}
          </button>
        ))}
      </div>
      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} stackOffset="none">
            <CartesianGrid strokeDasharray="3 3" stroke="#3D2840" />
            <XAxis dataKey="dateLabel" stroke="#A08898" />
            <YAxis stroke="#A08898" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#251820",
                borderColor: "#3D2840",
                borderRadius: 12,
                fontSize: 12,
              }}
            />
            <Legend />
            {topics.map((topic, index) =>
              visible[topic.id] ? (
                <Bar
                  key={topic.id}
                  dataKey={topic.id}
                  name={topic.name}
                  stackId="topics"
                  fill={TOPIC_COLORS[index % TOPIC_COLORS.length]}
                />
              ) : null
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TopicFrequencyChart;

