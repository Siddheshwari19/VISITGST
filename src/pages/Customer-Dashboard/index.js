import { useWindowDimensions } from "../../utility/dimensions";
import './style.css';
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Container, Card, makeStyles, Grid, TextField } from '@material-ui/core';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, CircularProgress } from "@mui/material";
import axiosInstance from "../../utility/axios";
import EmployeeCard from "../../components/EmployeeCard";



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#000',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));



const arraySearch = (array, keyword) => {
    const searchTerm = keyword.toLowerCase()
    return array.filter(value => {
        return value.email.toLowerCase().match(new RegExp(searchTerm, 'g')) ||
            value.empcode.toLowerCase().match(new RegExp(searchTerm, 'g')) ||
            value.name.toLowerCase().match(new RegExp(searchTerm, 'g')) ||
            value.phn.toLowerCase().match(new RegExp(searchTerm, 'g')) ||
            value.status.toLowerCase().match(new RegExp(searchTerm, 'g')) ||
            value.desig.toLowerCase().match(new RegExp(searchTerm, 'g')) ||
            value.empcode.toLowerCase().match(new RegExp(searchTerm, 'g'))


    })
}


const CustomerDashboard = (props) => {



    const classes = useStyles();
    const [stockData, setStockData] = useState();
    const [stockData1, setStockData1] = useState([]);
    const [count, setCount] = useState(0);

    const handleOnChange = async (e) => {
        let value = e.target.value;
        if (stockData) {
            if (value.length >= 2) {

                let search = await arraySearch(stockData, value);
                setStockData(search)
                setCount(search.length)

            } else {
                setStockData(stockData1)
                setCount(stockData1.length)
            }
        }
    }

    useEffect(() => {
        // setLoader(true);
        axiosInstance.get('/get-emp').then((res) => {
            console.log(res.data);
            setStockData(res.data.reverse());
            setStockData1(res.data);
            setCount(res.data.length);
            setLoader(false);
        }).catch((err) => {
            console.log(err);

        })
    },
        []);
    const [clientName, setClientName] = useState();
    React.useEffect(() => {
        
        axiosInstance.get(`/get-client-byid`).then(res => {
            console.log(res.data);
            setClientName(res.data.name);
            // setUserType(res.data);
        }).catch(err => {
        });
    }, []);
    const { height, width } = useWindowDimensions();
    const [loader, setLoader] = React.useState(false);

    const navigate = useNavigate();
    return (

        <Grid className='dashboard' container alignItems='flex-start' style={{ height: 'auto', paddingTop: '1em', paddingBottom: '2%' }} justifyContent='center'>

            {loader ?
                <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center' }} >
                    <CircularProgress style={{ color: 'green', justifyContent: 'center' }} />
                </div > :

                <Grid item lg={8} md={11} sm={11} xs={11}>
                    {width <= 600 ?
                        <><br /><br /></> : <></>}


                    <Grid justifyContent={'center'} container spacing={1} >

                        <Container >
                            {loader && !clientName ? <div style={{ display: 'flex', alignItems: 'center', height: '100vh', justifyContent: 'center' }} >
                                <CircularProgress style={{ color: 'green', alignItems: 'center', justifyContent: 'center' }} />
                            </div> :
                                <>
                                    {/* <Card style={{ borderRadius: '25px' }}> */}
                                        <h2 style={{borderRadius:'25px'}} className={classes.title}>Employees</h2>


                                    {/* </Card> */}
                                    <br />
                                    <Grid container spacing={3} justifyContent="space-between" >
                                        <Grid item lg={4} style={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
                                            <h3 style={{ margin: '1em' }}>Welcome {clientName}</h3>
                                        </Grid>
                                        {/* <Grid item lg={3} style={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
                                            <h3 style={{ margin: '1em' }}>Total Employee: {count}</h3>
                                        </Grid> */}
                                        <Grid item style={{ justifyContent: 'center', display: 'flex' }} lg={4}>
                                            <TextField style={{ float: 'right', margin: '1em', width: "15em" }} color="secondary" variant="outlined" type="text" name="search" id="search" placeholder="Search Employee" onChange={handleOnChange} />

                                        </Grid>

                                    </Grid>
                                    <Grid style={{ padding: '0.5em' }} container justifyContent="space-between" >

                                        <Grid item style={{ justifyContent: 'center', display: 'flex' }} lg={4}>
                                            <Button variant='contained' onClick={() => navigate('/customer-appointment')}>Appointments</Button>
                                        </Grid>
                                        <Grid item style={{ justifyContent: 'center', display: 'flex' }} lg={4}>
                                            <Button variant='contained' onClick={() => navigate('/customer-request')}>Requests</Button>
                                        </Grid>

                                    </Grid>

                                    <br />
                                    <Grid container>
                                        {stockData ? stockData.map((value, index) => {
                                            return <EmployeeCard employee={value} />

                                        }) :
                                            <div style={{ display: 'flex', minHeight: '30vh', width: '100vh', alignItems: 'center', justifyContent: 'center' }} >
                                                <CircularProgress style={{ color: 'green', justifyContent: 'center' }} />
                                            </div >

                                        }
                                    </Grid>
                                </>
                            }
                        </Container>


                    </Grid>
                </Grid>
            }
        </Grid>

    );
}
const useStyles = makeStyles((theme) => ({
    conatiner: {
        margin: '15%'
    },
    title: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(to right bottom, #000000, #1e7ada)',
        color: '#fff',
        padding: 20
    },
    btn: {
        marginTop: 10,
        marginBottom: 20,
        background: '#FB8B24',

    }
}));

export default CustomerDashboard;