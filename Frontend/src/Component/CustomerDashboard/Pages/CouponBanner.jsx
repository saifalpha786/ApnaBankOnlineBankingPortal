import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../Utility.js/Auth';

const CouponBanner = () => {
  const [couponCode, setCouponCode] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const auth = useAuth();

  useEffect(() => {
    fetchCouponCode();
  }, []);

  const fetchCouponCode = async () => {
    try {
      const jwtToken = localStorage.getItem('jwt');
      const response = await fetch('http://localhost:9091/giftcard/getListOfCouponCode', {
        headers: {
          Authorization: `Bearer ${auth.jwt}`,
        },
      });
      const responseData = await response.json();
      if (responseData && responseData.length > 0) {
        setCouponCode(responseData[0].couponCode);
      }
      setData(responseData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching coupon code:', error);
      setIsLoading(false);
    }
  };

  const getDiscountPercentage = (discountValue) => {
    return `${discountValue}%`;
  };

  const styles = {
    banner: {
      backgroundColor: '#f8f8f8',
      padding: '20px',
      textAlign: 'center',
      marginTop: '250px'
    },
    bannerHeading: {
      fontSize: '24px',
      marginBottom: '10px',
    },
    loadingMessage: {
      fontSize: '18px',
      color: '#888',
      marginTop: '10px',
    },
    noOfferMessage: {
      fontSize: '18px',
      color: '#888',
      marginTop: '10px',
    },
    couponMessage: {
      fontSize: '20px',
      color: '#333',
    },
    couponCode: {
      fontSize: '36px',
      fontWeight: 'bold',
      color: '#ff5f00',
    },
    discountMessage: {
      fontSize: '20px',
      color: '#333',
    },
    bestDealContainer: {
      marginTop: '20px',
      padding: '10px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
    },
    bestDealText: {
      fontSize: '16px',
      color: '#555',
    },
    discountValue: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#ff5f00',
      margin: '10px 0',
    },
  };

  return (
    <div style={styles.banner }>
      <h2 style={styles.bannerHeading}>Don't Miss Out on Our Exciting Offer!</h2>
      {isLoading ? (
        <p style={styles.loadingMessage}>Loading coupon code...</p>
      ) : couponCode ? (
        <>
          <p style={styles.couponMessage}>Use coupon code</p>
          <p style={styles.couponCode}>{couponCode}</p>
          <p style={styles.discountMessage}>
            and get an amazing discount of <span style={styles.discountValue}>{data && data.length > 0 && getDiscountPercentage(data[0].discountOnCode)}</span>
          </p>
          <div style={styles.bestDealContainer}>
            <p style={styles.bestDealText}>Don't miss out on our best deal of the day!</p>
            {/* Add your best deal content here */}
          </div>
        </>
      ) : (
        <p style={styles.noOfferMessage}>No offer available at the moment. Check back later!</p>
      )}
    </div>
  );
};

export default CouponBanner;
