import { useState } from "react";

import avatarLivia   from "../../assets/images/contacts/livia-bator.svg";
import avatarRandy   from "../../assets/images/contacts/randy-press.svg";
import avatarWorkman from "../../assets/images/contacts/workman.svg";

const FALLBACK_AVATAR = "https://i.pravatar.cc/80?img=";

const contacts = [
  { id: 1, name: "Livia Bator", role: "CEO",      avatar: avatarLivia,   fallback: FALLBACK_AVATAR + "47" },
  { id: 2, name: "Randy Press", role: "Director",  avatar: avatarRandy,   fallback: FALLBACK_AVATAR + "12" },
  { id: 3, name: "Workman",     role: "Designer",  avatar: avatarWorkman, fallback: FALLBACK_AVATAR + "68" },
];

const injectedStyles = `
  .qt-card {
    background: #FFFFFF;
    border-radius: 22px;
    padding: 28px 24px 24px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    min-width: 0;
    box-sizing: border-box;
  }

  .qt-contacts-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 32px;
    min-width: 0;
  }

  .qt-contacts-list {
    display: flex;
    gap: 8px;
    flex: 1;
    min-width: 0;
  }

  .qt-contact-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    flex: 1;
    min-width: 0;
    padding: 4px;
  }

  .qt-avatar {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    object-fit: cover;
    flex-shrink: 0;
  }

  .qt-name {
    font-family: Inter, sans-serif;
    font-size: 13px;
    font-weight: 400;
    color: #343C6A;
    text-align: center;
    line-height: 1.3;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    width: 100%;
  }

  .qt-role {
    font-family: Inter, sans-serif;
    font-size: 12px;
    color: #718EBF;
    font-weight: 400;
    margin-top: -2px;
    text-align: center;
  }

  .qt-chevron {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #FFFFFF;
    box-shadow: 0 4px 16px rgba(0,0,0,0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-shrink: 0;
    border: 1px solid #F0F4FB;
  }

  /* ── Input row ── */
  .qt-input-row {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
    flex-wrap: nowrap;
  }

  .qt-label {
    font-family: Inter, sans-serif;
    font-size: 14px;
    color: #718EBF;
    font-weight: 400;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .qt-input-wrap {
    flex: 1;
    min-width: 0;
    display: flex;
    align-items: center;
    background: #EDF1F7;
    border-radius: 50px;
    overflow: hidden;
    padding: 3px;
  }

  .qt-input {
    flex: 1;
    min-width: 0;
    background: transparent;
    border: none;
    outline: none;
    padding: 10px 8px 10px 18px;
    font-size: 15px;
    font-weight: 500;
    color: #718EBF;
    font-family: Inter, sans-serif;
  }

  .qt-send-btn {
    background: #1814F3;
    color: white;
    border: none;
    border-radius: 50px;
    padding: 12px 22px;
    font-size: 14px;
    font-weight: 600;
    font-family: Inter, sans-serif;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: background 0.2s;
    white-space: nowrap;
    flex-shrink: 0;
    outline: none;
  }

  .qt-send-btn:active { background: #0D0BB5; }

  /* ── Desktop: kompakkan input & button ── */
  @media (min-width: 1024px) {
    .qt-card         { padding: 22px 20px 20px; }
    .qt-contacts-row { margin-bottom: 24px !important; }
    .qt-avatar       { width: 46px !important; height: 46px !important; }
    .qt-name         { font-size: 11px !important; }
    .qt-role         { font-size: 10px !important; }
    .qt-chevron      { width: 38px !important; height: 38px !important; }
    .qt-label        { font-size: 12px !important; }
    .qt-input        { font-size: 12px !important; padding: 7px 4px 7px 12px !important; }
    .qt-send-btn     { padding: 8px 14px !important; font-size: 12px !important; gap: 5px !important; }
  }

  /* Tablet */
@media (min-width: 768px) and (max-width: 1023px) {
  .qt-card         { padding: 20px 18px 18px; }
  .qt-avatar       { width: 36px !important; height: 36px !important; }  /* ← lebih kecil */
  .qt-name         { font-size: 10px !important; white-space: normal !important; } /* ← wrap */
  .qt-role         { font-size: 9px !important; }
  .qt-contacts-row { margin-bottom: 20px !important; }
  .qt-chevron      { width: 32px !important; height: 32px !important; }
  .qt-label        { font-size: 12px !important; }
  .qt-input        { font-size: 12px !important; padding: 8px 6px 8px 12px !important; }
  .qt-send-btn     { padding: 9px 14px !important; font-size: 12px !important; }
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
    <div style={{ display: "flex", flexDirection: "column", minWidth: 0, height: "100%" }}>
      <style>{injectedStyles}</style>

      <h2 style={{
        fontFamily: "Inter, sans-serif",
        fontWeight: 700,
        fontSize: "18px",
        color: "#343C6A",
        margin: "0 0 20px 0",
        flexShrink: 0,
      }}>
        Quick Transfer
      </h2>

      <div className="qt-card">

        {/* Baris Kontak */}
        <div className="qt-contacts-row">
          <div className="qt-contacts-list">
            {contacts.map((c) => (
              <div key={c.id} className="qt-contact-item">
                <img
                  src={c.avatar}
                  alt={c.name}
                  className="qt-avatar"
                  onError={(e) => {
                    e.currentTarget.src = c.fallback;
                    e.currentTarget.onerror = null;
                  }}
                />
                <span className="qt-name">{c.name}</span>
                <span className="qt-role">{c.role}</span>
              </div>
            ))}
          </div>

          <div className="qt-chevron">
            <ChevronRight />
          </div>
        </div>

        {/* Baris Input */}
        <div className="qt-input-row">
          <span className="qt-label">Write Amount</span>

          <div className="qt-input-wrap">
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="qt-input"
            />
            <button
              onClick={handleSend}
              onMouseDown={(e) => e.preventDefault()}
              className="qt-send-btn"
              style={{ background: sending ? "#0D0BB5" : "#1814F3" }}
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