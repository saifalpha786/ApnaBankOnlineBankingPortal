import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Typography, Button, TextField, RadioGroup, FormControlLabel, Radio, Dialog, DialogContent, Box, Alert, MenuItem } from '@mui/material';
import { styled } from '@mui/system';
import { AccountCircle, CheckCircle, ErrorOutline } from '@mui/icons-material';
import imageUrl from '../Images/Signup.jpg';
import axios from 'axios';
import { Link } from 'react-router-dom';

const StyledContainer = styled('div')`
  display: grid;
  grid-template-columns: ${({ showImage }) => (showImage ? '40% 60%' : '100%')};
  height: 800px;
`;

const StyledContent = styled('div')`
  background-color: #f7f8f9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 31px;
  height: 700px
  
  
`;

const StyledImage = styled('div')`
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const SignUpForm = () => {
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState('INDIA');


  const handleClose = () => {
    setOpen(false);
  };
  const [error, setError] = useState('');
  const [openError, setOpenError] = useState(false);

  const handleErrorClose = () => {
    setOpenError(false);
  };
  const formik = useFormik({
    initialValues: {
      userFirstName: '',
      userLastName: '',
      emailId: '',
      password: '',
      userPhoneNumber: '',
      userAadharCard: '',
      userPanCard: '',
      accountTypeRequest: '',
      street: '',
      city: '',
      state: '',
      country: country || 'DEFAULT_COUNTRY_TYPE',
      pinCode: '',

    },
    validationSchema: Yup.object({
      userFirstName: Yup.string().required('First Name is required'),
      userLastName: Yup.string().required('Last Name is required'),
      accountTypeRequest: Yup.string().required('Account Type is required'),
      
      street: Yup.string().required('Street is required'),
      city: Yup.string().required('City is required'),
      state: Yup.string().required('State is required'),
      country: Yup.string().required('country'),
      pinCode: Yup.number().required('PinCode is required'),
      emailId: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .required('Password is required')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
          'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.'
        ),
      userAadharCard: Yup.string()
        .required('AadharCard is required')
        .matches(/^[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}$/, 'Aadhar Card should be a 12-digit valid number'),

        userPanCard: Yup.string()
        .required('PanCard is required')
        .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Pan Card should be in the format ABCDE1234F'),
      
      userPhoneNumber: Yup.string()
        .required('Mobile Number is required')
        .matches(
          /^\d{10}$/,
          'Mobile number must be a 10-digit number'
        ),
      accountTypeRequest: Yup.string().required('Account Type is required'),
    }),

    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post('http://localhost:9091/user/addCustomer', JSON.stringify(values), {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        setRegistrationSuccess(true);
        setOpen(true);
        resetForm(); // Reset the form values
      } catch (error) {
        const errorMessage = 'Already register with this Email or Mobile';
        setError(errorMessage);
        setOpenError(true);
      }
    },
  });

  return (
    <StyledContent>
      <Typography variant="h4" component="h2" style={{ color: '#055c2d', marginBottom: '2px' }}>
        Create an Account
      </Typography>
      {registrationSuccess && (
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <Box display="flex" alignItems="center" justifyContent="center" borderRadius={'10px'}>
              <CheckCircle color="success" fontSize="large" sx={{ mr: 2 }} />
              <Typography variant="h6" component="div">
                Registration Successful
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Congratulations! Your registration has been successful.
              <br></br>
              You will notified once account is approve..!!
            </Typography>
          </DialogContent>
        </Dialog>
      )}
      {error && (
        <Dialog open={openError} onClose={handleErrorClose}>
          <DialogContent>
            <Box display="flex" alignItems="center" justifyContent="center" borderRadius={'10px'}>
              <ErrorOutline color="error" fontSize="large" sx={{ mr: 2 }} />
              <Typography variant="h6" component="div">
                Error !!
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ mt: 2 }}>
              {error}
            </Typography>
          </DialogContent>
        </Dialog>
      )}
      <form onSubmit={formik.handleSubmit} style={{ height: '1200px' }}>

        <div style={{ display: 'flex' }}>
          <TextField
            fullWidth
            size="small"
            id="userFirstName"
            name="userFirstName"
            label="First Name"
            value={formik.values.userFirstName}
            onChange={formik.handleChange}
            error={formik.touched.userFirstName && Boolean(formik.errors.userFirstName)}
            helperText={formik.touched.userFirstName && formik.errors.userFirstName}
            variant="outlined"
            style={{ marginBottom: '10px', marginRight: '10px' }}
          />
          <TextField
            fullWidth
            size="small"
            id="userLastName"
            name="userLastName"
            label="Last Name"
            value={formik.values.userLastName}
            onChange={formik.handleChange}
            error={formik.touched.userLastName && Boolean(formik.errors.userLastName)}
            helperText={formik.touched.userLastName && formik.errors.userLastName}
            variant="outlined"
            style={{ marginBottom: '10px' }}
          />
        </div>


        <TextField
          fullWidth
          size="small"
          id="emailId"
          name="emailId"
          label="Email"
          value={formik.values.emailId}
          onChange={formik.handleChange}
          error={formik.touched.emailId && Boolean(formik.errors.emailId)}
          helperText={formik.touched.emailId && formik.errors.emailId}
          variant="outlined"
          style={{ marginBottom: '10px' }}
        />
        <TextField
          fullWidth
          size="small"
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          variant="outlined"
          style={{ marginBottom: '10px' }}
        />
        <div style={{ display: 'flex' }}>
          <TextField
            fullWidth
            size="small"
            id="userPhoneNumber"
            name="userPhoneNumber"
            label="Mobile Number"
            value={formik.values.userPhoneNumber}
            onChange={formik.handleChange}
            error={formik.touched.userPhoneNumber && Boolean(formik.errors.userPhoneNumber)}
            helperText={formik.touched.userPhoneNumber && formik.errors.userPhoneNumber}
            variant="outlined"
            style={{ marginBottom: '10px',marginRight: '10px' }}
          />
          <TextField
            fullWidth
            size="small"
            id="userAadharCard"
            name="userAadharCard"
            label="Aadhar Card Number"
            value={formik.values.userAadharCard}
            onChange={formik.handleChange}
            error={formik.touched.userAadharCard && Boolean(formik.errors.userAadharCard)}
            helperText={formik.touched.userAadharCard && formik.errors.userAadharCard}
            variant="outlined"
            style={{ marginBottom: '10px' }}
          />
        </div>
        <TextField
          fullWidth
          size="small"
          id="userPanCard"
          name="userPanCard"
          label="PanCard Number"
          value={formik.values.userPanCard}
          onChange={formik.handleChange}
          error={formik.touched.userPanCard && Boolean(formik.errors.userPanCard)}
          helperText={formik.touched.userPanCard && formik.errors.userPanCard}
          variant="outlined"
          style={{ marginBottom: '10px', }}
        />
        <TextField
          fullWidth
          size="small"
          id="street"
          name="street"
          label="Street"
          value={formik.values.street}
          onChange={formik.handleChange}
          error={formik.touched.street && Boolean(formik.errors.street)}
          helperText={formik.touched.street && formik.errors.street}
          variant="outlined"
          style={{ marginBottom: '10px' }}
        />
        <div style={{ display: 'flex' }}>
          <TextField
            fullWidth
            size="small"
            id="city"
            name="city"
            label="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            error={formik.touched.city && Boolean(formik.errors.city)}
            helperText={formik.touched.city && formik.errors.city}
            variant="outlined"
            style={{ marginBottom: '10px',marginRight: '10px' }}
          />

          <TextField
            fullWidth
            size="small"
            id="state"
            name="state"
            label="state"
            value={formik.values.state}
            onChange={formik.handleChange}
            error={formik.touched.state && Boolean(formik.errors.state)}
            helperText={formik.touched.state && formik.errors.state}
            variant="outlined"
            style={{ marginBottom: '10px' }}
            select
          >
            <MenuItem value="">Select a state</MenuItem>
            <MenuItem value="Andhra Pradesh">Andhra Pradesh</MenuItem>
            <MenuItem value="Arunachal Pradesh">Arunachal Pradesh</MenuItem>
            <MenuItem value="Assam">Assam</MenuItem>
            <MenuItem value="Bihar">Bihar</MenuItem>
            <MenuItem value="Chhattisgarh">Chhattisgarh</MenuItem>
            <MenuItem value="Goa">Goa</MenuItem>
            <MenuItem value="Gujarat">Gujarat</MenuItem>
            <MenuItem value="Haryana">Haryana</MenuItem>
            <MenuItem value="Himachal Pradesh">Himachal Pradesh</MenuItem>
            <MenuItem value="Jharkhand">Jharkhand</MenuItem>
            <MenuItem value="Karnataka">Karnataka</MenuItem>
            <MenuItem value="Kerala">Kerala</MenuItem>
            <MenuItem value="Madhya Pradesh">Madhya Pradesh</MenuItem>
            <MenuItem value="Maharashtra">Maharashtra</MenuItem>
            <MenuItem value="Manipur">Manipur</MenuItem>
            <MenuItem value="Meghalaya">Meghalaya</MenuItem>
            <MenuItem value="Mizoram">Mizoram</MenuItem>
            <MenuItem value="Nagaland">Nagaland</MenuItem>
            <MenuItem value="Odisha">Odisha</MenuItem>
            <MenuItem value="Punjab">Punjab</MenuItem>
            <MenuItem value="Rajasthan">Rajasthan</MenuItem>
            <MenuItem value="Sikkim">Sikkim</MenuItem>
            <MenuItem value="Tamil Nadu">Tamil Nadu</MenuItem>
            <MenuItem value="Telangana">Telangana</MenuItem>
            <MenuItem value="Tripura">Tripura</MenuItem>
            <MenuItem value="Uttarakhand">Uttarakhand</MenuItem>
            <MenuItem value="Uttar Pradesh">Uttar Pradesh</MenuItem>
            <MenuItem value="West Bengal">West Bengal</MenuItem>
            <MenuItem value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</MenuItem>
            <MenuItem value="Chandigarh">Chandigarh</MenuItem>
            <MenuItem value="Dadra and Nagar Haveli and Daman & Diu">Dadra and Nagar Haveli and Daman & Diu</MenuItem>
            <MenuItem value="The Government of NCT of Delhi">The Government of NCT of Delhi</MenuItem>
            <MenuItem value="Jammu & Kashmir">Jammu & Kashmir</MenuItem>
            <MenuItem value="Ladakh">Ladakh</MenuItem>
            <MenuItem value="Lakshadweep">Lakshadweep</MenuItem>
            <MenuItem value="Puducherry">Puducherry</MenuItem>
          </TextField>
        </div>
        <div style={{ display: 'flex' }}>
          <TextField
            fullWidth
            size="small"
            id="country"
            name="country"
            label="country"
            value={formik.values.country}
            error={formik.touched.country && Boolean(formik.errors.country)}
            helperText={formik.touched.country && formik.errors.country}
            variant="outlined"
            style={{ marginBottom: '10px' ,marginRight: '10px'}}
          />
          <TextField
            fullWidth
            size="small"
            id="pinCode"
            name="pinCode"
            label="pinCode"
            value={formik.values.pinCode}
            onChange={formik.handleChange}
            error={formik.touched.pinCode && Boolean(formik.errors.pinCode)}
            helperText={formik.touched.pinCode && formik.errors.pinCode}
            variant="outlined"
            style={{ marginBottom: '10px' }}
          />
        </div>



        <div style={{ marginBottom: '10px' }}>
          <Typography variant="subtitle1" component="div" color="textSecondary">
            Account Type
          </Typography>
          <RadioGroup
            row
            aria-label="Account Type"
            name="accountTypeRequest"
            value={formik.values.accountTypeRequest}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.accountTypeRequest && Boolean(formik.errors.accountTypeRequest)}
          >
            <FormControlLabel
              value="SAVINGS_ACCOUNT"
              control={<Radio color="primary" sx={{ color: '#861f41' }} />}
              label="Savings Account"
            />
            <FormControlLabel
              value="CURRENT_ACCOUNT"
              control={<Radio color="primary" sx={{ color: '#861f41' }} />}
              label="Current Account"
            />
          </RadioGroup>
          {formik.touched.accountTypeRequest && formik.errors.accountTypeRequest && (
            <Typography variant="body2" color="error">
              {formik.errors.accountTypeRequest}
            </Typography>
          )}
        </div>
        <Button
          color="primary"
          variant="contained"
          size="large"
          sx={{
            backgroundColor: '#861f41',
            borderRadius: '20px',
            textTransform: 'none',
            padding: '12px 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '20px',
            '&:hover': {
              backgroundColor: '#7c1b39',
            },
          }}
          type="submit"
        >
          Sign Up
          <AccountCircle sx={{ ml: 1 }} />
        </Button>
      </form>
    </StyledContent>
  );
};

const BackgroundBanner = () => {
  const shouldShowImage = window.innerWidth >= 1000;

  return (
    <StyledContainer showImage={shouldShowImage}>
      <SignUpForm />
      {shouldShowImage && <StyledImage imageUrl={imageUrl}></StyledImage>}
    </StyledContainer>
  );
};

export default BackgroundBanner;