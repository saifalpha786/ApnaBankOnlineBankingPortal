import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../Utility.js/Auth';
import './Locker.css';
import { FaLock } from 'react-icons/fa';
import {
    Typography,
    Button,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from '@mui/material';
import jwt_decode from 'jwt-decode';
import LockerAbout from './LockerAbout';



const LockerComponent = () => {
    const auth = useAuth(); // Assuming useAuth provides the auth object with the JWT token



    const [customerAccountNumber, setCustomerAccountNumber] = useState('');
    const [lockerSize, setLockerSize] = useState('SMALL');
    const [avialLockerFormonth, setAvialLockerFormonth] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [lockers, setLocker] = useState([]);
    const [showLocker, setShowLocker] = useState(false);
    const [locationForLocker, setLocationForLocker] = useState('');
    const [locationAvailability, setLocationAvailability] = useState([]);
    const [openPopup, setOpenPopup] = useState(false);
    const cities = ["Delhi", "Mumbai", "Bangalore", "Kolkata", "Chennai", "Hyderabad", "Ahmedabad"];


    const [user, setUser] = useState(null);



    useEffect(() => {
        const fetchLocationAvailability = async () => {
            if (locationForLocker) {
                try {
                    const response = await axios.get(`http://localhost:9091/locker/getLocationDetailByCity/${locationForLocker}`, {
                        headers: {
                            Authorization: `Bearer ${auth.jwt}`,
                        },
                    });
                    setLocationAvailability(response.data);
                } catch (error) {
                    setLocationAvailability(null);
                    console.error('Error fetching location availability:', error);
                }
            }
        };

        fetchLocationAvailability();
    }, [locationForLocker]);

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        const decodedToken = jwt_decode(token);
        const userName = decodedToken.sub;

        axios
            .get(`http://localhost:9091/account/getUserAccountByUserName/${userName}`)
            .then(response => {
                const userData = response.data;
                setUser(userData);
            })
            .catch(error => {
                console.error('Error fetching user details:', error);
            });
    }, []);

    useEffect(() => {
        if (user) {

            setCustomerAccountNumber(user.accountNumber);
        }
    }, [user]);
    if (!user) {
        return <div>Loading...</div>;
    }

    const handleViewAllLocker = async () => {
        try {
            const response = await axios.get('http://localhost:9091/locker/getListOfLockerForCurrentUser', {
                headers: {
                    Authorization: `Bearer ${auth.jwt}`,
                },
            });
            setLocker(response.data);
            setShowLocker(true);
        } catch (error) {
            console.error('Error fetching Locker:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const payload = {
                avialLockerFormonth,
                customerAccountNumber,
                lockerSize,
                locationForLocker,
            };

            const response = await axios.post('http://localhost:9091/locker/applyForNewLocker', payload, {
                headers: {
                    Authorization: `Bearer ${auth.jwt}`,
                },
            });
            setSuccessMessage('Locker applied successfully!', response.data);
            setErrorMessage('');
            console.log('Locker applied successfully:', response.data);

            // TODO: Handle successful response, e.g., show a success message to the user

            setLoading(false);
        } catch (error) {
            setSuccessMessage('');
            setErrorMessage('Failed to apply Locker. Please try again.');
            console.error('Error applying Locker:', error);
            setError('Failed to apply Locker. Please try again.');
            setLoading(false);
        }
    };

    const handleLocationChange = (e) => {
        const selectedLocation = e.target.value;
        setLocationForLocker(selectedLocation);
        setOpenPopup(true);
    };

    const handleClosePopup = () => {
        setOpenPopup(false);
    };

    const styles = {
        tableContainer: {
            maxWidth: '1200px',
            margin: '0 auto',
            marginTop: '20px',
        },
        tableHeadCell: {
            fontWeight: 'bold',
            backgroundColor: '#f5f5f5',
            color: '#333',
            padding: '12px',
        },
        tableCell: {
            padding: '12px',
        },
    };

    const imageUrl = 'E:\new pro\front_end_model_new\src\Images\safe-deposit-locker (1).jpg';

    return (
        <div>
           <div style={{margin:'4px'}}>
           <h2 style={{fontFamily:'Roboto'}}>Welcome to Locker Facility </h2>
            <h6>Lock It, Leave It, and Relax: Trust Locker Facility for Unmatched Security!</h6>
           </div>
            <div style={{ display: 'flex', margin: '20px' }}>
                <div style={{}}>
                    <LockerAbout></LockerAbout>
                </div>
                <div style={{ marginLeft: '60px' }}>
                    <h2 style={{ textAlign: 'center', fontWeight: 'bold' }}>Apply for Locker</h2>
                    {error && <p>{error}</p>}
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <form
                            onSubmit={handleSubmit}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                width: '400px',
                                border: '1px solid #ccc',
                                borderRadius: '20px',
                                padding: '20px',
                                backgroundColor: '#f5f5f5',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <label style={{ marginBottom: '10px' }}>
                                Avail Locker For Month:
                                <br />
                                <input
                                    type="number"
                                    value={avialLockerFormonth}
                                    onChange={(e) => setAvialLockerFormonth(e.target.value)}
                                    required
                                    placeholder="Enter the number of months"
                                    style={{
                                        width: '230px',
                                        padding: '10px',
                                        borderRadius: '4px',
                                        border: '1px solid #ccc',
                                        marginBottom: '10px',
                                    }}
                                />
                            </label>

                            <label style={{ marginBottom: '10px' }}>
                                Location for Locker:
                                <br />
                                <select
                                    value={locationForLocker}
                                    onChange={handleLocationChange}
                                    required
                                    style={{
                                        width: '230px',
                                        padding: '10px',
                                        borderRadius: '4px',
                                        border: '1px solid #ccc',
                                        marginBottom: '10px',
                                    }}
                                >
                                    <option value="">Select location for locker</option>
                                    {cities.map((city) => (
                                        <option value={city} key={city}>
                                            {city}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label style={{ marginBottom: '10px' }}>
                                Locker Size:
                                <br />
                                <select
                                    value={lockerSize}
                                    onChange={(e) => setLockerSize(e.target.value)}
                                    required
                                    style={{
                                        width: '230px',
                                        padding: '10px',
                                        borderRadius: '4px',
                                        border: '1px solid #ccc',
                                        marginBottom: '10px',
                                    }}
                                >
                                    <option value="">Select locker size</option>
                                    <option value="SMALL">Small</option>
                                    <option value="MEDIUM">Medium</option>
                                    <option value="LARGE">Large</option>
                                </select>
                            </label>

                            <label style={{ marginBottom: '10px' }}>
                                Customer Account Number:
                                <br />
                                <input
                                    type="number"
                                    value={customerAccountNumber}
                                    onChange={(e) => setCustomerAccountNumber(e.target.value)}
                                    required
                                    placeholder="Enter customer account number"
                                    style={{
                                        width: '230px',
                                        padding: '10px',
                                        borderRadius: '4px',
                                        border: '1px solid #ccc',
                                        marginBottom: '10px',
                                    }}
                                />
                            </label>

                            <button
                                type="submit"
                                disabled={loading}
                                style={{
                                    backgroundColor: '#861f41',
                                    color: 'white',
                                    border: 'none',
                                    padding: '12px 20px',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                }}
                            >
                                {loading ? 'Applying...' : 'Apply For Locker'}
                            </button>
                        </form>

                    </div>
                    {successMessage && <Typography variant="body1">{successMessage}</Typography>}
                    {errorMessage && <Typography variant="body1">{errorMessage}</Typography>}
                </div>
            </div>

            <br />
            <Button
                variant="contained"
                onClick={handleViewAllLocker}
                style={{
                    background: '#861f41',
                    color: '#fff',
                    borderRadius: '50px',
                    padding: '12px 24px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
                }}
            >
                <FaLock style={{ fontSize: '20px' }} />
                View All Locker
            </Button>

            {showLocker && (
                <div style={{ overflowX: 'scroll', width: '1100px'}}>
                    <TableContainer component={Paper} style={styles.tableContainer}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={styles.tableHeadCell}>Locker Id</TableCell>
                                    <TableCell style={styles.tableHeadCell}>Locker Size</TableCell>
                                    <TableCell style={styles.tableHeadCell}>Avail Locker For Month</TableCell>
                                    <TableCell style={styles.tableHeadCell}>Valid From Date</TableCell>
                                    <TableCell style={styles.tableHeadCell}>Valid To Date</TableCell>
                                    <TableCell style={styles.tableHeadCell}>Locker Size Cost</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {lockers.map((locker) => (
                                    <TableRow key={locker.lockerId}>
                                        <TableCell style={styles.tableCell}>{locker.lockerId}</TableCell>
                                        <TableCell style={styles.tableCell}>{locker.lockerSize}</TableCell>
                                        <TableCell style={styles.tableCell}>{locker.avialLockerFormonth}</TableCell>
                                        <TableCell style={styles.tableCell}>{locker.validFromDate}</TableCell>
                                        <TableCell style={styles.tableCell}>{locker.validToDate}</TableCell>
                                        <TableCell style={styles.tableCell}>{locker.lockerSizeCost}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            )}

            <Dialog open={openPopup} onClose={handleClosePopup}>
                <DialogTitle>Location Availability</DialogTitle>
                <DialogContent>
                    {locationAvailability ? (
                        <>
                            <DialogContentText>
                                Location: {locationAvailability.cityOfLocker}
                            </DialogContentText>
                            <DialogContentText>
                                Small Size Locker: {locationAvailability.smallSizeLocker}
                            </DialogContentText>
                            <DialogContentText>
                                Medium Size Locker: {locationAvailability.mediumSizeLocker}
                            </DialogContentText>
                            <DialogContentText>
                                Large Size Locker: {locationAvailability.largeSizeLocker}
                            </DialogContentText>
                        </>
                    ) : (
                        <DialogContentText>No Locker Available at This Location</DialogContentText>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClosePopup}>Close</Button>
                </DialogActions>
            </Dialog>



        </div>
    );
};

export default LockerComponent;