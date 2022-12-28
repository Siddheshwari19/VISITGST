import { Button, Grid } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import GSTBack from '../../assets/gst.jpg';
import pic from '../../assets/background.jpg';

const Home = (props) => {
    const navigate = useNavigate();
    return (
        <Grid justifyContent={'center'} alignItems={'center'} style={{
            height: '100vh', color: '#FFF', backgroundPosition: 'center center',
            backgroundSize: 'cover', backgroundImage: `url(${pic})`
        }} container >
            <Grid container justify='flex-start'>
                <h1 style={{padding:'1em'}}>VISIT-GST</h1>
            </Grid>
            <Grid justifyContent={'center'} alignItems={'center'} style={{ height: '60vh' }} container>


                <Grid container justifyContent={'center'} alignItems={'center'} item lg={6} md={12} sm={12} xs={12}>
                    <img style={{ width: '90%', borderRadius: '15px', border: '3px solid #000' }} src={GSTBack} />
                </Grid>
                <Grid container justifyContent={'center'} alignItems={'center'} direction='column' item lg={6} md={12} sm={12} xs={12}>
                    <Button variant="contained" size='large' style={{
                        height: "4em",
                        width: "15em",
                        fontSize: "1em"
                        , backgroundColor: '#FFF',
                        color: '#000'
                    }}
                        onClick={() => {
                            navigate('/customer-login');
                        }}>Book an appointment</Button>
                    <br />
                    <h3 >Are you an employee ? <span style={{ color: '#F2A42C', cursor: 'pointer' }} onClick={() => {
                        navigate('/employee-login');
                    }}>Login here</span></h3>
                </Grid>
            </Grid>
            <Grid container direction='column' justifyContent={'flex-start'} alignItems={'center'} item lg={6} md={12} sm={12} xs={12}>
                <h3 style={{ margin: '0' }}>Contact us</h3><br />
                <h4 style={{ margin: '0' }}>visitgst@gmail.com</h4><br />
                <h4 style={{ margin: '0' }}>9876543210</h4>
            </Grid>
        </Grid>
    )
}
export default Home;