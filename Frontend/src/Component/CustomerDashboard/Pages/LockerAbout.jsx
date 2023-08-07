import React, { useState } from 'react';

const LockerAbout = () => {
  const [activeButton, setActiveButton] = useState('benefits');

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  return (
    <div
      style={{
        width: '600px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      <style>
        {`
        .card-button {
          padding: 10px 20px;
          font-size: 16px;
          border: none;
          background-color: transparent;
          color: #861f41;
          cursor: pointer;
          text-decoration: underline;
          transition: transform 0.5s ease;
        }

        .card-button.active {
          transform: scale(1.3);
          text-decoration: none;
        }

        ul li {
          margin-bottom: 15px;
        }
        
        .button-container {
          display: flex;
          justify-content: space-around;
          margin-bottom: 20px;
        }
        `}
      </style>

      <h2
        style={{
          fontSize: '30px',
          marginBottom: '16px',
          color: '#333',
          textAlign: 'center'
        }}
      >
        Bank Locker Facility
      </h2>
      <div className="button-container">
        <button
          className={`card-button ${activeButton === 'benefits' ? 'active' : ''}`}
          onClick={() => handleButtonClick('benefits')}
        >
          Benefits for You
        </button>
        <button
          className={`card-button ${activeButton === 'fees' ? 'active' : ''}`}
          onClick={() => handleButtonClick('fees')}
        >
          Fees and Charges
        </button>
        <button
          className={`card-button ${activeButton === 'terms' ? 'active' : ''}`}
          onClick={() => handleButtonClick('terms')}
        >
          Terms and Conditions
        </button>
      </div>
      <div
        style={{
          color: '#555',
        }}
      >
        {activeButton === 'benefits' && (
          <React.Fragment>
            <p style={{ lineHeight: '1.5' }}>
              Renting a bank locker provides several benefits for customers. Some of the key benefits are:
            </p>
            <ul>
              <li>Safe and Secure: Bank lockers offer a highly secure storage solution for your valuable items, providing protection against theft, loss, or damage.</li>
              <li>Privacy: You have complete privacy when accessing your locker. Only you or authorized signatories can access the locker with proper identification.</li>
              <li>Peace of Mind: By storing your valuable possessions in a bank locker, you can enjoy peace of mind knowing that they are kept in a controlled and monitored environment.</li>
              <li>Insurance Coverage: Many banks offer insurance coverage for the contents of your locker, providing an additional layer of protection.</li>
            </ul>
          </React.Fragment>
        )}
        {activeButton === 'fees' && (
          <React.Fragment>
            <p style={{ lineHeight: '1.5' }}>
              <h3>Fees and Charges</h3>
              The monthly fees for bank lockers are as follows:
            </p>
            <ul style={{ paddingLeft: '40px', textAlign: 'left' }}>
              <li>Small Locker: INR 500 per month (charged in advance)</li>
              <li>Medium Locker: INR 1000 per month (charged in advance)</li>
              <li>Large Locker: INR 1500 per month (charged in advance)</li>
              <li>Security Deposit: A refundable security deposit is required at the time of availing the locker facility. The amount may vary depending on the size of the locker and bank policies.</li>
              <li>Additional Charges: Some banks may apply additional charges for services like key replacement, late payment, or locker drilling in case of emergencies.</li>
            </ul>
          </React.Fragment>
        )}
        {activeButton === 'terms' && (
          <React.Fragment>
            <p style={{ lineHeight: '1.5' }}>
              <h3>Terms and Conditions</h3>
            </p>
            <ul style={{ paddingLeft: '40px', textAlign: 'left' }}>
              <li>Locker Availability: The availability of lockers is subject to the bank's allocation and availability.</li>
              <li>Locker Access: Locker access can only be granted during specified banking hours and with proper identification.</li>
              <li>Advance Payment: The fees for the locker must be paid in advance for the selected duration.</li>
              <li>Renewal and Cancellation: Lockers can be renewed upon payment of fees for the subsequent period. Cancellation of locker facility requires prior notice to the bank.</li>
              <li>Responsibility: The bank holds no responsibility for the items stored in the locker. Customers are advised to obtain their own insurance coverage for the contents.</li>
            </ul>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default LockerAbout;
