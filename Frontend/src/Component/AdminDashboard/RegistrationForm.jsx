import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Grid } from '@mui/material';

const ManagerRegistrationForm = ({ onSubmit, onClose }) => {
  const formik = useFormik({
    initialValues: {
      userFirstName: '',
      userLastName: '',
      emailId: '',
      password: '',
      userPhoneNumber: '',
    },
    validationSchema: Yup.object({
      userFirstName: Yup.string().required('First Name is required'),
      userLastName: Yup.string().required('Last Name is required'),
      emailId: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string()
        .required('Password is required')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
          'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.'
        ),
      userPhoneNumber: Yup.string()
        .required('Phone Number is required')
        .matches(
          /^\d{10}$/,
          'Mobile number must be a 10-digit number'
        ),
    }),
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} style={{ border: '1px solid #ccc', borderRadius: 5, padding: 16 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h3 style={{ textAlign: 'center' }}>Registration For Manager</h3>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="First Name"
            name="userFirstName"
            value={formik.values.userFirstName}
            onChange={formik.handleChange}
            error={formik.touched.userFirstName && formik.errors.userFirstName}
            helperText={formik.touched.userFirstName && formik.errors.userFirstName}
            fullWidth
            required
            size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Last Name"
            name="userLastName"
            value={formik.values.userLastName}
            onChange={formik.handleChange}
            error={formik.touched.userLastName && formik.errors.userLastName}
            helperText={formik.touched.userLastName && formik.errors.userLastName}
            fullWidth
            required
            size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            name="emailId"
            value={formik.values.emailId}
            onChange={formik.handleChange}
            error={formik.touched.emailId && formik.errors.emailId}
            helperText={formik.touched.emailId && formik.errors.emailId}
            fullWidth
            required
            size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && formik.errors.password}
            helperText={formik.touched.password && formik.errors.password}
            fullWidth
            required
            type="password"
            size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Phone Number"
            name="userPhoneNumber"
            value={formik.values.userPhoneNumber}
            onChange={formik.handleChange}
            error={formik.touched.userPhoneNumber && formik.errors.userPhoneNumber}
            helperText={formik.touched.userPhoneNumber && formik.errors.userPhoneNumber}
            fullWidth
            required
            size="small"
          />
        </Grid>
      </Grid>
      <br />
      <Button variant="contained" sx={{ backgroundColor: '#861f41' }} type="submit">
        Register Manager
      </Button>
      <Button variant="outlined" color="primary" onClick={onClose} sx={{ marginLeft: 8 }}>
        Close
      </Button>
    </form>
  );
};

const EmployeeRegistrationForm = ({ onSubmit, onClose }) => {
  const formik = useFormik({
    initialValues: {
      userFirstName: '',
      userLastName: '',
      emailId: '',
      password: '',
      userPhoneNumber: '',
    },
    validationSchema: Yup.object({
      userFirstName: Yup.string().required('First Name is required'),
      userLastName: Yup.string().required('Last Name is required'),
      emailId: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string()
        .required('Password is required')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
          'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.'
        ),
      userPhoneNumber: Yup.string()
        .required('Phone Number is required')
        .matches(
          /^\d{10}$/,
          'Mobile number must be a 10-digit number'
        ),
    }),
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} style={{ border: '1px solid #ccc', borderRadius: 5, padding: 16 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h3 style={{ textAlign: 'center' }}>Registration For Employee</h3>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="First Name"
            name="userFirstName"
            value={formik.values.userFirstName}
            onChange={formik.handleChange}
            error={formik.touched.userFirstName && formik.errors.userFirstName}
            helperText={formik.touched.userFirstName && formik.errors.userFirstName}
            fullWidth
            required
            size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Last Name"
            name="userLastName"
            value={formik.values.userLastName}
            onChange={formik.handleChange}
            error={formik.touched.userLastName && formik.errors.userLastName}
            helperText={formik.touched.userLastName && formik.errors.userLastName}
            fullWidth
            required
            size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            name="emailId"
            value={formik.values.emailId}
            onChange={formik.handleChange}
            error={formik.touched.emailId && formik.errors.emailId}
            helperText={formik.touched.emailId && formik.errors.emailId}
            fullWidth
            required
            size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && formik.errors.password}
            helperText={formik.touched.password && formik.errors.password}
            fullWidth
            required
            type="password"
            size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Phone Number"
            name="userPhoneNumber"
            value={formik.values.userPhoneNumber}
            onChange={formik.handleChange}
            error={formik.touched.userPhoneNumber && formik.errors.userPhoneNumber}
            helperText={formik.touched.userPhoneNumber && formik.errors.userPhoneNumber}
            fullWidth
            required
            size="small"
          />
        </Grid>
      </Grid>
      <br />
      <Button variant="contained" sx={{ backgroundColor: '#861f41' }} type="submit">
        Register Employee
      </Button>
      <Button variant="outlined" color="primary" onClick={onClose} sx={{ marginLeft: 8 }}>
        Close
      </Button>
    </form>
  );
};

const ContentWriterRegistrationForm = ({ onSubmit, onClose }) => {
  const formik = useFormik({
    initialValues: {
      userFirstName: '',
      userLastName: '',
      emailId: '',
      password: '',
      userPhoneNumber: '',
    },
    validationSchema: Yup.object({
      userFirstName: Yup.string().required('First Name is required'),
      userLastName: Yup.string().required('Last Name is required'),
      emailId: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string()
        .required('Password is required')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
          'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.'
        ),
      userPhoneNumber: Yup.string()
        .required('Phone Number is required')
        .matches(
          /^\d{10}$/,
          'Mobile number must be a 10-digit number'
        ),
    }),
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} style={{ border: '1px solid #ccc', borderRadius: 5, padding: 16 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h3 style={{ textAlign: 'center' }}>Registration For Content-Writer</h3>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="First Name"
            name="userFirstName"
            value={formik.values.userFirstName}
            onChange={formik.handleChange}
            error={formik.touched.userFirstName && formik.errors.userFirstName}
            helperText={formik.touched.userFirstName && formik.errors.userFirstName}
            fullWidth
            required
            size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Last Name"
            name="userLastName"
            value={formik.values.userLastName}
            onChange={formik.handleChange}
            error={formik.touched.userLastName && formik.errors.userLastName}
            helperText={formik.touched.userLastName && formik.errors.userLastName}
            fullWidth
            required
            size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            name="emailId"
            value={formik.values.emailId}
            onChange={formik.handleChange}
            error={formik.touched.emailId && formik.errors.emailId}
            helperText={formik.touched.emailId && formik.errors.emailId}
            fullWidth
            required
            size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && formik.errors.password}
            helperText={formik.touched.password && formik.errors.password}
            fullWidth
            required
            type="password"
            size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Phone Number"
            name="userPhoneNumber"
            value={formik.values.userPhoneNumber}
            onChange={formik.handleChange}
            error={formik.touched.userPhoneNumber && formik.errors.userPhoneNumber}
            helperText={formik.touched.userPhoneNumber && formik.errors.userPhoneNumber}
            fullWidth
            required
            size="small"
          />
        </Grid>
      </Grid>
      <br />
      <Button variant="contained" sx={{ backgroundColor: '#861f41' }} type="submit">
        Register Content-Writer
      </Button>
      <Button variant="outlined" color="primary" onClick={onClose} sx={{ marginLeft: 8 }}>
        Close
      </Button>
    </form>
  );
};

export { ManagerRegistrationForm, EmployeeRegistrationForm,ContentWriterRegistrationForm};