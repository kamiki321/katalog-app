import React from 'react';
import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material';




const AplikasiCard = ({ imageUrl, title, content, buttonUrl }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        alt={title}
        width='100px'
        height="200"
        image={imageUrl} 
      />
      <CardContent>
        <Typography variant="h5" display="flex" component="div">
          {title}
        </Typography>
        <Typography variant="body2">{content}</Typography>
        <Button 
        variant="contained" 
        color="primary" 
        sx={styles.button}
        component="a" // Use an anchor element
        href={buttonUrl}>
          Learn More
        </Button>
      </CardContent>
    </Card>
  );
};

/** @type {import("@mui/material").SxProps} */
const styles = {
  button: {
      padding : 2,
      margin : 2,
      marginLeft : 20,
  },
}

export default AplikasiCard;
