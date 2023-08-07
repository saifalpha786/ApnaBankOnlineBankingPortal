import { GetLocation } from '../../GetLocation';
import React, { useEffect, useState } from 'react';
import WeatherNews from '../../WeatherNews';
import { NewsContextProvider } from '../../NewsContext';
import { WeatherNewsContextProvider } from '../../WeatherNewsContext';
import bannerImage from '../../../Images/background.jpg';
import News from '../../News';
import { ContentContextProvider } from '../../ContentNewsContext';
import ContentNews from '../../ContentNews';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { FaCoins } from 'react-icons/fa';
import { FaRupeeSign, FaInfoCircle, FaTimes } from 'react-icons/fa';
import {
  Typography,
  Button,
  TextField,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  InputAdornment,
} from '@mui/material';
import { styled } from '@mui/system';
import {
  AccountCircle,
  Visibility,
  VisibilityOff,
  ErrorOutline,
} from '@mui/icons-material';

const InvalidPointBox = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} sx={{ zIndex: 9999 }}>
      <DialogContent>
        <Box display="flex" alignItems="center" justifyContent="center">
          <ErrorOutline color="error" fontSize="large" sx={{ mr: 2 }} />
          <Typography variant="h6" component="div">
            Insufficient Points
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Minimum 500 points required, and points should be in multiples of 100.
        </Typography>
      </DialogContent>
    </Dialog>
  );
};



