import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../Utility.js/Auth';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, TextField, IconButton, Box, Grid } from '@mui/material';

const GiftCard = () => {
  const [couponCode, setCouponCode] = useState('');
  const [discountOnCode, setDiscountOnCode] = useState('');
  const [showMessage, setMessage] = useState('');
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [showAddConfirmation, setShowAddConfirmation] = useState(false);
  const [couponCodes, setCouponCodes] = useState([]);
  const auth = useAuth();

  useEffect(() => {
    getCouponCodes();
  }, []);

  const getCouponCodes = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${auth.jwt}`,
      };

      const response = await axios.get(
        'http://localhost:9091/giftcard/getListOfCouponCode',
        { headers }
      );

      setCouponCodes(response.data);
    } catch (error) {
      console.error('Error fetching coupon codes:', error);
    }
  };

  const deleteCouponCode = async (code) => {
    try {
      const headers = {
        Authorization: `Bearer ${auth.jwt}`,
      };

      await axios.delete(
        `http://localhost:9091/giftcard/deleteCouponCode/${code}`,
        { headers }
      );

      setMessage('Coupon code deleted successfully.');
      setIsSuccessOpen(true);

      // Refresh the coupon codes list
      getCouponCodes();
    } catch (error) {
      console.error('Error deleting coupon code:', error);
      setMessage('Failed to delete the coupon code.');
      setIsSuccessOpen(true);
    }
  };

  const cancelAddGiftCard = () => {
    setShowAddConfirmation(false);
  };

  const addGiftCard = (e) => {
    e.preventDefault();
    setShowAddConfirmation(true);
  };

  const handleCloseGiftCardSuccess = () => {
    setIsSuccessOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const headers = {
        Authorization: `Bearer ${auth.jwt}`,
      };

      const data = {
        couponCode,
        discountOnCode,
      };

      const response = await axios.post(
        'http://localhost:9091/giftcard/addCouponCode',
        data,
        { headers }
      );

      console.log('Coupon code added:', response.data);
      setMessage('Coupon code added successfully.');
      setIsSuccessOpen(true);

      // Refresh the coupon codes list
      getCouponCodes();
    } catch (error) {
      console.error('Error adding coupon code:', error);
      setMessage('Failed to add the coupon code.');
      setIsSuccessOpen(true);
    }
    setShowAddConfirmation(false);
  };

  return (
    <div>
      <h2 style={{ marginBottom: '20px' }}>Add Gift Card Coupon Code</h2>
      <form style={{ marginBottom: '20px' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={8}>
            <TextField
              fullWidth
              variant="outlined"
              label="Coupon Code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              fullWidth
              variant="outlined"
              label="Discount"
              type="number"
              value={discountOnCode}
              onChange={(e) => setDiscountOnCode(e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              variant="contained"
              color="primary"
              style={{ backgroundColor: '#861f41',width:'210px',height:'40px' }}
              onClick={addGiftCard}
              fullWidth
            >
              Add Coupon Code
            </Button>
          </Grid>
        </Grid>
      </form>

      <Button
        variant="contained"
        color="primary"
        style={{ backgroundColor: '#861f41', marginBottom: '20px' }}
        onClick={getCouponCodes}
      >
       All Coupon Codes
      </Button>

      {couponCodes.map((coupon) => (
        <Card key={coupon.couponCode} sx={{ marginBottom: '10px' }}>
          <CardContent>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography variant="body1">
                  <strong>Coupon Code:</strong> {coupon.couponCode}
                </Typography>
                <Typography variant="body1">
                  <strong>Discount:</strong> {coupon.discountOnCode}
                </Typography>
              </Grid>
              <Grid item>
                <IconButton
                  color="error"
                  onClick={() => deleteCouponCode(coupon.couponCode)}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}

      {isSuccessOpen && (
        <Box
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '4px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography variant="h6" gutterBottom>
            {showMessage}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            style={{ backgroundColor: '#861f41' }}
            onClick={handleCloseGiftCardSuccess}
          >
            Close
          </Button>
        </Box>
      )}

      {showAddConfirmation && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 999,
          }}
        >
          <Card
            sx={{
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '4px',
              width: '300px',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Confirm Creation
            </Typography>
            <Typography variant="body1" gutterBottom>
              Are you sure you want to delete this coupon code?
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: '20px',
              }}
            >
              <Button
                variant="contained"
                color="primary"
                style={{ backgroundColor: '#861f41', marginRight: '10px' }}
                onClick={handleSubmit}
              >
                Yes
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={cancelAddGiftCard}
              >
                No
              </Button>
            </Box>
          </Card>
        </Box>
      )}
    </div>
  );
};

export default GiftCard;
