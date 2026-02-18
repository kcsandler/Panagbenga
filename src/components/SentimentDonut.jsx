import { useEffect, useRef } from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { gsap } from "gsap";

const SentimentDonut = ({ data }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const total = data.reduce((sum, d) => sum + d.value, 0) || 1;

  const renderTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      const percent = ((item.value / total) * 100).toFixed(1);
      return (
        <div className="bg-surface-raised border border-border rounded-xl px-3 py-2 text-xs text-cream">
          <div className="font-medium">{item.name}</div>
          <div>{item.value.toLocaleString()} posts</div>
          <div className="text-muted">{percent}% of total</div>
        </div>
      );
    }
    return null;
  };

  const renderLegend = ({ payload }) => {
    if (!payload) return null;
    return (
      <div className="flex flex-wrap justify-center gap-3 mt-3 text-xs">
        {payload.map((entry) => {
          const item = entry.payload;
          const percent = ((item.value / total) * 100).toFixed(1);
          return (
            <div key={entry.value} className="flex items-center gap-2">
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-muted">
                {entry.value} · {percent}%
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div ref={containerRef} className="w-full h-64 md:h-72">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={renderTooltip} />
          <Legend content={renderLegend} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SentimentDonut;

