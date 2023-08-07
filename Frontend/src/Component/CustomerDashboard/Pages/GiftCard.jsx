import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../Utility.js/Auth';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import jwt_decode from 'jwt-decode';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';

import {
  Typography,
  Button,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@mui/material';
import './GiftCard.css';
import SlidingComponent from './GiftCardSlider';

import GiftCards from './GiftCardDisplay';
import CardAbout from './GiftCardAbout';
import Banner from './GiftCardBanner';
import CouponBanner from './CouponBanner';

const GiftCardComponent = () => {
  const auth = useAuth(); // Assuming useAuth provides the auth object with the JWT token

  const [userAccountNumber, setUserAccountNumber] = useState('');
  const [giftCardName, setGiftCardName] = useState('AMAZON_GIFT_CARD');
  const [giftCardAmount, setGiftCardAmount] = useState('');
  const [targetUserName, setTargetUserName] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [giftCards, setGiftCards] = useState([]);
  const [showGiftCards, setShowGiftCards] = useState(false);
  const [user, setUser] = useState(null);
  const [showMessage, setMessage] = useState('');
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [discount, setDiscount] = useState(0);

  const handleCloseGiftCardSuccess = () => {
    setIsSuccessOpen(false);
  };

  useEffect(() => {
    // Fetch all gift cards for the current user
    const fetchGiftCards = async () => {
      try {
        const response = await axios.get('http://localhost:9091/giftcard/getAllGiftCardCurrentUser', {
          headers: {
            Authorization: `Bearer ${auth.jwt}`,
          },
        });
        setGiftCards(response.data);
      } catch (error) {
        console.error('Error fetching gift cards:', error);
      }
    };

    fetchGiftCards();
  }, [auth.jwt]);

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

      setUserAccountNumber(user.accountNumber);
    }
  }, [user]);
  if (!user) {
    return <div>Loading...</div>;
  }

  const applyCouponCode = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:9091/giftcard/getDiscountOnCouponCode/${couponCode}`, {
        headers: {
          Authorization: `Bearer ${auth.jwt}`,
        },
      });

      const discountAmount = response.data;
      setDiscount(discountAmount);
      if (discountAmount === 0) {
        setMessage('Invalid Coupon Code');
      } else {

        setMessage(`You received a discount of ${discountAmount}%`);
      }
      setIsSuccessOpen(true);
    } catch (error) {
      console.error('Error applying coupon code:', error);
      setMessage('Failed to apply coupon code. Please try again.');
      setIsSuccessOpen(true);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        userAccountNumber,
        giftCardName,
        giftCardAmount,
        targetUserName,
        couponCode,
      };

      const response = await axios.post('http://localhost:9091/giftcard/purchaseGiftCard', payload, {
        headers: {
          Authorization: `Bearer ${auth.jwt}`,
        },
      });
      setMessage('Gift card applied successfully....');
      setIsSuccessOpen(true);
      console.log('Gift card applied successfully:', response.data);

      // TODO: Handle successful response, e.g., show a success message to the user

      setLoading(false);
    } catch (error) {
      setMessage('Failed to apply gift card. Please try again.');
      setIsSuccessOpen(true);
      console.error('Error applying gift card:', error);
      setLoading(false);
    }
  };

  const handleViewAllGiftCards = async () => {
    try {
      const response = await axios.get('http://localhost:9091/giftcard/getAllGiftCardCurrentUser', {
        headers: {
          Authorization: `Bearer ${auth.jwt}`,
        },
      });
      setGiftCards(response.data);
      setShowGiftCards(true);
    } catch (error) {
      console.error('Error fetching gift cards:', error);
    }
  };

  const StyledTableContainer = styled(TableContainer)`
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.12);
`;

  const StyledTableCell = styled(TableCell)`
  font-weight: bold;
`;

  const StyledTableRow = styled(TableRow)`
  &:nth-of-type(even) {
    background-color: #f5f5f5;
  }
