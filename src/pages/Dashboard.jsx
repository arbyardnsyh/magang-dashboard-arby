import MyCards            from "../components/dashboard/MyCards";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import WeeklyActivity     from "../components/dashboard/WeeklyActivity";
import ExpenseStatistics  from "../components/dashboard/ExpenseStatistics";
import QuickTransfer      from "../components/dashboard/QuickTransfer";
import BalanceHistory     from "../components/dashboard/BalanceHistory";

export default function Dashboard() {
  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }

        .dash-wrap {
          display: flex;
          flex-direction: column;
          gap: 20px;
          width: 100%;
          max-width: 100%;
          overflow-x: hidden;
        }

        /* ── Desktop (≥ 1024px): proporsi asli ── */
        .dash-row-63-37 {
          display: grid;
          grid-template-columns: minmax(0, 1.72fr) minmax(0, 1fr);
          gap: 20px;
          align-items: stretch;
        }

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
          min-width: 0;
          overflow: hidden;
        }

        /* ── Tablet (768px–1023px): proporsi sama seperti desktop, lebih compact ── */
        @media (min-width: 768px) and (max-width: 1023px) {
          .dash-wrap { gap: 16px; }

          /* Row 1: MyCards lebih lebar, RecentTransaction lebih kecil */
          .dash-row-63-37 {
            grid-template-columns: minmax(0, 1.72fr) minmax(0, 1fr);
            gap: 14px;
          }

          /* Row 2: WeeklyActivity lebih lebar dari ExpenseStatistic */
          /* Row 3: BalanceHistory lebih lebar dari QuickTransfer */
          .dash-row-37-63 {
            grid-template-columns: minmax(0, 1.2fr) minmax(0, 1.72fr);
            gap: 14px;
          }

          /* Kecilkan chart agar tidak terpotong */
          .dash-chart-wrap { min-height: 240px; }
        }

        /* ── Mobile (< 768px): stack vertikal ── */
        @media (max-width: 767px) {
          .dash-wrap { gap: 16px; }
          .dash-row-63-37,
          .dash-row-37-63 {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .dash-chart-wrap { min-height: 280px; }
        }
      `}</style>

      <div className="dash-wrap">

        {/* Row 1: MyCards (lebar) + RecentTransactions (sempit) */}
        <div className="dash-row-63-37">
          <MyCards />
          <RecentTransactions />
        </div>

        {/* Row 2: WeeklyActivity (lebar) + ExpenseStatistics (sempit) */}
        <div className="dash-row-63-37">
          <div className="dash-chart-wrap"><WeeklyActivity /></div>
          <div className="dash-chart-wrap"><ExpenseStatistics /></div>
        </div>

        {/* Row 3: QuickTransfer (sempit) + BalanceHistory (lebar) */}
        <div className="dash-row-37-63">
          <QuickTransfer />
          <BalanceHistory />
        </div>

      </div>
    </>
  );
}