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


// ─── Komponen Select Dropdown ─────────────────────────────────────────────────

function SelectField({ label, value, onChange, options }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0 }}>
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
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
          appearance: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 7L11 1' stroke='%23718EBF' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 16px center",
          paddingRight: 40,
          cursor: "pointer",
          boxSizing: "border-box",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#1814F3")}
        onBlur={(e) => (e.target.style.borderColor = "#DFEAF2")}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}


// ─── Komponen Baris Toggle + Label ───────────────────────────────────────────

function ToggleRow({ label, checked, onChange }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 16,
      padding: "12px 0",
    }}>
      <Toggle checked={checked} onChange={onChange} />
      <span style={{
        fontSize: 14,
        color: "#232323",
        fontFamily: "'Inter','Segoe UI',Arial,sans-serif",
      }}>
        {label}
      </span>
    </div>
  );
}


// ─── Halaman Utama Preference Setting ────────────────────────────────────────

export default function PreferenceSetting() {

  // ── State: Currency & Time Zone ──
  const [currency, setCurrency] = useState("USD");
  const [timeZone, setTimeZone] = useState("GMT-12");

  // ── State: Notifikasi ──
  const [notifications, setNotifications] = useState({
    digital: true,
    transfer: false,
    fullName: true,
  });

  // ── Handler toggle notifikasi berdasarkan key ──
  const toggle = (key) => () =>
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div style={{ width: "100%" }}>

      {/* ── Responsive Styles ── */}
      <style>{`
        .pref-fields-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px 24px;
          margin-bottom: 24px;
        }
        @media (max-width: 600px) {
          .pref-fields-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }

        .pref-save-wrap {
          display: flex;
          justify-content: flex-end;
          margin-top: 32px;
        }
        .pref-save-btn {
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
          .pref-save-wrap {
            justify-content: stretch;
          }
          .pref-save-btn {
            width: 100%;
            border-radius: 12px;
          }
        }
      `}</style>

      {/* ── Currency & Time Zone ── */}
      <div className="pref-fields-grid">
        <SelectField
          label="Currency"
          value={currency}
          onChange={setCurrency}
          options={[
            { value: "USD", label: "USD" },
            { value: "EUR", label: "EUR – Euro" },
            { value: "IDR", label: "IDR – Indonesian Rupiah" },
            { value: "GBP", label: "GBP – British Pound" },
            { value: "JPY", label: "JPY – Japanese Yen" },
          ]}
        />
        <SelectField
          label="Time Zone"
          value={timeZone}
          onChange={setTimeZone}
          options={[
            { value: "GMT-12", label: "(GMT-12:00) International Date Line West" },
            { value: "GMT-8",  label: "(GMT-08:00) Pacific Time (US & Canada)" },
            { value: "GMT-5",  label: "(GMT-05:00) Eastern Time (US & Canada)" },
            { value: "GMT+0",  label: "(GMT+00:00) London, Lisbon, Dublin" },
            { value: "GMT+1",  label: "(GMT+01:00) Amsterdam, Berlin, Rome" },
            { value: "GMT+7",  label: "(GMT+07:00) Bangkok, Hanoi, Jakarta" },
            { value: "GMT+8",  label: "(GMT+08:00) Beijing, Singapore" },
            { value: "GMT+9",  label: "(GMT+09:00) Tokyo, Osaka" },
          ]}
        />
      </div>

      {/* ── Notifikasi ── */}
      <div style={{
        background: "#FFFFFF",
        borderRadius: 16,
        padding: "8px 0",
        marginBottom: 24,
      }}>
        <p style={{
          fontSize: 15,
          fontWeight: 600,
          color: "#232323",
          marginBottom: 0,
          marginTop: 12,
          fontFamily: "'Inter','Segoe UI',Arial,sans-serif",
        }}>
          Notification
        </p>
        <ToggleRow
          label="I send or receive digital currency"
          checked={notifications.digital}
          onChange={toggle("digital")}
        />
        <ToggleRow
          label="I receive merchant order"
          checked={notifications.transfer}
          onChange={toggle("transfer")}
        />
        <ToggleRow
          label="There are recommendation for my account"
          checked={notifications.fullName}
          onChange={toggle("fullName")}
        />
      </div>

      {/* ── Tombol Simpan ── */}
      <div className="pref-save-wrap">
        <button
          className="pref-save-btn"
          onMouseOver={(e) => (e.currentTarget.style.opacity = "0.88")}
          onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Save
        </button>
      </div>

    </div>
  );
}