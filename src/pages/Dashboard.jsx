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
      <style>{`
        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }

        .dash-wrap {
          display: flex;
          flex-direction: column;
          gap: 20px;
          width: 100%;
          max-width: 100%;
          overflow-x: hidden;        /* cegah horizontal scroll */
        }

        /* ── Desktop: 63/37 ── */
        .dash-row-63-37 {
          display: grid;
          grid-template-columns: minmax(0, 1.72fr) minmax(0, 1fr);
          gap: 20px;
          align-items: stretch;
        }

        /* ── Desktop: 37/63 ── */
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
          min-width: 0;              /* ← kunci: cegah grid item melar */
          overflow: hidden;
        }

        /* ── Tablet (≤ 1024px) ── */
        @media (max-width: 1024px) {
          .dash-row-63-37,
          .dash-row-37-63 {
            grid-template-columns: 1fr 1fr;
          }
        }

        /* ── Mobile (≤ 768px) — cover semua HP modern ── */
        @media (max-width: 768px) {
          .dash-wrap {
            gap: 16px;
          }
          .dash-row-63-37,
          .dash-row-37-63 {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .dash-chart-wrap {
            min-height: 280px;
          }
        }
      `}</style>

      <div className="dash-wrap">
        <div className="dash-row-63-37">
          <MyCards />
          <RecentTransactions />
        </div>
        <div className="dash-row-63-37">
          <div className="dash-chart-wrap"><WeeklyActivity /></div>
          <div className="dash-chart-wrap"><ExpenseStatistics /></div>
        </div>
        <div className="dash-row-37-63">
          <QuickTransfer />
          <BalanceHistory />
        </div>
      </div>
    </>
  );
}