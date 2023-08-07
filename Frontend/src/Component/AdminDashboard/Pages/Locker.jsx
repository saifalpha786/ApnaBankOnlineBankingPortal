import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../Utility.js/Auth';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Modal from '@mui/material/Modal';


const Locker = () => {
  const [cityOfLocker, setCityOfLocker] = useState('');
  const [smallSizeLocker, setSmallSizeLocker] = useState(0);
  const [mediumSizeLocker, setMediumSizeLocker] = useState(0);
  const [largeSizeLocker, setLargeSizeLocker] = useState(0);
  const [locationLockers, setLocationLockers] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({});
  const [showError, setError] = useState('');
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [showAddConfirmation, setShowAddConfirmation] = useState(false);
  const [showUpdateConfirmation, setShowUpdateConfirmation] = useState(false);
  const auth = useAuth();

  const handleCloseLockerSuccess = () => {
    setIsSuccessOpen(false);
  };

  const cities = ["Delhi", "Mumbai", "Bangalore", "Kolkata", "Chennai", "Hyderabad", "Ahmedabad"];

  useEffect(() => {
    fetchLocationLockers();
  }, []);

  const fetchLocationLockers = () => {
    axios.get('http://localhost:9091/locker/getListOfLocationDetail', {
      headers: {
        Authorization: `Bearer ${auth.jwt}`
      }
    })
      .then(response => {
        setLocationLockers(response.data);
      })
      .catch(error => {
        console.error('Error fetching Location Lockers:', error);
      });
  };

  const cancelAddLoation = () => {
    // Close the delete confirmation modal
    setShowAddConfirmation(false);
  };

  const cancelUpdateLoation = () => {
    setShowUpdateConfirmation(false);
  }

  const AddLoation = () => {
    // Close the delete confirmation modal
    setShowAddConfirmation(true);
  };

  const UpdateLoation = (e) => {
    // Close the delete confirmation modal
    e.preventDefault();
    setShowUpdateConfirmation(true);
  };

  const handleCreateLocationLocker = () => {
    const lockerData = {
      cityOfLocker,
      smallSizeLocker,
      mediumSizeLocker,
      largeSizeLocker
    };

    axios.post('http://localhost:9091/locker/addLockerForGivenLocation', lockerData, {
      headers: {
        Authorization: `Bearer ${auth.jwt}`
      }
    })
      .then(response => {
        setShowAddConfirmation(false);
        setError("Location Locker created successfully!");
        setIsSuccessOpen(true);
        console.log('Location Locker created successfully!', response.data);
        fetchLocationLockers();
      })
      .catch(error => {
        setError(error);
        setIsSuccessOpen(true);
        console.error('Error creating Location Locker:', error);
      });

  };

  const handleUpdateLocker = (locationId) => {
    const selectedLocker = locationLockers.find(locker => locker.locationId === locationId);
    setFormData(selectedLocker);
    setShowForm(true);
  };

  const handleToggleTable = () => {
    setShowTable(!showTable);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios.put('http://localhost:9091/locker/UpdateLocationLocker', formData, {
      headers: {
        Authorization: `Bearer ${auth.jwt}`
      }
    })
      .then(response => {
        setError("Location Locker updated successfully!");
        setIsSuccessOpen(true);
        console.log('Location Locker updated successfully!', response.data);
        fetchLocationLockers();
        setShowForm(false);
      })
      .catch(error => {
        setError("Updation Failed!!!");
        setIsSuccessOpen(true);
        console.error('Error updating Location Locker:', error);
      });
      
      setShowUpdateConfirmation(false);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center',marginTop:'20px' }}>
      <div style={{ backgroundColor: '#f5f5f5', padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '500px', height: '70vh', marginLeft: '300px' }}>
        <h1 style={{ fontSize: '28px', marginBottom: '30px', color: '#333' }}>Create Location Locker</h1>
        <div style={{ marginBottom: '20px', }}>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '10px', color: '#555' }}>City of Locker:</label>
          <select
            value={cityOfLocker}
            onChange={(e) => setCityOfLocker(e.target.value)}
            required
            style={{ marginBottom: '10px', width: '250px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px' }}
          >
            <option value="">Select location for locker</option>
            {cities.map(city => (
              <option value={city} key={city}>{city}</option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '10px', color: '#555' }}>Small Size Locker:</label>
          <input
            type="number"
            value={smallSizeLocker}
            onChange={(e) => setSmallSizeLocker(parseInt(e.target.value))}
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '10px', color: '#555' }}>Medium Size Locker:</label>
          <input
            type="number"
            value={mediumSizeLocker}
            onChange={(e) => setMediumSizeLocker(parseInt(e.target.value))}
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px' }}
          />
        </div>
        <div>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '10px', color: '#555' }}>Large Size Locker:</label>
          <input
            type="number"
            value={largeSizeLocker}
            onChange={(e) => setLargeSizeLocker(parseInt(e.target.value))}
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px' }}
          />
        </div>
        <button onClick={AddLoation} style={{ background: '#861f41', color: 'white', padding: '10px 20px', borderRadius: '5px', border: 'none', fontSize: '16px' }}>Create Location Locker</button>
      </div>

      <button onClick={handleToggleTable} style={{ marginTop: '80px', background: '#861f41', color: 'white' }}>
        {showTable ? 'Hide All Location Lockers' : 'View All Location Lockers'}
      </button>

      {showTable && (
        <div style={{ marginTop: '50px'}}>
          <h1>View All Location Lockers</h1>
          <table>
            <thead>
              <tr>
                <th style={{ background: '#861f41' }}>Location ID</th>
                <th style={{ background: '#861f41' }}>City of Locker</th>
                <th style={{ background: '#861f41' }}>Small Size Locker</th>
                <th style={{ background: '#861f41' }}>Medium Size Locker</th>
                <th style={{ background: '#861f41' }}>Large Size Locker</th>
                <th style={{ background: '#861f41' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {locationLockers.map(locker => (
                <tr key={locker.locationId}>
                  <td>{locker.locationId}</td>
                  <td>{locker.cityOfLocker}</td>
                  <td>{locker.smallSizeLocker}</td>
                  <td>{locker.mediumSizeLocker}</td>
                  <td>{locker.largeSizeLocker}</td>
                  <td>
                    <button onClick={() => handleUpdateLocker(locker.locationId)} style={{background:'#861f41',color:'white'}}>Update</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Modal open={isSuccessOpen} onClose={handleCloseLockerSuccess}>
        <Card sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400 }}>
          <CardContent>

            <Typography variant="h6" component="div" gutterBottom>
              <td>{showError}</td>
            </Typography>

          </CardContent>
        </Card>
      </Modal>
      {showAddConfirmation && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 999,
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '5px',
              width: '300px',
            }}
          >
            <h2>Confirm Creation</h2>
            <p>Are you sure you want to Create Locker at this Location?</p>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: '20px',
              }}
            >
              <button onClick={handleCreateLocationLocker}>Yes</button>
              <button onClick={cancelAddLoation}>No</button>
            </div>
          </div>
        </div>
      )}

      {showUpdateConfirmation && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 999,
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '5px',
              width: '300px',
            }}
          >
            <h2>Confirm Updation</h2>
            <p>Are you sure you want to Update Locker at this Location?</p>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: '20px',
              }}
            >
              <button onClick={handleFormSubmit}>Yes</button>
              <button onClick={cancelUpdateLoation}>No</button>
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <div>
          <h1>Edit Location Locker</h1>
          <form onSubmit={UpdateLoation}>
            <div>
              {/* <label>City of Locker:</label> */}
              <input
                type="hidden"
                value={formData.cityOfLocker}
                onChange={(e) => setFormData({ ...formData, cityOfLocker: e.target.value })}
              />
            </div>
            <div>
              <label>Small Size Locker:</label>
              <input
                type="number"
                // value={formData.smallSizeLocker}
                onChange={(e) => setFormData({ ...formData, smallSizeLocker: parseInt(e.target.value) })}
              />
            </div>
            <div>
              <label>Medium Size Locker:</label>
              <input
                type="number"
                //    value={formData.mediumSizeLocker}
                onChange={(e) => setFormData({ ...formData, mediumSizeLocker: parseInt(e.target.value) })}
              />
            </div>
            <div>
              <label>Large Size Locker:</label>
              <input
                type="number"
                // value={formData.largeSizeLocker}
                onChange={(e) => setFormData({ ...formData, largeSizeLocker: parseInt(e.target.value) })}
              />
            </div>
            <button type="submit" style={{background:'#861f41',color:'white'}}>Update Location Locker</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Locker;