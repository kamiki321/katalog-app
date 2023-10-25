import React, { useEffect, useState } from 'react';
import { Grid, Select, Divider, MenuItem, TextField, Typography, CircularProgress, InputAdornment, IconButton } from '@mui/material';
import AplikasiCard from '../card/AplikasiCard';
import SearchIcon from '@mui/icons-material/Search'

const FilteringAplikasi = () => {
  const [cardData, setCardData] = useState([]);
  const [penggunaAplikasiFilter, setPenggunaAplikasiFilter] = useState('all');
  const [pemilikAplikasiFilter, setPemilikAplikasiFilter] = useState('all');
  const [jenisAplikasiFilter, setJenisAplikasiFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Define the API URL you want to fetch data from
    const apiUrl = 'https://api.mockfly.dev/mocks/4150728a-8878-4427-8725-3a92fa972967/aplikasi'; // Replace with your API URL

    // Fetch data from the API
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Set the fetched data in the state
        setCardData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  // Get unique pemilik aplikasi and jenis aplikasi values from the fetched data
  const uniquePenggunaAplikasi = [...new Set(cardData.map((card) => card.pengguna_aplikasi))];
  const uniquePemilikAplikasi = [...new Set(cardData.map((card) => card.pemilik_aplikasi))];
  const uniqueJenisAplikasi = [...new Set(cardData.map((card) => card.jenis_aplikasi))];

  // Filtering function
  const filteredCards = () => {
    return cardData.filter((card) => {
      // Ensure that the card, title, and content properties are defined before accessing them
      if (card && card.title && card.content) {
        const penggunaAplikasiMatch = penggunaAplikasiFilter === 'all' || card.pengguna_aplikasi === penggunaAplikasiFilter;
        const pemilikAplikasiMatch = pemilikAplikasiFilter === 'all' || card.pemilik_aplikasi === pemilikAplikasiFilter;
        const jenisAplikasiMatch = jenisAplikasiFilter === 'all' || card.jenis_aplikasi === jenisAplikasiFilter;
  
        const searchMatch =
          searchQuery === '' ||
          card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          card.content.toLowerCase().includes(searchQuery.toLowerCase());
        
          
        return penggunaAplikasiMatch && pemilikAplikasiMatch && jenisAplikasiMatch && searchMatch;
      } else {
        // Handle cases where card, title, or content is undefined
        return false;
      }
    });


  };



  return (
    <div>
      {/* <Divider sx={styles.divider} /> */}

      <Select
        value={penggunaAplikasiFilter}
        onChange={(e) => setPenggunaAplikasiFilter(e.target.value)}
        style={{ padding: '10px', margin: '10px' }}
      >
        <MenuItem value="all">Semua Pengguna Aplikasi</MenuItem>
        {uniquePenggunaAplikasi.map((penggunaAplikasi) => (
          <MenuItem key={penggunaAplikasi} value={penggunaAplikasi}>
            {penggunaAplikasi}
          </MenuItem>
        ))}
      </Select>

      <Select
        value={pemilikAplikasiFilter}
        onChange={(e) => setPemilikAplikasiFilter(e.target.value)}
        style={{ padding: '10px', margin: '10px' }}
      >
        <MenuItem value="all">Semua Pemilik Aplikasi</MenuItem>
        {uniquePemilikAplikasi.map((pemilikAplikasi) => (
          <MenuItem key={pemilikAplikasi} value={pemilikAplikasi}>
            {pemilikAplikasi}
          </MenuItem>
        ))}
      </Select>

      <Select
        value={jenisAplikasiFilter}
        onChange={(e) => setJenisAplikasiFilter(e.target.value)}
        style={{ padding: '10px', margin: '10px' }}
      >
        <MenuItem value="all">Semua Jenis Aplikasi</MenuItem>
        {uniqueJenisAplikasi.map((jenisAplikasi) => (
          <MenuItem key={jenisAplikasi} value={jenisAplikasi}>
            {jenisAplikasi}
          </MenuItem>
        ))}
      </Select>
        
      <TextField
        label="Search"
        variant="outlined"
        halfWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ padding: '5px', margin: '10px' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton size="small">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />


      {loading ? (
        <CircularProgress style={{ margin: '20px' }} />
        ) : (
          filteredCards().length === 0 ? (
          <Typography variant="body1" style={{ margin: '10px' }}>
            No data matching your criteria found.
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {filteredCards().map((card, index) => (
              <Grid item xs={12} sm={5} md={3} key={index}>
                <AplikasiCard imageUrl={card.imageUrl} title={card.title} content={card.content} buttonUrl={card.buttonUrl} />
              </Grid>
            ))}
          </Grid>
        )
      )}
    </div>
  );
};

export default FilteringAplikasi;

const styles = {
  divider: {
    my: 4,
  },
};
