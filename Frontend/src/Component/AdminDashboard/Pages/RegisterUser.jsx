import React, { useEffect, useState } from 'react';
import { Card, Button } from 'antd';
import { FcManager } from 'react-icons/fc';
import { useAuth } from '../../../Utility.js/Auth';
import { EmployeeRegistrationForm, ManagerRegistrationForm,ContentWriterRegistrationForm} from '../RegistrationForm';
import axios from 'axios';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';


const { Meta } = Card;

function Dashboard() {
  const [isManagerRegistrationOpen, setManagerRegistrationOpen] = useState(false);
  const [isEmployeeRegistrationOpen, setEmployeeRegistrationOpen] = useState(false);
  const [isContentWriterRegistrationOpen, setContentWriterRegistrationOpen] = useState(false);
  const auth = useAuth();

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (showSuccessPopup || showError) {
      const timer = setTimeout(() => {
        setShowSuccessPopup(false);
        setShowError(false);
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [showSuccessPopup, showError]);


  const handleRegisterManagerClick = () => {
    setManagerRegistrationOpen(true);
  };

  const handleRegisterEmployeeClick = () => {
    setEmployeeRegistrationOpen(true);
  };

  const handleRegisterContentWriterClick = () => {
    setContentWriterRegistrationOpen(true);
  };



  const handleSubmitManagerRegistration = async (formData) => {
    try {
      console.log('Manager Registration:', formData);
      const response = await axios.post('http://localhost:9091/user/addManager', JSON.stringify(formData), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.jwt}`,
        },
      });
      console.log(response.data);
      setShowSuccessPopup(true);
      setManagerRegistrationOpen(false);
      setShowError(false);
    } catch (error) {
      console.error(error);
      setShowError(true);
      setShowSuccessPopup(false);
    }
  };

  const handleSubmitEmployeeRegistration = async (formData) => {
    try {
      console.log('Employee Registration:', formData);
      const response = await axios.post('http://localhost:9091/user/addEmployee', JSON.stringify(formData), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.jwt}`,
        },
      });
      console.log(response.data);
      setShowSuccessPopup(true);
      setEmployeeRegistrationOpen(false);
      setShowError(false);
    } catch (error) {
      console.error(error);
      setShowError(true);
      setShowSuccessPopup(false);
    }
  };


  const handleSubmitContentWriterRegistration = async (formData) => {
    try {
      console.log('Employee Registration:', formData);
      const response = await axios.post('http://localhost:9091/user/addContentWriter', JSON.stringify(formData), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.jwt}`,
        },
      });
      console.log(response.data);
      setEmployeeRegistrationOpen(false);
      setShowSuccessPopup(true);
      setContentWriterRegistrationOpen(false);
      setShowError(false);
    } catch (error) {
      console.error(error);
      setShowError(true);
      setShowSuccessPopup(false);
    }
  };

  const closeRegistrationPopup = () => {
    setManagerRegistrationOpen(false);
    setEmployeeRegistrationOpen(false);
    setContentWriterRegistrationOpen(false);
  };

  return (
    <div style={{ position: 'relative', width: '70%', padding: '16px', background: 'white' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '16px' }}>
        <Card
          hoverable
          style={{ width: '200px', height: '170px', margin: '0 8px', padding: '8px', background: '#ddecf9' }}
          onClick={handleRegisterManagerClick}
        >
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <FcManager style={{ fontSize: '80px' }} />

            <Button type="primary" style={{ marginTop: '8px', background: '#861f41' }} onClick={handleRegisterManagerClick}>
              Register Manager
            </Button>
          </div>
        </Card>
        <Card
          hoverable
          style={{ width: '200px', height: '170px', margin: '0 8px', padding: '8px', background: '#ddecf9' }}
          onClick={handleRegisterEmployeeClick}
        >
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <FcManager style={{ fontSize: '80px' }} />

            <Button type="primary" style={{ marginTop: '8px', background: '#861f41' }} onClick={handleRegisterEmployeeClick}>
              Register Employee
            </Button>
          </div>
        </Card>
        <Card
          hoverable
          style={{ width: '200px', height: '170px', margin: '0 8px', padding: '8px', background: '#ddecf9' }}
          onClick={handleRegisterContentWriterClick}
        >
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <FcManager style={{ fontSize: '80px' }} />

            <Button type="primary" style={{ marginTop: '8px', background: '#861f41' }} onClick={handleRegisterContentWriterClick}>
              Register Content-Writer
            </Button>
          </div>
        </Card>
      </div>
      {isManagerRegistrationOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.5)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: '50%', padding: '16px', background: 'white' }}>
            <ManagerRegistrationForm onSubmit={handleSubmitManagerRegistration} onClose={closeRegistrationPopup} />
          </div>
        </div>
      )}
      {isEmployeeRegistrationOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.5)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: '50%', padding: '16px', background: 'white' }}>
            <EmployeeRegistrationForm onSubmit={handleSubmitEmployeeRegistration} onClose={closeRegistrationPopup} />
          </div>
        </div>
      )}
      {isContentWriterRegistrationOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.5)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: '50%', padding: '16px', background: 'white' }}>
            <ContentWriterRegistrationForm onSubmit={handleSubmitContentWriterRegistration} onClose={closeRegistrationPopup} />
          </div>
        </div>
      )}
      {showSuccessPopup && (
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.5)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ position: 'relative', width: '450px', padding: '16px', background: 'white',borderRadius:'4px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '16px' }}>
            <CheckCircleOutlined style={{ fontSize: '40px', color: 'green' }} />
            <span style={{ marginLeft: '8px', fontSize: '20px' }}>Registration Successful!</span>
          </div>
          {/* Additional content for success popup */}
        </div>
      </div>
    )}
    {showError && (
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.5)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ position: 'relative', width: '450px', padding: '16px', background: 'white',borderRadius:'4px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '16px' }}>
            <CloseCircleOutlined style={{ fontSize: '40px', color: 'red' }} />
            <span style={{ marginLeft: '8px', fontSize: '20px' }}>Registration Failed!</span>
          </div>
          {/* Additional content for error message */}
          <div style={{ color: 'red', textAlign: 'center' }}>Email already registered. Please try a different email.</div>
        </div>
      </div>
    )}
    </div>
  );
}

export default Dashboard;