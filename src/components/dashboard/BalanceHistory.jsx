// ─── Aset: Gambar Grafik ──────────────────────────────────────────────────────
import balanceImg from "../../assets/images/statistics/chart-BalanceHistory.png";

// ─── Konstanta Layout ─────────────────────────────────────────────────────────

const styles = {

  // Wrapper utama — kolom fleksibel mengikuti tinggi grid induk
  wrapper: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },

  // Judul seksi
  title: {
    fontFamily: "Inter, sans-serif",
    fontWeight: 700,
    fontSize: "18px",
    color: "#343C6A",
    margin: "0 0 20px 0",
    flexShrink: 0,
  },

  // Card kontainer — mengisi sisa tinggi wrapper
  card: {
    background: "#FFFFFF",
    borderRadius: "22px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
    position: "relative",
    overflow: "hidden",
    flex: 1,
    minHeight: "150px",  // fallback sebelum grid stretch aktif
    width: "100%",
  },

  // Gambar grafik — terpusat dan sedikit diperbesar agar memenuhi card
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

// ─── Komponen: BalanceHistory ─────────────────────────────────────────────────

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