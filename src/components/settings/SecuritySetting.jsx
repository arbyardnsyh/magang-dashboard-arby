// ─── Dependensi ──────────────────────────────────────────────────────────────
import { useState } from "react";


// ─── Komponen Toggle Switch ───────────────────────────────────────────────────

function Toggle({ checked, onChange }) {
  return (
    <div
      onClick={() => onChange(!checked)}
      style={{
        width: 56,
        height: 30,
        borderRadius: 15,
        background: checked ? "#16DBCC" : "#DFEAF2",
        position: "relative",
        cursor: "pointer",
        transition: "background 0.25s",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 3,
          left: checked ? 26 : 3,
          width: 24,
          height: 24,
          borderRadius: "50%",
          background: "white",
          boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
          transition: "left 0.25s",
        }}
      />
    </div>
  );
}


// ─── Komponen Input Password ──────────────────────────────────────────────────

function PasswordInput({ label, value, onChange, placeholder = "" }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
      <label style={{
        display: "block",
        marginBottom: 8,
        fontSize: 14,
        fontWeight: 500,
        color: "#232323",
        fontFamily: "'Inter','Segoe UI',Arial,sans-serif",
      }}>
        {label}
      </label>
      <input
        type="password"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "12px 16px",
          border: "1.5px solid #DFEAF2",
          borderRadius: 12,
          fontSize: 14,
          color: "#718EBF",
          background: "#FFFFFF",
          outline: "none",
          fontFamily: "'Inter','Segoe UI',Arial,sans-serif",
          boxSizing: "border-box",
          transition: "border-color 0.2s",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#1814F3")}
        onBlur={(e) => (e.target.style.borderColor = "#DFEAF2")}
      />
    </div>
  );
}


// ─── Komponen Utama Security Setting ─────────────────────────────────────────

export default function SecuritySetting() {

  // ── State: Two-Factor Auth & form password ──
  const [twoFactor,    setTwoFactor]    = useState(true);
  const [currentPass,  setCurrentPass]  = useState("");
  const [newPass,      setNewPass]      = useState("");

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>

      {/* ── Responsive Styles ── */}
      <style>{`
        .sec-save-wrap {
          display: flex;
          justify-content: flex-end;
          margin-top: 32px;
        }
        .sec-save-btn {
          background: #1814F3;
          color: white;
          border: none;
          border-radius: 15px;
          padding: 14px 48px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          font-family: 'Inter','Segoe UI',Arial,sans-serif;
          transition: opacity 0.2s;
          width: auto;
        }
        @media (max-width: 600px) {
          .sec-pass-fields {
            max-width: 100% !important;
          }
          .sec-save-wrap {
            justify-content: stretch;
          }
          .sec-save-btn {
            width: 100%;
            border-radius: 12px;
          }
        }
      `}</style>

      {/* ── Two-Factor Authentication ── */}
      <p style={{
        fontSize: 15,
        fontWeight: 700,
        color: "#232323",
        margin: "0 0 16px",
        fontFamily: "'Inter','Segoe UI',Arial,sans-serif",
      }}>
        Two-factor Authentication
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
        <Toggle checked={twoFactor} onChange={setTwoFactor} />
        <span style={{
          fontSize: 14,
          color: "#232323",
          fontFamily: "'Inter','Segoe UI',Arial,sans-serif",
        }}>
          Enable or disable two factor authentication
        </span>
      </div>

      {/* ── Ubah Password ── */}
      <p style={{
        fontSize: 15,
        fontWeight: 700,
        color: "#232323",
        margin: "0 0 20px",
        fontFamily: "'Inter','Segoe UI',Arial,sans-serif",
      }}>
        Change Password
      </p>

      <div
        className="sec-pass-fields"
        style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 420 }}
      >
        <PasswordInput
          label="Current Password"
          value={currentPass}
          onChange={setCurrentPass}
          placeholder="**********"
        />
        <PasswordInput
          label="New Password"
          value={newPass}
          onChange={setNewPass}
          placeholder="**********"
        />
      </div>

      {/* ── Tombol Simpan ── */}
      <div className="sec-save-wrap">
        <button
          className="sec-save-btn"
          onMouseOver={(e) => (e.currentTarget.style.opacity = "0.88")}
          onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Save
        </button>
      </div>

    </div>
  );
}