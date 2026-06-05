// ─── Imports: React & Komponen Tab Settings ───────────────────────────────────
import { useState } from "react";
import ProfileSettings    from "../components/settings/ProfileSettings";
import PreferenceSetting  from "../components/settings/PreferenceSetting";
import SecuritySetting    from "../components/settings/SecuritySetting";

// ─── Data Statis: Daftar Tab Navigasi ─────────────────────────────────────────
const tabs = [
  { id: "profile",     label: "Edit Profile" },
  { id: "preferences", label: "Preferences"  },
  { id: "security",    label: "Security"      },
];

// ─── Injected CSS: Responsif Tab Button ───────────────────────────────────────
const settingsStyles = `
  @media (max-width: 767px) {
    .settings-tab-btn {
      white-space: nowrap;
      padding: 16px 12px !important;
      font-size: 13px !important;
    }
  }
`;

// ─── Komponen Utama: Settings ─────────────────────────────────────────────────
export default function Settings() {

  // ── State: Tab yang Sedang Aktif ────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div style={{
      background: "#FFFFFF",
      borderRadius: "20px",
      minHeight: "600px",
      fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
      overflow: "hidden",
    }}>
      <style>{settingsStyles}</style>

      {/* ── Navigasi Tab ─────────────────────────────────────────────────── */}
      <div style={{
        display: "flex",
        borderBottom: "1px solid #F0F4FB",
        padding: "0 32px",
      }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className="settings-tab-btn"
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "20px 24px",
              border: "none",
              background: "none",
              cursor: "pointer",
              fontSize: "15px",
              fontWeight: activeTab === tab.id ? 600 : 400,
              color: activeTab === tab.id ? "#1814F3" : "#718EBF",
              borderBottom: activeTab === tab.id ? "3px solid #1814F3" : "3px solid transparent",
              marginBottom: "-1px",
              transition: "all 0.2s ease",
              fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Konten Tab Aktif ──────────────────────────────────────────────── */}
      <div style={{ padding: "32px" }}>
        {activeTab === "profile"     && <ProfileSettings />}
        {activeTab === "preferences" && <PreferenceSetting />}
        {activeTab === "security"    && <SecuritySetting />}
      </div>

    </div>
  );
}