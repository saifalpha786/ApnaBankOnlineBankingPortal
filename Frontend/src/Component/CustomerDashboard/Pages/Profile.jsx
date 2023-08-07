import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LockIcon from '@mui/icons-material/Lock';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '20px',
    marginLeft:'300px',
    marginTop:'50px',
    marginBottom:'50px'
  },
  profileCard: {
    width: '300px',
    height: '500px',
    borderRadius: '10px',
    background: '#ffffff',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoCardContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  infoCard: {
    width: '400px',
    height: '240px',
    borderRadius: '10px',
    background: '#ffffff',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center',
    padding: '16px',
  },
  avatar: {
    width: '100px',
    height: '100px',
    marginBottom: '16px',
    fontSize:'30px',
    color:'#861f41',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#861f41',
    fontFamily: 'Arial, sans-serif',
    marginBottom: '8px',
    textAlign: 'center',
  },
  infoLabel: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#861f41',
    marginBottom: '8px',
  },
  infoValue: {
    fontSize: '14px',
    color: '#333333',
    marginBottom: '4px',
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '200px',
    fontSize: '20px',
    color: '#777777',
  },
});

function CustomerProfile() {
  const [user, setUser] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    const decodedToken = jwt_decode(token);
    const userName = decodedToken.sub;

    axios
      .get(`http://localhost:9091/account/getUserAccountByUserName/${userName}`)
      .then((response) => {
        const userData = response.data;
        console.log(userData)
        setUser(userData);
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
      });
  }, []);

  if (!user) {
    return (
      <div className={classes.loading}>
        <Typography variant="body1">Loading...</Typography>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Card className={classes.profileCard}>
          <Avatar
            alt={`${user.userAccount.userFirstName} ${user.userAccount.userLastName}`}
            src="/avatar.png"
            className={classes.avatar}
          />
          <Typography variant="h4" className={classes.title}>
            {`${user.userAccount.userFirstName} ${user.userAccount.userLastName}`}
          </Typography>
          <Typography variant="h2" className={classes.infoLabel} style={{ marginTop:'20px' }}>
            Aadhar Card:
          </Typography>
          <Typography variant="body1" className={classes.infoValue} style={{ fontSize:'16px'}}>
          {"x".repeat(user.userAccount.userAadharCard.length - 4) + user.userAccount.userAadharCard.slice(-4)}
          </Typography>

          <Typography variant="h2" className={classes.infoLabel} style={{ textAlign: 'left' }}>
            Pan Card:
          </Typography>
          <Typography variant="body1" className={classes.infoValue} style={{ textAlign: 'left' }}>
          {"x".repeat(user.userAccount.userPanCard.length - 4) + user.userAccount.userPanCard.slice(-4)}
          </Typography>

        </Card>
        <div className={classes.infoCardContainer}>
          <Card className={classes.infoCard}>
            <Typography variant="h2" className={classes.infoLabel}>
              <EmailIcon fontSize="small" style={{ marginRight: '8px' }} />
              Email:
            </Typography>
            <Typography variant="body1" className={classes.infoValue}>
              {user.userAccount.emailId}
            </Typography>
            <Typography variant="h2" className={classes.infoLabel}>
              <PhoneIcon fontSize="small" style={{ marginRight: '8px' }} />
              Mobile Number:
            </Typography>
            <Typography variant="body1" className={classes.infoValue}>
              {user.userAccount.userPhoneNumber}
            </Typography>
            <Typography variant="h2" className={classes.infoLabel}>
              <AccountBoxIcon fontSize="small" style={{ marginRight: '8px' }} />
              Designation:
            </Typography>
            <Typography variant="body1" className={classes.infoValue}>
              {user.userAccount.roles[0].roleName}
            </Typography>
            <Typography variant="h2" className={classes.infoLabel} >
              Address:
            </Typography>
            <Typography variant="body1" className={classes.infoValue}>
              {`${user.userAccount.street}, ${user.userAccount.city}, ${user.userAccount.state}, ${user.userAccount.pinCode}`}
            </Typography>
          </Card>
          <Card className={classes.infoCard}>
            <Typography variant="h2" className={classes.infoLabel}>

              AccountId:
            </Typography>
            <Typography variant="body1" className={classes.infoValue}>
              {user.accountId}
            </Typography>
            <Typography variant="h2" className={classes.infoLabel}>
              Account Number:
            </Typography>
            <Typography variant="body1" className={classes.infoValue}>
              {user.accountNumber}
            </Typography>
            <Typography variant="h2" className={classes.infoLabel}>
              Account Type:
            </Typography>
            <Typography variant="body1" className={classes.infoValue}>
              {user.accountType}
            </Typography>
            <Typography variant="h2" className={classes.infoLabel}>
              Account Status:
            </Typography>
            <Typography variant="body1" className={classes.infoValue}>
              {user.accountStatus}
            </Typography>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CustomerProfile;
