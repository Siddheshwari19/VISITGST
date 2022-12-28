import { createTheme } from "@mui/material";

// A custom theme for this app
const theme = createTheme({
    typography: {
        fontFamily: [
            'Open Sans',

        ].join(','),
    },
    palette: {
        primary: {
            main: "#002E6C",
            light: "#9FDAE7",
            display:'#F6CA5F',
            numColor:'#08368b'
        },
        secondary: {
            main: "#19857b",
        }
    },
});

export default theme;