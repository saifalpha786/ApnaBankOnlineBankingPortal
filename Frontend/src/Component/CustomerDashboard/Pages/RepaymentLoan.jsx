import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../../Utility.js/Auth';

const RepaymentLoan = () => {
  const { loanId } = useParams();
  const auth = useAuth();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRepayment = () => {
    // Make the repayment API call
    axios
      .post(`http://localhost:9091/loan/loanRepayment/${loanId}`, null, {
        headers: {
          Authorization: `Bearer ${auth.jwt}`,
        },
      })
      .then((response) => {
        // Handle successful repayment
        setSuccessMessage('Repayment successful!');
        setErrorMessage('');
        console.log('Repayment successful:', response.data);
      })
      .catch((error) => {
        // Handle error
        setSuccessMessage('');
        setErrorMessage('Error making repayment.');
        console.error('Error repaying loan:', error);
      });
  };


  const handleDownloadStatement = () => {
    axios
      .get(`http://localhost:8083/loan/getPdfOfLoanByLoanId/${loanId}`, {
        responseType: 'blob', // Set response type to blob
      })
      .then((response) => {
        // Create a URL for the blob data
        const url = window.URL.createObjectURL(new Blob([response.data]));

        // Create a link element and click it to download the file
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `LoanStatement-${loanId}.pdf`);
        document.body.appendChild(link);
        link.click();

        // Clean up the URL and remove the link element
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);

        setErrorMessage('');
      })
      .catch((error) => {
        setErrorMessage('Error downloading loan statement.');
        console.error('Error downloading loan statement:', error);
      });
  };

  return (
    <div>
      <h1>Repayment Loan</h1>
      <p>Loan ID: {loanId}</p>
      <button onClick={handleRepayment} style={{background:'#861f41',color:'white'}}>Repay Loan</button>
      <button onClick={handleDownloadStatement} style={{background:'#861f41',color:'white'}}>Download Loan Statement</button>
      <div>
        {successMessage && <p>{successMessage}</p>}
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default RepaymentLoan;