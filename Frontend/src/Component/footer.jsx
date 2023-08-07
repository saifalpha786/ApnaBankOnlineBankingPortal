import React from 'react';
import { Container, Typography, Grid, Link, styled } from '@mui/material';
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Google as GoogleIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
  MailOutline as EmailIcon,
  Phone as PhoneIcon,
  Print as PrintIcon,
} from '@mui/icons-material';

const FooterContainer = styled('footer')(({ theme }) => ({
  backgroundColor: "#e4e4e4",
  padding: theme.spacing(6),
  marginTop: 'auto',
}));

const StyledLink = styled(Link)({
  marginRight: ({ theme }) => theme.spacing(1),
});

const Footer = () => {
  return (
    <FooterContainer>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h3" color="textPrimary" gutterBottom>
              Apna Bank
            </Typography>
            <Typography variant="body2" color="textSecondary">
            Apna Bank is one of India’s leading private banks and was among the first to receive approval from the Reserve Bank of India (RBI) to set up a private sector bank in 1994.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              Products
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <StyledLink href="#" color="inherit">
                Open Account
              </StyledLink>
              <br />
              <StyledLink href="#" color="inherit">
                Credit Card
              </StyledLink>
              <br />
              <StyledLink href="#" color="inherit">
                Loan
              </StyledLink>
              <br />
              <StyledLink href="#" color="inherit">
                Locker
              </StyledLink>
              <br />
              <StyledLink href="#" color="inherit">
                Gift Card
              </StyledLink>
              <br />
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              Useful Links
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <StyledLink href="#" color="inherit">
                Pricing
              </StyledLink>
              <br />
              <StyledLink href="#" color="inherit">
                Settings
              </StyledLink>
              <br />
              <StyledLink href="#" color="inherit">
                Orders
              </StyledLink>
              <br />
              <StyledLink href="#" color="inherit">
                Help
              </StyledLink>
              <br />
            </Typography>
          </Grid>
        </Grid>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item>
            <FacebookIcon />
          </Grid>
          <Grid item>
            <TwitterIcon />
          </Grid>
          <Grid item>
            <GoogleIcon />
          </Grid>
          <Grid item>
            <InstagramIcon />
          </Grid>
          <Grid item>
            <LinkedInIcon />
          </Grid>
          <Grid item>
            <GitHubIcon />
          </Grid>
        </Grid>
      </Container>
      <Typography variant="body2" color="textSecondary" align="center">
        &copy; {new Date().getFullYear()} Apna Bank. All rights reserved.
      </Typography>
    </FooterContainer>
  );
};

export default Footer;
