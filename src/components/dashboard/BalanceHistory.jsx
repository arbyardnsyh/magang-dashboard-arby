import balanceImg from "../../assets/images/statistics/BalanceHistory-image.svg";

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },

  title: {
    fontFamily: "Inter, sans-serif",
    fontWeight: 700,
    fontSize: "18px",
    color: "#343C6A",
    margin: "0 0 20px 0",
    flexShrink: 0,
  },

  card: {
    background: "#FFFFFF",
    borderRadius: "22px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
    flex: 1,
    position: "relative",
    overflow: "hidden",
    minHeight: "220px", // mencegah card kolaps di layar kecil
    width: "100%",
  },

  image: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%) scale(1.05)",
    width: "100%",
    height: "105%",
    objectFit: "fill",
  },
};

// ─── Komponen ─────────────────────────────────────────────────────────────────

export default function BalanceHistory() {
  return (
    <div style={styles.wrapper}>
      <h2 style={styles.title}>Balance History</h2>

      <div style={styles.card}>
        <img
          src={balanceImg}
          alt="Balance History"
          style={styles.image}
        />
      </div>
    </div>
  );
}