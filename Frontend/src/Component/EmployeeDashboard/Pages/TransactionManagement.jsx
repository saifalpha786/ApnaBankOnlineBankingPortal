import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TransactionManagement.css';
import { useAuth } from '../../../Utility.js/Auth';

import { Snackbar, SnackbarContent, Button } from '@mui/material';

const TransactionManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(7);
  const [usersData, setUsersData] = useState([]);
  const auth = useAuth();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleSuccessClose = () => {
    setShowSuccessAlert(false);
  };

  useEffect(() => {
    // Fetch data from the API
    axios
      .get('http://localhost:9091/transaction/getAllTransaction', {
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
      transactionId,
      customerAccountNumber,
      customerUserName,
      targetAccountNumber,
      targetIFSCCode,
      targetOwnerName,
      amount,
      initiationDate,
      transactionType,
      transactionStatus,
      transactionNote,
    } = user;
    const searchTermLowerCase = searchTerm.toLowerCase();

    // Check if the nested objects and properties exist before applying the search filter
    const lowerCaseCustomerUserName = customerUserName?.toLowerCase() || '';
    const lowerCaseTargetIFSCCode = targetIFSCCode?.toLowerCase() || '';
    const lowerCaseTargetOwnerName = targetOwnerName?.toLowerCase() || '';
    const lowerCaseInitiationDate = initiationDate?.toLowerCase() || '';
    const lowerCaseTransactionType = transactionType?.toLowerCase() || '';
    const lowerCaseTransactionStatus = transactionStatus?.toLowerCase() || '';
    const lowerCaseTransactionNote = transactionNote?.toString().toLowerCase() || '';

    return (
      String(transactionId).includes(searchTermLowerCase) ||
      String(customerAccountNumber).includes(searchTermLowerCase) ||
      lowerCaseCustomerUserName.includes(searchTermLowerCase) ||
      String(targetAccountNumber).includes(searchTermLowerCase) ||
      lowerCaseTargetIFSCCode.includes(searchTermLowerCase) ||
      lowerCaseTargetOwnerName.includes(searchTermLowerCase) ||
      String(amount).includes(searchTermLowerCase) ||
      lowerCaseInitiationDate.includes(searchTermLowerCase) ||
      lowerCaseTransactionType.includes(searchTermLowerCase) ||
      lowerCaseTransactionStatus.includes(searchTermLowerCase) ||
      lowerCaseTransactionNote.includes(searchTermLowerCase)
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

  const handleDownloadPdf = () => {
    axios
      .get('http://localhost:9091/transaction/getAllTransactions/pdf', {
        responseType: 'blob',
        headers: {
          Authorization: `Bearer ${auth.jwt}`,
        },
      })
      .then((response) => {
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'transactions.pdf';
        a.click();
        URL.revokeObjectURL(url);
      })
      .catch((error) => console.error('Error downloading PDF:', error));
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center', fontFamily: 'Roboto' }}>User Management</h1>
      <div>
        <input type="text" value={searchTerm} onChange={handleSearchInputChange} placeholder="Search by field name" />
        <Button variant="contained" onClick={handleDownloadPdf}>Download</Button>
      </div>
      <div className="table-container" style={{ width: '1125px', overflowY: 'scroll' }}>
      <table style={{ fontFamily: 'Roboto', fontSize: '15px' }}>
        {/* Table headers */}
        <thead>
          <tr>
            <th>TransactionId</th>
            <th>Customer A/C</th>
            <th>Customer UserName</th>
            <th>Target A/C</th>
            <th>Target IFSCCode</th>
            <th>Target OwnerName</th>
            <th>Amount</th>
            <th>Initiation Date</th>
            <th>Transaction Type</th>
            <th>Transaction Status</th>
            <th>Transaction Note</th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {displayedUsers.map((user) => (
            <React.Fragment key={user.transactionId}>
              <tr>
                <td>{user.transactionId}</td>
                <td>{user.customerAccountNumber}</td>
                <td>{user.customerUserName}</td>
                <td>{user.targetAccountNumber}</td>
                <td>{user.targetIFSCCode}</td>
                <td>{user.targetOwnerName}</td>
                <td>{user.amount}</td>
                <td>{user.initiationDate}</td>
                <td>{user.transactionType}</td>
                <td>{user.transactionStatus}</td>
                <td>{user.transactionNote}</td>
              </tr>
              <tr className="separator-row">
                <td colSpan="10"></td> {/* Empty cell spanning all columns */}
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
      </div>
      <div className="pagination">
        {/* Pagination buttons */}
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

          .separator-row td {
            border-bottom: 1px solid #ddd;
          }
        `}
      </style>
      <Snackbar
        open={showSuccessAlert}
        autoHideDuration={3000} // Adjust the duration as needed
        onClose={handleSuccessClose}
      >
        <SnackbarContent
          // style={{ backgroundColor: successAlertColor, color: '#fff' }}
          message="Operation completed successfully!"
        />
      </Snackbar>
    </div>
  );
};

export default TransactionManagement;