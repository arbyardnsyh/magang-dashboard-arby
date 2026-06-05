import {
  BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Sat", withdraw: 480, deposit: 230 },
  { day: "Sun", withdraw: 330, deposit: 110 },
  { day: "Mon", withdraw: 320, deposit: 260 },
  { day: "Tue", withdraw: 470, deposit: 370 },
  { day: "Wed", withdraw: 150, deposit: 215 },
  { day: "Thu", withdraw: 390, deposit: 240 },
  { day: "Fri", withdraw: 380, deposit: 310 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: "#FFFFFF",
        border: "1px solid #F0F0F0",
        borderRadius: "12px",
        padding: "10px 14px",
        fontFamily: "Inter, sans-serif",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      }}>
        <p style={{ fontSize: "12px", color: "#718EBF", marginBottom: "6px", fontWeight: 500 }}>{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ fontSize: "13px", color: p.fill, fontWeight: 600, marginBottom: "2px" }}>
            {p.name}: ${p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function WeeklyActivity() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>

      <h2 style={{
        fontFamily: "Inter, sans-serif",
        fontWeight: 700, fontSize: "18px",
        color: "#343C6A", margin: 0, marginBottom: "20px",
        flexShrink: 0,
      }}>
        Weekly Activity
      </h2>

      {/* Card — flex:1 agar tinggi ikut stretch dari grid */}
      <div style={{
        background: "#FFFFFF",
        borderRadius: "22px",
        padding: "24px 24px 16px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        minHeight: 0,
      }}>

        {/* Legend */}
        <div style={{
          display: "flex", justifyContent: "flex-end",
          gap: "24px", marginBottom: "20px",
          flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#16DBCC" }} />
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#718EBF" }}>Deposit</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#1814F3" }} />
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#718EBF" }}>Withdraw</span>
          </div>
        </div>

        {/* Chart — flex:1, tinggi ikut sisa ruang card */}
        <div style={{ flex: 1, minHeight: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              barSize={10}
              barGap={4}
              barCategoryGap="35%"
              margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray=""
                vertical={false}
                stroke="#E8EDF4"
                strokeWidth={1}
              />
              <XAxis
                dataKey="day"
                axisLine={false} tickLine={false}
                tick={{ fontFamily: "Inter, sans-serif", fontSize: 13, fill: "#718EBF" }}
              />
              <YAxis
                axisLine={false} tickLine={false}
                ticks={[0, 100, 200, 300, 400, 500]}
                tick={{ fontFamily: "Inter, sans-serif", fontSize: 13, fill: "#718EBF" }}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0,0,0,0.02)" }} />
              <Bar dataKey="withdraw" name="Withdraw" fill="#1814F3" radius={[6, 6, 6, 6]} />
              <Bar dataKey="deposit"  name="Deposit"  fill="#16DBCC" radius={[6, 6, 6, 6]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}