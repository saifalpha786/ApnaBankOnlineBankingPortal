import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Component/Header';
import logo from './Images/ApnaLogo.PNG';
import BackgroundBanner from './Component/BackgroundBanner';
import SignUpPage from './Component/SignUpPage'
import Footer from './Component/footer';
import SignInPage from './Component/SignInPage';
import AboutUs from './Component/AboutUs';
import ContactUs from './Component/ContactUs';
import { AuthProvider } from './Utility.js/Auth';
import AdminAboutUs from './Component/AdminDashboard/Pages/AdminAboutUs';
import Popup from './Component/Popup';

const App = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AuthProvider>
        <Navbar logoPath={logo}>
          <div style={{ flex: 1, marginTop: '150px' }}>
            <Routes>
              <Route path="/" element={<BackgroundBanner />} />
              <Route path="/apnabank/admin/aboutUs" element={<AdminAboutUs/>} />
              <Route path="/apnabank/contactUs" element={<ContactUs />} />
              <Route path="/apnabank/signIn" element={<SignInPage />} />
              <Route path="/apnabank/signup" element={<SignUpPage></SignUpPage>} />
            </Routes>
          </div>
        </Navbar>
        <Footer />
      </AuthProvider>
      <Popup/>
    </div>
  );
};

export default App;
