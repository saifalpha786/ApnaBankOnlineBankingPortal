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

const AccountManagement = () => {
  const [userName, setUserName] = useState('');
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [showOtpPopup, setShowOtpPopup] = useState(false);

  const sendOtpToEmail = async (email) => {
    try {
      const response = await axios.get(`http://localhost:9091/user/sendOtpToEmail/${email}`);
      // Handle the response if needed
      console.log(response.data); // Assuming the API returns some response data
    } catch (error) {
      // Handle errors
      console.log(error);
    }
  };

  const validateOtp = async (email, enteredOtp) => {
    try {
      const response = await axios.post('http://localhost:9091/user/validateOTP', {
        email: email,
        otp: enteredOtp,
      });
      // Handle the response if needed
      console.log(response.data); // Assuming the API returns some response data
      return response.data.valid; // Assuming the API returns a "valid" field indicating OTP validation status
    } catch (error) {
      // Handle errors
      console.log(error);
      return false; // Return false in case of an error
    }
  };

  const handleOtpSubmit = async () => {
    const isValid = await validateOtp(userName, otp);

    if (isValid) {
      // OTP is valid, do something
      setOtpError('');
      setShowOtpPopup(false);
      // Perform the transfer/withdrawal/deposit action
      // Call the respective submit functions (handleSubmitTransfer, handleSubmitWithdraw, handleSubmitDeposit)
    } else {
      // OTP is invalid, display an error message
      setOtpError('Invalid OTP. Please try again.');
    }
  };

  const handleSubmitTransfer = async (formData) => {
    // Perform the necessary form validation and data preparation
    // ...

    // If everything is valid, send OTP to the email address
    await sendOtpToEmail(formData.userName);
    // Show the OTP verification popup
    setShowOtpPopup(true);
  };

  const handleSubmitWithdraw = async (formData) => {
    // Perform the necessary form validation and data preparation
    // ...

    // If everything is valid, send OTP to the email address
    await sendOtpToEmail(formData.userName);
    // Show the OTP verification popup
    setShowOtpPopup(true);
  };

  const handleSubmitDeposit = async (formData) => {
    // Perform the necessary form validation and data preparation
    // ...

    // If everything is valid, send OTP to the email address
    await sendOtpToEmail(formData.userName);
    // Show the OTP verification popup
    setShowOtpPopup(true);
  };

  const handleDownloadStatement = async () => {
    try {
      const response = await axios.get('http://localhost:9091/user/downloadStatement');
      // Assuming the API returns the statement file as a response

      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      saveAs(pdfBlob, 'account_statement.pdf');
    } catch (error) {
      // Handle errors
      console.log(error);
    }
  };

  const handleGenerateReport = async () => {
    try {
      const response = await axios.get('http://localhost:9091/user/generateReport');
      // Assuming the API returns the report data

      const doc = new jsPDF();
      doc.autoTable({ html: '#report-table' });

      doc.save('report.pdf');
    } catch (error) {
      // Handle errors
      console.log(error);
    }
  };

  useEffect(() => {
    // Fetch the user name or email from the authenticated user context
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwt_decode(token);
      setUserName(decoded.email);
    }
  }, []);

  return (
    <div>
      <Card
        hoverable
        style={{ width: '100%', height: 'auto' }}
        cover={<img alt="example" src="https://picsum.photos/200/300" />}
      >
        <Meta title="Account Overview" description="Manage your account and perform transactions" />
        <CardContent>
          <div className="overview">
            <Typography variant="h6" className="section-title">
              Transfer
            </Typography>
            <TransferForm onSubmit={handleSubmitTransfer} />

            <Typography variant="h6" className="section-title">
              Withdraw
            </Typography>
            <WithdrawForm onSubmit={handleSubmitWithdraw} />

            <Typography variant="h6" className="section-title">
              Deposit
            </Typography>
            <DepositForm onSubmit={handleSubmitDeposit} />

            <Typography variant="h6" className="section-title">
              Transactions
            </Typography>
            {/* Render the transactions table */}
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="transactions table">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Iterate over the transaction data and render each row */}
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.amount}</TableCell>
                      <TableCell>{transaction.type}</TableCell>
                      <TableCell>
                        {transaction.status === 'completed' ? (
                          <CheckCircleIcon style={{ color: 'green' }} />
                        ) : (
                          <CloseCircleOutlined style={{ color: 'red' }} />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Button
              type="primary"
              shape="round"
              icon={<AiOutlineEye />}
              size="large"
              onClick={handleDownloadStatement}
            >
              Download Statement
            </Button>

            <Button
              type="primary"
              shape="round"
              icon={<AiOutlineFilePdf />}
              size="large"
              onClick={handleGenerateReport}
            >
              Generate Report
            </Button>
          </div>
        </CardContent>
      </Card>

      <Modal title="OTP Verification" visible={showOtpPopup} footer={null} onCancel={() => setShowOtpPopup(false)}>
        <div className="otp-verification">
          <h3>Enter the OTP sent to your email address:</h3>
          <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
          <p className="error">{otpError}</p>
          <button onClick={handleOtpSubmit}>Submit</button>
        </div>
      </Modal>
    </div>
  );
};

export default AccountManagement;
