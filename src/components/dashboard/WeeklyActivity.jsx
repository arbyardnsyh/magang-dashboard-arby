// ─── Imports: Komponen Recharts ───────────────────────────────────────────────
import {
  BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine,
} from "recharts";

// ─── Data Statis Aktivitas Mingguan ───────────────────────────────────────────
const data = [
  { day: "Sat", withdraw: 480, deposit: 230 },
  { day: "Sun", withdraw: 330, deposit: 110 },
  { day: "Mon", withdraw: 320, deposit: 260 },
  { day: "Tue", withdraw: 470, deposit: 370 },
  { day: "Wed", withdraw: 150, deposit: 215 },
  { day: "Thu", withdraw: 390, deposit: 240 },
  { day: "Fri", withdraw: 380, deposit: 310 },
];

// ─── Sub-Komponen: Tooltip Kustom Chart ──────────────────────────────────────
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
        {/* Label Hari */}
        <p style={{ fontSize: "12px", color: "#718EBF", marginBottom: "6px", fontWeight: 500 }}>{label}</p>

        {/* Nilai per Kategori */}
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

// ─── Komponen Utama: WeeklyActivity ──────────────────────────────────────────
export default function WeeklyActivity() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>

      {/* Judul Section */}
      <h2 style={{
        fontFamily: "Inter, sans-serif",
        fontWeight: 700, fontSize: "18px",
        color: "#343C6A", margin: 0, marginBottom: "20px",
      }}>
        Weekly Activity
      </h2>

      {/* Card Chart */}
      <div style={{
        background: "#FFFFFF",
        borderRadius: "22px",
        padding: "24px 24px 16px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}>

        {/* ── Legend: Kanan Atas ───────────────────────────────────────────── */}
        <div style={{
          display: "flex", justifyContent: "flex-end",
          gap: "24px", marginBottom: "20px",
        }}>
          {/* Deposit */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#16DBCC" }} />
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#718EBF" }}>Diposit</span>
          </div>

          {/* Withdraw */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#FF82AC" }} />
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#718EBF" }}>Withdraw</span>
          </div>
        </div>

        {/* ── Bar Chart ────────────────────────────────────────────────────── */}
        <ResponsiveContainer width="100%" height={240}>
          <BarChart
            data={data}
            barSize={10}
            barGap={4}
            barCategoryGap="35%"
            margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
          >
            {/* Grid Horizontal — tanpa garis vertikal */}
            <CartesianGrid
              strokeDasharray=""
              vertical={false}
              stroke="#E8EDF4"
              strokeWidth={1}
            />

            {/* Sumbu X: Nama Hari */}
            <XAxis
              dataKey="day"
              axisLine={false} tickLine={false}
              tick={{ fontFamily: "Inter, sans-serif", fontSize: 13, fill: "#718EBF" }}
            />

            {/* Sumbu Y: Nilai Nominal */}
            <YAxis
              axisLine={false} tickLine={false}
              ticks={[0, 100, 200, 300, 400, 500]}
              tick={{ fontFamily: "Inter, sans-serif", fontSize: 13, fill: "#718EBF" }}
            />

            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0,0,0,0.02)" }} />

            {/* Bar Withdraw — biru tua (posisi kiri) */}
            <Bar dataKey="withdraw" name="Withdraw" fill="#1814F3" radius={[6, 6, 6, 6]} />

            {/* Bar Deposit — cyan (posisi kanan) */}
            <Bar dataKey="deposit"  name="Diposit"  fill="#16DBCC" radius={[6, 6, 6, 6]} />
          </BarChart>
        </ResponsiveContainer>

      </div>
    </div>
  );
}