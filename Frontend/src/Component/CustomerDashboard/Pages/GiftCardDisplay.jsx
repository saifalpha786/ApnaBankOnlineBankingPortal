import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';

import giftCard1 from './../../../Images/flipkart (6).jpeg';
import giftCard2 from './../../../Images/flipkart (1).jpeg';
import giftCard3 from './../../../Images/zomato.jpeg';
import giftCard4 from './../../../Images/swiggy.jpeg';


const GiftCards = () => {
  const cards = [
    {
      id: 1,
      image: giftCard1,
      title: 'Amazon GiftCard ',

    },
    {
      id: 2,
      image: giftCard2,
      title: 'FlipKart GiftCard',
     
    },
    {
      id: 3,
      image: giftCard3,
      title:  'Zomato GiftCard',
     
    },
    {
      id: 4,
      image: giftCard4,
      title: 'Swiggy GiftCard',
    
    },
  ];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={2}>
          {cards.slice(0, 2).map((card) => (
            <Grid item xs={12} sm={6} key={card.id}>
              <Card sx={{ width: 250, height: 230 }}>
                <CardMedia
                  component="img"
                  sx={{ height: 180 }}
                  image={card.image}
                  alt={card.title}
                />
                <CardContent style={{background:'whitesmoke'}}>
                  <Typography variant="h6" component="div" sx={{ mb: 1 }}>
                    {card.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={2} style={{marginTop:'50px'}}>
          {cards.slice(2).map((card) => (
            <Grid item xs={12} sm={6} key={card.id}>
              <Card sx={{ width: 250, height: 230 }}>
                <CardMedia
                  component="img"
                  sx={{ height: 180 }}
                  image={card.image}
                  alt={card.title}
                />
                <CardContent style={{background:'whitesmoke'}}>
                  <Typography variant="h6" component="div" sx={{ mb: 1 }}>
                    {card.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default GiftCards;
