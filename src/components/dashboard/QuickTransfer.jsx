import avatarLivia   from "../../assets/images/contacts/livia-bator.svg";
import avatarRandy   from "../../assets/images/contacts/randy-press.svg";
import avatarWorkman from "../../assets/images/contacts/workman.svg";

import { useState } from "react";

const FALLBACK_AVATAR = "https://i.pravatar.cc/80?img=";

const contacts = [
  { id: 1, name: "Livia Bator", role: "CEO",      avatar: avatarLivia,   fallback: FALLBACK_AVATAR + "47" },
  { id: 2, name: "Randy Press", role: "Director",  avatar: avatarRandy,   fallback: FALLBACK_AVATAR + "12" },
  { id: 3, name: "Workman",     role: "Designer",  avatar: avatarWorkman, fallback: FALLBACK_AVATAR + "68" },
];

const injectedStyles = `
  @media (min-width: 768px) and (max-width: 1023px) {
    .qt-card         { padding: 14px 10px !important; }
    .qt-title        { font-size: 14px !important; margin-bottom: 12px !important; }
    .qt-contacts     { margin-bottom: 14px !important; }
    .qt-contact-item { gap: 3px !important; padding: 2px !important; }
    .qt-avatar       { width: 32px !important; height: 32px !important; }
    .qt-name         { font-size: 9px !important; }
    .qt-role         { font-size: 8px !important; margin-top: 0 !important; }
    .qt-chevron      { width: 28px !important; height: 28px !important; flex-shrink: 0; }
    .qt-input-row    { gap: 6px !important; }
    .qt-label        { font-size: 10px !important; }
    .qt-input        { font-size: 11px !important; padding: 6px 4px 6px 10px !important; }
    .qt-send-btn     { padding: 6px 10px !important; font-size: 10px !important; gap: 4px !important; }
  }
`;

const SendIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
    <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronRight = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
    <path d="M9 18L15 12L9 6" stroke="#718EBF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function QuickTransfer() {
  const [amount,  setAmount]  = useState("525.50");
  const [sending, setSending] = useState(false);

  const handleSend = () => {
    setSending(true);
    setTimeout(() => setSending(false), 1500);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <style>{injectedStyles}</style>

      <h2
        className="qt-title"
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 700,
          fontSize: "18px",
          color: "#343C6A",
          margin: "0 0 20px 0",
          flexShrink: 0,
        }}
      >
        Quick Transfer
      </h2>

      {/* Card */}
      <div
        className="qt-card"
        style={{
          background: "#FFFFFF",
          borderRadius: "22px",
          padding: "28px 24px 24px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flex: 1,
        }}
      >
        {/* Baris Kontak */}
        <div
          className="qt-contacts"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "32px",
          }}
        >
          <div style={{ display: "flex", gap: "8px", flex: 1 }}>
            {contacts.map((c) => (
              <div
                key={c.id}
                className="qt-contact-item"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "8px",
                  flex: 1,
                  padding: "4px",
                  userSelect: "none",
                }}
              >
                <img
                  src={c.avatar}
                  alt={c.name}
                  className="qt-avatar"
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                  onError={(e) => {
                    e.currentTarget.src = c.fallback;
                    e.currentTarget.onerror = null;
                  }}
                />
                <span
                  className="qt-name"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "13px",
                    fontWeight: 400,
                    color: "#343C6A",
                    textAlign: "center",
                    lineHeight: "1.3",
                    pointerEvents: "none",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "100%",
                  }}
                >
                  {c.name}
                </span>
                <span
                  className="qt-role"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "12px",
                    color: "#718EBF",
                    fontWeight: 400,
                    marginTop: "-4px",
                    pointerEvents: "none",
                  }}
                >
                  {c.role}
                </span>
              </div>
            ))}
          </div>

          {/* Chevron */}
          <div
            className="qt-chevron"
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: "#FFFFFF",
              boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              flexShrink: 0,
              border: "1px solid #F0F4FB",
            }}
          >
            <ChevronRight />
          </div>
        </div>

        {/* Baris Input */}
        <div
          className="qt-input-row"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <span
            className="qt-label"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
              color: "#718EBF",
              fontWeight: 400,
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            Write Amount
          </span>

          <div style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            background: "#EDF1F7",
            borderRadius: "50px",
            overflow: "hidden",
            padding: "4px",
          }}>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="qt-input"
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                padding: "10px 8px 10px 18px",
                fontSize: "15px",
                fontWeight: 500,
                color: "#718EBF",
                fontFamily: "Inter, sans-serif",
                minWidth: "0",
              }}
            />
            <button
              onClick={handleSend}
              onMouseDown={(e) => e.preventDefault()}
              className="qt-send-btn"
              style={{
                background: sending ? "#0D0BB5" : "#1814F3",
                color: "white",
                border: "none",
                borderRadius: "50px",
                padding: "12px 22px",
                fontSize: "14px",
                fontWeight: 600,
                fontFamily: "Inter, sans-serif",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "background 0.2s",
                whiteSpace: "nowrap",
                flexShrink: 0,
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