function CustomerNews() {
  const [user, setUser] = useState(null);
  const [rewardPoints, setRewardPoints] = useState(0);
  const [showClaimPopup, setShowClaimPopup] = useState(false); // State to control the visibility of the claim popup
  const [showPopup, setShowPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    const decodedToken = jwt_decode(token);
    const userName = decodedToken.sub;
    axios
      .get(`http://localhost:9091/reward/getRewardPointById/${userName}`)
      .then((response) => {
      })
      .catch((error) => {
        axios
        .post('http://localhost:9091/reward/generateRewardPoint', {
          rewardPoint: 10,
          noOfTimesLogin: 1,
          userName: userName,
        })
        .then((response) => {
          console.log('Reward points generated:', response.data);
          // Update the rewardPoints state with the new reward points value
          setRewardPoints(10);
        })
        .catch((error) => {
          console.error('Error generating reward points:', error);
        });
      });

  });

  const handleButtonClick = () => {
    setShowPopup(true);
  };

  const RedeemPopup = ({ onClose }) => {
    const [user, setUser] = useState(null);
    const [availablePoints, setAvailablePoints] = useState(0);
    const [inputPoints, setInputPoints] = useState();
    const [redeemAmount, setRedeemAmount] = useState(0);
    const [noOfLogin, setNoOfLogin] = useState(0);
    const [showInvalidPointBox, setInvalidPointBox] = useState(false);

    const handleCloseInvalidPointBox = () => {
      setInvalidPointBox(false);
    }


    useEffect(() => {
      const token = localStorage.getItem('jwt');
      const decodedToken = jwt_decode(token);
      const userName = decodedToken.sub;



      axios
        .get(`http://localhost:9091/account/getUserAccountByUserName/${userName}`)
        .then((response) => {
          const userData = response.data;
          setUser(userData);


          // Fetch reward points
          axios
            .get(`http://localhost:9091/reward/getRewardPointById/${userName}`)
            .then((response) => {
              const rewardData = response.data;

              if (rewardData) {
                setRewardPoints(rewardData.rewardPoint);
                setAvailablePoints(rewardData.rewardPoint);
                const today = new Date();
                const loginDate = new Date(rewardData.loginDate);

                if (loginDate.getDate() < today.getDate()) {
                  setShowClaimPopup(true); // Show the claim popup if loginDate is less than today
                }
              } else {
                setRewardPoints(0);
              }
            })
            .catch((error) => {
              console.error('Error fetching reward points:', error);
              // Handle the error when fetching reward points

            });
        })
        .catch((error) => {
          console.error('Error fetching user details:', error);

        });
    }, []);

    const handlePointsChange = (e) => {
      const input = parseInt(e.target.value);
      setInputPoints(input);
      setRedeemAmount(input / 10);
    };

    const handleRedeem = () => {
      if (inputPoints >= 500 && inputPoints % 100 === 0 && availablePoints >= 500) {
        // Perform redeem logic here
        console.log('Redeeming points:', inputPoints);
        setInputPoints(inputPoints);
        setRedeemAmount(inputPoints / 10);
        const updatedRewardPoints = availablePoints - inputPoints
        axios
          .put(`http://localhost:9091/reward/updateRewardPointAfterClaim/${user.userAccount.emailId}/${updatedRewardPoints}/${noOfLogin}`)
          .then((response) => {
            console.log('Reward points updated:', response.data);
            axios
              .get(`http://localhost:9091/reward/getRewardPointById/${user.userAccount.emailId}`)
              .then((response) => {
                const rewardData = response.data;
                if (rewardData) {
                  setRewardPoints(rewardData.rewardPoint);
                }
              });
          })
          .catch((error) => {
            console.error('Error updating reward points:', error);
          });
        axios
          .post(`http://localhost:8082/transaction/creditRedeemPointToUserAccount/${user.accountNumber}/${redeemAmount}`)
          .then((response) => {
            console.log(response.data)
            setShowSuccessPopup(true);
          })
          .catch((error) => {
            console.log(error);
          });

      } else {
        // Show warning or error message
        setInvalidPointBox(true);
      }
    };

    const handleClose = () => {
      setInputPoints(0);
      setRedeemAmount(0);
      setShowSuccessPopup(false);
      onClose();
    };

    return (
      <>
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#ffffff',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            padding: '20px',
            borderRadius: '8px',
            minWidth: '300px',
            maxWidth: '400px',
            textAlign: 'center',
            zIndex: 9999,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
            }}
          >
            <h3 style={{ marginBottom: 0, fontSize: '24px' }}>
              Available Points: {availablePoints}
            </h3>
            <FaTimes style={{ cursor: 'pointer' }} onClick={handleClose} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <p
              style={{ color: '#ff0000', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}
            >
              <FaInfoCircle style={{ marginRight: '5px' }} /> Minimum 500 points required for redeem.
            </p>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <input
              type="number"
              value={inputPoints}
              onChange={handlePointsChange}
              placeholder="Enter points (in multiples of 100)"
              style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', width: '100%' }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <p>
              Point worth: <FaRupeeSign /> {redeemAmount}
            </p>
          </div>
          <button
            onClick={handleRedeem}
            style={{
              padding: '10px 20px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Redeem
          </button>
        </div>

        {showSuccessPopup && (
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: '#ffffff',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              padding: '20px',
              borderRadius: '8px',
              minWidth: '300px',
              maxWidth: '400px',
              textAlign: 'center',
              zIndex: 9999,
            }}
          >
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ marginBottom: 0, fontSize: '24px', color: '#4CAF50' }}>Redeem Successful!</h3>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <p style={{ color: '#4CAF50', fontWeight: 'bold' }}>
                You have successfully redeemed points.
              </p>
            </div>
            <button
              onClick={handleClose}
              style={{
                padding: '10px 20px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              OK
            </button>
          </div>
        )}
        <InvalidPointBox
          open={showInvalidPointBox}
          onClose={handleCloseInvalidPointBox}
        />
      </>
    );
  };
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    const decodedToken = jwt_decode(token);
    const userName = decodedToken.sub;

    axios
      .get(`http://localhost:9091/account/getUserAccountByUserName/${userName}`)
      .then((response) => {
        const userData = response.data;
        setUser(userData);

        // Fetch reward points
        axios
          .get(`http://localhost:9091/reward/getRewardPointById/${userName}`)
          .then((response) => {
            const rewardData = response.data;

            if (rewardData) {
              setRewardPoints(rewardData.rewardPoint);
              const today = new Date();
              const loginDate = new Date(rewardData.loginDate);

              if (loginDate.getDate() < today.getDate()) {
                setShowClaimPopup(true); // Show the claim popup if loginDate is less than today
              }
            } else {
              setRewardPoints(0);
            }
          })
          .catch((error) => {
            console.error('Error fetching reward points:', error);
            // Handle the error when fetching reward points
          });
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
      });
  }, []);

  const handleClaimRewardPoints = () => {
    const token = localStorage.getItem('jwt');
    const decodedToken = jwt_decode(token);
    const userName = decodedToken.sub;
    const updatedRewardPoints = 10;
    const updatedNoOfTimesLogin = 1;

    axios
      .put(`http://localhost:9091/reward/updateRewardPoint/${userName}/${updatedRewardPoints}/${updatedNoOfTimesLogin}`)
      .then((response) => {
        console.log('Reward points updated:', response.data);
        axios
          .get(`http://localhost:9091/reward/getRewardPointById/${userName}`)
          .then((response) => {
            const rewardData = response.data;
            if (rewardData) {
              setRewardPoints(rewardData.rewardPoint);
            }
          });
        setShowClaimPopup(false);
      })
      .catch((error) => {
        console.error('Error updating reward points:', error);
      });
  };

  const handleClosePopup = () => {
    setShowClaimPopup(false); // Close the claim popup
  };

  return (
    <div
      className="wrapper"
      style={{
        backgroundImage: `url(${bannerImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: '100%',
      }}
    >
      <div style={{ marginRight: '15px', marginBottom: '20px', display: 'flex', justifyContent: 'end' }}>

        <div style={{ display: 'flex', alignItems: 'center', color: '#f1c40f', fontSize: '18px' }}>
          <FaCoins size={20} style={{ marginRight: '10px' }} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <span style={{ fontWeight: 'bold' }}>Available Points</span>
            <span style={{ fontSize: '20px' }}>{rewardPoints}</span>
          </div>
        </div>
        <button
          onClick={handleButtonClick}
          style={{
            display: 'inline-block', padding: '0px 13px', backgroundColor: '#4CAF50',
            color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer',
            fontSize: '15px', fontWeight: 'bold', marginLeft: '13px'
          }}
        >
          Redeem points
        </button>

        {showPopup && <RedeemPopup
          onClose={() => setShowPopup(false)} />}
      </div>

      <div style={{ marginBottom: '150px', marginLeft: '15px', marginTop: '10px' }}>
        <GetLocation></GetLocation>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <div style={{ marginLeft: '15px', marginBottom: '20px' }}>
          <NewsContextProvider>
            <News />
          </NewsContextProvider>
          {/* <News/> */}
        </div>

        <div style={{ marginLeft: '15px', marginBottom: '20px' }}>
          <WeatherNewsContextProvider>
            <WeatherNews />
          </WeatherNewsContextProvider>
        </div>
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ marginLeft: '25px', marginBottom: '20px' }}>
          <ContentContextProvider>
            <ContentNews />
          </ContentContextProvider>
        </div>
      </div>




      {showClaimPopup && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '5px', textAlign: 'center' }}>
            <h2> Daily Check-In Reward Points</h2>
            <p>Come back everyday to earn extra reward point!</p>
            <span style={{ fontWeight: 'bold', color: '#f1c40f' }}><FaRupeeSign size={30} /> +10</span>
            <br></br>
            <button onClick={handleClaimRewardPoints} style={{ marginRight: '10px', padding: '8px 16px', backgroundColor: '#4caf50', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Claim</button>
            <button onClick={handleClosePopup} style={{ marginRight: '10px', padding: '8px 16px', backgroundColor: '#f44336', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Close</button>
          </div>
        </div>
      )}

    </div>
  );
}

export default CustomerNews;
