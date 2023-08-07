import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CreditCardManagement.css';
import { useAuth } from '../../../Utility.js/Auth';
const CreditCardManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(7);
    const [usersData, setUsersData] = useState([]);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userStatus, setUserStatus] = useState('');
    const auth = useAuth();

    useEffect(() => {
        // Fetch data from the API
        axios.get(`http://localhost:9091/creditcard/getCreditCardByStatus/${userStatus}`, {
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

   const fetchAllCreditCard=()=>{
        axios.get(`http://localhost:9091/creditcard/getCreditCardByStatus/${userStatus}`, {
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
        const { requiredDocument, creditCardStatus, applicationDate, creditCardType, creditCardId } = user;
        const searchTermLowerCase = searchTerm.toLowerCase();
        // Check if the nested objects and properties exist before applying the search filter
        const lowerCaseApplicationDate = applicationDate?.toLowerCase() || '';
        const lowerCaseCreditCardStatus = creditCardStatus?.toLowerCase() || '';
        const lowerCaseCreditCardType = creditCardType?.toLowerCase() || '';
        const lowerCaseFirstName = requiredDocument?.customerFirstName?.toLowerCase() || '';
        const lowerCaseLastName = requiredDocument?.customerLastName?.toLowerCase() || '';
        const lowerCasePhoneNumber = requiredDocument?.customerPhoneNumber?.toLowerCase() || '';
        const lowerCaseAadharCard = requiredDocument?.aadharCardNumber?.toLowerCase() || '';
        const lowerCasePanCard = requiredDocument?.panCard?.toLowerCase() || '';
        const lowerCaseWorkType = requiredDocument?.workType?.toLowerCase() || '';


        return (
            String(creditCardId).includes(searchTermLowerCase) ||
            lowerCaseApplicationDate.includes(searchTermLowerCase) ||
            lowerCaseCreditCardStatus.includes(searchTermLowerCase) ||
            lowerCaseCreditCardType.includes(searchTermLowerCase) ||
            lowerCaseFirstName.includes(searchTermLowerCase) ||
            lowerCaseLastName.includes(searchTermLowerCase) ||
            lowerCasePhoneNumber.includes(searchTermLowerCase) ||
            lowerCaseAadharCard.includes(searchTermLowerCase) ||
            lowerCasePanCard.includes(searchTermLowerCase) ||
            lowerCaseWorkType.includes(searchTermLowerCase) ||
            String(requiredDocument?.monthlyEarning).includes(searchTermLowerCase)

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

    const handleShowUpdateForm = (card) => {
        setSelectedUser(card);
        setShowUpdateForm(true);
    };

    const handleCloseUpdateForm = () => {
        setSelectedUser(null);
        setShowUpdateForm(false);
    };


    const UserUpdateForm = ({ creditCardId, creditCardStatus, creditCardLimit, onClose }) => {
        const [updatedCreditCardStatus, setUpdatedCreditCardStatus] = useState(creditCardStatus);
        const [updatedCreditCardLimit, setUpdatedCreditCardLimit] = useState(creditCardLimit);


        const handleCreditCardStatusChange = (e) => {
            setUpdatedCreditCardStatus(e.target.value);
        };
        const handleCreditCardLimitChange = (e) => {
            setUpdatedCreditCardLimit(e.target.value);
        };


        function confirmUpdate() {
            const confirmed = window.confirm("Are you sure you want to update?");
            if (confirmed) {
                updateLoanStatus();
            }
        }

        const updateLoanStatus = () => {
            const updateUrl = `http://localhost:9091/creditcard/approveOrRejectOrBlockedOrClosedCreditCard/${creditCardId}`;

            const updatedData = {
                creditCardStatus: updatedCreditCardStatus,
                creditCardLimit: updatedCreditCardLimit,

            };

            axios.put(updateUrl, updatedData, {
                headers: {
                    Authorization: `Bearer ${auth.jwt}`
                }
            })
                .then(response => {
                    if (response.status === 200) {
                        // Loan status updated successfully
                        // const updatedUsers = usersData.filter(user => user.creditCardId !== creditCardId);
                        // setUsersData(usersData.filter(user => user.creditCardId !== creditCardId));
                        fetchAllCreditCard();
                        onClose();
                    } else {
                        console.error('Error updating loan status:', response.status);
                    }
                })
                .catch(error => console.error('Error updating loan status:', error));
        };

        return (
            <div className="update-form-container" style={{ width: '400px', marginLeft: '300px' }}>
                <h2>Update CreditCard Status</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="creditCardStatus">creditCard Status:</label>
                        <select

                            id="creditCardStatus"
                            value={updatedCreditCardStatus}
                            onChange={handleCreditCardStatusChange}
                        >
                            <option value="ACTIVE">ACTIVE</option>
                            <option value="PENDING">PENDING</option>
                            <option value="CLOSED">CLOSED</option>
                            <option value="REJECTED">REJECTED</option>
                            <option value="BLOCKED">BLOCKED</option>

                        </select>
                        {/* <input
                            type="text"
                            id="creditCardStatus"
                            value={updatedCreditCardStatus}
                            onChange={handleCreditCardStatusChange}
                        /> */}
                    </div>
                    <div className="form-group">
                        <label htmlFor="creditCardLimit">creditCard Limit:</label>
                        <input
                            type="text"
                            id="creditCardLimit"
                            value={updatedCreditCardLimit}
                            onChange={handleCreditCardLimitChange}
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



            </div>

        );

    };



    return (

        <div>
            <h1>Credit Card Management</h1>
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
                    placeholder="Select Credit Card status"
                    style={{ marginRight: '16px', height: '39px' }}
                >
                    <option value="">Select CreditCard Status</option>
                    <option value="PENDING">PENDING</option>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="BLOCKED">BLOCKED</option>
                    <option value="CLOSED">CLOSED</option>
                    <option value="REJECTED">REJECTED</option>
                </select>
            </div>
            <div className="table-container" style={{ width: '1125px', overflowY: 'scroll' }}>
                <table>
                    <thead>
                        <tr style={{ fontFamily: 'Roboto', fontSize: '15px' }}>
                            <th>CardId</th>
                            <th>ApplicationDate</th>
                            <th>CardStatus</th>
                            <th>CardType</th>
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th>MobileNumber</th>
                            <th>A/C Number</th>
                            <th>AadharCard</th>
                            <th>PanCard</th>
                            <th>WorkType</th>
                            <th>MonthlyEarning</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedUsers.map((card) => (
                            <React.Fragment key={card.creditCardId}>
                                <tr style={{ fontFamily: 'Roboto', fontSize: '15px' }}>
                                    <td>{card.creditCardId}</td>
                                    <td>{card.applicationDate}</td>
                                    <td>{card.creditCardStatus}</td>
                                    <td>{card.creditCardType}</td>
                                    <td>{card.requiredDocument.customerFirstName}</td>
                                    <td>{card.requiredDocument.customerLastName}</td>
                                    <td>{card.requiredDocument.customerPhoneNumber}</td>
                                    <td>{card.requiredDocument.customerAccountNumber}</td>
                                    <td>{card.requiredDocument.aadharCardNumber}</td>
                                    <td>{card.requiredDocument.panCard}</td>
                                    <td>{card.requiredDocument.workType}</td>
                                    <td>{card.requiredDocument.monthlyEarning}</td>
                                    <td>
                                        <button
                                            variant="contained"
                                            style={{
                                                textDecoration: 'none',
                                                // pointerEvents: customer.userStatus === 'ACTIVE' ? 'none' : 'auto',
                                                // opacity: customer.userStatus === 'ACTIVE' ? 0.5 : 1,
                                                color: 'white',
                                                background: '#861f41'
                                            }}
                                            onClick={() => handleShowUpdateForm(card)}
                                            disabled={card.creditCardStatus === 'CLOSED' || card.creditCardStatus === 'REJECTED'}
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
                    creditCardId={selectedUser.creditCardId}
                    creditCardStatus={selectedUser.creditCardStatus}
                    creditCardLimit={selectedUser.creditCardLimit}
                    onClose={handleCloseUpdateForm}
                />
            )}
        </div>
    );
};

export default CreditCardManagement;