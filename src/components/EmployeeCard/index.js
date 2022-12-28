import { Button, Grid } from "@mui/material";
import React, { useState } from "react";
import './style.css';
import { ImCheckmark, ImCross } from 'react-icons/im';
import { Phone } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const EmployeeCard = (props) => {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [isError, setIsError] = useState(false);

    return (
        <Grid className='cardParent' container item lg={4} md={4} sm={6} xs={12} >

            <Grid className='card' container direction='column'>


                <h3 style={{ margin: '0' }} class="mb-0 mt-0">{props.employee.name}</h3>
                <Grid container justifyContent={'flex-end'}>
                    <span>~{props.employee.desig}</span>

                </Grid>
                <br />
                {/* <br />
                <Grid container alignItems='center'>
                    <Phone /><span style={{ fontWeight: '500', fontSize: 'medium', padding: '0.5em 0' }}>&nbsp; {props.employee.phn}</span><br />
                </Grid> */}
                <Grid container justifyContent={'space-between'} direction='row'>
                    <Grid item lg={6} md={6} sm={6} xs={6} justifyContent={'center'} alignItems='center' container direction={'column'}>

                        <span class="articles">Employee code</span>
                        <span class="number1">{props.employee.empcode}</span>

                    </Grid>

                    <Grid item lg={6} md={6} sm={6} xs={6} container justifyContent={'center'} alignItems='center' direction={'column'}>

                        <span class="followers">Availability</span>
                        <span class="number2">{props.employee.status == "available" ? <ImCheckmark color="green" size={'20'} /> : <ImCross color="red" size={'20'} />}</span>

                    </Grid>



                </Grid>

                <br />
                <Grid container justifyContent={'space-between'} direction='row'>
                    <Button style={{ opacity: props.employee.status == "available" ? '1' : '0.5', cursor: props.employee.status == "available" ? 'pointer' : 'not-allowed' }} variant='contained' size='small' onClick={() => {
                        if (props.employee.status == "available")
                            navigate(`/request-form/${props.employee._id}`);
                        else {
                            setIsError(true);
                            setSnackbarMessage("Employee is not available");
                            setOpen(true);
                        }
                    }} >Request</Button>
                    <Button variant='contained' size='small' onClick={() => {
                        navigate(`/appointment-form/${props.employee._id}`);

                    }}>Appointment</Button>
                </Grid>

                <Snackbar open={open} autoHideDuration={2000} onClose={() => {
                    setOpen(false);
                }}>
                    <Alert onClose={() => {
                        setOpen(false);
                    }} severity={isError ? "error" : "success"} sx={{ width: '100%' }}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Grid>
        </Grid>

    );
}
export default EmployeeCard;