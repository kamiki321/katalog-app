import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import AplikasiCard from '../card/AplikasiCard';
import Software from '../card/Software';



const AppOverviewGrid = () => {
    const [cardData, setCardData] = useState([]);

    useEffect(() => {
        // Define the API URL you want to fetch data from
        const apiUrl = 'https://api.mockfly.dev/mocks/4150728a-8878-4427-8725-3a92fa972967/aplikasi'; // Replace with your API URL

        // Fetch data from the API
        fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            // Slice the data to get the first 12 items
            const firstTwelveItems = data.slice(0, 4);
            setCardData(firstTwelveItems);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
    }, []);

  return (
    <Grid container spacing={2}>
      {cardData.map((card, index) => (
        <Grid item xs={12} sm={5} md={3} key={index}>
          <AplikasiCard 
            imageUrl={card.imageUrl}
            title={card.title}
            content={card.content}
             />
        </Grid>
      ))}
    </Grid>
  );
};




export default AppOverviewGrid;
