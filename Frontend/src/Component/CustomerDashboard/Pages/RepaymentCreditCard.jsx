import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../Utility.js/Auth';
import {  Typography } from '@mui/material';
import { Box } from '@mui/system';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const RepaymentCreditCard = () => {
  const auth = useAuth();
  const [creditCardNumber, setCreditCardNumber] = useState('');
  const [repaymentAmount, setRepaymentAmount] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRepayment = () => {
    axios
      .post(
        `http://localhost:9091/creditcard/repaymentOfCreditCard/${creditCardNumber}/${repaymentAmount}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${auth.jwt}`,
          },
        }
      )
      .then((response) => {
        setSuccessMessage('Repayment successful!');
        setErrorMessage('');
      })
      .catch((error) => {
        setSuccessMessage('');
        setErrorMessage('Error making repayment.');
        console.error('Repayment error:', error);
      });
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="70vh"
    >
      <Box
        width={400}
        p={3}
        border={1}
        borderRadius={5}
        bgcolor="#f9f9f9"
        marginLeft={70}
        marginTop={1}
      >
        <Typography variant="h4" gutterBottom>
          Repayment of Credit Card
        </Typography>
        <form>
          <TextField
            label="Credit Card Number"
            type="text"
            value={creditCardNumber}
            onChange={(e) => setCreditCardNumber(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Repayment Amount"
            type="number"
            id="repaymentAmount"
            value={repaymentAmount}
            onChange={(e) => setRepaymentAmount(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleRepayment}
            fullWidth
          >
            Repay
          </Button>
        </form>
        {successMessage && <Typography color="primary">{successMessage}</Typography>}
        {errorMessage && <Typography color="error">{errorMessage}</Typography>}
      </Box>
    </Box>
  );
};

export default RepaymentCreditCard;