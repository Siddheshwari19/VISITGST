import { TextField, Button, CircularProgress, Fade, FormHelperText, Grid, Modal, Typography, IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Cookies from 'js-cookie';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import pic from '../../assets/background.jpg';

import themeMain from '../../theme';
import { makeStyles } from '@material-ui/styles';
import { useWindowDimensions } from '../../utility/dimensions';
import { useNavigate } from 'react-router-dom';
import './style.css';
import axiosInstance from '../../utility/axios';

const theme = createTheme({
    typography: {
        fontFamily: [
            'Open Sans',

        ].join(','),
    },
});


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    }
}));

const EmployeeLogin = (props) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [isError, setIsError] = useState(false);


    const { height, width } = useWindowDimensions();
    const [authData, setAuthData] = useState({
        password: '',
        email: ''

    })

    const history = useNavigate();
    const [loader, setloader] = React.useState(false);
    // const [ReCaptchaText, setReCaptchaText] = React.useState("");


    const [emailError, setemailError] = React.useState(false);
    const [emailErrorText, setemailErrorText] = React.useState("");

    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordErrorText, setPasswordErrorText] = React.useState("");

    const ValidateSingleField = (data) => {
        if (data == "")
            return true;
        return false;

    }


    const validateData = () => {


        setemailError(ValidateSingleField(authData.email));
        ValidateSingleField(authData.email) ? setemailErrorText('Email cannot be blank') : setemailErrorText('');

        setPasswordError(ValidateSingleField(authData.password));
        ValidateSingleField(authData.password) ? setPasswordErrorText('Password cannot be blank') : setPasswordErrorText('');


        if (!ValidateSingleField(authData.email) && !ValidateSingleField(authData.password))
            return true;



        return false;

    }
    const [values2, setValues2] = React.useState({
        password: '',
        showPassword: false,
    });

    const handleChangePassword = (prop) => (event) => {
        setPasswordError(false);
        setPasswordErrorText('');
        setValues2({ ...values2, [prop]: event.target.value });
        setAuthData({ ...authData, password: event.target.value });

    };
    const handleClickShowPassword = () => {
        setValues2({ ...values2, showPassword: !values2.showPassword });
    };


    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

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
                                    <Typography className='text' variant='h4' >Employee Sign in</Typography>
                                    <br />

                                </div>
                                <br />
                                <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span className='label'>Username</span>
                                    <TextField
                                        className='inputField'
                                        placeholder='example1'
                                        variant='outlined'
                                        type='text'

                                        error={emailError}
                                        value={authData.email}
                                        onChange={(event) => {
                                            setemailError(false);
                                            setemailErrorText('');
                                            setAuthData({ ...authData, email: event.target.value })
                                        }}

                                    />
                                    <FormHelperText style={{ color: 'red' }}>{emailErrorText}</FormHelperText>
                                    <br />

                                    <span className='label'>Password</span>
                                    <OutlinedInput
                                        className='inputField'
                                        placeholder='6 characters, 1 capital letter'
                                        variant='outlined'
                                        error={passwordError}
                                        type={values2.showPassword ? 'text' : 'password'}
                                        value={values2.password}
                                        onChange={handleChangePassword('password')}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                >
                                                    {values2.showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                    <FormHelperText style={{ color: 'red' }}>{passwordErrorText}</FormHelperText>
                                    <br />
                                    {/* <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <span style={{ cursor: 'pointer', color: themeMain.palette.primary.light }}>Forgot Password ?</span>
                                    </div>
                                    <br /> */}


                                    {/* <Grid item lg={12} md={12} sm={12} xs={12} style={{ padding: '20px 0' }}>
                                    <ReCAPTCHA
                                        sitekey="6LdrTn8cAAAAADxkhpfTvTp_nVulm9D_8BH6_sBJ"
                                        stoken="6LdrTn8cAAAAADsdX_YanKa76kXsJ3VG4qowSt7o"
                                        onExpired={() => {
                                            setCaptcha(false);
                                        }}
                                        onChange={() => {
                                            setReCaptchaText("")
                                            setCaptcha(true);
                                        }}
                                    />
                                    <FormHelperText style={{ color: 'red' }}>{ReCaptchaText}</FormHelperText>
                                    </Grid> */}
                                    <br />
                                    {loader ? <div style={{ display: 'flex', justifyContent: 'center' }} >
                                        <CircularProgress style={{ color: 'green', justifyContent: 'center' }} />
                                    </div> : <div style={{ display: 'flex', justifyContent: 'center' }} > <Button type='submit' style={{ color: themeMain.palette.primary.main, fontSize: '20px', background: themeMain.palette.primary.light, fontWeight: '600', padding: '8px 60px' }} className='demoSubmitButton'
                                        variant="contained"
                                        onClick={() => {
                                            if (validateData()) {
                                                setloader(true);
                                                axiosInstance.post('/emp-login', authData).then((res) => {
                                                    setloader(false);
                                                    setIsError(res.data.error);
                                                    if (!res.data.error) {
                                                        setSnackbarMessage("Login Successful");
                                                        setOpen(true);
                                                        Cookies.set('access_token', res.data.accesstoken);
                                                        Cookies.set('refresh_token', res.data.refreshtoken);
                                                        console.log(res.data);
                                                        window.location.replace('/employee-dashboard');
                                                    }
                                                    else {
                                                        setSnackbarMessage(res.data.error);
                                                        setOpen(true);
                                                    }
                                                }).catch((err) => {
                                                    setIsError(true);
                                                    setSnackbarMessage(err.response.data.message);
                                                    setOpen(true);
                                                    ////console.log(err.response.data.message);
                                                    setloader(false);

                                                });
                                            }
                                        }
                                        }
                                    >Submit</Button></div>}
                                </form>

                                <br />
                                <br />
                                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', flexWrap: 'wrap' }}>
                                    <span style={{ color: themeMain.palette.primary.light }}>Don't have an account yet ?</span>
                                    <span style={{ marginLeft: '10px', cursor: 'pointer', color: themeMain.palette.primary.dark }}
                                        onClick={() => {
                                            navigate('/employee-register');
                                        }}> Sign up here</span>
                                </div>



                            </Grid>

                        </div>
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
            </div>

        </ThemeProvider>
    );
}
export default EmployeeLogin;