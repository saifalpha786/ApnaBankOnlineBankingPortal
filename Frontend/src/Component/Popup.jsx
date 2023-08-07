import React, { useState } from 'react';
import bankLogo from '../Images/whatsapp.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faGift } from '@fortawesome/free-solid-svg-icons';

const Popup = () => {
    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => {
        setIsOpen(false);
    };

    const overlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)', 
        zIndex: 9999,
    };

    const popupStyle = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#fff',
        padding: '20px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
        zIndex: 10000,
    };

    const closeIconStyle = {
        position: 'absolute',
        top: '10px',
        right: '10px',
        cursor: 'pointer',
        color: '#861f41',
    };

    const popupContentStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
    };

    const bankLogoStyle = {
        width: '30%',
        marginBottom: '20px',
        marginTop: '10px',
    };

    const additionalPointsStyle = {
        marginTop: '40px',
        width: '70%',
    };

    const h1ContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0',
    };

    const h1Style = {
        margin: '0',
        color: '#861f41',
    };

    const secondH1Style = {
        ...h1Style,
        color: '#000',
    };

    const iconStyle = {
        marginRight: '10px',
        color: '#861f41',
    };

    const additionalPointsFontSize = '20px';

    return (
        isOpen && (
            <div>
                <div style={overlayStyle} onClick={handleClose}></div>
                <div style={popupStyle}>
                    <div style={popupContentStyle}>
                        <div style={h1ContainerStyle}>
                            <h1 style={h1Style}>Apna Bank &nbsp;</h1>
                            <h1 style={secondH1Style}> is now on WhatsApp</h1>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                            <img src={bankLogo} alt="Apna Bank" style={bankLogoStyle} />
                            <div style={{ ...additionalPointsStyle, fontSize: additionalPointsFontSize, fontWeight: 'bold' }}>
                                <p>
                                    <FontAwesomeIcon icon={faBell} style={iconStyle} />
                                    Get real-time notifications for your transactions.
                                </p>
                                <p>
                                    <FontAwesomeIcon icon={faGift} style={iconStyle} />
                                    Receive exclusive offers and promotions.
                                </p>
                                <p style={{ margin: '0' }}>
                                    Send us <span style={{ color: '#861f41', fontSize: '24px', fontWeight: 'bold' }}>“join pack-root”</span> on{' '}
                                    <span style={{ color: '#861f41', fontSize: '22px', fontWeight: 'bold' }}>+14155238886</span> for all your banking needs.
                                </p>
                            </div>
                        </div>
                    </div>
                    <span
                        style={{
                            position: 'absolute', top: '1px', right: '5px', cursor: 'pointer', color: '#861f41', fontSize: '20px', margin: '5px', backgroundColor: '#861f41', borderRadius: '50%', width: '25px', height: '25px', display: 'flex', justifyContent: 'center', alignItems: 'center',
                        }}
                        onClick={handleClose}
                    >
                        <span style={{ color: 'white' }}>X</span>
                    </span>
                </div>
            </div>
        )
    );
};

export default Popup;
