import { ThemeProvider } from "@mui/material";
import { Checkbox, TextField, Button, CircularProgress, FormHelperText, Grid, IconButton, InputAdornment, MenuItem, OutlinedInput, Select, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './style.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import themeMain from '../../theme';
import { useWindowDimensions } from '../../utility/dimensions';
import MuiPhoneNumber from 'material-ui-phone-number';
import FormControl from '@mui/material/FormControl';
import { createTheme } from '@material-ui/core/styles';
import pic from '../../assets/background.jpg';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utility/axios";
import OTPInput from "otp-input-react";
import Slide from "react-reveal/Slide";
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const CustomerRegister = (props) => {

    const { width } = useWindowDimensions();

    //Form data
    const [employeeData, setemployeeData] = useState({
        firstName: '',
        email: '',
        password: '',
        contact: '',
    })
    const theme = createTheme({
        typography: {
            fontFamily: [
                'Open Sans',

            ].join(','),
        },
    });


    //states

    const [firstNameError, setFirstNameError] = React.useState(false);
    const [firstNameErrorText, setFirstNameErrorText] = React.useState("");


    const [emailError, setemailError] = React.useState(false);
    const [emailErrorText, setemailErrorText] = React.useState("");


    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordErrorText, setPasswordErrorText] = React.useState("");

    const [confirmPasswordError, setConfirmPasswordError] = React.useState(false);
    const [confirmPasswordErrorText, setConfirmPasswordErrorText] = React.useState("");

    const [contactError, setContactError] = React.useState(false);
    const [contactErrorText, setContactErrorText] = React.useState("");



    //password visibility
    const [values1, setValues1] = React.useState({
        password: '',
        showPassword: false,
    });
    const [values2, setValues2] = React.useState({
        password: '',
        showPassword: false,
    });

    //Handle Password
    const handleChange1 = (prop) => (event) => {
        setPasswordError(false);
        setPasswordErrorText('');
        setValues1({ ...values1, [prop]: event.target.value });
        setemployeeData({ ...employeeData, [prop]: event.target.value });
    };

    const handleClickShowPassword1 = () => {
        setValues1({ ...values1, showPassword: !values1.showPassword });
    };

    const handleChange2 = (prop) => (event) => {
        setConfirmPasswordError(false);
        setConfirmPasswordErrorText('');
        setValues2({ ...values2, [prop]: event.target.value });
    };
    const handleClickShowPassword2 = () => {
        setValues2({ ...values2, showPassword: !values2.showPassword });
    };


    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const ValidateSingleField = (data) => {
        if (data == "")
            return true;
        return false;

    }


    const validateData = () => {
        setFirstNameError(ValidateSingleField(employeeData.firstName));
        ValidateSingleField(employeeData.firstName) ? setFirstNameErrorText('First Name cannot be blank') : setFirstNameErrorText('');



        setemailError(ValidateSingleField(employeeData.email));
        ValidateSingleField(employeeData.email) ? setemailErrorText('Username cannot be blank') : setemailErrorText('');


        setContactError(ValidateSingleField(employeeData.contact));
        ValidateSingleField(employeeData.contact) ? setContactErrorText('Contact cannot be blank') : setContactErrorText('');

        setPasswordError(ValidateSingleField(values1.password));
        ValidateSingleField(values1.password) ? setPasswordErrorText('Password cannot be blank') : setPasswordErrorText('');

        setConfirmPasswordError(ValidateSingleField(values2.password));
        ValidateSingleField(values2.password) ? setConfirmPasswordErrorText('Confirm Password cannot be blank') : setConfirmPasswordErrorText('');

        if (values1.password !== values2.password) {
            setConfirmPasswordError(true);
            setConfirmPasswordErrorText('Password doesn\'t match');
        }




        if ((values1.password == values2.password) &&
            !ValidateSingleField(employeeData.firstName) &&
            !ValidateSingleField(employeeData.email) &&
            !ValidateSingleField(values1.password) &&
            !ValidateSingleField(values2.password) &&
            !ValidateSingleField(employeeData.contact)
        ) {


            return true;


        }
        return false;


    }

    const [sendOtp, setSendOtp] = useState(false);
    const [verifyOtp, setVerifyOtp] = useState(false);
    const [otp, setOtp] = useState('');
    const [otpError, setOtpError] = useState(false);
    const [otpErrorText, setOtpErrorText] = useState('');
    const [loader, setLoader] = useState(false);
    const [open, setOpen] = useState(false);
    const [isError, setIsError] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const navigate = useNavigate();

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
                                    <Typography className='text' variant='h4' >Customer Registration</Typography>
                                    <br />

                                </div>


                                <br />
                                {!sendOtp ? <form onSubmit={e => e.preventDefault()}>
                                    <Grid container direction='row' spacing={2}>
                                        <Grid spacing={2} container item lg={12} md={12} sm={12} xs={12} direction='row'>

                                            <Grid container direction='column' item lg={6} md={12} sm={12} xs={12}>
                                                <span className='label'>Full name</span>
                                                <TextField className='inputField' type="text"
                                                    placeholder='example1' variant='outlined'
                                                    error={firstNameError}
                                                    value={employeeData.firstName}
                                                    onChange={(event) => {
                                                        setFirstNameError(false);
                                                        setFirstNameErrorText('');
                                                        setemployeeData({ ...employeeData, firstName: event.target.value })
                                                    }}

                                                />
                                                <FormHelperText style={{ color: 'red' }}>{firstNameErrorText}</FormHelperText>
                                            </Grid>



                                            <Grid container item lg={6} md={12} s={12} xs={12} direction='column'>
                                                <span className='label'>Username</span>
                                                <TextField
                                                    className='inputField'
                                                    placeholder='example1'
                                                    variant='outlined'
                                                    type='text'

                                                    error={emailError}
                                                    value={employeeData.email}

                                                    onChange={(event) => {
                                                        setemailError(false);
                                                        setemailErrorText('');
                                                        setemployeeData({ ...employeeData, email: event.target.value })
                                                    }}

                                                />
                                                <FormHelperText style={{ color: 'red' }}>{emailErrorText}</FormHelperText>

                                            </Grid>
                                            <Grid container item lg={6} md={12} s={12} xs={12} direction='column'>
                                                <span className='label'>Password</span>
                                                <OutlinedInput
                                                    className='inputField'
                                                    placeholder='6 characters, 1 capital letter'
                                                    variant='outlined'
                                                    error={passwordError}
                                                    type={values1.showPassword ? 'text' : 'password'}
                                                    value={values1.password}
                                                    onChange={handleChange1('password')}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton tabIndex='-1'
                                                                aria-label="toggle password visibility"
                                                                onClick={handleClickShowPassword1}
                                                                onMouseDown={handleMouseDownPassword}
                                                            >
                                                                {values1.showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                />
                                                <FormHelperText style={{ color: 'red' }}>{passwordErrorText}</FormHelperText>
                                            </Grid>
                                            <Grid container item lg={6} md={12} s={12} xs={12} direction='column'>
                                                <span className='label'>Confirm Password</span>
                                                <OutlinedInput
                                                    className='inputField'
                                                    placeholder='6 characters, 1 capital letter'
                                                    variant='outlined'
                                                    error={confirmPasswordError}
                                                    type={values2.showPassword ? 'text' : 'password'}
                                                    value={values2.password}
                                                    onChange={handleChange2('password')}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton tabIndex='-1'
                                                                aria-label="toggle password visibility"
                                                                onClick={handleClickShowPassword2}
                                                                onMouseDown={handleMouseDownPassword}
                                                            >
                                                                {values2.showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                />
                                                <FormHelperText style={{ color: 'red' }}>{confirmPasswordErrorText}</FormHelperText>
                                            </Grid>

                                            <Grid container item lg={6} md={12} s={12} xs={12} direction='column'>
                                                <span className='label'>Contact</span>
                                                <MuiPhoneNumber
                                                    defaultCountry={'in'}
                                                    className='inputField'
                                                    placeholder='9876543210'
                                                    variant='outlined'
                                                    error={contactError}
                                                    value={employeeData.contact}
                                                    onChange={(event) => {
                                                        setContactError(false);
                                                        setContactErrorText('');
                                                        setemployeeData({ ...employeeData, contact: event })
                                                    }}

                                                />
                                                <FormHelperText style={{ color: 'red' }}>{contactErrorText}</FormHelperText>

                                            </Grid>

                                            <Grid container item lg={12} md={12} s={12} xs={12} direction='column'>
                                                {loader ? <div style={{ display: 'flex', justifyContent: 'center' }} >
                                                    <CircularProgress style={{ color: 'green', justifyContent: 'center' }} />
                                                </div> : <div style={{ display: 'flex', justifyContent: 'center' }} > <Button type='submit' style={{ fontSize: '20px', color: themeMain.palette.primary.main, background: themeMain.palette.primary.light, fontWeight: '600', padding: '8px 60px' }} className='demoSubmitButton'
                                                    variant="contained"
                                                    onClick={() => {
                                                        if (validateData()) {
                                                            setSnackbarMessage('Otp sent successfully');
                                                            setSendOtp(true);
                                                            axiosInstance.post('/send-otp', { phn: employeeData.contact }).then(res => {
                                                                console.log(res.data);
                                                            }).catch(err => {
                                                                console.log(err);
                                                            });
                                                        }



                                                    }
                                                    }
                                                >Submit</Button></div>}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </form> :
                                    <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={e => e.preventDefault()}>

                                        <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                            <Slide top>
                                                <span style={{ paddingTop: '10px' }}>An OTP is sent on your phone . </span>

                                                <span style={{ fontSize: '27px', fontWeight: '600' }} >Please enter 6 digit OTP</span>
                                                <br />
                                                <OTPInput
                                                    value={otp}
                                                    onChange={setOtp}
                                                    autoFocus
                                                    OTPLength={6}
                                                    otpType="number"
                                                    disabled={false}
                                                    secure />
                                                <br />
                                                <br />
                                                <FormHelperText style={{ color: 'red' }}>{otpErrorText}</FormHelperText>

                                                <br />
                                                {loader ? <div style={{ display: 'flex', justifyContent: 'center' }} >
                                                    <CircularProgress style={{ color: 'green', justifyContent: 'center' }} />
                                                </div> : <div style={{ display: 'flex', justifyContent: 'center' }} > <Button type='submit' style={{ fontSize: '20px', color: themeMain.palette.primary.main, background: themeMain.palette.primary.light, fontWeight: '600', padding: '8px 60px' }} className='demoSubmitButton'
                                                    variant="contained"
                                                    onClick={() => {
                                                        if (otp.length == 6) {
                                                            setOtpErrorText('');
                                                            setLoader(true);
                                                            axiosInstance.post('/check-otp', { otp: otp, phn: employeeData.contact }).then((res) => {
                                                                if (res.data == 'approved') {
                                                                    setIsError(false);
                                                                    setSnackbarMessage('OTP verified');
                                                                    const dataTmp = {
                                                                        name: employeeData.firstName,
                                                                        email: employeeData.email,
                                                                        password: employeeData.password,
                                                                        phn: employeeData.contact
                                                                    };
                                                                    setLoader(true);

                                                                    axiosInstance.post('/register-client', dataTmp).then((res) => {
                                                                        if (res.data.message != undefined) {
                                                                            setSnackbarMessage(res.data.message);
                                                                            setOpen(true);
                                                                            setLoader(false);
                                                                            setIsError(false);
                                                                            navigate('/customer-login');
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
                                                                else {
                                                                    setIsError(true);
                                                                    setSnackbarMessage('Incorrect otp');
                                                                }
                                                                setLoader(false);
                                                                setOpen(true);

                                                            }).catch((err) => {
                                                                ////console.log(err.response.data.message)
                                                                setIsError(true);
                                                                setSnackbarMessage(err.response.data.message);
                                                                setOpen(true);
                                                                setLoader(false);

                                                            });
                                                        }
                                                        else {
                                                            setOtpErrorText('Please check OTP');
                                                        }
                                                    }
                                                    }
                                                >Submit</Button></div>}

                                            </Slide></div></form>}

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
                    </Grid>

                </Grid>
            </div>

        </ThemeProvider>
    );
}


export default CustomerRegister;