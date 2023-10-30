import React, { useEffect, useState } from 'react';
import { Grid, Select, Divider, MenuItem, TextField, Typography, CircularProgress, InputAdornment, IconButton, Button } from '@mui/material';
import AplikasiCard from '../card/AplikasiCard';
import SearchIcon from '@mui/icons-material/Search'

const FilteringAplikasi = () => {
  const [cardData, setCardData] = useState([]);
  const [penggunaAplikasiFilter, setPenggunaAplikasiFilter] = useState('all');
  const [pemilikAplikasiFilter, setPemilikAplikasiFilter] = useState('all');
  const [jenisAplikasiFilter, setJenisAplikasiFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 12
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
  
  const paginateCards = () => {
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    return filteredCards().slice(indexOfFirstCard, indexOfLastCard);
  };
  
  
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

  const getPageData = (page) => {
    const startIndex = (page - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    return combinedData.slice(startIndex, endIndex);
  };

  const combinedData = filteredCards(); // Menggunakan hasil filter
  const totalPages = Math.ceil(combinedData.length / cardsPerPage);

  const pageButtons = Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
    <Button
    key={page}
    variant="contained"
    sx={page === currentPage ? styles.currentButton : styles.button}
    onClick={() => setCurrentPage(page)}
    >
      {page}
    </Button>
  ));
  
  const previousButton = (
    <Button
      variant="contained"
      sx={styles.prev}
      onClick={() => setCurrentPage(currentPage - 1)}
      disabled={currentPage === 1}
    >
      Previous
    </Button>
  );
  
  const nextButton = (
    <Button
      variant="contained"
      sx={styles.next}
      onClick={() => setCurrentPage(currentPage + 1)}
      disabled={currentPage === totalPages}
    >
      Next
    </Button>
  );
  


  return (
    <div>
      <Divider sx={styles.divider} />

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
    <Divider sx={styles.divider}/>
      {loading ? (
        <CircularProgress style={{ margin: '20px' }} />
      ) : (
        combinedData.length === 0 ? (
          <Typography variant="body1" style={{ margin: '10px' }}>
            No data matching your criteria found.
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {getPageData(currentPage).map((card, index) => (
              <Grid item xs={12} sm={5} md={3} key={index}>
                <AplikasiCard imageUrl={card.imageUrl} title={card.title} pengguna_aplikasi={card.pengguna_aplikasi} content={card.content} buttonUrl={card.buttonUrl} />
              </Grid>
            ))}
          </Grid>
        )
        )}
    <Divider sx={styles.divider}/>
    {/* {loading ? (
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
    )} */}
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
      {previousButton}
      {pageButtons}
      {nextButton}
    </div>


    </div>
  );
};

export default FilteringAplikasi;


/**
 * @type {import("@mui/material").SxProps}
 */

const styles = {
  divider: {
    my: 4,
  },
  button: {
    backgroundColor: (theme) => theme.palette.neutral.brown,
    color: 'white',
    border: '1px solid',
    borderColor: 'lightgray',
    borderRadius: 1.5,
    padding: '4px 8px',
    margin: '1px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'white',
      color: (theme) => theme.palette.primary.main,
    },
  },
  next: {
    backgroundColor: (theme) => theme.palette.neutral.normal,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'white',
      color: (theme) => theme.palette.primary.main,
    },
  },
  prev: {
    backgroundColor: (theme) => theme.palette.neutral.normal,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'white',
      color: (theme) => theme.palette.primary.main,
    },
  },
  currentButton: {
    // Style for the current page button
    backgroundColor: 'lightgray',
    color: 'black',
    border: '1px solid',
    borderColor: 'darkgray',
    borderRadius: 2,
    padding: '4px 8px',
    margin: '1px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'darkgray',
      color: 'white',
    },
  }
};
