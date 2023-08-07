import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LoanManagement.css';
import { useAuth } from '../../../Utility.js/Auth';
import { Alert, Button, Card, CardContent, Modal, Snackbar, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
const ManagerLoanManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(7);
    const [usersData, setUsersData] = useState([]);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userStatus, setUserStatus] = useState('');
    //   const [isSuccessOpen, setIsSuccessOpen] = useState(false);
    const auth = useAuth();

    useEffect(() => {
        // Fetch data from the API
        axios.get(`http://localhost:9091/loan/getLoanByStatus/${userStatus}`, {
            headers: {
                Authorization: `Bearer ${auth.jwt}`
            }
        })
            .then((response) => {
                // Store the fetched data
                setUsersData(response.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [auth.jwt, userStatus]);

    const fetchAllLoan = () => {
        axios.get(`http://localhost:9091/loan/getLoanByStatus/${userStatus}`, {
            headers: {
                Authorization: `Bearer ${auth.jwt}`
            }
        })
            .then((response) => {
                // Store the fetched data
                setUsersData(response.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    // Handle search input change
    const handleSearchInputChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset current page when searching
    };

    const handleUserStatusChange = (e) => {
        setUserStatus(e.target.value);
        setCurrentPage(1); // Reset current page when changing loan status
    };

    // Perform search filtering based on the search term
    const filteredUsers = usersData.filter((user) => {
        const { requiredDocument, loanStatus, applicationDate, loanType, loanAmount, loanId } = user;
        const searchTermLowerCase = searchTerm.toLowerCase();
        //const userStatusLowerCase = userStatus.toLowerCase();

        // Check if the nested objects and properties exist before applying the search filter
        const lowerCaseApplicationDate = applicationDate?.toLowerCase() || '';
        const lowerCaseLoanStatus = loanStatus?.toLowerCase() || '';
        //const LoanStatus = loanStatus?.toLowerCase() || '';
        const lowerCaseLoanType = loanType?.toLowerCase() || '';
        //  const lowerCaseLoanAmount = loanAmount?.toLowerCase() || '';
        const lowerCaseFirstName = requiredDocument?.customerFirstName?.toLowerCase() || '';
        const lowerCaseLastName = requiredDocument?.customerLastName?.toLowerCase() || '';
        const lowerCasePhoneNumber = requiredDocument?.customerPhoneNumber?.toLowerCase() || '';
        // const lowerCaseAccountNumber = requiredDocument?.customerAccountNumber?.toLowerCase() || '';
        const lowerCaseAadharCard = requiredDocument?.aadharCardNumber?.toLowerCase() || '';
        const lowerCasePanCard = requiredDocument?.panCard?.toLowerCase() || '';
        const lowerCaseWorkType = requiredDocument?.workType?.toLowerCase() || '';
        // const lowerCaseMonthlyEarning = requiredDocument?.monthlyEarning?.toLowerCase() || '';


        return (
            String(loanId).includes(searchTermLowerCase) ||
            lowerCaseApplicationDate.includes(searchTermLowerCase) ||
            lowerCaseLoanStatus.includes(searchTermLowerCase) ||
            lowerCaseLoanType.includes(searchTermLowerCase) ||
            String(loanAmount).includes(searchTermLowerCase) ||
            lowerCaseFirstName.includes(searchTermLowerCase) ||
            lowerCaseLastName.includes(searchTermLowerCase) ||
            lowerCasePhoneNumber.includes(searchTermLowerCase) ||
            String(requiredDocument?.customerAccountNumber).includes(searchTermLowerCase) ||
            lowerCaseAadharCard.includes(searchTermLowerCase) ||
            lowerCasePanCard.includes(searchTermLowerCase) ||
            lowerCaseWorkType.includes(searchTermLowerCase) ||
            String(requiredDocument?.monthlyEarning).includes(searchTermLowerCase)
            //  LoanStatus.includes(userStatusLowerCase) 

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

    const handleShowUpdateForm = (loan) => {
        setSelectedUser(loan);
        setShowUpdateForm(true);
    };

    const handleCloseUpdateForm = () => {
        setSelectedUser(null);
        setShowUpdateForm(false);
    };

    const UserUpdateForm = ({ loanId, loanStatus, loanAmount, rateOfInterest, loanEndDate, onClose }) => {
        const [updatedLoanStatus, setUpdatedLoanStatus] = useState(loanStatus);
        const [updatedLoanAmount, setUpdatedloanAmount] = useState(loanAmount);
        const [updatedRateOfInterest, setUpdatedRateOfInterest] = useState(rateOfInterest);
        // const [updatedLoanStartDate, setUpdatedLoanStartDate] = useState(loanStartDate);
        const [updatedLoanEndDate, setUpdatedLoanEndDate] = useState(loanEndDate);
        // const [updatedNoOfInstallements, setUpdatedNoOfInstallements] = useState(noOfInstallements);


        const handleLoanStatusChange = (e) => {
            setUpdatedLoanStatus(e.target.value);
        };
        const handleLoanAmountChange = (e) => {
            setUpdatedloanAmount(e.target.value);
        };
        const handleRateOfInterestChange = (e) => {
            setUpdatedRateOfInterest(e.target.value);
        };
        // const handleLoanStartDateChange = (e) => {
        //     setUpdatedLoanStartDate(e.target.value);
        // };
        const handleLoanEndDateChange = (e) => {
            setUpdatedLoanEndDate(e.target.value);
        };
        // const handleNoOfInstallementsChange = (e) => {
        //     setUpdatedNoOfInstallements(e.target.value);
        // };

        function confirmUpdate() {
            const confirmed = window.confirm("Are you sure you want to update?");
            if (confirmed) {
                updateLoanStatus();
            }
        }
        // const handleCloseSuccess = () => {
        //     setIsSuccessOpen(false);
        // };

        // const handleOpenConfirm = () => {
        //     setIsSuccessOpen(true);
        // }

        const updateLoanStatus = () => {
            const updateUrl = `http://localhost:9091/loan/approveOrRejectOrClosedLoan/${loanId}`;

            const updatedData = {
                loanStatus: updatedLoanStatus,
                loanAmount: updatedLoanAmount,
                rateOfInterest: updatedRateOfInterest,
                //  loanStartDate: updatedLoanStartDate,
                loanEndDate: updatedLoanEndDate
                // noOfInstallements: updatedNoOfInstallements

            };

            axios.put(updateUrl, updatedData, {
                headers: {
                    Authorization: `Bearer ${auth.jwt}`
                }
            })
                .then(response => {
                    if (response.status === 200) {
                        // Loan status updated successfully
                        // setUsersData(usersData.filter(user => user.loanId !== loanId));
                        //  setIsSuccessOpen(false);
                        fetchAllLoan();
                        onClose();
                    } else {
                        console.error('Error updating loan status:', response.status);
                    }
                })
                .catch(error => console.error('Error updating loan status:', error));
        };

        return (
            <div className="update-form-container" style={{ width: '400px', marginLeft: '300px' }}>
                <h2>Update Loan Status</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="loanStatus">Loan Status:</label>
                        <select
                            id="loanStatus"
                            value={updatedLoanStatus}
                            onChange={(e) => handleLoanStatusChange(e)}
                        >
                            <option value="ACTIVE">ACTIVE</option>
                            <option value="PENDING">PENDING</option>
                            <option value="CLOSED">CLOSED</option>
                            <option value="REJECTED">REJECTED</option>
                        </select>
                    </div>


                    <div className="form-group">
                        <label htmlFor="loanAmount">Loan Amount:</label>
                        <input
                            type="text"
                            id="loanAmount"
                            value={updatedLoanAmount}
                            onChange={handleLoanAmountChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rateOfInterest">Rate Of Interest:</label>
                        <input
                            type="text"
                            id="rateOfInterest"
                            value={updatedRateOfInterest}
                            onChange={handleRateOfInterestChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="loanEndDate">Loan End Date:</label>
                        <input
                            type="date"
                            id="loanEndDate"
                            value={updatedLoanEndDate}
                            onChange={handleLoanEndDateChange}
                            pattern="\d{4}-\d{2}-\d{2}"
                            placeholder="YYYY-MM-DD"
                            required
                        />
                    </div>

                    <div className="form-buttons">
                        <button type="button" onClick={confirmUpdate} style={{background:'#861f41',color:'white'}}>
                            Update
                        </button>
                        <button type="button" onClick={onClose} style={{background:'#861f41',color:'white'}}>
                            Cancel
                        </button>
                    </div>
                </form>

                {/* <Modal open={isSuccessOpen} onClose={handleCloseSuccess} style={{ zIndex: '10000' }}>
                    <Card sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400 }}>
                        <CardContent>
                            <CheckCircleIcon style={{ color: 'green', fontSize: 48, marginBottom: 16 }} />
                            <Button onClick={updateLoanStatus}>
                                Confirm
                            </Button>
                            <Button onClick={handleCloseSuccess}>
                                Cancel
                            </Button>
                        </CardContent>
                    </Card>
                 </Modal> */}

            </div>

        );

    };



    return (

        <div>
            <h1>Loan Management</h1>
            <div className="search">
                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearchInputChange}
                />
            </div>
            <div className="status-filter">
                <select
                    value={userStatus}
                    onChange={handleUserStatusChange}
                    placeholder="Select Loan status"
                    style={{ marginRight: '16px', height: '39px' }}
                >
                    <option value="">Select Loan Status</option>
                    <option value="PENDING">PENDING</option>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="CLOSED">CLOSED</option>
                    <option value="REJECTED">REJECTED</option>
                </select>
            </div>
            <div className="table-container" style={{ width: '1125px', overflowY: 'scroll' }}>
                <table>
                    <thead>
                        <tr style={{ fontFamily: 'Roboto', fontSize: '15px' }}>
                            <th>LoanId</th>
                            <th>ApplicationDate</th>
                            <th>loanStatus</th>
                            <th>loanType</th>
                            <th>loanAmount</th>
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th>MobileNumber</th>
                            <th>A/C Number</th>
                            <th>aadharCardNumber</th>
                            <th>panCard</th>
                            <th>workType</th>
                            <th>monthlyEarning</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedUsers.map((loan) => (
                            <React.Fragment key={loan.loanId}>
                                <tr style={{ fontFamily: 'Roboto', fontSize: '15px' }}>
                                    <td>{loan.loanId}</td>
                                    <td>{loan.applicationDate}</td>
                                    <td>{loan.loanStatus}</td>
                                    <td>{loan.loanType}</td>
                                    <td>{loan.loanAmount}</td>
                                    <td>{loan.requiredDocument.customerFirstName}</td>
                                    <td>{loan.requiredDocument.customerLastName}</td>
                                    <td>{loan.requiredDocument.customerPhoneNumber}</td>
                                    <td>{loan.requiredDocument.customerAccountNumber}</td>
                                    <td>{loan.requiredDocument.aadharCardNumber}</td>
                                    <td>{loan.requiredDocument.panCard}</td>
                                    <td>{loan.requiredDocument.workType}</td>
                                    <td>{loan.requiredDocument.monthlyEarning}</td>
                                    <td>
                                        <button
                                            variant="contained"
                                            style={{ background: '#861f41', color: '#ffffff' }}
                                            onClick={() => handleShowUpdateForm(loan)}
                                            disabled={loan.loanStatus === 'CLOSED' || loan.loanStatus === 'REJECTED'}
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
            </div>

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
            {showUpdateForm && selectedUser && (
                <UserUpdateForm
                    loanId={selectedUser.loanId}
                    loanStatus={selectedUser.loanStatus}
                    loanAmount={selectedUser.loanAmount}
                    rateOfInterest={selectedUser.rateOfInterest}
                    // loanStartDate={selectedUser.loanStartDate}
                    loanEndDate={selectedUser.loanEndDate}
                    // noOfInstallements={selectedUser.noOfInstallements}
                    onClose={handleCloseUpdateForm}
                />
            )}
        </div>
    );
};

export default ManagerLoanManagement;