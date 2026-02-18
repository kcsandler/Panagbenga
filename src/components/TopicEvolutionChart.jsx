import { useContext, useMemo } from "react";
import { format } from "date-fns";
import {
  LineChart,
  Line,
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

const TopicEvolutionChart = () => {
  const { filters } = useContext(FilterContext);
  const allDates = topics[0]?.dailyCounts?.map((d) => d.date) || [];

  const dates = useMemo(() => {
    if (filters.dateRange === "7d") return allDates.slice(-7);
    if (filters.dateRange === "30d") return allDates.slice(-30);
    return allDates;
  }, [allDates, filters.dateRange]);

  const chartData = useMemo(() => {
    return dates.map((date) => {
      const totalsForDate = topics.reduce((sum, topic) => {
        const match = topic.dailyCounts.find((d) => d.date === date);
        return sum + (match ? match.count : 0);
      }, 0);

      const entry = {
        dateLabel: format(new Date(date), "MMM dd"),
      };

      topics.forEach((topic) => {
        const match = topic.dailyCounts.find((d) => d.date === date);
        const count = match ? match.count : 0;
        const pct = totalsForDate ? (count / totalsForDate) * 100 : 0;
        entry[topic.id] = Number(pct.toFixed(1));
      });

      return entry;
    });
  }, [dates]);

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#3D2840" />
          <XAxis dataKey="dateLabel" stroke="#A08898" />
          <YAxis stroke="#A08898" domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
          <Tooltip
            formatter={(value) => [`${value}%`, "Share of posts"]}
            contentStyle={{
              backgroundColor: "#251820",
              borderColor: "#3D2840",
              borderRadius: 12,
              fontSize: 12,
            }}
          />
          <Legend />
          {topics.map((topic, index) => (
            <Line
              key={topic.id}
              type="monotone"
              dataKey={topic.id}
              name={topic.name}
              stroke={TOPIC_COLORS[index % TOPIC_COLORS.length]}
              dot
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopicEvolutionChart;

