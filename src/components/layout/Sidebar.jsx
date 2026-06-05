// ─── Dependensi Eksternal ────────────────────────────────────────────────────
import { NavLink } from "react-router-dom";

// ─── Aset: Logo ──────────────────────────────────────────────────────────────
import logoIcon from "../../assets/icons/LOGO/Bankku-logo.svg";

// ─── Aset: Ikon Navigasi ─────────────────────────────────────────────────────
import icDashboard from "../../assets/sidebar/SIDEBAR NAV ICONS/icon-dashboard.svg";
import icTransfer from "../../assets/sidebar/SIDEBAR NAV ICONS/icon-transfer.svg";
import icAccounts from "../../assets/sidebar/SIDEBAR NAV ICONS/icon-accounts.svg";
import icInvestments from "../../assets/sidebar/SIDEBAR NAV ICONS/icon-investments.svg";
import icCards from "../../assets/sidebar/SIDEBAR NAV ICONS/icon-cards.svg";
import icLoans from "../../assets/sidebar/SIDEBAR NAV ICONS/icon-loans.svg";
import icServices from "../../assets/sidebar/SIDEBAR NAV ICONS/icon-services.svg";
import icPrivileges from "../../assets/sidebar/SIDEBAR NAV ICONS/icon-privileges.svg";
import icSettings from "../../assets/sidebar/SIDEBAR NAV ICONS/icon-settings.svg";

// ─── Konstanta ───────────────────────────────────────────────────────────────
const BRAND_NAME = "";
const NAVBAR_HEIGHT = 80;
const SIDEBAR_W_SLIM = 180;

// ─── Daftar Item Navigasi ────────────────────────────────────────────────────
const navItems = [
  { path: "/",           label: "Dashboard",     icon: icDashboard,   disabled: false },
  { path: "/transfer",   label: "Transactions",  icon: icTransfer,    disabled: true  },
  { path: "/accounts",   label: "Accounts",      icon: icAccounts,    disabled: true  },
  { path: "/invest",     label: "Investments",   icon: icInvestments, disabled: true  },
  { path: "/cards",      label: "Credit Cards",  icon: icCards,       disabled: true  },
  { path: "/loans",      label: "Loans",         icon: icLoans,       disabled: false },
  { path: "/services",   label: "Services",      icon: icServices,    disabled: true  },
  { path: "/privileges", label: "My Privileges", icon: icPrivileges,  disabled: true  },
  { path: "/settings",   label: "Setting",       icon: icSettings,    disabled: false },
];

// ─── Responsive CSS (Injected) ───────────────────────────────────────────────
const injectedStyles = `
  @media (min-width: 1024px) {
    .sidebar-root {
      transform: translateX(0) !important;
      width: 250px !important;
    }
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    .sidebar-root {
      transform: translateX(0) !important;
      width: 180px !important;
    }
  }

  @media (max-width: 767px) {
    .sidebar-root {
      transform: translateX(-100%);
      width: 250px !important;
    }

    .sidebar-root.open {
      transform: translateX(0);
    }
  }

  @font-face {
    font-family: 'Mont';
    src: local('Mont'),
         url('/fonts/Mont-HeavyDEMO.woff2') format('woff2'),
         url('/fonts/Mont-HeavyDEMO.woff') format('woff');
    font-weight: 900;
    font-style: normal;
  }

  .nav-item {
    transition: background 0.15s;
  }

  .nav-item:hover {
    background: transparent !important;
  }
`;

