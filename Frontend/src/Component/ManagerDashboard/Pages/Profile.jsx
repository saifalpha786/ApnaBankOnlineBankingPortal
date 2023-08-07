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

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  profileCard: {
    width: '400px',
    borderRadius: '10px',
    background: '#ffffff',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '16px',
    marginLeft:'400px'
  },
  avatar: {
    width: '100px',
    height: '100px',
    fontSize:'50px',
    color:'#861f41',
    marginBottom: '16px',
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
    display: 'flex',
    alignItems: 'center',
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

function ManagerProfile() {
  const [user, setUser] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    const decodedToken = jwt_decode(token);
    const userName = decodedToken.sub;

    axios
      .get(`http://localhost:9091/user/getUserByUserName/${userName}`)
      .then((response) => {
        const userData = response.data;
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
      <Card className={classes.profileCard}>
        <Avatar
          alt={`${user.userFirstName} ${user.userLastName}`}
          src="/avatar.png"
          className={classes.avatar}
        />
        <Typography variant="h4" className={classes.title}>
          {`${user.userFirstName} ${user.userLastName}`}
        </Typography>
        <Typography variant="h2" className={classes.infoLabel}>
          <EmailIcon fontSize="small" style={{ marginRight: '8px' }} />
          Email:
        </Typography>
        <Typography variant="body1" className={classes.infoValue}>
          {user.emailId}
        </Typography>
        <Typography variant="h2" className={classes.infoLabel}>
          <PhoneIcon fontSize="small" style={{ marginRight: '8px' }} />
          Mobile Number:
        </Typography>
        <Typography variant="body1" className={classes.infoValue}>
          {user.userPhoneNumber}
        </Typography>
        <Typography variant="h2" className={classes.infoLabel}>
          <AccountBoxIcon fontSize="small" style={{ marginRight: '8px' }} />
          Designation:
        </Typography>
        <Typography variant="body1" className={classes.infoValue}>
          {user.roles[0].roleName}
        </Typography>
      </Card>
    </div>
  );
}

export default ManagerProfile;
