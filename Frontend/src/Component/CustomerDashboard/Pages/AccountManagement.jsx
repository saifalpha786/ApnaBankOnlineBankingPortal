import React, { useState, useEffect } from 'react';
import { Card, Button, Modal } from 'antd';
import { FcMoneyTransfer } from 'react-icons/fc';
import { RiRefund2Line } from 'react-icons/ri';
import { AiOutlineEye } from 'react-icons/ai';
import { AiOutlineFilePdf } from 'react-icons/ai';
import { useAuth } from '../../../Utility.js/Auth';
import TransferForm from '../TransferForm';
import WithdrawForm from '../WithdrawForm';
import DepositForm from '../DepositForm';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import DatePicker from 'react-datepicker';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { saveAs } from 'file-saver';
import { useRef } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import './AccountManagemant.css';
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  CardContent,
  Typography,
} from '@mui/material';

const { Meta } = Card;

function Dashboard() {
  const [isTransferOpen, setTransferOpen] = useState(false);
  const [isWithdrawOpen, setWithdrawOpen] = useState(false);
  const [isDepositOpen, setDepositOpen] = useState(false);
  const [balanceModalVisible, setBalanceModalVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [transactionModalVisible, setTransactionModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [filterOption, setFilterOption] = useState('all'); // Options: 'all', 'last3months', 'last6months', 'custom'
  const [filterDate, setFilterDate] = useState(null);
  const tableContainerRef = useRef(null);


  const auth = useAuth();

  const showTransferModal = () => {
    setTransferOpen(true);
  };

  const showWithdrawModal = () => {
    setWithdrawOpen(true);
  };

  const showDepositModal = () => {
    setDepositOpen(true);
  };

  const showBalanceModal = () => {
    setBalanceModalVisible(true);
  };

  const showTransactionModal = () => {
    setTransactionModalVisible(true);
  };

  const hideModals = () => {
    setTransferOpen(false);
    setWithdrawOpen(false);
    setDepositOpen(false);
    setBalanceModalVisible(false);
    setTransactionModalVisible(false);
  };

  const handleTransferClick = () => {
    showTransferModal();
  };

  const handleWithdrawClick = () => {
    showWithdrawModal();
  };

  const handleDepositClick = () => {
    showDepositModal();
  };

  // Function to handle the filter option change
  const handleFilterOptionChange = (option) => {
    setFilterOption(option);
  };

  // Function to handle the custom filter date change
  const handleFilterDateChange = (date) => {
    setFilterDate(date);
  };


  const downloadTransactions = () => {
    // Get the filtered transactions
    const filteredTransactions = filterTransactions();

    // Create a new PDF document
    const doc = new jsPDF('landscape', 'mm', 'a2');

    // Define the table column headers
    const headers = [
      'Transaction-ID',
      'CustomerAccountNumber',
      'CustomerUserName',
      'TargetAccountNumber',
      'TargetIFSCCode',
      'TargetOwnerName',
      'Amount',
      'InitiationDate',
      'TransactionType',
      'TransactionStatus',
      'TransactionNote'
    ];

    // Extract the data for the table rows
    const data = filteredTransactions.map((transaction) => [
      transaction.transactionId.toString(),
      transaction.customerAccountNumber.toString(),
      transaction.customerUserName,
      transaction.targetAccountNumber.toString(),
      transaction.targetIFSCCode,
      transaction.targetOwnerName,
      transaction.amount.toString(),
      transaction.initiationDate.toString(),
      transaction.transactionType.toString(),
      transaction.transactionStatus.toString(),
      transaction.transactionNote
    ]);

    // Define column styles for alignment and padding
    const columnStyles = {
      0: { align: 'left', cellPadding: 5 },   // Transaction-ID
      1: { align: 'left', cellPadding: 5 },   // CustomerAccountNumber
      2: { align: 'left', cellPadding: 5 },   // CustomerUserName
      3: { align: 'left', cellPadding: 5 },   // TargetAccountNumber
      4: { align: 'left', cellPadding: 5 },   // TargetIFSCCode
      5: { align: 'left', cellPadding: 5 },   // TargetOwnerName
      6: { align: 'right', cellPadding: 5 },  // Amount
      7: { align: 'left', cellPadding: 4 },   // InitiationDate
      8: { align: 'left', cellPadding: 5 },   // TransactionType
      9: { align: 'left', cellPadding: 5 },   // TransactionStatus
      10: { align: 'left', cellPadding: 5 }   // TransactionNote
    };

    // Set explicit column widths (in this example, based on Java code)
    const columnWidths = [20, 27, 75, 42, 45, 40, 35, 25, 43, 45, 35];

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
    doc.save('transactions.pdf');
  };












  // Function to filter the transactions based on the selected filter option and date
  const filterTransactions = () => {
    let filteredTransactions = transactions;

    if (filterOption === 'last3months') {
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
      filteredTransactions = filteredTransactions.filter(transaction => new Date(transaction.initiationDate) >= threeMonthsAgo);
    } else if (filterOption === 'last6months') {
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      filteredTransactions = filteredTransactions.filter(transaction => new Date(transaction.initiationDate) >= sixMonthsAgo);
    } else if (filterOption === 'custom' && filterDate) {
      filteredTransactions = filteredTransactions.filter(transaction => new Date(transaction.initiationDate) >= filterDate);
    }

    return filteredTransactions;
  };

  const handleSubmitTransfer = async (formData) => {
    try {
      console.log('Transfer:', formData);
      const response = await axios.post('http://localhost:9091/transaction/transferAmount', JSON.stringify(formData), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.jwt}`,
        },
      });
      console.log(response)
      hideModals();
      if (response.status === 200) {
        setTimeout(() => {
          setSuccessMessage(response.data);
        }, 2000);
      } else {
        const errorMessage = response.data.message || 'Transfer failed. Please try again.';
        setErrorMessage(errorMessage);
      }
    } catch (error) {
      console.error(error);
      hideModals();
      setErrorMessage('Transfer failed. Please try again.');
    }
  };

  const handleSubmitWithdraw = async (formData) => {
    try {
      console.log('Withdraw:', formData);
      const response = await axios.post(
        'http://localhost:9091/transaction/withdrawAmount',
        JSON.stringify(formData),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.jwt}`,
          },
        }
      );

      if (response.status === 200) {
        setTimeout(() => {
          setSuccessMessage(response.data);
        }, 2000);
      } else {
        const errorMessage = response.data.message || 'Withdrawal failed. Please try again.';
        setErrorMessage(errorMessage);
      }

      console.log(response.data);
      hideModals();
    } catch (error) {
      console.error(error);
      hideModals();
      setErrorMessage('Withdrawal failed. Please try again.');
    }
  };

  const handleSubmitDeposit = async (formData) => {
    try {
      console.log('Employee Registration:', formData);
      const response = await axios.post(
        'http://localhost:9091/transaction/requestToDepositAmount',
        JSON.stringify(formData),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.jwt}`,
          },
        }
      );

      if (response.status === 200) {
        setTimeout(() => {
          setSuccessMessage(response.data);
        }, 2000);
      } else {
        const errorMessage = response.data.message || 'Deposit request failed. Please try again.';
        setErrorMessage(errorMessage);
      }

      console.log(response.data);
      hideModals();
    } catch (error) {
      console.error(error);
      hideModals();
      setErrorMessage('Deposit request failed. Please try again.');
    }
  };

  const handleViewBalance = () => {
    const token = localStorage.getItem('jwt');
    const decodedToken = jwt_decode(token);
    const userName = decodedToken.sub;

    axios
      .get(`http://localhost:9091/account/getUserAccountByUserName/${userName}`)
      .then(response => {
        const userData = response.data;
        setUser(userData);
        showBalanceModal(); // Show the balance modal after fetching the data
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
      });
  };

  const handleViewAllTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:9091/transaction/getTransactionsDataForCurrentUser', {
        headers: {
          Authorization: `Bearer ${auth.jwt}`,
        },
      });
      setTransactions(response.data);
      showTransactionModal();
    } catch (error) {
      console.error('Error fetching Transactions:', error);
    }
  };

  const handleDownloadTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:9091/transaction/getTransactionsForCurrentUser/pdf', {
        headers: {
          Authorization: `Bearer ${auth.jwt}`,
        },
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'transactions.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading transactions:', error);
    }
  };

  return (
    <div style={{ position: 'relative', width: '70%', padding: '16px', background: 'white' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '16px' }}>
        <Card
          hoverable
          style={{ width: '200px', height: '170px', margin: '0 8px', padding: '8px', background: '#ddecf9' }}
          onClick={handleTransferClick}
        >
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <FcMoneyTransfer style={{ fontSize: '80px' }} />

            <Button type="primary" style={{ marginTop: '8px', background: '#861f41' }} onClick={handleTransferClick}>
              Transfer Money
            </Button>
          </div>
        </Card>

        <Card
          hoverable
          style={{ width: '200px', height: '170px', margin: '0 8px', padding: '8px', background: '#ddecf9' }}
          onClick={handleWithdrawClick}
        >
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <FcMoneyTransfer style={{ fontSize: '80px' }} />

            <Button type="primary" style={{ marginTop: '8px', background: '#861f41' }} onClick={handleWithdrawClick}>
              Withdraw Money
            </Button>
          </div>
        </Card>

        <Card
          hoverable
          style={{ width: '200px', height: '170px', margin: '0 8px', padding: '8px', background: '#ddecf9' }}
          onClick={handleDepositClick}
        >
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <RiRefund2Line style={{ fontSize: '80px' }} />

            <Button type="primary" style={{ marginTop: '8px', background: '#861f41' }} onClick={handleDepositClick}>
              Deposit Money
            </Button>
          </div>
        </Card>

        <Card
          hoverable
          style={{ width: '200px', height: '170px', margin: '0 8px', padding: '8px', background: '#ddecf9' }}
          onClick={handleViewBalance}
        >
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <AiOutlineEye style={{ fontSize: '80px' }} />

            <Button type="primary" style={{ marginTop: '8px', background: '#861f41' }} onClick={handleViewBalance}>
              View Balance
            </Button>
          </div>
        </Card>

        <Card
          hoverable
          style={{ width: '200px', height: '170px', margin: '0 8px', padding: '8px', background: '#ddecf9' }}
          onClick={handleViewAllTransactions}
        >
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <AiOutlineFilePdf style={{ fontSize: '80px' }} />

            <Button type="primary" style={{ marginTop: '8px', background: '#861f41' }} onClick={handleViewAllTransactions}>
              Transactions History
            </Button>
          </div>
        </Card>
      </div>



      <Modal
        title="List of Transactions"
        visible={transactionModalVisible}
        onCancel={hideModals}
        footer={null}
      >
        <div style={{ overflowX: 'scroll', width: '900px' }}>
          {/* Filter Options */}
          <div style={{ marginBottom: '16px' }}>
            <label>
              Filter by:
              <select value={filterOption} onChange={e => handleFilterOptionChange(e.target.value)}>
                <option value="all">All Transactions</option>
                <option value="last3months">Last 3 Months</option>
                <option value="last6months">Last 6 Months</option>
                <option value="custom">Custom Date</option>
              </select>
            </label>
            {filterOption === 'custom' && (
              <div style={{ position: 'relative', zIndex: 9999 }}>
                <DatePicker
                  selected={filterDate}
                  onChange={handleFilterDateChange}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Select a date"
                />
              </div>
            )}
            {/* <Button onClick={filterTransactions}>Apply Filter</Button> */}
            <br />
            <Button onClick={downloadTransactions} style={{ background: '#861f41', color: 'white' }}>Download Transactions (PDF)</Button>
          </div>

          {/* Transaction Table */}
          <TableContainer component={Paper} className="tableContainer">
            <Table stickyHeader>
              <TableHead>
                {/* Table Header */}
                <TableRow>
                  <TableCell style={{ background: '#861f41', color: 'white' }} >Transaction ID</TableCell>
                  <TableCell style={{ background: '#861f41', color: 'white' }} >Customer Account Number</TableCell>
                  <TableCell style={{ background: '#861f41', color: 'white' }} >Customer User Name</TableCell>
                  <TableCell style={{ background: '#861f41', color: 'white' }} >Target Account Number</TableCell>
                  <TableCell style={{ background: '#861f41', color: 'white' }} >Target IFSC Code</TableCell>
                  <TableCell style={{ background: '#861f41', color: 'white' }} >Target Owner Name</TableCell>
                  <TableCell style={{ background: '#861f41', color: 'white' }} >Amount</TableCell>
                  <TableCell style={{ background: '#861f41', color: 'white' }} >Initiation Date</TableCell>
                  <TableCell style={{ background: '#861f41', color: 'white' }} >Transaction Type</TableCell>
                  <TableCell style={{ background: '#861f41', color: 'white' }} >Transaction Status</TableCell>
                  <TableCell style={{ background: '#861f41', color: 'white' }} >Transaction Note</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Table Rows */}
                {filterTransactions().map((transaction) => (
                  <TableRow key={transaction.transactionId}>
                    <TableCell>{transaction.transactionId}</TableCell>
                    <TableCell>{transaction.customerAccountNumber}</TableCell>
                    <TableCell>{transaction.customerUserName}</TableCell>
                    <TableCell>{transaction.targetAccountNumber}</TableCell>
                    <TableCell>{transaction.targetIFSCCode}</TableCell>
                    <TableCell>{transaction.targetOwnerName}</TableCell>
                    <TableCell> ₹{transaction.amount}</TableCell>
                    <TableCell>{transaction.initiationDate}</TableCell>
                    <TableCell>
                      <span style={{ color: transaction.transactionType === 'CREDITED' ? 'green' : 'red' }}>
                        {transaction.transactionType}
                      </span>
                    </TableCell>
                    <TableCell>{transaction.transactionStatus}</TableCell>
                    <TableCell>{transaction.transactionNote}</TableCell>
                  </TableRow>
                ))}
              </TableBody>

            </Table>
          </TableContainer>
          {/* Download Button */}
        </div>
      </Modal>

      <Modal
        title="Balance"
        visible={balanceModalVisible}
        onCancel={hideModals}
        footer={null}
      >
        <p>Balance: {user && user.availableBalance}</p>
      </Modal>

      {isTransferOpen && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '24px',
            zIndex: 9999,
            borderRadius: '4px',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
          }}
        >
          <TransferForm onClose={hideModals} onSubmit={handleSubmitTransfer} />
        </div>
      )}

      {isWithdrawOpen && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '24px',
            zIndex: 9999,
            borderRadius: '4px',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
          }}
        >
          <WithdrawForm onClose={hideModals} onSubmit={handleSubmitWithdraw} />
        </div>
      )}

      {isDepositOpen && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '24px',
            zIndex: 9999,
            borderRadius: '4px',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
          }}
        >
          <DepositForm onClose={hideModals} onSubmit={handleSubmitDeposit} />
        </div>
      )}
      {successMessage === "Transfer Successfully......" && (

        <Modal
          title="Notification"
          visible={!!successMessage}
          onCancel={() => setSuccessMessage('')}
          footer={null}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <CheckCircleOutlined style={{ fontSize: 24, color: 'green', marginRight: 8 }} />
            <span>{successMessage}</span>
          </div>
        </Modal>
      )}
      {successMessage === "Withdraw Succesfully......" && (

        <Modal
          title="Notification"
          visible={!!successMessage}
          onCancel={() => setSuccessMessage('')}
          footer={null}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <CheckCircleOutlined style={{ fontSize: 24, color: 'green', marginRight: 8 }} />
            <span>{successMessage}</span>
          </div>
        </Modal>
      )}

      {successMessage === "Successfully Requested for Deposit......" && (

        <Modal
          title="Notification"
          visible={!!successMessage}
          onCancel={() => setSuccessMessage('')}
          footer={null}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <CheckCircleOutlined style={{ fontSize: 24, color: 'green', marginRight: 8 }} />
            <span>{successMessage}</span>
          </div>
        </Modal>
      )}

      {successMessage === "TargetAccountNumber Should Not Be Same as CustomerAccountNumber" && (

        <Modal
          title="Notification"
          visible={!!successMessage}
          onCancel={() => setSuccessMessage('')}
          footer={null}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <CloseCircleOutlined style={{ fontSize: 24, color: 'red', marginRight: 8 }} />
            <span>{successMessage}</span>
          </div>
        </Modal>
      )}
      {successMessage === "Insufficient Balance!!!!" && (

        <Modal
          title="Notification"
          visible={!!successMessage}
          onCancel={() => setSuccessMessage('')}
          footer={null}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <CloseCircleOutlined style={{ fontSize: 24, color: 'red', marginRight: 8 }} />
            <span>{successMessage}</span>
          </div>
        </Modal>
      )}

      {successMessage === "Insufficient Balance OR Amount should be Greater than Zero!!!!" && (

        <Modal
          title="Notification"
          visible={!!successMessage}
          onCancel={() => setSuccessMessage('')}
          footer={null}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <CloseCircleOutlined style={{ fontSize: 24, color: 'red', marginRight: 8 }} />
            <span>{successMessage}</span>
          </div>
        </Modal>
      )}
      {errorMessage && (
        <Modal
          title="Transfer Error"
          visible={!!errorMessage}
          onCancel={() => setErrorMessage('')}
          footer={null}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <CloseCircleOutlined style={{ fontSize: 24, color: 'red', marginRight: 8 }} />
            <span>{errorMessage}</span>
          </div>
        </Modal>
      )}
    </div>
  );


}

export default Dashboard;