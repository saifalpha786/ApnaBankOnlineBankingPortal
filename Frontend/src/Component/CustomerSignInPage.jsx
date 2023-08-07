import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
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
import loginImage from '../Images/signin.jpg';
import { useAuth } from '../Utility.js/Auth';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const StyledContainer = styled('div')`
  display: grid;
  grid-template-columns: ${({ showImage }) =>
    showImage ? '40% 60%' : '100%'};
  height: 100vh;
`;

const StyledContent = styled('div')`
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

const StyledImage = styled('div')`
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const WrongCredentialsCard = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <Box display="flex" alignItems="center" justifyContent="center">
          <ErrorOutline color="error" fontSize="large" sx={{ mr: 2 }} />
          <Typography variant="h6" component="div">
            Wrong Credentials
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ mt: 2 }}>
          The username or password you entered is incorrect. Please try again.
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

const UserAccountBlockedCard = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <Box display="flex" alignItems="center" justifyContent="center">
          <ErrorOutline color="error" fontSize="large" sx={{ mr: 2 }} />
          <Typography variant="h6" component="div">
            Wrong Credentials
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ mt: 2 }}>
          User Account Is Locked. Please Contact Bank Support Team.
        </Typography>
      </DialogContent>
    </Dialog>
  );
};



const CustomerSignPage = () => {
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showWrongCredentialsDialog, setShowWrongCredentialsDialog] = useState(false);
  const [showUserAccountBlockedCard, setShowUserAccountBlockedCard] = useState(false);

  // New states for login attempts and userData
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [userData, setUserData] = useState(null);

  const auth = useAuth();
  const location = useLocation();
  const nav = useNavigate();
  const redirectPath = location.state?.path || '/';

  const handleLogin = (e) => {
    e.preventDefault();

    const user = {
      userName: userName,
      password: password,
    };
    
    const payload = JSON.stringify(user);

    axios
    .get(`http://localhost:9091/account/getUserAccountByUserName/${userName}`)
    .then((accountResponse) => {
      const userData = accountResponse.data;
      if(userData.accountStatus === 'BLOCKED' && userData.userAccount.userStatus){
        setShowUserAccountBlockedCard(true);
      }
      else{
        axios
      .post('http://localhost:9091/user/authenticate', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        console.log(res);
        const jwt = res.data;
        localStorage.setItem('jwt', jwt);

        // Check the user's role
        axios
          .get(`http://localhost:9091/user/getRoleByUserName/${userName}`, {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          })
          .then((response) => {
            console.log(response);
            // const role = response.data.role;
            if (response.data === 'ROLE_CUSTOMER') {
              // Reset login attempts on successful login
              setLoginAttempts(0);
              // Login successful for ROLE_CUSTOMER
              auth.login(userName, password, jwt);
              nav(redirectPath, { replace: true });
            } else {
              // User does not have ROLE_CUSTOMER, show error dialog
              setShowWrongCredentialsDialog(true);
              // Increment login attempts
              setLoginAttempts((prevAttempts) => prevAttempts + 1);
            }
          })
          .catch((error) => {
            console.log(error);
            setShowWrongCredentialsDialog(true);
          });

        // Fetch user account data and set the userData state
      })
      .catch((error) => {
        setLoginAttempts((prevAttempts) => prevAttempts + 1);
        console.log(loginAttempts);
        if(loginAttempts > 2){
          setShowUserAccountBlockedCard(true);
          axios
          .get(`http://localhost:9091/account/getUserAccountByUserName/${userName}`)
          .then((accountResponse) => {
            const userData = accountResponse.data;
            setUserData(userData);
            const updatedData = {
              accountStatus: 'BLOCKED',
              accountType: userData.accountType,
              userAccount: {
                userId: userData.userAccount.userId,
                userStatus: 'BLOCKED',
              },
            };
      
            // Update the account with the new status
            axios
              .put(`http://localhost:9091/account/updateCustomerAccount/${userData.accountId}`, updatedData, {
                headers: {
                  'Content-Type': 'application/json'
                },
              })
              .then((updateResponse) => {
                console.log('Account blocked successfully:', updateResponse);
              })
              .catch((updateError) => {
                console.log('Error blocking account:', updateError);
              });
          })
          .catch((accountError) => {
            console.log('Error fetching user account data:', accountError);
          });


        }
        else{

          setShowWrongCredentialsDialog(true);
        }
      });
      

      }
    
    });


    
  };

  const handleUsernameChange = (event) => {
    setUserName(event.target.value);
    formik.handleChange(event);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    formik.handleChange(event);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleCloseWrongCredentialsDialog = () => {
    setShowWrongCredentialsDialog(false);
  };

  const handleCloseUserAccountBlockedCard =() => {
    setShowUserAccountBlockedCard(false);
  }

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: (values) => {
      // Handle login submission
      console.log(values);
      setLoginSuccess(true);
    },
  });



  const shouldShowImage = window.innerWidth >= 1000;

  return (
    <StyledContainer showImage={shouldShowImage}>
      <StyledContent>
        <AccountCircle
          sx={{ fontSize: '60px', color: '#861f41', marginBottom: '20px' }}
        />
        <Typography
          variant="h5"
          component="h2"
          style={{ color: '#861f41', marginBottom: '20px' }}
        >
          Login to Internet Banking
        </Typography>
        {loginSuccess ? (
          <Typography
            variant="body1"
            style={{ color: 'green', marginBottom: '20px' }}
          >
            Login Successful!
          </Typography>
        ) : null}
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            size="small"
            id="userName"
            name="userName"
            label="Username"
            value={userName}
            onChange={handleUsernameChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            variant="outlined"
            style={{ marginBottom: '10px' }}
          />
          <TextField
            fullWidth
            size="small"
            id="password"
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handlePasswordChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            variant="outlined"
            style={{ marginBottom: '20px' }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {showPassword ? (
                    <Visibility
                      onClick={handleTogglePasswordVisibility}
                      style={{ cursor: 'pointer' }}
                    />
                  ) : (
                    <VisibilityOff
                      onClick={handleTogglePasswordVisibility}
                      style={{ cursor: 'pointer' }}
                    />
                  )}
                </InputAdornment>
              ),
            }}
          />
          <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
            <Button
              color="primary"
              variant="contained"
              size="large"
              sx={{
                width: '225px',
                backgroundColor: '#861f41',
                borderRadius: '20px',
                textTransform: 'none',
                padding: '12px 24px',
                display: 'flex',
                alignItems: 'center', // Added property to vertically align items
                justifyContent: 'center', // Centered horizontally
                '&:hover': {
                  backgroundColor: '#7c1b39',
                },
              }}
              type="submit"
              onClick={handleLogin}
            >
              Login
              <AccountCircle sx={{ ml: 1 }} />
            </Button>
          </Box>
        </form>
        <Link href="/apnabank/forgotpassword" style={{ marginTop: '10px' }}>
          Forgot Password?
        </Link>
        <Typography variant="body2" color="textSecondary" style={{ marginTop: '10px' }}>
          Don't have an account? <Link href="/apnabank/signup">Sign Up</Link>
        </Typography>
      </StyledContent>
      {shouldShowImage && <StyledImage imageUrl={loginImage} />}

      {/* Wrong Credentials Dialog */}
      <WrongCredentialsCard
        open={showWrongCredentialsDialog}
        onClose={handleCloseWrongCredentialsDialog}
      />

      <UserAccountBlockedCard
      open={showUserAccountBlockedCard}
      onClose={handleCloseUserAccountBlockedCard}
      />
    </StyledContainer>
  );
};

export default CustomerSignPage;
