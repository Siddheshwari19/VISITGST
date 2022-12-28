import { ThemeProvider } from "@mui/material";
import { Checkbox, TextField, Button, CircularProgress, FormHelperText, Grid, IconButton, InputAdornment, MenuItem, OutlinedInput, Select, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './style.css';
import themeMain from '../../theme';
import { useWindowDimensions } from '../../utility/dimensions';
import MuiPhoneNumber from 'material-ui-phone-number';
import { createTheme } from '@material-ui/core/styles';
import pic from '../../assets/background.jpg';
import axiosInstance from "../../utility/axios";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate, useParams } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AppointmentForm = (props) => {

    const { width } = useWindowDimensions();
    const { employeeId } = useParams();
    //Form data
    const [employeeData, setemployeeData] = useState({
        purpose: '',
        date: ''
    })
    const theme = createTheme({
        typography: {
            fontFamily: [
                'Open Sans',

            ].join(','),
        },
    });



    //states

    const [purposeError, setPurposeError] = React.useState(false);
    const [purposeErrorText, setPurposeErrorText] = React.useState("");

    const [dateError, setDateError] = React.useState(false);
    const [dateErrorText, setDateErrorText] = React.useState("");




    const [open, setOpen] = useState(false);
    const [isError, setIsError] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const navigate = useNavigate();



    const ValidateSingleField = (data) => {
        if (data == "")
            return true;
        return false;
    }


    const validateData = () => {
        setPurposeError(ValidateSingleField(employeeData.purpose));
        ValidateSingleField(employeeData.purpose) ? setPurposeErrorText('Purpose cannot be blank') : setPurposeErrorText('');

        setDateError(ValidateSingleField(employeeData.date));
        ValidateSingleField(employeeData.date) ? setDateErrorText('Date code cannot be blank') : setDateErrorText('');




        if (
            !ValidateSingleField(employeeData.purpose)
            &&
            !ValidateSingleField(employeeData.date)
        ) {


            return true;


        }
        return false;


    }
    const [loader, setLoader] = useState(false);



    return (

        <ThemeProvider theme={theme}>
            <div style={{ position: 'relative', zIndex: '1' }}>
                <Grid container style={{ minHeight: '100vh' }}>

                    <Grid style={{
                        display: 'flex', alignItems: 'center', flexDirection: 'column', overflow: 'auto',
                        backgroundPosition: 'center center',
                        backgroundSize: 'cover', backgroundImage: `url(${pic})`
                    }} item lg={12} md={12} sm={12} xs={12}>
                        <div style={{
                            width: '100%',
                            maxWidth: '45em'
                        }}>
                            <Grid style={{ padding: width > 430 ? '3em 2.3em' : '3em 1em', minHeight: '100vh', color: '#fff' }} container direction='column' >
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', textAlign: 'center' }}>
                                    <Typography className='text' variant='h4' >Book Appointment</Typography>
                                    <br />

                                </div>


                                <br />
                                <form onSubmit={e => e.preventDefault()}>
                                    <Grid container direction='row' spacing={2}>
                                        <Grid spacing={2} container item lg={12} md={12} sm={12} xs={12} direction='row'>

                                            <Grid container direction='column' item lg={6} md={12} sm={12} xs={12}>
                                                <span className='label'>Purpose</span>
                                                <TextField className='inputField' type="text"
                                                    placeholder='Purpose of appointment' variant='outlined'
                                                    error={purposeError}
                                                    multiline
                                                    maxRows={3}
                                                    value={employeeData.purpose}
                                                    onChange={(event) => {
                                                        setPurposeError(false);
                                                        setPurposeErrorText('');
                                                        setemployeeData({ ...employeeData, purpose: event.target.value })
                                                    }}

                                                />
                                                <FormHelperText style={{ color: 'red' }}>{purposeErrorText}</FormHelperText>
                                            </Grid>
                                            <Grid container item lg={6} md={12} s={12} xs={12} direction='column'>
                                                <span className='label'>Date of appointment</span>
                                                <TextField
                                                    className='inputField'
                                                    placeholder='dd/mm/yyyy'
                                                    variant='outlined'
                                                    type='datetime-local'
                                                    error={dateError}
                                                    value={employeeData.date}
                                                    onChange={(event) => {

                                                        setDateError(false);
                                                        setDateErrorText('');
                                                        setemployeeData({ ...employeeData, date: event.target.value })
                                                    }}

                                                />
                                                <FormHelperText style={{ color: 'red' }}>{dateErrorText}</FormHelperText>

                                            </Grid>

                                            <Grid container item lg={12} md={12} s={12} xs={12} direction='column'>
                                                {loader ? <div style={{ display: 'flex', justifyContent: 'center' }} >
                                                    <CircularProgress style={{ color: 'green', justifyContent: 'center' }} />
                                                </div> : <div style={{ display: 'flex', justifyContent: 'center' }} > <Button type='submit' style={{ fontSize: '20px', color: themeMain.palette.primary.main, background: themeMain.palette.primary.light, fontWeight: '600', padding: '8px 60px' }} className='demoSubmitButton'
                                                    variant="contained"
                                                    onClick={() => {
                                                        if (validateData()) {
                                                            console.log(employeeData);
                                                            console.log(employeeId);
                                                            const dataTmp = {
                                                                purpose: employeeData.purpose,
                                                                empid: employeeId,
                                                                status: 'pending',
                                                                dateofapt: employeeData.date
                                                            };
                                                            setLoader(true);

                                                            axiosInstance.post('/book-appointment', dataTmp).then((res) => {
                                                                console.log(res.data);
                                                                if (res.data.message != undefined) {
                                                                    setSnackbarMessage(res.data.message);
                                                                    setOpen(true);
                                                                    setLoader(false);
                                                                    setIsError(false);
                                                                    navigate('/customer-dashboard');

                                                                }
                                                                else {
                                                                    setSnackbarMessage(res.data.error);
                                                                    setOpen(true);
                                                                    setLoader(false);
                                                                    setIsError(true);
                                                                }

                                                            }).catch((err) => {
                                                                ////console.log(err.response.data.message);

                                                                setLoader(false);
                                                                // setSnackbarMessage(err.response.data.message);
                                                                // setOpen(true);


                                                            });


                                                        }



                                                    }
                                                    }
                                                >Submit</Button></div>}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </form>

                            </Grid>
                        </div>
                    </Grid>

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
            </div>

        </ThemeProvider>
    );
}


export default AppointmentForm;