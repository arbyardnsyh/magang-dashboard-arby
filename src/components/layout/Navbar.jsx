import { useState } from "react";
import { useLocation } from "react-router-dom";

import iconMenu     from "../../assets/icons/LOGO/icon-humberger.svg";
import iconBell     from "../../assets/icons/LOGO/icon-bel.svg";
import avatarSrc    from "../../assets/images/profile/profile-photo.svg";
import iconSettings from "../../assets/icons/LOGO/icon-settings-fix.svg";
import iconSearch   from "../../assets/icons/LOGO/search-icon.svg";

// ─── Konstanta Layout ────────────────────────────────────────────────────────
const SIDEBAR_W = 250;
const NAVBAR_H  = 80;

// ─── Mapping Judul Halaman ────────────────────────────────────────────────────
const pageTitles = {
  "/":           "Overview",
  "/transfer":   "Transactions",
  "/accounts":   "Accounts",
  "/cards":      "Credit Cards",
  "/invest":     "Investments",
  "/loans":      "Loans",
  "/services":   "Services",
  "/privileges": "My Privileges",
  "/settings":   "Setting",
};

// ─── Fallback SVG Icons ───────────────────────────────────────────────────────
// Digunakan saat file aset gagal dimuat (error)

const FbSearch = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="#8BA3CB" strokeWidth="1.8" />
    <path d="M16.5 16.5L21 21" stroke="#8BA3CB" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const FbBell = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M12 22C13.1046 22 14 21.1046 14 20H10C10 21.1046 10.8954 22 12 22Z" fill="#FF4B4A" />
    <path
      d="M19 17H5L7 15V10C7 7.24 8.88 4.91 11.5 4.18V3.5C11.5 2.67 12.17 2 13 2C13.83 2 14.5 2.67 14.5 3.5V4.18C17.12 4.91 19 7.24 19 10V15L21 17H19Z"
      fill="#FF4B4A"
    />
  </svg>
);

const FbSettings = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="3" stroke="#718EBF" strokeWidth="1.8" />
    <path
      d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"
      stroke="#718EBF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"
    />
  </svg>
);

const FbMenu = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M3 6H21M3 12H21M3 18H21" stroke="#343C6A" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// ─── Responsive Styles (diinjeksi via <style>) ────────────────────────────────
const navbarStyles = `
  .navbar-root {
    position: fixed;
    top: 0;
    left: ${SIDEBAR_W}px;
    right: 0;
    height: ${NAVBAR_H}px;
    background: #FFFFFF;
    border-bottom: 1px solid #F0F4FB;
    z-index: 40;
    display: flex;
    align-items: center;
    padding: 0 32px;
    gap: 16px;
    box-sizing: border-box;
    font-family: 'Inter','Segoe UI',Arial,sans-serif;
  }

  /* Desktop (≥ 1024px) */
  @media (min-width: 1024px) {
    .navbar-hamburger  { display: none !important; }
    .navbar-desktop    { display: flex !important; }
    .navbar-mob-avatar { display: none !important; }
    .navbar-title      { text-align: left !important; }
  }

  /* Mobile & Tablet (< 1024px) */
  @media (max-width: 1023px) {
    .navbar-root       { left: 0 !important; padding: 0 16px !important; }
    .navbar-desktop    { display: none !important; }
    .navbar-hamburger  { display: flex !important; }
    .navbar-mob-avatar { display: flex !important; }
    /* Judul rata tengah di mobile */
    .navbar-title {
      position: absolute !important;
      left: 50% !important;
      transform: translateX(-50%) !important;
      text-align: center !important;
      pointer-events: none;
    }
  }
`;

