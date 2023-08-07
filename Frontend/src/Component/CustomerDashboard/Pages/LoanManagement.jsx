import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Typography, Grid, Button } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../../../Utility.js/Auth';
import LoanCards from './LoanCards';
import Banner from './LoanBanner';
import './LoanTable.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';
import EmiCalculator from './EMICalculator';

const LoanManagement = () => {
  const auth = useAuth();
  const [loanList, setLoanList] = useState([]);

  useEffect(() => {
    // Fetch loan data from the API
    const fetchLoanList = async () => {
      try {
        const response = await axios.get('http://localhost:9091/loan/getListOfLoanForCurrentUser', {
          headers: {
            Authorization: `Bearer ${auth.jwt}`,
          },
        });
        setLoanList(response.data);
      } catch (error) {
        console.error('Error fetching loan list:', error);
      }
    };

    fetchLoanList();
  }, [auth.jwt]);

  return (
    <div>
      <Banner></Banner>
      <div style={{marginTop: '10px',width:'1145px' }}>
        <LoanCards></LoanCards>
      </div>
      <div>
        <EmiCalculator/>
      </div>
      <div style={{ textAlign: 'center', margin: '40px 0' }}>
        <FontAwesomeIcon icon={faList} style={{ fontSize: '24px', marginRight: '10px' }} />
        <h3 style={{ display: 'inline-block', fontSize: '24px', fontWeight: 'bold' }}>Active Loans</h3>
      </div>

      {loanList.length > 0 ? (
        <div className="loan-container" style={{ marginBottom: '40px'}}> 
          {loanList.map((loan) => (
            loan.approvalDate && (
              <div key={loan.loanId} className="loan-card">
                <div className="loan-card-header">
                  <h3 className="loan-card-title"> {loan.loanType}</h3>
                  <span className="loan-card-status">{loan.loanStatus}</span>
                </div>
                <div className="loan-card-body">
                  <p><strong>Loan ID:</strong> {loan.loanId}</p>
                  <p><strong>Loan Amount:</strong> ₹ {loan.loanAmount}</p>
                  <p><strong>Remaining Loan Amount:</strong> ₹ {loan.remainingLoanAmount}</p>
                  <p><strong>Monthly EMI:</strong> ₹ {loan.monthyEMI}</p>
                  <p><strong>Rate of Interest:</strong> {loan.rateOfInterest}</p>
                  <p><strong>No. of Installments:</strong> {loan.noOfInstallements}</p>
                  <p><strong>Application Date:</strong> {loan.applicationDate}</p>
                  <p><strong>Approval Date:</strong> {loan.approvalDate}</p>
                  <p><strong>Loan Start Date:</strong> {loan.loanStartDate}</p>
                  <p><strong>Loan End Date:</strong> {loan.loanEndDate}</p>
                </div>
                <div className="loan-card-actions">
                  <Link to={`/apnabank/customer/repayment/${loan.loanId}`} className="repayment-link">Repayment</Link>
                </div>
              </div>
            )
          ))}
        </div>
      ) : (
        <p style={{ marginTop: '20px', fontSize: '25px', fontFamily: 'Roboto' }}>No loans found.</p>
      )}
    </div>
  );
};

export default LoanManagement;