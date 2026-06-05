import balanceImg from "../../assets/images/statistics/chart-BalanceHistory.png";

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    height: "100%",        // ikuti tinggi kolom dari grid stretch
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
    position: "relative",
    overflow: "hidden",
    flex: 1,               // isi sisa tinggi wrapper
    minHeight: "150px",    // fallback kalau grid belum stretch
    width: "100%",
  },

  image: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%) scale(1.05)",
    width: "96%",
    height: "105%",
    objectFit: "fill",
  },
};

export default function BalanceHistory() {
  return (
    <div style={styles.wrapper}>
      <h2 style={styles.title}>Balance History</h2>
      <div style={styles.card}>
        <img src={balanceImg} alt="Balance History" style={styles.image} />
      </div>
    </div>
  );
}