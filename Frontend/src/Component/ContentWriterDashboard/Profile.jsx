import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  card: {
    width: '400px',
    borderRadius: '10px',
    background: '#ffffff',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft:'350px'
  },
  avatar: {
    width: '100px',
    height: '100px',
    marginBottom: '16px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
  },
  heading: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '16px',
    color: '#861f41',
    textAlign: 'center',
  },
  info: {
    fontSize: '16px',
    marginBottom: '8px',
    color: '#333333',
    textAlign: 'center',
  },
});

function ContentWriterProfile() {
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
    return <div>Loading...</div>;
  }

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <Avatar
          alt={`${user.userFirstName} ${user.userLastName}`}
          src="/avatar.png"
          className={classes.avatar}
        />
        <Typography variant="h2" className={classes.heading}>
          {user.userFirstName} {user.userLastName}
        </Typography>
        <Typography variant="body1" className={classes.info}>
          Email: {user.emailId}
        </Typography>
        <Typography variant="body1" className={classes.info}>
          Mobile Number: {user.userPhoneNumber}
        </Typography>
        <Typography variant="body1" className={classes.info}>
          Designation: {user.roles[0].roleName}
        </Typography>
      </Card>
    </div>
  );
}

export default ContentWriterProfile;
