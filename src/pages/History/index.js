import { CircularProgress, Grid, TextField } from "@mui/material";
import React from "react";
import { useWindowDimensions } from "../../utility/dimensions";
import './style.css';
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axiosInstance from "../../utility/axios";
import { sortAppointment } from "../../utility/sortAppointment";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
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
        return value.client_name.toLowerCase().match(new RegExp(searchTerm, 'g')) ||
            value.client_phn.toLowerCase().match(new RegExp(searchTerm, 'g')) ||
            value.emp_code.toLowerCase().match(new RegExp(searchTerm, 'g')) ||
            value.date.toLowerCase().match(new RegExp(searchTerm, 'g')) ||
            value.purpose.toLowerCase().match(new RegExp(searchTerm, 'g'))||
            value.type.toLowerCase().match(new RegExp(searchTerm, 'g'))||
            value.status.toLowerCase().match(new RegExp(searchTerm, 'g'))||
            value.emp_name.toLowerCase().match(new RegExp(searchTerm, 'g'))




    })
}
const History = (props) => {

    const { height, width } = useWindowDimensions();
    const [loader, setLoader] = React.useState(false);

    const navigate = useNavigate();
    const [appointments, setAppointments] = React.useState([]);
    const [updateAll, setUpdateAll] = React.useState(0);
    const [stockData1, setStockData1] = React.useState([]);
    const handleOnChange = async (e) => {
        let value = e.target.value;
        if (appointments) {
            if (value.length >= 2) {

                let search = await arraySearch(appointments, value);
                setAppointments(search)

            } else {
                setAppointments(stockData1)
            }
        }
    }

    React.useEffect(() => {
        setLoader(true);
        axiosInstance.get(`/history-apt`).then(res => {
            let tmp = [];
            res.data.map(r => {
                if (r.status !== 'pending')
                        tmp.push({ ...r, type: 'appointment' });
            })
            axiosInstance.get(`/history-request`).then(res => {
                res.data.map(r => {
                    if (r.status !== 'pending')
                        tmp.push({ ...r, type: 'request' });
                })
                setLoader(false);
                console.log(tmp);
                setAppointments(tmp);
                setStockData1(tmp);
            }).catch(err => {
                setLoader(false);
                console.log(err);
            });


        }).catch(err => {
            console.log(err);
        });
    }, [updateAll]);
    return (

        <Grid className='dashboard' container alignItems='flex-start' style={{ height: 'auto', paddingTop: '1em', paddingBottom: '2%' }} justifyContent='center'>

            {loader ?
                <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center' }} >
                    <CircularProgress style={{ color: 'green', justifyContent: 'center' }} />
                </div > :

                <Grid item style={{ marginLeft: width > 1079 ? width > 1250 ? '27%' : '38%' : '0px' }} lg={8} md={11} sm={11} xs={11}>
                    {width <= 600 ?
                        <><br /><br /></> : <></>}


                    <Grid container  >
                        <Grid container justifyContent={'space-between'}>
                            <h2>History</h2>
                            <TextField style={{ float: 'left', margin: '1em', width: "16em" }} color="secondary" variant="outlined" type="text" name="search" id="search" onChange={handleOnChange} placeholder="Search appointment/requests" />

                        </Grid>
                        <Grid container >
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell>Id</StyledTableCell>
                                            <StyledTableCell align="left">Type</StyledTableCell>
                                            <StyledTableCell align="left">Employee name</StyledTableCell>
                                            <StyledTableCell align="left">Employee code</StyledTableCell>
                                            <StyledTableCell align="left">Customer name</StyledTableCell>
                                            <StyledTableCell align="left">Customer contact</StyledTableCell>

                                            <StyledTableCell align="left">Purpose</StyledTableCell>
                                            <StyledTableCell align="left">Date</StyledTableCell>
                                            <StyledTableCell align="left">Status</StyledTableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {appointments.map((row, idx) => (
                                            <StyledTableRow key={row.name}>
                                                <StyledTableCell component="th" scope="row">
                                                    {idx + 1}
                                                </StyledTableCell>
                                                <StyledTableCell align="left">{row.type}</StyledTableCell>
                                                <StyledTableCell align="left">{row.emp_name}</StyledTableCell>
                                                <StyledTableCell align="left">{row.emp_code}</StyledTableCell>
                                                <StyledTableCell align="left">{row.client_name}</StyledTableCell>
                                                <StyledTableCell align="left">{row.client_phn}</StyledTableCell>

                                                <StyledTableCell align="left">{row.purpose}</StyledTableCell>
                                                <StyledTableCell align="left">{row.date}</StyledTableCell>
                                                <StyledTableCell align="left">{row.status}</StyledTableCell>

                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>

                    </Grid>
                </Grid>
            }
        </Grid>

    );
}
export default History;