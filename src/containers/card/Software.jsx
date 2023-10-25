import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const Software = () =>{
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="aplikasi1"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Item
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris rhoncus massa eget metus cursus dignissim. Proin posuere blandit lorem, eu vehicula libero aliquam in. Suspendisse id mi congue, tristique ipsum sed, aliquam mi. Phasellus ullamcorper pellentesque mi, non sodales ante.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default Software