// ─── Imports: React & Ikon Transaksi ─────────────────────────────────────────
import { useState } from "react";

import icCard   from "../../assets/icons/transactions/icon-card.svg";
import icPaypal from "../../assets/icons/transactions/icon-paypal.svg";
import icUser   from "../../assets/icons/transactions/icon-user.svg";

// ─── Konstanta Layout ─────────────────────────────────────────────────────────
// Harus sama dengan CARD_H di MyCards agar tinggi panel selaras
const PANEL_H = 195;

// ─── Data Statis Riwayat Transaksi ────────────────────────────────────────────
const transactions = [
  { id: 1, title: "Deposit from my Card", date: "28 January 2021", amount: -850,  iconBg: "#FFF5D9", iconColor: "#FFBB38", icon: "card",   iconSrc: icCard   },
  { id: 2, title: "Deposit Paypal",        date: "25 January 2021", amount: 2500,  iconBg: "#E7EDFF", iconColor: "#396AFF", icon: "paypal", iconSrc: icPaypal },
  { id: 3, title: "Jemi Wilson",           date: "21 January 2021", amount: 5400,  iconBg: "#DCFAF8", iconColor: "#16DBCC", icon: "user",   iconSrc: icUser   },
];

// ─── Ikon SVG: Kartu (Card) ───────────────────────────────────────────────────
const CardIcon = ({ color }) => (
  <svg width="22" height="18" viewBox="0 0 28 22" fill="none">
    <rect x="1" y="1" width="26" height="18" rx="4" stroke={color} strokeWidth="1.8"/>
    <rect x="1" y="7" width="26" height="5" fill={color} opacity="0.35"/>
    <rect x="4" y="13" width="6" height="2.5" rx="1.2" fill={color}/>
  </svg>
);

// ─── Ikon SVG: PayPal ─────────────────────────────────────────────────────────
const PaypalIcon = ({ color }) => (
  <svg width="18" height="22" viewBox="0 0 20 28" fill="none">
    <path d="M16 3C17.2 4.8 17.2 7.2 15.5 9C13.8 10.8 11 11 8.8 11H7L5.2 20H2L5.5 2H12C14.5 2 15.2 1.5 16 3Z" fill={color}/>
    <path d="M18.5 6.5C19.5 8.2 19.2 10.5 17.5 12C15.8 13.5 13.5 13.5 11.2 13.5H9.5L7.8 22H10.5L11.2 18H13C16.5 18 18.8 16.2 19.5 13C20 11 19.5 8.8 18.5 6.5Z" fill={color} opacity="0.6"/>
  </svg>
);

// ─── Ikon SVG: Pengguna (User) ────────────────────────────────────────────────
const UserIcon = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="4" fill={color}/>
    <path d="M4 20C4 17 7.6 15 12 15C16.4 15 20 17 20 20" stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none"/>
  </svg>
);

// ─── Sub-Komponen: Ikon Transaksi (dengan fallback SVG) ───────────────────────
function TxIcon({ tx }) {
  const [err, setErr] = useState(false);

  // Coba tampilkan ikon dari file aset terlebih dahulu
  if (tx.iconSrc && !err) {
    return (
      <img src={tx.iconSrc} alt="" width={24} height={24}
        style={{ objectFit: "contain", display: "block" }}
        onError={() => setErr(true)}
      />
    );
  }

  // Fallback ke ikon SVG inline jika aset gagal dimuat
  if (tx.icon === "card")   return <CardIcon   color={tx.iconColor} />;
  if (tx.icon === "paypal") return <PaypalIcon color={tx.iconColor} />;
  return <UserIcon color={tx.iconColor} />;
}

// ─── Komponen Utama: RecentTransactions ──────────────────────────────────────
export default function RecentTransactions() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>

      {/* Judul Section — tinggi diselaraskan dengan header MyCards */}
      <h2 style={{
        fontFamily: "Inter, sans-serif", fontWeight: 700,
        fontSize: "18px", color: "#343C6A",
        margin: "0 0 20px 0", flexShrink: 0,
      }}>
        Recent Transaction
      </h2>

      {/* Panel Daftar Transaksi — tinggi tetap = PANEL_H */}
      <div style={{
        background: "#FFFFFF",
        borderRadius: "20px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        height: `${PANEL_H}px`,
        boxSizing: "border-box",
        padding: "12px 20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",  /* ruang terbagi rata antar 3 item */
        overflow: "hidden",
      }}>
        {transactions.map((tx, i) => (
          <div key={tx.id} style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flex: 1,                        /* setiap item mengisi ruang yang sama */
            borderBottom: i < transactions.length - 1
              ? "1px solid #F5F7FA" : "none",
          }}>

            {/* Lingkaran Ikon Transaksi */}
            <div style={{
              width: "42px", height: "42px",
              borderRadius: "50%",
              background: tx.iconBg,
              flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <TxIcon tx={tx} />
            </div>

            {/* Info: Judul & Tanggal */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "13px", fontWeight: 600, color: "#343C6A",
                margin: "0 0 3px",
                whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
              }}>{tx.title}</p>
              <p style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "11px", color: "#718EBF", margin: 0,
                whiteSpace: "nowrap",
              }}>{tx.date}</p>
            </div>

            {/* Nominal: merah jika debit, hijau jika kredit */}
            <p style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "13px", fontWeight: 700, margin: 0,
              color: tx.amount < 0 ? "#FF4B4A" : "#41D4A8",
              whiteSpace: "nowrap", flexShrink: 0,
            }}>
              {tx.amount < 0 ? "-" : "+"}${Math.abs(tx.amount).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}