// ─── Imports: React & Ikon Transaksi ─────────────────────────────────────────
import { useState } from "react";

import icCard   from "../../assets/icons/transactions/icon-card.svg";
import icPaypal from "../../assets/icons/transactions/icon-paypal.svg";
import icUser   from "../../assets/icons/transactions/icon-user.svg";

// ─── CSS Injeksi: Layout & Responsive ────────────────────────────────────────

const injectedStyles = `
  .recent-tx-panel {
    background: #FFFFFF;
    border-radius: 20px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
    height: 170px;
    box-sizing: border-box;
    padding: 8px 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
  }

  .tx-icon-wrap {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tx-title {
    font-family: Inter, sans-serif;
    font-size: 13px;
    font-weight: 600;
    color: #343C6A;
    margin: 0 0 3px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .tx-date {
    font-family: Inter, sans-serif;
    font-size: 11px;
    color: #718EBF;
    margin: 0;
    white-space: nowrap;
  }

  .tx-amount {
    font-family: Inter, sans-serif;
    font-size: 13px;
    font-weight: 700;
    margin: 0;
    white-space: nowrap;
    flex-shrink: 0;
  }

  /* ── Tablet: perkecil isi agar muat di tinggi 148px ── */
  @media (min-width: 768px) and (max-width: 1023px) {
    .recent-tx-panel {
      height: 148px;
      padding: 6px 14px;
      width: 231px !important;
      min-width: 231px !important;
    }
    .tx-icon-wrap {
      width: 30px;
      height: 30px;
    }
    .tx-icon-wrap img,
    .tx-icon-wrap svg {
      width: 16px !important;
      height: 16px !important;
    }
    .tx-title  { font-size: 11px !important; margin-bottom: 1px !important; }
    .tx-date   { font-size: 10px !important; }
    .tx-amount { font-size: 11px !important; }
  }

  /* ── Mobile: tinggi otomatis & lebar penuh ── */
  @media (max-width: 680px) {
    .recent-tx-panel {
      height: auto !important;
      width: 100% !important;
      box-sizing: border-box !important;
    }
  }
`;

// ─── Data Statis: Riwayat Transaksi ──────────────────────────────────────────

const transactions = [
  { id: 1, title: "Deposit from my Card", date: "28 January 2021", amount: -850,  iconBg: "#FFF5D9", iconColor: "#FFBB38", icon: "card",   iconSrc: icCard   },
  { id: 2, title: "Deposit Paypal",        date: "25 January 2021", amount: 2500,  iconBg: "#E7EDFF", iconColor: "#396AFF", icon: "paypal", iconSrc: icPaypal },
  { id: 3, title: "Jemi Wilson",           date: "21 January 2021", amount: 5400,  iconBg: "#DCFAF8", iconColor: "#16DBCC", icon: "user",   iconSrc: icUser   },
];

// ─── Ikon SVG Fallback ────────────────────────────────────────────────────────

const CardIcon = ({ color }) => (
  <svg width="22" height="18" viewBox="0 0 28 22" fill="none">
    <rect x="1" y="1" width="26" height="18" rx="4" stroke={color} strokeWidth="1.8"/>
    <rect x="1" y="7" width="26" height="5" fill={color} opacity="0.35"/>
    <rect x="4" y="13" width="6" height="2.5" rx="1.2" fill={color}/>
  </svg>
);

const PaypalIcon = ({ color }) => (
  <svg width="18" height="22" viewBox="0 0 20 28" fill="none">
    <path d="M16 3C17.2 4.8 17.2 7.2 15.5 9C13.8 10.8 11 11 8.8 11H7L5.2 20H2L5.5 2H12C14.5 2 15.2 1.5 16 3Z" fill={color}/>
    <path d="M18.5 6.5C19.5 8.2 19.2 10.5 17.5 12C15.8 13.5 13.5 13.5 11.2 13.5H9.5L7.8 22H10.5L11.2 18H13C16.5 18 18.8 16.2 19.5 13C20 11 19.5 8.8 18.5 6.5Z" fill={color} opacity="0.6"/>
  </svg>
);

const UserIcon = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="4" fill={color}/>
    <path d="M4 20C4 17 7.6 15 12 15C16.4 15 20 17 20 20" stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none"/>
  </svg>
);

// ─── Sub-Komponen: TxIcon ─────────────────────────────────────────────────────

// Menampilkan ikon SVG dari file aset; fallback ke ikon inline jika gagal dimuat
function TxIcon({ tx }) {
  const [err, setErr] = useState(false);

  if (tx.iconSrc && !err) {
    return (
      <img src={tx.iconSrc} alt="" width={24} height={24}
        style={{ objectFit: "contain", display: "block" }}
        onError={() => setErr(true)}
      />
    );
  }

  if (tx.icon === "card")   return <CardIcon   color={tx.iconColor} />;
  if (tx.icon === "paypal") return <PaypalIcon color={tx.iconColor} />;
  return <UserIcon color={tx.iconColor} />;
}

// ─── Komponen Utama: RecentTransactions ──────────────────────────────────────

export default function RecentTransactions() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>

      <style>{injectedStyles}</style>

      {/* Judul seksi */}
      <h2 style={{
        fontFamily: "Inter, sans-serif", fontWeight: 700,
        fontSize: "18px", color: "#343C6A",
        margin: "0 0 20px 0", flexShrink: 0,
      }}>
        Recent Transaction
      </h2>

      {/* Panel daftar transaksi */}
      <div className="recent-tx-panel">
        {transactions.map((tx, i) => (
          <div key={tx.id} style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flex: 1,
            padding: "4px 0",
            borderBottom: i < transactions.length - 1
              ? "1px solid #F5F7FA" : "none",
          }}>

            {/* Ikon kategori transaksi */}
            <div className="tx-icon-wrap" style={{ background: tx.iconBg }}>
              <TxIcon tx={tx} />
            </div>

            {/* Detail: judul & tanggal */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <p className="tx-title">{tx.title}</p>
              <p className="tx-date">{tx.date}</p>
            </div>

            {/* Jumlah: merah untuk debit, hijau untuk kredit */}
            <p className="tx-amount" style={{ color: tx.amount < 0 ? "#FF4B4A" : "#41D4A8" }}>
              {tx.amount < 0 ? "-" : "+"}${Math.abs(tx.amount).toLocaleString()}
            </p>

          </div>
        ))}
      </div>

    </div>
  );
}