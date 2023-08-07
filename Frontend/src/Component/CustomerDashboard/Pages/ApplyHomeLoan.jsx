import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../Utility.js/Auth';
import { Stepper, Step, StepLabel, Button, Typography, Card } from '@mui/material';
import { Input } from '@mui/icons-material';
import jwt_decode from 'jwt-decode';

const ApplyHomeLoan = () => {
  const auth = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [loanType, setLoanType] = useState('HOME_LOAN');
  const [loanAmount, setLoanAmount] = useState(0);
  const [customerAccountNumber, setCustomerAccountNumber] = useState('');
  const [aadharCardNumber, setAadharCardNumber] = useState('');
  const [panCard, setPanCard] = useState('');
  const [workType, setWorkType] = useState('');
  const [monthlyEarning, setMonthlyEarning] = useState(0);
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState(null);

  const steps = ['Loan Type', 'Loan Details', 'Required Documents'];

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


  useEffect(() => {
    const token = localStorage.getItem('jwt');
    const decodedToken = jwt_decode(token);
    const userName = decodedToken.sub;

    axios
      .get(`http://localhost:9091/account/getUserAccountByUserName/${userName}`)
      .then(response => {
        const userData = response.data;
        setUser(userData);
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
      });
  }, []);

  useEffect(() => {
    if (user) {

      setCustomerAccountNumber(user.accountNumber);
      setAadharCardNumber(user.userAccount.userAadharCard);
      setPanCard(user.userAccount.userPanCard);
    }
  }, [user]);
  if (!user) {
    return <div>Loading...</div>;
  }


  const handleSubmit = (e) => {
    // Create the request payload
    e.preventDefault();
    if (activeStep === 2) {
      const requestData = {
        loanType: loanType || 'DEFAULT_LOAN_TYPE',
        loanAmount,
        requiredDocument: {
          customerAccountNumber,
          aadharCardNumber,
          panCard,
          workType,
          monthlyEarning,
          customerPhoneNumber,
        },
      };

      // Send the POST request
      axios
        .post('http://localhost:9091/loan/applyForNewLoan', requestData, {
          headers: {
            Authorization: `Bearer ${auth.jwt}`,
          },
        })
        .then((response) => {
          setSuccessMessage('Loan application submitted successfully!');
          setErrorMessage('');
          console.log('Loan application submitted successfully:', response.data);
          // Reset the form
          setLoanType('');
          setLoanAmount(0);
          setCustomerAccountNumber('');
          setAadharCardNumber('');
          setPanCard('');
          setWorkType('');
          setMonthlyEarning(0);
          setCustomerPhoneNumber('');
          // Move to the next step
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        })
        .catch((error) => {
          setSuccessMessage('');
          setErrorMessage('Error submitting loan application.');
          console.error('Error submitting loan application:', error);
        });
    } else {
      handleNext();
    }
  };

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <div style={{ marginTop: '50px', fontFamily: 'Roboto' }}>
            <label htmlFor="loanType">Loan Type:</label>
            <input
              id="loanType"
              value={loanType}
              onChange={(e) => setLoanType(e.target.value)}
              required
              type="Text"
            />
          </div>
        );
      case 1:
        return (
          <div style={{ marginTop: '40px', fontFamily: 'Roboto' }}>
            <label htmlFor="loanAmount">Loan Amount:</label>
            <input
              id="loanAmount"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              required
              type="number"
            />
          </div>
        );
      case 2:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', width: '350px', fontFamily: 'Roboto' }}>
            <label htmlFor="customerAccountNumber">Customer Account Number:</label>
            <input
              type="text"
              id="customerAccountNumber"
              value={customerAccountNumber}
              onChange={(e) => setCustomerAccountNumber(e.target.value)}
              required
              style={{ marginBottom: '10px' }}
              placeholder="Enter customer account number"
            />

            <label htmlFor="aadharCardNumber">Aadhar Card Number:</label>
            <input
              type="text"
              id="aadharCardNumber"
              value={aadharCardNumber}
              onChange={(e) => setAadharCardNumber(e.target.value)}
              required
              style={{ marginBottom: '10px' }}
              placeholder="Enter Aadhar card number"
            />

            <label htmlFor="panCard">PAN Card:</label>
            <input
              type="text"
              id="panCard"
              value={panCard}
              onChange={(e) => setPanCard(e.target.value)}
              required
              style={{ marginBottom: '10px' }}
              placeholder="Enter PAN card"
            />

            <label htmlFor="workType">Work Type:</label>
            <select
              id="workType"
              value={workType}
              onChange={(e) => setWorkType(e.target.value)}
              required
              style={{ marginBottom: '10px' }}
            >
              <option value="">Select Work Type</option>
              <option value="BUSINESS">Business</option>
              <option value="SERVICE">Service</option>
            </select>

            <label htmlFor="monthlyEarning">Monthly Earning:</label>
            <input
              id="monthlyEarning"
              value={monthlyEarning}
              onChange={(e) => setMonthlyEarning(e.target.value)}
              required
              type="number"
              style={{ marginBottom: '10px' }}
              placeholder="Enter monthly earning"
            />

            <label htmlFor="customerPhoneNumber">Customer Phone Number:</label>
            <input
              type="text"
              id="customerPhoneNumber"
              value={customerPhoneNumber}
              onChange={(e) => setCustomerPhoneNumber(e.target.value)}
              required
              style={{ marginBottom: '10px' }}
              placeholder="Enter customer phone number"
            />
          </div>




        );
      default:
        return null;
    }
  };

  return (
    <Card style={{ width: '800px', margin: '0 auto', marginTop: '40px', padding: '20px' }}>
      <Typography variant="h6" align="center" gutterBottom style={{ color: '#861f41' }}>
        Apply for Loan
      </Typography>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <form onSubmit={handleSubmit}>
        {/* <Typography variant="h6" align="center" gutterBottom>
          {steps[activeStep]}
        </Typography> */}
        {getStepContent(activeStep)}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <Button disabled={activeStep === 0} onClick={handleBack} style={{ color: '#861f41' }}>
            Back
          </Button>
          <Button variant="contained" type="submit" style={{ background: '#861f41' }}>
            {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
          </Button>
        </div>
      </form>
      {successMessage && (
        <Typography variant="body1" align="center" style={{ color: 'green' }}>
          {successMessage}
        </Typography>
      )}
      {errorMessage && (
        <Typography variant="body1" align="center" style={{ color: 'red' }}>
          {errorMessage}
        </Typography>
      )}
    </Card>
  );
};

export default ApplyHomeLoan;