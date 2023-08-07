import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserManagement.css';
import { useAuth } from '../../../Utility.js/Auth';

import { Snackbar, SnackbarContent } from '@mui/material';
const CustomerManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(7);
  const [usersData, setUsersData] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const auth = useAuth();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successAlertColor, setSuccessAlertColor] = useState('');


  const handleSuccessClose = () => {
    setShowSuccessAlert(false);
  };


  useEffect(() => {
    // Fetch data from the API
    axios.get('http://localhost:9091/account/getAllAccount', {
      headers: {
        Authorization: `Bearer ${auth.jwt}`
      }
    })
      .then(response => {
        // Filter data based on role names
        const filteredData = response.data.filter(user => {
          const { roleName } = user.userAccount.roles[0];
          return roleName === 'ROLE_CUSTOMER';
        });
        setUsersData(filteredData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [auth.jwt]);

  const fetchAllAccount = () => {
    axios.get('http://localhost:9091/account/getAllAccount', {
      headers: {
        Authorization: `Bearer ${auth.jwt}`
      }
    })
      .then(response => {
        // Filter data based on role names
        const filteredData = response.data.filter(user => {
          const { roleName } = user.userAccount.roles[0];
          return roleName ===  'ROLE_CUSTOMER';
        });
        setUsersData(filteredData);
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  // Handle search input change
  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset current page when searching
  };

  // Perform search filtering based on the search term
  const filteredUsers = usersData.filter((user) => {
    const { userAccount, accountStatus, accountNumber } = user;
    const searchTermLowerCase = searchTerm.toLowerCase();

    // Check if the nested objects and properties exist before applying the search filter
    const lowerCaseFirstName = userAccount?.userFirstName?.toLowerCase() || '';
    const lowerCaseLastName = userAccount?.userLastName?.toLowerCase() || '';
    const lowerCasePhoneNumber = userAccount?.userPhoneNumber?.toLowerCase() || '';
    const lowerCaseAccountTypeRequest = userAccount?.accountTypeRequest?.toLowerCase() || '';
    const lowerCaseUserStatus = userAccount?.userStatus?.toLowerCase() || '';
    const lowerCaseAccountStatus = accountStatus?.toLowerCase() || '';
    const lowerCaseAccountNumber = accountNumber?.toString().toLowerCase() || '';
    const lowerCaseRoleName = userAccount?.roles?.[0]?.roleName?.toLowerCase() || '';

    return (
      String(userAccount?.userId).includes(searchTermLowerCase) ||
      lowerCaseFirstName.includes(searchTermLowerCase) ||
      lowerCaseLastName.includes(searchTermLowerCase) ||
      lowerCasePhoneNumber.includes(searchTermLowerCase) ||
      lowerCaseAccountTypeRequest.includes(searchTermLowerCase) ||
      lowerCaseUserStatus.includes(searchTermLowerCase) ||
      lowerCaseAccountStatus.includes(searchTermLowerCase) ||
      lowerCaseAccountNumber.includes(searchTermLowerCase) ||
      lowerCaseRoleName.includes(searchTermLowerCase)
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

  // Get the users to display for the current page
  const displayedUsers = filteredUsers.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

  const deleteUser = (userId, roleName) => {
    const user = usersData.find((user) => user.userAccount.userId === userId);
    console.log('User to delete:', user); // Add this line for debugging
    setUserToDelete(user);
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteUser = () => {
    if (userToDelete) {
      const { userAccount } = userToDelete;
      const userId = userAccount.userId;
      const roleName = userAccount.roles[0].roleName;


      let deleteUrl = '';
      switch (roleName) {
        case 'ROLE_MANAGER':
          deleteUrl = `http://localhost:9091/user/deleteManager/${userId}`;
          break;
        case 'ROLE_EMPLOYEE':
          deleteUrl = `http://localhost:9091/user/deleteEmployee/${userId}`;
          break;
        case 'ROLE_CUSTOMER':
          deleteUrl = `http://localhost:9091/user/deleteCustomer/${userId}`;
          break;
        default:
          break;
      }


      if (deleteUrl !== '') {
        axios
          .delete(deleteUrl, {
            headers: {
              Authorization: `Bearer ${auth.jwt}`,
            },
          })
          .then((response) => {
            if (response.status === 200) {
              // User deleted successfully, update the usersData state by removing the deleted user
              const updatedUsers = usersData.filter((user) => user.userAccount.userId !== userId);
              setUsersData(updatedUsers);
              setShowSuccessAlert(true);
              setSuccessAlertColor('#4CAF50');
            } else {
              console.error('Error deleting user:', response.status);
            }
          })
          .catch((error) => console.error('Error deleting user:', error));
      }
    } else {
      console.log('No user selected for deletion.'); // Add this line for debugging
    }

    // Close the delete confirmation modal
    setShowDeleteConfirmation(false);
    setUserToDelete(null);
  };

  const cancelDeleteUser = () => {
    // Close the delete confirmation modal
    setShowDeleteConfirmation(false);
    setUserToDelete(null);
  };
  const handleShowUpdateForm = (user) => {
    setSelectedUser(user);
    setShowUpdateForm(true);
  };

  const handleCloseUpdateForm = () => {
    setSelectedUser(null);
    setShowUpdateForm(false);
  };

  const UserUpdateForm = ({ accountStatus, accountType, userStatus, userId, accountId, roleName, onClose }) => {
    const [updatedAccountStatus, setUpdatedAccountStatus] = useState(accountStatus);
    const [updatedAccountType, setUpdatedAccountType] = useState(accountType);
    const [updatedUserStatus, setUpdatedUserStatus] = useState(userStatus);

    const handleAccountStatusChange = (e) => {
      setUpdatedAccountStatus(e.target.value);
    };

    const handleAccountTypeChange = (e) => {
      setUpdatedAccountType(e.target.value);
    };

    const handleUserStatusChange = (e) => {
      setUpdatedUserStatus(e.target.value);
    };

    const handleFormSubmit = (e) => {
      e.preventDefault();

      const updatedData = {
        accountStatus: updatedAccountStatus,
        accountType: updatedAccountType,
        userAccount: {
          userId: userId,
          userStatus: updatedUserStatus
        }
      };

      let updateUrl = '';
      switch (roleName) {
        case 'ROLE_MANAGER':
          updateUrl = `http://localhost:9091/account/updateManagerAccount/${accountId}`;
          break;
        case 'ROLE_EMPLOYEE':
          updateUrl = `http://localhost:9091/account/updateEmployeeAccount/${accountId}`;
          break;
        case 'ROLE_CUSTOMER':
          updateUrl = `http://localhost:9091/account/updateCustomerAccount/${accountId}`;
          break;
        default:
          break;
      }

      if (updateUrl !== '') {
        axios.put(updateUrl, updatedData, {
          headers: {
            Authorization: `Bearer ${auth.jwt}`
          }
        })
          .then(response => {

            if (response.status === 200) {
              fetchAllAccount();
              // User updated successfully
              setShowSuccessAlert(true);
              setSuccessAlertColor('#4CAF50');
              onClose();
            } else {
              console.error('Error updating user:', response.status);
            }
          })
          .catch(error => console.error('Error updating user:', error));
      }
    };

    return (
      <div className="update-form-container" style={{ width: '500px', background: 'aliceblue', borderRadius: '4px', marginLeft: '250px', marginBottom: '20px' }}>
        <h2 style={{ textAlign: 'center', fontFamily: 'Roboto' }}>Update User</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="accountStatus">Account Status:</label>
            <select
              id="accountStatus"
              value={updatedAccountStatus}
              onChange={handleAccountStatusChange}
            >
              <option value="ACTIVE">ACTIVE</option>
              <option value="BLOCKED">BLOCKED</option>
              <option value="PENDING">PENDING</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="accountType">Account Type:</label>
            <select
              id="accountType"
              value={updatedAccountType}
              onChange={handleAccountTypeChange}
            >
              <option value="SAVINGS_ACCOUNT">SAVINGS_ACCOUNT</option>
              <option value="CURRENT_ACCOUNT">CURRENT_ACCOUNT</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="userStatus">User Status:</label>
            <select
              type="text"
              id="userStatus"
              value={updatedUserStatus}
              onChange={handleUserStatusChange}
            > <option value="ACTIVE">ACTIVE</option>
              <option value="BLOCKED">BLOCKED</option>
              <option value="PENDING">PENDING</option>
            </select>
          </div>
          <div className="form-buttons">
            <button type="submit" style={{ background: '#861f41', color: 'white' }}>Update</button>
            <button type="button" onClick={onClose} style={{ background: '#861f41', color: 'white' }}>Cancel</button>
          </div>
        </form>
      </div>
    );
  };


  return (
    <div>
      <h1 style={{ textAlign: 'center', fontFamily: 'Roboto' }}>User Management</h1>
      <div>
        <input type="text" value={searchTerm} onChange={handleSearchInputChange} placeholder="Search by field name" />
      </div>
      <table style={{ fontFamily: 'Roboto', fontSize: '15px' }}>
        <thead>
          <tr>
            <th>UserId</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>MobileNumber</th>
            <th>A/C Type</th>
            <th>UserStatus</th>
            <th>A/C Status</th>
            <th>A/C Number</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedUsers.map((user) => (
            <React.Fragment key={user.userId}>
              <tr>
                <td>{user.userAccount.userId}</td>
                <td>{user.userAccount.userFirstName}</td>
                <td>{user.userAccount.userLastName}</td>
                <td>{user.userAccount.userPhoneNumber}</td>
                <td>{user.userAccount.accountTypeRequest}</td>
                <td>{user.userAccount.userStatus}</td>
                <td>{user.accountStatus}</td>
                <td>{user.accountNumber}</td>
                <td>{user.userAccount.roles[0].roleName}</td>
                <td>
                  <button
                    variant="contained"
                    style={{ background: '#861f41', color: '#ffffff' }}
                    onClick={() => deleteUser(user.userAccount.userId, user.userAccount.roles[0].roleName)}
                  >
                    Delete
                  </button>
                  <button
                    variant="contained"
                    style={{ background: '#861f41', color: '#ffffff' }}
                    onClick={() => handleShowUpdateForm(user)}
                  >
                    Update
                  </button>
                </td>
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
          <button
            key={pageNumber}
            onClick={() => paginate(pageNumber)}
            className={currentPage === pageNumber ? 'active' : ''}
          >
            {pageNumber}
          </button>
        ))}
      </div>
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
      {showDeleteConfirmation && (
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
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete this user?</p>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: '20px',
              }}
            >
              <button onClick={confirmDeleteUser}>Yes</button>
              <button onClick={cancelDeleteUser}>No</button>
            </div>
          </div>
        </div>
      )}

      {showUpdateForm && selectedUser && (
        <UserUpdateForm
          accountStatus={selectedUser.accountStatus}
          accountType={selectedUser.accountType}
          userStatus={selectedUser.userAccount.userStatus}
          userId={selectedUser.userAccount.userId}
          accountId={selectedUser.accountId}
          roleName={selectedUser.userAccount.roles[0].roleName}
          onClose={handleCloseUpdateForm}
        />
      )}
      <Snackbar
        open={showSuccessAlert}
        autoHideDuration={3000} // Adjust the duration as needed
        onClose={handleSuccessClose}
      >
        <SnackbarContent
          style={{ backgroundColor: successAlertColor, color: '#fff' }}
          message="Operation completed successfully!"
        />
      </Snackbar>
    </div>
  );
};

export default CustomerManagement;