import React, { useState } from 'react';

const CardAbout = () => {
  const [showBenefits, setShowBenefits] = useState(true);
  const [showTerms, setShowTerms] = useState(false);

  const handleBenefitsClick = () => {
    setShowBenefits(true);
    setShowTerms(false);
  };

  const handleTermsClick = () => {
    setShowBenefits(false);
    setShowTerms(true);
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

        ul li{
          margin-bottom:15px;
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
          textAlign:'center'
        }}
      >
        Apna Bank Gift Cards
      </h2>
      <div className="button-container">
        <button
          className={`card-button ${showBenefits ? 'active' : ''}`}
          onClick={handleBenefitsClick}
        >
          Benefits for You
        </button>
        <button
          className={`card-button ${showTerms ? 'active' : ''}`}
          onClick={handleTermsClick}
        >
          Terms and Conditions
        </button>
      </div>
      <div
        style={{
          color: '#555',
        }}
      >
        {showBenefits && (
          <React.Fragment>
            <p style={{ lineHeight: '1.5' }}>
              There are various benefits of Gifts Cards. It is highly secure as it has a unique PIN number.
              Besides, these Prepaid Cards are widely accepted and can load any amount between Rs. 100 and Rs. 10,000.
              Users can also avail exciting offers and choose the balance amount as per their needs.
            </p>
            <ul>
              <li> Competitive Pricing: We believe that great products should come at great prices. Our competitive pricing strategy ensures that you get the best value for your money, without compromising on quality</li>
              <li>Extensive Product Range: Discover a vast selection of product category on our website. From Food to Shopping, we have everything you need to meet your  requirements. Explore our diverse range and find the perfect fit for your needs</li>
              <li>  Exclusive Offers and Discounts: Enjoy exclusive offers and discounts available only to our valued customers. Be the first to know about our special promotions and take advantage of great savings on your favorite product </li>
            </ul>
          </React.Fragment>
        )}
        {showTerms && (
          <React.Fragment>
            <p style={{ lineHeight: '1.5' }}>
             <h3>Terms and Conditions</h3>
            </p>
            <ul style={{ paddingLeft: '40px', textAlign: 'left' }}>
              <li>Validity: The gift card is valid for a specified period from the date of purchase or activation, as mentioned on the card or accompanying documentation</li>
              <li>Redemption: The gift card can be redeemed for merchandise or services at participating locations or online platforms as specified by the issuer.</li>
              <li> The gift card holds no cash value and cannot be exchanged for cash or used to obtain cash advances.</li>
              <li>The gift card may have certain limitations on its use, such as restrictions on specific products, brands, or services.</li>
              <li>Returns and Refunds: Any returns or refunds on items purchased using the gift card will be issued in the form of store credit or a new gift card, subject to the return policy of the merchant</li>
            </ul>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default CardAbout;
