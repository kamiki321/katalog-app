import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography } from '@mui/material';


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }


function TenAplikasiOverview({ }) {
    const [rows, setRows] = useState([]); // State to store the data

    useEffect(() => {
        const token = sessionStorage.getItem('token');

        if (token) {
            fetch('http://localhost:3333/api/v1/katalog/aplikasi', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            }) // Replace with your API endpoint
                .then((response) => response.json())
                .then((data) => {
                  // Shuffle the data randomly
                  const shuffledData = shuffleArray(data);
                  // Limit the data to the first 10 items from the shuffled data
                  const firstTenItems = shuffledData.slice(0, 10);
                  // Update the rows state with the fetched and shuffled data
                  setRows(firstTenItems);
                })
                .catch((error) => console.error('Error fetching data: ', error));

        } else {

        }
        // Fetch data from your API
    }, []);

    return (
        <Box sx={styles.container}>
            {/* <Typography variant="h5">
                Aplikasi Overview
            </Typography> */}
            {/* <br></br> */}
            <TableContainer sx={styles.tableContainer} component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <h3>APLIKASI</h3>
                            </TableCell>
                            <TableCell align="right">
                                <h3>Pengguna Aplikasi</h3>
                            </TableCell>
                            <TableCell align="right">
                                <h3>Pemilik Aplikasi</h3>
                            </TableCell>
                            <TableCell align="right">
                                <h3>KATEGORI</h3>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" sx={styles.contentCell}>
                                    {row.title}
                                </TableCell>
                                <TableCell align="right">{row.pengguna_aplikasi}</TableCell>
                                <TableCell align="right">{row.pemilik_aplikasi}</TableCell>
                                <TableCell align="right">{row.jenis_aplikasi}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default TenAplikasiOverview;

const styles = {
    container: {
        mt: 4,
        width: '100%',
        textAlign: 'center'
    },
    tableContainer: {
        mt: 8
    },
    contentCell: {
        display: 'flex',
        alignItems: 'center'
    },
}
