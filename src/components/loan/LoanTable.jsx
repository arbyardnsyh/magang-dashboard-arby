import { useState } from "react";

const tableData = [
  { no: "01.", loanMoney: "$100,000", leftToRepay: "$40,500",  duration: "8 Months",  rate: "12%", installment: "$2,000 / month"  },
  { no: "02.", loanMoney: "$500,000", leftToRepay: "$250,000", duration: "36 Months", rate: "10%", installment: "$8,000 / month"  },
  { no: "03.", loanMoney: "$900,000", leftToRepay: "$40,500",  duration: "12 Months", rate: "12%", installment: "$5,000 / month"  },
  { no: "04.", loanMoney: "$50,000",  leftToRepay: "$40,500",  duration: "25 Months", rate: "5%",  installment: "$2,000 / month"  },
  { no: "05.", loanMoney: "$50,000",  leftToRepay: "$40,500",  duration: "5 Months",  rate: "16%", installment: "$10,000 / month" },
  { no: "06.", loanMoney: "$80,000",  leftToRepay: "$25,500",  duration: "14 Months", rate: "8%",  installment: "$2,000 / month"  },
  { no: "07.", loanMoney: "$12,000",  leftToRepay: "$5,500",   duration: "9 Months",  rate: "13%", installment: "$500 / month"    },
  { no: "08.", loanMoney: "$160,000", leftToRepay: "$100,800", duration: "3 Months",  rate: "12%", installment: "$900 / month"    },
];

const TOTAL = {
  loanMoney:   "$1,250,000",
  leftToRepay: "$750,000",
  installment: "$50,000 / month",
};

const COLUMNS = [
  { key: "no",          label: "SL No",         hideOnMobile: true  },
  { key: "loanMoney",   label: "Loan Money",     hideOnMobile: false },
  { key: "leftToRepay", label: "Left to Repay",  hideOnMobile: false },
  { key: "duration",    label: "Duration",       hideOnMobile: true  },
  { key: "rate",        label: "Interest Rate",  hideOnMobile: true  },
  { key: "installment", label: "Installment",    hideOnMobile: true  },
  { key: "action",      label: "Repay",          hideOnMobile: false },
];

const injectedStyles = `
  .loantable-wrap  { overflow-x: auto; -webkit-overflow-scrolling: touch; }
  .loantable-inner { width: 100%; border-collapse: collapse; min-width: 620px; }

  /* Mobile only (≤ 767px): sembunyikan kolom & compact style */
  @media (max-width: 767px) {
    .col-hide-mobile  { display: none !important; }
    .loantable-inner  { min-width: unset !important; }
    .loantable-wrap   { overflow-x: visible !important; }
    .lt-th            { font-size: 12px !important; padding-bottom: 10px !important; }
    .lt-td            { font-size: 13px !important; padding: 11px 10px 11px 0 !important; }
    .lt-td-total      { padding: 14px 10px 4px 0 !important; font-size: 13px !important; }
    .lt-repay-btn     { padding: 5px 14px !important; font-size: 12px !important; }
    .loantable-card   { padding: 18px 14px 14px !important; border-radius: 18px !important; }
  }
`;

