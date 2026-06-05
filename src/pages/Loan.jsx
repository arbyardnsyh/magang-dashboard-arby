// ─── Imports ──────────────────────────────────────────────────────────────────
import { useRef } from "react";
import LoanTable from "../components/loan/LoanTable";

// ─── Lazy Import: Semua Ikon Loan ─────────────────────────────────────────────
const loanIconModules = import.meta.glob(
  "/src/assets/icons/loans/**/*.{svg,png,jpg,jpeg,webp}",
  { eager: true }
);

function getLoanIcon(filename) {
  const entry = Object.entries(loanIconModules).find(([p]) => p.endsWith("/" + filename));
  return entry ? entry[1].default : null;
}

const STAT_ICONS = {
  personal:  "personal-icon.svg",
  corporate: "corporate-icon.svg",
  business:  "Business-icon.svg",
  custom:    "custom-icon.svg",
};

const loanStats = [
  { key: "personal",  label: "Personal Loans",  value: "$50,000",      iconBg: "#E7EDFF", fbColor: "#1814F3", fbShape: "person"    },
  { key: "corporate", label: "Corporate Loans", value: "$100,000",     iconBg: "#FFF5D9", fbColor: "#FFBB38", fbShape: "briefcase" },
  { key: "business",  label: "Business Loans",  value: "$500,000",     iconBg: "#FFE0EB", fbColor: "#FF4B4A", fbShape: "chart"     },
  { key: "custom",    label: "Custom Loans",    value: "Choose Money", iconBg: "#DCFAF8", fbColor: "#16DBCC", fbShape: "wrench"    },
];

// ─── Injected CSS ─────────────────────────────────────────────────────────────
const injectedStyles = `
  /* Desktop (≥ 1024px): 4 kolom grid */
  .loan-stat-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }

  .loan-stat-card-wrap {
    min-width: 0;
  }

  /* Tablet (768px–1023px): 4 kolom tapi lebih compact */
  @media (min-width: 768px) and (max-width: 1023px) {
    .loan-stat-row {
      gap: 12px;
    }
    .loan-stat-card  { padding: 14px 10px !important; gap: 10px !important; }
    .loan-icon-wrap  { width: 38px !important; height: 38px !important; }
    .loan-icon-img   { width: 20px !important; height: 20px !important; }
    .loan-label      { font-size: 9px !important; }
    .loan-value      { font-size: 13px !important; }
    .loan-value-sm   { font-size: 9px !important; }
  }

  /* Mobile (≤ 767px): snap scroll horizontal */
  @media (max-width: 767px) {
    .loan-stat-row {
      display: flex;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
      padding-bottom: 8px;
      padding-right: 16px;
      gap: 14px;
      grid-template-columns: unset;
    }
    .loan-stat-row::-webkit-scrollbar { display: none; }
    .loan-stat-card-wrap {
      flex: 0 0 80%;
      scroll-snap-align: start;
    }
  }
`;

// ─── Sub-Komponen: FallbackIcon ───────────────────────────────────────────────
function FallbackIcon({ shape, color }) {
  if (shape === "person") return (
    <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="12" r="6" fill={color}/>
      <path d="M6 30c0-6 5.4-10.5 12-10.5S30 24 30 30" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    </svg>
  );
  if (shape === "briefcase") return (
    <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
      <rect x="3" y="11" width="30" height="20" rx="3" fill={color}/>
      <path d="M24 11V9a3 3 0 00-3-3h-6a3 3 0 00-3 3v2" stroke="#fff" strokeWidth="2" fill="none"/>
      <line x1="3" y1="20" x2="33" y2="20" stroke="#fff" strokeWidth="2"/>
    </svg>
  );
  if (shape === "chart") return (
    <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
      <rect x="4"  y="20" width="7" height="13" rx="1.5" fill={color}/>
      <rect x="15" y="13" width="7" height="20" rx="1.5" fill={color}/>
      <rect x="26" y="6"  width="7" height="27" rx="1.5" fill={color}/>
    </svg>
  );
  return (
    <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
      <path d="M22 6a8 8 0 00-7.94 9.12L4.93 24.25a3 3 0 004.24 4.24l9.13-9.13A8 8 0 0022 6z" fill={color}/>
      <circle cx="9.5" cy="26.5" r="2" fill="#fff"/>
    </svg>
  );
}

// ─── Sub-Komponen: StatCard ───────────────────────────────────────────────────
function StatCard({ stat, cardRef, onClick }) {
  const iconSrc = getLoanIcon(STAT_ICONS[stat.key]);
  return (
    <div
      className="loan-stat-card-wrap"
      ref={cardRef}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <div
        className="loan-stat-card"
        style={{
          background: "#FFFFFF",
          borderRadius: "20px",
          padding: "22px 18px",
          boxShadow: "0 4px 30px rgba(113,142,191,0.10)",
          display: "flex",
          alignItems: "center",
          gap: "14px",
          fontFamily: "'Inter','Segoe UI',Arial,sans-serif",
          height: "100%",
          boxSizing: "border-box",
        }}
      >
        <div
          className="loan-icon-wrap"
          style={{
            width: 52, height: 52,
            borderRadius: "50%",
            background: stat.iconBg,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {iconSrc
            ? <img
                src={iconSrc}
                alt=""
                width={28}
                height={28}
                className="loan-icon-img"
                style={{ objectFit: "contain" }}
              />
            : <FallbackIcon shape={stat.fbShape} color={stat.fbColor} />
          }
        </div>

        <div style={{ minWidth: 0 }}>
          <p
            className="loan-label"
            style={{
              margin: 0,
              fontSize: "12px",
              fontWeight: 400,
              color: "#718EBF",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {stat.label}
          </p>
          <p
            className={stat.key === "custom" ? "loan-value-sm" : "loan-value"}
            style={{
              margin: "4px 0 0",
              fontSize: stat.key === "custom" ? "14px" : "20px",
              fontWeight: 700,
              color: "#343C6A",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {stat.value}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Komponen Utama: Loan ─────────────────────────────────────────────────────
export default function Loan() {
  const cardRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleCardClick = (ref) => {
    if (!ref.current) return;
    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "28px",
      fontFamily: "'Inter','Segoe UI',Arial,sans-serif",
    }}>
      <style>{injectedStyles}</style>

      {/* ── Stat Cards ── */}
      <div className="loan-stat-row">
        {loanStats.map((s, i) => (
          <StatCard
            key={s.key}
            stat={s}
            cardRef={cardRefs[i]}
            onClick={() => handleCardClick(cardRefs[i])}
          />
        ))}
      </div>

      {/* ── Tabel Pinjaman Aktif ── */}
      <LoanTable />
    </div>
  );
}