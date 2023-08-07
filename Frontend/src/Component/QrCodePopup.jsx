// Popup.js

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import qrCodeImage from '../Images/QrCode.png';
import { Margin } from '@mui/icons-material';

const QrPopup = ({ isOpen, onClose }) => {
    const overlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
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

    const headingStyle = {
        fontSize: '24px',
        textAlign: 'center',
        marginBottom: '20px',
        marginTop: '21px',
        color: '#000000',
        fontWeight: 'bold',
        Margin: '2px'

    };

    const imageContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
    };

    const imageStyle = {
        maxWidth: '100%',
        maxHeight: '100%',
    };

    const handleClose = () => {
        onClose();
    };

    return (
        isOpen && (
            <div>
                <div style={overlayStyle} onClick={handleClose}></div>
                <div style={popupStyle}>
                    <h1 style={headingStyle}>Scan to Register WhatsApp Service</h1>
                    <div style={imageContainerStyle}>
                        <img src={qrCodeImage} alt="QR Code" style={imageStyle} />
                    </div>
                    <h2 style={headingStyle}> send "<span style={{ color: '#861f41' }}>join pack-root</span>" to get Register
                    </h2>
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

export default QrPopup;
