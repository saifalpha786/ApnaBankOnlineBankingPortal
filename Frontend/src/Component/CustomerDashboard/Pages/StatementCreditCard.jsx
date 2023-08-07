import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StatementCreditCard.css';
import { useAuth } from '../../../Utility.js/Auth';

import { Snackbar, SnackbarContent, Button } from '@mui/material';
import DatePicker from 'react-datepicker';
import { useRef } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const Statement = () => {
  const [creditCardNumber, setCreditCardNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(7);
  const [usersData, setUsersData] = useState([]);
  const auth = useAuth();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [filterOption, setFilterOption] = useState('all');
  const [filterDate, setFilterDate] = useState(new Date());


  const handleSuccessClose = () => {
    setShowSuccessAlert(false);
  };

  useEffect(() => {
    // Fetch data from the API
    const fetchCreditCardTransactions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9091/creditcard/getListOfTransaction/${creditCardNumber}`,
          {
            headers: {
              Authorization: `Bearer ${auth.jwt}`,
            },
          }
        );
        // Store the fetched data
        setUsersData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (creditCardNumber) {
      fetchCreditCardTransactions();
    }
  }, [creditCardNumber, auth.jwt]);

  // Handle search input change
  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset current page when searching
  };

  // Perform search filtering based on the search term
  const filteredUsers = usersData.filter((user) => {
    const {
      creditCardTransactionId,
      userName,
      transactionAmount,
      creditCardType,
      transactionTime,
      transactionType,
    } = user;
    const searchTermLowerCase = searchTerm.toLowerCase();

    // Check if the nested objects and properties exist before applying the search filter
    const lowerCaseUserName = userName?.toLowerCase() || '';
    const lowerCaseCreditCardType = creditCardType?.toLowerCase() || '';
    const lowerCaseTransactionTime = transactionTime?.toLowerCase() || '';
    const lowerCaseTransactionType = transactionType?.toString().toLowerCase() || '';

    return (
      String(creditCardTransactionId).includes(searchTermLowerCase) ||
      String(transactionAmount).includes(searchTermLowerCase) ||
      lowerCaseUserName.includes(searchTermLowerCase) ||
      lowerCaseCreditCardType.includes(searchTermLowerCase) ||
      lowerCaseTransactionTime.includes(searchTermLowerCase) ||
      lowerCaseTransactionType.includes(searchTermLowerCase)
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

  const displayedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const handleFilterOptionChange = (value) => {
    setFilterOption(value);

    // Reset filter date when a different filter option is selected
    setFilterDate(new Date());
  };

  const handleFilterDateChange = (date) => {
    setFilterDate(date);
  };

  const downloadTransactions = () => {
    // Get the filtered transactions
    const filteredTransactions = filterTransactions();

    // Create a new PDF document
    const doc = new jsPDF('landscape', 'mm', 'a3');

    // Define the table column headers
    const headers = ['Transaction ID', 'Customer Name', 'Transaction Amount', 'CreditCard Type', 'Transaction Time', 'Transaction Type'];

    // Extract the data for the table rows
    const data = filteredTransactions.map((transaction) => [
      transaction.creditCardTransactionId,
      transaction.userName,
      transaction.transactionAmount,
      transaction.creditCardType,
      transaction.transactionTime,
      transaction.transactionType
    ]);

    // Define column styles for alignment and padding
    const columnStyles = {
      0: { align: 'left', cellPadding: 5 },
      1: { align: 'left', cellPadding: 5 },
      2: { align: 'left', cellPadding: 5 },
      3: { align: 'left', cellPadding: 5 },
      4: { align: 'left', cellPadding: 5 },
      5: { align: 'left', cellPadding: 5 },
    };

    // Set explicit column widths (in this example, based on Java code)
    const columnWidths = [45, 35, 45, 30, 30, 30];

    // Set the desired table width (in this example, based on Java code)
    const tableWidth = columnWidths.reduce((total, width) => total + width, 0);

    // Auto-generate the table with data, alignment/padding settings, column widths, and table width
    doc.autoTable({
      head: [headers],
      body: data,
      columnStyles: columnStyles,  // Apply column styles for alignment and padding
      columnWidth: columnWidths,  // Set explicit column widths
      tableWidth: tableWidth,     // Set the table width
      margin: { top: 20 },  // Add top margin to the table
    });

    // Save the PDF file
    doc.save('statement.pdf');
  };

  const filterTransactions = () => {
    const currentDate = new Date();
    const filteredDate = new Date(filterDate);

    // Calculate the start date for filtering
    let startDate;
    switch (filterOption) {
      case 'all':
        startDate = new Date(0); // Set to the earliest possible date
        break;
      case 'last1month':
        startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        break;
      case 'last3months':
        startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 3, 1);
        break;
      case 'last6months':
        startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 6, 1);
        break;
      case 'custom':
        startDate = filteredDate;
        break;
      default:
        startDate = new Date(0);
    }

    // Filter the transactions based on the start date
    const filteredTransactions = usersData.filter((usersData) => new Date(usersData.transactionTime) >= startDate);

    return filteredTransactions;
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center', fontFamily: 'Roboto' }}>Statement</h1>

      <div>
        <input
          type="text"
          value={creditCardNumber}
          onChange={(e) => setCreditCardNumber(e.target.value)}
          placeholder="Enter Credit Card Number"
        />
      </div>
      <div style={{ marginBottom: '16px' }}>
        <label>
          Filter by:
          <select value={filterOption} onChange={(e) => handleFilterOptionChange(e.target.value)}>
            <option value="all">All Transactions</option>
            <option value="last1month">Last 1 Month</option>
            <option value="last3months">Last 3 Months</option>
            <option value="last6months">Last 6 Months</option>
            <option value="custom">Custom Date</option>
          </select>
        </label>
        {filterOption === 'custom' && (
          <DatePicker
            selected={filterDate}
            onChange={handleFilterDateChange}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select a date"
          />
        )}
        {/* <Button onClick={filterTransactions}>Apply Filter</Button> */}
        <br />
        <Button onClick={downloadTransactions} style={{background:'#861f41',color:'white', padding:'5px',marginTop:'4px'}}>Download Statement (PDF)</Button>
      </div>
      <table style={{ fontFamily: 'Roboto', fontSize: '15px' }}>
        {/* Table headers */}
        <thead>
          <tr >
            <th style={{background:'#861f41'}} >TransactionId</th>
            <th style={{background:'#861f41'}} >Customer Name</th>
            <th style={{background:'#861f41'}} >Transaction Amount</th>
            <th style={{background:'#861f41'}} >CreditCard Type</th>
            <th style={{background:'#861f41'}} >Transaction Time</th>
            <th style={{background:'#861f41'}} >Transaction Type</th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {filterTransactions().length > 0 ? (
            filterTransactions().map((user) => (
              <React.Fragment key={user.creditCardTransactionId}>
                <tr>
                  <td>{user.creditCardTransactionId}</td>
                  <td>{user.userName}</td>
                  <td>{user.transactionAmount}</td>
                  <td>{user.creditCardType}</td>
                  <td>{user.transactionTime}</td>
                  <td>
                    <span
                      style={{
                        color: user.transactionType === 'CREDITED' ? 'green' : 'red',
                        fontWeight: 'bold'
                      }}
                    >
                      {user.transactionType}
                    </span>
                  </td>
                </tr>
                <tr className="separator-row">
                  <td colSpan="10"></td> {/* Empty cell spanning all columns */}
                </tr>
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan="5">No transactions found.</td>
            </tr>
          )}
        </tbody>
      </table>
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
      <Snackbar open={showSuccessAlert} autoHideDuration={3000} onClose={handleSuccessClose}>
        <SnackbarContent
          // style={{ backgroundColor: successAlertColor, color: '#fff' }}
          message="Operation completed successfully!"
        />
      </Snackbar>
    </div>
  );
};

export default Statement;