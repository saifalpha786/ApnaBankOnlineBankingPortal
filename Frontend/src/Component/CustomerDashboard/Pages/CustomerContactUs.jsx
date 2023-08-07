import React, { useEffect, useState } from 'react';
import { Typography} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Mail';
import bannerImage from '../../../Images/contactUs.jpg';

const CustomerContactUs = () => {
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
                    <h1 style={{ color: '#0a1023', fontSize: '30px' }}>Reach us when you need us</h1>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                        <PhoneIcon style={{ marginRight: '5px' }} />
                        <h2 style={{ color: '#0a1023', fontSize: '20px' }}>1800500666</h2>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                        <PhoneIcon style={{ marginRight: '5px' }} />
                        <h3 style={{ color: '#0a1023', fontSize: '20px' }}>1890500666</h3>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                        <MailIcon style={{ marginRight: '5px' }} />
                        <h4 style={{ color: '#0a1023', fontSize: '20px' }}>apnabank07860@gmail.com</h4>
                    </div>
                </Typography>
            </div>
            <div
                style={{
                    backgroundImage: `url(${bannerImage})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    display: 'flex',
                    paddingLeft: '595px', // Add left padding to create space between the image and text
                }}
            >
            </div>
        </div>
    );
};

export default CustomerContactUs;