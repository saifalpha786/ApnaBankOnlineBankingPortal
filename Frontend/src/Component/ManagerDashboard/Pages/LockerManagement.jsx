import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LockerManagement.css';
import { useAuth } from '../../../Utility.js/Auth';
import { Card, CardContent, Modal, Typography } from '@mui/material';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';


const LockerManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(7);
  const [usersData, setUsersData] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updatedLockerAvailability, setUpdatedLockerAvailability] = useState('');
  const [updatedLockerSize, setUpdatedLockerSize] = useState('');
  const auth = useAuth();
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const handleCloseSuccess = () => {
    setIsSuccessOpen(false);
  };

  useEffect(() => {
    // Fetch data from the API
    axios
      .get(`http://localhost:9091/locker/getAllLocker`, {
        headers: {
          Authorization: `Bearer ${auth.jwt}`,
        },
      })
      .then((response) => {
        // Store the fetched data
        setUsersData(response.data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [auth.jwt]);

  // Handle search input change
  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset current page when searching
  };

  // Perform search filtering based on the search term
  const filteredUsers = usersData.filter((user) => {
    const {
      customerAccountNumber,
      lockerSizeCost,
      validToDate,
      validFromDate,
      avialLockerFormonth,
      lockerSize,
      lockerId,
    } = user;
    const searchTermLowerCase = searchTerm.toLowerCase();

    // Check if the nested objects and properties exist before applying the search filter
    const lowerCaseValidToDate = validToDate?.toLowerCase() || '';
    const lowerCaseValidFromDate = validFromDate?.toLowerCase() || '';
    const lowerCaseLockerSize = lockerSize?.toLowerCase() || '';

    return (
      String(lockerId).includes(searchTermLowerCase) ||
      String(avialLockerFormonth).includes(searchTermLowerCase) ||
      String(lockerSizeCost).includes(searchTermLowerCase) ||
      String(customerAccountNumber).includes(searchTermLowerCase) ||
      lowerCaseValidToDate.includes(searchTermLowerCase) ||
      lowerCaseValidFromDate.includes(searchTermLowerCase) ||
      lowerCaseLockerSize.includes(searchTermLowerCase)
    );
  });

  // Change current page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Generate an array of page numbers
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const displayedUsers = filteredUsers.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

  const handleShowUpdateForm = () => {
    setShowUpdateForm(true);
  };

  const handleCloseUpdateForm = () => {
    setShowUpdateForm(false);
  };

  //   function confirmUpdate() {
  //     const confirmed = window.confirm("Are you sure you want to update?");
  //     if (confirmed) {
  //       handleUpdateLockerAvailability();
  //     }
  // }

  const handleUpdateLockerAvailability = () => {
    console.log(updatedLockerAvailability);
    console.log(updatedLockerSize);
    axios
      .put(
        `http://localhost:9091/locker/updateLockerAvalability/${updatedLockerAvailability}/${updatedLockerSize}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${auth.jwt}`,
          },
        }
      )
      .then((response) => {
        setIsSuccessOpen(true)
        console.log('Locker availability updated successfully:', response.data);
        // Perform any necessary actions or update state variables
      })
      .catch((error) => {
        console.error('Error updating locker availability:', error);
        // Handle the error or show an error message to the user
      });
  };

  return (
    <div>
      <h1>Locker Management</h1>
      <div className="search">
        <input type="text" placeholder="Search" value={searchTerm} onChange={handleSearchInputChange} />
      </div>
     

      <table>
        <thead>
          <tr style={{ fontFamily: 'Roboto', fontSize: '15px' }}>
            <th>LockerId</th>
            <th>LockerSize</th>
            <th>AvialLockerForMonth</th>
            <th>ValidFromDate</th>
            <th>validToDate</th>
            <th>LockerSizeCost</th>
            <th>A/C Number</th>
           
          </tr>
        </thead>
        <tbody>
          {displayedUsers.map((locker) => (
            <React.Fragment key={locker.lockerId}>
              <tr style={{ fontFamily: 'Roboto', fontSize: '15px' }}>
                <td>{locker.lockerId}</td>
                <td>{locker.lockerSize}</td>
                <td>{locker.avialLockerFormonth}</td>
                <td>{locker.validFromDate}</td>
                <td>{locker.validToDate}</td>
                <td>{locker.lockerSizeCost}</td>
                <td>{locker.customerAccountNumber}</td>
              </tr>
              <tr className="separator-row">
                <td colSpan="10"></td> {/* Empty cell spanning all columns */}
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {pageNumbers.map((pageNumber) => (
          <button key={pageNumber} onClick={() => paginate(pageNumber)} className={currentPage === pageNumber ? 'active' : ''}>
            {pageNumber}
          </button>
        ))}
      </div>

      {showUpdateForm && (
        <div className="update-form-container">
          <h2>Update Locker Availability</h2>
          <div className="form-group">
            <label htmlFor="lockerAvailability">Locker Availability</label>
            <input
              type="text"
              id="lockerAvailability"
              placeholder="Locker Availability"
              value={updatedLockerAvailability}
              onChange={(e) => setUpdatedLockerAvailability(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lockerSize">Locker Size</label>
            <select
              id="lockerSize"
              value={updatedLockerSize}
              onChange={(e) => setUpdatedLockerSize(e.target.value)}
            >
              <option value="SMALL">SMALL</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="LARGE">LARGE</option>
            </select>
          </div>
          <div className="form-buttons">
            <button onClick={handleUpdateLockerAvailability}>Update</button>
            <button onClick={handleCloseUpdateForm}>Cancel</button>
          </div>
        </div>
      )}
     {/* Modal for the success message */}
     <Modal open={isSuccessOpen} onClose={handleCloseSuccess}>
        <Card sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400 }}>
          <CardContent>
            <CheckCircleIcon style={{ color: 'green', fontSize: 48, marginBottom: 16 }} />
            <Typography variant="h6" component="div" gutterBottom>
              Update Successful
            </Typography>
            <Typography variant="body1">
              The Locker has been Updated successfully.
            </Typography>
          </CardContent>
        </Card>
      </Modal>
      <style>
        {`
          .pagination {
            display: flex;
            justify-content: center;
            margin-top: 20px;
          }

          .pagination button {
            margin: 0 5px;
            padding: 5px 10px;
            border: none;
            background-color: #ddd;
            cursor: pointer;
          }

          .pagination button.active {
            background-color: #555;
            color: #fff;
          }

          .update-form-container {
            border: 1px solid #ddd;
            padding: 20px;
            margin-top: 20px;
          }

          .update-form-container h2 {
            margin-top: 0;
          }

          .form-group {
            margin-bottom: 10px;
          }

          .form-group label {
            display: block;
            margin-bottom: 5px;
          }

          .form-group input {
            width: 100%;
            padding: 5px;
          }

          .form-buttons {
            margin-top: 10px;
          }

          .form-buttons button {
            margin-right: 10px;
          }

          .separator-row td {
            border-bottom: 1px solid #ddd;
          }
        `}
      </style>
    </div>
  );
};

export default LockerManagement;
