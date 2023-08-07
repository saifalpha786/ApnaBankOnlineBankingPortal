import React, { useEffect,useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  MenuItem,
  Card,
} from '@mui/material';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

const ApplyCreditCard = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [creditCardType, setCreditCardType] = useState('');
  const [customerAccountNumber, setCustomerAccountNumber] = useState('');
  const [aadharCardNumber, setAadharCardNumber] = useState('');
  const [panCard, setPanCard] = useState('');
  const [workType, setWorkType] = useState('');
  const [monthlyEarning, setMonthlyEarning] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [user, setUser] = useState(null);

  const steps = ['Credit Card Type', 'Account Details', 'Additional Information'];
  const handleWorkTypeChange = (e) => {
    setWorkType(e.target.value);
  };


  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
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
    e.preventDefault();

    // Handle form submission based on the active step
    if (activeStep === 2) {
      const data = {
        creditCardType: creditCardType,
        requiredDocument: {
          customerAccountNumber: parseInt(customerAccountNumber),
          aadharCardNumber: aadharCardNumber,
          panCard: panCard,
          workType: workType,
          monthlyEarning: parseInt(monthlyEarning),
        },
      };

      const token = localStorage.getItem('jwt');

      fetch('http://localhost:9091/creditcard/applyForNewCreditCard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.text())
        .then((text) => {
          if (text === 'Applied Successfully') {
            setSuccessMessage('Credit card application submitted successfully!');
          } else {
            setSuccessMessage(
              'An error occurred while submitting the credit card application.'
            );
          }
        })
        .catch((error) => {
          console.error(error);
          setSuccessMessage(
            'An error occurred while submitting the credit card application.'
          );
        });
    } else {
      handleNext();
    }
  };

  // Define the credit card options
  const creditCardOptions = [
    'IndianOil_Credit_Card',
    'Flipkart_Credit_Card',
    'Vistara_Credit_Card',
    'Platinum_Credit_Card',
    'Airtel_Credit_Card',
    'MyZone_Credit_Card',
  ];

  return (
    <Card style={{ width: '800px',height:'300px', margin: '0 auto', padding: '20px', marginTop: '40px', borderRadius: '20px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)' }}>
    <Typography variant="h6" style={{textAlign:'center',color:'#861f41'}}>Apply for a New Credit Card</Typography>
    <Stepper activeStep={activeStep} alternativeLabel>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
    <form onSubmit={handleSubmit}>
      {activeStep === 0 && (
        <div style={{marginTop:'45px'}}>
          <TextField
            label="Credit Card Type"
            value={creditCardType}
            onChange={(e) => setCreditCardType(e.target.value)}
            
            required
            select
            fullWidth
          >
            {creditCardOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </div>
      )}
      {activeStep === 1 && (
        <div style={{ display: 'flex', gap: '10px',marginTop:'45px' }}>
          <TextField
            label="Customer Account Number"
            value={customerAccountNumber}
            onChange={(e) => setCustomerAccountNumber(e.target.value)}
            required
            type="number"
            style={{ height: '11px' }}
            fullWidth
          />
          <TextField
            label="Aadhar Card Number"
            value={aadharCardNumber}
            onChange={(e) => setAadharCardNumber(e.target.value)}
            required
            style={{ height: '50px' }}
            fullWidth
          />
          <TextField
            label="PAN Card"
            value={panCard}
            onChange={(e) => setPanCard(e.target.value)}
            required
            style={{ height: '50px' }}
            fullWidth
          />
        </div>
      )}
      {activeStep === 2 && (
        <div style={{ display: 'flex', gap: '10px' }}>
          <TextField
            label="Work Type"
            value={workType}
            onChange={handleWorkTypeChange}
            required
            select
            style={{ height: '40px', width: '150px' }}
            fullWidth
          >
            <MenuItem value="BUSINESS">BUSINESS</MenuItem>
            <MenuItem value="SERVICE">SERVICE</MenuItem>
          </TextField>
          <TextField
            label="Monthly Earning"
            value={monthlyEarning}
            onChange={(e) => setMonthlyEarning(e.target.value)}
            required
            type="number"
            fullWidth
          />
        </div>
      )}
      <Button disabled={activeStep === 0} onClick={handleBack} style={{ marginTop: '20px',color:'#861f41' }}>
        Back
      </Button>
      <Button variant="contained" type="submit" style={{ marginTop: '20px' ,background:'#861f41'}}>
        {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
      </Button>
    </form>
    {successMessage && <Typography variant="body1">{successMessage}</Typography>}
  </Card>
  );
};

export default ApplyCreditCard;