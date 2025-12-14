import overviewJson from "../data/overview.json";
import type { OverviewData } from "../types/data";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const overview = overviewJson as OverviewData[];

const Analyze = () => {
  const current = overview[overview.length - 1];
  const recent6 = overview.slice(-6);

  const tooltipStyle = {
    background: "#fff",
    border: "1px solid #eee",
    borderRadius: 8,
    fontSize: 12,
  } as const;

  return (
    <section className="grid gap-6 md:grid-cols-2">
      {/* 銷售進度 */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h2 className="text-sm font-medium text-gray-700">銷售進度</h2>
            <p className="mt-1 text-3xl font-semibold text-gray-900">
              ${current.totalSales.toLocaleString()}
            </p>
            <p className="mt-1 text-sm text-green-600">
              本月 +{current.salesChangePercent}%
            </p>
          </div>

          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
            最近 6 個月
          </span>
        </div>

        {/* 折線圖 */}
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={recent6}
              margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="4 4"
                vertical={false}
                stroke="#eee"
              />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12, fill: "#9ca3af" }}
              />
              <YAxis
                width={48}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#9ca3af" }}
                tickMargin={14}
                tickFormatter={(value: number) => `${value / 1000}k`}
              />
              <Tooltip
                contentStyle={tooltipStyle}
                labelStyle={{ color: "#6b7280" }}
                formatter={(value: number) => [
                  `$${value.toLocaleString()}`,
                  "銷售額",
                ]}
              />
              <Line
                type="monotone"
                dataKey="totalSales"
                stroke="#999"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 本月新增客戶 */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h2 className="text-sm font-medium text-gray-700">本月新增客戶</h2>
            <p className="mt-1 text-3xl font-semibold text-gray-900">
              {current.newCustomers}
            </p>
            <p className="mt-1 text-sm text-green-600">
              本月 +{current.newCustomersChangePercent}%
            </p>
          </div>

          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
            最近 6 個月
          </span>
        </div>

        {/* 長條圖 */}
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={recent6}
              margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="4 4"
                vertical={false}
                stroke="#eee"
              />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12, fill: "#9ca3af" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#9ca3af" }}
                tickMargin={14}
              />
              <Tooltip
                contentStyle={tooltipStyle}
                labelStyle={{ color: "#6b7280" }}
                formatter={(value: number) => [value, "新增客戶"]}
              />
              <Bar
                dataKey="newCustomers"
                fill="#d1d5db"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default Analyze;