const styles = {
  wrapper: {
    fontFamily: "'Inter','Segoe UI',Arial,sans-serif",
  },
  title: {
    fontWeight: 700,
    fontSize: "20px",
    color: "#343C6A",
    margin: "0 0 16px 0",
  },
  card: {
    background: "#FFFFFF",
    borderRadius: "24px",
    padding: "28px 28px 20px",
    boxShadow: "0 4px 30px rgba(113,142,191,0.10)",
  },
  th: {
    textAlign: "left",
    padding: "0 16px 14px 0",
    fontSize: "13px",
    fontWeight: 400,
    color: "#718EBF",
    borderBottom: "1px solid #F0F4FB",
    whiteSpace: "nowrap",
  },
  td: {
    padding: "14px 16px 14px 0",
    fontSize: "14px",
    color: "#343C6A",
    whiteSpace: "nowrap",
  },
  tdNumeric: {
    padding: "14px 16px 14px 0",
    fontSize: "14px",
    color: "#343C6A",
    whiteSpace: "nowrap",
    fontVariantNumeric: "tabular-nums",
    fontFeatureSettings: '"tnum"',
  },
  tdTotal: {
    padding: "18px 16px 4px 0",
    fontSize: "14px",
    color: "#FF4B4A",
    fontWeight: 600,
  },
  tdTotalNumeric: {
    padding: "18px 16px 4px 0",
    fontSize: "14px",
    color: "#FF4B4A",
    fontWeight: 600,
    fontVariantNumeric: "tabular-nums",
    fontFeatureSettings: '"tnum"',
  },
  totalMobileLabel: {
    display: "none",
    fontSize: "14px",
    color: "#FF4B4A",
    fontWeight: 600,
  },
  repayButton: (isActive) => ({
    padding: "6px 22px",
    borderRadius: "99px",
    border: `1.5px solid ${isActive ? "#1814F3" : "#DFEAF2"}`,
    background: "#FFFFFF",
    color: isActive ? "#1814F3" : "#718EBF",
    fontSize: "13px",
    fontWeight: 500,
    cursor: "pointer",
    fontFamily: "'Inter','Segoe UI',Arial,sans-serif",
    transition: "all 0.2s",
    whiteSpace: "nowrap",
  }),
};

function RepayButton({ isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className="lt-repay-btn"
      style={styles.repayButton(isActive)}
      onMouseOver={(e) => {
        e.currentTarget.style.borderColor = "#1814F3";
        e.currentTarget.style.color = "#1814F3";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.borderColor = isActive ? "#1814F3" : "#DFEAF2";
        e.currentTarget.style.color = isActive ? "#1814F3" : "#718EBF";
      }}
    >
      Repay
    </button>
  );
}

export default function LoanTable() {
  const [activeRows, setActiveRows] = useState(new Set([0]));

  function toggleRow(idx) {
    setActiveRows((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  }

  return (
    <div style={styles.wrapper}>
      <style>{injectedStyles}</style>

      <h3 style={styles.title}>Active Loans Overview</h3>

      <div className="loantable-card" style={styles.card}>
        <div className="loantable-wrap">
          <table className="loantable-inner">
            <thead>
              <tr>
                {COLUMNS.map((col) => (
                  <th
                    key={col.key}
                    className={`lt-th${col.hideOnMobile ? " col-hide-mobile" : ""}`}
                    style={styles.th}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, idx) => (
                <tr key={idx} style={{ borderBottom: "1px solid #F0F4FB" }}>
                  <td className="lt-td col-hide-mobile" style={styles.td}>{row.no}</td>
                  <td className="lt-td" style={styles.tdNumeric}>{row.loanMoney}</td>
                  <td className="lt-td" style={styles.tdNumeric}>{row.leftToRepay}</td>
                  <td className="lt-td col-hide-mobile" style={styles.td}>{row.duration}</td>
                  <td className="lt-td col-hide-mobile" style={styles.tdNumeric}>{row.rate}</td>
                  <td className="lt-td col-hide-mobile" style={styles.tdNumeric}>{row.installment}</td>
                  <td className="lt-td" style={{ padding: "14px 0 14px 0" }}>
                    <RepayButton isActive={activeRows.has(idx)} onClick={() => toggleRow(idx)} />
                  </td>
                </tr>
              ))}

              {/* Baris total */}
              <tr>
                <td className="lt-td-total col-hide-mobile" style={styles.tdTotal}>Total</td>
                <td className="lt-td-total" style={styles.tdTotalNumeric}>
                  <span className="total-mobile-label" style={styles.totalMobileLabel}>Total&nbsp;</span>
                  {TOTAL.loanMoney}
                </td>
                <td className="lt-td-total" style={styles.tdTotalNumeric}>{TOTAL.leftToRepay}</td>
                <td className="col-hide-mobile" colSpan={2} />
                <td className="lt-td-total col-hide-mobile" style={styles.tdTotalNumeric}>{TOTAL.installment}</td>
                <td />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}