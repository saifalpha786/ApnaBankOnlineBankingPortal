import React, { useEffect, useState } from 'react';
import { Typography, Button } from '@mui/material';
import bannerImage from '../../../Images/Apna-Sahkari-Bank-Heaquarter.jpg';

const EmployeeAboutUs = () => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);

    const words = ['Simple.', 'Transparent.', 'Secure.'];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, 2000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: '50% 50%',
                height: '600px',
            }}
        >
            <div
                style={{
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '40px',
                }}
            >
                <Typography variant="h4" component="h2" style={{ color: '#055c2d', marginBottom: '2px' }}>
                    {words.map((word, index) => (
                        <span
                            key={index}
                            style={{
                                opacity: index <= currentWordIndex ? 1 : 0,
                                transition: 'opacity 0.5s',
                            }}
                        >
                            {word}
                        </span>
                    ))}
                    <br />
                    <h1 style={{ color: '#0a1023',fontSize:'50px' }}>About Us</h1>
                    <h2 style={{ color: '#0a1023',fontSize:'20px'}}>Our Corporate Office.</h2>
                </Typography>
                <Typography variant="body1" component="p" style={{ color: '#0a1023', marginBottom: '20px' }}>
                    Apna Bank Limited, Corporate Office, Bombay Dyeing Mills Compound,<br></br> Pandurang Budhkar Marg,Worli, <br></br>Mumbai - 400 025<br></br>
                    Tel: (022) 2345 2929<br></br>
                    CIN: F46111GJ1993TEL131786
                </Typography>
            </div>
            <div
                style={{
                    display: 'flex',
                    padding: '200px',
                    backgroundImage: `url(${bannerImage})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'centre',
                }}
            ></div>
        </div>
    );
};

export default EmployeeAboutUs;