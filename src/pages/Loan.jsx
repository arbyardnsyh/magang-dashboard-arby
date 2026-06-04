// ─── Imports: Komponen & Utilitas ────────────────────────────────────────────
import LoanTable from "../components/loan/LoanTable";

// ─── Lazy Import: Semua Ikon Loan dari Aset ───────────────────────────────────
const loanIconModules = import.meta.glob(
  "/src/assets/icons/loans/**/*.{svg,png,jpg,jpeg,webp}",
  { eager: true }
);

// ─── Helper: Resolusi Ikon Berdasarkan Nama File ──────────────────────────────
function getLoanIcon(filename) {
  const entry = Object.entries(loanIconModules).find(([p]) => p.endsWith("/" + filename));
  return entry ? entry[1].default : null;
}

// ─── Konstanta: Nama File Ikon per Kategori ───────────────────────────────────
const STAT_ICONS = {
  personal:  "personal-icon.svg",
  corporate: "corporate-icon.svg",
  business:  "Business-icon.svg",
  custom:    "custom-icon.svg",
};

// ─── Data Statis: Kartu Statistik Pinjaman ────────────────────────────────────
const loanStats = [
  { key: "personal",  label: "Personal Loans",  value: "$50,000",      iconBg: "#E7EDFF", fbColor: "#1814F3", fbShape: "person"    },
  { key: "corporate", label: "Corporate Loans", value: "$100,000",     iconBg: "#FFF5D9", fbColor: "#FFBB38", fbShape: "briefcase" },
  { key: "business",  label: "Business Loans",  value: "$500,000",     iconBg: "#FFE0EB", fbColor: "#FF4B4A", fbShape: "chart"     },
  { key: "custom",    label: "Custom Loans",    value: "Choose Money", iconBg: "#DCFAF8", fbColor: "#16DBCC", fbShape: "wrench"    },
];

// ─── Sub-Komponen: Ikon Fallback SVG ─────────────────────────────────────────
function FallbackIcon({ shape, color }) {
  if (shape === "person") return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="12" r="6" fill={color}/>
      <path d="M6 30c0-6 5.4-10.5 12-10.5S30 24 30 30" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    </svg>
  );
  if (shape === "briefcase") return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <rect x="3" y="11" width="30" height="20" rx="3" fill={color}/>
      <path d="M24 11V9a3 3 0 00-3-3h-6a3 3 0 00-3 3v2" stroke="#fff" strokeWidth="2" fill="none"/>
      <line x1="3" y1="20" x2="33" y2="20" stroke="#fff" strokeWidth="2"/>
    </svg>
  );
  if (shape === "chart") return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <rect x="4"  y="20" width="7" height="13" rx="1.5" fill={color}/>
      <rect x="15" y="13" width="7" height="20" rx="1.5" fill={color}/>
      <rect x="26" y="6"  width="7" height="27" rx="1.5" fill={color}/>
    </svg>
  );
  // Default: ikon kunci (custom)
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <path d="M22 6a8 8 0 00-7.94 9.12L4.93 24.25a3 3 0 004.24 4.24l9.13-9.13A8 8 0 0022 6z" fill={color}/>
      <circle cx="9.5" cy="26.5" r="2" fill="#fff"/>
    </svg>
  );
}

// ─── Sub-Komponen: Kartu Statistik Pinjaman ───────────────────────────────────
function StatCard({ stat }) {
  const iconSrc = getLoanIcon(STAT_ICONS[stat.key]);
  return (
    <div style={{
      background: "#FFFFFF",
      borderRadius: "20px",
      padding: "22px 20px",
      boxShadow: "0 4px 30px rgba(113,142,191,0.10)",
      display: "flex", alignItems: "center", gap: "16px",
      fontFamily: "'Inter','Segoe UI',Arial,sans-serif",
    }}>
      {/* Lingkaran Ikon */}
      <div style={{
        width: 56, height: 56, borderRadius: "50%",
        background: stat.iconBg,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>
        {iconSrc
          ? <img src={iconSrc} alt="" width={32} height={32} style={{ objectFit: "contain" }} />
          : <FallbackIcon shape={stat.fbShape} color={stat.fbColor} />
        }
      </div>

      {/* Nilai Nominal */}
      <div>
        <p style={{
          margin: "4px 0 0",
          fontSize: stat.key === "custom" ? "15px" : "21px",
          fontWeight: 700,
          color: "#343C6A",
        }}>
          {stat.value}
        </p>
      </div>
    </div>
  );
}

// ─── Komponen Utama: Loan ─────────────────────────────────────────────────────
export default function Loan() {
  return (
    <div style={{
      display: "flex", flexDirection: "column", gap: "28px",
      fontFamily: "'Inter','Segoe UI',Arial,sans-serif",
    }}>
      {/* ── Stylesheet Responsif Grid Stat Cards ─────────────────────────── */}
      <style>{`
        .loan-stat-grid { grid-template-columns: repeat(4, 1fr); }

        @media (max-width: 1100px) and (min-width: 681px) {
          .loan-stat-grid { grid-template-columns: repeat(4, 1fr) !important; }
        }
        @media (max-width: 680px) {
          .loan-stat-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

      {/* ── Stat Cards ── */}
      <div className="loan-stat-grid" style={{ display: "grid", gap: "20px" }}>
        {loanStats.map((s) => <StatCard key={s.key} stat={s} />)}
      </div>

      {/* ── Tabel Pinjaman Aktif ── */}
      <LoanTable />
    </div>
  );
}