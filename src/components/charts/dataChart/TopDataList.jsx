import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import { Divider } from '@mui/material';

const ListData = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function TopDataList() {
  const [items, setItems] = useState([]);
  const [dense, setDense] = useState(false);

  useEffect(() => {
    // Replace 'API_URL' with your actual API endpoint
    fetch('https://api.mockfly.dev/mocks/4150728a-8878-4427-8725-3a92fa972967/all')
      .then((response) => response.json())
      .then((data) => {
        // Slice the data to get the first ten items
        const firstTenItems = data.slice(0, 10);
        setItems(firstTenItems);
      })
      .catch((error) => console.error('Error fetching data: ', error));
  }, []);

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Typography variant="h6" align="left">
        List Data (10 Pertama):
      </Typography>
      <Divider sx={styles.divider}/>
      <ListData>
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
      </ListData>
    </Box>
  );
}

/**
 * @type {import("@mui/material").SxProps}
 */

const styles = {
  divider: {
    my:2
}
}
