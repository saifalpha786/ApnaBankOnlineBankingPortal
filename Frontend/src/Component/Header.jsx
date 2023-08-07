import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import SignUpPage from './SignUpPage';
import BackgroundBanner from './BackgroundBanner';
import SignInPage from './SignInPage';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import { useAuth } from '../Utility.js/Auth';
import SideMenu from './AdminDashboard/SideBarMenu';
import Dashbaord from './AdminDashboard/Pages/RegisterUser';
import UserStatus from './AdminDashboard/Pages/UserStatus';
import { RequireAuth } from '../Utility.js/RequireAuth';
import UserManagement from './AdminDashboard/Pages/UserManagement';
import Profile from './AdminDashboard/Pages/Profile';
import ManagerSignPage from './ManagerSignInPage';
import { ManagerRequireAuth } from '../Utility.js/ManagerRequireAuth';
import ManagerSideMenu from './ManagerDashboard/SideBarMenu';
import ForgotPasswordPage from './ForgotPassword';
import ManagerProfile from './ManagerDashboard/Pages/Profile';
import EmployeeSignPage from './EmployeeSignPage';
import { EmployeeRequireAuth } from '../Utility.js/EmployeeRequireAuth';
import CustomerSideMenu from './CustomerDashboard/SideBarMenu';
import CustomerProfile from './CustomerDashboard/Pages/Profile';
import CustomerSignPage from './CustomerSignInPage';
import { CustomerRequireAuth } from '../Utility.js/CustomerRequireAuth';
import CustomerStatus from './ManagerDashboard/Pages/UserStatus';
import CustomerManagement from './ManagerDashboard/Pages/UserManagement';
import LoanManagement from './CustomerDashboard/Pages/LoanManagement';
import CreditCardManagement from './ManagerDashboard/Pages/CreditCardManagement';
import LockerManagement from './ManagerDashboard/Pages/LockerManagement';
import AccountManagement from './CustomerDashboard/Pages/AccountManagement';
import CreditCard from './CustomerDashboard/Pages/CreditCard';
import EmployeeSideMenu from './EmployeeDashboard/SideBarMenu';
import EmployeeProfile from './EmployeeDashboard/Pages/Profile';
import ManagerLoanManagement from './ManagerDashboard/Pages/LoanManagement';
import TransactionManagement from './EmployeeDashboard/Pages/TransactionManagement';
import TransactionStatus from './EmployeeDashboard/Pages/TransactionStatus';
import ApplyCreditCard from './CustomerDashboard/Pages/ApplyCreditCard';
import WithdrawCreditCard from './CustomerDashboard/Pages/WithdrawCreditCard';
import RepaymentCreditCard from './CustomerDashboard/Pages/RepaymentCreditCard';
import Statement from './CustomerDashboard/Pages/StatementCreditCard';
import RepaymentLoan from './CustomerDashboard/Pages/RepaymentLoan';
import GiftCardComponent from './CustomerDashboard/Pages/GiftCard';
import LockerComponent from './CustomerDashboard/Pages/Locker';
import Locker from './AdminDashboard/Pages/Locker';
import ApplyHomeLoan from './CustomerDashboard/Pages/ApplyHomeLoan';
import ApplyCarLoan from './CustomerDashboard/Pages/ApplyCarLoan';
import ApplyEducationLoan from './CustomerDashboard/Pages/ApplyEducationLoan';
import ApplyBusinessLoan from './CustomerDashboard/Pages/ApplyBusinessLoan';
import ApplyGoldLoan from './CustomerDashboard/Pages/ApplyGoldLoan';
import GiftCard from './AdminDashboard/Pages/GiftCard';
import AdminAboutUs from './AdminDashboard/Pages/AdminAboutUs';
import CustomerAboutUs from './CustomerDashboard/Pages/CustomerAboutUs';
import AdminContactUs from './AdminDashboard/Pages/AdminContactUs';
import CustomerContactUs from './CustomerDashboard/Pages/CustomerContactUs';
import ManagerAboutUs from './ManagerDashboard/Pages/ManagerAboutUs';
import ManagerContactUs from './ManagerDashboard/Pages/ManagerContactUs';
import EmployeeAboutUs from './EmployeeDashboard/Pages/EmployeeAboutUs';
import EmployeeContactUs from './EmployeeDashboard/Pages/EmployeeContactUs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import ChatBot from './ChatBot';
import QrPopup from './QrCodePopup';
import CustomerNews from './CustomerDashboard/Pages/CustomerNews';
import ContentWriterSignInPage from './ContentWriterSignIn';
import { ContentWriterRequireAuth } from '../Utility.js/ContentWriterRequireAuth';
import ContentWriterSideMenu from './ContentWriterDashboard/SideBarMenu';
import ContentWriterProfile from './ContentWriterDashboard/Profile';
import AddContent from './ContentWriterDashboard/AddContent';
import ContentWriterAboutUs from './ContentWriterDashboard/ContentWriterAboutUs';
import ContentwriterContactUs from './ContentWriterDashboard/ContentWriterContactUs';



