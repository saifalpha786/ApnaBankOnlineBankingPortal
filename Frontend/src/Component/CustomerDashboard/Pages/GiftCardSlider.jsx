import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Card, CardContent, Typography, Button, Slide } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import entertainment1 from '../../../Images/flipkart (1).jpeg';
import entertainment2 from '../../../Images/myntra.jpeg';
import food1 from '../../../Images/zomato.jpeg';
import food2 from '../../../Images/swiggy.jpeg';
import shopping1 from '../../../Images/flipkart (1).jpeg';
import shopping2 from '../../../Images/amazon.jpeg';

const theme = createTheme();

const useStyles = makeStyles(() => ({
  slidingContainer: {
    maxWidth: 1200,
    margin: '0 auto',
    paddingTop: 20,
  },
  slider: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: '#f2f2f2',
    padding: 20,
    borderRadius: 20,
    overflowX: 'scroll', // Enable horizontal scrolling
    scrollBehavior: 'smooth', // Enable smooth scrolling
    '&::-webkit-scrollbar': {
      display: 'none', // Hide scrollbar
    },
  },
  card: {
    width: 400,
    backgroundColor: '#fff',
    borderRadius: 20,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    marginRight: 20, // Add margin between cards
  },
  cardImage: {
    width: '100%',
    height: 220,
    objectFit: 'cover',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardContent: {
    padding: '16px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    margin: '0 8px',
    backgroundColor: 'transparent',
    color: '#861f41',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: 50,
    padding: '8px 16px',
    transition: 'background-color 0.3s ease-in-out',
    cursor: 'pointer',
    outline: 'none',
    '&:hover': {
      backgroundColor: '#861f41',
      color: '#fff',
    },
  },
  buttonActive: {
    backgroundColor: '#861f41',
    color: '#fff',
  },
  buttonIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '33.33%',
    height: 3,
    backgroundColor: '#861f41',
    transition: 'transform 0.6s ease-in-out',
    borderRadius: '0 0 8px 8px',
  },
}));

const SlidingComponent = () => {
  const classes = useStyles();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const cardContainerRef = useRef(null);

  useEffect(() => {
    const cardContainer = cardContainerRef.current;

    const handleScroll = () => {
      const scrollPosition = cardContainer.scrollLeft;
      const categoryWidth = cardContainer.offsetWidth / 3;

      if (scrollPosition < categoryWidth) {
        setSelectedCategory('entertainment');
      } else if (scrollPosition < categoryWidth * 2) {
        setSelectedCategory('food');
      } else {
        setSelectedCategory('shopping');
      }
    };

    cardContainer.addEventListener('scroll', handleScroll);
    return () => {
      cardContainer.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    const cardContainer = cardContainerRef.current;

    switch (category) {
      case 'entertainment':
        cardContainer.scrollLeft = 0;
        break;
      case 'food':
        cardContainer.scrollLeft = cardContainer.offsetWidth;
        break;
      case 'shopping':
        cardContainer.scrollLeft = cardContainer.offsetWidth * 2;
        break;
      default:
        break;
    }
  };

  const renderCategoryCards = (category) => {
    const entertainmentImages = [entertainment1, entertainment2];
    const foodImages = [food1, food2];
    const shoppingImages = [shopping1, shopping2];

    const categoryImages =
      category === 'entertainment'
        ? entertainmentImages
        : category === 'food'
        ? foodImages
        : category === 'shopping'
        ? shoppingImages
        : [];

    return categoryImages.map((image, index) => (
      <Slide
        key={index}
        direction={selectedCategory === category ? "left" : "right"} // Slide the cards in the selected category to the left, others to the right
        in={selectedCategory === category}
        mountOnEnter
        unmountOnExit
      >
        <Card className={classes.card}>
          <img
            src={image}
            alt={`${category} Image ${index + 1}`}
            className={classes.cardImage}
          />
          <CardContent className={classes.cardContent}>
            <Typography variant="h6">{`${category} Card ${index + 1}`}</Typography>
            <Typography variant="body2">
              {`Description of ${category} option ${index + 1}`}
            </Typography>
          </CardContent>
        </Card>
      </Slide>
    ));
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.slidingContainer}>
        <div className={classes.slider}>
          <div className={classes.buttonContainer}>
            <button
              className={`${classes.button} ${
                selectedCategory === 'entertainment' ? classes.buttonActive : ''
              }`}
              onClick={() => handleCategoryClick('entertainment')}
            >
              Entertainment
            </button>
            <button
              className={`${classes.button} ${
                selectedCategory === 'food' ? classes.buttonActive : ''
              }`}
              onClick={() => handleCategoryClick('food')}
            >
              Food
            </button>
            <button
              className={`${classes.button} ${
                selectedCategory === 'shopping' ? classes.buttonActive : ''
              }`}
              onClick={() => handleCategoryClick('shopping')}
            >
              Shopping
            </button>
            <div
              className={classes.buttonIndicator}
              style={{
                transform: `translateX(${
                  selectedCategory === 'entertainment'
                    ? '0%'
                    : selectedCategory === 'food'
                    ? '33.33%'
                    : '66.66%'
                })`,
              }}
            ></div>
          </div>
          <div className={classes.cardContainer} ref={cardContainerRef}>
            {renderCategoryCards('entertainment')}
            {renderCategoryCards('food')}
            {renderCategoryCards('shopping')}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default SlidingComponent;