// ─── Style Objek ─────────────────────────────────────────────────────────────
const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.3)",
    zIndex: 20,
  },

  aside: {
    position: "fixed",
    left: 0,
    top: 0,
    height: "100%",
    background: "#FFFFFF",
    zIndex: 30,
    display: "flex",
    flexDirection: "column",
    borderRight: "1px solid #F0F4FB",
    transition: "transform 0.3s ease, width 0.3s ease",
    fontFamily: "'Inter','Segoe UI',Arial,sans-serif",
  },

  logoWrapper: (height) => ({
    height: `${height}px`,
    display: "flex",
    alignItems: "center",
    gap: "14px",
    paddingLeft: "28px",
    paddingRight: "24px",
    flexShrink: 0,
  }),

  logoImage: {
    objectFit: "contain",
    flexShrink: 0,
  },

  brandName: {
    fontFamily: "'Mont', 'Inter', 'Segoe UI', Arial, sans-serif",
    fontWeight: 900,
    fontSize: "25px",
    color: "#343C6A",
    letterSpacing: "0%",
    lineHeight: "100%",
    userSelect: "none",
    whiteSpace: "nowrap",
  },

  nav: {
    flex: 1,
    overflowY: "auto",
    paddingTop: "8px",
    paddingBottom: "16px",
  },

  navLink: {
    textDecoration: "none",
    display: "block",
  },

  navItem: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    height: "50px",
    paddingLeft: "24px",
    paddingRight: "16px",
    background: "transparent",
    cursor: "pointer",
  },

  disabledNavItem: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    height: "50px",
    paddingLeft: "24px",
    paddingRight: "16px",
    background: "transparent",
    cursor: "not-allowed",
    opacity: 0.55,
  },

  activeIndicator: {
    position: "absolute",
    left: 0,
    top: "50%",
    transform: "translateY(-50%)",
    width: "5px",
    height: "50px",
    background: "#2D60FF",
    borderTopRightRadius: "10px",
    borderBottomRightRadius: "10px",
    flexShrink: 0,
  },

  navIcon: (isActive) => ({
    objectFit: "contain",
    flexShrink: 0,
    transition: "filter 0.15s",
    filter: isActive
      ? "brightness(0) saturate(100%) invert(33%) sepia(99%) saturate(748%) hue-rotate(204deg) brightness(105%) contrast(101%)"
      : "brightness(0) saturate(100%) invert(78%) sepia(6%) saturate(521%) hue-rotate(182deg) brightness(95%) contrast(87%)",
  }),

  navLabel: (isActive) => ({
    fontFamily: "'Inter','Segoe UI',Arial,sans-serif",
    fontSize: "15px",
    fontWeight: isActive ? 600 : 400,
    color: isActive ? "#2D60FF" : "#B1B1B1",
    lineHeight: 1,
  }),
};

// ─── Komponen Sidebar ────────────────────────────────────────────────────────
export default function Sidebar({ mobileOpen, onClose }) {
  return (
    <>
      {mobileOpen && (
        <div onClick={onClose} style={styles.overlay} />
      )}

      <aside
        className={`sidebar-root${mobileOpen ? " open" : ""}`}
        style={styles.aside}
      >
        <style>{injectedStyles}</style>

        {/* Logo */}
        <div style={styles.logoWrapper(NAVBAR_HEIGHT)}>
          <img
            src={logoIcon}
            alt="Logo"
            width={200}
            height={200}
            style={styles.logoImage}
          />

          <span style={styles.brandName}>
            {BRAND_NAME}
          </span>
        </div>

        {/* Navigation */}
        <nav style={styles.nav}>
  {navItems.map(({ path, label, icon, disabled }) => (
    <NavLink
      key={path}
      to={path}
      end={path === "/"}
      onClick={(e) => {
        if (disabled) {
          e.preventDefault();
          return;
        }

        onClose?.();
      }}
      style={styles.navLink}
    >
      {({ isActive }) => {
        const active = !disabled && isActive;

        return (
          <div className="nav-item" style={styles.navItem}>
            {active && (
              <span style={styles.activeIndicator} />
            )}

            <img
              src={icon}
              alt=""
              width={22}
              height={22}
              style={styles.navIcon(active)}
            />

            <span
              className="sidebar-label"
              style={styles.navLabel(active)}
            >
              {label}
            </span>
          </div>
        );
      }}
    </NavLink>
  ))}
</nav>
      </aside>
    </>
  );
}