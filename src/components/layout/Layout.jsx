import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const SIDEBAR_W      = 250;
const SIDEBAR_W_SLIM = 70;
const NAVBAR_H       = 80;

const responsiveStyles = `
  /* Desktop (≥ 1024px) */
  @media (min-width: 1024px) {
    .layout-content   { margin-left: ${SIDEBAR_W}px; }
    .layout-searchbar { display: none !important; }
    .layout-main      { padding: 20px 32px 48px 32px !important; }
  }

  /* Tablet (768px–1023px) */
  @media (min-width: 768px) and (max-width: 1023px) {
  .layout-content { margin-left: 180px; }
    .layout-searchbar { display: none !important; }
    .layout-main      { padding: 20px 20px 48px 20px !important; }
  }

  /* Mobile (< 768px) */
  @media (max-width: 767px) {
    .layout-content   { margin-left: 0 !important; }
    .layout-searchbar { display: flex !important; }
    .layout-main      { padding: 12px 16px 40px !important; }
  }

  @media (max-width: 600px) {
    .layout-main { padding: 12px 12px 32px !important; }
  }
`;

const styles = {
  root: {
    minHeight:  "100vh",
    background: "#F5F7FA",
    fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
  },

  contentWrapper: {
    display:       "flex",
    flexDirection: "column",
    minHeight:     "100vh",
    transition:    "margin-left 0.3s ease",
  },

  main: {
    flex:      1,
    marginTop: `${NAVBAR_H}px`,
  },

  searchbarWrapper: {
    display:      "none",
    marginBottom: "16px",
  },

  searchInputContainer: {
    position: "relative",
    width:    "100%",
  },

  searchIcon: {
    position:      "absolute",
    left:          "16px",
    top:           "50%",
    transform:     "translateY(-50%)",
    display:       "flex",
    pointerEvents: "none",
  },

  searchInput: {
    width:         "100%",
    background:    "#FFFFFF",
    borderRadius:  "40px",
    border:        "none",
    outline:       "none",
    paddingLeft:   "44px",
    paddingRight:  "20px",
    paddingTop:    "12px",
    paddingBottom: "12px",
    fontSize:      "14px",
    color:         "#718EBF",
    fontFamily:    "'Inter','Segoe UI',Arial,sans-serif",
    boxSizing:     "border-box",
    boxShadow:     "0 2px 8px rgba(0,0,0,0.05)",
  },
};

function MobileSearchBar({ value, onChange }) {
  return (
    <div className="layout-searchbar" style={styles.searchbarWrapper}>
      <div style={styles.searchInputContainer}>
        <span style={styles.searchIcon}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="#8BA3CB" strokeWidth="1.8" />
            <path d="M16.5 16.5L21 21" stroke="#8BA3CB" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </span>
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Search for something"
          style={styles.searchInput}
        />
      </div>
    </div>
  );
}

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search,     setSearch]     = useState("");

  const handleMenuClick    = () => setMobileOpen(true);
  const handleSidebarClose = () => setMobileOpen(false);
  const handleSearchChange = (e) => setSearch(e.target.value);

  return (
    <div style={styles.root}>
      <style>{responsiveStyles}</style>

      <Sidebar mobileOpen={mobileOpen} onClose={handleSidebarClose} />

      <div className="layout-content" style={styles.contentWrapper}>
        <Navbar onMenuClick={handleMenuClick} />

        <main className="layout-main" style={styles.main}>
          <MobileSearchBar value={search} onChange={handleSearchChange} />
          <Outlet />
        </main>
      </div>
    </div>
  );
}