import { useState } from "react";

//  DATA
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

/** Nilai total yang ditampilkan di baris terakhir tabel. */
const TOTAL = {
  loanMoney:   "$125,0000",
  leftToRepay: "$750,000",
  installment: "$50,000 / month",
};

/** Definisi kolom: key data, label header, dan visibilitas di mobile. */
const COLUMNS = [
  { key: "no",          label: "SL No",         hideOnMobile: true  },
  { key: "loanMoney",   label: "Loan Money",    hideOnMobile: false },
  { key: "leftToRepay", label: "Left to repay", hideOnMobile: false },
  { key: "duration",    label: "Duration",      hideOnMobile: true  },
  { key: "rate",        label: "Interest rate", hideOnMobile: true  },
  { key: "installment", label: "Installment",   hideOnMobile: true  },
  { key: "action",      label: "Repay",         hideOnMobile: false },
];

//  STYLES (injected CSS)
const injectedStyles = `
  @media (max-width: 680px) {
    .col-hide-mobile { display: none !important; }
    .loantable-wrap  { overflow-x: visible !important; }
    .loantable-inner { min-width: unset !important; }
  }

  @media (max-width: 680px) {
    .total-mobile-label { display: block !important; }
  }
`;

//  STYLES (objek)
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

  tableScroll: {
    overflowX: "auto",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "700px",
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

  /** Sel data biasa */
  td: {
    padding: "14px 16px 14px 0",
    fontSize: "14px",
    color: "#343C6A",
    whiteSpace: "nowrap",
  },

  /** Sel data numerik — menggunakan tabular nums agar angka rata */
  tdNumeric: {
    padding: "14px 16px 14px 0",
    fontSize: "14px",
    color: "#343C6A",
    whiteSpace: "nowrap",
    fontVariantNumeric: "tabular-nums",
    fontFeatureSettings: '"tnum"',
  },

  /** Sel baris total */
  tdTotal: {
    padding: "18px 16px 4px 0",
    fontSize: "14px",
    color: "#FF4B4A",
    fontWeight: 600,
  },

  /** Sel baris total dengan angka */
  tdTotalNumeric: {
    padding: "18px 16px 4px 0",
    fontSize: "14px",
    color: "#FF4B4A",
    fontWeight: 600,
    fontVariantNumeric: "tabular-nums",
    fontFeatureSettings: '"tnum"',
  },

  /** Label "Total" khusus mobile (tersembunyi di desktop) */
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


//  SUB-KOMPONEN
function RepayButton({ isActive, onClick }) {
  return (
    <button
      onClick={onClick}
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


//  KOMPONEN UTAMA
export default function LoanTable() {
  // Set berisi index baris yang sedang aktif; default: baris pertama (index 0)
  const [activeRows, setActiveRows] = useState(new Set([0]));

  /** Toggle status aktif pada baris tertentu. */
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

      {/* Judul section */}
      <h3 style={styles.title}>Active Loans Overview</h3>

      {/* Card tabel */}
      <div style={styles.card}>
        <div className="loantable-wrap" style={styles.tableScroll}>
          <table className="loantable-inner" style={styles.table}>

            {/* Header kolom */}
            <thead>
              <tr>
                {COLUMNS.map((col) => (
                  <th
                    key={col.key}
                    className={col.hideOnMobile ? "col-hide-mobile" : ""}
                    style={styles.th}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {/* Baris data pinjaman */}
              {tableData.map((row, idx) => (
                <tr key={idx} style={{ borderBottom: "1px solid #F0F4FB" }}>
                  <td className="col-hide-mobile" style={styles.td}>{row.no}</td>
                  <td style={styles.tdNumeric}>{row.loanMoney}</td>
                  <td style={styles.tdNumeric}>{row.leftToRepay}</td>
                  <td className="col-hide-mobile" style={styles.td}>{row.duration}</td>
                  <td className="col-hide-mobile" style={styles.tdNumeric}>{row.rate}</td>
                  <td className="col-hide-mobile" style={styles.tdNumeric}>{row.installment}</td>
                  <td style={{ padding: "14px 16px 14px 0" }}>
                    <RepayButton
                      isActive={activeRows.has(idx)}
                      onClick={() => toggleRow(idx)}
                    />
                  </td>
                </tr>
              ))}

              {/* Baris total */}
              <tr>
                <td className="col-hide-mobile" style={styles.tdTotal}>Total</td>
                <td style={styles.tdTotalNumeric}>
                  {/* Label "Total" hanya muncul di mobile karena kolom SL No tersembunyi */}
                  <span className="total-mobile-label" style={styles.totalMobileLabel}>
                    Total
                  </span>
                  {TOTAL.loanMoney}
                </td>
                <td style={styles.tdTotalNumeric}>{TOTAL.leftToRepay}</td>
                <td className="col-hide-mobile" colSpan={2} />
                <td className="col-hide-mobile" style={styles.tdTotalNumeric}>{TOTAL.installment}</td>
                <td />
              </tr>
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}