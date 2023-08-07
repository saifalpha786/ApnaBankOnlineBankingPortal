import React, { useEffect, useState } from 'react';
import { Card, Typography, Grid, Button, CardContent, CardMedia, CardActions } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import cardImage from '../../../Images/abstract-background-with-patterned-glass-texture.jpg';
import './CreditCard.css';
import { Link } from 'react-router-dom';
import { BsCreditCard2BackFill } from 'react-icons/bs';
import { BiMoneyWithdraw } from 'react-icons/bi';
import { FcDocument } from 'react-icons/fc'
import jwt_decode from 'jwt-decode';
import axios from 'axios';

const CreditCard = () => {
  const [creditCards, setCreditCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [user, setUser] = useState(null);
  const [customerName, setCustomerName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('jwt');

    fetch('http://localhost:9091/creditcard/getListOfCreditCardForCurrentUser', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const creditCardArray = Array.isArray(data) ? data : [];
        setCreditCards(creditCardArray);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleViewDetails = (card) => {
    setSelectedCard(card === selectedCard ? null : card);
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

      setCustomerName(`${user.userAccount.userFirstName} ${user.userAccount.userLastName}`);
    }
  }, [user]);
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Grid container spacing={2} >
      {creditCards.map((card) => (
        // Add a conditional statement to check if the necessary card details are present
        (card.creditCardNumber && card.validTo && card.cardVerificationValue && card.creditCardStatus === 'ACTIVE') ? (
          <Grid item key={card.creditCardId} xs={12} sm={6} md={4}>
            <div className="card-container">
              <div
                className={`card ${selectedCard === card ? 'flipped' : ''}`}
                onClick={() => handleViewDetails(card)}
                style={{
                  width: '390px',
                  height: '230px',
                  borderRadius: '20px',
                  backgroundImage: `url(${cardImage})`,
                  backgroundSize: 'cover',
                  color: 'antiquewhite',
                  margin: '10px',
                  position: 'relative',
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.6s',
                }}
              >
                <div className="card-inner">
                  <div className="card-front">
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={8} container alignItems="center">
                        <CreditCardIcon sx={{ fontSize: 40 }} />
                        <Typography variant="h6" style={{ marginLeft: '10px' }}>
                          Apna Bank
                        </Typography>
                        <Typography variant="subtitle1" style={{ color: 'gray' }}>{card.creditCardType}</Typography>
                      </Grid>
                      <Grid item xs={4} style={{ marginTop: '50px' }}>
                        <Typography variant="body1">{customerName}</Typography>
                      </Grid>
                      <Grid item xs={12} style={{ marginTop: '50px' }}>
                        <Typography variant="body1">Card Number: {card.creditCardNumber}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="body1">Valid To: {card.validTo}</Typography>
                      </Grid>

                      {/* <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant="outlined">View Details</Button>
                      </Grid> */}
                    </Grid>
                  </div>
                  <div className="card-back">
                    <Grid container spacing={2} alignItems="center" >
                      <Grid item xs={12}>
                        <Typography variant="h6">Credit Card Details</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="body1">Credit Card Limit: {card.creditCardLimit}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="body1">Outstanding Amount: {card.totalOutstanding}</Typography>
                      </Grid>

                      <Grid item xs={6}>
                        <div style={{ background: 'white', padding: '7px',width:'370px' }}>
                          <Typography variant="body1" style={{textAlign:'right',color:'black'}}> CVV: {card.cardVerificationValue}</Typography>
                          {/* Add the rest of your card content here */}
                        </div>
                      </Grid>
                      
                    </Grid>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
        ) : null
      ))}
      <Grid container spacing={2}>
        <Grid item xs={3} style={{ fontSize: '20px' }}>
          <Card style={{ height: '190px', width: '200px', boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.3)', marginLeft: '40px', background: 'aliceblue', marginTop: '30px', borderRadius: '15px' }} elevation={3}>
            <CardContent style={{ padding: '8px' }}>
              <BsCreditCard2BackFill size={100} color="#000" style={{ marginBottom: '-10px' }} />
            </CardContent>
            <CardActions style={{ paddingTop: '0px' }}>
              <Button
                variant="outlined"
                component={Link}
                to="/apnabank/customer/applyCreditCard"
                style={{ background: '#861f41', color: 'white', borderRadius: '5px' }}
                fullWidth
              >
                Apply For New Credit Card
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card style={{ height: '190px', width: '200px', boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.3)', marginLeft: '20px', background: 'aliceblue', marginTop: '30px', marginBottom: '50px', borderRadius: '15px' }} elevation={3}>
            <CardContent style={{ padding: '8px' }}>
              <BiMoneyWithdraw size={100} color="#000" style={{ marginBottom: '-10px' }} />
            </CardContent>
            <CardActions>
              <Button
                variant="outlined"
                component={Link}
                to="/apnabank/customer/withdrawCreditCard"
                style={{ background: '#861f41', color: 'white', borderRadius: '5px' }}
                fullWidth
              >
                Withdraw From Credit Card
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card style={{ height: '190px', width: '200px', boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.3)', marginLeft: '20px', background: 'aliceblue', marginTop: '30px', marginBottom: '50px', borderRadius: '15px' }} elevation={3}>
            <CardContent style={{ padding: '8px' }}>
              <BsCreditCard2BackFill size={100} color="#000" style={{ marginBottom: '-10px' }} />
            </CardContent>
            <CardActions>
              <Button
                variant="outlined"
                component={Link}
                to="/apnabank/customer/repaymentCreditCard"
                style={{ background: '#861f41', color: 'white', borderRadius: '5px' }}
                fullWidth
              >
                Repayment of Credit Card
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card style={{ height: '190px', width: '200px', boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.3)', marginLeft: '20px', marginTop: '30px', background: 'aliceblue', marginBottom: '50px', borderRadius: '15px' }} elevation={3}>
            <CardContent style={{ padding: '8px' }}>
              <FcDocument size={100} color="#000" style={{ marginBottom: '-10px' }} />
            </CardContent>
            <CardActions>
              <Button
                variant="outlined"
                component={Link}
                to="/apnabank/customer/statementCreditCard"
                style={{ background: '#861f41', color: 'white', borderRadius: '5px' }}
                fullWidth
              >
                Statement Of Credit Card
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

    </Grid>
  );
};

export default CreditCard;