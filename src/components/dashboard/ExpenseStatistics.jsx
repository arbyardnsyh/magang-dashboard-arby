import expenseImg from "../../assets/images/statistics/ExpenseStatistics-image.svg";

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

  // flex: 1 agar tinggi mengikuti WeeklyActivity di sebelah kiri
  card: {
    background: "#FFFFFF",
    borderRadius: "22px",
    padding: "24px 16px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    overflow: "hidden",
  },

  // image setting
  image: {
    width: "85%",
    height: "auto",
    display: "block",
    objectFit: "contain",
    margin: "0 auto",
  },
};

// ─── Komponen ─────────────────────────────────────────────────────────────────

export default function ExpenseStatistics() {
  return (
    <div style={styles.wrapper}>
      <h2 style={styles.title}>Expense Statistics</h2>
      <div style={styles.card}>
        <img
          src={expenseImg}
          alt="Expense Statistics"
          style={styles.image}
        />
      </div>
    </div>
  );
}