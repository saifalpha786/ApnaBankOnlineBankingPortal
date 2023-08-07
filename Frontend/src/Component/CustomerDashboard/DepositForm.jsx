import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Grid } from '@mui/material';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

const DepositForm = ({ onSubmit, onClose }) => {
  const [user, setUser] = useState(null);

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

  const formik = useFormik({
    initialValues: {
      customerAccountNumber: '',
      amount: '',
    },
    validationSchema: Yup.object({
      customerAccountNumber: Yup.number().nullable(),
      amount: Yup.number().required('Amount Is Required'),
    }),
    onSubmit: values => {
      onSubmit(values);
    },
  });
  useEffect(() => {
    if (user) {
      formik.setFieldValue('customerAccountNumber', user.accountNumber || '');
    }
  }, [user]);
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={formik.handleSubmit} style={{ border: '1px solid #ccc', borderRadius: 5, padding: 16 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h3 style={{ textAlign: 'center' }}>Deposit Money</h3>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Customer A/C"
            name="customerAccountNumber"
            value={user.accountNumber || ''}
            onChange={formik.handleChange}
            error={formik.touched.customerAccountNumber && formik.errors.customerAccountNumber}
            helperText={formik.touched.customerAccountNumber && formik.errors.customerAccountNumber}
            fullWidth

            size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Amount"
            name="amount"
            value={formik.values.amount}
            onChange={formik.handleChange}
            error={formik.touched.amount && formik.errors.amount}
            helperText={formik.touched.amount && formik.errors.amount}
            fullWidth
            required
            size="small"
          />
        </Grid>
      </Grid>
      <br />
      <Button variant="contained" sx={{ backgroundColor: '#861f41' }} type="submit">
        Deposit
      </Button>
      <Button variant="outlined" color="primary" onClick={onClose} sx={{ marginLeft: 8 }}>
        Close
      </Button>
    </form>
  );
};

export default DepositForm;