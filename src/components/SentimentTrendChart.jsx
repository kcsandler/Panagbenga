import { format } from "date-fns";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const SentimentTrendChart = ({
  data,
  dateRange,
  sentimentFilter = "all",
}) => {
  const limitedData =
    dateRange === "7d"
      ? data.slice(-7)
      : dateRange === "30d"
      ? data.slice(-30)
      : data;

  const mapped = limitedData.map((item) => ({
    ...item,
    dateLabel: format(new Date(item.date), "MMM dd"),
  }));

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={mapped}>
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
          {(sentimentFilter === "all" || sentimentFilter === "positive") && (
            <Area
              type="monotone"
              dataKey="positive"
              name="Positive"
              stroke="#4CAF82"
              fill="#4CAF82"
              fillOpacity={0.15}
            />
          )}
          {(sentimentFilter === "all" || sentimentFilter === "neutral") && (
            <Area
              type="monotone"
              dataKey="neutral"
              name="Neutral"
              stroke="#F0A500"
              fill="#F0A500"
              fillOpacity={0.15}
            />
          )}
          {(sentimentFilter === "all" || sentimentFilter === "negative") && (
            <Area
              type="monotone"
              dataKey="negative"
              name="Negative"
              stroke="#E05252"
              fill="#E05252"
              fillOpacity={0.15}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SentimentTrendChart;

