// ── Foto profil ────────────────────────────────────────────────
import profileAvatar from "../../assets/images/profile/profile-photo.svg";

// ── Icon tombol edit foto ─────────────────────────────────────
import iconEditPhoto from "../../assets/images/profile/pencil-setting.svg";

import { useState } from "react";


// ─── Style Reusable ──────────────────────────────────────────────────────────

const inputStyle = {
  width: "100%",
  padding: "12px 16px",
  border: "1.5px solid #DFEAF2",
  borderRadius: "12px",
  fontSize: "14px",
  color: "#718EBF",
  background: "#FFFFFF",
  outline: "none",
  fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
  boxSizing: "border-box",
  transition: "border-color 0.2s",
};

const labelStyle = {
  display: "block",
  marginBottom: "8px",
  fontSize: "14px",
  fontWeight: 500,
  color: "#232323",
  fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
};

const fieldWrapStyle = {
  display: "flex",
  flexDirection: "column",
  flex: 1,
  minWidth: 0,
};


// ─── Halaman Utama Profile Settings ──────────────────────────────────────────

export default function ProfileSettings() {

  // ── State: Data form profil pengguna ──
  const [form, setForm] = useState({
    yourName: "Charlene Reed",
    userName: "Charlene Reed",
    email: "charlenereed@gmail.com",
    password: "**********",
    dateOfBirth: "25 January 1990",
    presentAddress: "San Jose, California, USA",
    permanentAddress: "San Jose, California, USA",
    city: "San Jose",
    postalCode: "45962",
    country: "USA",
  });

  // ── Handler perubahan field secara dinamis ──
  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <>
      {/* ── Responsive Styles ── */}
      <style>{`
        @media (max-width: 767px) {

          /* Wrapper utama: column agar avatar di atas form */
          .ps-root {
            flex-direction: column !important;
            gap: 24px !important;
          }

          /* Avatar: center */
          .ps-avatar-col {
            align-items: center !important;
            width: 100% !important;
          }

          /* Avatar ukuran lebih besar di mobile */
          .ps-avatar-img {
            width: 120px !important;
            height: 120px !important;
          }

          /* Form: full width */
          .ps-form-col {
            width: 100% !important;
          }

          /* Grid form jadi 1 kolom */
          .ps-grid {
            grid-template-columns: 1fr !important;
          }

          /* Save button: full width */
          .ps-save-wrap {
            justify-content: stretch !important;
          }
          .ps-save-btn {
            width: 100% !important;
            border-radius: 14px !important;
          }
        }
      `}</style>

      <div className="ps-root" style={{ display: "flex", gap: "40px" }}>

        {/* ── Kolom Kiri: Avatar Profil ─────────────────────────── */}
        <div
          className="ps-avatar-col"
          style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          <div style={{ position: "relative", width: 120, height: 120 }}>

            {/* Foto profil */}
            <img
              className="ps-avatar-img"
              src={profileAvatar}
              alt="Profile"
              style={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                objectFit: "cover",
                border: "4px solid #F0F4FB",
              }}
              onError={(e) => {
                e.currentTarget.src = "https://i.pravatar.cc/150?img=47";
                e.currentTarget.onerror = null;
              }}
            />

            {/* Tombol ganti foto */}
            <button
              title="Ganti foto profil"
              style={{
                position: "absolute",
                bottom: 4,
                right: 4,
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "#1814F3",
                border: "2px solid white",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 0,
              }}
            >
              <img
                src={iconEditPhoto}
                alt="edit"
                width={16}
                height={16}
                style={{ objectFit: "contain", display: "block" }}
              />
            </button>

          </div>
        </div>

        {/* ── Kolom Kanan: Form Data Profil ────────────────────── */}
        <div className="ps-form-col" style={{ flex: 1 }}>
          <div
            className="ps-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px 24px" }}
          >

            {/* Nama lengkap */}
            <div style={fieldWrapStyle}>
              <label style={labelStyle}>Your Name</label>
              <input style={inputStyle} value={form.yourName} onChange={handleChange("yourName")}
                onFocus={(e) => (e.target.style.borderColor = "#1814F3")}
                onBlur={(e) => (e.target.style.borderColor = "#DFEAF2")} />
            </div>

            {/* Username */}
            <div style={fieldWrapStyle}>
              <label style={labelStyle}>User Name</label>
              <input style={inputStyle} value={form.userName} onChange={handleChange("userName")}
                onFocus={(e) => (e.target.style.borderColor = "#1814F3")}
                onBlur={(e) => (e.target.style.borderColor = "#DFEAF2")} />
            </div>

            {/* Email */}
            <div style={fieldWrapStyle}>
              <label style={labelStyle}>Email</label>
              <input style={inputStyle} type="email" value={form.email} onChange={handleChange("email")}
                onFocus={(e) => (e.target.style.borderColor = "#1814F3")}
                onBlur={(e) => (e.target.style.borderColor = "#DFEAF2")} />
            </div>

            {/* Password */}
            <div style={fieldWrapStyle}>
              <label style={labelStyle}>Password</label>
              <input style={inputStyle} type="password" value={form.password} onChange={handleChange("password")}
                onFocus={(e) => (e.target.style.borderColor = "#1814F3")}
                onBlur={(e) => (e.target.style.borderColor = "#DFEAF2")} />
            </div>

            {/* Tanggal lahir dengan chevron dekoratif */}
            <div style={fieldWrapStyle}>
              <label style={labelStyle}>Date of Birth</label>
              <div style={{ position: "relative" }}>
                <input
                  style={inputStyle}
                  value={form.dateOfBirth}
                  onChange={handleChange("dateOfBirth")}
                  onFocus={(e) => (e.target.style.borderColor = "#1814F3")}
                  onBlur={(e) => (e.target.style.borderColor = "#DFEAF2")}
                />
                {/* Chevron icon */}
                <svg
                  style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
                  width="12" height="8" viewBox="0 0 12 8" fill="none"
                >
                  <path d="M1 1L6 7L11 1" stroke="#718EBF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* Alamat saat ini */}
            <div style={fieldWrapStyle}>
              <label style={labelStyle}>Present Address</label>
              <input style={inputStyle} value={form.presentAddress} onChange={handleChange("presentAddress")}
                onFocus={(e) => (e.target.style.borderColor = "#1814F3")}
                onBlur={(e) => (e.target.style.borderColor = "#DFEAF2")} />
            </div>

            {/* Alamat tetap */}
            <div style={fieldWrapStyle}>
              <label style={labelStyle}>Permanent Address</label>
              <input style={inputStyle} value={form.permanentAddress} onChange={handleChange("permanentAddress")}
                onFocus={(e) => (e.target.style.borderColor = "#1814F3")}
                onBlur={(e) => (e.target.style.borderColor = "#DFEAF2")} />
            </div>

            {/* Kota */}
            <div style={fieldWrapStyle}>
              <label style={labelStyle}>City</label>
              <input style={inputStyle} value={form.city} onChange={handleChange("city")}
                onFocus={(e) => (e.target.style.borderColor = "#1814F3")}
                onBlur={(e) => (e.target.style.borderColor = "#DFEAF2")} />
            </div>

            {/* Kode pos */}
            <div style={fieldWrapStyle}>
              <label style={labelStyle}>Postal Code</label>
              <input style={inputStyle} value={form.postalCode} onChange={handleChange("postalCode")}
                onFocus={(e) => (e.target.style.borderColor = "#1814F3")}
                onBlur={(e) => (e.target.style.borderColor = "#DFEAF2")} />
            </div>

            {/* Negara */}
            <div style={fieldWrapStyle}>
              <label style={labelStyle}>Country</label>
              <input style={inputStyle} value={form.country} onChange={handleChange("country")}
                onFocus={(e) => (e.target.style.borderColor = "#1814F3")}
                onBlur={(e) => (e.target.style.borderColor = "#DFEAF2")} />
            </div>

          </div>

          {/* ── Tombol Simpan ── */}
          <div className="ps-save-wrap" style={{ display: "flex", justifyContent: "flex-end", marginTop: "32px" }}>
            <button
              className="ps-save-btn"
              style={{
                background: "#1814F3",
                color: "white",
                border: "none",
                borderRadius: "15px",
                padding: "14px 48px",
                fontSize: "16px",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
                transition: "opacity 0.2s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = "0.88")}
              onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Save
            </button>
          </div>
        </div>

      </div>
    </>
  );
}