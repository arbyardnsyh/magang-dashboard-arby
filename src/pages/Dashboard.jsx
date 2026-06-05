// ─── Imports: Komponen Widget Dashboard ──────────────────────────────────────
import MyCards            from "../components/dashboard/MyCards";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import WeeklyActivity     from "../components/dashboard/WeeklyActivity";
import ExpenseStatistics  from "../components/dashboard/ExpenseStatistics";
import QuickTransfer      from "../components/dashboard/QuickTransfer";
import BalanceHistory     from "../components/dashboard/BalanceHistory";

// ─── Komponen Utama: Dashboard ────────────────────────────────────────────────
export default function Dashboard() {
  return (
    <>
      {/* ── Stylesheet Responsif Grid ─────────────────────────────────────── */}
      <style>{`
        .dash-wrap {
          display: flex;
          flex-direction: column;
          gap: 20px;
          width: 100%;
          box-sizing: border-box;
        }

        /* ── Desktop: 63/37 kiri-kanan ── */
        .dash-row-63-37 {
          display: grid;
          grid-template-columns: minmax(0, 1.72fr) minmax(0, 1fr);
          gap: 20px;
          align-items: stretch;
        }

        /* ── Desktop: 37/63 kiri-kanan ── */
        .dash-row-37-63 {
          display: grid;
          grid-template-columns: minmax(0, 1.2fr) minmax(0, 1.72fr);
          gap: 20px;
          align-items: stretch;
        }

        .dash-row-63-37 > *,
        .dash-row-37-63 > * {
          display: flex;
          flex-direction: column;
        }

        /* ── Tablet (≤ 1024px): 2 kolom sama rata ── */
        @media (max-width: 1024px) {
          .dash-row-63-37,
          .dash-row-37-63 {
            grid-template-columns: 1fr 1fr !important;
          }
        }

        /* ── Mobile (≤ 680px): 1 kolom penuh, tinggi natural ── */
        @media (max-width: 680px) {
          .dash-row-63-37,
          .dash-row-37-63 {
            grid-template-columns: 1fr !important;
            gap: 14px !important;
          }
          .dash-wrap { gap: 20px; }

          /* Chart widget — tinggi cukup untuk grafik terbaca */
          .dash-chart-wrap { min-height: 320px; }
        }
      `}</style>

      <div className="dash-wrap">

        {/* ROW 1 — My Cards + Recent Transactions */}
        <div className="dash-row-63-37">
          <MyCards />
          <RecentTransactions />
        </div>

        {/* ROW 2 — Weekly Activity + Expense Statistics */}
        <div className="dash-row-63-37">
          <div className="dash-chart-wrap"><WeeklyActivity /></div>
          <div className="dash-chart-wrap"><ExpenseStatistics /></div>
        </div>

        {/* ROW 3 — Quick Transfer + Balance History */}
        <div className="dash-row-37-63">
          <div style={{ isolation: "isolate" }}><QuickTransfer /></div>
          <div style={{ isolation: "isolate" }}><BalanceHistory /></div>
        </div>

      </div>
    </>
  );
}