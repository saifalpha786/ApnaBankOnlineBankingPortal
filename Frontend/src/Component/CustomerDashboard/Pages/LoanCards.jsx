import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import homeLoanImage from './../../../Images/home.jpg';
import carLoanImage from './../../../Images/car.jpg';
import educationLoanImage from './../../../Images/education.jpg';
import goldLoanImage from './../../../Images/gold.jpg';
import businessLoanImage from './../../../Images/business.jpg';
import { Link } from 'react-router-dom';

const cardStyle = {
  maxWidth: 400,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  backgroundColor: 'white',
};

const imageStyle = {
  objectFit: 'cover',
  height: 200,
};

const containerStyle = {
//   backgroundColor: 'whitesmoke',
};
const cardcontent={
    
}
const buttonStyle = {
    backgroundColor: 'transparent',
    color: '#861f41',
    border: 'none',
    boxShadow: 'none',
    textDecoration: 'none', // Add text decoration none by default
    transition: 'text-decoration 1s ease', // Add transition effect
    '&:hover': {
      textDecoration: 'underline', // Add underline on hover
      backgroundColor:'transparent',
      boxShadow:'none'
    },
  };
  

function LoanCards() {
  return (
    <Grid container spacing={2} sx={containerStyle} >
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item>
            <Card sx={cardStyle}>
              <img src={homeLoanImage} alt="Home Loan" style={imageStyle} />
              <CardContent  sx={{justifyContent:'center'}}>
                <Typography variant="h5" component="div">
                  Home Loan
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Interest Rate: 5.5%
                  {/* Add more loan-specific information here */}
                </Typography>
                <Button variant="contained" sx={buttonStyle} component={Link} to="/apnabank/customer/applyHomeLoan">
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card sx={cardStyle}>
              <img src={carLoanImage} alt="Car Loan" style={imageStyle} />
              <CardContent>
                <Typography variant="h5" component="div">
                  Car Loan
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Interest Rate: 6.2%
                  {/* Add more loan-specific information here */}
                </Typography>
                <Button variant="contained" sx={buttonStyle} component={Link} to="/apnabank/customer/applyCarLoan">
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card sx={cardStyle}>
              <img
                src={educationLoanImage}
                alt="Education Loan"
                style={imageStyle}
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  Education Loan
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Interest Rate: 4.8%
                  {/* Add more loan-specific information here */}
                </Typography>
                <Button variant="contained" sx={buttonStyle} component={Link} to="/apnabank/customer/applyEducationLoan">
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card sx={cardStyle}>
              <img src={goldLoanImage} alt="Gold Loan" style={imageStyle} />
              <CardContent>
                <Typography variant="h5" component="div">
                  Gold Loan
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Interest Rate: 7.5%
                  {/* Add more loan-specific information here */}
                </Typography>
                <Button variant="contained" sx={buttonStyle} component={Link} to="/apnabank/customer/applyGoldLoan">
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card sx={cardStyle}>
              <img
                src={businessLoanImage}
                alt="Business Loan"
                style={imageStyle}
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  Business Loan
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Interest Rate: 9.0%
                  {/* Add more loan-specific information here */}
                </Typography>
                <Button variant="contained" sx={buttonStyle} component={Link} to="/apnabank/customer/applyBusinessLoan">
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default LoanCards;
