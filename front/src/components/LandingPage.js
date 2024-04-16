import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';
import eldraine from '../img/eldraine.jpg';
import fallout from '../img/fallout.jpg';
import lostCaverns from '../img/LostCaverns.jpg';

const LandingPage = () => {
  return (
    <div style={{ margin: '20px' }}>
      <Grid container spacing={3}> {/* Increased spacing between grid items */}
        <Grid item xs={12} md={8}>
          <Card
            sx={{
              transition: '0.3s',
              ':hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 6px 20px 0 rgba(0, 0, 0, 0.19)',
              },
              marginBottom: '20px', // Add bottom margin to prevent overlap
            }}
          >
            <CardMedia
              component="img"
              height="600"
              image={lostCaverns}
              alt="lostCaverns"
            />
            <CardContent sx={{
                backgroundColor: 'background.paper', // or specific gray color
              }}>
              <Typography gutterBottom variant="h5" component="div">
                Singles Magic: Lost Caverns of Ixalan
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Compra tus singles de Magic: The Gathering!
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              marginBottom: '20px', // Add bottom margin to prevent overlap
              transition: '0.3s',
              ':hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 6px 20px 0 rgba(0, 0, 0, 0.19)',
              },
            }}
          >
            <CardMedia
              component="img"
              height="240"
              image={eldraine}
              alt="eldraine"
            />
            <CardContent sx={{
                backgroundColor: 'background.paper', // or specific gray color
              }}>
              <Typography gutterBottom variant="h5" component="div">
                Singles Magic: Wilds of Eldraine
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Compra tus singles de Magic: The Gathering!
              </Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              transition: '0.3s',
              ':hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 6px 20px 0 rgba(0, 0, 0, 0.19)',
              },
            }}
          >
            <CardMedia
              component="img"
              height="240"
              image={fallout}
              alt="fallout"
            />
            <CardContent sx={{
                backgroundColor: 'background.paper', // or specific gray color
              }}>
              <Typography gutterBottom variant="h5" component="div">
                Singles Magic: Fallout
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Compra tus singles de Magic: The Gathering!
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default LandingPage;
