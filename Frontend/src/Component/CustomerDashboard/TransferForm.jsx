import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Grid } from '@mui/material';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

const TransferForm = ({ onSubmit, onClose }) => {
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
      targetAccountNumber: '',
      amount: '',
      targetIFSCCode: '',
      targetOwnerName: '',
      transactionNote: '',
    },
    validationSchema: Yup.object({
      customerAccountNumber: Yup.number().nullable(),
      targetAccountNumber: Yup.number().required('Target AccountNumber Is Required'),
      amount: Yup.number().required('Amount Is Required'),
      transactionNote: Yup.string().required('Transaction Note Is Required'),
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
          <h3 style={{ textAlign: 'center' }}>Transfer Money</h3>
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
            label="Target A/C"
            name="targetAccountNumber"
            value={formik.values.targetAccountNumber}
            onChange={formik.handleChange}
            error={formik.touched.targetAccountNumber && formik.errors.targetAccountNumber}
            helperText={formik.touched.targetAccountNumber && formik.errors.targetAccountNumber}
            fullWidth
            required
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
        <Grid item xs={12}>
          <TextField
            label="TargetIFSCCode"
            name="targetIFSCCode"
            value={formik.values.targetIFSCCode}
            onChange={formik.handleChange}
            error={formik.touched.targetIFSCCode && formik.errors.targetIFSCCode}
            helperText={formik.touched.targetIFSCCode && formik.errors.targetIFSCCode}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Target UserName"
            name="targetOwnerName"
            value={formik.values.targetOwnerName}
            onChange={formik.handleChange}
            error={formik.touched.targetOwnerName && formik.errors.targetOwnerName}
            helperText={formik.touched.targetOwnerName && formik.errors.targetOwnerName}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Transaction Note"
            name="transactionNote"
            value={formik.values.transactionNote}
            onChange={formik.handleChange}
            error={formik.touched.transactionNote && formik.errors.transactionNote}
            helperText={formik.touched.transactionNote && formik.errors.transactionNote}
            fullWidth
            required
            size="small"
          />
        </Grid>
      </Grid>
      <br />
      <Button variant="contained" sx={{ backgroundColor: '#861f41' }} type="submit">
        Transfer
      </Button>
      <Button variant="outlined" color="primary" onClick={onClose} sx={{ marginLeft: 8 }}>
        Close
      </Button>
    </form>
  );
};

export default TransferForm;