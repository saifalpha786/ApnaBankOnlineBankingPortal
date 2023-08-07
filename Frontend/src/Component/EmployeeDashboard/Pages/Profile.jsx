import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';

const useStyles = makeStyles({
  root: {
    padding: '24px',
    backgroundColor: '#ddecf9',
    borderRadius: '29px',
    width: '500px',
    margin: '0 auto',
    fontFamily: 'Roboto',
    marginTop:'20px',
    marginBottom:'10px'
  },
  heading: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '16px',
    color: '#333',
  },
  info: {
    marginBottom: '8px',
    color: '#666',
  },
  avatar: {
    width: '80px',
    height: '80px',
    marginBottom: '16px',
  },
});

function EmployeeProfile() {
  const [user, setUser] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    const decodedToken = jwt_decode(token);
    const userName = decodedToken.sub;

    axios
      .get(`http://localhost:9091/user/getUserByUserName/${userName}`)
      .then(response => {
        const userData = response.data;
        setUser(userData);
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
      });
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={classes.root}>
      <Grid container direction="column" alignItems="center">
        <Avatar
          alt={`${user.userFirstName} ${user.userLastName}`}
          src="/avatar.png"
          className={classes.avatar} style={{background:'#861f41',fontSize:'32px'}}
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
      </Grid>
    </div>
  );
}

export default EmployeeProfile;