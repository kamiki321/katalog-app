import { Box, Card, CardContent, Typography, Divider, Link } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import FolderIcon from '@mui/icons-material/Folder';
import React,{ useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";



function TopFiveData() {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [dense, setDense] = useState(false);
  
    useEffect(() => {
    const token = sessionStorage.getItem('token');
      // Replace 'API_URL' with your actual API endpoint
      if (token) {
          fetch('http://localhost:3333/api/v1/katalog/data',{
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
          })
            .then((response) => response.json())
            .then((data) => {
              // Slice the data to get the first five items
              const firstFiveItems = data.slice(0, 5);
              setItems(firstFiveItems);
            })
            .catch((error) => console.error('Error fetching data: ', error));

      } else {

      }
    }, []);

    return (<Card sx={styles.realtimeStatsCard}>
        <CardContent>
            <Box>
                <Typography variant="cardTitle">5 List Data :</Typography>
                <Divider sx={styles.divider} />
                <List dense={dense}>
                {items.map((item) => (
                    <ListItem key={item.id}>
                    <ListItemAvatar>
                        <Avatar>
                        <FolderIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={item.nama_dataset} />
                    </ListItem>
                ))}
                </List>
                <Divider sx={styles.divider} />
                <Link
                component="button"
                variant="body1"
                onClick={() => {
                    navigate('/katalog/data');
                }}
                >
                See more...
                </Link>
            </Box>
        </CardContent>


    </Card>);
}

export default TopFiveData;


/**
 * @type {import("@mui/material").SxProps}
 */

 const styles = {
    realtimeStatsCard: {
        mb: 2
    },
    updateLiveRow: {
        display: 'flex',
        alignItems: 'center'
    },
    dotIcon: {
        width: 10,
        color: 'primary.normal',
        mr: 1
    },
    divider: {
        my: 2
    },
    valueText: {
        fontSize: '1.3rem',
        fontWeight: '400'
    }, 
    realtimeChart: {
        height: 70,
        mt: 4
    }
}