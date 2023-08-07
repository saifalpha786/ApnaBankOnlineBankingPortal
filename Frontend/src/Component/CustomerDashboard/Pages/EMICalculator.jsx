import React, { useState } from 'react';
import InputSlider from 'react-input-slider';

const EmiCalculator = () => {
  const [principal, setPrincipal] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [tenureMonths, setTenureMonths] = useState(12);
  const [emi, setEmi] = useState(0);
  const [loanType, setLoanType] = useState('');

  const calculateEmi = () => {
    const p = parseFloat(principal);
    const r = parseFloat(interestRate) / 100 / 12;
    const n = parseFloat(tenureMonths);

    if (p && r && n) {
      const emiAmount = Math.round((p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
      setEmi(emiAmount);
    } else {
      setEmi(0);
    }
  };

  const styles = {
    emiCalculator: {
      maxWidth: '400px',
      margin: '0 auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    h2: {
      textAlign: 'center',
      marginBottom: '20px',
    },
    inputGroup: {
      marginBottom: '10px',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: 'bold',
    },
    input: {
      width: '100%',
      padding: '8px',
      border: '1px solid #ccc',
      borderRadius: '4px',
    },
    button: {
      display: 'block',
      width: '100%',
      marginTop: '20px',
      padding: '10px',
      backgroundColor: '#861f41',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    result: {
      marginTop: '20px',
      textAlign: 'center',
      fontSize: '20px',
      fontWeight: 'bold',
    },
  };

  return (
    <div style={styles.emiCalculator}>
      <h2 style={styles.h2}>EMI Calculator</h2>
      <div style={styles.inputGroup}>
        <label htmlFor="loanType">Loan Type:</label>
        <select
          id="loanType"
          value={loanType}
          onChange={(e) => setLoanType(e.target.value)}
        >
          <option value="">Select Loan Type</option>
          <option value="home">Home Loan</option>
          <option value="car">Car Loan</option>
          <option value="personal">Personal Loan</option>
        </select>
      </div>
      <div style={styles.inputGroup}>
        <label htmlFor="principal">Principal Amount:</label>
        <input
          type="number"
          id="principal"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
          style={styles.input}
        />
      </div>
      <div style={styles.inputGroup}>
        <label htmlFor="interestRate">Interest Rate:</label>
        <input
          type="number"
          id="interestRate"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
          style={styles.input}
        />
      </div>
      <div style={styles.inputGroup}>
        <label htmlFor="tenure">Loan Tenure (in months):</label>
        <InputSlider
          axis="x"
          x={tenureMonths}
          xmin={1}
          xmax={120}
          onChange={({ x }) => setTenureMonths(x)}
        />
        <div className="slider-value">{tenureMonths} months</div>
      </div>
      <button style={styles.button} onClick={calculateEmi}>
        Calculate EMI
      </button>
      <div style={styles.result}>
        <label>EMI Amount:</label>
        <span>{emi}</span>
      </div>
    </div>
  );
};

export default EmiCalculator;