// ─── Inline Styles ────────────────────────────────────────────────────────────
const styles = {
  hamburgerBtn: {
    display:         "none",
    padding:         "8px",
    background:      "none",
    border:          "none",
    cursor:          "pointer",
    borderRadius:    "8px",
    alignItems:      "center",
    justifyContent:  "center",
    flexShrink:      0,
    zIndex:          1,
  },

  pageTitle: {
    fontFamily:  "'Inter','Segoe UI',Arial,sans-serif",
    fontWeight:  700,
    fontSize:    "29px",
    color:       "#343C6A",
    margin:      0,
    flex:        1,
    lineHeight:  1,
  },

  desktopGroup: {
    alignItems: "center",
    gap:        "12px",
    flexShrink: 0,
  },

  searchWrapper: {
    position:    "relative",
    display:     "flex",
    alignItems:  "center",
  },

  searchIconSpan: {
    position:      "absolute",
    left:          "16px",
    display:       "flex",
    pointerEvents: "none",
  },

  searchInput: {
    background:    "#F5F7FA",
    borderRadius:  "40px",
    border:        "none",
    outline:       "none",
    paddingLeft:   "44px",
    paddingRight:  "20px",
    paddingTop:    "11px",
    paddingBottom: "11px",
    fontSize:      "14px",
    color:         "#718EBF",
    width:         "240px",
    fontFamily:    "'Inter','Segoe UI',Arial,sans-serif",
  },

  iconBtn: {
    width:           44,
    height:          44,
    borderRadius:    "50%",
    background:      "#F5F7FA",
    border:          "none",
    cursor:          "pointer",
    display:         "flex",
    alignItems:      "center",
    justifyContent:  "center",
    flexShrink:      0,
  },

  avatarDesktop: {
    width:        48,
    height:       48,
    borderRadius: "50%",
    overflow:     "hidden",
    flexShrink:   0,
    border:       "2px solid #E8F1FF",
  },

  avatarMobile: {
    display:      "none",
    width:        38,
    height:       38,
    borderRadius: "50%",
    overflow:     "hidden",
    flexShrink:   0,
    border:       "2px solid #E8F1FF",
    marginLeft:   "auto",
    zIndex:       1,
  },

  avatarImg: {
    width:      "100%",
    height:     "100%",
    objectFit:  "cover",
  },
};

// ─── Sub-component: NavIcon ───────────────────────────────────────────────────
// Menampilkan ikon dari file aset; jika gagal, render SVG fallback
function NavIcon({ src, Fallback, width = 20, height = 20, alt = "" }) {
  const [err, setErr] = useState(false);

  if (!src || err) return <Fallback />;

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      style={{ objectFit: "contain", display: "block" }}
      onError={() => setErr(true)}
    />
  );
}

// ─── Komponen Utama: Navbar ───────────────────────────────────────────────────
export default function Navbar({ onMenuClick }) {
  const location = useLocation();
  const [search, setSearch] = useState("");

  // Ambil judul halaman berdasarkan path aktif
  const title = pageTitles[location.pathname] || "Overview";

  // Handler fallback avatar jika gambar gagal dimuat
  const handleAvatarError = (e) => {
    e.currentTarget.src     = "https://i.pravatar.cc/48?img=47";
    e.currentTarget.onerror = null;
  };

  return (
    <>
      {/* Inject responsive CSS */}
      <style>{navbarStyles}</style>

      <header className="navbar-root" style={{ position: "fixed" }}>

        {/* Tombol hamburger — hanya tampil di mobile */}
        <button
          className="navbar-hamburger"
          onClick={onMenuClick}
          style={styles.hamburgerBtn}
        >
          <NavIcon src={iconMenu} Fallback={FbMenu} width={22} height={22} alt="menu" />
        </button>

        {/* Judul halaman */}
        <h1 className="navbar-title" style={styles.pageTitle}>
          {title}
        </h1>

        {/* Grup kanan — search, settings, bell, avatar (desktop only) */}
        <div className="navbar-desktop" style={styles.desktopGroup}>

          {/* Search bar */}
          <div style={styles.searchWrapper}>
            <span style={styles.searchIconSpan}>
              <NavIcon src={iconSearch} Fallback={FbSearch} width={16} height={16} />
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for something"
              style={styles.searchInput}
            />
          </div>

          {/* Tombol Settings */}
          <button style={styles.iconBtn}>
            <NavIcon src={iconSettings} Fallback={FbSettings} width={20} height={20} alt="settings" />
          </button>

          {/* Tombol Bell / Notifikasi */}
          <button style={styles.iconBtn}>
            <NavIcon src={iconBell} Fallback={FbBell} width={20} height={20} alt="notifications" />
          </button>

          {/* Avatar desktop */}
          <div style={styles.avatarDesktop}>
            <img
              src={avatarSrc}
              alt="User"
              style={styles.avatarImg}
              onError={handleAvatarError}
            />
          </div>

        </div>

        {/* Avatar pojok kanan — hanya tampil di mobile */}
        <div className="navbar-mob-avatar" style={styles.avatarMobile}>
          <img
            src={avatarSrc}
            alt="User"
            style={styles.avatarImg}
            onError={handleAvatarError}
          />
        </div>

      </header>
    </>
  );
}