const Navbar = ({ logoPath }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const isMobile = useMediaQuery('(max-width: 900px)');
  const auth = useAuth();
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    auth.logout();
  };

  const buttonStyle = {
    backgroundColor: '#861f41',
    border: 'none',
    outline: 'none'
  };

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  return (
    <Router>
      <AppBar position="sticky" sx={{ backgroundColor: '#861f41' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <img src={logoPath} alt="Logo" height="80px" width="300px" sx={{ backgroundColor: '#fff' }} />
          </Typography>
          {isMobile ? (
            <>
              <IconButton color="inherit" onClick={handleMenu}>
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: '#fff',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                {!auth.jwt && (
                  <>
                    <MenuItem onClick={handleClose} component={Link} to="/apnabank/signIn">Login</MenuItem>
                    <MenuItem onClick={handleClose} component={Link} to="/apnabank/signup">Register</MenuItem>
                  </>
                )}
              </Menu>
            </>
          ) : (
            <>
              {/* <Button component={Link} to="/" color="inherit" sx={{ borderRadius: '20px', color: '#f8f4f6', textTransform: 'none' }}>
                Home
              </Button>
              <Button component={Link} to="/apnabank/aboutUs" color="inherit" sx={{ borderRadius: '20px', color: '#f8f4f6', textTransform: 'none' }}>
                About Us
              </Button>
              <Button component={Link} to="/apnabank/contactUs" color="inherit" sx={{ borderRadius: '20px', color: '#f8f4f6', textTransform: 'none' }}>
                Contact Us
              </Button> */}
              {!auth.jwt && (
                <>
                  <button style={buttonStyle} onClick={openPopup}>
                    <span style={{ backgroundColor: 'green', borderRadius: '80%', display: 'inline-block', marginTop: '-7px'}}>
                      <FontAwesomeIcon icon={faWhatsapp} size="lg" style={{ color: 'white', fontSize: '35px', position: 'relative', zIndex: '1' }} />
                    </span>
                  </button>
                  <QrPopup isOpen={isPopupOpen} onClose={closePopup} />


                  <Button
                    color="primary"
                    onClick={handleClick}
                    sx={{
                      borderRadius: '20px',
                      fontSize: '16px',
                      ml: 2,
                      textTransform: 'none',
                      bgcolor: '#fff',
                      color: '#861f41',
                      marginRight: '10px',
                      padding: '5px 20px',
                      '&:hover': {
                        bgcolor: '#861f41',
                        color: '#fff',
                      },
                    }}
                  >
                    Login
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                  >
                    <MenuItem component={Link} to="/apnabank/admin/profile" onClick={handleClose}>
                      Admin Login
                    </MenuItem>
                    <MenuItem component={Link} to="/apnabank/manager/profile" onClick={handleClose}>
                      Manager Login
                    </MenuItem>
                    <MenuItem component={Link} to="/apnabank/employee/profile" onClick={handleClose}>
                      Employee Login
                    </MenuItem>
                    <MenuItem component={Link} to="/apnabank/customer/profile" onClick={handleClose}>
                      Customer Login
                    </MenuItem>
                    <MenuItem component={Link} to="/apnabank/contentWriter/profile" onClick={handleClose}>
                      Content Writer Login
                    </MenuItem>
                  </Menu>
                  <Button
                    color="primary"
                    href="/signup"
                    sx={{
                      borderRadius: '20px',
                      fontSize: '16px',
                      textTransform: 'none',
                      bgcolor: '#fff',
                      color: '#861f41',
                      marginRight: '10px',
                      padding: '5px 20px',
                      '&:hover': {
                        bgcolor: '#861f41',
                        color: '#fff',
                      },
                    }}
                    component={Link} to="/apnabank/signup"
                  >
                    Register
                  </Button>
                </>
              )}
              {auth.jwt && (
                <Button
                  color="primary"
                  onClick={handleLogout}
                  sx={{
                    borderRadius: '20px',
                    fontSize: '16px',
                    textTransform: 'none',
                    bgcolor: '#fff',
                    color: '#861f41',
                    marginRight: '10px',
                    padding: '5px 20px',
                    '&:hover': {
                      bgcolor: '#861f41',
                      color: '#fff',
                    },
                  }}
                  component={Link} to="/"
                >
                  Logout
                </Button>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
      <ChatBot></ChatBot>
      <Routes>
        <Route path="/" element={<BackgroundBanner />} />
        <Route path="/apnabank/aboutUs" element={<AboutUs />} />
        <Route path="/apnabank/contactUs" element={<ContactUs />} />
        <Route path="/apnabank/signIn" element={<SignInPage />} />
        <Route path="/apnabank/managerSignIn" element={<ManagerSignPage />} />
        <Route path="/apnabank/employeeSignIn" element={<EmployeeSignPage />} />
        <Route path="/apnabank/customerSignIn" element={<CustomerSignPage />} />
        <Route path="/apnabank/contentWriterSignIn" element={<ContentWriterSignInPage/>}/>
        <Route path="/apnabank/signUp" element={<SignUpPage />} />
        <Route path="/apnabank/forgotpassword" element={<ForgotPasswordPage />} />
        {/* <WhatsAppChatWidget phoneNumber="8707683323" message="Hello from Twilio!"/> */}
      </Routes>

      <div className="SideMenuAndPageContent" >
        <Routes>
          <Route path="/apnabank/admin/*" element={<RequireAuth><SideMenu /></RequireAuth>}>
            <Route path="aboutUs" element={<AdminAboutUs />} />
            <Route path="contactUs" element={<AdminContactUs />} />
            <Route path="dashboard" element={<Dashbaord />}></Route>
            <Route path="userStatus" element={<UserStatus />}></Route>
            <Route path="userManagement" element={<UserManagement />} />
            <Route path="profile" element={<Profile />} />
            <Route path="locker" element={<Locker />} />
            <Route path="giftCard" element={<GiftCard />} />
          </Route>
        </Routes>
      </div>

      <div className="ContentWriterSideMenuAndPageContent">
        <Routes>
          <Route path="/apnabank/contentWriter/*" element={<ContentWriterRequireAuth><ContentWriterSideMenu/></ContentWriterRequireAuth>}>
            <Route path="profile" element={<ContentWriterProfile/>}/>
            <Route path="dashboard" element={<AddContent/>}/>
            <Route path="aboutUs" element={<ContentWriterAboutUs/>}/>
            <Route path="contactUs" element={<ContentwriterContactUs/>}/>
          </Route>
        </Routes>

      </div>

      <div className="ManagerSideMenuAndPageContent">
        <Routes>
          <Route path="/apnabank/manager/*" element={<ManagerRequireAuth><ManagerSideMenu /></ManagerRequireAuth>}>
            <Route path="aboutUs" element={<ManagerAboutUs />} />
            <Route path="contactUs" element={<ManagerContactUs />} />
            <Route path="customerStatus" element={<CustomerStatus />} />
            <Route path="customerManagement" element={<CustomerManagement />} />
            <Route path="loanManagement" element={<ManagerLoanManagement />} />
            <Route path="creditCardManagement" element={<CreditCardManagement />} />
            <Route path="lockerManagement" element={<LockerManagement />} />
            <Route path="profile" element={<ManagerProfile />} />

          </Route>
        </Routes>
      </div>

      <div className="CustomerSideMenuAndPageContent">
        <Routes>
          <Route path="/apnabank/customer/*" element={<CustomerRequireAuth><CustomerSideMenu /></CustomerRequireAuth>}>
            <Route path="aboutUs" element={<CustomerAboutUs />} />
            <Route path="contactUs" element={<CustomerContactUs />} />
            <Route path="news" element={<CustomerNews/>}/>
            <Route path="profile" element={<CustomerProfile />} />
            <Route path="accountManagement" element={<AccountManagement />} />
            <Route path="loanManagement" element={<LoanManagement />} />
            <Route path="creditCard" element={<CreditCard />} />
            <Route path='applyCreditCard' element={<ApplyCreditCard />} />
            <Route path="withdrawCreditCard" element={<WithdrawCreditCard />} />
            <Route path="repaymentCreditCard" element={<RepaymentCreditCard />} />
            <Route path="statementCreditCard" element={<Statement />} />
            <Route path="repayment/:loanId" element={<RepaymentLoan />} />
            <Route path="applyHomeLoan" element={<ApplyHomeLoan />} />
            <Route path="applyCarLoan" element={<ApplyCarLoan />} />
            <Route path='applyEducationLoan' element={<ApplyEducationLoan />} />
            <Route path='applyBusinessLoan' element={<ApplyBusinessLoan />} />
            <Route path='applyGoldLoan' element={<ApplyGoldLoan />} />
            <Route path="giftCard" element={<GiftCardComponent />} />
            <Route path="locker" element={<LockerComponent />} />
            /</Route>
        </Routes>
      </div>

      <div className="EmployeeSideMenuAndPageContent">
        <Routes>
          <Route path="/apnabank/employee/*" element={<EmployeeRequireAuth><EmployeeSideMenu /></EmployeeRequireAuth>}>
            <Route path="aboutUs" element={<EmployeeAboutUs />} />
            <Route path="contactUs" element={<EmployeeContactUs />} />
            <Route path="profile" element={<EmployeeProfile />} />
            <Route path="transactionStatus" element={<TransactionStatus />} />
            <Route path="transactionManagement" element={<TransactionManagement />} />

            /</Route>
        </Routes>
      </div>

    </Router >
  );
};

export default Navbar;