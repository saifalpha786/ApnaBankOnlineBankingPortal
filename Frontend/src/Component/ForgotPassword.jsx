import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Typography, Button, TextField, Modal } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import resetPasswordImage from '../Images/reset password.jpg'; // Update the image path
import { FaKey } from 'react-icons/fa';

const StyledContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledContent = styled('div')`
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ImageContainer = styled('div')`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${resetPasswordImage});
  background-size: cover;
`;

const OtpModalContainer = styled('div')`
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ForgotPasswordPage = () => {
  const [resetSuccess, setResetSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [enteredOTP, setEnteredOTP] = useState('');

  const handleResetPassword = async (values) => {
    try {
      // Make a request to fetch the user data
      const getUserResponse = await axios.get(`http://localhost:9091/user/getUserByUserName/${values.userName}`);
      const user = getUserResponse.data;

      // Make a request to send OTP to the user's email
      await axios.post(`http://localhost:9091/user/sendOtpToEmail/${values.userName}`);

      // Show the OTP popup
      setShowOtpPopup(true);
    } catch (error) {
      console.log(error);
      setErrorMessage('Failed to reset password');
    }
  };

  const handleOTPSubmit = async () => {
    try {
      // Make a request to fetch the user data again using the entered username
      const getUserResponse = await axios.get(`http://localhost:9091/user/getUserByUserName/${formik.values.userName}`);
      const user = getUserResponse.data;

      // Validate the entered OTP
      const validateOTPResponse = await axios.post(`http://localhost:9091/user/validateOTP`, {
        email: formik.values.userName,
        otp: enteredOTP,
      });

      if (validateOTPResponse.data) {
        // OTP is valid, continue with resetting the password

        // Confirm the new password entered by the user
        if (formik.values.password !== formik.values.confirmPassword) {
          setErrorMessage('Passwords do not match');
          return;
        }

        // Create the payload with updated password details
        const payload = {
          userId: user.userId,
          emailId: user.emailId,
          password: formik.values.password,
        };

        // Make a request to update the user password
        await axios.put(`http://localhost:9091/user/updatePassword/${formik.values.userName}`, payload);

        // Password reset successful
        setResetSuccess(true);
        setShowOtpPopup(false);
      } else {
        // Invalid OTP

        setErrorMessage('Invalid OTP');
       
      }
    } catch (error) {
      console.log(error);
      setErrorMessage('Failed to reset password');
      setShowOtpPopup(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      userName: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    }),
    onSubmit: (values) => {
      handleResetPassword(values);
    },
  });

  useEffect(() => {
    if (resetSuccess) {
      // alert('Password reset successful!');
      formik.resetForm(); 
      setShowOtpPopup(false);
      // You can redirect the user to a login page or any other desired action
    }
  }, [resetSuccess]);

  return (
    <StyledContainer>
      <ImageContainer>
        {/* Image displayed here */}
        <img src={resetPasswordImage} alt="Reset Password" style={{ maxWidth: '100%', maxHeight: '100%' }} />
      </ImageContainer>
      <StyledContent style={{ width: '600px', background: 'aliceblue' }}>
        <Typography variant="h5" component="h2" style={{ color: '#861f41', marginBottom: '20px' }}>
          <FaKey style={{ marginRight: '10px' }} /> Forgot Password
        </Typography>
        {resetSuccess ? (
          <Typography variant="body1" style={{ color: 'green', marginBottom: '20px' }}>
            Password Successfully Changed.....
          </Typography>
        ) : null}
        {errorMessage && (
          <Typography variant="body1" style={{ color: 'red', marginBottom: '20px' }}>
            {errorMessage}
          </Typography>
        )}
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            size="small"
            id="userName"
            name="userName"
            label="Username"
            value={formik.values.userName}
            onChange={formik.handleChange}
            error={formik.touched.userName && Boolean(formik.errors.userName)}
            helperText={formik.touched.userName && formik.errors.userName}
            variant="outlined"
            style={{ marginBottom: '20px', padding: '5px' }}
          />
          <TextField
            fullWidth
            size="small"
            id="password"
            name="password"
            label="New Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            variant="outlined"
            style={{ marginBottom: '20px', padding: '5px' }}
          />
          <TextField
            fullWidth
            size="small"
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            variant="outlined"
            style={{ marginBottom: '20px', padding: '5px' }}
          />
          <Button
            color="primary"
            variant="contained"
            size="large"
            sx={{
              backgroundColor: '#861f41',
              borderRadius: '20px',
              textTransform: 'none',
              padding: '12px 24px',
              '&:hover': {
                backgroundColor: '#180f12',
              },
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '20px',
            }}
            type="submit"
          >
            Reset Password
          </Button>
        </form>
        <Modal open={showOtpPopup} onClose={() => setShowOtpPopup(false)}>
          <OtpModalContainer>
            <Typography variant="h5" component="h2" style={{ color: '#861f41', marginBottom: '20px' }}>
              Enter OTP
            </Typography>
            <TextField
              fullWidth
              size="small"
              id="otp"
              name="otp"
              label="OTP"
              value={enteredOTP}
              onChange={(e) => setEnteredOTP(e.target.value)}
              variant="outlined"
              style={{ marginBottom: '20px', padding: '5px' }}
            />
            <Button
              color="primary"
              variant="contained"
              size="large"
              sx={{
                backgroundColor: '#861f41',
                borderRadius: '20px',
                textTransform: 'none',
                padding: '12px 24px',
                '&:hover': {
                  backgroundColor: '#180f12',
                },
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '20px',
              }}
              onClick={handleOTPSubmit}
            >
              Submit OTP
            </Button>
          </OtpModalContainer>
        </Modal>
      </StyledContent>
    </StyledContainer>
  );
};

export default ForgotPasswordPage;
