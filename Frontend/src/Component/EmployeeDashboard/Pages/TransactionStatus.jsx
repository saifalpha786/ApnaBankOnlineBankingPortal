import React, { useState } from 'react';
import { useAuth } from '../../../Utility.js/Auth';
import { Alert, Button, Card, CardContent, Modal, Snackbar, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios';
import CircularIndeterminate from './CircularIndeterminate'; // Import CircularIndeterminate component

function TransactionStatus() {
  const [showViewCustomerStatus, setShowViewCustomerStatus] = useState(false);
  const [customerStatus, setCustomerStatus] = useState('');
  const [customerData, setCustomerData] = useState([]);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Define isLoading state
  const auth = useAuth();

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
    setIsLoading(true); // Set isLoading to true when starting customer data retrieval
    axios
      .get(`http://localhost:9091/transaction/getTransactionStatus/${status}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.jwt}`,
        },
      })
      .then((res) => {
        setCustomerData(res.data);
        setIsLoading(false); // Set isLoading to false when customer data retrieval is complete
      })
      .catch((error) => {
        console.error(error);
        setCustomerData([]);
        setIsLoading(false); // Set isLoading to false on error during customer data retrieval
      });
  };

  const handleApproveTransaction = (transactionId) => {
    axios
      .put(`http://localhost:9091/transaction/approveTransaction/${transactionId}`, null, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.jwt}`,
        },
      })
      .then((res) => {
        setIsSuccessOpen(true);
        // Refresh customer data after successful approval
        handleCustomerSearch(customerStatus);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div style={{ position: 'relative', width: '70%', padding: '16px', background: 'white' }}>
      <div className="d-flex justify-content-between mb-3">
        <div>
          <Button
            variant="contained"
            style={{ background: '#861f41', color: '#ffffff' }}
            onClick={handleViewCustomerStatus}
          >
            View Transaction Status
          </Button>{' '}
        </div>
      </div>

      {showViewCustomerStatus && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '80%',
              padding: 16,
              background: 'white',
              fontFamily: 'Roboto',
              maxHeight: '90vh',
              overflow: 'auto',
            }}
          >
            <h2>View Customer Status</h2>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '16px',
              }}
            >
              <select
                value={customerStatus}
                onChange={handleCustomerStatusChange}
                placeholder="Select customer status"
                style={{ marginRight: '16px', height: '39px' }}
              >
                <option value="">Select Customer Status</option>
                <option value="PENDING">PENDING</option>
                <option value="SUCCESSFULL">SUCCESSFULL</option>
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
            <div className="table-container">
              <table
                className="table align-middle mb-0 bg-white"
                style={{
                  marginTop: '16px',
                  borderCollapse: 'collapse',
                  width: '100%',
                }}
              >
                <thead>
                  <tr style={{ backgroundColor: 'black', color: 'white' }}>
                    <th style={{ padding: '8px', textAlign: 'left' }}>TransactionId</th>
                    <th style={{ padding: '8px', textAlign: 'left' }}>Customer A/C</th>
                    <th style={{ padding: '8px', textAlign: 'left' }}>Customer UserName</th>
                    <th style={{ padding: '8px', textAlign: 'left' }}>Target A/C</th>
                    <th style={{ padding: '8px', textAlign: 'left' }}>Target IFSCCode</th>
                    <th style={{ padding: '8px', textAlign: 'left' }}>Target OwnerName</th>
                    <th style={{ padding: '8px', textAlign: 'left' }}>Amount</th>
                    <th style={{ padding: '8px', textAlign: 'left' }}>Initiation Date</th>
                    <th style={{ padding: '8px', textAlign: 'left' }}>Transaction Type</th>
                    <th style={{ padding: '8px', textAlign: 'left' }}>Transaction Status</th>
                    <th style={{ padding: '8px', textAlign: 'left' }}>Transaction Note</th>
                    <th style={{ padding: '8px', textAlign: 'left' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {customerData.map((customer, index) => (
                    <tr
                      key={customer.transactionId}
                      style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'transparent' }}
                    >
                      <td style={{ padding: '8px', textAlign: 'left' }}>{customer.transactionId}</td>
                      <td style={{ padding: '8px', textAlign: 'left' }}>{customer.customerAccountNumber}</td>
                      <td style={{ padding: '8px', textAlign: 'left' }}>{customer.customerUserName}</td>
                      <td style={{ padding: '8px', textAlign: 'left' }}>{customer.targetAccountNumber}</td>
                      <td style={{ padding: '8px', textAlign: 'left' }}>{customer.targetIFSCCode}</td>
                      <td style={{ padding: '8px', textAlign: 'left' }}>{customer.targetOwnerName}</td>
                      <td style={{ padding: '8px', textAlign: 'left' }}>{customer.amount}</td>
                      <td style={{ padding: '8px', textAlign: 'left' }}>{customer.initiationDate}</td>
                      <td style={{ padding: '8px', textAlign: 'left' }}>
                        {capitalizeFirstLetter(customer.transactionType)}
                      </td>
                      <td style={{ padding: '8px', textAlign: 'left' }}>
                        {capitalizeFirstLetter(customer.transactionStatus)}
                      </td>
                      <td style={{ padding: '8px', textAlign: 'left' }}>{customer.transactionNote}</td>
                      <td style={{ padding: '8px', textAlign: 'left' }}>
                        {customer.transactionStatus === 'PENDING' && (
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleApproveTransaction(customer.transactionId)}
                          >
                            Approve
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {isLoading && <CircularIndeterminate />} {/* Show loading indicator while isLoading is true */}
            </div>
          </div>
        </div>
      )}

      <Snackbar
        open={isSuccessOpen}
        autoHideDuration={6000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSuccess} severity="success">
          Transaction approved successfully!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default TransactionStatus;
