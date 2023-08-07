import React, { useState } from 'react';
import { useAuth } from '../../../Utility.js/Auth';
import { Alert, Button, Card, CardContent, Modal, Snackbar, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios';

function CustomerStatus() {
  const [showViewCustomerStatus, setShowViewCustomerStatus] = useState(false);
  const [customerStatus, setCustomerStatus] = useState('');
  const [customerData, setCustomerData] = useState([]);
  const auth = useAuth();


  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const handleCloseSuccess = () => {
    setIsSuccessOpen(false);
  };

  const handleViewCustomerStatus = () => {
    setShowViewCustomerStatus(true);
  };

  const handleCustomerStatusChange = (event) => {
    setCustomerStatus(event.target.value);
    handleCustomerSearch(event.target.value);
  };

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  const handleCustomerSearch = (status) => {
    axios
      .get(`http://localhost:9091/user/getCustomerByStatus/${status}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.jwt}`,
        },
      })
      .then((res) => {
        setCustomerData(res.data);

      })
      .catch((error) => {
        console.error(error);
        setCustomerData([]);
      });
  };

  const approveCustomer = (userId) => {
    const data = {
      userAccount: {
        userId: userId,
      },
    };

    axios
      .post('http://localhost:9091/account/addCustomerAccount', data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.jwt}`,
        },
      })
      .then((res) => {
        console.log(res);
        setIsSuccessOpen(true);
        setCustomerData(prevData => prevData.filter(customer => customer.userId !== userId));
      })
      .catch((error) => {
        console.error(error);
        // Handle error
      });
  };

  return (
    <div style={{ position: 'relative', width: '70%', padding: '16px', background: 'white' }}>
      <div className="d-flex justify-content-between mb-3">
        <div>
          <Button variant="contained" style={{ background: '#861f41', color: '#ffffff' }} onClick={handleViewCustomerStatus}>
            View Customer Status
          </Button>{' '}
        </div>
      </div>

      {showViewCustomerStatus && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.5)', zIndex: 9999 }}>
          <div style={{ position: 'relative', margin: 'auto', width: '50%', padding: 16, background: 'white', fontFamily: 'Roboto' }}>
            <h2>View Customer Status</h2>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <select
                value={customerStatus}
                onChange={handleCustomerStatusChange}
                placeholder="Select customer status"
                style={{ marginRight: '16px', height: '39px' }}
              >
                <option value="">Select Customer Status</option>
                <option value="PENDING">PENDING</option>
                <option value="ACTIVE">ACTIVE</option>
              </select>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setShowViewCustomerStatus(false)}
                style={{ color: 'aliceblue', background: '#861f41' }}
              >
                Close
              </Button>
            </div>


            {/* Display employee data */}
            <div style={{ overflowY: 'scroll' }} >
              <table className="table align-middle mb-0 bg-white" style={{ marginTop: '16px', borderCollapse: 'collapse', width: '100%', }}>
                <thead>
                  <tr style={{ backgroundColor: 'black', color: 'white' }}>
                    <th style={{ padding: '8px', textAlign: 'left' }}>UserId</th>
                    <th style={{ padding: '8px', textAlign: 'left' }}>User Name</th>
                    <th style={{ padding: '8px', textAlign: 'left' }}>Status</th>
                    <th style={{ padding: '8px', textAlign: 'left' }}>Account Type Request</th>
                    <th style={{ padding: '8px', textAlign: 'left' }}>Aadhar Card</th>
                    <th style={{ padding: '8px', textAlign: 'left' }}>Pan Card</th>
                    <th style={{ padding: '8px', textAlign: 'left' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {customerData.map((customer, index) => (
                    <tr key={customer.userId} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'transparent' }}>
                      <td style={{ padding: '8px', textAlign: 'left' }}>{customer.userId}</td>
                      <td style={{ padding: '8px', textAlign: 'left' }}>{customer.userFirstName}</td>
                      <td style={{ padding: '8px', textAlign: 'left' }}>{capitalizeFirstLetter(customer.userStatus)}</td>
                      <td style={{ padding: '8px', textAlign: 'left' }}>{capitalizeFirstLetter(customer.accountTypeRequest)}</td>
                      <td style={{ padding: '8px', textAlign: 'left' }}>{customer.userAadharCard}</td>
                      <td style={{ padding: '8px', textAlign: 'left' }}>{customer.userPanCard}</td>
                      <td style={{ padding: '8px', textAlign: 'left' }}>
                        <button
                          type="button"
                          className="btn btn-link btn-sm btn-rounded"
                          style={{
                            textDecoration: 'none',
                            pointerEvents: customer.userStatus === 'ACTIVE' ? 'none' : 'auto',
                            opacity: customer.userStatus === 'ACTIVE' ? 0.5 : 1,
                            color: 'white',
                            background: '#861f41'
                          }}
                          onClick={() => approveCustomer(customer.userId)}
                          disabled={customer.userStatus === 'ACTIVE'}
                        >
                          Approve Customer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>


          </div>
        </div>
      )
      }

      <Modal open={isSuccessOpen} onClose={handleCloseSuccess} style={{zIndex:'10000'}}>
        <Card sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400 }}>
          <CardContent>
            <CheckCircleIcon style={{ color: 'green', fontSize: 48, marginBottom: 16 }} />
            <Typography variant="h6" component="div" gutterBottom>
              Approval Successful
            </Typography>
            <Typography variant="body1">
              The customer account has been approved successfully.
            </Typography>
          </CardContent>
        </Card>
      </Modal>

    </div >
  );
}

export default CustomerStatus;