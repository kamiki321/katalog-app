import { createTheme } from '@mui/material/styles';
import { blueGrey, brown, cyan, green, grey, indigo, lightBlue } from '@mui/material/colors';

let theme = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: indigo[500],
            normal: indigo['A700']
        },
        secondary: {
            main: indigo[50],
        },
        neutral: {
            light: grey[50],
            medium: grey[200],
            normal: grey[800],
            brown: brown[800],
            main: grey[900],
        },
        green :{
            main: green[800]
        },
        blue : {
            normal: blueGrey['A200'],
            main: cyan[800],
            dark: cyan[900]
        }
    }
});


theme = createTheme(theme, {
    typography: {
        link: {
            fontSize: '0.8rem',
            [theme.breakpoints.up('md')]: {
                fontSize: '0.9rem',
            },
            fontWeight: 500,
            color: theme.palette.primary.normal,
            display: 'block',
            cursor: 'pointer'
        },
        cardTitle: {
            fontSize: '1.2rem',
            display: 'block',
            fontWeight: 500
        },
        h6: {
            fontSize: '1rem',
        },
        h7: {
            fontSize: '0.8rem', 
        },
        h8: {
            fontSize: '0.7rem', 
        }
    },
});

export default theme;
