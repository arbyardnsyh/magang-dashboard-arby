// ─── Imports: Aset Avatar Kontak ─────────────────────────────────────────────
import avatarLivia   from "../../assets/images/contacts/livia-bator.svg";
import avatarRandy   from "../../assets/images/contacts/randy-press.svg";
import avatarWorkman from "../../assets/images/contacts/workman.svg";

import { useState } from "react";

// ─── Konstanta ────────────────────────────────────────────────────────────────
const FALLBACK_AVATAR = "https://i.pravatar.cc/80?img=";

// ─── Data Statis Kontak ───────────────────────────────────────────────────────
const contacts = [
  { id: 1, name: "Livia Bator",  role: "CEO",      avatar: avatarLivia,   fallback: FALLBACK_AVATAR + "47" },
  { id: 2, name: "Randy Press",  role: "Director",  avatar: avatarRandy,   fallback: FALLBACK_AVATAR + "12" },
  { id: 3, name: "Workman",      role: "Designer",  avatar: avatarWorkman, fallback: FALLBACK_AVATAR + "68" },
];

// ─── Ikon SVG: Kirim (Send) ───────────────────────────────────────────────────
const SendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ─── Ikon SVG: Panah Kanan (Chevron) ─────────────────────────────────────────
const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M9 18L15 12L9 6" stroke="#718EBF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ─── Komponen Utama: QuickTransfer ────────────────────────────────────────────
export default function QuickTransfer() {

  // ── State Management ────────────────────────────────────────────────────────
  const [selected, setSelected] = useState(1);
  const [amount, setAmount]     = useState("525.50");
  const [sending, setSending]   = useState(false);

  // ── Handler: Simulasi Proses Pengiriman ─────────────────────────────────────
  const handleSend = () => {
    setSending(true);
    setTimeout(() => setSending(false), 1500);
  };

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>

      {/* Judul Section */}
      <h2 style={{
        fontFamily: "Inter, sans-serif", fontWeight: 700,
        fontSize: "18px", color: "#343C6A", margin: "0 0 20px 0",
        flexShrink: 0,
      }}>
        Quick Transfer
      </h2>

      {/* Card Utama */}
      <div style={{
        background: "#FFFFFF", borderRadius: "22px",
        padding: "28px 24px 24px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        display: "flex", flexDirection: "column", justifyContent: "center",
        flex: 1,
      }}>

        {/* ── Baris Kontak ─────────────────────────────────────────────────── */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "32px" }}>
          <div style={{ display: "flex", gap: "8px", flex: 1 }}>
            {contacts.map((c) => {
              return (
                <div
                  key={c.id}
                  style={{
                    display: "flex", flexDirection: "column",
                    alignItems: "center", gap: "8px",
                    flex: 1, padding: "4px",
                    userSelect: "none",
                  }}
                >
                  {/* Avatar Kontak */}
                  <img
                    src={c.avatar} alt={c.name}
                    style={{
                      width: "56px", height: "56px",
                      borderRadius: "50%", objectFit: "cover",
                    }}
                    onError={(e) => { e.currentTarget.src = c.fallback; e.currentTarget.onerror = null; }}
                  />

                  {/* Nama Kontak */}
                  <span style={{
                    fontFamily: "Inter, sans-serif", fontSize: "13px",
                    fontWeight: 400, color: "#343C6A",
                    textAlign: "center", lineHeight: "1.3",
                    pointerEvents: "none",
                  }}>{c.name}</span>

                  {/* Role / Jabatan */}
                  <span style={{
                    fontFamily: "Inter, sans-serif", fontSize: "12px",
                    color: "#718EBF", fontWeight: 400, marginTop: "-4px",
                    pointerEvents: "none",
                  }}>{c.role}</span>
                </div>
              );
            })}
          </div>

          {/* Tombol Panah Navigasi */}
          <div style={{
            width: "48px", height: "48px", borderRadius: "50%",
            background: "#FFFFFF", boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", flexShrink: 0, border: "1px solid #F0F4FB",
          }}>
            <ChevronRight />
          </div>
        </div>

        {/* ── Baris Input Nominal Transfer ─────────────────────────────────── */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>

          {/* Label */}
          <span style={{
            fontFamily: "Inter, sans-serif", fontSize: "14px",
            color: "#718EBF", fontWeight: 400,
            whiteSpace: "nowrap", flexShrink: 0,
          }}>Write Amount</span>

          {/* Input + Tombol Kirim */}
          <div style={{
            flex: 1, display: "flex", alignItems: "center",
            background: "#EDF1F7", borderRadius: "50px",
            overflow: "hidden", padding: "4px",
          }}>
            {/* Field Nominal */}
            <input
              type="text" value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{
                flex: 1, background: "transparent", border: "none", outline: "none",
                padding: "10px 8px 10px 18px", fontSize: "15px",
                fontWeight: 500, color: "#718EBF",
                fontFamily: "Inter, sans-serif", minWidth: "60px",
              }}
            />

            {/* Tombol Send */}
            <button
              onClick={handleSend}
              onMouseDown={(e) => e.preventDefault()}
              style={{
                background: sending ? "#0D0BB5" : "#1814F3",
                color: "white", border: "none", borderRadius: "50px",
                padding: "12px 22px", fontSize: "14px", fontWeight: 600,
                fontFamily: "Inter, sans-serif", cursor: "pointer",
                display: "flex", alignItems: "center", gap: "8px",
                transition: "background 0.2s", whiteSpace: "nowrap", flexShrink: 0,
                outline: "none",
              }}
            >
              {sending ? "Sending..." : "Send"}
              {!sending && <SendIcon />}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}