`;

  return (
    <div>
      <Banner></Banner>
      <Grid container spacing={1} style={{ marginTop: '11px' }}>
        <Grid item xs={12} sm={6}>
          <CardAbout />
        </Grid>
        <Grid item xs={12} sm={6}>
          <GiftCards />
        </Grid>
      </Grid>
      <div style={{display:'flex'}}>
        <div>
          <CouponBanner />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '60px', fontFamily: 'Roboto',marginLeft:'180px' }}>
          <div style={{ maxWidth: '600px' }}>
            <h2 style={{ textAlign: 'center' }}>Apply for Gift Card</h2>
            {error && <p>{error}</p>}
            <form style={{ border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9', padding: '15px' }}>
              <div style={{ marginBottom: '5px' }}>
                <label htmlFor="userAccountNumber">User Account Number:</label>
                <input
                  type="text"
                  id="userAccountNumber"
                  value={userAccountNumber}
                  onChange={(e) => setUserAccountNumber(e.target.value)}
                  required
                  placeholder="Enter user account number"
                  style={{ width: '100%', padding: '4px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label htmlFor="giftCardName">Gift Card Name:</label>
                <select
                  id="giftCardName"
                  value={giftCardName}
                  onChange={(e) => setGiftCardName(e.target.value)}
                  required
                  style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                >
                  <option value="">Select gift card name</option>
                  <option value="AMAZON_GIFT_CARD">Amazon Gift Card</option>
                  <option value="MYNTRA_GIFT_CARD">Myntra Gift Card</option>
                  <option value="ZOMATO_GIFT_CARD">Zomato Gift Card</option>
                  <option value="FLIPKART_GIFT_CARD">Flipkart Gift Card</option>
                  <option value="SWIGGY_GIFT_CARD">Swiggy Gift Card</option>
                </select>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label htmlFor="giftCardAmount">Gift Card Amount:</label>
                <input
                  type="number"
                  id="giftCardAmount"
                  value={giftCardAmount}
                  onChange={(e) => setGiftCardAmount(e.target.value)}
                  required
                  placeholder="Enter gift card amount"
                  style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label htmlFor="targetUserName">Target Email ID:</label>
                <input
                  type="text"
                  id="targetUserName"
                  value={targetUserName}
                  onChange={(e) => setTargetUserName(e.target.value)}
                  placeholder="Enter target email ID"
                  style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label htmlFor="couponCode">Coupon Code:</label>
                <input
                  type="text"
                  id="couponCode"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter Coupon Code"
                  style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                <button
                  onClick={(e) => applyCouponCode(e)}
                  style={{ marginLeft: '10px', padding: '8px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}
                >
                  Apply
                </button>
              </div>
              <br />
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#4caf50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                {loading ? 'Applying...' : 'Apply Gift Card'}
              </button>
            </form>
            <Modal open={isSuccessOpen} onClose={handleCloseGiftCardSuccess} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Card sx={{ width: '60%', maxWidth: 400 }}>
                <CardContent>
                  <Typography variant="h6" component="div" align="center" gutterBottom>
                    {showMessage}
                  </Typography>
                </CardContent>
              </Card>
            </Modal>

          </div>
        </div>
      </div>

      <br />
      <Button variant="contained" onClick={handleViewAllGiftCards} style={{ background: '#861f41' }}>
        View All Gift Cards
      </Button>
      {showGiftCards && (
        <div style={{ overflowX: 'scroll', width: '1100px' }}>
          <StyledTableContainer component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <StyledTableCell style={{ background: '#861f41', color: 'white' }}>Gift Card ID</StyledTableCell>
                  <StyledTableCell style={{ background: '#861f41', color: 'white' }}>User Name</StyledTableCell>
                  <StyledTableCell style={{ background: '#861f41', color: 'white' }}>Target User Name</StyledTableCell>
                  <StyledTableCell style={{ background: '#861f41', color: 'white' }}>User Account Number</StyledTableCell>
                  <StyledTableCell style={{ background: '#861f41', color: 'white' }}>Purchase Date</StyledTableCell>
                  <StyledTableCell style={{ background: '#861f41', color: 'white' }}>Gift Card Status</StyledTableCell>
                  <StyledTableCell style={{ background: '#861f41', color: 'white' }}>Gift Card Name</StyledTableCell>
                  <StyledTableCell style={{ background: '#861f41', color: 'white' }}>Gift Card Amount</StyledTableCell>
                  <StyledTableCell style={{ background: '#861f41', color: 'white' }}>Redeem Code</StyledTableCell>
                  <StyledTableCell style={{ background: '#861f41', color: 'white' }}>Valid From</StyledTableCell>
                  <StyledTableCell style={{ background: '#861f41', color: 'white' }}>Valid To</StyledTableCell>
                  <StyledTableCell style={{ background: '#861f41', color: 'white' }}>Gift Card Number</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {giftCards.map((giftCard) => (
                  <StyledTableRow key={giftCard.giftCardId}>
                    <TableCell>{giftCard.giftCardId}</TableCell>
                    <TableCell>{giftCard.userName}</TableCell>
                    <TableCell>{giftCard.targetUserName}</TableCell>
                    <TableCell>{giftCard.userAccountNumber}</TableCell>
                    <TableCell>{giftCard.purchaseDate}</TableCell>
                    <TableCell>{giftCard.giftCardStatus}</TableCell>
                    <TableCell>{giftCard.giftCardName}</TableCell>
                    <TableCell>{giftCard.giftCardAmount}</TableCell>
                    <TableCell>{giftCard.reedemCode}</TableCell>
                    <TableCell>{giftCard.validFrom}</TableCell>
                    <TableCell>{giftCard.validTo}</TableCell>
                    <TableCell>{giftCard.giftCardNumber}</TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>
        </div>
      )}
    </div>
  );
};

export default GiftCardComponent;