import React from 'react';
import backgroundImage from '../../../Images/v960-ning-05.jpg';

const Banner = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100px', // adjust the height as needed
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'black',
        fontSize: '32px',
        fontWeight: 'bold',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        width:'1145px'
      }}
    >
      <span>Welcome to Loan</span>
    </div>
  );
};

export default Banner;
