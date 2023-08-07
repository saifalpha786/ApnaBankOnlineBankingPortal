import React, { useState } from 'react';
import { useAuth } from '../../../Utility.js/Auth';
import { Button, Card, Modal, Typography } from '@mui/material';
import { Card as MuiCard, CardContent } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios';

function UserStatus() {
  const [showViewEmployeeStatus, setShowViewEmployeeStatus] = useState(false);
  const [showViewManagerStatus, setShowViewManagerStatus] = useState(false);
  const[showViewContentWriterStatus, setShowViewContentWriterStatus] = useState(false);
  const [employeeStatus, setEmployeeStatus] = useState('');
  const [managerStatus, setManagerStatus] = useState('');
  const [contentWriterStatus, setContentWriterStatus] = useState('');
  const [employeeData, setEmployeeData] = useState([]);
  const [managerData, setManagerData] = useState([]);
  const [contentWriterData, setContentWriterData] = useState([]);
  const auth = useAuth();

  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const handleCloseSuccess = () => {
    setIsSuccessOpen(false);
  };

  const handleViewEmployeeStatus = () => {
    setShowViewEmployeeStatus(true);
  };

  const handleViewManagerStatus = () => {
    setShowViewManagerStatus(true);
  };

  const handleViewContentWriterStatus = () => {
    setShowViewContentWriterStatus(true);
  }

  const handleEmployeeStatusChange = (event) => {
    setEmployeeStatus(event.target.value);
    handleEmployeeSearch(event.target.value);
  };

  const handleManagerStatusChange = (event) => {
    setManagerStatus(event.target.value);
    handleManagerSearch(event.target.value);
  };

  const handleContentWriterStatusChange = (event) => {
    setContentWriterStatus(event.target.value);
    handleContentWriterSearch(event.target.value);
  }
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
  const handleManagerSearch = (status) => {
    axios
      .get(`http://localhost:9091/user/getManagerByStatus/${status}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.jwt}`,
        },
      })
      .then((res) => {
        setManagerData(res.data);
      })
      .catch((error) => {
        console.error(error);
        setManagerData([]);
      });
  };

  const handleEmployeeSearch = (status) => {
    axios
      .get(`http://localhost:9091/user/getEmployeeByStatus/${status}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.jwt}`,
        },
      })
      .then((res) => {
        setEmployeeData(res.data);

      })
      .catch((error) => {
        console.error(error);
        setEmployeeData([]);
      });
  };


  const handleContentWriterSearch = (status) => {
    axios
      .get(`http://localhost:9091/user/getContentWriterByStatus/${status}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.jwt}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setContentWriterData(res.data);

      })
      .catch((error) => {
        console.error(error);
        setContentWriterData([]);
      });
  };

  const approveManager = (userId) => {
    const data = {
      userAccount: {
        userId: userId,
      },
    };

    axios
      .post('http://localhost:9091/account/addManagerAccount', data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.jwt}`,
        },
      })
      .then((res) => {
        console.log(res);
        setIsSuccessOpen(true);
        setManagerData(prevData => prevData.filter(manager => manager.userId !== userId));
      })
      .catch((error) => {
        console.error(error);
        // Handle error
      });
  };

  const approveEmployee = (userId) => {
    const data = {
      userAccount: {
        userId: userId,
      },
    };

    axios
      .post('http://localhost:9091/account/addEmployeeAccount', data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.jwt}`,
        },
      })
      .then((res) => {
        console.log(res);
        setIsSuccessOpen(true);
        setEmployeeData(prevData => prevData.filter(employee => employee.userId !== userId));
        // Handle success
      })
      .catch((error) => {
        console.error(error);
        // Handle error
      });
  };


  const approveContentWriter = (userId) => {
    const data = {
      userAccount: {
        userId: userId,
      },
    };

    axios
      .post('http://localhost:9091/account/addContentWriterAccount', data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.jwt}`,
        },
      })
      .then((res) => {
        console.log(res);
        setIsSuccessOpen(true);
        setContentWriterData(prevData => prevData.filter(contentWriter => contentWriter.userId !== userId));
        // Handle success
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
          <Button variant="contained" style={{ background: '#861f41', color: '#ffffff' }} onClick={handleViewEmployeeStatus}>
            View Employee Status
          </Button>{' '}
          <Button variant="contained" style={{ background: '#861f41', color: '#ffffff',marginLeft:'10px' }} onClick={handleViewManagerStatus}>
            View Manager Status
          </Button>
          <Button variant="contained" style={{ background: '#861f41', color: '#ffffff' ,marginLeft:'10px'}} onClick={handleViewContentWriterStatus}>
            View Content-Writer Status
          </Button>
        </div>
      </div>

      {showViewEmployeeStatus && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.5)', zIndex: 9999 }}>
          <div style={{ position: 'relative', margin: 'auto', width: '50%', padding: 16, background: 'white', fontFamily: 'Roboto' }}>
            <h2>View Employee Status</h2>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <select
                value={employeeStatus}
                onChange={handleEmployeeStatusChange}
                placeholder="Select employee status"
                style={{ marginRight: '16px', height: '39px' }}
              >
                <option value="">Select employee status</option>
                <option value="PENDING">PENDING</option>
                <option value="ACTIVE">ACTIVE</option>
              </select>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setShowViewEmployeeStatus(false)}
                style={{ color: 'aliceblue', background: '#861f41' }}
              >
                Close
              </Button>
            </div>


            {/* Display employee data */}
            <table className="table align-middle mb-0 bg-white" style={{ marginTop: '16px', borderCollapse: 'collapse', width: '100%' }}>
              <thead>
                <tr style={{ backgroundColor: 'black', color: 'white' }}>
                  <th style={{ padding: '8px', textAlign: 'left' }}>UserId</th>
                  <th style={{ padding: '8px', textAlign: 'left' }}>User Name</th>
                  <th style={{ padding: '8px', textAlign: 'left' }}>Status</th>
                  <th style={{ padding: '8px', textAlign: 'left' }}>Account Type Request</th>
                  <th style={{ padding: '8px', textAlign: 'left' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employeeData.map((employee, index) => (
                  <tr key={employee.userId} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'transparent' }}>
                    <td style={{ padding: '8px', textAlign: 'left' }}>{employee.userId}</td>
                    <td style={{ padding: '8px', textAlign: 'left' }}>{employee.userFirstName}</td>
                    <td style={{ padding: '8px', textAlign: 'left' }}>{capitalizeFirstLetter(employee.userStatus)}</td>
                    <td style={{ padding: '8px', textAlign: 'left' }}>{capitalizeFirstLetter(employee.accountTypeRequest)}</td>
                    <td style={{ padding: '8px', textAlign: 'left' }}>
                      <button
                        type="button"
                        className="btn btn-link btn-sm btn-rounded"
                        style={{
                          textDecoration: 'underline',
                          pointerEvents: employee.userStatus === 'ACTIVE' ? 'none' : 'auto',
                          opacity: employee.userStatus === 'ACTIVE' ? 0.5 : 1,
                          color: 'black',
                          background: 'transparent'
                        }}
                        onClick={() => approveEmployee(employee.userId)}
                        disabled={employee.userStatus === 'ACTIVE'}
                      >
                        Approve Employee
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>


          </div>
          <Modal open={isSuccessOpen} onClose={handleCloseSuccess} style={{ zIndex: '10000' }}>
            <Card sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400 }}>
              <CardContent>
                <CheckCircleIcon style={{ color: 'green', fontSize: 48, marginBottom: 16 }} />
                <Typography variant="h6" component="div" gutterBottom>
                  Approval Successful
                </Typography>
                <Typography variant="body1">
                  The Employee account has been approved successfully.
                </Typography>
              </CardContent>
            </Card>
          </Modal>
        </div>
      )}

      {showViewManagerStatus && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.5)', zIndex: 9999 }}>
          <div style={{ position: 'relative', margin: 'auto', width: '50%', padding: 16, background: 'white', fontFamily: 'Roboto' }}>
            <h2>View Manager Status</h2>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <select
                value={managerStatus}
                onChange={handleManagerStatusChange}
                placeholder="Select manager status"
                style={{ marginRight: '16px', height: '39px' }}
              >
                <option value="">Select manager status</option>
                <option value="PENDING">PENDING</option>
                <option value="ACTIVE">ACTIVE</option>
              </select>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setShowViewManagerStatus(false)}
                style={{ color: 'aliceblue', background: '#861f41' }}
              >
                Close
              </Button>
            </div>


            {/* Display manager data */}
            <table className="table align-middle mb-0 bg-white" style={{ marginTop: '16px', borderCollapse: 'collapse', width: '100%' }}>
              <thead>
                <tr style={{ backgroundColor: 'black', color: 'white' }}>
                  <th style={{ padding: '8px', textAlign: 'left' }}>UserId</th>
                  <th style={{ padding: '8px', textAlign: 'left' }}>User Name</th>
                  <th style={{ padding: '8px', textAlign: 'left' }}>Status</th>
                  <th style={{ padding: '8px', textAlign: 'left' }}>Account Type Request</th>
                  <th style={{ padding: '8px', textAlign: 'left' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {managerData.map((manager, index) => (
                  <tr key={manager.userId} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'transparent', fontSize: '16px', fontFamily: 'Roboto' }}>
                    <td style={{ padding: '8px', textAlign: 'left' }}>{manager.userId}</td>
                    <td style={{ padding: '8px', textAlign: 'left' }}>{manager.userFirstName}</td>
                    <td style={{ padding: '8px', textAlign: 'left' }}>{capitalizeFirstLetter(manager.userStatus)}</td>
                    <td style={{ padding: '8px', textAlign: 'left' }}>{capitalizeFirstLetter(manager.accountTypeRequest)}</td>
                    <td style={{ padding: '8px', textAlign: 'left' }}>
                      <button
                        type="button"
                        className="btn btn-link btn-sm btn-rounded"
                        style={{
                          textDecoration: 'underline',
                          pointerEvents: manager.userStatus === 'ACTIVE' ? 'none' : 'auto',
                          opacity: manager.userStatus === 'ACTIVE' ? 0.5 : 1,
                          color: 'black',
                          background: 'transparent'
                        }}
                        onClick={() => approveManager(manager.userId)}
                        disabled={manager.userStatus === 'ACTIVE'}
                      >
                        Approve Manager
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>




          </div>
        </div>
      )}
      <Modal open={isSuccessOpen} onClose={handleCloseSuccess} style={{ zIndex: '10000' }}>
        <Card sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400 }}>
          <CardContent>
            <CheckCircleIcon style={{ color: 'green', fontSize: 48, marginBottom: 16 }} />
            <Typography variant="h6" component="div" gutterBottom>
              Approval Successful
            </Typography>
            <Typography variant="body1">
              The Manager account has been approved successfully.
            </Typography>
          </CardContent>
        </Card>
      </Modal>


      {showViewContentWriterStatus && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.5)', zIndex: 9999 }}>
          <div style={{ position: 'relative', margin: 'auto', width: '50%', padding: 16, background: 'white', fontFamily: 'Roboto' }}>
            <h2>View Content-Writer Status</h2>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <select
                value={contentWriterStatus}
                onChange={handleContentWriterStatusChange}
                placeholder="Select Content Writer status"
                style={{ marginRight: '16px', height: '39px' }}
              >
                <option value="">Select Content-Writer status</option>
                <option value="PENDING">PENDING</option>
                <option value="ACTIVE">ACTIVE</option>
              </select>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setShowViewContentWriterStatus(false)}
                style={{ color: 'aliceblue', background: '#861f41' }}
              >
                Close
              </Button>
            </div>


            {/* Display manager data */}
            <table className="table align-middle mb-0 bg-white" style={{ marginTop: '16px', borderCollapse: 'collapse', width: '100%' }}>
              <thead>
                <tr style={{ backgroundColor: 'black', color: 'white' }}>
                  <th style={{ padding: '8px', textAlign: 'left' }}>UserId</th>
                  <th style={{ padding: '8px', textAlign: 'left' }}>User Name</th>
                  <th style={{ padding: '8px', textAlign: 'left' }}>Status</th>
                  <th style={{ padding: '8px', textAlign: 'left' }}>Account Type Request</th>
                  <th style={{ padding: '8px', textAlign: 'left' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contentWriterData.map((contentWriter, index) => (
                  <tr key={contentWriter.userId} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'transparent', fontSize: '16px', fontFamily: 'Roboto' }}>
                    <td style={{ padding: '8px', textAlign: 'left' }}>{contentWriter.userId}</td>
                    <td style={{ padding: '8px', textAlign: 'left' }}>{contentWriter.userFirstName}</td>
                    <td style={{ padding: '8px', textAlign: 'left' }}>{capitalizeFirstLetter(contentWriter.userStatus)}</td>
                    <td style={{ padding: '8px', textAlign: 'left' }}>{capitalizeFirstLetter(contentWriter.accountTypeRequest)}</td>
                    <td style={{ padding: '8px', textAlign: 'left' }}>
                      <button
                        type="button"
                        className="btn btn-link btn-sm btn-rounded"
                        style={{
                          textDecoration: 'underline',
                          pointerEvents: contentWriter.userStatus === 'ACTIVE' ? 'none' : 'auto',
                          opacity: contentWriter.userStatus === 'ACTIVE' ? 0.5 : 1,
                          color: 'black',
                          background: 'transparent'
                        }}
                        onClick={() => approveContentWriter(contentWriter.userId)}
                        disabled={contentWriter.userStatus === 'ACTIVE'}
                      >
                        Approve Content-Writer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <Modal open={isSuccessOpen} onClose={handleCloseSuccess} style={{ zIndex: '10000' }}>
        <Card sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400 }}>
          <CardContent>
            <CheckCircleIcon style={{ color: 'green', fontSize: 48, marginBottom: 16 }} />
            <Typography variant="h6" component="div" gutterBottom>
              Approval Successful
            </Typography>
            <Typography variant="body1">
              The Content Writer account has been approved successfully.
            </Typography>
          </CardContent>
        </Card>
      </Modal>
    </div>
  );
}

export default UserStatus;