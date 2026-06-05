// ─── Aset: Ikon Kartu ─────────────────────────────────────────────────────────

import icChip        from "../../assets/icons/cards/icon-chip.svg";
import icMaster      from "../../assets/icons/cards/icon-mastercard.svg";
import icCircleBlue  from "../../assets/icons/cards/icon-2bulat-cardbiru.svg";
import icCircleWhite from "../../assets/icons/cards/icon-2bulat-cardputih.svg";

// ─── Styles ───────────────────────────────────────────────────────────────────

const injectedStyles = `
  .credit-card-wrap {
    flex: 1 1 0;
    min-width: 0;
    height: 195px;
    border-radius: 20px;
    overflow: hidden;
  }
  @media (max-width: 680px) {
    .credit-card-wrap { height: 160px !important; }
  }
`;

const styles = {
  // ── CreditCard ──────────────────────────────────────────────

  cardInner: (dark) => ({
    width: "100%",
    height: "100%",
    borderRadius: "20px",
    padding: "16px 18px 14px",
    background: dark
      ? "linear-gradient(107.38deg, #4C49ED 2.61%, #0A06F4 101.2%)"
      : "#FFFFFF",
    border: dark ? "none" : "1.5px solid #DFEAF2",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "relative",
    boxSizing: "border-box",
  }),

  labelText: (dark) => ({
    fontSize: "10px",
    fontWeight: 400,
    margin: "0 0 2px",
    color: dark ? "#FFFFFF" : "#718EBF",
    fontFamily: "'Lato','Inter','Segoe UI',Arial,sans-serif",
  }),

  balanceText: (dark) => ({
    fontSize: "18px",
    fontWeight: 400,
    margin: 0,
    color: dark ? "#FFFFFF" : "#343C6A",
    fontFamily: "'Lato','Inter','Segoe UI',Arial,sans-serif",
    letterSpacing: "-0.5px",
  }),

  metaLabel: (dark) => ({
    fontSize: "10px",
    margin: "0 0 1px",
    color: dark ? "rgba(255,255,255,0.55)" : "#718EBF",
    fontFamily: "'Lato','Inter','Segoe UI',Arial,sans-serif",
    fontWeight: 400,
    letterSpacing: "0.8px",
    textTransform: "uppercase",
  }),

  metaValue: (dark) => ({
    fontSize: "14px",
    fontWeight: 600,
    margin: 0,
    color: dark ? "#FFFFFF" : "#343C6A",
    fontFamily: "'Lato','Inter','Segoe UI',Arial,sans-serif",
  }),

  cardBottom: (dark) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "10px",
    borderTop: dark ? "1px solid rgba(255,255,255,0.15)" : "1px solid #EDF0F6",
    ...(dark && {
      margin: "0 -18px -14px",
      padding: "10px 18px 14px",
      background: "rgba(255,255,255,0.12)",
      backdropFilter: "blur(2px)",
    }),
  }),

  cardNumber: (dark) => ({
    fontSize: "12px",
    fontWeight: 600,
    margin: 0,
    color: dark ? "#FFFFFF" : "#343C6A",
    letterSpacing: "1.5px",
    fontFamily: "'Lato','Inter','Segoe UI',Arial,sans-serif",
    whiteSpace: "nowrap",
  }),

  // ── MyCards ─────────────────────────────────────────────────

  section: {
    display: "flex",
    flexDirection: "column",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  title: {
    fontFamily: "'Lato','Inter','Segoe UI',Arial,sans-serif",
    fontWeight: 700,
    fontSize: "18px",
    color: "#343C6A",
    margin: 0,
  },

  seeAll: {
    fontFamily: "'Lato','Inter','Segoe UI',Arial,sans-serif",
    fontWeight: 600,
    fontSize: "15px",
    color: "#343C6A",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
  },

  // Scroll horizontal aktif di mobile
  cardsRow: {
    display: "flex",
    gap: "16px",
    overflowX: "auto",
    paddingBottom: "4px",
  },
};

// ─── Sub-Komponen: CreditCard ─────────────────────────────────────────────────

/**
 * Kartu kredit individual.
 *
 * Props:
 *   - dark       {boolean} — varian warna: true = biru gelap, false = putih
 *   - balance    {number}  — saldo kartu
 *   - holder     {string}  — nama pemegang kartu
 *   - validThru  {string}  — masa berlaku kartu (MM/YY)
 *   - cardNumber {string}  — nomor kartu (termasuk masking)
 */
function CreditCard({ dark, balance, holder, validThru, cardNumber }) {
  return (
    <>
      <style>{injectedStyles}</style>

      <div className="credit-card-wrap">
        <div style={styles.cardInner(dark)}>

          {/* Bagian atas: saldo & ikon */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <p style={styles.labelText(dark)}>Balance</p>
              <p style={styles.balanceText(dark)}>${balance.toLocaleString()}</p>
            </div>
            <img
              src={dark ? icChip : icMaster}
              alt={dark ? "chip" : "mastercard"}
              width={30} height={24}
              style={{ objectFit: "contain", display: "block", flexShrink: 0 }}
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
          </div>

          {/* Bagian tengah: card holder & valid thru */}
          <div style={{ display: "flex", gap: "24px" }}>
            <div>
              <p style={styles.metaLabel(dark)}>Card Holder</p>
              <p style={styles.metaValue(dark)}>{holder}</p>
            </div>
            <div>
              <p style={styles.metaLabel(dark)}>Valid Thru</p>
              <p style={styles.metaValue(dark)}>{validThru}</p>
            </div>
          </div>

          {/* Bagian bawah: nomor kartu & logo */}
          <div style={styles.cardBottom(dark)}>
            <p style={styles.cardNumber(dark)}>{cardNumber}</p>
            <img
              src={dark ? icCircleBlue : icCircleWhite}
              alt="card-circles"
              width={36} height={24}
              style={{ objectFit: "contain", flexShrink: 0, marginLeft: "8px" }}
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
          </div>

        </div>
      </div>
    </>
  );
}

// ─── Komponen Utama ───────────────────────────────────────────────────────────

export default function MyCards() {
  return (
    <div style={styles.section}>

      {/* Header: judul & tombol lihat semua */}
      <div style={styles.header}>
        <h2 style={styles.title}>My Cards</h2>
        <button style={styles.seeAll}>See All</button>
      </div>

      {/* Daftar kartu — scroll horizontal di mobile */}
      <div style={styles.cardsRow}>
        <CreditCard dark={true}  balance={5756} holder="Eddy Cusuma" validThru="12/22" cardNumber="3778 **** **** 1234" />
        <CreditCard dark={false} balance={5756} holder="Eddy Cusuma" validThru="12/22" cardNumber="3778 **** **** 1234" />
      </div>

    </div>
  );
}