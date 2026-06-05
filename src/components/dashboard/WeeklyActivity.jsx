// ─── Dependensi Eksternal ────────────────────────────────────────────────────
import {
  BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip,
  ResponsiveContainer,
} from "recharts";


// ─── Data Aktivitas Mingguan ─────────────────────────────────────────────────
const data = [
  { day: "Sat", withdraw: 480, deposit: 230 },
  { day: "Sun", withdraw: 330, deposit: 110 },
  { day: "Mon", withdraw: 320, deposit: 260 },
  { day: "Tue", withdraw: 470, deposit: 370 },
  { day: "Wed", withdraw: 150, deposit: 215 },
  { day: "Thu", withdraw: 390, deposit: 240 },
  { day: "Fri", withdraw: 380, deposit: 310 },
];


// ─── Konstanta Warna ─────────────────────────────────────────────────────────
const COLOR = {
  withdraw : "#1814F3",
  deposit  : "#16DBCC",
  label    : "#718EBF",
  heading  : "#343C6A",
  cardBg   : "#FFFFFF",
  grid     : "#E8EDF4",
  tooltipBg: "#FFFFFF",
  tooltipBd: "#F0F0F0",
};


// ─── Konstanta Tipografi ─────────────────────────────────────────────────────
const FONT = {
  family: "Inter, sans-serif",
  size   : { sm: "12px", md: "13px", lg: "18px" },
};


// ─── Konstanta Layout ────────────────────────────────────────────────────────
const CHART_TICKS  = [0, 100, 200, 300, 400, 500];
const BAR_RADIUS   = [6, 6, 6, 6];
const CHART_MARGIN = { top: 0, right: 0, left: -20, bottom: 0 };


// ─── Komponen: Custom Tooltip ─────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div style={{
      background   : COLOR.tooltipBg,
      border       : `1px solid ${COLOR.tooltipBd}`,
      borderRadius : "12px",
      padding      : "10px 14px",
      fontFamily   : FONT.family,
      boxShadow    : "0 4px 20px rgba(0,0,0,0.1)",
    }}>
      <p style={{
        fontSize     : FONT.size.sm,
        color        : COLOR.label,
        marginBottom : "6px",
        fontWeight   : 500,
      }}>
        {label}
      </p>
      {payload.map((p, i) => (
        <p key={i} style={{
          fontSize     : FONT.size.md,
          color        : p.fill,
          fontWeight   : 600,
          marginBottom : "2px",
        }}>
          {p.name}: ${p.value}
        </p>
      ))}
    </div>
  );
};


// ─── Komponen: Legend Item ───────────────────────────────────────────────────
const LegendItem = ({ color, label }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
    <div style={{
      width        : "12px",
      height       : "12px",
      borderRadius : "50%",
      background   : color,
      flexShrink   : 0,
    }} />
    <span style={{
      fontFamily : FONT.family,
      fontSize   : FONT.size.md,
      color      : COLOR.label,
    }}>
      {label}
    </span>
  </div>
);


// ─── Komponen Utama: Weekly Activity ─────────────────────────────────────────
export default function WeeklyActivity() {
  return (
    // ✅ FIX: Hapus height:"100%" — biarkan tinggi ditentukan oleh konten.
    // Ini mencegah card terpotong di mobile saat parent tidak punya tinggi eksplisit.
    <div style={{ display: "flex", flexDirection: "column" }}>

      {/* ── Judul Section ── */}
      <h2 style={{
        fontFamily   : FONT.family,
        fontWeight   : 700,
        fontSize     : FONT.size.lg,
        color        : COLOR.heading,
        margin       : 0,
        marginBottom : "20px",
      }}>
        Weekly Activity
      </h2>

      {/* ── Card Wrapper ── */}
      {/* ✅ FIX: Ganti flex:1 ke width:"100%", dan gunakan paddingBottom agar
               konten tidak terpotong. Chart diberi tinggi eksplisit (px) bukan
               height:"100%" supaya ResponsiveContainer punya referensi yang valid. */}
      <div style={{
        background    : COLOR.cardBg,
        borderRadius  : "22px",
        padding       : "24px 24px 20px",
        boxShadow     : "0 4px 20px rgba(0,0,0,0.05)",
        width         : "100%",
        boxSizing     : "border-box",
      }}>

        {/* ── Legend ── */}
        <div style={{
          display        : "flex",
          justifyContent : "flex-end",
          gap            : "24px",
          marginBottom   : "20px",
        }}>
          <LegendItem color={COLOR.deposit}  label="Deposit"  />
          <LegendItem color={COLOR.withdraw} label="Withdraw" />
        </div>

        {/* ── Area Chart ── */}
        {/* ✅ FIX: Beri tinggi tetap dalam px. ResponsiveContainer WAJIB punya
                 parent dengan tinggi eksplisit — bukan "100%" yang bergantung
                 pada flex parent yang tidak punya tinggi sendiri. */}
        <div style={{ width: "100%", height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              barSize={10}
              barGap={4}
              barCategoryGap="35%"
              margin={CHART_MARGIN}
            >
              <CartesianGrid
                strokeDasharray=""
                vertical={false}
                stroke={COLOR.grid}
                strokeWidth={1}
              />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fontFamily: FONT.family, fontSize: 13, fill: COLOR.label }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                ticks={CHART_TICKS}
                tick={{ fontFamily: FONT.family, fontSize: 13, fill: COLOR.label }}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "rgba(0,0,0,0.02)" }}
              />
              <Bar
                dataKey="withdraw"
                name="Withdraw"
                fill={COLOR.withdraw}
                radius={BAR_RADIUS}
              />
              <Bar
                dataKey="deposit"
                name="Deposit"
                fill={COLOR.deposit}
                radius={BAR_RADIUS}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}