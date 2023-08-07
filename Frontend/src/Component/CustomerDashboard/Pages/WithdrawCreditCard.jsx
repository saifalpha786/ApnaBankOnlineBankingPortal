import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../Utility.js/Auth';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';

const WithdrawCreditCard = () => {
  const auth = useAuth();
  const [creditCardNumber, setCreditCardNumber] = useState('');
  const [cardVerificationValue, setCardVerificationValue] = useState('');
  const [validTo, setValidTo] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleWithdraw = () => {
    const requestData = {
      creditCardNumber: creditCardNumber,
      cardVerificationValue: cardVerificationValue,
      validTo: validTo,
    
    };
    console.log(requestData)
    console.log(withdrawAmount)
    axios
      .post(
        `http://localhost:9091/creditcard/withdrawFromCreditCard/${withdrawAmount}`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${auth.jwt}`,
          },
        }
      )
      .then((response) => {
        setSuccessMessage('Withdrawal successful!');
        setErrorMessage('');
      })
      .catch((error) => {
        setSuccessMessage('');
        setErrorMessage('Error withdrawing from credit card.');
        console.error('Withdrawal error:', error);
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
          Withdraw from Credit Card
        </Typography>
        <form>
          <TextField
            label="Credit Card Number"
            type="text"
            value={creditCardNumber}
            onChange={(e) => setCreditCardNumber(e.target.value)}
            fullWidth
            margin="normal"
            placeholder="Enter credit card number"
          />
          <TextField
            label="Card Verification Value"
            type="number"
            value={cardVerificationValue}
            onChange={(e) => setCardVerificationValue(e.target.value)}
            fullWidth
            margin="normal"
            placeholder="Enter card verification value"
          />
           <TextField
            label="Valid to"
            type="text"
            value={validTo}
            onChange={(e) => setValidTo(e.target.value)}
            fullWidth
            margin="normal"
            placeholder="Enter Valid to Date In yyyy-MM-dd "
          />
          {/* <DatePicker
            selected={validTo}
            onChange={setValidTo}
            dateFormat="yyyy-MM-dd"
            placeholderText="yyyy-mm-dd"
            className="form-control mt-4" 
           
          /> */}
          <TextField
            label="Withdraw Amount"
            type="number"
            id="withdrawAmount"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleWithdraw}
            fullWidth
          >
            Withdraw
          </Button>
        </form>
        {successMessage && <Typography style={{ color: 'green' }}>{successMessage}</Typography>}
        {errorMessage && <Typography color="error">{errorMessage}</Typography>}
      </Box>
    </Box>
  );
};

export default WithdrawCreditCard;