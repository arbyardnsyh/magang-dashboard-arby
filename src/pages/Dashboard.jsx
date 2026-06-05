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

        .dash-row-63-37 {
          display: grid;
          grid-template-columns: minmax(0, 1.72fr) minmax(0, 1fr);
          gap: 20px;
          align-items: start;
        }

        .dash-row-37-63 {
          display: grid;
          grid-template-columns: minmax(0, 1.2fr) minmax(0, 1.72fr);
          gap: 20px;
          align-items: stretch;
        }

        .dash-row-37-63 > * {
          min-width: 0;
          display: flex;
          flex-direction: column;
        }

        .dash-row-63-37-stretch {
          display: grid;
          grid-template-columns: minmax(0, 1.72fr) minmax(0, 1fr);
          gap: 20px;
          align-items: stretch;
        }

        .dash-row-63-37-stretch > * {
          min-width: 0;
          display: flex;
          flex-direction: column;
        }

        .dash-row-63-37 > *,
        .dash-row-37-63 > * {
          min-width: 0;
        }

        /* Tablet */
        @media (min-width: 768px) and (max-width: 1023px) {
          .dash-wrap { gap: 14px; }

          /* Row 1: MyCards fleksibel, RecentTransactions fixed 231px */
          .dash-row-63-37 {
            grid-template-columns: minmax(0, 1fr) 231px;
            gap: 12px;
          }

          .dash-row-37-63,
          .dash-row-63-37-stretch { gap: 12px; }
        }

        /* Mobile */
        @media (max-width: 767px) {
          .dash-wrap { gap: 16px; }
          .dash-row-63-37,
          .dash-row-37-63,
          .dash-row-63-37-stretch {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }
      `}</style>

      <div className="dash-wrap">

        {/* Row 1: MyCards + RecentTransactions */}
        <div className="dash-row-63-37">
          <MyCards />
          <RecentTransactions />
        </div>

        {/* Row 2: WeeklyActivity + ExpenseStatistics */}
        <div className="dash-row-63-37-stretch">
          <WeeklyActivity />
          <ExpenseStatistics />
        </div>

        {/* Row 3: QuickTransfer + BalanceHistory */}
        <div className="dash-row-37-63">
          <QuickTransfer />
          <BalanceHistory />
        </div>

      </div>
    </>
  );
}